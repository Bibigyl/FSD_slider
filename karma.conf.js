const webpackConfig = require('./webpack.dev.config');

module.exports = function (config) {
    config.set({
        frameworks: ['jasmine', "karma-typescript"],
        files: [
            'test/*.spec.ts',
            'src/slider.css',
            'src/MVP/**/*.ts'
        ],
        preprocessors: {
            'test/**/*.ts': ['webpack', 'karma-typescript'],
            'src/MVP/**/*.ts': ['webpack', 'karma-typescript'],
        },
        reporters: [
            'spec',
            'karma-typescript'
        ],
        browsers: ['Chrome'],
        webpack: webpackConfig,
        plugins: [
            'karma-webpack',
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-spec-reporter',
            'karma-typescript'
        ],
        browsers: ['Chrome'],
    });
};