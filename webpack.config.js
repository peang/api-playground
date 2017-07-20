var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: [
        'babel-polyfill',
        './src/web/client.js',
    ],
    // entry: './src/web/#learning/index.js',
    devServer: {
        inline: true,
        contentBase: './public',
        port: 3000
    },
    devtool: 'cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.scss$/,
                include: [
                    path.resolve(__dirname, 'scss'),
                    path.resolve(__dirname, 'public/css'),
                ],
                loaders: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!sass-loader',
                    publicPath: 'public'
                }),
            },
            {
                test: path.join(__dirname, 'src/web'),
                loader: ['babel-loader']
            }
        ],
    },
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '/css/style.css',
            disable: false,
            allChunks: false
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false},
            mangle: true,
            sourcemap: false,
            beautify: false,
            dead_code: true
        }),
        new Dotenv({
            path: './.env',
            safe: true // load .env.example (defaults to "false" which does not use dotenv-safe)
        })
    ]
};