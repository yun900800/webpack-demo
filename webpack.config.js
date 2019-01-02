var HtmlWebpackPlugin = require('html-webpack-plugin');
console.log('__dirname',__dirname);
module.exports = {
     entry: './src/app.js',
     output: {
        path: __dirname + '/build',
        filename: 'bundle.js'
     },
     plugins: [new HtmlWebpackPlugin(
        {
            title: "Webpack Demo",
            template: "./template/index.html",
            filename: 'index.html',
            minify: {
              collapseWhitespace: true,
            },
            hash: true
          }
     )]
};
