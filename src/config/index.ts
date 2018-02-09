export const CONFIG = {
  development: {
    api: 'http://localhost:3000/api/v1/'
  },
  staging: {
    api: 'https://peersview.herokuapp.com/api/v1/'
  },
  production: {
    api: process.env.API_URL
  },
  environment: process.env.NODE_ENV || 'development'
};
