// const { defineConfig } = require('@vue/cli-service');
// module.exports = defineConfig({
//   transpileDependencies: true,
// });
// ;

const fs = require("fs");
const path = require("path");
// const webpack = require("webpack");
require('dotenv/config');


​let disableHostCheck;
let https;

// ​const opts = {
//   DEBUG: false,
//   IS_WEB: true,
//   ENGINE_RUN: process.env.VUE_APP_ENGINE_RUN,
//   version: 1,
// };
// const optImg = {
//   name: "static/img/[name].[hash:8].[ext]",
//   context: "static",
// };
// ​const opt = {
//   limit: -1,
//   name: "static/[path]/[name].[ext]",
//   context: "static",
// };
disableHostCheck = true;
if (process.env.NODE_ENV !== "production") {
  https = {
    key: fs.readFileSync("./ssl/tls.key"),
    cert: fs.readFileSync("./ssl/tls.crt"),
  };
}
module.exports = {
  transpileDependencies: true,
  runtimeCompiler: true,
  assetsDir: "./static",
  chainWebpack: (config) => {
    config.resolve.alias
      .set("__staticDir", path.join(__dirname, "./static"))
      .set("__mainSrcDir", path.join(__dirname, "./src"))
      .set(
        "__multibookTypeDir",
        path.join(
          __dirname,
          "./static",
          `./${process.env.VUE_APP_MULTIBOOK_TYPE}`
        )
      )
      .set("__rootDir", path.join(__dirname));
  },
  devServer: {
    compress: true,
    allowedHosts: [
      "spacer-magic.pl:8081",
      "spacer-magic.pl",
      "localhost:8081",
    ],
    // disableHostCheck: true,
    https: https,
    port: 8081,
    // host: "0.0.0.0",
    client: {
      webSocketTransport: "ws",
    },
    webSocketServer: "ws",
  },
};