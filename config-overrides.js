const {
  override,
  addLessLoader,
  fixBabelImports,
  addWebpackAlias,
  addDecoratorsLegacy,
  addBabelPlugins,
} = require("customize-cra");
const { resolve } = require("path");
const WebpackBar = require("webpackbar");

const addPlugins = () => (config) => {
  config.plugins.push(
    new WebpackBar({
      color: "#95b4cc",
      name: "❖",
    })
  );

  return config;
};

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
      "primary-color": "#95b4cc",
    },
  }),
  addWebpackAlias({
    "@services": resolve(__dirname, "./src/services"),
    "@constants": resolve(__dirname, "./src/constants"),
  }),
  addPlugins()
);
