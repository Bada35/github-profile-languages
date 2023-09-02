import colors from "@primer/primitives/dist/js/colors";

let themes = {};

for (const THEME in colors) {
  const COLORS_THEME = colors[THEME];

  themes[THEME] = {
    backgroundColor: COLORS_THEME.canvas.default,
    languageColor: COLORS_THEME.fg.default,
    percentColor: COLORS_THEME.fg.muted,
  };
}

document.body.innerText = `
  const THEMES = ${JSON.stringify(themes)};

  export { THEMES };
`;
