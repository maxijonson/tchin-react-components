import ExtractTextPlugin from "extract-text-webpack-plugin";
import * as _ from "lodash";
import path from "path";
import TSLintPlugin from "tslint-webpack-plugin";
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
    const TSLint = new TSLintPlugin({
        files: ["./src/**/*.ts"],
        config: "./tslint.json",
        project: "./tsconfig.json",
        outputAbsolutePaths: false,
        warningsAsError: true,
    });

    return {
        entry: ["babel-polyfill", "./src/index.tsx"],
        output: {
            path: path.join(__dirname, "public/dist"),
            filename: "bundle.js",
        },
        module: {
            rules: [
                {
                    loader: "babel-loader",
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
                    use: "ts-loader",
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            modules: [path.resolve(__dirname), "node_modules"],
            extensions: [".tsx", ".ts", ".js", ".json"],
        },
        plugins: [CSSExtract, TSLint],
        mode: isProduction ? "production" : "development",
        devtool: isProduction ? "source-map" : "inline-source-map",
        devServer: {
            contentBase: path.join(__dirname, "public"),
            historyApiFallback: true,
            publicPath: "/dist/",
        },
    };
};

export default config;
