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
        filename: '[name].[chunkhash].js',
        publicPath: './js/',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/welcome.blade.php',
            filename: '../../resources/views/welcome.blade.php',
        }),
    ],
});
