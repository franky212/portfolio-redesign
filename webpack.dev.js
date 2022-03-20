const { merge } = require('webpack-merge');
const commonConfiguration = require('./webpack.common.js');
const path = require('path');

const hotMiddlewareScript =
  'webpack-hot-middleware/client?reload=true';

module.exports = merge(commonConfiguration, {
  mode: 'development',
  entry: {
    portfolio: path.resolve(__dirname, './src/scripts/app.js'),
  },
  devtool: 'source-map'
});
