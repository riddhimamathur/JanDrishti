import { projects, states, districtsByState, translations, notifications } from "./data.js";

const STORAGE = {
  bookmarks: "jandrishti.bookmarks",
  history: "jandrishti.history",
  language: "jandrishti.language",
  theme: "jandrishti.theme",
  user: "jandrishti.mockUser",
  readNotifications: "jandrishti.readNotifications"
};
const localeByLanguage = { en: "en-IN", hi: "hi-IN", gu: "gu-IN", mr: "mr-IN", bn: "bn-IN", te: "te-IN", kn: "kn-IN" };
const markerPositions = [
  { name: "Rajasthan", x: 202, y: 187 }, { name: "Gujarat", x: 156, y: 255 },
  { name: "Maharashtra", x: 227, y: 297 }, { name: "Karnataka", x: 246, y: 374 },
  { name: "Telangana", x: 290, y: 316 }, { name: "Uttar Pradesh", x: 329, y: 208 },
  { name: "West Bengal", x: 402, y: 278 }, { name: "Madhya Pradesh", x: 275, y: 252 },
  { name: "Delhi", x: 288, y: 158 }, { name: "Tamil Nadu", x: 284, y: 440 },
  { name: "Assam", x: 454, y: 220 }, { name: "Kerala", x: 227, y: 440 }
];
const state = {
  view: "feed",
  mapState: "",
  mapDistrict: "",
  search: "",
  filters: { department: "", state: "", district: "", startDate: "" },
  sort: "recent",
  language: safeRead(STORAGE.language, "en"),
  theme: safeRead(STORAGE.theme, "light"),
  bookmarks: new Set(safeRead(STORAGE.bookmarks, [])),
  history: safeRead(STORAGE.history, []),
  user: safeRead(STORAGE.user, null),
  readNotifications: new Set(safeRead(STORAGE.readNotifications, [])),
  locationEnabled: false,
  locationCoords: null
};

const elements = {
  app: document.querySelector("#app-view"),
  search: document.querySelector("#global-search"),
  filterPanel: document.querySelector("#filter-panel"),
  filterTrigger: document.querySelector("#filter-trigger"),
  filterCount: document.querySelector("#filter-count"),
  filterResultCount: document.querySelector("#filter-result-count"),
  department: document.querySelector("#department-filter"),
  stateFilter: document.querySelector("#state-filter"),
  district: document.querySelector("#district-filter"),
  startDate: document.querySelector("#start-date-filter"),
  language: document.querySelector("#language-select"),
  notificationTrigger: document.querySelector("#notification-trigger"),
  notificationPanel: document.querySelector("#notification-panel"),
  profileTrigger: document.querySelector("#profile-trigger"),
  profilePanel: document.querySelector("#profile-panel"),
  profileLabel: document.querySelector("#profile-label"),
  profileAvatar: document.querySelector("#profile-avatar"),
  savedCount: document.querySelector("#saved-count"),
  modalRoot: document.querySelector("#modal-root"),
  toastRegion: document.querySelector("#toast-region")
};

