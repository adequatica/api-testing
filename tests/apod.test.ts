import got from 'got';
import type { CancelableRequest } from 'got';
import { formatISO, subDays } from 'date-fns';
import { URLSearchParams } from 'url';

import { BEFORE_ALL_TIMEOUT, HOST } from '../utils/env';
import { validateSchema } from '../utils/schema-validator';

const queryParams = (json: any) => {
  return new URLSearchParams(json).toString();
};

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
};

const ENDPOINT = '/planetary/apod';

const now = new Date();

const QUERY = {
  date: formatISO(subDays(now, 1), { representation: 'date' }),
  api_key: 'DEMO_KEY',
};

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

  it('Should have response status 200', () => {
    expect(response.statusCode).toBe(200);
  });

  it('Should have content-type = application/json', () => {
    expect(response.headers['content-type']).toBe('application/json');
  });

  it('Should have valid schema', () => {
    expect(validateSchema(SCHEMA, response.body)).toBe(true);
  });
});
