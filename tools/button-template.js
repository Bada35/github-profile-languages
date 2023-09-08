import { THEMES } from "../src/themes";

const LONGEST_LANGUAGE = { name: "World of Warcraft Addon Data", width: 167, color: "#f7e43f" };
const LONGEST_PERCENT = { percent: "100.0%", width: 38 };
const THEMES_DARK = THEMES.dark;

document.body.innerHTML = `
  <svg
    width="${28 + LONGEST_LANGUAGE.width + 4 + LONGEST_PERCENT.width + 8 + 4}"
    height="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="0"
      y="0"
      width="${28 + LONGEST_LANGUAGE.width + 4 + LONGEST_PERCENT.width + 8}"
      height="24"
      rx="4"
      fill="${THEMES_DARK.buttonColor}"
    ></rect>
    <circle cx="12" cy="12" r="4" fill="${LONGEST_LANGUAGE.color}"></circle>
    <text
      x="28"
      y="16"
      font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, 
                   sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'"
      font-size="12"
      font-weight="600"
      fill="${THEMES_DARK.languageColor}"
    >
      ${LONGEST_LANGUAGE.name}
    </text>
    <text
      x="${28 + LONGEST_LANGUAGE.width + 4}"
      y="16"
      font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, 
                   sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'"
      font-size="12"
      fill="${THEMES_DARK.percentColor}"
    >
      ${LONGEST_PERCENT.percent}
    </text>
  </svg>
`;
