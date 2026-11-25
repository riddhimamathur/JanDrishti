import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { findProjectsForQuestion } from "../assistant.js";

const answer = (question, language = "en") => findProjectsForQuestion(question, language).map(project => project.id);

// The example questions the chat itself offers: [Jaipur work, Chomu finish date, recently ended].
const source = readFileSync(new URL("../assistant.js", import.meta.url), "utf8");
const examples = [...source.matchAll(/^  (\w\w): \{\n.*?prompts: (\[.*?\])/gms)].map(match => [match[1], JSON.parse(match[2])]);
const expected = ["raja-park-road", "chomu-water-network", "pune-elevated-corridor"];
// Questions that give a wrong or noisy answer today. Fixed in P2.2.
const broken = new Set(["en2", "hi1", "hi2", "gu3", "mr1", "mr2", "or3", "bn1", "bn2", "te3", "kn1"]);

test("all 8 languages offer 3 example questions", () => {
  assert.equal(examples.length, 8);
  for (const [, questions] of examples) assert.equal(questions.length, 3);
});
for (const [language, questions] of examples) {
  questions.forEach((question, index) => {
    const key = `${language}${index + 1}`;
    test(`example ${key}: ${question}`, { todo: broken.has(key) && "fixed in P2.2" }, () => {
      assert.deepEqual(answer(question, language), [expected[index]]);
    });
  });
}

test("B4: status words inside other words are ignored", () => {
  assert.equal(answer("any news about Jaipur?")[0], "raja-park-road");
  assert.equal(answer("Raja Park to Malviya Nagar road renewal")[0], "raja-park-road");
  assert.equal(answer("Show the extended Ahmedabad work")[0], "ahmedabad-water-reuse");
});
test("B5: a named place is never removed by a status word", { todo: "fixed in P2.2" }, () => {
  assert.equal(answer("When will the Chomu water upgrade be completed?")[0], "chomu-water-network");
});
test("B14: a state without projects gives no results", { todo: "fixed in P2.3" }, () => {
  assert.deepEqual(answer("projects in Kerala"), []);
});
