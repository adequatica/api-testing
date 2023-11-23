import got from 'got';
import type { CancelableRequest } from 'got';

import { API_KEY, BEFORE_ALL_TIMEOUT, HOST } from '../utils/env.ts';
import { validateSchema } from '../utils/schema-validator.ts';
import { queryParams } from '../utils/query-params.ts';

const SCHEMA = {
  type: 'object',
  properties: {
    sol_keys: { type: 'array' },
    validity_checks: {
      type: 'object',
      properties: {
        sol_hours_required: { type: 'number' },
        sols_checked: { type: 'array' },
      },
      // https://ajv.js.org/json-schema.html#patternproperties
      patternProperties: {
        '\\d{4}': { type: 'object' },
      },
      additionalProperties: false,
    },
  },
  required: [
    'sol_keys',
    'validity_checks',
  ],
  additionalProperties: false,
} as const;

const QUERY = {
  api_key: API_KEY,
  feedtype: 'json',
  ver: '1.0',
};

const ENDPOINT = '/insight_weather/';

// Skip all tests in describe if the host is not https://api.nasa.gov
const describeHostIf =
  HOST === 'https://api.nasa.gov' ? describe : describe.skip;

// Describe consists from a variables to show the request in the output:
// «Request https://api.nasa.gov/insight_weather/?feedtype=json&ver=1.0&api_key=DEMO_KEY»
describeHostIf(`Request ${HOST}${ENDPOINT}?${queryParams(QUERY)}`, () => {
  let response: CancelableRequest | any;

  beforeAll(async () => {
    try {
      response = await got.get(`${HOST}${ENDPOINT}`, {
        responseType: 'json',
        searchParams: QUERY,
      });
    } catch (error: any) {
      if (!error.response) {
        throw new Error(error);
      }

      response = error.response;
    }
  }, BEFORE_ALL_TIMEOUT);

  test('Should have response status 200', () => {
    expect(response.statusCode).toBe(200);
  });

  test('Should have content-type = application/json;charset=utf-8', () => {
    expect(response.headers['content-type']).toBe('application/json;charset=utf-8');
  });

  test('Should have valid schema', () => {
    expect(validateSchema(SCHEMA, response.body)).toBe(true);
  });
});
