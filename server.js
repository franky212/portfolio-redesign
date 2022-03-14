const path = require( 'path' );
const express = require( 'express' );
const webpack = require( 'webpack' );
const webpackDevMiddleware = require( 'webpack-dev-middleware' );
const webpackHotMiddleware = require( 'webpack-hot-middleware' );

const app = express();
const config = require('./webpack.dev.js');
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    writeToDisk: true
  })
);

app.use( webpackHotMiddleware(compiler, {
  noInfo: true,
  quiet: true,
  contentBase: '/dist'
}) );

app.get( '/*', function(req, res) {
  res.sendFile( 'index.html', {root: path.join( __dirname, './dist/')});
} );

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});
