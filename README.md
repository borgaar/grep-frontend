# grep-frontend

Grep is a web application that allows you to post and find listings for used items.
It is effectively a marketplace for used items, similar to Craigslist or Facebook Marketplace or finn.no.

## Project Setup

### Clone the repository

```
git clone https://github.com/borgaar/grep-frontend.git
```

### Install dependencies

```sh
pnpm i
```

### Run the backend

Documentation for this can be found in the README.md [here](https://github.com/borgaar/grep-backend/blob/master/README.md).

### Get the API clients

This step will download the OpenAPI spec from the backend and generate the API clients for the frontend.

```sh
pnpm api
```

## Run the app

### Run the development server

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

Make sure the development server is running before running the tests with:

```sh
pnpm run test:e2e
```

