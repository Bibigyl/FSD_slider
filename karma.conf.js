const webpackConfig = require('./webpack.dev.config');

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: ['test/*.ts', 'test/*.css'],
        exclude: [],
        preprocessors: {
            'test/**/*.ts': ['webpack', 'coverage'],
            'test/**/*.js': ['webpack', 'coverage'],
        },
        mime: {
            'text/x-typescript': ['ts', 'tsx']
        },
        webpack: {
            module: webpackConfig.module,
            resolve: webpackConfig.resolve,
            mode: webpackConfig.mode,
            devtool: 'inline-source-map',
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