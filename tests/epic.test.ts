import got from 'got';
import type { CancelableRequest } from 'got';

import { BEFORE_ALL_TIMEOUT, HOST } from '../utils/env.ts';
import { queryParams } from '../utils/query-params.ts';

const QUERY = {
  api_key: 'DEMO_KEY',
};

const ENDPOINT = '/EPIC/api/natural';

// Skip all tests in describe if the host is not https://api.nasa.gov
const describeHostIf =
  HOST === 'https://api.nasa.gov' ? describe : describe.skip;

// Describe consists from a variables to show the request in the output:
// «Request https://api.nasa.gov/EPIC/api/natural?api_key=DEMO_KEY»
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

  it('Should have response status 200', () => {
    expect(response.statusCode).toBe(200);
  });

  it('Should have content-type = application/json', () => {
    expect(response.headers['content-type']).toBe('application/json');
  });

  it('Should have array in the body', () => {
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('Should have identifiers in each element of the body', () => {
    // Just an example of a loop through array, not a pattern to follow in tests
    response.body.forEach((element: { identifier: string }) => {
      expect(element.identifier).not.toHaveLength(0);
    });
  });
});
