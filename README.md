# MaxiJonson's Website

## 4th edition

This is the public repository for my website, which is available to view [here](www.maxijonson.com). The website is written mainly in Typescript and uses React as front-end library. It is mostly my playground to experience with React's features, but it also my programming portfolio to showcase.

### Roadmap

You can check out [Trello](https://trello.com/b/9iho7pi4) to see the features that are planned, in progress, done and deployed to Heroku. The cards numbers (e.g.: MJ-26) refer to commits related to the task. If a commit doesn't have any number, it is probably because the commit was not particularly associated to a task.

### Partial Repo

Some files do not appear in this repo either for security purposes or simply to reduce the size with libraries used like OverlayScrollbars. The point of this repo is not to showcase a full version of the website, but for you to use it as reference in case you are curious as to how it works behind the scenes and maybe suggest enhancements! Doing this is particularly difficult as the same repo is used to deploy to Heroku. If you are interested in knowing how I manage to keep a full version on Heroku whilst sharing a partial version to Github, I used [Heroku + Github + Sensitive Data](https://gist.github.com/jczaplew/8307225) to get an idea and then made a `post-commit` [script](https://gist.github.com/maxijonson/a1470f10d0af78effcf74842780b095b) to automate the process which has been working good so far, even if it messes the git history...But, being the JavaScript/Typescript lover that I am, I rewrote it using `Gulp.js` and `Husky.js` which you can find in the root of the project.
