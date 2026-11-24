const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const styleOrExtractLoader = process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader';

module.exports = {
    entry: {
        bundle: './src/index.js',
    },

    resolve: {
        modules: [path.join(__dirname, 'src'), 'node_modules'],
        alias: {
            process: 'process/browser',
            stream: 'stream-browserify',
            zlib: 'browserify-zlib',
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{ loader: 'babel-loader' }],
            },
            {
                test: /\.(sass|scss)$/,
                use: [
                    styleOrExtractLoader,
                    { loader: 'css-loader' },
                    {
                        loader: 'sass-loader',
                        options: {
                            // api: 'modern',
                            sassOptions: {
                                silenceDeprecations: [
                                    'legacy-js-api',
                                    'import',
                                    'global-builtin',
                                    'color-functions',
                                    'slash-div',
                                    'if-function',
                                ],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [styleOrExtractLoader, { loader: 'css-loader' }],
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 100000,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Buffer: ['buffer', 'Buffer'],
        }),
    ],

    optimization: {
        splitChunks: {
            chunks: 'all',
        },
        emitOnErrors: false,
        concatenateModules: true,
    },
};
