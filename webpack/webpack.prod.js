const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');
const SitemapPlugin = require('sitemap-webpack-plugin').default;
const RobotstxtPlugin = require("robotstxt-webpack-plugin");
// Example of simple string paths
const paths = [
    '/'
];


module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new RobotstxtPlugin({
            sitemap: "https://covid2.in/sitemap.xml",
            host: "https://covid2.in",
        }),
        new SitemapPlugin('https://covid2.in', paths, {
            lastmod: true,
            changefreq: 'always',
        }),
        new BundleAnalyzerPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        })
    ]
});
