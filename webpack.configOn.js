var webpack = require('webpack')
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var path = require("path");

module.exports = {
    entry: {
        'main': './pages/index.js'
    },
    output: {
        path: path.join(__dirname, "assets"),
        filename: 'index.js',
        chunkFilename: "[hash]/js/[id].js",
        hotUpdateMainFilename: "[hash]/update.json",
        hotUpdateChunkFilename: "[hash]/js/[id].update.js"
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     title: 'Webpack-demos',
        //     filename: 'demo.html'
        // }),
        // new OpenBrowserPlugin({
        //     url: 'http://localhost:8080'
        // }),
        // new UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // })
    ],
    module: {
        loaders: [{
            test: /\.css$/,
            loader: 'style!css'
        }, {
            test: /\.(jpg|png|gif)$/,
            loader: 'url-loader?limit=8192'
        }, {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react']
            }
            // loader: 'babel-loader?presets[]=es2015&presets[]=react'
        }]
    },
    devServer: {
        inline: true,
        port: 8008,
    }
}