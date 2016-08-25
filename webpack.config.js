var path = require('path');

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
  }
}