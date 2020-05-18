const { resolve } = require("path");
const webpack = require("webpack");
const {
  override,
  addDecoratorsLegacy,
  addBabelPlugins,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
} = require("customize-cra");
const WebpackBar = require("webpackbar");
const { isEqual } = require("underscore");

const addPlugins = () => (config) => {
  console.log("aa");
  config.plugins.push(
    new WebpackBar({
      color: "#faad14",
      name: "❖",
    }),
    require("autoprefixer"),
    new webpack.ProvidePlugin({
      "window.less": "less",
    })
  );

  config.module.rules[2].oneOf.push({
    test: /\.(ogg|mp3|wav|mpe?g)$/i,
    loader: "file-loader",
  });

  config.module.rules = config.module.rules.filter(
    (rule) => !isEqual(rule, { parser: { requireEnsure: false } })
  );

  Object.assign(config, {
    devtool: process.env.SOURCE_MAP ? "source-map" : false,
    optimization: {
      ...config.optimization,
      namedModules: true,
      namedChunks: true,
      splitChunks: {
        ...config.optimization.splitChunks,
        cacheGroups: { default: false },
      },
    },
  });

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
      "primary-color": "#5D9C5A",
    },
  }),
  addWebpackAlias({
    "@components": resolve(__dirname, "./src/components"),
    "@constants": resolve(__dirname, "./src/constants"),
    "@graphql": resolve(__dirname, "./src/graphql"),
    "@misc": resolve(__dirname, "./src/misc"),
    "@pages": resolve(__dirname, "src/pages"),
    "@store": resolve(__dirname, "src/store"),
    "@router": resolve(__dirname, "src/router"),
    "@utils": resolve(__dirname, "src/utils"),
    "@interfaces": resolve(__dirname, "./src/utils/interfaces"),
  }),
  addPlugins()
);
