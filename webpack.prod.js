const { merge } = require('webpack-merge');
const commonConfiguration = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const HtmlCriticalPlugin = require('html-critical-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = merge(commonConfiguration, {
  mode: 'production',
  entry: {
    popshop: path.resolve(__dirname, './src/scripts/app.js'),
  },
  devtool: 'source-map',
  output: {
    filename: 'js/[name].[contenthash].js',
    path: path.resolve(__dirname, './dist'),
    clean: true,
    assetModuleFilename: 'assets/images/[name][ext][query]',
  },
  plugins: [
    new CleanWebpackPlugin(),
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
    new HtmlCriticalPlugin({
      base: path.join(path.resolve(__dirname), 'dist/'),
      src: 'index.html',
      dest: 'index.html',
      inline: true,
      minify: true,
      extract: true,
      width: 375,
      height: 565,
      penthouse: {
        blockJSRequests: false,
      },
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        parallel: true,
      }),
    ],
  },
});
