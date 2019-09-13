/* eslint-disable no-console */
import chalk from "chalk";
import express from "express";
import gulp from "gulp";
import _ from "lodash";
import path from "path";
import * as shell from "shelljs";
import webpack from "webpack";
import webpackDevServer from "webpack-dev-server";
import rmrf from "rimraf";
import fse from "fs-extra";
import {
    DEV_SERVER,
    COMPILE,
    PUBLISH,
    PUBLISH_MINOR,
    PUBLISH_MAJOR,
    PUBLISH_DONE,
    BUMP_START,
    BUMP_END,
    BUMP_PATCH,
    BUMP_MINOR,
    BUMP_MAJOR,
    // @ts-ignore
} from "./gulpTasks.json";
// @ts-ignore
import pkg from "./package.json";
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
type IGulpTaskDoneFn = (error?: any) => void;

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

const init = (done: IGulpTaskDoneFn) => {
    isExiting = false;
    done();
};
gulp.task("init", init);

const initDev = (done: IGulpTaskDoneFn) => {
    process.env.NODE_ENV = "development";
    showVariables();
    done();
};
gulp.task("init:dev", gulp.series("init", initDev));

const initProd = (done: IGulpTaskDoneFn) => {
    process.env.NODE_ENV = "production";
    showVariables();
    done();
};
gulp.task("init:prod", gulp.series("init", initProd));

const devServer = () => {
    const webpackConfig = getWebpackConfig(process.env);
    if (!webpackConfig.plugins) {
        return exit(EC.WEBPACK_PLUGINS_NOEXIST);
    }

    if (fse.existsSync("dist/")) {
        console.warn(
            chalk.yellow.bold("WARNING:"),
            chalk.yellow(
                "A 'dist' folder exists at the root of the folder. Unless you know what you are doing, delete this folder before running the dev server."
            )
        );
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
};
gulp.task(DEV_SERVER.task, gulp.series("init:dev", devServer));

const [major, minor, patch] = pkg.version.split(".");
let newVersion: string;

const bumpStart = (done: IGulpTaskDoneFn) => {
    console.log(chalk.blue("Bumping version..."));
    done();
};
gulp.task(BUMP_START.task, bumpStart);

const bumpEnd = (done: IGulpTaskDoneFn) => {
    const newPkg = Object.assign({}, pkg, { version: newVersion }); // update version
    fse.writeFileSync("./package.json", JSON.stringify(newPkg, null, 4));

    console.log(
        chalk.green("Package Version Updated"),
        chalk.bold.white(pkg.version),
        chalk.green("->"),
        chalk.bold.white(newVersion)
    );
    done();
};
gulp.task(BUMP_END.task, bumpEnd);

const bumpPatch = (done: IGulpTaskDoneFn) => {
    newVersion = `${major}.${minor}.${parseInt(patch) + 1}`;
    done();
};
gulp.task(BUMP_PATCH.task, gulp.series(bumpStart, bumpPatch, bumpEnd));

const bumpMinor = (done: IGulpTaskDoneFn) => {
    newVersion = `${major}.${parseInt(minor) + 1}.${0}`;
    done();
};
gulp.task(BUMP_MINOR.task, gulp.series(bumpStart, bumpMinor, bumpEnd));

const bumpMajor = (done: IGulpTaskDoneFn) => {
    newVersion = `${parseInt(major) + 1}.${0}.${0}`;
    done();
};
gulp.task(BUMP_MAJOR.task, gulp.series(bumpStart, bumpMajor, bumpEnd));

gulp.task("default", gulp.series(DEV_SERVER.task));

const compile = (done: IGulpTaskDoneFn) => {
    console.log(chalk.blue("Compiling..."));
    rmrf.sync("./dist");
    shell.exec("tsc");
    fse.copySync("./src/styles", "./dist/src/styles");
    console.log(chalk.green("Compiled!"));
    done();
};
gulp.task(COMPILE.task, gulp.series(initProd, compile));

const publishDone = (done: IGulpTaskDoneFn) => {
    console.log(
        chalk.green("✔ succesfully published TRC"),
        chalk.white("( https://www.npmjs.com/package/tchin-react-components )")
    );
    rmrf.sync("./dist");
    done();
};
gulp.task(PUBLISH_DONE.task, publishDone);

const publish = (done: IGulpTaskDoneFn) => {
    shell.exec("npm publish");
    done();
};
gulp.task(
    PUBLISH.task,
    gulp.series(BUMP_PATCH.task, COMPILE.task, publish, publishDone)
);

const publishMinor = (done: IGulpTaskDoneFn) => {
    shell.exec("npm publish");
    done();
};
gulp.task(
    PUBLISH_MINOR.task,
    gulp.series(BUMP_MINOR.task, COMPILE.task, publishMinor, publishDone)
);

const publishMajor = (done: IGulpTaskDoneFn) => {
    shell.exec("npm publish");
    done();
};
gulp.task(
    PUBLISH_MAJOR.task,
    gulp.series(BUMP_MAJOR.task, COMPILE.task, publishMajor, publishDone)
);
