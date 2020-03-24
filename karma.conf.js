const webpackConfig = require('./webpack.dev.config');

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'test/*.spec.ts', 
            'src/*.css', 
            'src/MVP/**/*.ts'
        ],
        exclude: [],
        preprocessors: {
            'test/**/*.ts': ['webpack'],
            'src/MVP/**/*.ts': ['webpack', 'coverage'],
        },
        mime: {
            'text/x-typescript': ['ts', 'tsx']
        },
        reporters: [
            'spec',
            'coverage'
        ],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        concurrency: Infinity,
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true
        },
        plugins: [
            'karma-webpack',
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-spec-reporter',
            'karma-coverage',
        ],
    });
};