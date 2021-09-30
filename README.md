# API testing with TypeScript

A basic set of packages to test API with TypeScript:

- [Jest](https://jestjs.io) as a testing framework
- [Got](https://github.com/sindresorhus/got) as a library for HTTP requests
- [Ajv](https://ajv.js.org) as a JSON schema validator
- [date-fns](https://date-fns.org) as a library for dates
- [Prettier](https://prettier.io) as a code formatter

[APOD NASA API](https://api.nasa.gov) is choosen as an example

Tested host could be passed to tests through .env variable:

`HOST=https://api.nasa.gov npm run test`
