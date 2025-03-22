/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  externals: nodeExternals(),
  target: 'node',
  context: path.resolve(__dirname, 'src'),
  entry: './main.ts',

  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist',
    clean: true,
  },

  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: ['.ts', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.build.json',
        },
      },
    ],
  },

  plugins: [
    new NodemonPlugin({
      stdin: false,
      watch: [path.resolve('./dist'), '.env'],
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /.spec.(ts|tsx)$/,
    }),
  ],

  optimization: {
    minimize: false,
  },
};
