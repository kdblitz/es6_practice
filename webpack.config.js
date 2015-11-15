'use strict';
var webpack = require('webpack');
var path = require('path');

var PATHS = {
  js: path.join(__dirname, 'js'),
  bower: path.join(__dirname,'bower_components')
}

module.exports = {
  context: PATHS.js,
  entry: {
    app: ['./maps.js']
  },
  output: {
    path: PATHS.js,
    filename: 'bundle.js'
  },
  resolve: {
    root: [PATHS.js,PATHS.bower],
    extensions: ['','.js'],
    alias: {
      lodash: 'lodash/lodash'
    }
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
  },
  semistandard: {
    globals: ['_','google','localStorage']
  },


  devtool: 'source-map',
  plugins: [
    new webpack.ProvidePlugin({
      _:'lodash'
    }),
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ['main'])
    )
  ]
}
