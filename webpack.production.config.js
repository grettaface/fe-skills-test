const webpack = require('webpack');
const path = require('path');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const Paths = {
  DIST: path.join(__dirname, 'dist'),
  ENTRY: path.join(__dirname, 'src', 'app-client.js'),
  NODE_MODULES: path.resolve(__dirname, 'node_modules'),
};

module.exports = {
  entry: {
    'static/js/bundle.js': Paths.ENTRY,
  },
  output: {
    path: Paths.DIST,
    filename: '[name]',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [Paths.NODE_MODULES],
        query: {
          cacheDirectory: 'babel_cache',
          presets: ['es2015','react','stage-0']
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader',]
        }),
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production')
      }
    }),
    new CopyWebpackPlugin(
      [
        {
          from: './src/data/**/*.js',
          to: './data/',
        },
        {
          from: './src/images/*.{jpg,jpeg,png,gif,svg}',
          to: './static/images/',
        },
      ]
    ),
    new webpack.optimize.UglifyJsPlugin(),
    new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
    new ExtractTextPlugin('./static/styles/styles.css'),
    new HtmlWebpackPlugin({
      template: '!html-loader!./src/views/index.ejs',
      filename: 'src/views/index.ejs',
    }),
  ]
};