const {
  override,
  addLessLoader,
  fixBabelImports,
  addWebpackAlias,
  addDecoratorsLegacy,
  addBabelPlugins,
} = require("customize-cra");
const { resolve } = require("path");

module.exports = override(
  addDecoratorsLegacy(),
  ...addBabelPlugins(
    "@babel/plugin-transform-spread",
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    "@babel/plugin-syntax-dynamic-import"
  ),
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      "primary-color": "#E566AD",
    },
  }),
  addWebpackAlias({
    "@services": resolve(__dirname, "./src/services"),
  })
);
