const webpackconfig = require('./webpack.dev.config');

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'test/*.ts',
            'test/*.js',
            'test/*.css',
        ],
        exclude: [],
        preprocessors: {
            'test/**/*.ts': ['webpack']
        },
        webpack: {
            module: webpackconfig.module,
            resolve: webpackconfig.resolve,
            mode: webpackconfig.mode,
            devtool: 'inline-source-map',
        },
        reporters: ['spec'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        concurrency: Infinity
    });
};