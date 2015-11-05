'use strict';
var webpack = require('webpack');
var path = require('path');

var PATHS = {
  js: path.join(__dirname, 'js')
}

module.exports = {
  content: PATHS.js,
  entry: {
    app: ['./js/maps.js']
  },
  output: {
    path: PATHS.js,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test:/\.js$/,
        loader:'babel?presets[]=es2015!semistandard',
        exclude:/node_modules|bower_components/
      }
    ]
  },
  standard: {
    parser: 'babel-eslint'
  },
  devtool: 'source-map',
  plugins: [
    new webpack.OldWatchingPlugin()
  ]
}
