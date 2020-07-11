const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin")
const WorkboxPlugin = require('workbox-webpack-plugin');
module.exports = {
    entry: './src/client/index.js',
    output:
    {
        libraryTarget: 'var',
        library: 'Client',
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.min.js'
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test:/\.scss$/,
                use:[MiniCssExtractPlugin.loader,'css-loader','sass-loader']
            },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new MiniCssExtractPlugin(),
        new WorkboxPlugin.GenerateSW(),
    ]
}
