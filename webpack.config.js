/**
 * Created by Administrator on 2016/10/13.
 */
var webpack = require('webpack');
var path = require('path');
module.exports = [{
    devtool: 'sourcemap',
    entry:[__dirname + '/app/main.js'],
    output:{
        path:__dirname + '/public/js',
        filename:'bundle.js'
    },
    module: {//在配置文件里添加JSON loader
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',//在webpack的module部分的loaders里进行配置即可
                query: {
                    presets: ['es2015','react']
                }
            },
            {
                test: /\.css$/,
                loader: "style!css!autoprefixer-loader?{browsers:['last 2 version','firefox 15']}"
            },
            {
                test: /\.less$/,
                loader: "style!css!less!autoprefixer-loader?{browsers:['last 2 version','firefox 15']}"
            },
            {
                test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/,
                loader: "url?limit=8192"
            }
        ]
    }
},{
    devtool: 'sourcemap',
    entry:[__dirname + '/server/page.js'],
    output:{
        path:__dirname+'/server',
        filename:'page.generated.js',
        libraryTarget: "commonjs2"
    },
    target:'node',
    module: {//在配置文件里添加JSON loader
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',//在webpack的module部分的loaders里进行配置即可
                query: {
                    presets: ['es2015','react']
                }
            },
            {
                test: /\.css$/,
                loader: "style!css!autoprefixer-loader?{browsers:['last 2 version','firefox 15']}"
            },
            {
                test: /\.less$/,
                loader: "style!css!less!autoprefixer-loader?{browsers:['last 2 version','firefox 15']}"
            },
            {
                test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/,
                loader: "url?limit=8192"
            }
        ]
    }
}
]