const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.js');
const path = require('path');

require('dotenv').config({ path: '.env.development' });

module.exports = merge(common, {
    mode: 'development',
    output: {
        path: path.join(__dirname, 'dist'),
        chunkFilename: '[name].js'
    },
    devtool: 'source-map',
    devServer: {
        contentBase: './dist',
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.GRANT_TYPE': JSON.stringify(process.env.GRANT_TYPE),
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        })
    ]
});