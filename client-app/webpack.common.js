const webpack = require('webpack');
const path = require('path');

const VENDOR_LIBS = [
    'react',  'redux', 'react-redux', 'react-dom',
    'jquery', 'bootstrap-sass', 'lodash',
    'faker', 'react-chartjs-2', 'redux-saga', 'moment',
];

module.exports = {
    entry: {
        bundle: './src/index.js',
        vendor: VENDOR_LIBS
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },
    resolve: {
        modules: [
            path.join(__dirname, "src"),
            "node_modules"
        ],
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                test: /\.(sass|scss)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg|jpg|gif)$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ]
};