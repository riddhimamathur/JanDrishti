import test from "node:test";
import assert from "node:assert/strict";
import { REAL_MAP } from "../realmap.js";

test("the live map stays off until its borders are approved", () => {
  assert.equal(REAL_MAP, false, "Turn this on only together with the border fix and approval; see DEVELOPMENT.md");
});
