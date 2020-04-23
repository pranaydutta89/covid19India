const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const WorkboxPlugin = require('workbox-webpack-plugin');
module.exports = {
    entry: './src/entry.js',

    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[contenthash].js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                }
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({ template: './src/index.html' }),
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
        })
    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
};
