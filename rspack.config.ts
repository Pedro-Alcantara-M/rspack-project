import { rspack } from "@rspack/core";
import * as RefreshPlugin from "@rspack/plugin-react-refresh";
import { withZephyr } from "zephyr-webpack-plugin";
import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";

const isDev = process.env.NODE_ENV === "development";

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ["chrome >= 87", "edge >= 88", "firefox >= 78", "safari >= 14"];

export default withZephyr()({
  context: __dirname,
    output: {
    publicPath: 'http://localhost:3001/', 
  },
  entry: {
    main: "./src/index.tsx",
  },
  resolve: {
    extensions: ["...", ".ts", ".tsx", ".jsx"],
  },
  devServer: {
    host: "localhost",
    port: 3001,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: "asset",
      },
      {
        test: /\.(jsx?|tsx?)$/,
        use: [
          {
            loader: "builtin:swc-loader",
            options: {
              jsc: {
                parser: {
                  syntax: "typescript",
                  tsx: true,
                },
                transform: {
                  react: {
                    runtime: "automatic",
                    development: isDev,
                    refresh: isDev,
                  },
                },
              },
              env: { targets },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "remote",
      filename: "remoteEntry.js",
      exposes: {
        "./button": "./src/button.tsx",
      },
      shared: ["react", "react-dom"],
    }),
    new rspack.HtmlRspackPlugin({
      template: "./index.html",
    }), 
    // @ts-expect-error
    isDev ? new RefreshPlugin() : null,
  ].filter(Boolean),
  optimization: {
    minimizer: [
      // @ts-expect-error
      new rspack.SwcJsMinimizerRspackPlugin(),
      // @ts-expect-error
      new rspack.LightningCssMinimizerRspackPlugin({
        minimizerOptions: { targets },
      }),
    ],
  },
  experiments: {
    css: true,
  },
});
