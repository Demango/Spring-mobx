var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'eval',
    entry: [
        './src/main/js/index'
    ],
    watchOptions: {
        poll: true
    },
    output: {
        path: path.join(__dirname, './target/classes/static/built/'),
        filename: 'bundle.js',
        publicPath: 'http://localhost:3000/'
    },
    resolve: {
        extensions: [".js", ".json", ".jsx"],
        modules: [
            path.join(__dirname, 'src'),
            'node_modules',
            'src/main/js'
        ]
    },
    resolveLoader: {
        modules: ['node_modules'],
        extensions: [".js", ".json", ".jsx"],
        mainFields: ["loader", "main"]
    },
    module: {
        loaders: [
        {
            test: /\.(js|jsx)$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
                plugins: ['transform-decorators-legacy'],
                presets: ['es2015', 'stage-1', 'react']
            }
        },
        {
                test: /\.json?$/,
                loader: 'json-loader'
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$|\.svg$/i,
                loader: 'url-loader?limit=10000'
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ]
            }
        ]
    }
};
