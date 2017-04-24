var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: "eval-source-map",
  entry:  __dirname + "/app/main.js",
  output: {
    path: __dirname + "/public",//打包后的文件存放的地方
    filename: "[name]-[hash].js"//打包后输出文件的文件名
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        // loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules!postcss')
        // loader: ExtractTextPlugin.extract({
        //   fallback: 'style-loader',
        //   use: 'css-loader?modules!postcss'
        // })
        use: [
          'style-loader', {
            loader: 'css-loader',
            options: {
            }
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: function() {
                return [
                  require('autoprefixer')
                ];
              }
            }
          }
        ]
      }
    ]
  },

  // postcss: [
  //   require('autoprefixer')
  // ],

  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/app/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
    }),
    // new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin("[name]-[hash].css")
  ]
};