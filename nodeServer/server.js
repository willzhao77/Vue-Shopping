// 根据请求路径，相应不同内容（现有HTML文件）

// 1. 加载 http 模块
var http = require('http')

var fs = require('fs')

var path = require('path')



var lunbo = {"status":0,"message":[{"id":1,"url":"http://www.itcast.cn/subject/phoneweb/index.html","img":"http://www.itcast.cn/subject/webzly/images/1.jpg"},{"id":2,"url":"http://www.itcast.cn/subject/phoneweb/index.html","img":"http://www.itcast.cn/subject/webzly/images/1.2.jpg"},{"id":3,"url":"http://www.itcast.cn/subject/phoneweb/index.html","img":"http://www.itcast.cn/images/newslide/homepageandphone/20185609105606277.jpg"}]}

var newsList = {"status":0,"message":[{"id":13,"title":"1季度多家房企利润跌幅超50% 去库存促销战打响","add_time":"2015-04-16T03:50:28.000Z","zhaiyao":"房企一季度销售业绩已经陆续公布，克而瑞研究中心统计","click":1,"img_url":"http://demo.dtcms.net/upload/201504/16/201504161149414479.jpg"},{"id":14,"title":"买房还是炒股，2015年买房无法拒绝的5大理由","add_time":"2015-04-16T04:05:34.000Z","zhaiyao":"转眼间2015年已经过去了4个月，在这短短的四个月","click":2,"img_url":"http://demo.dtcms.net/upload/201504/16/201504161205596364.jpg"},{"id":15,"title":"抢先实拍猎豹CS10 霸气时尚2.0T涡轮增压","add_time":"2016-12-07T08:49:04.000Z","zhaiyao":"在SUV当道的天下，许多自主品牌相继推出了旗下多款","click":1,"img_url":"http://demo.dtcms.net/upload/201504/16/201504161218505373.jpg"},{"id":16,"title":"长城汽车不走高端很快就会死 哈弗H8卷土重来","add_time":"2015-04-16T04:29:51.000Z","zhaiyao":"&amp;emsp;&amp;emsp;一辆豪华日","click":0,"img_url":"http://demo.dtcms.net/upload/201504/16/201504161229442885.jpg"},{"id":19,"title":"三星S6造价更高 卖得却比iPhone 6便宜","add_time":"2015-04-16T04:46:22.000Z","zhaiyao":"根据调研公司IHS的拆机分析，三星最新推出的旗舰智","click":0,"img_url":"http://demo.dtcms.net/upload/201504/16/201504161246140423.jpg"},{"id":20,"title":"乐视手机遭疯狂吐槽 忽不忽悠看了再说","add_time":"2015-04-16T04:54:36.000Z","zhaiyao":"昨天，乐视发布了3款手机，乐1、乐1Pro和乐Ma","click":0,"img_url":"http://demo.dtcms.net/upload/201504/16/201504161254335201.jpg"},{"id":21,"title":"假宽带频现 什么是真正的光纤宽带？","add_time":"2015-04-16T04:59:15.000Z","zhaiyao":"&amp;emsp;&amp;emsp;OFwee","click":0,"img_url":"http://demo.dtcms.net/upload/201504/16/201504161258558786.jpg"},{"id":22,"title":"58同城与赶集网最快今日将宣布合并","add_time":"2015-04-16T05:02:30.000Z","zhaiyao":"北京时间4月16日消息，腾讯科技通过可靠渠道获知，","click":0,"img_url":"http://demo.dtcms.net/upload/201504/16/201504161303162262.jpg"},{"id":23,"title":"电商下乡，京东、苏宁、阿里农村遭遇战打响？","add_time":"2015-04-16T05:29:20.000Z","zhaiyao":"2015年，各大电商逐鹿广袤的农村市场，一场圈地运","click":0,"img_url":"http://demo.dtcms.net/upload/201504/16/201504161329185965.jpg"},{"id":24,"title":"易车总裁邵京宁：汽车行业电商化的三个阶段","add_time":"2015-04-16T05:37:50.000Z","zhaiyao":"易车总裁邵京宁在艾瑞年度高峰会议上表示，汽车行业作","click":0,"img_url":"http://demo.dtcms.net/upload/201504/16/201504161336598829.jpg"}]}


