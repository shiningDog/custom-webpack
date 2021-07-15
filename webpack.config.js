const HtmlWebpackPlugin = require("./pluginAndLoader/html-webpack-plugin");
const ClearDirPlugin = require("./pluginAndLoader/clear-dir-plugin");
module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.tmp$/,
        exclude: /(node_modules)/,
        use: {
          loader: "./pluginAndLoader/infoLoader.js",
          options: { dom: "h5" },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new ClearDirPlugin({
      dir: "./dist",
    }),
  ],
};
