const path = require('path');

module.exports = {
  watch: true,
  entry: './src/jqueryWrapper',
  devtool: 'inline-source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'slider.js',
    path: path.resolve(__dirname, './slider'),
    path: path.resolve(__dirname, './demo/slider'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'demo'),
    compress: true,
    hot: true,
    openPage: 'demo.html',
    open: true,
  },
};