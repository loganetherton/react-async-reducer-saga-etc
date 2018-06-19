const express = require('express');
const path = require('path');
const compression = require('compression');
const fileSystem = require('fs');
const bodyParser = require('body-parser');

const addDevMiddleWare = (app, webpackConfig) => {
  const webpack = require('webpack');
  // Dev and hot
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');

  // Compile webpack
  const compiler = webpack(webpackConfig);

  // Middleware
  const middleware = webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    silent: true,
    stats: 'errors-only',
  });
  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  app.use(bodyParser.json());

  // Use filesystem, not memory fs
  const fs = middleware.fileSystem;

  // Static assets
  app.get(/assets/, (req, res) => {
    const assetPath = path.join(process.cwd(), 'app', req.path);
    fileSystem.stat(assetPath, err => {
      if (!err) {
        return res.sendFile(assetPath);
      } else {
        return res.status(404).send('Not found');
      }
    });
  });

  /**
   * Basic login route
   */
  app.post('/api/login', (req, res) => {
    const {password} = req.body;
    if (password === '12345') {
      return res.json({data: {token: '12345'}});
    }
    return res.status(400).json({error: 'Incorrect password'});
  });

  app.get('*', (req, res) => {
    fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.send(file.toString());
      }
    });
  });
};

module.exports = (app) => {
  const webpackConfig = require('../webpack/webpack');
  addDevMiddleWare(app, webpackConfig);

  return app;
};