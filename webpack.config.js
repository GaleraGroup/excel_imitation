const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // Чистит директорию dist
const HTMLWebpackPlugin = require('html-webpack-plugin'); // 
const CopyPlugin = require('copy-webpack-plugin'); // Служит для перетаскивания фавикона
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: './index.js',
    output: {
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '@': path.resolve(__dirname, 'src'), //Элиас - маска для замены пути вида ../../../../core/
            '@core': path.resolve(__dirname, 'src/core')
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: 'index.html'
        }),
        new CopyPlugin({
            patterns: [
                { from: path.resolve(__dirname, 'src/favicon.ico'), to: path.resolve(__dirname, 'dist') } 
            ],
        }),
        new MiniCssExtractPlugin({
            filename: 'bundle.[hash].css'
        }),
    ],
    module: {
        rules: [
          {
            test: /\.s[ac]ss$/i,
            use: [
              MiniCssExtractPlugin.loader,
              "css-loader",
              "sass-loader",
            ],
          },
        ],
      },
}

// + Разобраться что с CopyPlugin, возможно найти замену
// - Установка pug?
// + Прочитать для чего нужен HTMLWebpackPlugin
// - Настройка лоадеров. Что такое лоадеры и для чего нужны
// - Остальные 3 главы + всё что перечислено в procedure
// - Глава 1: Что такое область видимости?