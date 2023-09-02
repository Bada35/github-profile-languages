import { getSizes } from "./sizes.js";
import { LANGUAGES } from "./languages.js";

async function createBar(BAR_WIDTH) {
  const TOTAL_WIDTH = parseInt(BAR_WIDTH);

  if (TOTAL_WIDTH <= 0) {
    throw new Error(`"${TOTAL_WIDTH}" is not a valid width`);
  }

  const SIZES = new Map(
    Object.entries(await getSizes()).sort(([_, a], [__, b]) => {
      return b - a;
    })
  );

  const TOTAL_SIZE = SIZES.get("totalSize");
  SIZES.delete("totalSize");
  let x = 0;
  let rects = "";

  for (const [LANGUAGE_NAME, SIZE] of SIZES) {
    const LANGUAGE = LANGUAGES[LANGUAGE_NAME];

    if (LANGUAGE === undefined) {
      throw new Error(`"${LANGUAGE_NAME}" is not supported`);
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

  return `
    <svg width="${TOTAL_WIDTH}" height="8" xmlns="http://www.w3.org/2000/svg">
      <mask id="mask">
        <rect x="0" y="0" width="${TOTAL_WIDTH}" height="8" rx="4" ry="4" fill="#ffffff"></rect>
      </mask>
      ${rects}
    </svg>
  `;
}

export { createBar };
