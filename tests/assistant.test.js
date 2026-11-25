import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { findProjectsForQuestion, asksAboutEmptyPlace } from "../assistant.js";

const answer = (question, language = "en") => findProjectsForQuestion(question, language).map(project => project.id);

// The example questions the chat itself offers: [Jaipur work, Chomu finish date, recently ended].
const source = readFileSync(new URL("../assistant.js", import.meta.url), "utf8");
const examples = [...source.matchAll(/^  (\w\w): \{\n.*?prompts: (\[.*?\])/gms)].map(match => [match[1], JSON.parse(match[2])]);
const expected = ["raja-park-road", "chomu-water-network", "pune-elevated-corridor"];
test("all 8 languages offer 3 example questions", () => {
  assert.equal(examples.length, 8);
  for (const [, questions] of examples) assert.equal(questions.length, 3);
});
for (const [language, questions] of examples) {
  questions.forEach((question, index) => {
    test(`example ${language}${index + 1}: ${question}`, () => {
      assert.deepEqual(answer(question, language), [expected[index]]);
    });
  });
}

test("B4: status words inside other words are ignored", () => {
  assert.equal(answer("any news about Jaipur?")[0], "raja-park-road");
  assert.equal(answer("Raja Park to Malviya Nagar road renewal")[0], "raja-park-road");
  assert.equal(answer("Show the extended Ahmedabad work")[0], "ahmedabad-water-reuse");
});
test("B5: a named place is never removed by a status word", () => {
  assert.equal(answer("When will the Chomu water upgrade be completed?")[0], "chomu-water-network");
});
test("a status word narrows a named state", () => {
  assert.deepEqual(answer("Ongoing projects in Rajasthan"), ["raja-park-road", "chomu-water-network"]);
});
test("places are found by other spellings and Indian-language state names", () => {
  assert.deepEqual(answer("Bangalore water work"), ["bengaluru-pipeline"]);
  assert.deepEqual(answer("बेंगलुरु", "hi"), ["bengaluru-pipeline"]);
  assert.deepEqual(answer("ગુજરાત", "gu"), ["ahmedabad-water-reuse"]);
  assert.deepEqual(answer("राजस्थान", "hi").length, 3);
});
test("B14: a place without projects gives no results and says why", () => {
  for (const question of ["projects in Kerala", "New Delhi", "What is happening in Jodhpur?"]) {
    assert.deepEqual(answer(question), [], question);
    assert.equal(asksAboutEmptyPlace(question), true, question);
  }
  for (const question of ["Jaipur and Kerala", "new projects", "hello"]) assert.equal(asksAboutEmptyPlace(question), false, question);
});
