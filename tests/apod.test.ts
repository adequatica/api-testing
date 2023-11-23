import got from 'got';
import type { CancelableRequest } from 'got';
import { formatISO, subDays } from 'date-fns';

import { API_KEY, BEFORE_ALL_TIMEOUT, HOST } from '../utils/env.ts';
import { validateSchema } from '../utils/schema-validator.ts';
import { queryParams } from '../utils/query-params.ts';

const SCHEMA = {
  type: 'object',
  properties: {
    copyright: { type: 'string' },
    date: { type: 'string' },
    explanation: { type: 'string' },
    hdurl: { type: 'string' },
    media_type: { type: 'string' },
    service_version: { type: 'string' },
    title: { type: 'string' },
    url: { type: 'string' },
  },
  required: [
    'date',
    'explanation',
    'media_type',
    'service_version',
    'title',
    'url',
  ],
  additionalProperties: false,
} as const;

const now = new Date();

const QUERY = {
  date: formatISO(subDays(now, 1), { representation: 'date' }),
  api_key: API_KEY,
};

const ENDPOINT = '/planetary/apod';

// Describe consists from a variables to show the request in the output:
// «Request https://api.nasa.gov/planetary/apod?date=2022-06-05&api_key=DEMO_KEY»
describe(`Request ${HOST}${ENDPOINT}?${queryParams(QUERY)}`, () => {
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

  test('Should have content-type = application/json', () => {
    expect(response.headers['content-type']).toBe('application/json');
  });

  test('Should have valid schema', () => {
    expect(validateSchema(SCHEMA, response.body)).toBe(true);
  });
});
