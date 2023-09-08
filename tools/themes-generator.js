import colors from "@primer/primitives/dist/js/colors";

let themes = {};

for (const THEME in colors) {
  const COLORS_THEME = colors[THEME];
  const BUTTON_COLOR = COLORS_THEME.canvas.default;
  let barColor = COLORS_THEME.neutral.subtle;

  if (barColor.startsWith("rgba")) {
    const [RED, GREEN, BLUE, ALPHA] = barColor.slice(5, -1).split(",");

    barColor = `#${(
      Math.round(parseInt(BUTTON_COLOR.slice(1, 3), 16) * (1 - ALPHA)) + Math.round(RED * ALPHA)
    ).toString(16)}${(
      Math.round(parseInt(BUTTON_COLOR.slice(3, 5), 16) * (1 - ALPHA)) + Math.round(GREEN * ALPHA)
    ).toString(16)}${(
      Math.round(parseInt(BUTTON_COLOR.slice(5), 16) * (1 - ALPHA)) + Math.round(BLUE * ALPHA)
    ).toString(16)}`;
  }

  themes[THEME] = {
    barColor: barColor,
    buttonColor: BUTTON_COLOR,
    languageColor: COLORS_THEME.fg.default,
    percentColor: COLORS_THEME.fg.muted,
  };
}

document.body.innerText = `
  const THEMES = ${JSON.stringify(themes)};

  export { THEMES };
`;
