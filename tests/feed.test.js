import test from "node:test";
import assert from "node:assert/strict";
import { projects, districtsByState } from "../data.js";
import { distanceKm, matchesFilters, selectProjects, countResults, availableSorts, effectiveSort, orderDistricts } from "../logic.js";

const noFilters = { department: "", state: "", district: "", startDate: "" };
const ongoing = projects.filter(project => project.status === "ongoing").map(project => project.id);
const makeState = (changes = {}) => ({
  view: "feed", search: "", filters: { ...noFilters }, sort: "suggested", bookmarks: new Set(), history: [],
  locationEnabled: false, locationCoords: null, fallbackOrder: [...ongoing].reverse(), ...changes
});
const ids = list => list.map(project => project.id);

// Behaviour that already works and must keep working.
test("home shows ongoing projects in the shuffled order", () => {
  assert.deepEqual(ids(selectProjects(projects, makeState())), [...ongoing].reverse());
});
test("state and start date filters combine", () => {
  const filters = { ...noFilters, state: "Rajasthan", startDate: "2026-01-01" };
  assert.deepEqual(ids(projects.filter(project => matchesFilters(project, "", filters))), ["raja-park-road", "bikaner-solar-health"]);
});
test("distance is zero at the same point and about 270 km from Bikaner to Jaipur", () => {
  const jaipur = projects.find(project => project.id === "raja-park-road");
  assert.equal(distanceKm({ latitude: jaipur.lat, longitude: jaipur.lng }, jaipur), 0);
  const km = distanceKm({ latitude: 28.0229, longitude: 73.3119 }, jaipur);
  assert.ok(km > 260 && km < 290, `got ${km}`);
});
test("saved view shows only starred projects", () => {
  assert.deepEqual(ids(selectProjects(projects, makeState({ view: "saved", bookmarks: new Set(["pune-elevated-corridor"]) }))), ["pune-elevated-corridor"]);
});
test("nearby home lists every project, closest first", () => {
  const list = selectProjects(projects, makeState({ locationEnabled: true, locationCoords: { latitude: 28.0229, longitude: 73.3119 } }));
  assert.equal(list.length, projects.length);
  assert.equal(list[0].id, "bikaner-solar-health");
});

test("filters and a chosen sort look at every project", () => {
  assert.deepEqual(ids(selectProjects(projects, makeState({ filters: { ...noFilters, state: "Maharashtra" } }))), ["pune-elevated-corridor"]);
  assert.equal(selectProjects(projects, makeState({ sort: "recent" })).length, projects.length);
});

// Known bugs. Remove the todo mark in the commit that fixes each one.
test("B1: search covers every project", () => {
  assert.deepEqual(ids(selectProjects(projects, makeState({ search: "Bikaner" }))), ["bikaner-solar-health"]);
});
test("B2: the filter count equals the number of cards in every view", () => {
  for (const view of ["feed", "updates", "saved", "history", "map"]) {
    for (const state of new Set(projects.map(project => project.state))) {
      const current = makeState({ view, filters: { ...noFilters, state }, bookmarks: new Set(["raja-park-road"]), history: ["pune-elevated-corridor"] });
      const listed = selectProjects(projects, view === "map" ? { ...current, view: "feed" } : current);
      assert.equal(countResults(projects, current), listed.length, `${view} ${state}`);
    }
  }
});
test("B3: 'recently updated' lists every project, newest first", () => {
  const dates = selectProjects(projects, makeState({ sort: "recent" })).map(project => project.updatedAt);
  assert.equal(dates.length, projects.length);
  assert.deepEqual(dates, [...dates].sort().reverse());
});

test("each screen has its own default sort", () => {
  const here = { locationEnabled: true, locationCoords: { latitude: 28, longitude: 73 } };
  const sortFor = changes => effectiveSort(makeState({ sort: "auto", ...changes }));
  assert.equal(sortFor({}), "suggested");
  assert.equal(sortFor(here), "nearest");
  assert.equal(sortFor({ view: "history" }), "viewed");
  assert.equal(sortFor({ view: "saved" }), "recent");
  assert.equal(sortFor({ view: "updates", ...here }), "recent");
  assert.equal(sortFor({ sort: "nearest" }), "suggested", "nearest needs a location");
});
test("every sort option orders the list as named", () => {
  const history = ["chomu-water-network", "pune-elevated-corridor", "raja-park-road"];
  const rules = {
    recent: (a, b) => b.updatedAt.localeCompare(a.updatedAt), oldest: (a, b) => a.updatedAt.localeCompare(b.updatedAt),
    start: (a, b) => b.startDate.localeCompare(a.startDate), az: (a, b) => a.title.localeCompare(b.title),
    progress: (a, b) => b.progress - a.progress, viewed: (a, b) => history.indexOf(a.id) - history.indexOf(b.id)
  };
  const state = { view: "history", history };
  for (const sort of availableSorts(makeState(state))) {
    const list = selectProjects(projects, makeState({ ...state, sort }));
    assert.equal(list.length, history.length);
    assert.deepEqual(ids(list), ids([...list].sort(rules[sort])), sort);
  }
});

test("B7: every district with a project is within the first 18 of its state", () => {
  for (const project of projects) {
    const own = projects.filter(item => item.state === project.state).map(item => item.district);
    const list = orderDistricts(districtsByState[project.state] ?? [], own);
    assert.ok(list.indexOf(project.district) < 18, project.district);
    assert.equal(new Set(list).size, list.length);
  }
});
