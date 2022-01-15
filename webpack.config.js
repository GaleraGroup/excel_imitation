const path = require('path');


const {CleanWebpackPlugin} = require('clean-webpack-plugin'); 
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');


const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;


const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;


const cssLoaders = (extra) => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {}
        },
        'css-loader'
    ]

    if (extra) {
        loaders.push(extra)
    }

    return loaders;
}

const jsLoaders = () => {
    const loaders = {
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env']
        }
    }

    return loaders;
}


const plugins = () => {
    const base = [
        new HTMLWebpackPlugin({          
            template: './index.html',
            minify: {
                removeComments: isProd,
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, 'src/favicon.ico'),
                to: path.resolve(__dirname, 'dist')
            }]
        }),
        new MiniCssExtractPlugin({
            filename: filename('css')
        })
    ]

    if (isDev) {
        base.push(
            new ESLintPlugin({
                files: '@/**/*.js',
                extensions: 'js',
                exclude: 'node_modules'
                }
            )
        )
    }

    return base;
}


module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: ['@babel/polyfill', './index.js']
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist'),
        //chunkFilename: '[id].[chunkhash].js',
        //assetModuleFilename: '[hash][ext][query]'
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@core': path.resolve(__dirname, 'src/core')
        }
    },
    devtool: isDev ? 'source-map' : false,
    devServer: {
        port: 3000,
        //hot: isDev,
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {   
            chunks: 'all'
        }
    },
    plugins: plugins(),
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: jsLoaders()
            }
        ],
    },
}