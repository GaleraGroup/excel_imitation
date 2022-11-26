const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); // Чистит директорию dist
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin'); // Служит для перетаскивания фавикона
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`; // если запускаю в режиме разработки (isDev), то получаю обычные названия файлов (bundle.js, bundle.css), если в продакшн режиме, то с хэшем

const jsLoaders = () => {
    const loaders = [
        {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']
            }
        }  
    ]

    if (isDev) {
       // loaders.push('eslint-loader') Разобраться, почему выдает ошибку
    }

    return loaders;
}


module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: ['@babel/polyfill', './index.js'],
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@core': path.resolve(__dirname, 'src/core'),
            '@components': path.resolve(__dirname, 'src/components')
        },
        fallback: {
            "util": require.resolve("util/"),
            "buffer": false,
            "os": false,
            "fs": false,
            "vm": false,
            "url": false,
            "tls": false,
            "net": false,
            "path": false,
            "zlib": false,
            "http": false,
            "https": false,
            "stream": false,
            "crypto": false,
            "querystring": false,
            "crypto-browserify": require.resolve('crypto-browserify'),
            "constants": false,
            "assert": require.resolve("assert/")
        }
    },
    devtool: isDev ? 'source-map' : false,
    devServer: {
        port: 3000,
        hot: isDev,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: 'index.html',
            minify: {
                removeComments: isProd,
                collapseWhitespace: isProd
            }
        }),
        new CopyPlugin({
            patterns: [{
                from: path.resolve(__dirname, 'src/favicon.ico'),
                to: path.resolve(__dirname, 'dist')
            }],
        }),
        new MiniCssExtractPlugin({
            filename: filename('css')
        }),
    ],
    // node: {
    //     Buffer: false,
    //     process: false
    // },
    module: {
        exprContextCritical: false,
        rules: [{
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                enforce: 'pre', 
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoaders()
            }
        ],
    },
}
