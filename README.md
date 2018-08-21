# Skills Test

A simple project using the react starter app, the [@ndustrial/nd-react-common](https://www.npmjs.com/package/@ndustrial/nd-react-common) library and the [@ndustrial/contxt-sdk](https://github.com/ndustrialio/contxt-sdk-js)

# Getting Started

### Running the application

Run `npm install` to install all dependencies.

Run `npm start` and view the app at `http://localhost:5000`.

---

# Tasks

### 1. Create a new git branch

### 2. Add a facility list to the homepage

- Using the `@ndustrial/nd-react-common` library and the `@ndustrial/contxt-sdk`, add a `<List/>` component to the homepage that displays a list of available facilities returned from the SDK.

Required props for a `<List/>` is a `data` array

```
data: [{
	id: String
	label: String
	value: String
}]
```

### 3. Add an organization dropdown to the homepage

- Grab the organizations out of the facilities returned from the SDK

* Using the `@ndustrial/nd-react-common` library and the `@ndustrial/contxt-sdk`, add a `<Dropdown/>` component to the homepage that displays a list of available organizations.

Required props for a `<Dropdown/>` is a `data` array. You can also pass a `callback` function.

```
data: [{
	id: String
	label: String
	value: String
}]
```

- Ensure that the organizations are unique. We don't need the same organizations listed multiple times.

### 4. Have the list of facilities change on an organization change

- When a user changes the selected organization from the dropdown, the facility list should update to only show the facilities inside of that organization

### 5. Write at least 2 tests

### 6. Submit pull request when complete

- Submit a PR for the team to review when complete
