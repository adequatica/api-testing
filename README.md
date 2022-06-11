# API Testing with TypeScript

## Stack

A basic set of packages to test API with TypeScript:

- [Jest](https://jestjs.io) — testing framework;
- [Got](https://github.com/sindresorhus/got) — library for HTTP requests;
- [Ajv](https://ajv.js.org) — a JSON schema validator;
- [date-fns](https://date-fns.org) — library for dates;
- [Prettier](https://prettier.io) — code formatter.

Example API: [APOD NASA API](https://api.nasa.gov).

## How to Use

1. Clone repository
2. Intall dependencies: `npm install`
2. Run tests: `npm run test`

### CLI Options

- Different tested host could be passed to tests through .env variable:

`HOST=https://api.nasa.gov npm run test`

- Run tests [that match a specific name](https://jestjs.io/docs/cli#running-from-the-command-line) (`-t`) in `describe` or `test` (defined in `package.json`):

`npm run test:custom_filter`

### Exaples of Test Cases

- `apod.test.ts` — test with JSON schema validation;
- `epic.test.ts` — test will [skip](https://jestjs.io/docs/api#describeskipname-fn) in inappropriate environment; test has [a loop through array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) for cheking elements;
- `neo.test.ts` — test with timeout before request.

