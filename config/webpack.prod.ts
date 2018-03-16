import * as webpack from 'webpack';
import * as webpackMerge from 'webpack-merge';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as UglifyJSPlugin from 'uglifyjs-webpack-plugin';
let commonConfig = require('./webpack.common.ts');
let helpers = require('./helper.ts');

module.exports = webpackMerge(commonConfig, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[name].[hash].chunk.js'
  },
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          output: {
            comments: false
          },
          mangle: {
            keep_fnames: true
          }
        }
      })
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin('[name].[hash].css'),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'PEERSVIEW_API': JSON.stringify(process.env.PEERSVIEW_API)
      }
    }),
    new webpack.LoaderOptionsPlugin({
      htmlLoader: {
        minimize: false // workaround for ng2
      }
    })
  ]
});
