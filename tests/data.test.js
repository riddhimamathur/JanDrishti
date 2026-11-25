import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { projects, notifications } from "../data.js";
import { cleanIdList, cleanUser, updatesNewestFirst } from "../logic.js";

test("B22: wrong saved values fall back to safe ones", () => {
  for (const bad of [5, "abc", null, {}, true]) assert.deepEqual(cleanIdList(bad, ["a"]), []);
  assert.deepEqual(cleanIdList(["a", 7, "gone", "a"], ["a", "b"]), ["a"]);
  for (const bad of [5, "x", null, [], { name: 5, email: "a" }]) assert.equal(cleanUser(bad), null);
  assert.deepEqual(cleanUser({ name: "A", email: "a@example.com", extra: 1 }), { name: "A", email: "a@example.com" });
});
test("B11 and B18: all updates come newest first, each with its own text", () => {
  const project = { updates: [{ date: "2026-01-01", text: "old" }, { date: "2026-03-01", text: "new" }] };
  assert.deepEqual(updatesNewestFirst(project, "old, translated"), [{ date: "2026-03-01", text: "new" }, { date: "2026-01-01", text: "old, translated" }]);
  for (const item of projects) assert.equal(updatesNewestFirst(item).length, item.updates.length);
});
test("B24: notifications carry real dates and no wording that goes stale", () => {
  for (const item of notifications) assert.ok(!Number.isNaN(Date.parse(item.at)), item.id);
  const source = ["data.js", "script.js"].map(file => readFileSync(new URL(`../${file}`, import.meta.url), "utf8")).join("");
  assert.doesNotMatch(source, /when: "(Today|Yesterday)|New this month/);
});
