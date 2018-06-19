const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: './client/app.js',
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js'
  },
  //
  module: {
    rules: [
      // CSS
      {
        test: /\.css/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      // JS(X)
      {
        test: /\.(js|jsx)/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  // Plugins
  plugins: [HtmlWebpackPluginConfig],
  target: 'web',
  resolve    : {
    modules   : ['client', 'node_modules'],
    extensions: ['.js', '.jsx'],
    mainFields: ['browser', 'jsnext:main', 'main',],
  },
  node       : {
    console: false,
    fs     : 'empty',
    net    : 'empty',
    tls    : 'empty',
  },
};