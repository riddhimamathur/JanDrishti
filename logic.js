// Pure project logic: no DOM and no storage, so it can be tested with Node.

export function sortNewest(a, b) {
  return b.updatedAt.localeCompare(a.updatedAt);
}

// Great-circle (Haversine) distance in kilometres. Returns 0 when there is no location.
export function distanceKm(coords, project) {
  if (!coords) return 0;
  const radians = number => number * Math.PI / 180;
  const lat1 = radians(coords.latitude), lat2 = radians(project.lat);
  const dLat = lat2 - lat1, dLng = radians(project.lng - coords.longitude);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function matchesFilters(project, search, filters) {
  const term = search.trim().toLowerCase();
  const matchesSearch = !term || [project.title, project.department, project.location, project.state, project.district, project.description].some(value => value.toLowerCase().includes(term));
  const f = filters;
  return matchesSearch && (!f.department || project.department === f.department) && (!f.state || project.state === f.state) && (!f.district || project.district === f.district) && (!f.startDate || project.startDate >= f.startDate);
}

const hasLocation = state => Boolean(state.locationEnabled && state.locationCoords);

// Districts that have a project come first, so they are never cut off a shortened list.
export function orderDistricts(districts, projectDistricts) {
  const wanted = new Set(projectDistricts);
  return [...new Set([...districts, ...wanted])].sort((a, b) => wanted.has(b) - wanted.has(a) || a.localeCompare(b));
}

// Saved browser data can be missing, old or edited by hand, so every value is checked before use.
export const cleanIdList = (value, validIds) => Array.isArray(value) ? [...new Set(value.filter(id => validIds.includes(id)))] : [];
export const cleanUser = value => typeof value?.name === "string" && typeof value?.email === "string" ? { name: value.name, email: value.email } : null;

const BASE_SORTS = ["recent", "oldest", "start", "az", "progress"];

// Sort options that make sense on the current screen. The first one is its default.
export function availableSorts(state) {
  if (state.view === "history") return ["viewed", ...BASE_SORTS];
  if (state.view === "feed") return [hasLocation(state) ? "nearest" : "suggested", ...BASE_SORTS];
  return BASE_SORTS;
}

// "auto", or an option that does not exist on this screen, means the screen's default.
export function effectiveSort(state) {
  const options = availableSorts(state);
  return options.includes(state.sort) ? state.sort : options[0];
}

const SORTERS = {
  // Shuffled ongoing projects come first; any others follow, newest first.
  suggested: state => {
    const positions = new Map(state.fallbackOrder.map((id, index) => [id, index]));
    const position = project => positions.get(project.id) ?? positions.size;
    return (a, b) => position(a) - position(b) || sortNewest(a, b);
  },
  nearest: state => (a, b) => distanceKm(state.locationCoords, a) - distanceKm(state.locationCoords, b),
  viewed: state => (a, b) => state.history.indexOf(a.id) - state.history.indexOf(b.id),
  recent: () => sortNewest,
  oldest: () => (a, b) => sortNewest(b, a),
  start: () => (a, b) => b.startDate.localeCompare(a.startDate),
  az: () => (a, b) => a.title.localeCompare(b.title),
  progress: () => (a, b) => b.progress - a.progress
};

// The untouched home page: no location, search, filter or chosen sort. Only this page is limited to ongoing projects.
export function isSuggestedHome(state) {
  return state.view === "feed" && effectiveSort(state) === "suggested" && !state.search.trim() && !Object.values(state.filters).some(Boolean);
}

// How many cards "Show projects" will reveal. The map has no list, so it leads to the feed.
export function countResults(projects, state) {
  return selectProjects(projects, state.view === "map" ? { ...state, view: "feed" } : state).length;
}

// The projects shown in the current view, in display order.
export function selectProjects(projects, state) {
  let list = projects.filter(project => matchesFilters(project, state.search, state.filters));
  if (state.view === "saved") list = list.filter(project => state.bookmarks.has(project.id));
  if (state.view === "history") list = list.filter(project => state.history.includes(project.id));
  if (isSuggestedHome(state)) list = list.filter(project => project.status === "ongoing");
  return list.sort(SORTERS[effectiveSort(state)](state));
}
