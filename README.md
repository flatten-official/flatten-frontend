# COVID-19

Self-Reporting of COVID-19

## Setup / Prereqs

Here are some installation/setup steps for you to run the frontend side of the project.

We highly recommend that you use nvm to make sure that we are all using the same node and npm versions across the field.

Installation link can be found here for

- [Unix/linux](https://github.com/nvm-sh/nvm)
- [Windows](https://github.com/coreybutler/nvm-windows)

If you'd like to avoid the above package managers, you can install node [here](https://nodejs.org/en/download/releases/), and make sure to select node versions above 10.18.1 (Latest version should be fine).

After making sure you have node and npm on your system, you can run `npm install` and then `npm start` in the root directory to start the project.

## Packages currently in use

- [react-router](https://reacttraining.com/react-router/web/guides/quick-start) : Allows you to have different pages based on url (very helpful for nav bar).
- [redux](https://redux.js.org/) : A centralized store that all components have access to.
- [redux-forms](https://redux-form.com/8.3.0/) : Linking redux and forms, to get form responses to a centralized store. Helpful for implementing our wizard form.

And of course on top of that, we're using [React](https://reactjs.org/).

## CSS/Theming

- [Bootstrap 4](https://getbootstrap.com/docs/4.4/getting-started/introduction/) : Very helpful css framework to get mobile-friendly sites

## Tools

Some helpful google extensions

- [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) : Helpful for checking out components and where errors are coming from.
- [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) : Very helpful for checking out what your store currently looks like; will also give you a history of your store as you use the application.

Both of these are already setup in the project, so once downloading the extensions, they should work automatically.
