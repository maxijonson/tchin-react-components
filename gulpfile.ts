/* eslint-disable no-console */
import chalk from "chalk";
import express from "express";
import gulp from "gulp";
import * as _ from "lodash";
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

gulp.task(
    "init:prod",
    gulp.series("init", (done) => {
        process.env.NODE_ENV = "production";
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

const [major, minor, patch] = pkg.version.split(".");
let newVersion: string;

gulp.task(
    BUMP_START.task,
    gulp.series((done) => {
        console.log(chalk.blue("Bumping version..."));
        done();
    })
);
gulp.task(
    BUMP_END.task,
    gulp.series((done) => {
        const newPkg = Object.assign({}, pkg, { version: newVersion }); // update version
        fse.writeFileSync("./package.json", JSON.stringify(newPkg, null, 4));

        console.log(
            chalk.green("Package Version Updated"),
            chalk.bold.white(pkg.version),
            chalk.green("->"),
            chalk.bold.white(newVersion)
        );
        done();
    })
);

gulp.task(
    BUMP_PATCH.task,
    gulp.series(
        BUMP_START.task,
        (done) => {
            newVersion = `${major}.${minor}.${parseInt(patch) + 1}`;
            done();
        },
        BUMP_END.task
    )
);

gulp.task(
    BUMP_MINOR.task,
    gulp.series(
        BUMP_START.task,
        (done) => {
            newVersion = `${major}.${parseInt(minor) + 1}.${0}`;
            done();
        },
        BUMP_END.task
    )
);

gulp.task(
    BUMP_MAJOR.task,
    gulp.series(
        BUMP_START.task,
        (done) => {
            newVersion = `${parseInt(major) + 1}.${0}.${0}`;
            done();
        },
        BUMP_END.task
    )
);

gulp.task("default", gulp.series("init:dev", DEV_SERVER.task));

gulp.task(
    COMPILE.task,
    gulp.series("init:prod", (done) => {
        console.log(chalk.blue("Compiling..."));
        rmrf.sync("./dist");
        shell.exec("tsc");
        fse.copySync("./src/styles", "./dist/src/styles");
        console.log(chalk.green("Compiled!"));
        done();
    })
);

gulp.task(
    PUBLISH_DONE.task,
    gulp.series((done) => {
        console.log(
            chalk.green("✔ succesfully published TRC"),
            chalk.white(
                "( https://www.npmjs.com/package/tchin-react-components )"
            )
        );
        rmrf.sync("./dist");
        done();
    })
);
gulp.task(
    PUBLISH.task,
    gulp.series(
        BUMP_PATCH.task,
        COMPILE.task,
        (done) => {
            shell.exec("npm publish");
            done();
        },
        PUBLISH_DONE.task
    )
);
gulp.task(
    PUBLISH_MINOR.task,
    gulp.series(
        BUMP_MINOR.task,
        COMPILE.task,
        (done) => {
            shell.exec("npm publish");
            done();
        },
        PUBLISH_DONE.task
    )
);
gulp.task(
    PUBLISH_MAJOR.task,
    gulp.series(
        BUMP_MAJOR.task,
        COMPILE.task,
        (done) => {
            shell.exec("npm publish");
            done();
        },
        PUBLISH_DONE.task
    )
);
