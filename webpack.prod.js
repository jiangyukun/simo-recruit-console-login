const path = require('path')
const webpack = require('webpack')
const moment = require('moment')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = [
  {
    entry: [
      './src/index.js'
    ],

    output: {
      path: path.join(__dirname, 'build'),
      filename: 'bundle-' + moment().format('MMDD') + '.min.js',
      publicPath: 'build/'
    },

    module: {
      loaders: [
        {test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/, include: __dirname},
        {test: /\.less$/, loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: ['css-loader', 'less-loader']})},
        {test: /\.scss$/, loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: ['css-loader', 'sass-loader']})},
        {test: /\.(jpg|png|svg)$/, loader: "url-loader?limit=8192"},
        {test: /\.(eot|woff|woff2|ttf)([\?]?.*)$/, loader: "file-loader"}
      ]
    },

    plugins: [
      new ExtractTextPlugin('style-' + moment().format('MMDD') + '.min.css'),
      new webpack.DefinePlugin({'process.env.NODE_ENV': '"production"'}),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        sourceMap: false
      })
    ]
  }
]
