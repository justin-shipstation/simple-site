const { resolve, join } = require('path');
const { readdirSync } = require('fs');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const pages = readdirSync(resolve(__dirname, 'src')).filter(fileName => fileName.endsWith('.html'));

module.exports = {
    entry: {
        index: './src/index.js',
        test: './src/test.js'
    }, 
    output: {
        filename: '[name].js',
        path: resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: { minimize: true }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ]
    },
    plugins: pages.map(page => new HtmlWebpackPlugin({
        template: join('./src/', page),
        filename: page
    }))
}
