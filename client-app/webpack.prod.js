const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.js');
const path = require('path');

require('dotenv').config({ path: '.env.production' });

module.exports = merge(common, {
    output: {
        path: path.join(__dirname, '../../../../../../public_html/' + process.env.MAP_NAME + '/js'),
        filename: '[name].[chunkhash].js',
        publicPath: './js/'
    },
    plugins: [
        new CleanWebpackPlugin(['../public/js']),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true
            },
            output: {
                comments: false
            }
        }),
        new HtmlWebpackPlugin({
            template: './src/welcome.blade.php',
            filename: '../../../../../code/' + process.env.MAP_NAME + '/resources/views/welcome.blade.php',
        }),
        new webpack.DefinePlugin({
            'process.env.URL_API': JSON.stringify(process.env.URL_API),
            'process.env.CLIENT_SECRET': JSON.stringify(process.env.CLIENT_SECRET),
            'process.env.GRANT_TYPE': JSON.stringify(process.env.GRANT_TYPE),
            'process.env.CLIENT_ID': JSON.stringify(process.env.CLIENT_ID),
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        })
    ]
});