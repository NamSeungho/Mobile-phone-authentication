const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        path: path.join(__dirname, 'public')
    },
    devServer: {
        overlay: true,
        hot: true,
        contentBase: './public'
    },
    module: {
        rules: [{
            test: /\.js$/i,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']
            }
        }, {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader']
        }],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Development',
            template: './index.html'
        }),
        new MiniCssExtractPlugin({ filename: 'index.css' })
    ]
};