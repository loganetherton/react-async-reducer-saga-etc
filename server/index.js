const express = require('express');
// Frontend middleware for fanciness
const setup = require('./frontendMiddleware');

const resolve = require('path').resolve;
const app = express();

setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = '127.0.0.1';
const host = customHost || null; // Let http.Server use its default IPv6/4 host

const port = 8080;

// Start your app.
app.listen(port, host, (err) => {
  if (err) {
    return console.error(err.message);
  }

  console.log('App started');
  console.log(`Running on: ${host}:${port}`);
});
