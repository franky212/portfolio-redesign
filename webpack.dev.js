const { merge } = require('webpack-merge');
const webpack = require( 'webpack' );
const commonConfiguration = require('./webpack.common.js');
const path = require('path');

const hotMiddlewareScript =
  'webpack-hot-middleware/client?reload=true';

module.exports = merge(commonConfiguration, {
  mode: 'development',
  entry: {
    portfolio: ['./src/scripts/app.js'],
  },
  devtool: 'source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new ImageMinimizerPlugin({
    //   minimizerOptions: {
    //     // Lossless optimization with custom option
    //     // Feel free to experiment with options for better result for you
    //     plugins: [
    //       ['gifsicle', { interlaced: true }],
    //       ['jpegtran', { progressive: true }],
    //       ['optipng', { optimizationLevel: 5 }],
    //       // Svgo configuration here https://github.com/svg/svgo#configuration
    //       [
    //         'svgo',
    //         {
    //           plugins: [
    //             {
    //               name: 'removeViewBox',
    //               active: false,
    //             },
    //             {
    //               name: 'addAttributesToSVGElement',
    //               params: {
    //                 attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }],
    //               },
    //             },
    //           ],
    //         },
    //       ],
    //     ],
    //   },
    // }),
  ]
});
