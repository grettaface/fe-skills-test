const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const clientConfig = require('./config');
const port = process.env.PORT || 5000;

const Paths = {
  DIST: path.join(__dirname, 'dist'),
  ENTRY: path.join(__dirname, 'src', 'app-client.js'),
  NODE_MODULES: path.resolve(__dirname, 'node_modules'),
};

function getDevTool() {
  if (process.env.NODE_ENV !== 'production') {
    return 'source-map'; // enables source map
  }

  return false;
}

module.exports = {
  entry: {
    'static/js/bundle.js': [
      'whatwg-fetch',
      Paths.ENTRY,
    ],
  },
  output: {
    path: Paths.DIST,
    filename: '[name]',
  },
  devtool: getDevTool(),
  devServer: {
    contentBase: Paths.DIST,
    hot: true,
    inline: true,
    port,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [Paths.NODE_MODULES],
        loader: ['react-hot-loader/webpack', 'babel-loader'],
      },
      {
        test: /\.xml$/,
        use: 'raw-loader',
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader',]
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
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
    new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
    new ExtractTextPlugin('./static/styles/styles.css'),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/views/index.ejs',
      config: clientConfig,
    }),
  ]
};
