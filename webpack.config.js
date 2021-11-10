const path = require('path');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin'); // Чистит директорию dist
const HTMLWebpackPlugin = require('html-webpack-plugin'); // 
const CopyPlugin = require('copy-webpack-plugin'); // Служит для перетаскивания фавикона
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`; // если запускаю в режиме разработки (isDev), то получаю обычные названия файлов (bundle.js, bundle.css), если в продакшн режиме, то с хэшем

const jsLoaders = () => {
    const loaders = [{
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env']
        }
    }]

    if (isDev) {
        loaders.push('eslint-loader')
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
            '@': path.resolve(__dirname, 'src'), //Элиас - маска для замены пути вида ../../../../core/
            '@core': path.resolve(__dirname, 'src/core')
        }
    },
    devtool: isDev ? 'source-map' : false,
    devServer: {
        port: 3000,
        hot: isDev
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
    module: {
        rules: [{
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    jsLoaders()
                }
            }
        ],
    },
}

// + Разобраться что с CopyPlugin, возможно найти замену
// - Установка pug?
// + Прочитать для чего нужен HTMLWebpackPlugin
// - Настройка лоадеров. Что такое лоадеры и для чего нужны
// - Остальные 3 главы + всё что перечислено в procedure
// - Глава 1: Что такое область видимости?