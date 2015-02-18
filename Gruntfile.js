module.exports = function (grunt) {
    'use strict';
    require('jit-grunt')(grunt);

    var webpack = require('webpack');
    var HtmlWebpackPlugin = require('html-webpack-plugin');

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        'http-server': {
            'dev': {
                root: 'web',
                host: "127.0.0.1",
                port: 9999,

                cache: 0,
                showDir : true,
                autoIndex: true,

                // server default file extension
                ext: "html",

                // run in parallel with other tasks
                runInBackground: false
            }
        },

        jshint: {
            files: ['src/**/*.js'],
            options: {
                globals: {
                    define: true,
                    angular: true
                },
                bitwise: true,
                camelcase: false,
                curly: true,
                eqeqeq: true,
                forin: true,
                immed: true,
                indent: 4,
                latedef: true,
                newcap: true,
                noarg: true,
                noempty: true,
                nonew: true,
                plusplus: true,
                undef: true,
                unused: true,
                strict: true,
                trailing: true,

                maxparams: 10,
                maxdepth: 5,
                maxstatements: 12,
                maxcomplexity: 10,
                maxlen: 120,

                browser: true,
                quotmark: false
            }
        },

        webpack: {
            options: {
                storeStatsTo: "stats",

                entry: {
                    app: "./src/app.js",
                    vendor: [
                        './bower_components/angular/angular',
                        './bower_components/angular-route/angular-route',
                        './bower_components/lodash/lodash'
                    ]
                },

                output: {
                    path: "web",
                    publicPath: "/",
                    filename: "app.js"
                },

                module: {
                    loaders: [
                        {
                            test: /\.html$/,
                            loader: "html-loader"
                        },
                        {
                            test: /\.less$/,
                            loader: "style-loader!css-loader!autoprefixer-loader?browsers=last 2 version!less-loader"
                        },
                        {
                            test: /\.(jpe?g|png|gif|svg)$/i,
                            loaders: ['image?optimizationLevel=7&interlaced=true']
                        },
                        {
                            test: /\.(woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                            loader: "url-loader?limit=10000&mimetype=application/font-woff"
                        },
                        {
                            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                            loader: "file-loader"
                        }
                    ]

                },
                plugins: [
                    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
                    new HtmlWebpackPlugin({
                        template: 'src/index.html'
                    })
                ]
            },
            dev: {
                progress: true,
                failOnError: false,
                watch: true,
                keepalive: true
            },
            prod: {
                progress: true,
                failOnError: false,
                watch: false,
                keepalive: false,

                output: {
                    path: "web",
                    publicPath: "/",
                    filename: "app.[hash].js"
                },

                plugins: [
                    new webpack.optimize.UglifyJsPlugin({
                        'mangle': false,
                        'compress': {
                            dead_code: false,    // discard unreachable code
                            unsafe: false,       // some unsafe optimizations (see below)
                            unused: false,       // drop unused variables/functions
                            hoist_vars: false,   // hoist variable declarations
                            side_effects: false, // drop side-effect-free statements
                            global_defs: {}      // glob
                        }
                    })
                ]
            }

        }

    });

    grunt.registerTask('default', ['webpack:prod']);
    grunt.registerTask('dev', ['webpack:dev']);

};
