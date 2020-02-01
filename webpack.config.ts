/* eslint-disable global-require */
import ExtractTextPlugin from "extract-text-webpack-plugin";
import CircularDependencyPlugin from "circular-dependency-plugin";

import path from "path";

import webpack = require("webpack");

process.env.NODE_ENV = process.env.NODE_ENV || "development";

if (process.env.NODE_ENV === "test") {
    require("dotenv").config({ path: ".env.test" });
} else if (process.env.NODE_ENV === "development") {
    require("dotenv").config({ path: ".env.development" });
}

const config = (env: NodeJS.ProcessEnv): webpack.Configuration => {
    const isProduction = env.NODE_ENV === "production";
    const CSSExtract = new ExtractTextPlugin("styles.css");
    const CircularDependency = new CircularDependencyPlugin({
        exclude: /a\.js|node_modules/,
        failOnError: true,
        cwd: process.cwd(),
    });

    return {
        entry: ["babel-polyfill", "./website/index.tsx"],
        output: {
            path: path.join(__dirname, "public/dist"),
            filename: "bundle.js",
        },
        module: {
            rules: [
                {
                    use: ["babel-loader", "eslint-loader"],
                    test: /\.js$/,
                    exclude: /node_modules/,
                },
                {
                    test: /\.s?css$/,
                    use: CSSExtract.extract({
                        use: [
                            {
                                loader: "css-loader",
                                options: {
                                    sourceMap: true,
                                },
                            },
                            {
                                loader: "sass-loader",
                                options: {
                                    sourceMap: true,
                                },
                            },
                        ],
                    }),
                },
                {
                    test: /\.tsx?$/,
                    enforce: "pre",
                    use: ["ts-loader", "eslint-loader"],
                    exclude: /node_modules/,
                },
                {
                    test: /\.txt$/i,
                    use: "raw-loader",
                },
            ],
        },
        resolve: {
            modules: [path.resolve(__dirname), "node_modules"],
            extensions: [".tsx", ".ts", ".js", ".json"],
        },
        plugins: [CSSExtract, CircularDependency],
        mode: isProduction ? "production" : "development",
        devtool: isProduction ? "source-map" : "eval-source-map",
        devServer: {
            contentBase: path.join(__dirname, "public"),
            historyApiFallback: true,
            publicPath: "/dist/",
        },
    };
};

export default config;
