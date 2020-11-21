const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

// const ghpages = require('gh-pages');

module.exports = {
  entry: {
    main: './src/script/index.js',
    savedNews: './src/script/saved-news.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]/[name].[chunkhash].js',
  },
  module: {
    rules: [{
      test: /\.css$/i,
      use: [
        (isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
          },
        },
        'postcss-loader',
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
      test: /\.(png|jpg|gif|ico|svg)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name][hash].[ext]',
          outputPath: 'images',
          esModule: false,
        },
      }],
    },
    // {
    //   test: /\.(png|jpe?g|gif)$/i,
    //   use: [{
    //     loader: 'file-loader',
    //   }],
    // },

    {
      test: /\.(eot|ttf|woff|woff2)$/,
      loader: 'file-loader?name=./vendor/[name].[ext]',
    },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]/[name].[contenthash].css',
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default'],
      },
      canPrint: true,
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/saved-news.html',
      inject: true,
      chunks: ['savedNews'],
      filename: 'savedNews/saved-news.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true,
      chunks: ['main'],
      filename: 'main/index.html',
    }),
    new WebpackMd5Hash(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }),
    // new FaviconsWebpackPlugin('./src/images/favicon/favicon.png'),
  ],
};
