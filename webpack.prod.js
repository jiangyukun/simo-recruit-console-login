const webpack = require('webpack')
const moment = require('moment')
process.env.NODE_ENV = 'production'

module.exports = [
  {
    entry: [
      './src/js/main/index.js'
    ],

    output: {
      path: 'build',
      filename: 'bundle-' + moment().format('MMDD') + '.min.js',
      publicPath: 'build/'
    },

    module: {
      loaders: [
        {test: /\.js$/, loaders: ['babel'], exclude: /node_modules/, include: __dirname},
        {test: /\.scss$/, loader: 'style!css!autoprefixer!sass'},
        {test: /\.(jpg|png)$/, loader: "url?limit=8192"},
        {test: /\.svg$/, loader: "file"}
      ]
    },

    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)}),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        sourceMap: false
      })
    ]
  }
]
