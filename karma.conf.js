const webpackConfig = require('./webpack.dev.config');
const webpack = require('karma-webpack');
const path = require('path');


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
        reporters: ['spec', 'coverage-istanbul', 'coverage'],
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
            //'karma-coverage-istanbul-reporter'
            //webpack,
            'karma-webpack',
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-spec-reporter',
            'karma-coverage',
            'karma-coverage-istanbul-reporter'
        ],

        //reporters: ['coverage-istanbul'],

        coverageIstanbulReporter: {
            reports: ['html', 'lcovonly', 'text-summary'],
            dir: path.join(__dirname, 'coverage'),
            combineBrowserReports: true,
            fixWebpackSourcePaths: true,
            skipFilesWithNoCoverage: true,
            'report-config': {
                html: {
                    subdir: 'html'
                }
            },
            thresholds: {
                emitWarning: false,
                global: {
                    statements: 100,
                    lines: 100,
                    branches: 100,
                    functions: 100
                },
                each: {
                    statements: 100,
                    lines: 100,
                    branches: 100,
                    functions: 100,
                    overrides: {
                        'baz/component/**/*.js': {
                            statements: 98
                        }
                    }
                }
            },

            verbose: true,
            instrumentation: {
                'default-excludes': false
            }
        }
    });
};