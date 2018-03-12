let webpack = require('webpack');
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
let helpers = require('./helper');

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.ts$/,
      loaders: [
        {
          loader: 'ts-loader',
          // options: { configFileName: helpers.root('', 'tsconfig.json') }
        }, 'angular2-template-loader'
      ]
    }, {
      test: /\.(ts|js)$/,
      loaders: [
        'angular-router-loader'
      ]
    }, {
      test: /\.html$/,
      use: 'html-loader'
    },
    {
      test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
      use: 'file-loader?name=assets/[name].[hash].[ext]'
    },
    {
      test: /\.scss$/,
      include: helpers.root('src'),
      loaders: ['to-string-loader', 'style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader?sourceMap']
    },
    {
      test: /\.css$/,
      include: [helpers.root('src')],
      loader: 'raw-loader'
    }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      name: true,
      cacheGroups: {
        vendors: {
          test: './src/vendor.ts',
          name: 'vendors',
          reuseExistingChunk: true,
          chunks: 'all'
        },
        polyfills: {
          test: './src/polyfills.ts',
          name: 'polyfills',
          reuseExistingChunk: true,
          chunks: 'all'
        },
        app: {
          test: './src/main.ts',
          name: 'app',
          reuseExistingChunk: true,
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /\@angular(\\|\/)core(\\|\/)esm5/,
      helpers.root('src'), // location of your src
      {} // a map of your routes
    ),
    // new webpack.optimize.splitChunks({
    //   name: ['app', 'vendor', 'polyfills']
    // }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
};
