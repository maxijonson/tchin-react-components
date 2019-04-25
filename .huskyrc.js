const gulpTasks = require("./gulpTasks.json");
const _ = require("lodash");

const hooks = _.reduce(
    gulpTasks,
    (tasks, { hook, task }) => {
        if (hook) {
            tasks.hasOwnProperty(hook)
                ? (tasks[hook] = `${tasks[hook]} && gulp ${task}`)
                : (tasks[hook] = `gulp ${task}`);
        }
        return tasks;
    },
    {}
);

module.exports = {
    hooks,
};
