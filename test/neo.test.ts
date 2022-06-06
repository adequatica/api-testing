import got from 'got';
import type { Response } from 'got';
import { URLSearchParams } from 'url';

import { BEFORE_ALL_TIMEOUT, HOST } from '../utils/env';

const queryParams = (json: any) => {
  return new URLSearchParams(json).toString();
};

const ENDPOINT = '/neo/rest/v1/neo/browse';

const QUERY = {
  api_key: 'DEMO_KEY',
};

type ResponseData = any;

// Describe consists from a variables to show the request in the output:
// «Request https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY»
describe(`Request ${HOST}${ENDPOINT}?${queryParams(QUERY)}`, () => {
  let responseWithSleep: Response<ResponseData>;

  beforeAll(async () => {
    // setTimeout does not work without it
    // https://jestjs.io/docs/jest-object#jestuserealtimers
    jest.useRealTimers();

    // ms
    const SLEEP_TIMEOUT = 2000;
    responseWithSleep = await new Promise((resolve, reject) => {
      setTimeout(() => {
        got
          .get(`${HOST}${ENDPOINT}`, {
          responseType: 'json',
          searchParams: QUERY,
        })
      .then(resolve)
      .catch(reject);
    }, SLEEP_TIMEOUT);
  });
  }, BEFORE_ALL_TIMEOUT);

  it('Should have response status 200', () => {
    expect(responseWithSleep.statusCode).toBe(200);
  });

  it('Should have content-type = application/json;charset=UTF-8', () => {
    expect(responseWithSleep.headers['content-type']).toBe('application/json;charset=UTF-8');
  });

  it('Should have default page size = 20 elements', () => {
    expect(responseWithSleep.body.page.size).toBe(20);
  });
});
