/**
 * Basic app config
 */
const config = {
  production: {
    baseUrl: 'https://dynamic-saga-etc.com/api'
  },
  development: {
    baseUrl: 'http://localhost:8080/api'
  },
};

const env = process.env.NODE_ENV;
let envConfig = config[env ? env : 'production'];
// Combine env config and all
export default envConfig = Object.assign(envConfig);
