// 由于 webpack 是基于Node进行构建的，所有，webpack的配置文件中，任何合法的Node代码都是支持的
const path = require('path')

// 在内存中，根据指定的模板页面，生成一份内存中的首页，同时自动把打包好的bundle注入到页面底部
// 如果要配置插件，需要在导出的对象中，挂载一个 plugins 节点
const htmlWebpackPlugin = require('html-webpack-plugin')


const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    plugins: [
        new VueLoaderPlugin(),
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'), //制定模板文件路径
            filename: 'index.html'   //指定生成页面的名称
        })
    ],
    module:{
        rules:[
            {test: /\.css$/, use:['style-loader', 'css-loader']}, //配置.css文件的第三方loader规则
            {test:/\.js$/, use: 'babel-loader', exclude:/node_modules/ }, // 配置 Babel 来转换高级的ES语法
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }, // 处理 scss 文件的 loader
            { test: /\.vue$/, use: 'vue-loader'},
            { test: /\.jpg|png|gif|bmp$/, use: 'url-loader?limit=7631&name=[hash:8]-[name].[ext]' }, // 配置 处理 样式表中图片的 loader规则
            
        ]
    }
}