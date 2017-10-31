const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.js');

require('dotenv').config({ path: '.env.development' });

module.exports = merge(common, {
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new webpack.DefinePlugin({
            'process.env.URL_API': JSON.stringify(process.env.URL_API),
            'process.env.CLIENT_SECRET': JSON.stringify(process.env.CLIENT_SECRET),
            'process.env.GRANT_TYPE': JSON.stringify(process.env.GRANT_TYPE),
            'process.env.CLIENT_ID': JSON.stringify(process.env.CLIENT_ID),
        })
    ]
});