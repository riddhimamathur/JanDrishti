import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { projects, notifications } from "../data.js";
import { cleanIdList, cleanUser } from "../logic.js";

test("B22: wrong saved values fall back to safe ones", () => {
  for (const bad of [5, "abc", null, {}, true]) assert.deepEqual(cleanIdList(bad, ["a"]), []);
  assert.deepEqual(cleanIdList(["a", 7, "gone", "a"], ["a", "b"]), ["a"]);
  for (const bad of [5, "x", null, [], { name: 5, email: "a" }]) assert.equal(cleanUser(bad), null);
  assert.deepEqual(cleanUser({ name: "A", email: "a@example.com", extra: 1 }), { name: "A", email: "a@example.com" });
});
