var path = require('path');
var webpack = require('webpack');

var OccurenceOrderPlugin = require('webpack/lib/optimize/OccurenceOrderPlugin');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
//var HtmlWebpackPlugin = require('html-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
  debug: true,
  cache: true,
  output: {
	filename: '[name].bundle.js',
	sourceMapFilename: '[name].map',
	chunkFilename: '[id].chunk.js'
  },
  
  entry: {
	'main':'./src/main.ts',
	'vendor-router': './src/vendor-router.ts',
	'vendor-browser': './src/vendor-browser.ts',
	'vendor-ang': './src/vendor-ang.ts',
    'polyfills':'./src/polyfills.ts'
  },

  plugins: [
	// separate process for tsc
//	new ForkCheckerPlugin(),
	// If you use some libraries with cool dependency trees, it may occur that some files are identical. Webpack can find these files and deduplicate them. This prevents the inclusion of duplicate code into your bundle and instead applies a copy of the function at runtime. It doesn't affect semantics.
	//new DedupePlugin(),
	//new OccurenceOrderPlugin(true),
	// by order in entry
	// use DESC order, opposite index.html
    new CommonsChunkPlugin({
      name: [
		'main',
		'vendor-router',
		'vendor-browser',
		'vendor-ang',
		'polyfills'
	  ],
      chunks: Infinity
    }),
	// new HtmlWebpackPlugin({
	//   template: 'src/index.html'
	// })
  ],

  resolve: {
	// An array of extensions that should be used to resolve modules
	extensions: ['', '.ts', '.js']
  },

  module: {
	preLoaders: [
	  {
		test: /\.ts$/,
		loader: 'tslint-loader',
		exclude: [
		  helpers.root('node_modules')
		]
	  }
	],
	loaders: [
	  {
		test: /\.ts$/,
		loader: 'awesome-typescript-loader'
		//'ts-loader'
	  }
	],
	noParse: [
	  path.join(__dirname, 'node_modules', 'zone.js', 'dist'),
	  path.join(__dirname, 'node_modules', 'angular2', 'bundles')
	]
  },

  devServer: {
    historyApiFallback: true,
	watchOptions: { aggregateTimeout: 300, poll: 1000 }
  },

  // Include polyfills or mocks for various node stuff:
  node: {
    global: 1,
	process: 1,
	crypto: 'empty',
	module: 0,
	Buffer: 0,
	clearImmediate: 0,
	setImmediate: 0
  }
};
