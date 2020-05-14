# COVID-19

Self-Reporting of COVID-19

## Branches

- `master` and `master-variant` are both production branches hosted on Flatten.ca. `master-variant` is used for AB testing.

- `staging` is where changes go before being released.
  Only merge changes to staging that are ready to be released and are working since other changes need a working version to work from.

- `map-staging` is where big changes to the maps are made before being merged to `staging`.

## Setup / Prereqs

Here are some installation/setup steps for you to run the frontend side of the project.

We highly recommend that you use nvm to make sure that we are all using the same node and npm versions across the field.

Installation link can be found here for

- [Unix/linux](https://github.com/nvm-sh/nvm)
- [Windows](https://github.com/coreybutler/nvm-windows)

If you'd like to avoid the above package managers, you can install node [here](https://nodejs.org/en/download/releases/), and make sure to select node versions above 10.18.1 (Latest version should be fine).

After making sure you have node and npm on your system, you can run `npm install` and then `npm start` in the root directory to start the project.

### Code formatting and error checking

We use [Prettier](https://prettier.io/) for code formatting and [ESLint](https://eslint.org/) for error checking.

Use [this](https://prettier.io/docs/en/editors.html) and [this](https://eslint.org/docs/user-guide/integrations) guide for setting Prettier and ESLint with your editors respectively. (Basically just install both plugins in your IDE.)

Ensure both Prettier and ESLint are setup before getting started.

## Packages currently in use

- [react-router](https://reacttraining.com/react-router/web/guides/quick-start) : Allows you to have different pages based on url (very helpful for nav bar).
- [redux](https://redux.js.org/) : A centralized store that all components have access to.

And of course on top of that, we're using [React](https://reactjs.org/).

## CSS/Theming

- [Bootstrap 4](https://getbootstrap.com/docs/4.4/getting-started/introduction/) : Very helpful css framework to get mobile-friendly sites

## Tools

Some helpful google extensions

- [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) : Helpful for checking out components and where errors are coming from.
- [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) : Very helpful for checking out what your store currently looks like; will also give you a history of your store as you use the application.

Both of these are already setup in the project, so once downloading the extensions, they should work automatically.

## How To:

The following section describes "How Tos" for common tasks.

### Redeploy `dispatch.yaml`

`dispatch.yaml` indicates the mappings of URLs to different Google App Engine services.
e.g.`map.staging.flatten.ca` should go to the flatten `map-staging` branch.
When changes are made to this file it needs to be redeployed.
See Google App Engine documentation for more details on `dispatch.yaml` and the steps below.

1. :warning: Ensure you're default project is the correct one in `gcloud` so you don't deploy to the wrong project.

2. Copy either `dispatch.prod.yaml` or `dispatch.staging.yaml` into the root directory under the name `dispatch.yaml`.
3. Run `gcloud app deploy dispatch.yaml`.
4. :warning: Before pressing yes to continue, check that you're deploying to the correct project.

Note: running `gcloud app deploy dispatch.staging.yaml` won't work since `gcloud app deploy` expects an `app.yaml` file. `dispatch.yaml` is a special exception.
