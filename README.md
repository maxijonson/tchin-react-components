# tchin-react-components

### TRC

My reusable React components.

TRC uses a singleton `app` to manage the core of the application, such as routes, translations and in my project's case, themes. It also manages the whole Redux store which you can provide its reducers on initialization.

On top of the `app` singleton, TRC comes with a set of components I plan to use across all my React projects. Most of them were created during my [website's](https://www.chintristan.io/) development, so it is expected that they may not fit all designs. However, TRC also comes with a premade AppRouter (TRCRouter) which comes with basic functionality.

TRC also comes with a variety of hooks, including `useConnect` hook which is used to access the Redux store. This hook was created before Redux announced their own set of hooks and may or may not change, because the pattern slightly differs from theirs.

Finally, TRC comes with all dev-dependencies listed as dependencies. This was decided so I can simply install this package without spending much time typing NPM commands to install more dependencies at the cost of a large bundle.

## Disclaimer

Please note that this library is being developed for my personal use and should not be used directly in your projects. You can, however, use it as a reference if you're aiming towards the solution TRC is delivering to me. At **ANY** time, drastic changes could come to the library with no deprecation notice. Use with caution.

## Installation

Use the package manager [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to install tchin-react-components.

```bash
npm i -S tchin-react-components
```

## Usage

```typescript
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { app, APP_ROOT, NotFoundPage, TRCRouter } from "..";

app.init({
    enforceSSL: true /* If you want to force HTTPS */,
    routes: [
        /* your routes here */
        {
            name: "Not Found",
            key: "notFound",
            path: "",
            component: () => <NotFoundPage />,
            hidden: true,
            Icon: () => <span>NF</span>, // Displayed in <Header />.
        },
    ],
    socials: [
        /* Social links displayed in the footer of <Header /> */
        {
            name: "Github",
            url: "https://github.com/maxijonson",
            Icon: () => (
                <FontAwesomeIcon
                    icon={faGithub}
                    color={app.state.theme.colors.defaultText}
                />
            ),
        },
    ],
    translations: {
        /* A set of translations. Only supports FR and EN. */
    },
    reducers: {
        /* your reducers here */
    },
    /* More options available... */
});

ReactDOM.render(
    <Provider store={app.store}>
        <TRCRouter />
    </Provider>,
    document.getElementById(APP_ROOT)
);
```

## License

[ISC](https://choosealicense.com/licenses/isc/)
