/* eslint-disable no-console */
import chalk from "chalk";
import express from "express";
import gulp from "gulp";
import inquirer from "inquirer";
import simpleGit from "simple-git/promise";
import _ from "lodash";
import path from "path";
import * as shell from "shelljs";
import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import rmrf from "rimraf";
import fse from "fs-extra";
import { DEV_SERVER } from "./gulpTasks.json";
import pkg from "./package.json";
import getWebpackConfig from "./webpack.config";

const git = simpleGit();

const out = {
    write: (message: string) => {
        process.stdout.write(message);
    },
    success: (message?: string) => {
        out.write(`✔️ ${message ?? ""}\n`);
    },
    failed: (message?: string) => {
        out.write(`❌ ${message ?? ""}\n`);
    },
    clearLn: (dir: 1 | 0 | -1) => {
        process.stdout.clearLine(dir);
    },
    writeLn: (message: string) => process.stdout.write(`\n${message}`),
    cls: () => {
        console.clear();
    },
} as const;

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

const compile = () => {
    // Init prod env
    process.env.NODE_ENV = "production";

    // Remove dist folder (if exist)
    rmrf.sync("./dist");

    // Compile TypeScript to JavaScript
    if (shell.exec("tsc").code != 0)
        throw new Error(
            "FAILED: Compilation errors. Run TSC manually to see them"
        );

    // Copy styles to dist
    fse.copySync("./src/styles", "./dist/src/styles");
};

const publish = async (done: IGulpTaskDoneFn) => {
    out.cls();

    // Check if git working directory is clean (npm version will fail otherwise)
    out.write("Checking git directory... ");
    if (!(await git.status()).isClean()) {
        out.failed("Directory not clean.");
        return done(1);
    }
    out.success();

    // Lint code
    out.write("Linting code... ");
    if (shell.exec("npm run lint").code != 0) {
        out.failed("Failed.");
        return done(1);
    }
    out.success();

    enum Severities {
        patch = "patch",
        minor = "minor",
        major = "major",
    }
    const severities = [
        { name: "Patch", value: Severities.patch },
        { name: "Minor", value: Severities.minor },
        { name: "Major", value: Severities.major },
    ] as const;

    enum Kinds {
        normal = "normal",
        beta = "beta",
        rc = "rc",
    }
    const specialKinds = [
        { name: "Beta", value: Kinds.beta },
        { name: "RC", value: Kinds.rc },
    ] as const;
    const kinds = [
        { name: "Normal", value: Kinds.normal },
        ...specialKinds,
    ] as const;

    const { version } = pkg;
    const isSpecialKind = version.indexOf("-") != -1;
    const mainVersion = isSpecialKind
        ? version.substring(0, version.indexOf("-"))
        : version;

    // Check if current version is a special version
    if (isSpecialKind) {
        const [kind, n] = version
            .substring(version.indexOf("-") + 1)
            .split(".");

        const specialKind = _.find(specialKinds, (s) => s.value == kind);

        if (!specialKind) {
            out.failed(`${kind} is not a recognized special version kind`);
            return done();
        }

        // Ask to bump the special kind version. Else, proceed to normal prompt.
        if (
            (
                await inquirer.prompt([
                    {
                        name: "value",
                        type: "confirm",
                        message: `The version is currently in "${kind}.${n}". Do you wish to continue with this version and bump the number?`,
                    },
                ])
            ).value
        ) {
            out.write("Compiling... ");
            try {
                compile();
            } catch (e) {
                out.failed(e.message);
                return done();
            }
            out.success();

            out.write("Bumping version... ");
            shell.exec(`npm version ${mainVersion}-${kind}.${Number(n) + 1}`);
            out.success();

            return done();
        }
    }

    // Ask questions about the release
    const answers = await inquirer.prompt([
        {
            name: "severity",
            type: "list",
            message: "What is the severity of this release?",
            choices: severities,
        },
        {
            name: "kind",
            type: "list",
            message: "What kind of version is this release?",
            choices: kinds,
        },
        {
            name: "confirm",
            type: "confirm",
            message: "Are you sure you want to proceed with the options above?",
        },
    ]);
    const { confirm, severity, kind } = answers;

    // Cancel publish
    if (!confirm) return done();

    // Get new version
    const newVersion = (() => {
        const [M, m, p] = mainVersion.split(".");
        let v = "";
        switch (severity) {
            case Severities.patch:
                v = `${M}.${m}.${Number(p) + 1}`;
                break;
            case Severities.minor:
                v = `${M}.${Number(m) + 1}.0`;
                break;
            case Severities.major:
                v = `${Number(M) + 1}.0.0`;
                break;
            default:
                // Should never happen
                v = `${M}.${m}.${p}`;
        }
        if (kind != Kinds.normal) {
            v += `-${kind}.0`;
        }
        return v;
    })();

    out.write("Compiling... ");
    try {
        compile();
    } catch (e) {
        out.failed(e.message);
        return done();
    }
    out.success();

    out.write("Bumping version... ");
    shell.exec(`npm version ${newVersion}`);
    out.success();

    done();
};

exports.publish = gulp.series(publish);

// exports[PUBLISH_DONE.task] = publishDone;

// const publishTest = (done: IGulpTaskDoneFn) => {
//     const TRC = "trc";

//     console.log(`rm -rf ${TRC}.tgz`);
//     fse.removeSync(`${TRC}.tgz`);

//     console.log(chalk.blue("packaging TRC..."));
//     shell.exec("npm pack");
//     fse.renameSync(`tchin-react-components-${pkg.version}.tgz`, `${TRC}.tgz`);
//     console.log(chalk.green("✔ succesfully packaged TRC"));

//     console.log(chalk.blue("removing dist"));
//     rmrf.sync("./dist");

//     console.log(
//         chalk.white("use"),
//         chalk.blue(`npm i path/to/${TRC}.tgz`),
//         chalk.white("to install it")
//     );
//     done();
// };

// exports[PUBLISH_TEST.task] = gulp.series(exports[COMPILE.task], publishTest);

exports.default = exports[DEV_SERVER.task];
