const BEFORE_ALL_TIMEOUT = Number(process.env.HTTP_TIMEOUT) || 60000;
const HOST = process.env.HOST || 'https://api.nasa.gov';

export { BEFORE_ALL_TIMEOUT, HOST };