var news13 = {"status":0,"message":[{"id":13,"title":"1季度多家房企利润跌幅超50% 去库存促销战打响","click":1,"add_time":"2015-04-16T03:50:28.000Z","content":"<p>\r\n\t房企一季度销售业绩已经陆续公布，克而瑞研究中心统计数据显示，今年一季度，TOP20的房企仅6家实现业绩同比增长。\r\n</p>\r\n<p>\r\n\t<b>多家企业销售下滑</b> \r\n</p>\r\n<p>\r\n\t记者了解到，虽然恒大、融创一季度交出了不错的答卷，但是，万科等排名靠前的房企均出现销售下滑。其中万科公布前三个月销售金额为460.6亿元，同比去年的542.3亿元减少15%，而碧桂园公布，截至2015年3月31日止三个月，集团共实现合同销售金额约177.3亿元，同比下跌44.32%。\r\n</p>\r\n<p>\r\n\t<b>此外，一季度多家企业的利润跌幅超过50%。数据显示，万科预计2015年1月至3月归属于上市公司股东的净利润为6亿~7亿元，比上年同期下降54%至61%。</b> \r\n</p>\r\n<p>\r\n\t<b>趋势</b> \r\n</p>\r\n<p>\r\n\t<b>地价占比上升及去库存压力下&nbsp;房企利润回归</b> \r\n</p>\r\n<p>\r\n\t中原地产首席分析师张大伟称，一季度房企销售及利润普遍下滑，主要是因为企业销售节奏的变化，“大部分企业在2013年完成情况非常好，预留了大量签约结转到2014年。但2014年整体企业完成情况较差，大部分企业反而透支了2015年年初的签约，导致2015年签约不尽如人意。”\r\n</p>\r\n<p>\r\n\t同时，张大伟表示，大多数城市住房供大于求，价格过高，未来增值不确定，已经不再是最佳投资选择，因此房地产投资需求也出现显著回落。\r\n</p>\r\n<p>\r\n\t而易居房地产研究院研究员严跃进则表示，一季度部分房企还是坚持降价促销的策略，对此出现利润下滑也是符合预期的。随着地价占房价比例越来越高，开发商利润空间不断被挤压。同时，很多房企目前的营销费用还是比较大的，也会损耗房企利润。\r\n</p>\r\n<p>\r\n\t此外，严跃进说，从长期看，地价占比上升与去库存压力将成为长期趋势，房企已告别高利润时代，回归正常利润成为趋势。\r\n</p>\r\n<p>\r\n\t不过，张大伟认为，3月下半月市场告别签约淡季。部分城市出现小阳春现象，预计整体市场的走势将会继续向好，后续改善型需求的入市量将会有所增加。\r\n</p>\r\n<p>\r\n\t<b>分析：</b> \r\n</p>\r\n<p>\r\n\t<b>房企打响去库存促销战</b> \r\n</p>\r\n<p>\r\n\t“对于房地产市场来说，出现退房的原因有两种：1.收房的时候质量差。2.房价下调。无理由退房对于中国90%成交是期房的房地产市场现状来说，这的确是解决了购房者对房屋质量的担忧。”中原地产首席分析师张大伟对记者表示，后续预计也会有更多企业学习借鉴。\r\n</p>\r\n<p>\r\n\t而亚太城市房地产研究院院长谢逸枫则表示，恒大2015年率先打出全国项目“无理由退房”计划第一枪，意味正式打响房企主动去库存的促销战。\r\n</p>\r\n<p>\r\n\t“承诺无理由退房，意味着开发商承担更多的风险，在资金方面承受更大压力，后续肯定会有企业跟风。”知名地产评论人赵卓文表示。\r\n</p>\r\n<p>\r\n\t因此，有业内人士认为，无理由退房可能加速市场优胜劣汰。夏海钧回应称，中国房地产市场高峰时有五六万家房地产开发企业，现在还有两三万家。市场竞争、行业洗牌再洗掉两万多家，剩几百几千家很正常，“到那时行业整体素质会更高”。\r\n</p>\r\n<p>\r\n\t“在目前这个市场周期，恒大提出无理由退房，也的确更多是为了去库存营销的努力，从营销上看，对增加成交量肯定有帮助。”张大伟表示。\r\n</p>\r\n<p>\r\n\t“常规的降价促销已经无法触及购房者的神经，房企必须使出浑身解数吸引购房者。另一方面是购房者对价格敏感性在减弱，对降价没有之前那么敏感，购房者普遍存在买涨不买跌，无理由退房主要是打消购房者对房价不断下降的顾虑。目的在于制造市场 上涨 预期，引导购房者对后市乐观的态度。”谢逸枫认为。\r\n</p>\r\n<p>\r\n\t也有部分业内人士对“无理由退房”的操作性心存疑虑。\r\n</p>\r\n<p>\r\n\t<b>相关新闻</b> \r\n</p>\r\n<p>\r\n\t<b>恒大宣布全国范围内无理由退房</b> \r\n</p>\r\n<p>\r\n\t恒大地产集团昨日宣布，自今日起，将在全国所有楼盘住宅实施无理由退房，该措施覆盖全国147个城市的305个楼盘。恒大副总裁夏海钧表示，希望住宅“包退”成为市场新常态。\r\n</p>\r\n<p>\r\n\t<b>今日起买恒大房“包退货”</b> \r\n</p>\r\n<p>\r\n\t昨日下午，恒大宣布，全国所有楼盘住宅从4月16日8时起正式实施无理由退房，覆盖恒大所有在售住宅，遍布全国147个城市的305个楼盘。\r\n</p>\r\n<p>\r\n\t恒大集团承诺：凡购买恒大所有楼盘住宅的客户，若已履行《楼宇认购书》、《商品房买卖合同》的各项义务，并且无任何违约行为，则自签署《商品房买卖合同》及《无理由退房协议书》之日起至办理入住手续前的任何时间内，均可无理由退房。\r\n</p>\r\n<p>\r\n\t最新数据显示，2015年1~3月，恒大累计合约销售金额约305.4亿元，其中3月实现合约销售额137.1亿元，&nbsp;恒大地产2014年全年销售额达1315亿元，2015年销售目标定为1500亿元，较2014年目标增36.4%\r\n</p>"}]}

