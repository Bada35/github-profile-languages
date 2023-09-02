const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    "button-template": path.resolve(__dirname, "tools/button-template.js"),
    "languages-generator": path.resolve(__dirname, "tools/languages-generator.js"),
    "themes-generator": path.resolve(__dirname, "tools/themes-generator.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
};
