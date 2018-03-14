# JR. Developer Skills Test
A simple project using the react starter app, the [@ndustrial/nd-react-common](https://www.npmjs.com/package/@ndustrial/nd-react-common) library and the [@ndustrial/contxt-sdk](https://github.com/ndustrialio/contxt-sdk-js)

# Getting Started

### 1. NPM Login
You will need to login to NPM to install from the private NPM repository. Gather your NPM auth token from `~/.npmrc` after logging in through the CLI and save it to your `~/.profile` file as shown below.

```
export NPM_TOKEN="00000000-0000-0000-0000-000000000000"
```

When your `~/.profile` is set up, refresh your environment variables by using `source ~/.profile`.


[Source](http://blog.npmjs.org/post/118393368555/deploying-with-npm-private-modules)

### 2. Initial configuration setup
This boilerplate project contains a `config` folder, with configuration files for various environments, e.g. `staging`, `development`, `production`. The configuration for Auth0 *must* be set in the configuration files before you can run the application for the first time. If you *do not* have the need to have different configurations for different environments, you can move the `auth0` definitions to the `all.js` file and remove this configuration from the individual environments.

### 3. Running the application
Run `npm start` and view the app at `http://localhost:5000`.

# Tasks
### 1. Create a new git branch

### 2. Add a facility list to the homepage

- Using the `@ndustrial/nd-react-common` library and the `@ndustrial/contxt-sdk`, add a `<List/>` component to the homepage that displays a list of available facilities returned from the SDK.

### 3. Add an organization dropdown to the homepage
- Grab the organizations out of the facilities returned from the SDK

- Using the `@ndustrial/nd-react-common` library and the `@ndustrial/contxt-sdk`, add a `<Dropdown/>` component to the homepage that displays a list of available organizations.

- Ensure that the organizations are unique. We don't need the same organizations listed multiple times.

### 4. Have the list of facilities change on an organization change
- When a user changes the selected organization from the dropdown, the facility list should update to only show the facilities inside of that organization

### 5. Update the syling to match the design
- Compare your layout to the provided design and update yours to match

![mockup](src/images/skills-test-mockup.jpg =800x)

### 6. Complete at least 2 out of the 5 provided test options
- There are 5 test shells written, choose at least 2 that you would like to complete

### 7. Submit pull request when complete
- Submit a PR for the team to review when complete
