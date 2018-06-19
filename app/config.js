/**
 * Basic app config
 */
const config = {
  production: {
    baseUrl: 'https://dynamic-saga-etc.com'
  },
  development: {
    baseUrl: 'http://localhost:8080'
  },
};
// Config which will go into all environments
const all = {
  headers: {
    includes: {
      users: {
        all: 'groups,user_permissions,group_permissions,permissions'
      }
    }
  }
};
const env = process.env.NODE_ENV;
let envConfig = config[env ? env : 'production'];
// Combine env config and all
export default envConfig = Object.assign(envConfig, all);
