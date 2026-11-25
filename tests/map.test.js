import test from "node:test";
import assert from "node:assert/strict";
import { REAL_MAP, mapFocus } from "../realmap.js";
import { projects, states } from "../data.js";

test("the live map stays off until its borders are approved", () => {
  assert.equal(REAL_MAP, false, "Turn this on only together with the border fix and approval; see DEVELOPMENT.md");
});

test("every project lies inside the area the map moves to", () => {
  for (const project of projects) {
    assert.ok(project.lat > 6 && project.lat < 37 && project.lng > 68 && project.lng < 98, project.id);
    const focus = mapFocus(project.state, projects, states);
    if (focus.bounds) {
      const [[west, south], [east, north]] = focus.bounds;
      assert.ok(project.lng >= west && project.lng <= east && project.lat >= south && project.lat <= north, project.id);
    } else assert.deepEqual(focus.center, [project.lng, project.lat]);
  }
  assert.deepEqual(mapFocus("", projects, states).center, [78.9, 22.5]);
  assert.equal(mapFocus("Goa", projects, states).zoom, 5.5);
});
