const api = process.env.NODE_ENV === 'production'
            ? process.env.API_URL
            : 'http://localhost:3000/api/v1/';
const environment = process.env.NODE_ENV === 'production'
            ? 'production'
            : 'development';

export const CONFIG = {
  environment: environment,
  api: api
};
