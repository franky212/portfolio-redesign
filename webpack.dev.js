const { merge } = require('webpack-merge');
const webpack = require( 'webpack' );
const commonConfiguration = require('./webpack.common.js');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const path = require('path');

const hotMiddlewareScript =
  'webpack-hot-middleware/client?reload=true';

module.exports = merge(commonConfiguration, {
  mode: 'development',
  entry: {
    portfolio: [hotMiddlewareScript, './src/scripts/app.js'],
  },
  output: {
    filename: 'js/[name].[contenthash].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    clean: true,
    // hotUpdateChunkFilename: 'hot/hot-update.js',
    // hotUpdateMainFilename: 'hot/hot-update.json'
  },
  devtool: 'source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCSSExtractPlugin({
      filename: 'css/[name].[contenthash].css',
    }),
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
