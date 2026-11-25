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

// The untouched home page: no location, search, filter or chosen sort. Only this page is limited to ongoing projects.
export function isSuggestedHome(state) {
  return state.view === "feed" && state.sort === "suggested" && !hasLocation(state) && !state.search.trim() && !Object.values(state.filters).some(Boolean);
}

// How many cards "Show projects" will reveal. The map has no list, so it leads to the feed.
export function countResults(projects, state) {
  return selectProjects(projects, state.view === "map" ? { ...state, view: "feed" } : state).length;
}

// The projects shown in the current view, in display order.
export function selectProjects(projects, state) {
  let list = projects.filter(project => matchesFilters(project, state.search, state.filters));
  if (state.view === "saved") list = list.filter(project => state.bookmarks.has(project.id));
  if (state.view === "history") list = list.filter(project => state.history.includes(project.id)).sort((a, b) => state.history.indexOf(a.id) - state.history.indexOf(b.id));
  if (state.view === "updates") list = list.sort(sortNewest);
  else if (state.view === "feed") {
    if (hasLocation(state)) list = list.sort((a, b) => distanceKm(state.locationCoords, a) - distanceKm(state.locationCoords, b));
    else if (state.sort === "suggested") {
      // Shuffled ongoing projects come first; any others follow, newest first.
      const positions = new Map(state.fallbackOrder.map((id, index) => [id, index]));
      const position = project => positions.get(project.id) ?? positions.size;
      if (isSuggestedHome(state)) list = list.filter(project => project.status === "ongoing");
      list.sort((a, b) => position(a) - position(b) || sortNewest(a, b));
    }
  }
  if (state.sort === "oldest") list.reverse();
  if (state.sort === "start") list.sort((a, b) => b.startDate.localeCompare(a.startDate));
  if (state.sort === "az") list.sort((a, b) => a.title.localeCompare(b.title));
  if (state.sort === "progress") list.sort((a, b) => b.progress - a.progress);
  return list;
}
