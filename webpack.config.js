const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ExtractTextWebapckPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname,'./src/index.js'),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js'
    },
    mode:'development',
    devServer: {
        contentBase: path.resolve(__dirname,'dist'),
        host: 'localhost',
        port: '8082',
        compress: true //开发服务器是否启动gzip等压缩
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react']
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use:ExtractTextWebapckPlugin.extract({
                    use:'css-loader'
                })
            },
            {
                test:/\.scss$/,
                use: ExtractTextWebapckPlugin.extract({
                    use:['css-loader','sass-loader']
                })
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                use: 'url-loader',
                include: path.resolve(__dirname,"./src"),
                exclude: /node_modules/
            },
            {
                test: /\.(html|htm)$/,
                use: 'html-withimg-loader'
            }
        ]
    },
    plugins:  [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: './index.html',
            hash:true,//防止缓存
        }),
        new ExtractTextWebapckPlugin('css/sass.css'),
        new ExtractTextWebapckPlugin('css/index.css')
    ]
}