var news14 = {"status":0,"message":[{"id":14,"title":"买房还是炒股，2015年买房无法拒绝的5大理由","click":2,"add_time":"2015-04-16T04:05:34.000Z","content":"<p>\r\n\t时间稍纵即逝，转眼间2015年已经过去了4个月，在这短短的四个月，股市攀升到了4000点， 这让很多原本对股市不抱期望的人再度春心萌动。同样，在这个四个月的时间里，楼市经历了死而复活聚变，一浪高过一浪的救市政策把楼市推到风口浪尖至少，房价涨声再起。\r\n</p>\r\n<p>\r\n\t<br />\r\n于是关于买房还是炒股的话题再次老生常谈。炒股好还是买房好，当一路高歌猛进的股市遇到大手笔的楼市新政，人们如何在炒股与买房之间做出选择，似乎更加困难。\r\n</p>\r\n<p>\r\n\t<br />\r\n为此，湘潭365房产网购房专家表示，炒股更多是投机，而非投资，也就是趁着股市大涨行情， 捞一把；而买房，更多是一种需求或者长期投资。因此，如果你没有足够的资金，那么弃股买房是最佳选择，但是如果你不缺钱，但同时又有买房需求，那么先炒股，后买房，但宗旨是见好就收。\r\n</p>\r\n<p>\r\n\t<br />\r\n需要声明的是，即便是楼市整体复苏，好的房子仍然需要购房者精挑细选，即使在亢奋的牛市行情中，满仓踏空者也不在少数，因此，无论是买房还是炒股，都应该把握规律，不能因为盲目跟风，失去了理性的判断力。\r\n</p>\r\n<p>\r\n\t<br />\r\n说了这么多，湘潭365房产网购房专家还是认为，买房比炒股更有利，尤其是在当前政策如此宽松，房贷如此优惠的前期下，更是绝佳的买房时机，以下编辑整理出的2015年买房无法拒绝的5大理由，供您参考。\r\n</p>\r\n<p>\r\n\t<br />\r\n<strong>1，楼市政策宽松 </strong> \r\n</p>\r\n<p>\r\n\t<br />\r\n首套房“认贷不认房”，二套房首付降低4成，央行两次降息，9折房贷利率、二手房交易营业税5调2，首套房住房公积金贷款首付最低2成、二套房3成....等等楼市政策是自2008年之后最宽松时期。\r\n</p>\r\n<p>\r\n\t<br />\r\n对于购房者来说，不仅降低了买房门槛，更节约的买房成本，此时买房无疑是一举两得。\r\n</p>\r\n<p>\r\n\t<br />\r\n<strong>2，房子是固定资产</strong> \r\n</p>\r\n<p>\r\n\t<br />\r\n买房相对于炒股，更具抗风险。尽管短期内炒股可能小赚一笔，但是股市风云难测，跌的时候是不见谷底；但是，买房则不同，不管房价如何变动，房子始终是你的，你想住就住，想出租就出租，你拥有足够的话语权，不至于像买股票那样提心吊胆\r\n</p>\r\n<p>\r\n\t<br />\r\n<strong>3，买房会强迫储蓄 </strong> \r\n</p>\r\n<p>\r\n\t<br />\r\n买房最大的好处就是让不懂理财或者月光族变成理财高手。如果你能以每个月2000的价格租一套公寓，而不是月供2400元买一套，租房或许有点意义。但你会省下这400元以备未来之需吗？很多人都不会。我敢说大多数人都不会。在这里你又必须自己盘算了，不过你的贷款月供中偿还本金的部分不能算是成本。其实你的钱是给自己的，因为你积累了资产。作为一种强制性的每月储蓄，这是种很好的自律。\r\n</p>\r\n<p>\r\n\t<br />\r\n<strong>4，选择余地很大 </strong> \r\n</p>\r\n<p>\r\n\t<br />\r\n近五年房地产市场的快速发展，导致楼市严重供过于求，尤其是经历了2014年楼市的“调整”之后，当前全国大多数地方都有充足的房源。\r\n</p>\r\n<p>\r\n\t<br />\r\n&nbsp;以湘潭为例，尽管年销售只有200万平米左右，但是当前库存已经超过450万平米，这相当于2年半的销售量。而且随着此次二手房交易政策放宽，还有更多的存量房不断进入市场。这种情况意味着选择多多，而且价格实惠。\r\n</p>\r\n<p>\r\n\t<br />\r\n<strong>5，房价反弹只是时间问题 </strong> \r\n</p>\r\n<p>\r\n\t<br />\r\n房价还会下跌吗？当然会，你永远都抄不到底，但这长期来看并不重要。以目前的楼市政策以及市场环境，房价反弹只是时间问题，更何况每天都有如此之多的市民加入买房一族，楼市回暖迫在眉睫。\r\n</p>\r\n<p>\r\n\t<br />\r\n结语：对于购房者来场，抄底是个梦，但是不买房永远抄不到底。在众多利好的政策和价格优势下，2015年买房应该是不错的选择。\r\n</p>"}]}

