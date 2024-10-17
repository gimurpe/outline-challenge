This is a Monorepo project in development. The application will be a comments management service for the Outline Challenge.

## Getting Started

```sh
# 1. Install dependencies
$ npm i

# 2. Build required packages
$ npm build

# 3. Run all projects 'dev' task to start development servers
$ turbo run dev

# 4. Run all tests 'test' task to start development servers
$ turbo run dev
```

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
- NodeJS > 12
- Your preferred browser (tested on Chrome and Firefox)

### Linting and formatting

The linting and formatting is done using eslint and prettier, configured using common industry standards.

### Core Features

- This is a monorepo that handles three projcts: FE(web), Backend(api), Shared Models(packages)
- The list of comments uses virtualization and async fetching using TanStack Virtual and TanStack Query
- There are hooks for each of the services used: auth and comments
- The styles use emotion+styled-components with styled-system.
- The styling is mobile-first meaning everything is written thinking on mobile compatibility and adjusted for desktop if needed
- BEM was selected as the css writting style to make it cleaner and avoid cascading
- Both grid and flexbox were used
