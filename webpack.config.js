const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  watch: true,
  //entry: './src/jqueryWrapper',
  entry: './src/index',
  output: {
    filename: 'slider.js',
    path: path.resolve(__dirname, 'slider'),
    path: path.resolve(__dirname, 'demo/slider'),
  },
  devtool: 'inline-source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
      {
        //test: /\.css$/,
        //use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader']
      }
    ],
  },
  plugins: [
    //new MiniCssExtractPlugin({filename: 'slider.css'}),
    //new CleanWebpackPlugin(),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  },
  devServer: {
    contentBase: path.join(__dirname, 'slider'),
    compress: true,
    hot: true,
    //openPage: 'demo.html',
    //index: 'index.html',
    open: true,
  },
};