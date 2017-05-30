var webpack = require("webpack");
var path = require("path");
module.exports = {
    context: __dirname,
    entry: "./pages/index.js",
    output: {
        path: path.join(__dirname, "assets"),
        publicPath: "assets/",
        filename: "index.js",
        chunkFilename: "[hash]/js/[id].js",
        hotUpdateMainFilename: "[hash]/update.json",
        hotUpdateChunkFilename: "[hash]/js/[id].update.js"
    },
    recordsOutputPath: path.join(__dirname, "records.json"),
    module: {
        loaders:[
			{ test: /\.css$/,    loader: "style-loader!css-loader" },
			{ test: /\.less$/,   loader: "style-loader!css-loader!less-loader" },
			{ test: /\.png$/,    loader: "url-loader?prefix=img/&limit=5000" },
			{ test: /\.jpg$/,    loader: "url-loader?prefix=img/&limit=5000" },
			{ test: /\.gif$/,    loader: "url-loader?prefix=img/&limit=5000" },
			{ test: /\.woff$/,   loader: "url-loader?prefix=font/&limit=5000" },
			{ test: /\.eot$/,    loader: "file-loader?prefix=font/" },
			{ test: /\.ttf$/,    loader: "file-loader?prefix=font/" },
			{ test: /\.svg$/,    loader: "file-loader?prefix=font/" },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
                // loader: 'babel-loader?presets[]=es2015&presets[]=react'
            }
        ],
        // preLoaders:[
        //     {
		// 		test: /\.js$/,
		// 		include: pathToRegExp(path.join(__dirname, "pages")),
		// 		loader: "jshint-loader"
		// 	},
		// 	{
		// 		// Simulate updates to showcase the hot module replacement
		// 		test: pathToRegExp(path.join(__dirname, "app")),
		// 		loader: path.join(__dirname, "fake-update.js")
		// 	}
        // ]
    },
	plugins: [
		new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 20 })
	],
	fakeUpdateVersion: 0
}

function escapeRegExpString(str) { return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"); }
function pathToRegExp(p) { return new RegExp("^" + escapeRegExpString(p)); }