import {DEVELOPMENT} from './development';
import {STAGING} from './staging';

export const CONFIG = {
  development: DEVELOPMENT,
  staging: STAGING,
  production: {
    api: process.env.API_URL
  },
  environment: process.env.NODE_ENV || 'development'
};