function safeRead(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}
function safeWrite(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* Private browsing may disable storage. */ }
}
function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}
function t(key) { return translations[state.language]?.[key] || translations.en[key] || key; }
function locale() { return localeByLanguage[state.language] || "en-IN"; }
function formatDate(value, options = { day: "numeric", month: "short", year: "numeric" }) {
  if (!value) return "—";
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.valueOf())) return value;
  return new Intl.DateTimeFormat(locale(), options).format(date);
}
function formatShortDate(value) { return formatDate(value, { day: "numeric", month: "short" }); }
function sortNewest(a, b) { return b.updatedAt.localeCompare(a.updatedAt); }
function statusLabel(status) {
  if (status === "new") return state.language === "en" ? "New this month" : `${t("newProjects")}`;
  if (status === "ended") return t("ended");
  return state.language === "en" ? "In progress" : t("ongoing");
}
function allDistricts() {
  return [...new Set([...Object.values(districtsByState).flat(), ...projects.map(project => project.district)])].sort((a, b) => a.localeCompare(b));
}
function fillSelect(select, options, placeholder, selected = null) {
  const current = selected ?? select.value;
  select.innerHTML = `<option value="">${escapeHtml(placeholder)}</option>${options.map(value => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join("")}`;
  if ([...select.options].some(option => option.value === current)) select.value = current;
}
function updateFilterOptions() {
  const departments = [...new Set(projects.map(project => project.department))].sort();
  const stateNames = states.map(item => item.name).sort((a, b) => a.localeCompare(b));
  fillSelect(elements.department, departments, "All departments", state.filters.department);
  fillSelect(elements.stateFilter, stateNames, "All states", state.filters.state);
  const districts = state.filters.state ? (districtsByState[state.filters.state] || projects.filter(project => project.state === state.filters.state).map(project => project.district)) : allDistricts();
  fillSelect(elements.district, [...new Set(districts)].sort((a, b) => a.localeCompare(b)), "All districts", state.filters.district);
  elements.startDate.value = state.filters.startDate;
}
function setProfile() {
  const name = state.user?.name || "Sign in";
  elements.profileLabel.textContent = name;
  elements.profileAvatar.textContent = state.user?.name?.trim()?.slice(0, 1)?.toUpperCase() || "G";
  elements.profileAvatar.setAttribute("aria-label", state.user ? `Signed in as ${name}` : "Sign in to your demo profile");
}
function applyTheme() {
  document.body.dataset.theme = state.theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", state.theme === "dark" ? "#101827" : "#F8FAFC");
}
function applyLanguage() {
  if (!translations[state.language]) state.language = "en";
  document.documentElement.lang = state.language;
  elements.language.value = state.language;
  elements.search.placeholder = t("search");
  elements.search.setAttribute("aria-label", t("search"));
  document.querySelector("#filter-trigger [data-i18n='filter']").textContent = t("filter");
  document.querySelectorAll(".mobile-nav [data-view='feed'] span").forEach(el => el.textContent = t("home"));
  document.querySelectorAll(".mobile-nav [data-view='map'] span").forEach(el => el.textContent = t("map"));
  document.querySelectorAll(".mobile-nav [data-view='saved'] span").forEach(el => el.textContent = t("saved"));
  document.querySelectorAll(".mobile-nav [data-view='history'] span").forEach(el => el.textContent = t("history"));
  document.querySelectorAll(".side-link[data-view='feed'] .side-tooltip").forEach(el => el.textContent = t("home"));
  document.querySelectorAll(".side-link[data-view='map'] .side-tooltip").forEach(el => el.textContent = t("map"));
  document.querySelectorAll(".side-link[data-view='updates'] .side-tooltip").forEach(el => el.textContent = t("updates"));
  document.querySelectorAll(".side-link[data-action='settings'] .side-tooltip").forEach(el => el.textContent = t("settings"));
  document.querySelectorAll(".mobile-nav [data-action='settings'] span").forEach(el => el.textContent = t("settings"));
  setProfile();
  renderNotifications();
  renderApp();
}
function updateActiveNav() {
  document.querySelectorAll("[data-view]").forEach(button => {
    const view = button.dataset.view;
    const active = (view === "feed" && ["feed", "history", "saved", "updates"].includes(state.view)) ? state.view === "feed" : view === state.view;
    button.classList.toggle("is-active", active);
  });
}
function matchesFilters(project) {
  const term = state.search.trim().toLowerCase();
  const matchesSearch = !term || [project.title, project.department, project.location, project.state, project.district, project.description].some(value => value.toLowerCase().includes(term));
  const f = state.filters;
  return matchesSearch && (!f.department || project.department === f.department) && (!f.state || project.state === f.state) && (!f.district || project.district === f.district) && (!f.startDate || project.startDate >= f.startDate);
}
function currentProjects() {
  let list = [...projects].filter(matchesFilters);
  if (state.view === "saved") list = list.filter(project => state.bookmarks.has(project.id));
  if (state.view === "history") list = list.filter(project => state.history.includes(project.id)).sort((a, b) => state.history.indexOf(a.id) - state.history.indexOf(b.id));
  if (state.view === "updates") list = list.sort(sortNewest);
  else if (state.view === "feed") {
    if (state.locationCoords && state.locationEnabled) list = list.sort((a, b) => distanceFromLocation(a) - distanceFromLocation(b));
    else list = list.filter(project => project.status === "ongoing").sort(sortNewest);
  }
  if (state.sort === "oldest") list.reverse();
  if (state.sort === "start") list.sort((a, b) => b.startDate.localeCompare(a.startDate));
  if (state.sort === "az") list.sort((a, b) => a.title.localeCompare(b.title));
  if (state.sort === "progress") list.sort((a, b) => b.progress - a.progress);
  return list;
}
function distanceFromLocation(project) {
  if (!state.locationCoords) return 0;
  const radians = number => number * Math.PI / 180;
  const lat1 = radians(state.locationCoords.latitude), lat2 = radians(project.lat);
  const dLat = lat2 - lat1, dLng = radians(project.lng - state.locationCoords.longitude);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
function filteredProjectsWithoutView() { return projects.filter(matchesFilters); }
function filterCount() { return Object.values(state.filters).filter(Boolean).length; }
function updateFilterBadge() {
  const count = filterCount();
  elements.filterCount.hidden = count === 0;
  elements.filterCount.textContent = String(count);
  elements.filterResultCount.textContent = String(filteredProjectsWithoutView().length);
}
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg><span>${escapeHtml(message)}</span>`;
  elements.toastRegion.append(toast);
  window.setTimeout(() => toast.remove(), 3200);
}
function statsFor(projectList) {
  return {
    ongoing: projectList.filter(project => project.status === "ongoing").length,
    newProjects: projectList.filter(project => project.status === "new").length,
    ended: projectList.filter(project => project.status === "ended").length
  };
}
function locationIcon() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>`;
}
function buildingIcon() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 21V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16M2 21h20M8 7h2m4 0h2M8 11h2m4 0h2M8 15h2m4 0h2M10 21v-3h4v3"/></svg>`;
}
function statusClass(status) { return status === "new" ? "is-new" : status === "ended" ? "is-ended" : ""; }
function renderProjectCard(project) {
  const saved = state.bookmarks.has(project.id);
  return `<article class="project-card" data-project-card="${escapeHtml(project.id)}">
    <button class="project-image" type="button" data-open-project="${escapeHtml(project.id)}" aria-label="View ${escapeHtml(project.title)} details">
      <img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.imageAlt)}" loading="lazy" width="640" height="480" />
      <span class="image-caption">Illustrative photo · ${escapeHtml(project.imageCredit)}</span>
    </button>
    <div class="project-body">
      <div class="card-topline">
        <span class="status-badge ${statusClass(project.status)}">${escapeHtml(statusLabel(project.status))}</span>
        <div class="flex items-center gap-2">
          <span class="location-pill">${locationIcon()}<span>${escapeHtml(project.location)}</span></span>
          <button class="bookmark-button ${saved ? "is-saved" : ""}" type="button" data-bookmark="${escapeHtml(project.id)}" aria-label="${saved ? "Remove from" : "Add to"} starred projects" aria-pressed="${saved}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 2.8 5.8 6.4.9-4.6 4.5 1.1 6.4-5.7-3-5.7 3 1.1-6.4-4.6-4.5 6.4-.9L12 3Z"/></svg></button>
        </div>
      </div>
      <button class="project-title" type="button" data-open-project="${escapeHtml(project.id)}">${escapeHtml(project.title)}</button>
      <div class="project-department">${buildingIcon()}<span>${escapeHtml(project.department)}</span></div>
      <p class="project-description">${escapeHtml(project.description)}</p>
      <div class="project-meta">
        <div class="meta-item"><span>Estimated completion</span><strong>${formatShortDate(project.completion)}</strong></div>
        <div class="meta-item"><span>Project update</span><strong>${formatShortDate(project.updatedAt)}</strong></div>
        <div class="meta-item"><span>Started on</span><strong>${formatShortDate(project.startDate)}</strong></div>
      </div>
    </div>
  </article>`;
}
function activeFilterChips() {
  const pairs = [["department", "Department"], ["state", "State"], ["district", "District"], ["startDate", "Started after"]].filter(([key]) => state.filters[key]);
  if (!pairs.length) return "";
  return `<div class="filter-chips">${pairs.map(([key, label]) => `<span class="filter-chip">${label}: ${escapeHtml(key === "startDate" ? formatShortDate(state.filters[key]) : state.filters[key])}<button type="button" data-clear-filter="${key}" aria-label="Remove ${label} filter">×</button></span>`).join("")}</div>`;
}
function emptyState(title, description, buttonText = "Clear filters", action = "reset-filters") {
  return `<div class="empty-state"><div class="empty-state-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.5 4.5"/></svg></div><h3>${escapeHtml(title)}</h3><p>${escapeHtml(description)}</p><button class="button button-secondary button-small" type="button" data-action="${action}">${escapeHtml(buttonText)}</button></div>`;
}
function recentActivity(limit = 3) {
  return projects.flatMap(project => project.updates.slice(0, 1).map(update => ({ project, update }))).sort((a, b) => b.update.date.localeCompare(a.update.date)).slice(0, limit);
}
function renderTimeline() {
  return `<div class="timeline">${recentActivity(3).map(({ project, update }) => `<div class="timeline-item"><span class="timeline-track"><i></i></span><div class="timeline-copy"><strong>${escapeHtml(project.title)}</strong><p>${escapeHtml(update.text)}</p><time>${formatShortDate(update.date)} · ${escapeHtml(project.district)}</time></div></div>`).join("")}</div>`;
}
function renderMiniMap() {
  return `<svg viewBox="60 20 430 500" role="img" aria-label="Illustrative map of India with project locations"><path class="india-shape" d="M243 27 274 40 294 56 322 61 333 78 365 95 383 120 407 135 422 164 444 178 451 209 435 231 450 257 432 283 416 302 399 330 380 347 369 379 350 411 335 443 316 474 293 505 276 481 256 460 239 431 215 418 201 393 180 375 158 350 138 326 119 301 105 274 103 247 117 223 134 204 138 177 159 162 174 143 195 131 210 108 232 87 238 61Z"/>${markerPositions.slice(0, 7).map(point => `<circle class="map-point-hit" cx="${point.x}" cy="${point.y}" r="12" data-state="${escapeHtml(point.name)}" role="button" tabindex="0" aria-label="Show projects in ${escapeHtml(point.name)}"><title>${escapeHtml(point.name)}</title></circle><circle class="map-point ${state.mapState === point.name ? "is-selected" : ""}" cx="${point.x}" cy="${point.y}" r="5" pointer-events="none"/>`).join("")}</svg>`;
}
function renderGlanceCard() {
  const stats = statsFor(projects);
  const place = state.locationEnabled && state.locationCoords ? "Near your location" : t("allIndia");
  return `<section class="rail-card glance-card"><div class="rail-card-heading"><h3>Project snapshot</h3><span>Sample data</span></div><div class="glance-location">${locationIcon()}<span>${place}</span></div><div class="metrics-list">
    <div class="metric-row"><span class="metric-label"><i class="metric-dot"></i>${t("ongoing")} projects</span><strong>${stats.ongoing}</strong></div>
    <div class="metric-row"><span class="metric-label"><i class="metric-dot new"></i>${t("newProjects")}</span><strong>${stats.newProjects}</strong></div>
    <div class="metric-row"><span class="metric-label"><i class="metric-dot ended"></i>${t("ended")}</span><strong>${stats.ended}</strong></div>
  </div></section>`;
}
function renderRightRail() {
  return `<aside class="right-rail" aria-label="Project overview">
    ${renderGlanceCard()}
    <section class="rail-card"><div class="rail-card-heading"><h3>Explore by state</h3><span>Illustrative</span></div><div class="rail-map-preview">${renderMiniMap()}</div><button class="preview-map-link" type="button" data-view="map"><span>Open India project map</span><span>↗</span></button></section>
    <section class="rail-card updates-card"><div class="rail-card-heading"><h3>On the ground</h3><button class="text-button" type="button" data-view="updates">All updates</button></div>${renderTimeline()}</section>
    <div class="disclaimer"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8h.01"/></svg><span>Demo content for preview only. Project records and images are illustrative, not live government data.</span></div>
  </aside>`;
}
function viewCopy() {
  if (state.view === "saved") return { title: "Starred projects", subtitle: "A quick list of the public works you want to keep an eye on.", emptyTitle: "Nothing starred yet", emptyDescription: "Tap the star on a project card to keep it close." };
  if (state.view === "history") return { title: t("history"), subtitle: "Projects you have opened recently on this device.", emptyTitle: "Your view history starts here", emptyDescription: "Open any project to add it to your recently checked list." };
  if (state.view === "updates") return { title: "Project updates", subtitle: "The latest progress notes from the sample projects in JanDrishti.", emptyTitle: "No matching updates", emptyDescription: "Try a broader search or reset your filters." };
  return { title: t("latest"), subtitle: state.locationEnabled ? "Updates are ordered by distance from your selected location." : "Latest updates from sample projects across India.", emptyTitle: t("noResults"), emptyDescription: "Adjust your search or filters to see more public projects." };
}
function renderFeed() {
  const list = currentProjects();
  const copy = viewCopy();
  const isDefault = state.view === "feed";
  const shouldShowHero = isDefault;
  const isCollectionView = state.view === "saved" || state.view === "history";
  const projectMarkup = list.length ? `<div class="project-list">${list.map(renderProjectCard).join("")}</div>` : emptyState(copy.emptyTitle, copy.emptyDescription, isCollectionView ? "Browse all projects" : t("reset"), isCollectionView ? "browse-all" : "reset-filters");
  return `<div class="main-content">
    ${shouldShowHero ? `<section class="hero"><div class="hero-copy"><div class="hero-kicker"><i class="status-pulse"></i><span>CITIZEN PROJECT TRACKER · SAMPLE VIEW</span></div><h1>A clearer view of public work.</h1><p>Follow the projects shaping everyday life—from a road near your home to the water system your city depends on.</p></div><div class="hero-actions"><button class="button button-primary" type="button" data-action="location">${locationIcon()}<span>${state.locationEnabled ? "Location enabled" : t("location")}</span></button><span class="hero-location-note">${state.locationEnabled ? "Showing nearby sample projects" : "Browse updates from across India"}</span></div></section>` : `<section class="page-heading"><div><span class="eyebrow">JAN DRISHTI · CITIZEN PROJECT TRACKER</span><h1>${escapeHtml(copy.title)}</h1><p>${escapeHtml(copy.subtitle)}</p></div><div class="page-heading-actions"><button class="button button-secondary button-small" type="button" data-view="feed">Browse all projects</button></div></section>`}
    <div class="feed-layout"><section class="feed-main" aria-label="${escapeHtml(copy.title)}">
      <div class="feed-heading"><div><h2>${escapeHtml(copy.title)}</h2><p>${escapeHtml(copy.subtitle)}</p></div><div class="feed-heading-actions"><span class="feed-count">${list.length} ${list.length === 1 ? "project" : "projects"}</span><label class="sort-control"><span>Sort</span><select id="sort-select" aria-label="Sort projects"><option value="recent" ${state.sort === "recent" ? "selected" : ""}>Recently updated</option><option value="oldest" ${state.sort === "oldest" ? "selected" : ""}>Oldest update</option><option value="start" ${state.sort === "start" ? "selected" : ""}>Recently started</option><option value="az" ${state.sort === "az" ? "selected" : ""}>Project name</option><option value="progress" ${state.sort === "progress" ? "selected" : ""}>Progress</option></select></label></div></div>
      ${activeFilterChips()}${projectMarkup}
    </section>${renderRightRail()}</div>
  </div>`;
}
function stateProjects(stateName) { return projects.filter(project => project.state === stateName); }
function districtOptions(stateName) {
  const districts = districtsByState[stateName] || [];
  const projectDistricts = stateProjects(stateName).map(project => project.district);
  const fallback = districts.length ? districts : projectDistricts;
  return [...new Set([...fallback, ...projectDistricts])].sort((a, b) => a.localeCompare(b));
}
function mapSummary(projectList, title) {
  const counts = statsFor(projectList);
  return `<div class="map-summary-float" aria-label="${escapeHtml(title)} project summary"><span>${escapeHtml(title)} · SAMPLE COUNTS</span><div class="map-summary-line"><span>${t("ongoing")} projects</span><strong>${counts.ongoing}</strong></div><div class="map-summary-line"><span>${t("newProjects")}</span><strong>${counts.newProjects}</strong></div><div class="map-summary-line"><span>${t("ended")}</span><strong>${counts.ended}</strong></div></div>`;
}
function renderStateMarkers() {
  return markerPositions.map((point, index) => {
    const active = state.mapState === point.name;
    const count = stateProjects(point.name).length;
    const label = point.name === "Rajasthan" || point.name === "Gujarat" || point.name === "Karnataka" || point.name === "West Bengal";
    return `<g class="state-marker ${active ? "is-active" : ""}" data-state="${escapeHtml(point.name)}" role="button" tabindex="0" aria-label="Open ${escapeHtml(point.name)} map, ${count} sample projects" title="${escapeHtml(point.name)} · ${count} sample projects"><circle class="map-point-hit" cx="${point.x}" cy="${point.y}" r="15"/><circle class="map-point ${active ? "is-selected" : ""}" cx="${point.x}" cy="${point.y}" r="${active ? 7 : 5}"/><text class="map-region-label" x="${point.x + 8}" y="${point.y + (index % 2 ? 4 : -7)}" ${label ? "" : "visibility=\"hidden\""}>${escapeHtml(point.name)}</text></g>`;
  }).join("");
}
function renderMapDrawing() {
  return `<svg class="india-map-svg" viewBox="55 20 450 520" role="img" aria-label="Illustrative, interactive map of India; select a marked state">
    <path class="india-shape" d="M243 27 274 40 294 56 322 61 333 78 365 95 383 120 407 135 422 164 444 178 451 209 435 231 450 257 432 283 416 302 399 330 380 347 369 379 350 411 335 443 316 474 293 505 276 481 256 460 239 431 215 418 201 393 180 375 158 350 138 326 119 301 105 274 103 247 117 223 134 204 138 177 159 162 174 143 195 131 210 108 232 87 238 61Z"/>
    <path class="state-outline" d="M179 149 211 125 239 128 242 170 222 198 191 192 170 172Z"/><path class="state-outline" d="M132 211 166 193 201 203 211 240 190 266 151 259 119 240Z"/><path class="state-outline" d="M207 237 245 212 285 222 302 259 278 291 237 290 207 266Z"/><path class="state-outline" d="M217 301 250 285 276 308 271 358 249 386 225 363 215 332Z"/><path class="state-outline" d="M278 267 313 245 340 259 334 298 303 322 275 304Z"/><path class="state-outline" d="M288 171 324 150 353 166 365 199 339 224 306 217Z"/><path class="state-outline" d="M367 232 393 223 418 237 405 270 378 274 358 254Z"/>
    <path d="M434 234q27-14 47 1m-46 9q32-4 53 12m-65-10q-14 19-29 23" fill="none" stroke="#ced9e6" stroke-width="5" stroke-linecap="round"/>
    ${renderStateMarkers()}
    <circle class="map-point" cx="93" cy="328" r="3"/><circle class="map-point" cx="464" cy="317" r="3"/>
  </svg>`;
}
function renderStatePanel() {
  const selected = state.mapState;
  const selectedProjects = selected ? stateProjects(selected) : [...projects];
  const stats = statsFor(selectedProjects);
  const districts = selected ? districtOptions(selected) : ["Jaipur", "Chomu", "Bikaner", "Ahmedabad", "Pune", "Bengaluru Urban", "Kolkata", "Hyderabad"];
  const visibleDistricts = districts.slice(0, selected ? 18 : 8);
  const localProjectList = selectedProjects.slice().sort(sortNewest).slice(0, 4);
  const title = selected || t("allIndia");
  return `<aside class="state-panel">
    <div class="state-panel-header"><div class="state-indicator"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6 9 3l6 3 6-3v15l-6 3-6-3-6 3V6Z"/><path d="M9 3v15m6-12v15"/></svg></div><div class="state-panel-header-copy"><span class="eyebrow">${selected ? "STATE PROJECT VIEW" : "JAN DRISHTI · ALL INDIA"}</span><h2>${escapeHtml(title)}</h2><p>${selected ? `${selectedProjects.length} sample ${selectedProjects.length === 1 ? "project" : "projects"} in this state` : "Select a state to explore local public works."}</p></div>${selected ? `<button class="icon-button quiet" type="button" data-action="clear-map-state" aria-label="Return to all India map">×</button>` : ""}</div>
    <div class="map-project-map"><svg viewBox="90 30 380 485" aria-hidden="true"><path class="india-shape" d="M243 27 274 40 294 56 322 61 333 78 365 95 383 120 407 135 422 164 444 178 451 209 435 231 450 257 432 283 416 302 399 330 380 347 369 379 350 411 335 443 316 474 293 505 276 481 256 460 239 431 215 418 201 393 180 375 158 350 138 326 119 301 105 274 103 247 117 223 134 204 138 177 159 162 174 143 195 131 210 108 232 87 238 61Z"/><path class="state-line" d="M169 172 222 199 278 291M201 204l-11 62m48-51 27 93m38-86-30 57m-48 79 50-50m31-87 34-19m21 64 34-35"/>${selected ? `<circle class="map-project-pin" cx="${markerPositions.find(m => m.name === selected)?.x || 280}" cy="${markerPositions.find(m => m.name === selected)?.y || 250}" r="8"/>` : ""}</svg><span class="map-project-watermark">Illustrative map · not to scale</span></div>
    <div class="state-count-strip"><div class="state-count"><strong>${stats.ongoing}</strong><span>${t("ongoing")} projects</span></div><div class="state-count"><strong>${stats.newProjects}</strong><span>${t("newProjects")}</span></div><div class="state-count"><strong>${stats.ended}</strong><span>${t("ended")}</span></div></div>
    <div class="state-panel-section"><div class="state-panel-section-heading"><h3>${selected ? `Districts in ${escapeHtml(selected)}` : "Popular districts"}</h3><span>${selected ? `${districts.length} locations` : "Choose a district"}</span></div><div class="district-list">${visibleDistricts.map(district => `<button class="district-chip ${state.mapDistrict === district ? "is-active" : ""}" type="button" data-map-district="${escapeHtml(district)}" ${!selected ? `data-map-state="${escapeHtml(projects.find(p => p.district === district)?.state || "Rajasthan")}"` : ""}>${escapeHtml(district)}${selected ? `<small>${stateProjects(selected).filter(project => project.district === district).length}</small>` : ""}</button>`).join("")}</div></div>
    <div class="state-panel-section"><div class="state-panel-section-heading"><h3>Latest in view</h3><span>${localProjectList.length ? `${localProjectList.length} shown` : "No sample projects"}</span></div><div class="map-project-list">${localProjectList.length ? localProjectList.map(project => `<button class="map-project-row" type="button" data-open-project="${escapeHtml(project.id)}"><span><strong>${escapeHtml(project.title)}</strong><small>${escapeHtml(project.district)} · ${escapeHtml(statusLabel(project.status))}</small></span><span>${project.progress}%</span></button>`).join("") : `<p class="form-note">No sample projects are listed for this state yet. Choose another state to explore mock records.</p>`}</div></div>
  </aside>`;
}
function renderMap() {
  const title = state.mapState || "All India";
  const mapProjects = state.mapState ? stateProjects(state.mapState) : projects;
  return `<div class="main-content"><section class="page-heading"><div><span class="eyebrow">CITIZEN PROJECT MAP · SAMPLE VIEW</span><h1>${state.mapState ? `${escapeHtml(state.mapState)} projects` : "Explore projects across India"}</h1><p>Choose a state or district to see sample projects, activity, and status counts. Map boundaries are illustrative.</p></div><div class="page-heading-actions">${state.mapState ? `<button class="button button-secondary button-small" type="button" data-action="clear-map-state">← ${t("allIndia")}</button>` : `<button class="button button-secondary button-small" type="button" data-action="location">${locationIcon()} ${t("location")}</button>`}</div></section>
    <div class="map-page-layout"><section class="map-panel"><div class="map-panel-heading"><div><h2>${state.mapState ? `${escapeHtml(state.mapState)} · state view` : "India · project distribution"}</h2><p>${state.mapState ? "A focused, illustrative view of the selected state." : "Select a marked state to open its project overview."}</p></div><div class="map-status-legend"><span><i></i>${t("ongoing")}</span><span><i class="new"></i>${t("newProjects")}</span></div></div><div class="map-canvas">${renderMapDrawing()}<span class="map-click-hint">${locationIcon()} Select a state marker or district</span><span class="map-canvas-legend">Schematic map · not to scale</span>${state.mapState ? `<div class="state-map-popup"><strong>${escapeHtml(state.mapState)}</strong><span>${mapProjects.length} sample projects</span></div>` : ""}</div>${mapSummary(mapProjects, title)}</section>${renderStatePanel()}</div>
    <section class="rail-card all-states-section"><div class="state-panel-section-heading"><h3>Browse any state or union territory</h3><span>${states.length} locations · mock data may be empty</span></div><div class="district-list all-state-choices">${states.map(item => `<button class="district-chip ${state.mapState === item.name ? "is-active" : ""}" type="button" data-state="${escapeHtml(item.name)}">${escapeHtml(item.name)}<small>${stateProjects(item.name).length}</small></button>`).join("")}</div></section>
  </div>`;
}
function renderApp() {
  updateFilterBadge();
  updateActiveNav();
  if (state.view === "map") elements.app.innerHTML = renderMap();
  else elements.app.innerHTML = renderFeed();
  if (state.view === "map") {
    document.querySelectorAll("[data-map-district]").forEach(button => button.addEventListener("click", event => {
      const district = event.currentTarget.dataset.mapDistrict;
      const stateName = event.currentTarget.dataset.mapState || state.mapState;
      if (stateName && !state.mapState) state.mapState = stateName;
      state.mapDistrict = district;
      renderApp();
      if (stateProjects(state.mapState).some(project => project.district === district)) {
        state.filters.state = state.mapState;
        state.filters.district = district;
        state.view = "feed";
        updateFilterOptions();
        renderApp();
      }
    }));
  }
}
function setView(view) {
  state.view = view;
  state.search = "";
  elements.search.value = "";
  closePopovers();
  renderApp();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function toggleBookmark(projectId) {
  if (state.bookmarks.has(projectId)) {
    state.bookmarks.delete(projectId);
    showToast("Removed from starred projects.");
  } else {
    state.bookmarks.add(projectId);
    showToast("Project added to your starred list.");
  }
  safeWrite(STORAGE.bookmarks, [...state.bookmarks]);
  elements.savedCount.hidden = state.bookmarks.size === 0;
  elements.savedCount.textContent = String(state.bookmarks.size);
  renderApp();
}
function recordHistory(projectId) {
  state.history = [projectId, ...state.history.filter(id => id !== projectId)].slice(0, 20);
  safeWrite(STORAGE.history, state.history);
}
function projectById(id) { return projects.find(project => project.id === id); }
function openProject(projectId) {
  const project = projectById(projectId);
  if (!project) return;
  recordHistory(project.id);
  const saved = state.bookmarks.has(project.id);
  showModal(`<span class="modal-eyebrow">PROJECT DETAILS · ILLUSTRATIVE SAMPLE</span><h2 class="modal-title">${escapeHtml(project.title)}</h2><div class="detail-topline"><span class="status-badge ${statusClass(project.status)}">${escapeHtml(statusLabel(project.status))}</span><span class="location-pill">${locationIcon()}<span>${escapeHtml(project.location)}</span></span></div><img class="detail-image" src="${escapeHtml(project.image)}" alt="${escapeHtml(project.imageAlt)}"/><p class="detail-summary">${escapeHtml(project.description)}</p><div class="detail-facts"><div class="detail-fact"><span>Department</span><strong>${escapeHtml(project.department)}</strong></div><div class="detail-fact"><span>Project budget</span><strong>${escapeHtml(project.budget)}</strong></div><div class="detail-fact"><span>Expected completion</span><strong>${formatDate(project.completion)}</strong></div></div><div class="progress-header"><span>Reported project progress · sample</span><strong>${project.progress}%</strong></div><div class="progress-track"><div class="progress-fill" style="width:${project.progress}%"></div></div><div class="update-list"><span class="eyebrow">RECENT PROJECT UPDATES</span>${project.updates.map(update => `<div class="update-row"><time>${formatDate(update.date, { day: "numeric", month: "short", year: "numeric" })}</time><p>${escapeHtml(update.text)}</p></div>`).join("")}</div><div class="modal-action-row"><button class="button ${saved ? "button-secondary" : "button-primary"}" type="button" data-modal-bookmark="${escapeHtml(project.id)}" aria-pressed="${saved}">${saved ? "★ Starred project" : "☆ Star this project"}</button><button class="button button-secondary" type="button" data-modal-close>Done</button></div><p class="form-note">Sample content only. This page is not connected to a government project database.</p>`);
}
function showModal(content, wide = false) {
  elements.modalRoot.innerHTML = `<div class="modal-overlay" data-modal-backdrop><section class="modal-card ${wide ? "modal-wide" : ""}" role="dialog" aria-modal="true"><button class="modal-close" type="button" data-modal-close aria-label="Close dialog">×</button>${content}</section></div>`;
  const firstFocusable = elements.modalRoot.querySelector("input, select, textarea, button:not(.modal-close)");
  window.setTimeout(() => firstFocusable?.focus(), 20);
}
function closeModal() { elements.modalRoot.innerHTML = ""; }
function openAuth(mode = "signin") {
  const signUp = mode === "signup";
  const title = signUp ? "Create your JanDrishti profile" : "Sign in to JanDrishti";
  const fields = `${signUp ? `<div class="form-group"><label for="auth-name">Your name</label><input id="auth-name" name="name" autocomplete="name" placeholder="e.g. Asha Sharma" required /></div>` : ""}<div class="form-group"><label for="auth-email">Email address</label><input id="auth-email" name="email" type="email" autocomplete="email" placeholder="you@example.com" required /></div>${signUp ? `<div class="form-group"><label for="auth-city">City or district (optional)</label><input id="auth-city" name="city" placeholder="e.g. Jaipur" /></div>` : ""}`;
  showModal(`<span class="modal-eyebrow">CITIZEN PROFILE · DEMO MODE</span><h2 class="modal-title">${title}</h2><p class="modal-intro">Save the projects you care about and keep your recently viewed list on this device. This demo does not create a real account.</p><form class="modal-form" id="auth-form" data-mode="${signUp ? "signup" : "signin"}">${fields}<p class="form-note">Mock sign-in only: information stays in this browser and is not sent anywhere.</p><button class="button button-primary" type="submit">${signUp ? "Create demo profile" : "Continue as a demo user"}</button></form><p class="auth-switch">${signUp ? "Already have a profile?" : "New to JanDrishti?"} <button type="button" data-auth-mode="${signUp ? "signin" : "signup"}">${signUp ? "Sign in" : "Sign up"}</button></p>`);
}
function renderProfilePanel() {
  const name = state.user?.name || "Guest";
  const email = state.user?.email || "Browsing without an account";
  return `<div class="profile-menu-top"><span class="avatar">${escapeHtml(name.slice(0, 1).toUpperCase())}</span><div><strong>${escapeHtml(name)}</strong><small>${escapeHtml(email)}</small></div></div>${state.user ? `<button class="profile-menu-item" type="button" data-action="logout"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 17l5-5-5-5m5 5H3m9-9h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7"/></svg>Sign out</button>` : `<button class="profile-menu-item" type="button" data-action="auth"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 9a7 7 0 0 1 14 0"/></svg>Sign in</button><button class="profile-menu-item" type="button" data-action="signup"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14m-7-7h14"/></svg>Create a profile</button>`}<button class="profile-menu-item" type="button" data-view="saved"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 2.8 5.8 6.4.9-4.6 4.5 1.1 6.4-5.7-3-5.7 3 1.1-6.4-4.6-4.5 6.4-.9L12 3Z"/></svg>Starred projects (${state.bookmarks.size})</button>`;
}
function renderNotifications() {
  const unread = notifications.some(item => item.unread && !state.readNotifications.has(item.id));
  document.querySelector(".notification-dot").hidden = !unread;
  elements.notificationPanel.innerHTML = `<div class="notification-head"><h3>${t("notifications")}</h3><button class="text-button" type="button" data-action="mark-notifications-read">Mark read</button></div>${notifications.map(item => `<button class="notification-item" type="button" data-open-project="${escapeHtml(item.projectId)}" data-notification="${escapeHtml(item.id)}"><span class="notification-mark"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V5m0 14h17M8 15l4-4 3 2 5-6"/></svg></span><span class="notification-copy"><strong>${escapeHtml(item.label)}${item.unread && !state.readNotifications.has(item.id) ? `<i class="unread-dot"></i>` : ""}</strong><p>${escapeHtml(item.text)}</p><small>${escapeHtml(item.when)}</small></span></button>`).join("")}`;
}
function openSettings() {
  showModal(`<span class="modal-eyebrow">PREFERENCES · THIS DEVICE</span><h2 class="modal-title">Settings</h2><p class="modal-intro">A few controls to make this civic dashboard more comfortable to use.</p><div class="settings-choice"><span><strong>Dark theme</strong><small>Switch between the light civic theme and a low-light palette.</small></span><button class="theme-toggle" type="button" role="switch" aria-label="Dark theme" aria-checked="${state.theme === "dark"}" data-action="toggle-theme"></button></div><div class="settings-choice"><span><strong>Nearby project feed</strong><small>Use your device location only when you choose. Coordinates stay in this tab.</small></span><button class="button button-secondary button-small" type="button" data-action="location">${state.locationEnabled ? "Turn off" : "Use location"}</button></div><div class="settings-choice"><span><strong>Feedback</strong><small>Share a suggestion about making public projects easier to understand.</small></span><button class="button button-secondary button-small" type="button" data-action="feedback">Send feedback</button></div><div class="settings-choice"><span><strong>Report a bug</strong><small>Describe a display issue or something that is not working in this demo.</small></span><button class="button button-secondary button-small" type="button" data-action="bug-report">Report issue</button></div><div class="modal-action-row"><span class="theme-preview"><i></i> Civic trust theme</span><button class="button button-primary button-small" type="button" data-modal-close>Done</button></div>`);
}
function openFeedback(type) {
  const bug = type === "bug";
  const title = bug ? "Report a bug" : "Share feedback";
  showModal(`<span class="modal-eyebrow">${bug ? "REPORT AN ISSUE" : "HELP US IMPROVE"}</span><h2 class="modal-title">${title}</h2><p class="modal-intro">This is a local demo form. Nothing is sent to a server.</p><form class="modal-form" id="feedback-form" data-type="${bug ? "bug" : "feedback"}"><div class="form-group"><label for="feedback-category">${bug ? "Where did you notice it?" : "What is your suggestion about?"}</label><select id="feedback-category" required><option value="">Choose a topic</option><option>Project information</option><option>Maps and locations</option><option>Accessibility</option><option>Search and filters</option><option>Something else</option></select></div><div class="form-group"><label for="feedback-message">${bug ? "What happened?" : "Your feedback"}</label><textarea id="feedback-message" required minlength="8" placeholder="A few details help us understand…"></textarea></div><button class="button button-primary" type="submit">${bug ? "Save demo report" : "Save demo feedback"}</button></form>`);
}
function requestLocation() {
  if (state.locationEnabled) {
    state.locationEnabled = false;
    state.locationCoords = null;
    showToast("Nearby sorting turned off. Showing latest projects across India.");
    renderApp();
    if (elements.modalRoot.innerHTML) openSettings();
    return;
  }
  if (!navigator.geolocation) {
    showToast("Location is unavailable in this browser. Showing projects across India.");
    return;
  }
  showToast("Waiting for your location permission…");
  navigator.geolocation.getCurrentPosition(position => {
    state.locationCoords = { latitude: position.coords.latitude, longitude: position.coords.longitude };
    state.locationEnabled = true;
    const closest = [...states].sort((a, b) => {
      const projectA = projects.find(project => project.state === a.name);
      const projectB = projects.find(project => project.state === b.name);
      if (!projectA) return 1;
      if (!projectB) return -1;
      return distanceFromLocation(projectA) - distanceFromLocation(projectB);
    }).find(item => projects.some(project => project.state === item.name));
    showToast(`Nearby sorting enabled. Closest sample projects are in ${closest?.name || "India"}.`);
    renderApp();
    if (elements.modalRoot.innerHTML) openSettings();
  }, error => {
    const message = error.code === 1 ? "Location permission was not granted. Showing latest projects across India." : "Could not get your location. Showing latest projects across India.";
    showToast(message);
    state.locationEnabled = false;
    state.locationCoords = null;
    renderApp();
  }, { enableHighAccuracy: false, timeout: 9000, maximumAge: 300000 });
}
function closePopovers() {
  elements.filterPanel.hidden = true;
  elements.filterTrigger.setAttribute("aria-expanded", "false");
  elements.notificationPanel.hidden = true;
  elements.notificationTrigger.setAttribute("aria-expanded", "false");
  elements.profilePanel.hidden = true;
  elements.profileTrigger.setAttribute("aria-expanded", "false");
}
function togglePopover(panel, trigger) {
  const wasHidden = panel.hidden;
  closePopovers();
  if (wasHidden) {
    panel.hidden = false;
    trigger.setAttribute("aria-expanded", "true");
  }
}
function clearFilter(key) {
  state.filters[key] = "";
  updateFilterOptions();
  renderApp();
}
function resetFilters() {
  state.filters = { department: "", state: "", district: "", startDate: "" };
  state.search = "";
  elements.search.value = "";
  updateFilterOptions();
  renderApp();
}
function mapToState(name) {
  state.mapState = name;
  state.mapDistrict = "";
  state.view = "map";
  closePopovers();
  renderApp();
}
function closeSettingsAnd(action) {
  if (action === "feedback") openFeedback("feedback");
  else if (action === "bug-report") openFeedback("bug");
}

updateFilterOptions();
applyTheme();
setProfile();
elements.savedCount.hidden = state.bookmarks.size === 0;
elements.savedCount.textContent = String(state.bookmarks.size);
renderNotifications();
renderApp();

// Global interactions use event delegation so newly rendered cards remain interactive.
document.addEventListener("click", event => {
  const target = event.target;
  const filterTrigger = target.closest("#filter-trigger");
  const notificationTrigger = target.closest("#notification-trigger");
  const profileTrigger = target.closest("#profile-trigger");
  const dataView = target.closest("[data-view]");
  const openProjectButton = target.closest("[data-open-project]");
  const bookmarkButton = target.closest("[data-bookmark]");
  const modalBookmark = target.closest("[data-modal-bookmark]");
  const clear = target.closest("[data-clear-filter]");
  const actionButton = target.closest("[data-action]");
  const stateButton = target.closest("[data-state]");
  const modalClose = target.closest("[data-modal-close]");
  const authMode = target.closest("[data-auth-mode]");

  if (filterTrigger) { togglePopover(elements.filterPanel, elements.filterTrigger); return; }
  if (notificationTrigger) { renderNotifications(); togglePopover(elements.notificationPanel, elements.notificationTrigger); return; }
  if (profileTrigger) { elements.profilePanel.innerHTML = renderProfilePanel(); togglePopover(elements.profilePanel, elements.profileTrigger); return; }
  if (dataView) { setView(dataView.dataset.view); return; }
  if (openProjectButton) {
    const notificationId = openProjectButton.dataset.notification;
    if (notificationId) { state.readNotifications.add(notificationId); safeWrite(STORAGE.readNotifications, [...state.readNotifications]); renderNotifications(); }
    closePopovers(); openProject(openProjectButton.dataset.openProject); return;
  }
  if (bookmarkButton) { toggleBookmark(bookmarkButton.dataset.bookmark); return; }
  if (modalBookmark) { toggleBookmark(modalBookmark.dataset.modalBookmark); openProject(modalBookmark.dataset.modalBookmark); return; }
  if (clear) { clearFilter(clear.dataset.clearFilter); return; }
  if (stateButton) { mapToState(stateButton.dataset.state); return; }
  if (authMode) { openAuth(authMode.dataset.authMode); return; }
  if (modalClose || target.matches("[data-modal-backdrop]")) { closeModal(); return; }

  if (actionButton) {
    const action = actionButton.dataset.action;
    if (action === "home") { setView("feed"); return; }
    if (action === "close-filters") { elements.filterPanel.hidden = true; elements.filterTrigger.setAttribute("aria-expanded", "false"); return; }
    if (action === "reset-filters") { resetFilters(); closePopovers(); return; }
    if (action === "browse-all") { resetFilters(); setView("feed"); return; }
    if (action === "apply-filters") { state.filters = { department: elements.department.value, state: elements.stateFilter.value, district: elements.district.value, startDate: elements.startDate.value }; closePopovers(); renderApp(); showToast("Project filters applied."); return; }
    if (action === "settings") { openSettings(); return; }
    if (action === "auth") { closePopovers(); openAuth("signin"); return; }
    if (action === "signup") { closePopovers(); openAuth("signup"); return; }
    if (action === "logout") { state.user = null; safeWrite(STORAGE.user, null); setProfile(); closePopovers(); renderApp(); showToast("You are signed out of this demo profile."); return; }
    if (action === "location") { requestLocation(); return; }
    if (action === "feedback" || action === "bug-report") { closeSettingsAnd(action); return; }
    if (action === "toggle-theme") { state.theme = state.theme === "dark" ? "light" : "dark"; safeWrite(STORAGE.theme, state.theme); applyTheme(); openSettings(); return; }
    if (action === "clear-map-state") { state.mapState = ""; state.mapDistrict = ""; renderApp(); return; }
    if (action === "mark-notifications-read") { state.readNotifications = new Set(notifications.map(item => item.id)); safeWrite(STORAGE.readNotifications, [...state.readNotifications]); renderNotifications(); showToast("All notifications marked as read."); return; }
  }
  if (!target.closest(".popover") && !target.closest(".relative-anchor")) closePopovers();
});

document.addEventListener("keydown", event => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault(); elements.search.focus();
  }
  if (event.key === "Escape") { closeModal(); closePopovers(); }
  if ((event.key === "Enter" || event.key === " ") && event.target.matches(".state-marker")) {
    event.preventDefault(); mapToState(event.target.dataset.state);
  }
});

document.addEventListener("input", event => {
  if (event.target === elements.search) {
    state.search = elements.search.value;
    if (state.view === "map" && state.search.trim()) state.view = "feed";
    renderApp();
  }
});

document.addEventListener("change", event => {
  if (event.target === elements.language) {
    state.language = event.target.value;
    safeWrite(STORAGE.language, state.language);
    applyLanguage();
  } else if (event.target === elements.stateFilter) {
    state.filters.state = elements.stateFilter.value;
    state.filters.district = "";
    updateFilterOptions();
    renderApp();
  } else if ([elements.department, elements.district, elements.startDate].includes(event.target)) {
    state.filters.department = elements.department.value;
    state.filters.district = elements.district.value;
    state.filters.startDate = elements.startDate.value;
    renderApp();
  } else if (event.target.id === "sort-select") {
    state.sort = event.target.value;
    renderApp();
  }
});

document.addEventListener("submit", event => {
  if (event.target.id === "auth-form") {
    event.preventDefault();
    const form = event.target;
    const email = form.elements.email.value.trim();
    const typedName = form.querySelector('[name="name"]')?.value.trim();
    const name = typedName || email.split("@")[0].replace(/[._-]+/g, " ").replace(/\b\w/g, character => character.toUpperCase()) || "Citizen";
    state.user = { name, email };
    safeWrite(STORAGE.user, state.user);
    setProfile();
    closeModal();
    showToast(`Demo profile ready, ${name}. No account was created.`);
  } else if (event.target.id === "feedback-form") {
    event.preventDefault();
    const bug = event.target.dataset.type === "bug";
    closeModal();
    showToast(bug ? "Bug report saved in this demo. Nothing was sent." : "Feedback saved in this demo. Nothing was sent.");
  }
});

// The map overview preview also supports keyboard activation on its SVG markers.
document.addEventListener("click", event => {
  const point = event.target.closest(".map-point-hit");
  if (point?.dataset.state) mapToState(point.dataset.state);
});

if (!state.language || !translations[state.language]) state.language = "en";
applyLanguage();
