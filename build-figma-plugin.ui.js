// build-figma-plugin.main.js

const rawPlugin = require("./plugin/raw");

module.exports = function (buildOptions) {
  return {
    ...buildOptions,
    plugins: [rawPlugin(), ...buildOptions.plugins],
  };
};
