// @AngularClass

/*
 * Helper: root(), and rootDir() are defined at the bottom
 */
var helpers = require('./helpers');
// Webpack Plugins
var webpack = require('webpack');
var ProvidePlugin = require('webpack/lib/ProvidePlugin');
//var DefinePlugin = require('webpack/lib/DefinePlugin');
//var OccurenceOrderPlugin = require('webpack/lib/optimize/OccurenceOrderPlugin');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
//var CompressionPlugin = require('compression-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
//var HtmlWebpackPlugin = require('html-webpack-plugin');
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

var ENV = process.env.NODE_ENV = process.env.ENV = 'production';
var HOST = process.env.HOST || 'localhost';
var PORT = process.env.PORT || 8080;

var metadata = {
  title: 'Mngr prod',
  baseUrl: '/',
  host: HOST,
  port: PORT,
  ENV: ENV
};

/*
 * Config
 */
module.exports = {
  // static data for index.html
  metadata: metadata,  
  debug: false,

  entry: {
    'polyfills':'./src/polyfills.ts',
	'vendor-router': './src/vendor-router.ts',
	'vendor-browser': './src/vendor-browser.ts',
	'vendor-ang': './src/vendor-ang.ts',
    'main':'./src/main.ts'
  },

  // Config for our build files
  output: {
    path: helpers.root('dist'),
    filename: '[name].bundle.js'
  },

  resolve: {
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
      // Support Angular 2 async routes via .async.ts
      // Support for .ts files.
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        query: {
          // remove TypeScript helpers to be injected below by DefinePlugin
          'compilerOptions': {
            'removeComments': true
          }
        },
        exclude: [
          /\.(spec|e2e)\.ts$/,
          helpers.root('node_modules')
        ]
      },

      // Support for *.json files.
      {
        test: /\.json$/,
        loader: 'json-loader',
        exclude: [ helpers.root('node_modules') ]
      },

      // Support for CSS as raw text
      {
        test: /\.css$/,
        loader: 'raw-loader',
        exclude: [ helpers.root('node_modules') ]
      },

      // support for .html as raw text
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: [
          helpers.root('src/index.html')
        ]
      }

    ],
    noParse: [
      helpers.root('zone.js', 'dist'),
      helpers.root('angular2', 'bundles')
    ]

  },

  plugins: [
    new ForkCheckerPlugin(),
	// If you use some libraries with cool dependency trees, it may occur that some files are identical. Webpack can find these files and deduplicate them. This prevents the inclusion of duplicate code into your bundle and instead applies a copy of the function at runtime. It doesn't affect semantics.
    new DedupePlugin(),
	//    new OccurenceOrderPlugin(true),
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
    // static assets
    new CopyWebpackPlugin([
      {
        from: './src/app/',
        to: './app/'
      },
	  {
		from: './src/styles.css',
		to: './'
	  },
	  {
		from: './src/index.html',
		to: './'
	  },
	  {
		from: './src/data/',
		to: './data/'
	  }
    ]),
    // generating html
    // new HtmlWebpackPlugin({
	//   template: 'src/index.html',
	//   chunksSortMode: 'dependency',
	//   minify: {
	// 	removeComments: true,
	// 	collapseWhitespace: true
	//   }
	// }),
	new UglifyJsPlugin({
	  beautify: false,
	  comments: false,
	  compress: {
		screw_ie8: true
	  },
	  mangle: false
	  // mangle: {
      //   screw_ie8 : true,
	  // 	except: [
      //     'RouterActive',
      //     'RouterLink',
      //     'RouterOutlet',
      //     'NgFor',
      //     'NgIf',
      //     'NgClass',
      //     'NgSwitch',
      //     'NgStyle',
      //     'NgSwitchDefault',
      //     'NgModel',
      //     'NgControl',
      //     'NgFormControl',
      //     'NgForm',
      //     'AsyncPipe',
      //     'DatePipe',
      //     'JsonPipe',
      //     'NumberPipe',
      //     'DecimalPipe',
      //     'PercentPipe',
      //     'CurrencyPipe',
      //     'LowerCasePipe',
      //     'UpperCasePipe',
      //     'SlicePipe',
      //     'ReplacePipe',
      //     'I18nPluralPipe',
      //     'I18nSelectPipe'
      //   ] // needed for uglify RouterLink problem
	  // }
	})
	// new CompressionPlugin({
    //   algorithm: helpers.gzipMaxLevel,
    //   regExp: /\.css$|\.html$|\.js$|\.map$/,
    //   threshold: 2 * 1024
    // })
  ],
  // Other module loader config
  tslint: {
    emitErrors: true,
    failOnHint: true,
    resourcePath: 'src'
  },

  htmlLoader: {
    minimize: true,
    removeAttributeQuotes: false,
    caseSensitive: true,
    customAttrSurround: [ [/#/, /(?:)/], [/\*/, /(?:)/], [/\[?\(?/, /(?:)/] ],
    customAttrAssign: [ /\)?\]?=/ ]
  },
  // don't use devServer for production
  node: {
    global: 'window',
    progress: false,
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
};
