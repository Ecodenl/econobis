const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.js');
const path = require('path');

require('dotenv').config({ path: '.env.production' });

module.exports = merge(common, {
    mode: 'production',
    output: {
        path: path.join(__dirname, '../public/js'),
        chunkFilename: '[name].[chunkhash].js',
        publicPath: './js/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/welcome.blade.php',
            filename: '../../resources/views/welcome.blade.php',
        }),
        new webpack.DefinePlugin({
            'process.env.GRANT_TYPE': JSON.stringify(process.env.GRANT_TYPE),
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        })
    ]
});