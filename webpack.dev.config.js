const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
    entry: './src/jqueryWrapper',
    output: {
        filename: 'slider.js',
        path: path.resolve(__dirname, 'demo'),
    },
    mode: 'development',
    watch: true,
    devtool: 'inline-source-map',
    module: {
        rules: [{
                test: /\.ts$/,
                use: 'ts-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader']
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'slider.css'
        }),
    ],
    resolve: {
        extensions: ['.ts', '.js'],
    },
    devServer: {
        contentBase: path.join(__dirname, 'demo'),
        compress: true,
        hot: true,
        openPage: 'demo.html',
        open: true,
    },
};