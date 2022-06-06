# API Testing with TypeScript

## Stack

A basic set of packages to test API with TypeScript:

- [Jest](https://jestjs.io) — testing framework
- [Got](https://github.com/sindresorhus/got) — library for HTTP requests
- [Ajv](https://ajv.js.org) — a JSON schema validator
- [date-fns](https://date-fns.org) — library for dates
- [Prettier](https://prettier.io) — code formatter

Example API: [APOD NASA API](https://api.nasa.gov)

## How to Use

1. Clone repository
2. Intall dependencies: `npm install`
2. Run tests: `npm run test`

### Test Cases

- `apod.test.ts` — test with JSON schema validation
- `epic.test.ts` — tests will [skip](https://jestjs.io/docs/api#describeskipname-fn) in inappropriate environment
- `neo.test.ts` — test with timeout before request

### CLI Options

- Different tested host could be passed to tests through .env variable, e.g.:

`HOST=https://api.nasa.gov npm run test`

- Run tests [that match a specific name](https://jestjs.io/docs/cli#running-from-the-command-line) (`-t`) in `describe` or `test` (defined in `package.json`):

`npm run test:custom_filter`