import axios from "axios";
import yaml from "js-yaml";

const LANGUAGE_TEXT = document.querySelector("text");

const LINGUIST = yaml.load(
  (
    await axios({
      method: "get",
      url: "https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml",
    })
  ).data
);

let languages = {};
let longestLanguage = { name: "", width: 0, color: "" };

for (const NAME in LINGUIST) {
  if (!/[ -~]/.test(NAME)) {
    console.log("Name:", NAME);
    continue;
  }

  let color = LINGUIST[NAME].color;

  if (color === undefined) {
    console.log("Color:", NAME);
    continue;
  }

  LANGUAGE_TEXT.innerHTML = NAME;
  const WIDTH = Math.round(LANGUAGE_TEXT.getBBox().width);
  color = color.toLowerCase();
  languages[NAME] = { width: WIDTH, color: color };

  if (WIDTH > longestLanguage.width) {
    longestLanguage = { name: NAME, width: WIDTH, color: color };
  }
}

document.body.innerText = `
  const LANGUAGES = ${JSON.stringify(languages)};

  export { LANGUAGES };
`;

alert(`const LONGEST_LANGUAGE = ${JSON.stringify(longestLanguage)};`);
