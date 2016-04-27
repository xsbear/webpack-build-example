var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var AssetsPlugin = require('hash-assets-webpack-plugin');
var path =  require('path');

var chunkJsFilename = process.env.NODE_ENV === 'production' ? 'js/[name].[chunkhash:7].js' : 'js/[name].js';
var chunkCssFilename = process.env.NODE_ENV === 'production' ? 'css/[name].[chunkhash:7].css' : 'css/[name].css';
var urlLoaderFilename = process.env.NODE_ENV === 'production' ? 'images/[name].[hash:7].[ext]' : 'images/[name].[ext]';

module.exports = {
    entry: {
        main: "./src/js/entry.js",
        sub: "./src/js/entry2.js"
    },
    output: {
        path: './static',
        // publicPath: '/static/',
        filename: chunkJsFilename,
        chunkFilename: chunkJsFilename
    },
    module: {
        loaders: [
            // { test: /\.css$/, loader: "style!css" },
            // Extract css files
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style", "css", {publicPath: '../'})
            },
            { test: /\.(png|jpg|ico)$/, loader: 'url-loader?name=' + urlLoaderFilename + '&limit=1024'}
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "commons",
            filename: chunkJsFilename
        }),
        new ExtractTextPlugin(chunkCssFilename)
    ]
}

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = module.exports.plugins.concat([
        // new webpack.optimize.MinChunkSizePlugin({
        //     minChunkSize: 100000000
        // }),
        // new  webpack.optimize.LimitChunkCountPlugin({
        //     maxChunks: 5
        // }),
        // new webpack.optimize.AggressiveMergingPlugin(),
        // apply hash assets plugin
        new AssetsPlugin({
            path: './static',
            // keyTemplate: 'js/[name].js',
            keyTemplate: function (filename) {
                var match = /(js|css)\/([\w\-]+)\.\w{7}\.\1/.exec(filename);
                return match[1] + '/' + match[2] + '.' + match[1];
            },
            hashLength: 7,
            srcPath: './src',
            srcMatch: {
                'home.html': /['"]([^'"]+\.(?:png|jpg|jpeg))['"]/gi
            },
            assetMatch: {
                css: /\(['"]?([^\(\)]+\.(?:gif|png|jpg|css|ico))['"]?\)/gi
            },
            assetNameTemplate: '[name].[hash]',
            prettyPrint: true
        }),
        function() {
            this.plugin("done", function(stats) {
                require("fs").writeFileSync(
                path.join(__dirname, "stats.json"),
                JSON.stringify(stats.toJson()));
            });
        }
    ])
}
//  else {
//     module.exports.devtool = '#source-map'
// }
