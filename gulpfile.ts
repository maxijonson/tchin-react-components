/* eslint-disable no-console */
import chalk from "chalk";
import express from "express";
import gulp from "gulp";
import _ from "lodash";
import path from "path";
import * as shell from "shelljs";
import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import rmrf from "rimraf";
import fse from "fs-extra";
import {
    DEV_SERVER,
    COMPILE,
    PUBLISH,
    PUBLISH_MINOR,
    PUBLISH_MAJOR,
    PUBLISH_TEST,
    PUBLISH_DONE,
    BUMP_START,
    BUMP_END,
    BUMP_PATCH,
    BUMP_MINOR,
    BUMP_MAJOR,
} from "./gulpTasks.json";
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
        if (process.env[env]) {
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
        if (code >= 1000) {
            console.info(chalk.blue(`${code}: ${message}`));
        } else {
            console.error(chalk.red(`${code}: ${message}`));
        }
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
exports.init = init;

const initDev = (done: IGulpTaskDoneFn) => {
    process.env.NODE_ENV = "development";
    showVariables();
    done();
};
exports["init:dev"] = gulp.series(exports.init, initDev);

const initProd = (done: IGulpTaskDoneFn) => {
    process.env.NODE_ENV = "production";
    showVariables();
    done();
};
exports["init:prod"] = gulp.series(exports.init, initProd);

const devServer = () => {
    const webpackConfig = getWebpackConfig(process.env);
    if (!webpackConfig.plugins) {
        exit(EC.WEBPACK_PLUGINS_NOEXIST);
        return;
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
        port: Number(process.env.DEV_SERVER_PORT) || 1338,
        stats: {
            colors: true,
            chunks: true,
        },
        before: (app: express.Application) =>
            app.use("/dist/static", express.static("static")),
    };
    WebpackDevServer.addDevServerEntrypoints(webpackConfig, options);
    const compiler = webpack(webpackConfig);
    const server = new WebpackDevServer(compiler, options);

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
exports[DEV_SERVER.task] = gulp.series(exports["init:dev"], devServer);

const [major, minor, patch] = pkg.version.split(".");
let newVersion: string;

const bumpStart = (done: IGulpTaskDoneFn) => {
    console.log(chalk.blue("Bumping version..."));
    done();
};
exports[BUMP_START.task] = bumpStart;

const bumpEnd = (done: IGulpTaskDoneFn) => {
    const newPkg = { ...pkg, version: newVersion }; // update version
    fse.writeFileSync("./package.json", JSON.stringify(newPkg, null, 4));

    console.log(
        chalk.green("Package Version Updated"),
        chalk.bold.white(pkg.version),
        chalk.green("->"),
        chalk.bold.white(newVersion)
    );
    done();
};
exports[BUMP_END.task] = bumpEnd;

const bumpPatch = (done: IGulpTaskDoneFn) => {
    newVersion = `${major}.${minor}.${parseInt(patch, 10) + 1}`;
    done();
};
exports[BUMP_PATCH.task] = gulp.series(bumpStart, bumpPatch, bumpEnd);

const bumpMinor = (done: IGulpTaskDoneFn) => {
    newVersion = `${major}.${parseInt(minor, 10) + 1}.${0}`;
    done();
};
exports[BUMP_MINOR.task] = gulp.series(bumpStart, bumpMinor, bumpEnd);

const bumpMajor = (done: IGulpTaskDoneFn) => {
    newVersion = `${parseInt(major, 10) + 1}.${0}.${0}`;
    done();
};
exports[BUMP_MAJOR.task] = gulp.series(bumpStart, bumpMajor, bumpEnd);

exports.default = exports[DEV_SERVER.task];

const removeDist = (done: IGulpTaskDoneFn) => {
    rmrf.sync("./dist");
    done();
};

const compileTS = (done: IGulpTaskDoneFn) => {
    console.log(chalk.blue("Compiling..."));
    if (shell.exec("tsc").code != 0) done("FAILED: Compilation errors");
    done();
};

const copyStyles = (done: IGulpTaskDoneFn) => {
    fse.copySync("./src/styles", "./dist/src/styles");
    done();
};

const compileDone = (done: IGulpTaskDoneFn) => {
    console.log(chalk.green("Compiled!"));
    done();
};

exports[COMPILE.task] = gulp.series(
    initProd,
    removeDist,
    compileTS,
    copyStyles,
    compileDone
);

const publishDone = (done: IGulpTaskDoneFn) => {
    console.log(
        chalk.green("✔ succesfully published TRC"),
        chalk.white("( https://www.npmjs.com/package/tchin-react-components )")
    );
    rmrf.sync("./dist");
    done();
};
exports[PUBLISH_DONE.task] = publishDone;

const publish = (done: IGulpTaskDoneFn) => {
    shell.exec("npm publish");
    done();
};
exports[PUBLISH.task] = gulp.series(
    exports[BUMP_PATCH.task],
    exports[COMPILE.task],
    publish,
    publishDone
);

exports[PUBLISH_MINOR.task] = gulp.series(
    exports[BUMP_MINOR.task],
    exports[COMPILE.task],
    publish,
    publishDone
);

exports[PUBLISH_MAJOR.task] = gulp.series(
    exports[BUMP_MAJOR.task],
    exports[COMPILE.task],
    publish,
    publishDone
);

const publishTest = (done: IGulpTaskDoneFn) => {
    const TRC = "trc";

    console.log(`rm -rf ${TRC}.tgz`);
    fse.removeSync(`${TRC}.tgz`);

    console.log(chalk.blue("packaging TRC..."));
    shell.exec("npm pack");
    fse.renameSync(`tchin-react-components-${pkg.version}.tgz`, `${TRC}.tgz`);
    console.log(chalk.green("✔ succesfully packaged TRC"));

    console.log(chalk.blue("removing dist"));
    rmrf.sync("./dist");

    console.log(
        chalk.white("use"),
        chalk.blue(`npm i path/to/${TRC}.tgz`),
        chalk.white("to install it")
    );
    done();
};

exports[PUBLISH_TEST.task] = gulp.series(exports[COMPILE.task], publishTest);
