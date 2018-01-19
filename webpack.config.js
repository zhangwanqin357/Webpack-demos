const path = require('path')
// 新生成html文件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// webpack加载就打开一个新的浏览器页面
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
// UglifyJs Plugin 压缩文件
var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {
  // 单入口文件
  //entry: './src/main1.js',

  // 多入口文件
  // entry: {
  //   bundle1: './src/main1.js',
  //   bundle2: './src/main2.js'
  // },

  /*
  React文件打包(.jsx文件)
  npm install react --save-dev
  npm install react-dom --save-dev
  需要使用babel-loader
  */
  // entry: {
  //   react: './src/react.jsx'
  // },

  /*
  CSS Module解析：css-loader?modules参数就启用了CSS Module
  此时，通过js文件引入的css文件就是局部css---也就是CSSModule.jsx文件中引入的CSSModule.css就是局部作用域
  使用:global(类名)，就可以将选择器转换成为全局样式
  --对于本例来说：最后第二个h1为红色，两个h2都是蓝色
  */
  // entry: {
  //   cssmodule: './src/CSSModule.jsx'
  // },

  // CommonsChunkPlugin提取公共内容为单独的文件
  entry: {
    commonsChunk1: './src/CommonChunk1.jsx',
    commonsChunk2: './src/CommonChunk2.jsx',
    commonsChunk3: './src/CommonChunk3.js',
    vendor: 'moment'
  },

  output: {
    path: path.resolve(__dirname+'/dist'),
    filename:'js/[name].bundle.js'
  },
  module: {
    rules: [{ // 使用babel-loader将ES6/JSX代码转换为适用于所有浏览器的代码格式
        test: /\.js[x]?$/,
        // exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          // 当文件是.jsx时，需要npm install babel-preset-es2015 --save-dev，npm install babel-preset-react --save-dev
          presets: ['es2015','react']
        }
    }, {
        test: /\.html$/,
        loader: 'html-loader'
    }, { // css文件加载器,css-loader先读取css文件，然后使用style-loader将<style>标签插入到html文档中
        test: /\.css$/,
        loader: "style-loader!css-loader?modules"
    }, {
        test: /\.sass$/,
        use: [{
            loader: 'style-loader'
        }, {
            loader: 'css-loader'
        }, {
            loader: 'postcss-loader'
        }, {
            loader: 'sass-loader'
        }]
    }, { //img-loader,url-loader,file-loader加载图片文件
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
            // 当图片大小小于limit时，返回一个DataUrl;当图片大小大于limit时，转为使用file-loader;
            // 小图片最终变成<img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOT...=">
            // 大图片最终变成<img src="assets/frontend.fa388ca-e532e9b169a3c3c0fb0945e60c4786d0.png">
            'url-loader?limit=2000&name=assets/[name]-[hash].[ext]',
            'img-loader'
        ]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({ // title--新文件的名称，template--新文件的模版，inject--js文件注入body里
      title: '单入口文件',
      template: 'index.html',
      inject: 'body'
    }),
    // new uglifyJsPlugin({ // 压缩生成的js文件
    //   compress: {
    //     warnings: false
    //   }
    // }),
    new OpenBrowserPlugin({ // 每次webpack加载完成就开启一个新的页面
      url: 'http://localhost:8080',
      delay: 1000,
      browser: 'Chrome',
      ignoreErrors: false
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor','manifest']
    }) // 提取公共内容为单独文件，并自动将文件引入在入口文件的前面
  ]
}

