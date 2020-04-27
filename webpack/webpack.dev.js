const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
module.exports = merge(common, {
    mode: 'development',
    optimization: {
        usedExports: true
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        https: false,
        compress: true,
        port: 1234,
        writeToDisk: true,
        disableHostCheck: true
    }
});
