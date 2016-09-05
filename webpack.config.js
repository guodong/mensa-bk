var path = require('path');
var webpack = require('webpack');

var minimize = process.argv.indexOf('--minimize') !== -1;
var plugins = [];
if (minimize) {
  plugins.push(new webpack.optimize.UglifyJsPlugin());
}
module.exports = {
  entry: [path.resolve(__dirname, './src/main.js')],
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.js|jsx$/,
      loaders: ['babel-loader']
    },{
      test: /\.less/,
      loader: "style!css!less"
    },{test: /\.css$/, loader: 'style!css'},]
  },
  plugins: plugins
}