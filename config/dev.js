const { resolve } = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./base');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function(env) {
  return webpackMerge(commonConfig(env), {
    context: resolve(__dirname, '../src'),
    entry: {
      "index":[
        'webpack-dev-server/client?http://0.0.0.0:8080',
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint

        'webpack/hot/only-dev-server',
        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates

        './index.js'
        // the entry point of our app
      ]
    },
    output: {
      filename: '[name].bundle.js',
      publicPath: '/'
      // necessary for HMR to know where to load the hot update chunks
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [ 'style-loader', 
                 'css-loader', 
                 'sass-loader',
                 'postcss-loader'
                ]
        }
      ],
    },

    devtool: 'inline-source-map',

    devServer: {
      host: "0.0.0.0",
      hot: true,
      // enable HMR on the server

      contentBase: resolve(__dirname, '../'),
      // match the output path

      publicPath: '/',
      // match the output `publicPath`
      historyApiFallback: true,
      "proxy": {
        "/api": {
            target: "http://gank.io",
            changeOrigin: true
          },
        "/capi": {
            target: "http://localhost:3010",
            changeOrigin: true,
            pathRewrite: {"^/capi" : ""}
          }
      },
      disableHostCheck: true
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      // enable HMR globally

      new webpack.NamedModulesPlugin(),
      // prints more readable module names in the browser console on HMR updates
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: resolve(__dirname, "../views/index.html"),
        chunks: ['index']
      })
    ]
  });
};