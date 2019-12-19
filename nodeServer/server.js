// 根据请求路径，相应不同内容（现有HTML文件）

// 1. 加载 http 模块
var http = require('http')

var fs = require('fs')

var path = require('path')



var lunbo = {"status":0,"message":[{"id":1,"url":"http://www.itcast.cn/subject/phoneweb/index.html","img":"http://www.itcast.cn/subject/webzly/images/1.jpg"},{"id":2,"url":"http://www.itcast.cn/subject/phoneweb/index.html","img":"http://www.itcast.cn/subject/webzly/images/1.2.jpg"},{"id":3,"url":"http://www.itcast.cn/subject/phoneweb/index.html","img":"http://www.itcast.cn/images/newslide/homepageandphone/20185609105606277.jpg"}]}




//2. 创建一个 http 服务对象
var server = http.createServer(function(req, res){

  if(req.url === '/lunbo' || req.url === '/index'){
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080"); // 设置可访问的源
    res.end(JSON.stringify(lunbo))

  }





}).listen(3000, function(){
  console.log('please visit http://localhost:3000')
})
