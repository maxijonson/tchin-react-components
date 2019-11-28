# tchin-react-components

### My Web Kit

TRC is meant to be my own personnal web kit. The goal is to be able to setup and start making a front-end project rapidly without having to spend time creating basic components and setting up utilities like Redux.

### App

The approach I used is to have a core in the package called `app`. `app` is a singleton that is initialized at the index of the project and contains the heart of the project, such as the routing system, theme configuration, i18n configuration, Redux store and more.

### Components

For the components, I was inspired by many libraries such as Material-UI, Elastic-UI, Element-UI, Argon and Bootstrap to create my own soup of components. Thanks to Styled-Components, I was able to make many components without the need of external CSS. 

### Utils

As for utilities, they get created as I need them. There are many useful hooks, such as `useConnect` which allows you to retrieve the Redux store state and dispatch inside of components instead of connecting them separatly.

### Dependencies

All dependencies, including devDependencies, have been purposely added as project dependencies. By doing this, TRC comes with all that I might need to make my project. While this may sound like a stretch, it also helped fixing some issues when deploying to Heroku, since it strips out devDependencies after building.

### Language

The project was developped entirely in TypeScript, but also come bundled in JavaScript once published.

### Disclaimer

This library is being developed with my personnal needs in mind. The components and utilities may change drastically at any time without warning.

### NPM Installation

Use the package manager [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to install tchin-react-components.

```bash
npm i -S tchin-react-components
```

### Documentation

As well as being the library for the components, TRC can be launched just like a website to view the docs. Clone the repo and do the following commands:

```bash
# Install dependencies
npm i

# Start the web server
npm start

# or you can use Gulp
gulp
```

Then navigate to http://localhost:1338/ (was 1337 initialy 😉 however, my Razer keyboard seems to be using this port for some unknown reason...) 

## License

[ISC](https://choosealicense.com/licenses/isc/)
