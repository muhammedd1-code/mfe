const {merge} = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json')

const devConfig = {
    mode: 'development',
    output: {
        publicPath: 'http://localhost:8080/',
        crossOriginLoading: 'anonymous'
    },
    devServer: {
        port: 8080,
        historyApiFallback: {
            index: '/index.html'
        },
        headers: {
            devServer: {
                port: 8082,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
                }
            }
        }
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                marketing: 'marketing@http://localhost:8081/remoteEntry.js',
                auth: 'auth@http://localhost:8082/remoteEntry.js',
                dashboard: 'dashboard@http://localhost:8083/remoteEntry.js'
            },
            shared: packageJson.dependencies
        }),
        new HtmlWebpackPlugin({
                    template: './public/index.html'
                })
       
    ]
};
module.exports = merge(commonConfig, devConfig);