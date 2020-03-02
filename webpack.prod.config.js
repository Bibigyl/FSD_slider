// 2 outputs
// https://issue.life/questions/35903246

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');


var config = {
    mode: 'production',
    //devtool: 'inline-source-map',
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
        //new CleanWebpackPlugin(),
    ],
    resolve: {
        extensions: ['.ts', '.js'],
    },
};


var pluginConfig = Object.assign({}, config, {
    name: 'plugin',
    entry: './src/jquerySlider',
    output: {
        filename: 'slider.js',
        path: path.resolve(__dirname, 'slider'),
    },
});


var demoConfig = Object.assign({}, config, {
    name: 'demo',
    entry: './src/jquerySlider',
    output: {
        filename: 'slider.js',
        path: path.resolve(__dirname, 'demo'),
    },
});


// Return Array of Configurations
module.exports = [
    pluginConfig, demoConfig
];