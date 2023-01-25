const webpack = require('webpack');
const path = require('path');

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
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }],
            },
            {
                test: /\.css$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
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
        emitOnErrors: false, // emitOnErrorsPlugin
        concatenateModules: true, //ModuleConcatenationPlugin
    },
};
