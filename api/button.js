import { LANGUAGES } from "../src/languages.js";
import { THEMES } from "../src/themes.js";
import axios from "axios";
import { PERCENTS } from "../src/percents.js";

export default async function handler(REQUEST, RESPONSE) {
  try {
    RESPONSE.setHeader("Content-Type", "image/svg+xml");
    RESPONSE.setHeader("Vercel-CDN-Cache-Control", "max-age=3600, stale-while-revalidate=604800");
    RESPONSE.setHeader("CDN-Cache-Control", "max-age=3600, stale-while-revalidate=604800");
    RESPONSE.setHeader("Cache-Control", "max-age=3600, stale-while-revalidate=604800");
    const LANGUAGE_NAME = REQUEST.query.language;

    if (LANGUAGE_NAME === undefined) {
      throw new Error(`"language" is not defined`);
    }

    const LANGUAGE = LANGUAGES[LANGUAGE_NAME];

    if (LANGUAGE === undefined) {
      throw new Error(`"${LANGUAGE_NAME}" is not a supported language`);
    }

    const THEME_NAME = REQUEST.query.theme ?? "dark";
    const THEME = THEMES[THEME_NAME.replaceAll("-", "_")];

    if (THEME === undefined) {
      throw new Error(`"${THEME_NAME}" is not a supported theme`);
    }

    const LANGUAGE_WIDTH = LANGUAGE.width;

    const SIZES = (
      await axios({
        url: `https://${process.env.VERCEL_URL}/api/sizes`,
        headers: {
          Accept: "application/json",
        },
      })
    ).data;

    const PERCENT = `${(((SIZES[LANGUAGE_NAME] ?? 0) * 100) / SIZES.totalSize).toFixed(1)}%`;
    const PERCENT_WIDTH = PERCENTS[PERCENT];

    RESPONSE.send(`
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
          rx="6"
          fill="${THEME.buttonColor}"
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
    `);
  } catch (error) {
    RESPONSE.setHeader("Content-Type", "text/plain");
    RESPONSE.setHeader("Cache-Control", "no-store");
    RESPONSE.send(error.message);
  }
}
