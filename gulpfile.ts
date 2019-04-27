import chalk from "chalk";
import express from "express";
import gulp from "gulp";
import * as _ from "lodash";
import path from "path";
import * as shell from "shelljs";
import webpack from "webpack";
import webpackDevServer from "webpack-dev-server";
import { DEV_SERVER } from "./gulpTasks.json";
import getWebpackConfig from "./webpack.config";

shell.config.silent = true;
shell.config.verbose = false;

// > 1000 = Good exit
// < 1000 = Bad exit (error)
interface IExitCode {
    code: number;
    message?: string;
}
interface IExitCodes {
    [name: string]: IExitCode;
}

const showVariables = () => {
    const shown = ["NODE_ENV"];
    console.log(chalk.magenta(`process.env variables: `) + chalk.cyan(`{`));
    for (const env in process.env) {
        if (process.env.hasOwnProperty(env)) {
            const value = process.env[env];
            if (_.includes(shown, env)) {
                console.log(
                    chalk.blue(`    ${env}: `) +
                        chalk.gray(value || "undefined")
                );
            }
        }
    }
    console.log(chalk.cyan(`}`));
};

let isExiting = false;
const exit = (c: IExitCode) => {
    if (isExiting) {
        return;
    }
    const { code, message } = c;

    if (message) {
        code >= 1000
            ? console.info(chalk.blue(`${code}: ${message}`))
            : console.error(chalk.red(`${code}: ${message}`));
    }

    isExiting = true;
};

const EC: IExitCodes = {
    WEBPACK_PLUGINS_NOEXIST: {
        code: 8,
        message: "Webpack plugins array does not exist",
    },
};

gulp.task("init", (done) => {
    isExiting = false;
    done();
});

gulp.task(
    "init:dev",
    gulp.series("init", (done) => {
        process.env.NODE_ENV = "development";
        showVariables();
        done();
    })
);

gulp.task(DEV_SERVER.task, () => {
    const webpackConfig = getWebpackConfig(process.env);
    if (!webpackConfig.plugins) {
        return exit(EC.WEBPACK_PLUGINS_NOEXIST);
    }
    webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
    const options = {
        contentBase: path.join(__dirname, "public"),
        historyApiFallback: true,
        publicPath: "/dist/",
        hot: true,
        quiet: false,
        noInfo: false,
        compress: true,
        disableHostCheck: true,
        host: "0.0.0.0",
        port: 1337,
        stats: {
            colors: true,
            chunks: true,
        },
        before: (app: express.Application) =>
            app.use("/dist/" + "static", express.static("static")),
    };
    webpackDevServer.addDevServerEntrypoints(webpackConfig, options);
    const compiler = webpack(webpackConfig);
    const server = new webpackDevServer(compiler, options);

    server.listen(options.port, options.host, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.info(
                `${chalk.blue(
                    "✪"
                )} Webpack Development Server is listening on port ${chalk.blue(
                    options.port.toString()
                )}`
            );
        }
    });
});

gulp.task("default", gulp.series("init:dev", DEV_SERVER.task));
