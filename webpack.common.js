const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

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
    fallback: {
      "querystring": require.resolve("querystring-es3")
    }
  },
  output: {
    filename: 'js/[name].[contenthash].js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    clean: true
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    devMiddleware: {
      writeToDisk: true
    },
    port: 3000,
    open: true
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

      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/images'
        },
      },

      {
        test: /\.(gltf|glb|bin)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/models',
          esModule: false
        }
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

      // {
      //   test: /\.(png|svg|jpg|jpeg|gif|mp4)$/i,
      //   type: 'asset/resource',
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

      // {
      //   test: /\.(woff|woff2|eot|ttf|otf)$/i,
      //   type: 'asset/resource',
      // },

      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use:
          [
            {
              loader: 'file-loader',
              options:
              {
                name: '[name].[ext]',
                outputPath: 'assets/fonts'
              }
            }
          ]
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/views/index.html'),
      favicon: './src/assets/logos/fd..svg',
      inject: 'body',
    }),
    new MiniCSSExtractPlugin({
      filename: 'css/[name].[contenthash].css',
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
