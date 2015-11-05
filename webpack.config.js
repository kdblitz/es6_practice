'use strict';
var webpack = require('webpack');
var path = require('path');

var PATHS = {
  js: path.join(__dirname, 'js')
}

module.exports = {
  content: PATHS.js,
  entry: {
    // app: ['./core/bootstrap.js']
    app: ['./maps.js']
  },
  output: {
    path: PATHS.js,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test:/\.js$/,
        loader:'babel!jshint',
        exclude:/node_modules|bower_components/
      }
    ]
  },
  devtool: 'source-map',
  // plugins: [
  //   new webpack.OldWatchingPlugin()
  // ]
}
