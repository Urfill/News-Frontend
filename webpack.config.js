const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    main: './src/js/index.js',
    savedNews: './src/js/saved-news.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: '/', // Для GitHub Pages нужно указать корень или путь до подкаталога
    // publicPath: '/News-Frontend/', - раскоментить в случае использования gh-pages, и закоментить предыдущую строчку
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader, // Используем для продакшн
          'css-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        type: 'asset/resource', // Используем asset module для изображений
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css', // Генерируем CSS с хешем
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html', // Шаблон для index.html
      inject: true,
      chunks: ['main'],
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/saved-news.html', // Шаблон для saved-news.html
      inject: true,
      chunks: ['savedNews'],
      filename: 'saved-news.html',
    }),
  ],
};
