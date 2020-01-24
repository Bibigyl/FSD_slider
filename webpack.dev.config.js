const path = require('path');

module.exports = {
  watch: true,
  entry: './src/index',
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
  },
  devServer: {
    contentBase: path.join(__dirname, './slider'),
    compress: true,
    hot: true,
    index: 'slider/index.html',
    open: true,
  },
};
