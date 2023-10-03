import axios from "axios";
import { THEMES } from "../src/themes.js";
import { LANGUAGES } from "../src/languages.js";

export default async function handler(REQUEST, RESPONSE) {
  try {
    RESPONSE.setHeader("Content-Type", "image/svg+xml");
    RESPONSE.setHeader("Vercel-CDN-Cache-Control", "max-age=3600, stale-while-revalidate=604800");
    RESPONSE.setHeader("CDN-Cache-Control", "max-age=3600, stale-while-revalidate=604800");
    RESPONSE.setHeader("Cache-Control", "max-age=3600, stale-while-revalidate=604800");
    const WIDTH = REQUEST.query.width;

    if (WIDTH === undefined) {
      throw new Error(`"width" is not defined`);
    }

    const TOTAL_WIDTH = parseInt(WIDTH);

    if (TOTAL_WIDTH === NaN || TOTAL_WIDTH <= 0) {
      throw new Error(`"${WIDTH}" is not a valid width`);
    }

    const THEME_NAME = REQUEST.query.theme ?? "dark";
    const THEME = THEMES[THEME_NAME.replaceAll("-", "_")];

    if (THEME === undefined) {
      throw new Error(`"${THEME_NAME}" is not a supported theme`);
    }

    let sizes = new Map(
      Object.entries(
        (
          await axios({
            url: `https://${process.env.VERCEL_URL}/api/sizes`,
            headers: {
              Accept: "application/json",
            },
          })
        ).data
      ).sort(([_, a], [__, b]) => {
        return a - b;
      })
    );

    sizes.delete("UTC");
    let totalSize = sizes.get("totalSize");
    sizes.delete("totalSize");

    for (const [LANGUAGE_NAME, SIZE] of sizes) {
      if (((TOTAL_WIDTH - 2 * (sizes.size - 1)) * SIZE) / totalSize < 2) {
        sizes.delete(LANGUAGE_NAME);
        totalSize -= SIZE;
      } else {
        break;
      }
    }

    sizes = new Map(
      [...sizes.entries()].sort(([_, a], [__, b]) => {
        return b - a;
      })
    );

    const LANGUAGES_WIDTH = TOTAL_WIDTH - 2 * (sizes.size - 1);
    let rects = "";
    let x = 0;

    for (const [LANGUAGE_NAME, SIZE] of sizes) {
      const LANGUAGE = LANGUAGES[LANGUAGE_NAME];

      if (LANGUAGE === undefined) {
        throw new Error(`"${LANGUAGE_NAME}" is not a supported language`);
      }

      const WIDTH = (LANGUAGES_WIDTH * SIZE) / totalSize;

      rects += `
        <rect
          x="${x}"
          y="0"
          width="${WIDTH}"
          height="8"
          fill="${LANGUAGE.color}"
          mask="url(#mask)"
        ></rect>
      `;

      x += WIDTH + 2;
    }

    RESPONSE.send(`
      <svg width="${TOTAL_WIDTH}" height="8" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask">
          <rect x="0" y="0" width="${TOTAL_WIDTH}" height="8" rx="4" fill="#ffffff"></rect>
        </mask>
        <rect
          x="0"
          y="0"
          width="${TOTAL_WIDTH}"
          height="8"
          fill="${THEME.barColor}"
          mask="url(#mask)"
        ></rect>
        ${rects}
      </svg>
    `);
  } catch (error) {
    RESPONSE.setHeader("Content-Type", "text/plain");
    RESPONSE.setHeader("Cache-Control", "no-store");
    RESPONSE.send(error.message);
  }
}
