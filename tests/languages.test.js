import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("B17: translation files contain no Hebrew, Arabic, Cyrillic or Chinese text", { todo: "fixed in P5.1" }, () => {
  for (const file of ["data.js", "assistant.js", "i18n.js"]) {
    const text = readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
    assert.deepEqual(text.match(/[Ѐ-ӿ֐-ۿ一-鿿]+/g) ?? [], [], file);
  }
});
