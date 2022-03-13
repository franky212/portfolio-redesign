const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

// let htmlPageNames = [];
// let multipleHtmlPlugins = htmlPageNames.map(name => {
//   return new HtmlWebpackPlugin({
//     template: `./src/views/${name}.html`, // relative path to the HTML files
//     filename: `${name}.html`, // output HTML files
//     chunks: [`${name}`] // respective JS files
//   })
// });

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      // HTML
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
        },
      },

      // JS
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', { runtime: 'automatic' }],
            ],
          },
        },
      },

      // CSS
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCSSExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'resolve-url-loader',
          'sass-loader',
        ],
      },

      // Images

      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset',
      },

      // {
      //   test: /\.(jpg|png|gif|svg)$/,
      //   use: {
      //     loader: 'url-loader'
      //   }
      // },

      // {
      //   test: /\.(jpg|png|gif|svg)$/,
      //   use:
      //     [
      //       {
      //         loader: 'file-loader',
      //         options:
      //         {
      //           outputPath: './assets/images/'
      //         }
      //       }
      //     ]
      // },

      // Fonts

      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },

      // {
      //   test: /\.(ttf|eot|woff|woff2)$/,
      //   use:
      //     [
      //       {
      //         loader: 'file-loader',
      //         options:
      //         {
      //           outputPath: './assets/fonts/'
      //         }
      //       }
      //     ]
      // }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/views/index.html'),
      inject: 'body',
    }),
  ],
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};