var news15 = {"status":0,"message":[{"id":15,"title":"抢先实拍猎豹CS10 霸气时尚2.0T涡轮增压","click":1,"add_time":"2016-12-07T08:49:04.000Z","content":"\"<p>\r\n 在SUV当道的天下，许多自主品牌相继推出了旗下多款SUV，想要在这个大市场划分一块田地。此次，作为多年生产硬派越野车的汽车企业猎豹汽车也紧随其后，即将推出量产SUV-猎豹CS10，这一越野车型会不会在市场上掀起波澜？又是否能真正帮助猎豹品牌在市场重塑地位？这一切我们不得而知，只能静静等待上海车展之后它的表现。无论怎样，先来看看这次小编抢先实拍到的量产猎豹CS10吧。\r\n</p>\r\n<p align=\"\"center\"\">\r\n <img class=\"\"imgborder\"\" alt=\"\"\"\" src=\"http://ofv795nmp.bkt.clouddn.com//upload/201504/16/201504161218547905.jpg\" border=\"\"1\"\" /> \r\n</p>\r\n<p>\r\n <strong>&nbsp;&gt;&gt;&gt;外观实拍：</strong> \r\n</p>\r\n<p>\r\n 外观方面，猎豹CS10采用了最新的家族式前脸设计，中网进气格栅采用蜂窝状设计，前大灯组内还配备了LED日间行车灯。此外，前保险杠下方的进气口大嘴式的造型凸显凶猛。\r\n</p>\r\n<p align=\"\"center\"\">\r\n <img class=\"\"imgborder\"\" alt=\"\"\"\" src=\"http://ofv795nmp.bkt.clouddn.com//upload/201504/16/201504161218550401.jpg\" border=\"\"1\"\" /> \r\n</p>\r\n<p align=\"\"center\"\">\r\n <img class=\"\"imgborder\"\" alt=\"\"\"\" src=\"http://ofv795nmp.bkt.clouddn.com//upload/201504/16/201504161218551181.jpg\" border=\"\"1\"\" /> \r\n</p>\r\n<p align=\"\"center\"\">\r\n <img class=\"\"imgborder\"\" alt=\"\"\"\" src=\"http://ofv795nmp.bkt.clouddn.com//upload/201504/16/201504161218551649.jpg\" border=\"\"1\"\" /> \r\n</p>\r\n<p align=\"\"center\"\">\r\n <img class=\"\"imgborder\"\" alt=\"\"\"\" src=\"http://ofv795nmp.bkt.clouddn.com//upload/201504/16/201504161218552117.jpg\" border=\"\"1\"\" /> \r\n</p>\r\n<p align=\"\"center\"\">\r\n <img class=\"\"imgborder\"\" alt=\"\"\"\" src=\"http://ofv795nmp.bkt.clouddn.com//upload/201504/16/201504161218552585.jpg\" border=\"\"1\"\" /> \r\n</p>\r\n<p align=\"\"center\"\">\r\n <img class=\"\"imgborder\"\" alt=\"\"\"\" src=\"http://ofv795nmp.bkt.clouddn.com//upload/201504/16/201504161218553053.jpg\" border=\"\"1\"\" /> \r\n</p>\r\n<p align=\"\"center\"\">\r\n <img class=\"\"imgborder\"\" alt=\"\"\"\" src=\"http://ofv795nmp.bkt.clouddn.com//upload/201504/16/201504161218553521.jpg\" border=\"\"1\"\" /> \r\n</p>\r\n<p align=\"\"center\"\">\r\n <img class=\"\"imgborder\"\" alt=\"\"\"\" src=\"http://ofv795nmp.bkt.clouddn.com//upload/201504/16/201504161218553989.jpg\" border=\"\"1\"\" /> \r\n</p>\r\n<p align=\"\"center\"\">\r\n <img class=\"\"imgborder\"\" alt=\"\"\"\" src=\"http://ofv795nmp.bkt.clouddn.com//upload/201504/16/201504161218554457.jpg\" border=\"\"1\"\" /> \r\n</p>\r\n<p>\r\n <strong>&gt;&gt;&gt;外观小结：</strong> \r\n</p>\r\n<p>\r\n 此次猎豹一改此之前车型硬朗的设计风格，开始主打家用与时尚牌，第一眼见到猎豹CS10时，你或许会觉得这是一款合资品牌SUV车型，整体的外观设计非常成功。从猎豹汽车对于该车外观下的功夫，我们可以给点个赞。\r\n</p>\""}]}


