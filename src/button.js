import { LANGUAGES } from "./languages.js";
import { THEMES } from "./themes.js";
import { getSizes } from "./sizes.js";
import { PERCENTS } from "./percents.js";

async function createButton(LANGUAGE_NAME, THEME_NAME) {
  if (LANGUAGE_NAME === undefined) {
    throw new Error(`"language" is not defined`);
  }

  const LANGUAGE = LANGUAGES[LANGUAGE_NAME];

  if (LANGUAGE === undefined) {
    throw new Error(`"${LANGUAGE_NAME}" is not a supported language`);
  }

  const THEME = THEMES[THEME_NAME.replaceAll("-", "_")];

  if (THEME === undefined) {
    throw new Error(`"${THEME_NAME}" is not a supported theme`);
  }

  const LANGUAGE_WIDTH = LANGUAGE.width;
  const SIZES = await getSizes();
  const PERCENT = `${(((SIZES[LANGUAGE_NAME] ?? 0) * 100) / SIZES.totalSize).toFixed(1)}%`;
  const PERCENT_WIDTH = PERCENTS[PERCENT];

  return `
    <svg
      width="${28 + LANGUAGE_WIDTH + 4 + PERCENT_WIDTH + 8 + 4}"
      height="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0"
        y="0"
        width="${28 + LANGUAGE_WIDTH + 4 + PERCENT_WIDTH + 8}"
        height="24"
        rx="4"
        fill="${THEME.backgroundColor}"
      ></rect>
      <circle cx="12" cy="12" r="4" fill="${LANGUAGE.color}"></circle>
      <text
        x="28"
        y="16"
        font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, 
                     sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'"
        font-size="12"
        font-weight="600"
        fill="${THEME.languageColor}"
      >
        ${LANGUAGE_NAME}
      </text>
      <text
        x="${28 + LANGUAGE_WIDTH + 4}"
        y="16"
        font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, 
                     sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'"
        font-size="12"
        fill="${THEME.percentColor}"
      >
        ${PERCENT}
      </text>
    </svg>
  `;
}

export { createButton };
