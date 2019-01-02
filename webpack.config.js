var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack')
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var isProduction = process.env.NODE_ENV==='production'
var pathsToClean = [
  'build',
]

console.log('__dirname',__dirname);

var config = {
     entry: ['babel-polyfill','./src/app.js'],
     output: {
        // path: __dirname + '/build',
        path: path.resolve(__dirname, 'build'),
        // filename: 'bundle.js'
        filename: 'bundle.[hash].js'
     },
     devtool: 'source-map',
     devServer: {
        port:8787,
        open:true,
        compress:true,
        index: "index.html"
     },
     plugins: [
        new HtmlWebpackPlugin({
            title: "Webpack Demo",
            template: "./template/index.html",
            filename: 'index.html',
            minify: {
              collapseWhitespace: true,
            },
            hash: true
          }
        ),
        // new ExtractTextPlugin('style.css'),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
        new CleanWebpackPlugin(pathsToClean)
    ],
     module : {
        //这其中rules数组就是loader用来的匹配和转换资源的规则数组。
        // test代表匹配需转换文件的正则表达式，而图中表示匹配所有以css结尾的文件。
        // 而use数组代表用哪些loader去处理这些匹配到的文件。

        // 此时再运行webpack，打包后的文件bundle.js就包含了css代码。
        // 其中css-loader负责加载css，打包css到js中。
        // 而style-loader负责生成：在js运行时，将css代码通过style标签注入到dom中。
         rules: [
             {
                test: /\.css$/,
                //  use : ['style-loader','css-loader']
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false
                        }
                        // options: {
                        //  minimize: process.env.NODE_ENV === 'production'
                        // }
                    }
                ]
            },
             {
                test: /\.less$/,
                use: [ 'style-loader', 'css-loader', 'less-loader' ]
                // use : ExtractTextPlugin.extract({
                //     fallback: 'style-loader',
                //     use : ['css-loader','less-loader']
                // }) 
             },
             {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                    presets: ['env']
                    }
                }
            },
            {
               test: /\.jsx$/,
               exclude: /(node_modules)/,
               use: {
                   loader: 'babel-loader',
                   options: {
                   presets: ['env','react']
                   }
               }
           },
           {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images/'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true,
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }],
            }
         ]
    }
};
if (isProduction) {
    config.output.filename = 'bundle.[chunkhash].js'
} else {
    config.plugins.push(new webpack.NamedModulesPlugin())
    config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config;
