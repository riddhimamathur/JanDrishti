import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { translatePhrase } from "../i18n.js";

test("B17: translation files contain no Hebrew, Arabic, Cyrillic or Chinese text", () => {
  for (const file of ["data.js", "assistant.js", "i18n.js"]) {
    const text = readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
    assert.deepEqual(text.match(/[Ѐ-ӿ֐-ۿ一-鿿]+/g) ?? [], [], file);
  }
});

const LANGUAGES = { hi: "Devanagari", gu: "Gujarati", mr: "Devanagari", or: "Oriya", bn: "Bengali", te: "Telugu", kn: "Kannada" };
const SENTENCES = ["Bookmarks", "Public beta", "Suggested projects", "A mix of ongoing sample projects. Search, filter or sort to look through all of them.", "Suggested", "Demo content for preview only. Project records and images are illustrative, not live government data.", "JanDrishti home", "Language", "Sign in to your demo profile", "Workspace navigation", "Project overview", "Mobile navigation", "Illustrative map of India with project locations", "JAN DRISHTI · CITIZEN PROJECT TRACKER", "Sample projects in your chosen order.", "New", "Project added to your starred list.", "Removed from starred projects.", "The latest progress notes from the sample projects in JanDrishti.", "★ Starred project", "☆ Star this project", "Close dialog", "Explore projects across India", "JAN DRISHTI · ALL INDIA", "Illustrative map · not to scale", "Illustrative, interactive map of India; select a marked state", "STATE PROJECT VIEW", "Show all districts", "Show fewer districts", "No sample projects are listed for this state yet. Choose another state to explore mock records.", "Browsing without an account", "CITIZEN PROFILE · DEMO MODE", "e.g. Asha Sharma", "You are signed out of this demo profile.", "PREFERENCES · THIS DEVICE", "HELP US IMPROVE", "Share feedback", "This demo does not keep your message.", "What is your suggestion about?", "Choose a topic", "Project information", "Maps and locations", "Accessibility", "Search and filters", "Something else", "Your feedback", "Submit demo feedback", "A few details help us understand…", "This demo does not keep your feedback. Nothing was saved or sent.", "REPORT AN ISSUE", "Where did you notice it?", "What happened?", "Submit demo report", "This demo does not keep your report. Nothing was saved or sent.", "Updates are ordered by distance from your selected location.", "Nearest", "Nearby sorting turned off. Showing latest projects across India.", "Location permission was not granted. Showing latest projects across India.", "Could not get your location. Showing latest projects across India."];
const WITH_NAMES = ["View Chomu town water network upgrade details", "Remove State filter", "Rajasthan · 3 sample projects", "Goa project summary", "Chomu · New", "Illustrative photo · UN News", "Demo profile ready, Asha. No account was created.", "Signed in as Asha", "Nearby sorting enabled. Closest sample projects are in Rajasthan.", "Starred projects (2)"];

test("every added sentence is translated into all 7 languages, in the right script", () => {
  for (const [language, script] of Object.entries(LANGUAGES)) {
    const foreign = new RegExp(`(?![\\p{Script=Latin}\\p{Script=${script}}\\p{Script=Common}\\p{Script=Inherited}\u0964\u0965])\\p{L}`, "u");
    for (const sentence of [...SENTENCES, ...WITH_NAMES]) {
      const translated = translatePhrase(sentence, language);
      assert.notEqual(translated, sentence, `${language}: ${sentence}`);
      assert.doesNotMatch(translated, foreign, `${language}: ${translated}`);
    }
  }
});