var comment13 = {"status":0,"message":[{"user_name":"匿名用户","add_time":"2020-01-11T09:06:16.000Z","content":"123"},{"user_name":"匿名用户","add_time":"2020-01-11T09:05:35.000Z","content":"2123"},{"user_name":"匿名用户","add_time":"2020-01-11T08:47:50.000Z","content":"44"},{"user_name":"匿名用户","add_time":"2020-01-11T08:47:47.000Z","content":"333"},{"user_name":"匿名用户","add_time":"2020-01-11T08:47:44.000Z","content":"222"},{"user_name":"匿名用户","add_time":"2020-01-11T08:47:42.000Z","content":"11111"},{"user_name":"匿名用户","add_time":"2020-01-11T08:19:34.000Z","content":"一剑曾当百万师"},{"user_name":"匿名用户","add_time":"2020-01-11T07:55:56.000Z","content":"撒擦服务"},{"user_name":"匿名用户","add_time":"2020-01-11T07:54:35.000Z","content":"法则发"},{"user_name":"匿名用户","add_time":"2020-01-11T07:53:01.000Z","content":"1"}]}

var comment13_2 = {"status":0,"message":[{"user_name":"匿名用户","add_time":"2020-01-11T07:38:41.000Z","content":"12233"},{"user_name":"匿名用户","add_time":"2020-01-11T07:38:21.000Z","content":"哈哈"},{"user_name":"匿名用户","add_time":"2020-01-11T07:37:51.000Z","content":"哈哈"},{"user_name":"匿名用户","add_time":"2020-01-11T07:36:23.000Z","content":"滚"},{"user_name":"匿名用户","add_time":"2020-01-11T07:30:09.000Z","content":"测试测试"},{"user_name":"匿名用户","add_time":"2020-01-11T07:28:47.000Z","content":"aaa"},{"user_name":"匿名用户","add_time":"2020-01-11T07:28:43.000Z","content":"是"},{"user_name":"匿名用户","add_time":"2020-01-11T07:28:27.000Z","content":"我"},{"user_name":"匿名用户","add_time":"2020-01-11T07:17:49.000Z","content":"25678"},{"user_name":"匿名用户","add_time":"2020-01-11T07:16:51.000Z","content":"2333"}]}







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

  if(req.url === '/getnews/13'){
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080"); // 设置可访问的源
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify(news13))
  }

  if(req.url === '/getnews/14'){
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080"); // 设置可访问的源
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify(news14))
  }

  if(req.url === '/getnews/15'){
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080"); // 设置可访问的源
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify(news15))
  }

  if(req.url === '/api/getcomments/13?pageindex=1'){
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080"); // 设置可访问的源
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify(comment13))
  }
  if(req.url === '/api/getcomments/13?pageindex=2'){
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080"); // 设置可访问的源
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify(comment13_2))
  }



}).listen(3000, function(){
  console.log('please visit http://localhost:3000')
})
