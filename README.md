# grep-frontend

Grep is a web application that allows you to post and find listings for used items.
It is effectively a marketplace for used items, similar to Craigslist or Facebook Marketplace or finn.no.

## Tech stack

This project is built using the following technologies:

- [Vue.js](https://vuejs.org/) - A progressive JavaScript framework for building user interfaces.
- [Vite](https://vitejs.dev/) - A fast build tool and development server.
- [TypeScript](https://www.typescriptlang.org/) - A superset of JavaScript that adds static types.
- [Pinia](https://pinia.vuejs.org/) - A state management library for Vue.js.
- [Vue Router](https://router.vuejs.org/) - The official router for Vue.js.
- [PrimeVue](https://www.primefaces.org/primevue/) - A collection of UI components for Vue.js, using raw CSS.
- [Cypress](https://www.cypress.io/) - A JavaScript end-to-end testing framework.

## Project Setup

### Clone the repository

```
git clone https://github.com/borgaar/grep-frontend.git && cd grep-frontend
```

### Install dependencies

Install [pnpm](https://pnpm.io/) if you don't have it already and run:

```sh
pnpm i
```

### Add you Mapbox API key

You need to add your Mapbox access token to the `.env` file. You can get a free API key from [Mapbox](https://www.mapbox.com/).

```sh
# .env
VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_access_token
```

### Run the backend

Documentation for this can be found in the README.md [here](https://github.com/borgaar/grep-backend/blob/master/README.md).

**Note:** If you are hosting the database on a different URL, you must set this variable in the `.env` file:

```
VITE_API_URL=<your_api_url>
```

It defaults to `http://localhost:8080`.

### Get the API clients

This step will generate the API clients based on the OpenAPI spec located at `src/api/spec.json`.
Docs for getting a new API spec can be found [here](https://github.com/borgaar/grep-backend/blob/master/README.md).

```sh
pnpm api
```

## Run the app

### Run the development server

**Please note: running the application as development will result in debug messages appearing for debug purposes**

```sh
pnpm dev
```

### Run the production server

#### Build the app

```
pnpm build
```

#### Serve the app

```
pnpm preview
```

## Tests

### Run e2e tests

Note that you need to add the following .env variable:

```env
VITE_TEST=true
```

Build the release version of the app and run the end-to-end tests using Cypress.

```sh
pnpm build
pnpm run test:e2e
```

### API Documentation

The API documentation can be found by running the backend server (instructions [here](https://github.com/borgaar/grep-backend/blob/master/README.md)) and navigating to `http://localhost:8080/swagger-ui/index.html` in your browser.

