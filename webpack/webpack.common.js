const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
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
        new MomentLocalesPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({ template: './src/index.html' })
    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
};
