// 根据请求路径，相应不同内容（现有HTML文件）

// 1. 加载 http 模块
var http = require('http')

var fs = require('fs')

var path = require('path')



var lunbo = {"status":0,"message":[{"id":1,"url":"http://www.itcast.cn/subject/phoneweb/index.html","img":"http://www.itcast.cn/subject/webzly/images/1.jpg"},{"id":2,"url":"http://www.itcast.cn/subject/phoneweb/index.html","img":"http://www.itcast.cn/subject/webzly/images/1.2.jpg"},{"id":3,"url":"http://www.itcast.cn/subject/phoneweb/index.html","img":"http://www.itcast.cn/images/newslide/homepageandphone/20185609105606277.jpg"}]}

var newsList = {"status":0,"message":[{"id":13,"title":"1季度多家房企利润跌幅超50% 去库存促销战打响","add_time":"2015-04-16T03:50:28.000Z","zhaiyao":"房企一季度销售业绩已经陆续公布，克而瑞研究中心统计","click":1,"img_url":"http://demo.dtcms.net/upload/201504/16/201504161149414479.jpg"},{"id":14,"title":"买房还是炒股，2015年买房无法拒绝的5大理由","add_time":"2015-04-16T04:05:34.000Z","zhaiyao":"转眼间2015年已经过去了4个月，在这短短的四个月","click":2,"img_url":"http://demo.dtcms.net/upload/201504/16/201504161205596364.jpg"},{"id":15,"title":"抢先实拍猎豹CS10 霸气时尚2.0T涡轮增压","add_time":"2016-12-07T08:49:04.000Z","zhaiyao":"在SUV当道的天下，许多自主品牌相继推出了旗下多款","click":1,"img_url":"http://demo.dtcms.net/upload/201504/16/201504161218505373.jpg"},{"id":16,"title":"长城汽车不走高端很快就会死 哈弗H8卷土重来","add_time":"2015-04-16T04:29:51.000Z","zhaiyao":"&amp;emsp;&amp;emsp;一辆豪华日","click":0,"img_url":"http://demo.dtcms.net/upload/201504/16/201504161229442885.jpg"},{"id":19,"title":"三星S6造价更高 卖得却比iPhone 6便宜","add_time":"2015-04-16T04:46:22.000Z","zhaiyao":"根据调研公司IHS的拆机分析，三星最新推出的旗舰智","click":0,"img_url":"http://demo.dtcms.net/upload/201504/16/201504161246140423.jpg"},{"id":20,"title":"乐视手机遭疯狂吐槽 忽不忽悠看了再说","add_time":"2015-04-16T04:54:36.000Z","zhaiyao":"昨天，乐视发布了3款手机，乐1、乐1Pro和乐Ma","click":0,"img_url":"http://demo.dtcms.net/upload/201504/16/201504161254335201.jpg"},{"id":21,"title":"假宽带频现 什么是真正的光纤宽带？","add_time":"2015-04-16T04:59:15.000Z","zhaiyao":"&amp;emsp;&amp;emsp;OFwee","click":0,"img_url":"http://demo.dtcms.net/upload/201504/16/201504161258558786.jpg"},{"id":22,"title":"58同城与赶集网最快今日将宣布合并","add_time":"2015-04-16T05:02:30.000Z","zhaiyao":"北京时间4月16日消息，腾讯科技通过可靠渠道获知，","click":0,"img_url":"http://demo.dtcms.net/upload/201504/16/201504161303162262.jpg"},{"id":23,"title":"电商下乡，京东、苏宁、阿里农村遭遇战打响？","add_time":"2015-04-16T05:29:20.000Z","zhaiyao":"2015年，各大电商逐鹿广袤的农村市场，一场圈地运","click":0,"img_url":"http://demo.dtcms.net/upload/201504/16/201504161329185965.jpg"},{"id":24,"title":"易车总裁邵京宁：汽车行业电商化的三个阶段","add_time":"2015-04-16T05:37:50.000Z","zhaiyao":"易车总裁邵京宁在艾瑞年度高峰会议上表示，汽车行业作","click":0,"img_url":"http://demo.dtcms.net/upload/201504/16/201504161336598829.jpg"}]}




//2. 创建一个 http 服务对象
var server = http.createServer(function(req, res){

  if(req.url === '/lunbo' || req.url === '/index'){
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080"); // 设置可访问的源
    res.end(JSON.stringify(lunbo))

  }

  if(req.url === '/getnewslist'){
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080"); // 设置可访问的源
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify(newsList))

  }




}).listen(3000, function(){
  console.log('please visit http://localhost:3000')
})
