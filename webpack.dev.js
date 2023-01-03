const { merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');

const DIST_PATH = path.resolve(__dirname, './build');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    static: {
      directory: DIST_PATH,
      publicPath: '/',
    },
    hot: true,
    compress: false,
    historyApiFallback: true,
    allowedHosts: 'all',
    client: {
      overlay: false,
    },
  },
  devtool: 'eval-cheap-module-source-map',
});
