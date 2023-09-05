import axios from "axios";
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

    if (TOTAL_WIDTH <= 0) {
      throw new Error(`"${TOTAL_WIDTH}" is not a valid width`);
    }

    const SIZES = new Map(
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
        return b - a;
      })
    );

    SIZES.delete("UTC");
    const TOTAL_SIZE = SIZES.get("totalSize");
    SIZES.delete("totalSize");
    let x = 0;
    let rects = "";

    for (const [LANGUAGE_NAME, SIZE] of SIZES) {
      const LANGUAGE = LANGUAGES[LANGUAGE_NAME];

      if (LANGUAGE === undefined) {
        throw new Error(`"${LANGUAGE_NAME}" is not a supported language`);
      }

      const WIDTH = Math.round((TOTAL_WIDTH * SIZE) / TOTAL_SIZE);

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

      x += WIDTH;
    }

    RESPONSE.send(`
      <svg width="${TOTAL_WIDTH}" height="8" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask">
          <rect x="0" y="0" width="${TOTAL_WIDTH}" height="8" rx="4" ry="4" fill="#ffffff"></rect>
        </mask>
        ${rects}
      </svg>
    `);
  } catch (error) {
    RESPONSE.setHeader("Content-Type", "text/plain");
    RESPONSE.setHeader("Cache-Control", "no-store");
    RESPONSE.send(error.message);
  }
}
