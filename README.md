This is a Monorepo project in development. The application will be a comments management service for the Outline Challenge.

## Getting Started

```sh
# 0. Install dependencies
$ npm install turbo --global and cd outline-challenge

# 1. Install dependencies
$ npm i

# 3. Run all projects 'dev' task to start development servers
$ turbo dev

# 4. To run all tests 'test' tasks
$ turbo test
```

### Troubleshooting

- If you get an error related to npm not able to find a file in the cache
  1. npm cache clean --force
  2. Install node 18 or latest
- Contact betompx@gmail.com for any other issue

### Folder Structure

    .
    ├── ...
    ├── apps
    │   ├── api       # Rest API using express and routing-controllers
    │   ├── web       # Frontend application, bootstrapped with Vite.js and Styled-Components
    └── packages
        ├── eslint-config-custom  # Shared eslint configs
        ├── shared                # Shared code package(s) between apps (models, interfaces etc)

### Basic requirements

- Your preferred IDE / Code Editor
- NodeJS >= 18
- Your preferred browser (tested on Chrome and Firefox)

### Linting and formatting

The linting and formatting is done using eslint and prettier, configured using common industry standards.

### Core Features

- This is a monorepo that handles three projects: FE(web), Backend(api), Shared Models(packages)
- The list of comments uses virtualization and async fetching using TanStack Virtual and TanStack Query
- There are hooks for each of the services used: auth and comments
- The styles use emotion+styled-components with styled-system.
- The styling is mobile-first meaning everything is written thinking on mobile compatibility and adjusted for desktop if needed
- BEM was selected as the css writting style to make it cleaner and avoid cascading: https://getbem.com/naming/
- Both grid and flexbox were used
