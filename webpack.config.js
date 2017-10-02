var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'eval',
    entry: [
        './src/main/js/index'
    ],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js',
        publicPath: 'http://localhost:3000/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Boot React',
            template: path.join(__dirname, 'src/main/resources/templates/index.html')
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    },
    resolveLoader: {
        modules: ["node_modules"],
        extensions: [".js", ".json", '.jsx'],
        mainFields: ["loader", "main"]
    },
    module: {
        loaders: [
        {
            test: /\.(js|jsx)$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
                plugins: ['transform-decorators-legacy' ],
                presets: ['es2015', 'stage-1', 'react']
            }
        },
        {
            test: /\.(js|jsx)$/,
            loader: 'react-hot-loader/webpack',
            include: path.join(__dirname, 'src')
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
