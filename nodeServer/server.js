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

var comment87 ={"status":0,"message":[{"user_name":"匿名用户","add_time":"2020-01-11T09:05:35.000Z","content":"87 87 87"},{"user_name":"匿名用户","add_time":"2020-01-11T08:47:50.000Z","content":"44"},{"user_name":"匿名用户","add_time":"2020-01-11T08:47:47.000Z","content":"333"},{"user_name":"匿名用户","add_time":"2020-01-11T08:47:44.000Z","content":"222"},{"user_name":"匿名用户","add_time":"2020-01-11T08:47:42.000Z","content":"11111"},{"user_name":"匿名用户","add_time":"2020-01-11T08:19:34.000Z","content":"一剑曾当百万师"}]}

var comment88 ={"status":0,"message":[{"user_name":"匿名用户","add_time":"2020-01-11T09:05:35.000Z","content":"88 88 88"},{"user_name":"匿名用户","add_time":"2020-01-11T08:47:50.000Z","content":"44"},{"user_name":"匿名用户","add_time":"2020-01-11T08:47:47.000Z","content":"333"},{"user_name":"匿名用户","add_time":"2020-01-11T08:47:44.000Z","content":"222"},{"user_name":"匿名用户","add_time":"2020-01-11T08:47:42.000Z","content":"11111"},{"user_name":"匿名用户","add_time":"2020-01-11T08:19:34.000Z","content":"一剑曾当百万师"}]}

var comment89 ={"status":0,"message":[{"user_name":"匿名用户","add_time":"2020-01-11T09:05:35.000Z","content":"89 89 89"},{"user_name":"匿名用户","add_time":"2020-01-11T08:47:50.000Z","content":"44"},{"user_name":"匿名用户","add_time":"2020-01-11T08:47:47.000Z","content":"333"},{"user_name":"匿名用户","add_time":"2020-01-11T08:47:44.000Z","content":"222"},{"user_name":"匿名用户","add_time":"2020-01-11T08:47:42.000Z","content":"11111"},{"user_name":"匿名用户","add_time":"2020-01-11T08:19:34.000Z","content":"一剑曾当百万师"}]}








var imgcategory = {"status":0,"message":[{"title":"家居生活","id":14},{"title":"摄影设计","id":15},{"title":"明星美女","id":16},{"title":"空间设计","id":17},{"title":"户型装饰","id":18},{"title":"广告摄影","id":19},{"title":"摄影学习","id":20},{"title":"摄影器材","id":21},{"title":"明星写真","id":22},{"title":"清纯甜美","id":23},{"title":"古典美女","id":24}]}


var photolist0 = ﻿{"status":0,"message":[{"id":37,"channel_id":9,"category_id":17,"call_index":"","title":"现代简约 明亮的外表卧室卧室背景墙、吊顶黄色","link_url":"","img_url":"http://demo.dtcms.net/upload/201504/18/thumb_201504181230434303.jpg","seo_title":"现代简约 明亮的外表卧室卧室背景墙、吊顶黄色","seo_keywords":"现代简约,卧室卧室背景墙,吊顶黄色","seo_description":"不要简朴不要素雅洋气卧室我做主，高低床榻榻米式靓丽卧室装扮，现代油画壁画帆布画卧室餐厅仟象映画，现代中式卧室装修图欣赏，温馨浪漫，而且很时尚的卧室设计，欧式卧室飘窗装修效果图。","tags":"卧室","zhaiyao":"不要简朴不要素雅洋气卧室我做主，高低床榻榻米式靓丽卧室装扮，现代油画壁画帆布画卧室餐厅仟象映画，现代中式卧室装修图欣赏，温馨浪漫，而且很时尚的卧室设计，欧式卧室飘窗装修效果图。","content":"不要简朴不要素雅洋气卧室我做主，高低床榻榻米式靓丽卧室装扮，现代油画壁画帆布画卧室餐厅仟象映画，现代中式卧室装修图欣赏，温馨浪漫，而且很时尚的卧室设计<span id=\"__kindeditor_bookmark_start_8__\">，欧式卧室飘窗装修效果图。</span>","sort_id":99,"click":0,"status":0,"is_msg":1,"is_top":0,"is_red":1,"is_hot":0,"is_slide":0,"is_sys":1,"user_name":"admin","add_time":"2015-04-18T04:30:50.000Z","update_time":"2016-12-06T09:04:16.000Z"},{"id":38,"channel_id":9,"category_id":17,"call_index":"","title":"很美的落地大书柜 可以放超多的图书的吧","link_url":"","img_url":"http://demo.dtcms.net/upload/201504/18/thumb_201504181237019134.jpg","seo_title":"很美的落地大书柜 可以放超多的图书的吧","seo_keywords":"书柜,图书的吧,转角书柜,书桌，双层书柜,组合书柜,儿童书柜。","seo_description":"很美的落地大书柜 可以放超多的图书的吧，转角的书柜以及书桌，这里可以收纳超多的东西，书柜,书桌这些是\"七彩人生\"品，双层书柜组合书柜儿童书柜。","tags":"书柜","zhaiyao":"很美的落地大书柜 可以放超多的图书的吧，转角的书柜以及书桌，这里可以收纳超多的东西，书柜,书桌这些是&quot;七彩人生&quot;品，双层书柜组合书柜儿童书柜。","content":"很美的落地大书柜 可以放超多的图书的吧，转角的书柜以及书桌，这里可以收纳超多的东西，书柜,书桌这些是\"七彩人生\"品，双层书柜组合书柜儿童书柜。","sort_id":99,"click":0,"status":0,"is_msg":1,"is_top":0,"is_red":1,"is_hot":0,"is_slide":0,"is_sys":1,"user_name":"admin","add_time":"2015-04-18T04:37:19.000Z","update_time":"2016-12-06T09:04:16.000Z"},{"id":39,"channel_id":9,"category_id":17,"call_index":"","title":"西班牙阿拉尔孔郊区的80平米一室一厅的公寓","link_url":"","img_url":"http://demo.dtcms.net/upload/201504/18/thumb_201504181241259978.jpg","seo_title":"西班牙阿拉尔孔郊区的80平米一室一厅的公寓","seo_keywords":"西班牙阿拉尔孔郊区的80平米一室一厅的公寓","seo_description":"这是一套在西班牙阿拉尔孔郊区的80平米一室一厅的公寓，用一道墙分隔出了客厅与厨房，虽然整体来看室内设计有些混搭风，但似乎某些空间和角度去看又会有着自己的主题。","tags":"","zhaiyao":"这是一套在西班牙阿拉尔孔郊区的80平米一室一厅的公寓，用一道墙分隔出了客厅与厨房，虽然整体来看室内设计有些混搭风，但似乎某些空间和角度去看又会有着自己的主题。","content":"这是一套在西班牙阿拉尔孔郊区的80平米一室一厅的公寓，用一道墙分隔出了客厅与厨房，虽然整体来看室内设计有些混搭风，但似乎某些空间和角度去看又会有着自己的主题。","sort_id":99,"click":0,"status":0,"is_msg":1,"is_top":0,"is_red":1,"is_hot":0,"is_slide":0,"is_sys":1,"user_name":"admin","add_time":"2015-04-18T04:41:37.000Z","update_time":"2016-12-06T09:04:16.000Z"},{"id":40,"channel_id":9,"category_id":18,"call_index":"","title":"欧式风格继承了巴洛克风格中豪华、动感、多变的视觉效果","link_url":"","img_url":"http://demo.dtcms.net/upload/201504/18/thumb_201504181246376332.jpg","seo_title":"欧式风格继承了巴洛克风格中豪华、动感、多变的视觉效果","seo_keywords":"欧式风格,豪华,动感,多变,视觉效果","seo_description":"继上编欧式客厅装修效果图之后，今天，小编为大家带来的是一组不同类型的欧式卧室装修效果图。欧式卧室的设计风格按不同的地域文化可分为北欧卧室、简欧卧室和传统欧式卧室。在中国，因为欧式风格继承了巴洛克风格中豪华、动感、多变的视觉效果，也吸取了洛可可风格中唯美、律动的细节处理元素，所以很受上层人士的青睐。","tags":"","zhaiyao":"继上编欧式客厅装修效果图之后，今天，小编为大家带来的是一组不同类型的欧式卧室装修效果图。欧式卧室的设计风格按不同的地域文化可分为北欧卧室、简欧卧室和传统欧式卧室。在中国，因为欧式风格继承了巴洛克风格中豪华、动感、多变的视觉效果，也吸取了洛可可风格中唯美、律…","content":"继上编欧式客厅装修效果图之后，今天，小编为大家带来的是一组不同类型的欧式卧室装修效果图。欧式卧室的设计风格按不同的地域文化可分为北欧卧室、简欧卧室和传统欧式卧室。在中国，因为欧式风格继承了巴洛克风格中豪华、动感、多变的视觉效果，也吸取了洛可可风格中唯美、律动的细节处理元素，所以很受上层人士的青睐。","sort_id":99,"click":0,"status":0,"is_msg":1,"is_top":0,"is_red":1,"is_hot":0,"is_slide":0,"is_sys":1,"user_name":"admin","add_time":"2015-04-18T04:46:50.000Z","update_time":"2016-12-06T09:04:16.000Z"},{"id":41,"channel_id":9,"category_id":18,"call_index":"","title":"居住在这样的房子容易出现自杀或血光之灾的现象","link_url":"","img_url":"http://demo.dtcms.net/upload/201504/18/thumb_201504181252034877.jpg","seo_title":"居住在这样的房子容易出现自杀或血光之灾的现象","seo_keywords":"居住,房子,自杀,血光之灾,现象","seo_description":"如果选择在三角形的地方上盖房，此类地方出现自杀现象的机率比较高。如果所住的大楼是呈现三角形的状态，那居住在这样的房子，也是容易出现自杀或血光之灾的现象","tags":"","zhaiyao":"1、房屋风水学之地形如果选择在三角形的地方上盖房，此类地方出现自杀现象的机率比较高。如果所住的大楼是呈现三角形的状态，那居住在这样的房子，也是容易出现自杀或血光之灾的现象。2、房屋风水学之电线杆对大门在房屋风水学中，电线杆直对房屋的大门正中或者窗户正中(仅限于…","content":"<strong>1、房屋风水学之地形</strong><br />\r\n如果选择在三角形的地方上盖房，此类地方出现自杀现象的机率比较高。如果所住的大楼是呈现三角形的状态，那居住在这样的房子，也是容易出现自杀或血光之灾的现象。<br />\r\n<strong>2、房屋风水学之电线杆对大门</strong><br />\r\n在房屋风水学中，电线杆直对房屋的大门正中或者窗户正中(仅限于比较大的窗户)这样的情况，是容易损害一个家的运气，另外电线杆的电流也是会影响一个人的思维，常年积累容易损伤精神，从而出现想不开或者精神出现问题的现象。<br />\r\n<strong>3、房屋风水学之采光过差</strong><br />\r\n正常的房子白天都有适合的光线，但有些房子的亮度不行，特别是有些房子白天也必须开灯，否则就看不见，滴天居士提醒这类的房子必须要加上常明灯才可以，否则此类房子会泄主人的阳气，多为不利，对体质或元气弱的人多有危险。<br />\r\n这类的风水中也常见有自杀的现象，特别是在一些大厦里，采光不畅或阴气过旺，常见若干自杀案例。正常情况下，一个人走出家门或走入家门时的走廊需要多加强光亮度，因为建筑结构因素，如果不能采光的话也要安装一盏亮度略高的灯为好。<br />\r\n<strong>4、房屋风水学之进门</strong><br />\r\n如果居住在进口狭窄的地方，主风水不利，特别大门直对着电梯的主风水不吉，滴天居士建议此类房子可以用一对镇宅风水物直对着电梯为好，<br />\r\n<strong>5、房屋风水学之房子空间比例</strong><br />\r\n正常的房子都是底层或一层比较高，但如果是因为种种原因，出现了一层不高，但二层或三层比较高，那这样的房子主风水不利，易出现血光之灾或自杀倾向的事件。<br />","sort_id":99,"click":1,"status":0,"is_msg":1,"is_top":0,"is_red":0,"is_hot":0,"is_slide":0,"is_sys":1,"user_name":"admin","add_time":"2015-04-18T04:52:25.000Z","update_time":"2016-12-06T09:04:16.000Z"},{"id":42,"channel_id":9,"category_id":18,"call_index":"","title":"100平米田园雅居三口之家 自然舒适空间","link_url":"","img_url":"http://demo.dtcms.net/upload/201504/18/thumb_201504181255546022.jpg","seo_title":"100平米田园雅居三口之家 自然舒适空间","seo_keywords":"100平米,田园雅居,三口之家,自然舒适,空间","seo_description":"设计师认为田园风格几乎可以等同于乡村风格。所以作为田园风格的载体——乡村。由于比城市更贴近原始自然环境，而居住在乡村里的人们的生活方式淳朴，生性豁达率性，心理压力小。","tags":"","zhaiyao":"设计师认为田园风格几乎可以等同于乡村风格。所以作为田园风格的载体——乡村。由于比城市更贴近原始自然环境，而居住在乡村里的人们的生活方式淳朴，生性豁达率性，心理压力小。所以在现今日益发达的城市中，因为繁杂喧闹并且污染越来越严重的城市环境和快速的生活节奏，繁忙…","content":"设计师认为田园风格几乎可以等同于乡村风格。所以作为田园风格的载体——乡村。由于比城市更贴近原始自然环境，而居住在乡村里的人们的生活方式淳朴，生性豁达率性，心理压力小。所以在现今日益发达的城市中，因为繁杂喧闹并且污染越来越严重的城市环境和快速的生活节奏，繁忙的工作压力。使得现代的城市人将羡慕的眼光投向了曾经不屑的乡村。他们重新开始对乡村生活方式感到好奇或向往。","sort_id":99,"click":0,"status":0,"is_msg":1,"is_top":0,"is_red":1,"is_hot":0,"is_slide":0,"is_sys":1,"user_name":"admin","add_time":"2015-04-18T04:55:58.000Z","update_time":"2015-04-18T04:56:29.000Z"},{"id":43,"channel_id":9,"category_id":18,"call_index":"","title":"清新有活力的公寓设计 用色彩焕然一新","link_url":"","img_url":"http://demo.dtcms.net/upload/201504/18/thumb_201504181258575445.jpg","seo_title":"清新有活力的公寓设计 用色彩焕然一新","seo_keywords":"清新,活力,公寓设计,色彩,焕然一新","seo_description":"Widawscy Studio为华沙的一处公寓做了设计，初看是最为保守的白底搭配木质元素，细看发现每个空间都被赋予了不同的色彩。","tags":"","zhaiyao":"Widawscy Studio为华沙的一处公寓做了设计，初看是最为保守的白底搭配木质元素，细看发现每个空间都被赋予了不同的色彩。面积最大的公共空间，包括客厅，餐厅和厨房采用了黄色的，让家人相聚时始终保持一颗愉快的心情，沉稳的灰色的主卧，轻快的蓝色调卧室，被芥末绿铺满的卫生…","content":"Widawscy Studio为华沙的一处公寓做了设计，初看是最为保守的白底搭配木质元素，细看发现每个空间都被赋予了不同的色彩。面积最大的公共空间，包括客厅，餐厅和厨房采用了黄色的，让家人相聚时始终保持一颗愉快的心情，沉稳的灰色的主卧，轻快的蓝色调卧室，被芥末绿铺满的卫生间，减少配饰的使用 ，用色彩焕然一新。","sort_id":99,"click":3,"status":0,"is_msg":1,"is_top":0,"is_red":1,"is_hot":0,"is_slide":0,"is_sys":1,"user_name":"admin","add_time":"2015-04-18T04:59:13.000Z","update_time":"2016-12-06T09:04:16.000Z"},{"id":44,"channel_id":9,"category_id":19,"call_index":"","title":"Hossein Zare 的超现实摄影作品","link_url":"","img_url":"http://demo.dtcms.net/upload/201504/18/thumb_201504181343191605.jpg","seo_title":"Hossein Zare 的超现实摄影作品","seo_keywords":"Hossein Zare,摄影作品","seo_description":"Zare创作了这组近似于彩色插画般的照片。注意他是如何将现实中的自然与城市风光融入到自己想象中的空间里去的。","tags":"","zhaiyao":"我们曾介绍过Hossein Zare的极简黑白摄影作品。这一次，摄影师将带领我们进入一个在现实中并不存在的梦想世界。Zare创作了这组近似于彩色插画般的照片。注意他是如何将现实中的自然与城市风光融入到自己想象中的空间里去的。","content":"<p>\r\n\t我们曾介绍过Hossein Zare的极简黑白摄影作品。这一次，摄影师将带领我们进入一个在现实中并不存在的梦想世界。\r\n</p>\r\n<p>\r\n\tZare创作了这组近似于彩色插画般的照片。注意他是如何将现实中的自然与城市风光融入到自己想象中的空间里去的。\r\n</p>","sort_id":99,"click":0,"status":0,"is_msg":1,"is_top":0,"is_red":0,"is_hot":0,"is_slide":0,"is_sys":1,"user_name":"admin","add_time":"2015-04-18T05:43:21.000Z","update_time":"2016-12-06T09:04:16.000Z"},{"id":45,"channel_id":9,"category_id":20,"call_index":"","title":"Vassilis Tangoulis意境风光摄影作品","link_url":"","img_url":"http://demo.dtcms.net/upload/201504/18/thumb_201504181347324908.jpg","seo_title":"Vassilis Tangoulis意境风光摄影作品","seo_keywords":"Vassilis Tangoulis,意境风光,摄影作品","seo_description":"Vassilis Tangoulis 白色的沉默摄影作品集，Vassilis Tangoulis 是一位屡获殊荣的艺术摄影师，他创作了一组迷人的黑白意境摄影作品，每一张图片都传达了沉默中的宁静时光，给人以宁静致远的深思。","tags":"","zhaiyao":"Vassilis Tangoulis 白色的沉默摄影作品集，Vassilis Tangoulis 是一位屡获殊荣的艺术摄影师，他创作了一组迷人的黑白意境摄影作品，每一张图片都传达了沉默中的宁静时光，给人以宁静致远的深思。","content":"Vassilis Tangoulis 白色的沉默摄影作品集，Vassilis Tangoulis 是一位屡获殊荣的艺术摄影师，他创作了一组迷人的黑白意境摄影作品，每一张图片都传达了沉默中的宁静时光，给人以宁静致远的深思。","sort_id":99,"click":0,"status":0,"is_msg":1,"is_top":0,"is_red":0,"is_hot":0,"is_slide":0,"is_sys":1,"user_name":"admin","add_time":"2015-04-18T05:47:36.000Z","update_time":"2016-12-06T09:04:16.000Z"},{"id":46,"channel_id":9,"category_id":21,"call_index":"","title":"Takashi Kitajima梦幻迷离的城市夜景摄影作品","link_url":"","img_url":"http://demo.dtcms.net/upload/201504/18/thumb_201504181350088573.jpg","seo_title":"Takashi Kitajima梦幻迷离的城市夜景摄影作品","seo_keywords":"Takashi Kitajima,梦幻迷离,城市,夜景,摄影作品","seo_description":"这组梦幻夜景来自日本摄影师Takashi Kitajima，拍摄的都是东京的夜景。摄影师将模糊的光斑与现实中的全景城市相结合，抽象了建筑物原本轮廓分明的线条，创作出了这个光怪陆离的奇幻世界。","tags":"","zhaiyao":"这组梦幻夜景来自日本摄影师Takashi Kitajima，拍摄的都是东京的夜景。摄影师将模糊的光斑与现实中的全景城市相结合，抽象了建筑物原本轮廓分明的线条，创作出了这个光怪陆离的奇幻世界。","content":"这组梦幻夜景来自日本摄影师Takashi Kitajima，拍摄的都是东京的夜景。摄影师将模糊的光斑与现实中的全景城市相结合，抽象了建筑物原本轮廓分明的线条，创作出了这个光怪陆离的奇幻世界。","sort_id":99,"click":0,"status":0,"is_msg":1,"is_top":0,"is_red":0,"is_hot":0,"is_slide":0,"is_sys":1,"user_name":"admin","add_time":"2015-04-18T05:50:11.000Z","update_time":"2016-12-06T09:04:16.000Z"},{"id":47,"channel_id":9,"category_id":20,"call_index":"","title":"宁静唯美的黑白风光摄影欣赏","link_url":"","img_url":"http://demo.dtcms.net/upload/201504/18/thumb_201504181353090559.jpg","seo_title":"宁静唯美的黑白风光摄影欣赏","seo_keywords":"宁静唯美,黑白风光,摄影欣赏","seo_description":"摄影绝不仅仅只是按动快门那么简单，色彩上微妙的变化，拍摄的时候尝试调节不同的曝光补偿，一张好的黑白摄影布光发挥了至关重要的作用，同时对于我来说是不同寻常的","tags":"","zhaiyao":"摄影绝不仅仅只是按动快门那么简单，色彩上微妙的变化，拍摄的时候尝试调节不同的曝光补偿，一张好的黑白摄影布光发挥了至关重要的作用，同时对于我来说是不同寻常的。肉丁为你分享不一样的黑白摄影，下面给大家分享一篇像油画一样迷人的黑白色的风景摄影作品欣赏，看摄影师的…","content":"摄影绝不仅仅只是按动快门那么简单，色彩上微妙的变化，拍摄的时候尝试调节不同的曝光补偿，一张好的黑白摄影布光发挥了至关重要的作用，同时对于我来说是不同寻常的。肉丁为你分享不一样的黑白摄影，下面给大家分享一篇像油画一样迷人的黑白色的风景摄影作品欣赏，看摄影师的精彩作品、试着享受孤独的宁静.享受拍摄的乐趣，希望你能够喜欢这些情趣盎然的作品，一起欣赏吧。每个人对照片都有自己不同的品味和选择，色彩上微妙的变化，自然光能够做主光、侧光、背光和轮廓光，却能吸引旁人的眼球，可以透过相机的眼睛，发现生活的美丽，而且对于我来说是不同寻常的。肉丁带你领略不同的黑白摄影，这里有一篇像油画一样迷人的黑白色的风景摄影作品欣赏，结合这些照片的拍摄技巧、一睹大师的风采，希望能带给你快乐，这里你可以看到一些美丽的照片。","sort_id":99,"click":0,"status":0,"is_msg":1,"is_top":0,"is_red":0,"is_hot":0,"is_slide":0,"is_sys":1,"user_name":"admin","add_time":"2015-04-18T05:53:13.000Z","update_time":"2016-12-06T09:04:16.000Z"},{"id":48,"channel_id":9,"category_id":20,"call_index":"","title":"西班牙摄影师的人像创意摄影作品：血秀","link_url":"","img_url":"http://demo.dtcms.net/upload/201504/18/thumb_201504181356417887.jpg","seo_title":"西班牙摄影师的人像创意摄影作品：血秀","seo_keywords":"西班牙,摄影师,血秀","seo_description":"这组名为“血秀（The Blood Show）”的作品是为《Ae》杂志拍摄，艺术指导/造型师：Kattaca，化妆师/发型师：Yurema Villa。","tags":"","zhaiyao":"现居马德里的西班牙摄影师Paco Peregrn的西班牙摄影师的人像创意摄影作品。这组名为“血秀（The Blood Show）”的作品是为《Ae》杂志拍摄，艺术指导/造型师：Kattaca，化妆师/发型师：Yurema Villa。PacoPeregrn生于西班牙阿尔梅利亚，毕业于塞尔维亚艺术学院，后又到圣马丁艺…","content":"<p>\r\n\t现居马德里的西班牙摄影师Paco Peregrín的西班牙摄影师的人像创意摄影作品。\r\n</p>\r\n<p>\r\n\t这组名为“血秀（The Blood Show）”的作品是为《Ae》杂志拍摄，艺术指导/造型师：Kattaca，化妆师/发型师：Yurema Villa。\r\n</p>\r\n<p>\r\n\tPacoPeregrín生于西班牙阿尔梅利亚，毕业于塞尔维亚艺术学院，后又到圣马丁艺术设计学院国际摄影中心、安达卢西亚当代艺术中心、安达卢西亚摄影中心、马德里康普顿斯大学、圣地亚哥德孔波斯特拉大学等处学习摄影和艺术。他继承了西班牙人热情奔放的性格，也浸染了滋养过达利、高迪等大批天才艺术家的五彩斑斓的西班牙文化。他的作品用色大胆、构图多样，充满想象力。他混合了感官刺激和前卫艺术的元素，创作出兼具情色、高雅和神秘风情的作品，在摄影领域独树一帜。<br />\r\n&nbsp;多年来，他不仅在艺术摄影领域取得了巨大的成功，具有世界范围的影响力，还在时尚和商业摄影领域获得了成功，作品被众多世界顶级的时尚杂志追捧。耐克、阿迪达斯、马自达、丰田等世界著名品牌都成为他的客户。PacoPeregrín：我在塞维利亚长大，那是一座充满巴洛克风格的城市。这种环境对我的审美和艺术感受力影响深远，我非常喜欢这种风格。在我的作品中，这种风格非常明显，比如光线的运用、戏剧化的效果等。不过我也喜欢一些与之截然相反的艺术形式，比如极简派艺术。我的作品常常有多种艺术风格糅合其中，比如弗兰德斯画派的风格和超现实主义艺术等。在工作中，我既像演员，又像舞台设计师，还是造型师、服装设计师和导演。\r\n</p>","sort_id":99,"click":0,"status":0,"is_msg":1,"is_top":0,"is_red":0,"is_hot":0,"is_slide":0,"is_sys":1,"user_name":"admin","add_time":"2015-04-18T05:57:04.000Z","update_time":"2016-12-06T09:04:16.000Z"},{"id":49,"channel_id":9,"category_id":24,"call_index":"","title":"国产嫩模许喵喵Mickey大尺度写真最新曝光 胸大不忍直视","link_url":"","img_url":"http://demo.dtcms.net/upload/201504/18/thumb_201504181404062204.jpg","seo_title":"国产嫩模许喵喵Mickey大尺度写真最新曝光 胸大不忍直视","seo_keywords":"许喵喵Mickey,写真","seo_description":"近日，国产嫩模许喵喵Mickey在微博上晒出一组大尺度写真引发热议。＠许喵喵Mickey 自己描述：“等了你一千年，来为我画眉，前世埋我的人，我来报你的恩，人间冰冷，别怪我是妖，有时妖心慈过世人心。（感谢《妖蛇》摄制组全体工作人员，大家辛苦了）”","tags":"","zhaiyao":"近日，国产嫩模许喵喵Mickey在微博上晒出一组大尺度写真引发热议。＠许喵喵Mickey 自己描述：“等了你一千年，来为我画眉，前世埋我的人，我来报你的恩，人间冰冷，别怪我是妖，有时妖心慈过世人心。（感谢《妖蛇》摄制组全体工作人员，大家辛苦了）”","content":"近日，国产嫩模许喵喵Mickey在微博上晒出一组大尺度写真引发热议。＠许喵喵Mickey 自己描述：“等了你一千年，来为我画眉，前世埋我的人，我来报你的恩，人间冰冷，别怪我是妖，有时妖心慈过世人心。（感谢《妖蛇》摄制组全体工作人员，大家辛苦了）”","sort_id":99,"click":2,"status":0,"is_msg":1,"is_top":0,"is_red":0,"is_hot":0,"is_slide":0,"is_sys":1,"user_name":"admin","add_time":"2015-04-18T06:04:17.000Z","update_time":"2015-04-18T06:15:38.000Z"},{"id":50,"channel_id":9,"category_id":23,"call_index":"","title":"有气质且带可爱的美女组图","link_url":"","img_url":"http://demo.dtcms.net/upload/201504/18/thumb_201504181416251481.jpg","seo_title":"有气质且带可爱的美女组图","seo_keywords":"有气质且带可爱的美女组图","seo_description":"有气质且带可爱的美女组图","tags":"","zhaiyao":"有气质且带可爱的美女组图有气质且带可爱的美女组图有气质且带可爱的美女组图","content":"有气质且带可爱的美女组图有气质且带可爱的美女组图有气质且带可爱的美女组图","sort_id":99,"click":2,"status":0,"is_msg":1,"is_top":0,"is_red":0,"is_hot":0,"is_slide":0,"is_sys":1,"user_name":"admin","add_time":"2015-04-18T06:17:40.000Z","update_time":"2015-04-18T06:21:36.000Z"},{"id":51,"channel_id":9,"category_id":23,"call_index":"","title":"超甜美的韩国美女美图欣赏","link_url":"","img_url":"http://demo.dtcms.net/upload/201504/18/thumb_201504181420529760.jpg","seo_title":"超甜美的韩国美女美图","seo_keywords":"超甜美的韩国美女美图","seo_description":"收集了甜素纯美女写真图1等精彩图片,同时汇集美女图片,搞笑图片,奇闻趣事,风景图片,明星写真,娱乐八卦,气质,清纯,非主流,美女,高清图片","tags":"","zhaiyao":"收集了甜素纯美女写真图1等精彩图片,同时汇集美女图片,搞笑图片,奇闻趣事,风景图片,明星写真,娱乐八卦,气质,清纯,非主流,美女,高清图片","content":"收集了甜素纯美女写真图1等精彩图片,同时汇集美女图片,搞笑图片,奇闻趣事,风景图片,明星写真,娱乐八卦,气质,清纯,非主流,美女,高清图片","sort_id":99,"click":2,"status":0,"is_msg":1,"is_top":0,"is_red":0,"is_hot":0,"is_slide":0,"is_sys":1,"user_name":"admin","add_time":"2015-04-18T06:21:01.000Z","update_time":"2016-12-06T09:04:16.000Z"},{"id":52,"channel_id":9,"category_id":22,"call_index":"","title":"柳岩出席设计师好友兰玉的高级成衣发布Show","link_url":"","img_url":"http://demo.dtcms.net/upload/201504/18/thumb_201504181426524427.jpg","seo_title":"柳岩出席设计师好友兰玉的高级成衣发布Show","seo_keywords":"柳岩出席设计师好友兰玉的高级成衣发布Show","seo_description":"北京四季酒店,柳岩出席设计师好友兰玉的高级成衣发布Show,她身穿兰玉设计的纯白卡肩礼服惊艳登场,优雅晚装发髻搭配翡翠镶钻珠宝,举手投足尽显大气温婉,而卡肩低胸的礼服设计更是衬托出柳岩傲人的事业线资本","tags":"","zhaiyao":"北京四季酒店,柳岩出席设计师好友兰玉的高级成衣发布Show,她身穿兰玉设计的纯白卡肩礼服惊艳登场,优雅晚装发髻搭配翡翠镶钻珠宝,举手投足尽显大气温婉,而卡肩低胸的礼服设计更是衬托出柳岩傲人的事业线资本,性感指数爆灯,入场即引来现场阵阵骚动,柳岩轻松看秀全程甜笑连连,心情…","content":"北京四季酒店,柳岩出席设计师好友兰玉的高级成衣发布Show,她身穿兰玉设计的纯白卡肩礼服惊艳登场,优雅晚装发髻搭配翡翠镶钻珠宝,举手投足尽显大气温婉,而卡肩低胸的礼服设计更是衬托出柳岩傲人的事业线资本,性感指数爆灯,入场即引来现场阵阵骚动,柳岩轻松看秀全程甜笑连连,心情靓绝。","sort_id":99,"click":0,"status":0,"is_msg":1,"is_top":0,"is_red":0,"is_hot":0,"is_slide":0,"is_sys":1,"user_name":"admin","add_time":"2015-04-18T06:27:06.000Z","update_time":"2016-12-06T09:04:16.000Z"},{"id":53,"channel_id":9,"category_id":22,"call_index":"","title":"昆凌最新大片","link_url":"","img_url":"http://demo.dtcms.net/upload/201504/18/thumb_201504181431411505.jpg","seo_title":"昆凌最新大片","seo_keywords":"昆凌,写真","seo_description":"昆凌与周杰伦新婚后就马上投入了工作中，近日一组时尚大片她穿上最新一季春装，脸颊红扑扑对镜头甜笑，展露青春气息。","tags":"","zhaiyao":"昆凌与周杰伦新婚后就马上投入了工作中，近日一组时尚大片她穿上最新一季春装，脸颊红扑扑对镜头甜笑，展露青春气息。","content":"昆凌与周杰伦新婚后就马上投入了工作中，近日一组时尚大片她穿上最新一季春装，脸颊红扑扑对镜头甜笑，展露青春气息。","sort_id":99,"click":4,"status":0,"is_msg":1,"is_top":0,"is_red":1,"is_hot":0,"is_slide":0,"is_sys":1,"user_name":"admin","add_time":"2015-04-18T06:31:44.000Z","update_time":"2016-12-06T09:04:16.000Z"}]}


var photolist17 = {"status":0,"message":[{"id":37,"title":"现代简约 明亮的外表卧室卧室背景墙、吊顶黄色","img_url":"http://demo.dtcms.net/upload/201504/18/thumb_201504181230434303.jpg","zhaiyao":"不要简朴不要素雅洋气卧室我做主，高低床榻榻米式靓丽卧室装扮，现代油画壁画帆布画卧室餐厅仟象映画，现代中式卧室装修图欣赏，温馨浪漫，而且很时尚的卧室设计，欧式卧室飘窗装修效果图。"},{"id":38,"title":"很美的落地大书柜 可以放超多的图书的吧","img_url":"http://demo.dtcms.net/upload/201504/18/thumb_201504181237019134.jpg","zhaiyao":"很美的落地大书柜 可以放超多的图书的吧，转角的书柜以及书桌，这里可以收纳超多的东西，书柜,书桌这些是&quot;七彩人生&quot;品，双层书柜组合书柜儿童书柜。"},{"id":39,"title":"西班牙阿拉尔孔郊区的80平米一室一厅的公寓","img_url":"http://demo.dtcms.net/upload/201504/18/thumb_201504181241259978.jpg","zhaiyao":"这是一套在西班牙阿拉尔孔郊区的80平米一室一厅的公寓，用一道墙分隔出了客厅与厨房，虽然整体来看室内设计有些混搭风，但似乎某些空间和角度去看又会有着自己的主题。"}]}

var photolist18 = {"status":0,"message":[{"id":40,"title":"欧式风格继承了巴洛克风格中豪华、动感、多变的视觉效果","img_url":"http://demo.dtcms.net/upload/201504/18/thumb_201504181246376332.jpg","zhaiyao":"继上编欧式客厅装修效果图之后，今天，小编为大家带来的是一组不同类型的欧式卧室装修效果图。欧式卧室的设计风格按不同的地域文化可分为北欧卧室、简欧卧室和传统欧式卧室。在中国，因为欧式风格继承了巴洛克风格中豪华、动感、多变的视觉效果，也吸取了洛可可风格中唯美、律…"},{"id":41,"title":"居住在这样的房子容易出现自杀或血光之灾的现象","img_url":"http://demo.dtcms.net/upload/201504/18/thumb_201504181252034877.jpg","zhaiyao":"1、房屋风水学之地形如果选择在三角形的地方上盖房，此类地方出现自杀现象的机率比较高。如果所住的大楼是呈现三角形的状态，那居住在这样的房子，也是容易出现自杀或血光之灾的现象。2、房屋风水学之电线杆对大门在房屋风水学中，电线杆直对房屋的大门正中或者窗户正中(仅限于…"},{"id":42,"title":"100平米田园雅居三口之家 自然舒适空间","img_url":"http://demo.dtcms.net/upload/201504/18/thumb_201504181255546022.jpg","zhaiyao":"设计师认为田园风格几乎可以等同于乡村风格。所以作为田园风格的载体——乡村。由于比城市更贴近原始自然环境，而居住在乡村里的人们的生活方式淳朴，生性豁达率性，心理压力小。所以在现今日益发达的城市中，因为繁杂喧闹并且污染越来越严重的城市环境和快速的生活节奏，繁忙…"},{"id":43,"title":"清新有活力的公寓设计 用色彩焕然一新","img_url":"http://demo.dtcms.net/upload/201504/18/thumb_201504181258575445.jpg","zhaiyao":"Widawscy Studio为华沙的一处公寓做了设计，初看是最为保守的白底搭配木质元素，细看发现每个空间都被赋予了不同的色彩。面积最大的公共空间，包括客厅，餐厅和厨房采用了黄色的，让家人相聚时始终保持一颗愉快的心情，沉稳的灰色的主卧，轻快的蓝色调卧室，被芥末绿铺满的卫生…"}]}

var photolist19 = {"status":0,"message":[{"id":44,"title":"Hossein Zare 的超现实摄影作品","img_url":"http://demo.dtcms.net/upload/201504/18/thumb_201504181343191605.jpg","zhaiyao":"我们曾介绍过Hossein Zare的极简黑白摄影作品。这一次，摄影师将带领我们进入一个在现实中并不存在的梦想世界。Zare创作了这组近似于彩色插画般的照片。注意他是如何将现实中的自然与城市风光融入到自己想象中的空间里去的。"}]}


var photolist20 = {"status":0,"message":[{"id":45,"title":"Vassilis Tangoulis意境风光摄影作品","img_url":"http://demo.dtcms.net/upload/201504/18/thumb_201504181347324908.jpg","zhaiyao":"Vassilis Tangoulis 白色的沉默摄影作品集，Vassilis Tangoulis 是一位屡获殊荣的艺术摄影师，他创作了一组迷人的黑白意境摄影作品，每一张图片都传达了沉默中的宁静时光，给人以宁静致远的深思。"},{"id":47,"title":"宁静唯美的黑白风光摄影欣赏","img_url":"http://demo.dtcms.net/upload/201504/18/thumb_201504181353090559.jpg","zhaiyao":"摄影绝不仅仅只是按动快门那么简单，色彩上微妙的变化，拍摄的时候尝试调节不同的曝光补偿，一张好的黑白摄影布光发挥了至关重要的作用，同时对于我来说是不同寻常的。肉丁为你分享不一样的黑白摄影，下面给大家分享一篇像油画一样迷人的黑白色的风景摄影作品欣赏，看摄影师的…"},{"id":48,"title":"西班牙摄影师的人像创意摄影作品：血秀","img_url":"http://demo.dtcms.net/upload/201504/18/thumb_201504181356417887.jpg","zhaiyao":"现居马德里的西班牙摄影师Paco Peregrn的西班牙摄影师的人像创意摄影作品。这组名为“血秀（The Blood Show）”的作品是为《Ae》杂志拍摄，艺术指导/造型师：Kattaca，化妆师/发型师：Yurema Villa。PacoPeregrn生于西班牙阿尔梅利亚，毕业于塞尔维亚艺术学院，后又到圣马丁艺…"}]}


// photo details:

var photodetail37 = {"status":0,"message":[{"id":37,"title":"现代简约 明亮的外表卧室卧室背景墙、吊顶黄色","click":0,"add_time":"2015-04-18T04:30:50.000Z","content":"不要简朴不要素雅洋气卧室我做主，高低床榻榻米式靓丽卧室装扮，现代油画壁画帆布画卧室餐厅仟象映画，现代中式卧室装修图欣赏，温馨浪漫，而且很时尚的卧室设计<span id=\"__kindeditor_bookmark_start_8__\">，欧式卧室飘窗装修效果图。</span>"}]}


var photodetail38 = {"status":0,"message":[{"id":38,"title":"很美的落地大书柜 可以放超多的图书的吧","click":0,"add_time":"2015-04-18T04:37:19.000Z","content":"很美的落地大书柜 可以放超多的图书的吧，转角的书柜以及书桌，这里可以收纳超多的东西，书柜,书桌这些是\"七彩人生\"品，双层书柜组合书柜儿童书柜。"}]}

var photodetail39 = {"status":0,"message":[{"id":39,"title":"西班牙阿拉尔孔郊区的80平米一室一厅的公寓","click":0,"add_time":"2015-04-18T04:41:37.000Z","content":"这是一套在西班牙阿拉尔孔郊区的80平米一室一厅的公寓，用一道墙分隔出了客厅与厨房，虽然整体来看室内设计有些混搭风，但似乎某些空间和角度去看又会有着自己的主题。"}]}


var thumbpic37 = {"status":0,"message":[{"src":"http://demo.dtcms.net/upload/201504/18/thumb_201504181230434303.jpg"},{"src":"http://demo.dtcms.net/upload/201504/18/thumb_201504181230437111.jpg"},{"src":"http://demo.dtcms.net/upload/201504/18/thumb_201504181230439139.jpg"},{"src":"http://demo.dtcms.net/upload/201504/18/thumb_201504181230440387.jpg"},{"src":"http://demo.dtcms.net/upload/201504/18/thumb_201504181230444755.jpg"}]}

var thumbpic38 = {"status":0,"message":[{"src":"http://demo.dtcms.net/upload/201504/18/thumb_201504181237019134.jpg"},{"src":"http://demo.dtcms.net/upload/201504/18/thumb_201504181237020070.jpg"},{"src":"http://demo.dtcms.net/upload/201504/18/thumb_201504181237021942.jpg"},{"src":"http://demo.dtcms.net/upload/201504/18/thumb_201504181237023658.jpg"},{"src":"http://demo.dtcms.net/upload/201504/18/thumb_201504181237029898.jpg"}]}

var thumbpic39 = {"status":0,"message":[{"src":"http://demo.dtcms.net/upload/201504/18/thumb_201504181241259978.jpg"},{"src":"http://demo.dtcms.net/upload/201504/18/thumb_201504181241262318.jpg"},{"src":"http://demo.dtcms.net/upload/201504/18/thumb_201504181241264190.jpg"},{"src":"http://demo.dtcms.net/upload/201504/18/thumb_201504181241265438.jpg"},{"src":"http://demo.dtcms.net/upload/201504/18/thumb_201504181241266686.jpg"},{"src":"http://demo.dtcms.net/upload/201504/18/thumb_201504181241268246.jpg"},{"src":"http://demo.dtcms.net/upload/201504/18/thumb_201504181241270898.jpg"}]}


//goods list

var goodspage1 = {"status":0,"message":[{"id":87,"title":"华为（HUAWEI）荣耀6Plus 16G双4G版","add_time":"2015-04-19T16:51:03.000Z","zhaiyao":"荣耀6 Plus，该机型分为两款型号，分别为PE-","click":0,"img_url":"http://demo.dtcms.net/upload/201504/20/thumb_201504200046589514.jpg","sell_price":2195,"market_price":2499,"stock_quantity":60},{"id":88,"title":"苹果Apple iPhone 6 Plus 16G 4G手机（联通三网版）","add_time":"2015-04-19T17:00:58.000Z","zhaiyao":"iPhone 6 Plus设计上和iPhone 6","click":0,"img_url":"http://demo.dtcms.net/upload/201504/20/thumb_201504200059017695.jpg","sell_price":5780,"market_price":6388,"stock_quantity":200},{"id":89,"title":"小米（Mi）小米Note 16G双网通版","add_time":"2015-04-19T17:19:30.000Z","zhaiyao":"小米Note此次采用的5.7英寸夏普/JDI分辨率","click":4,"img_url":"http://demo.dtcms.net/upload/201504/20/thumb_201504200119256512.jpg","sell_price":2199,"market_price":2699,"stock_quantity":60},{"id":90,"title":"佳能（Canon） EOS 700D 单反套机","add_time":"2015-04-19T17:54:36.000Z","zhaiyao":"◆ 佳能普及型单反新旗舰记忆的片段，偶然的相遇，铭","click":1,"img_url":"http://demo.dtcms.net/upload/201504/20/thumb_201504200154277661.jpg","sell_price":4799,"market_price":5099,"stock_quantity":100},{"id":91,"title":"尼康(Nikon)D3300套机（18-55mm f/3.5-5.6G VRII）（黑色）","add_time":"2015-04-19T18:14:52.000Z","zhaiyao":"作为D3200的升级版，尼康D3300最大特点即是","click":0,"img_url":"http://demo.dtcms.net/upload/201504/20/thumb_201504200214471783.jpg","sell_price":3180,"market_price":3150,"stock_quantity":10},{"id":92,"title":"联想（Lenovo） G510AM 15.6英寸笔记本电脑","add_time":"2015-04-19T18:25:14.000Z","zhaiyao":"G系列全面支持Windows 8 简体中文版，在秉","click":0,"img_url":"http://demo.dtcms.net/upload/201504/20/thumb_201504200225107390.jpg","sell_price":2999,"market_price":4599,"stock_quantity":100},{"id":93,"title":"Apple iMac MF883CH/A 21.5英寸一体机电脑","add_time":"2015-04-19T18:33:05.000Z","zhaiyao":"—— iMac —— 锋锐设计，锋芒表现。iMac","click":0,"img_url":"http://demo.dtcms.net/upload/201504/20/201504200341260763.jpg","sell_price":7200,"market_price":7988,"stock_quantity":10},{"id":94,"title":"金士顿（Kingston） DataTraveler SE9 32GB 金属U盘","add_time":"2015-04-19T18:39:32.000Z","zhaiyao":"品名：金士顿颜色：银色容量：32GB USB2.0","click":0,"img_url":"http://demo.dtcms.net/upload/201504/20/thumb_201504200239192345.jpg","sell_price":79,"market_price":99,"stock_quantity":100},{"id":95,"title":"惠普（HP）LaserJet 2035商用黑白激光打印机（黑色）","add_time":"2015-04-19T18:43:39.000Z","zhaiyao":"全新hp laserjet p2035系列激光打印","click":0,"img_url":"http://demo.dtcms.net/upload/201504/20/thumb_201504200242250674.jpg","sell_price":1899,"market_price":2099,"stock_quantity":100},{"id":96,"title":"惠普(HP) Officejet Pro 8610商用彩色喷墨一体机","add_time":"2015-04-19T18:53:06.000Z","zhaiyao":"专业彩色打印件的单页成本比激光打印机低 50%，从","click":0,"img_url":"http://demo.dtcms.net/upload/201504/20/thumb_201504200253026047.jpg","sell_price":1999,"market_price":2099,"stock_quantity":100}]}

var goodspage2 = {"status":0,"message":[{"id":97,"title":"三星（SAMSUNG）UA40HU5920JXXZ 40英寸4K超高清","add_time":"2015-04-19T19:01:38.000Z","zhaiyao":"三星（SAMSUNG）UA40HU5920JXXZ","click":0,"img_url":"http://demo.dtcms.net/upload/201504/20/thumb_201504200258403759.jpg","sell_price":3299,"market_price":3599,"stock_quantity":100},{"id":98,"title":"奔腾（BNTN） 380功放+纽约至尊 套装家庭影院","add_time":"2015-04-19T19:14:44.000Z","zhaiyao":"奔腾（BNTN） 380功放+纽约至尊 套装家庭影","click":0,"img_url":"http://demo.dtcms.net/upload/201504/20/thumb_201504200314272543.jpg","sell_price":4880,"market_price":5880,"stock_quantity":10},{"id":99,"title":"飞利浦（PHILIPS）DVP3690 全高清DVD影碟机播放器","add_time":"2015-04-19T19:19:48.000Z","zhaiyao":"2D电影系列在家中体验3D电影带来的刺激感，采用最","click":0,"img_url":"http://demo.dtcms.net/upload/201504/20/thumb_201504200318534459.jpg","sell_price":399,"market_price":499,"stock_quantity":100},{"id":100,"title":"霍尼韦尔（Honeywel）HM-F1020-A-B HDMI高清数据线","add_time":"2015-04-19T19:27:39.000Z","zhaiyao":"霍尼韦尔（Honeywel）HM-F1020-A-","click":0,"img_url":"http://demo.dtcms.net/upload/201504/20/thumb_201504200327369421.jpg","sell_price":49,"market_price":59,"stock_quantity":50},{"id":101,"title":"Shinco/新科 S2300 无线麦克风 无线手持话筒 双手麦 KTV 舞台","add_time":"2015-04-19T19:34:55.000Z","zhaiyao":"Shinco/新科 S2300 无线麦克风 无线手","click":0,"img_url":"http://demo.dtcms.net/upload/201504/20/thumb_201504200333240710.jpg","sell_price":199,"market_price":269,"stock_quantity":20}]}

//goods slide picture

var slide87 = {"status":0,"message":[{"src":"http://demo.dtcms.net/upload/201504/20/thumb_201504200046589514.jpg"},{"src":"http://demo.dtcms.net/upload/201504/20/thumb_201504200046594439.jpg"}]}

var slide88 = {"status":0,"message":[{"src":"http://demo.dtcms.net/upload/201504/20/thumb_201504200059017695.jpg"},{"src":"http://demo.dtcms.net/upload/201504/20/thumb_201504200059022920.jpg"}]}

var slide89 = {"status":0,"message":[{"src":"http://demo.dtcms.net/upload/201504/20/thumb_201504200119256512.jpg"},{"src":"http://demo.dtcms.net/upload/201504/20/thumb_201504200119262837.jpg"}]}

var itemdetails87 = {"status":0,"message":[{"id":87,"title":"华为（HUAWEI）荣耀6Plus 16G双4G版","add_time":"2015-04-19T16:51:03.000Z","goods_no":"SD9102356032","stock_quantity":60,"market_price":2499,"sell_price":2195}]}
var itemdetails88 = {"status":0,"message":[{"id":88,"title":"苹果Apple iPhone 6 Plus 16G 4G手机（联通三网版）","add_time":"2015-04-19T17:00:58.000Z","goods_no":"SD7159810321","stock_quantity":200,"market_price":6388,"sell_price":5780}]}
var itemdetails89 = {"status":0,"message":[{"id":89,"title":"小米（Mi）小米Note 16G双网通版","add_time":"2015-04-19T17:19:30.000Z","goods_no":"SD2932214404","stock_quantity":60,"market_price":2699,"sell_price":2199}]}

// goods desc
var goodsdesc87 = {"status":0,"message":[{"title":"华为（HUAWEI）荣耀6Plus 16G双4G版","content":"<p>\r\n\t荣耀6 Plus，该机型分为两款型号，分别为PE-TL10和PE-UL00的新机型，并且根据工信部设备认证中心公布的信息显示，移动版本PE-TL20和PE-TL00M也已经拿到了入网许可证，拥有7.5mm的纤薄机身，支持TDD-LTE/TD-SCDMA/GSM网络。双800万后置摄像头+800万前置摄像头。采用5.5英寸1080p分辨率显示屏，搭载1.8GHz麒麟925八核处理器，内置3GB RAM+32GB ROM存储组合，支持存储卡扩展。\r\n</p>\r\n<p align=\"center\">\r\n\t<span style=\"color:#FF0000;font-size:16px;\"><img class=\"gomeImgLoad\" alt=\"\" src=\"http://img5.gomein.net.cn/image/bbcimg/productDesc/descImg/201503/desc04/A0004794664/3997361.jpg\" /></span> \r\n</p>"}]}

var goodsdesc88 = {"status":0,"message":[{"title":"苹果Apple iPhone 6 Plus 16G 4G手机（联通三网版）","content":"<p>\r\n\tiPhone 6 Plus设计上和iPhone 6一致，做工延续了苹果的高标准。\r\n</p>\r\n<p>\r\n\t和前几代不同的是，与前几代iPhone有棱有角的设计相比，它从屏幕边缘到边框都是弧形设计，玻璃与边框贴合的十分紧凑，两者衔接的地方过度十分自然，更像是unibody一体式的设计。它一改以往的设计风格，也使得手机十分圆滑，不太容易掌控。\r\n</p>\r\n<p>\r\n\tTechCrunch和Engadget都提到，iPhone 6 Plus让人想起了iPad mini，尤其是后者的侧边也是弧形设计。iPhone 6 Plus同样需要双手来操作，想要单手模式的话，轻拍两下Home键（不是按下去），显示内容会下移大约一半的尺寸。\r\n</p>\r\n<p>\r\n\t<br />\r\n</p>\r\n<p align=\"center\">\r\n\t<img width=\"750\" height=\"371\" class=\"gomeImgLoad\" alt=\"\" src=\"http://img5.gomein.net.cn/image/prodimg/productDesc/descImg/201503/desc1226/1122290268/1_02.jpg\" /> <img width=\"750\" height=\"371\" class=\"gomeImgLoad\" alt=\"\" src=\"http://img6.gomein.net.cn/image/prodimg/productDesc/descImg/201503/desc1226/1122290268/1_03.jpg\" /> \r\n</p>\r\n<p align=\"center\">\r\n\t<img width=\"750\" height=\"370\" class=\"gomeImgLoad\" alt=\"\" src=\"http://img5.gomein.net.cn/image/prodimg/productDesc/descImg/201503/desc1226/1122290268/1_04.jpg\" /> \r\n</p>\r\n<p align=\"center\">\r\n\t<img width=\"750\" height=\"371\" class=\"gomeImgLoad\" alt=\"\" src=\"http://img6.gomein.net.cn/image/prodimg/productDesc/descImg/201503/desc1226/1122290268/1_05.jpg\" /> <img width=\"750\" height=\"371\" class=\"gomeImgLoad\" alt=\"\" src=\"http://img5.gomein.net.cn/image/prodimg/productDesc/descImg/201503/desc1226/1122290268/1_06.jpg\" /> <img width=\"750\" height=\"371\" class=\"gomeImgLoad\" alt=\"\" src=\"http://img5.gomein.net.cn/image/prodimg/productDesc/descImg/201503/desc1226/1122290268/1_07.jpg\" /> <img width=\"750\" height=\"371\" class=\"gomeImgLoad\" alt=\"\" src=\"http://img5.gomein.net.cn/image/prodimg/productDesc/descImg/201503/desc1226/1122290268/1_08.jpg\" /> <img width=\"750\" height=\"371\" class=\"gomeImgLoad\" alt=\"\" src=\"http://img6.gomein.net.cn/image/prodimg/productDesc/descImg/201503/desc1226/1122290268/1_09.jpg\" /> <img width=\"750\" height=\"370\" class=\"gomeImgLoad\" alt=\"\" src=\"http://img6.gomein.net.cn/image/prodimg/productDesc/descImg/201503/desc1226/1122290268/1_10.jpg\" /> <img width=\"750\" height=\"371\" class=\"gomeImgLoad\" alt=\"\" src=\"http://img6.gomein.net.cn/image/prodimg/productDesc/descImg/201503/desc1226/1122290268/1_11.jpg\" /> <img width=\"750\" height=\"371\" class=\"gomeImgLoad\" alt=\"\" src=\"http://img5.gomein.net.cn/image/prodimg/productDesc/descImg/201503/desc1226/1122290268/1_12.jpg\" /> \r\n</p>\r\n<p align=\"center\">\r\n\t<img width=\"750\" height=\"371\" class=\"gomeImgLoad\" alt=\"\" src=\"http://img5.gomein.net.cn/image/prodimg/productDesc/descImg/201503/desc1226/1122290268/1_13.jpg\" /> \r\n</p>"}]}

var goodsdesc89 = {"status":0,"message":[{"title":"小米（Mi）小米Note 16G双网通版","content":"<p>\r\n\t小米Note此次采用的5.7英寸夏普/JDI分辨率为1920X1080的屏幕。小米Note配置方面，CPU采用的是高通骁龙801四核2.5GHZ处理器，3GB的运行内存。\r\n</p>\r\n<p>\r\n\t4G双卡双待，1300万像素后置摄像头和400万前置摄像头组合，首次加入HiFi模块，高保真音质，电池容量为3000mAh。\r\n</p>\r\n<p>\r\n\t小米Note顶配版升级了CPU、屏幕、运行内存，采用的5.7英寸夏普/JDI分辨率为2560 x 1440的2K屏，CPU采用的是高通骁龙810八核64位处理器，4GB的运行内存。\r\n</p>\r\n<p align=\"center\">\r\n\t<img class=\"gomeImgLoad\" alt=\"\" src=\"http://img5.gomein.net.cn/image/bbcimg/productDesc/descImg/201501/desc04/A0005143105/3851475.jpg\" /> \r\n</p>"}]}


// cart Data
var cartdata = {"status":0,"message":[{"cou":1,"id":87,"title":"华为（HUAWEI）荣耀6Plus 16G双4G版","sell_price":2195,"thumb_path":"http://demo.dtcms.net/upload/201504/20/thumb_201504200046589514.jpg"},{"cou":1,"id":88,"title":"苹果Apple iPhone 6 Plus 16G 4G手机（联通三网版）","sell_price":5780,"thumb_path":"http://demo.dtcms.net/upload/201504/20/thumb_201504200059017695.jpg"},{"cou":1,"id":89,"title":"小米（Mi）小米Note 16G双网通版","sell_price":2199,"thumb_path":"http://demo.dtcms.net/upload/201504/20/thumb_201504200119256512.jpg"}]}






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

  if(req.url === '/api/getcomments/87?pageindex=1'){
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080"); // 设置可访问的源
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify(comment87))
  }

  if(req.url === '/api/getcomments/88?pageindex=1'){
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080"); // 设置可访问的源
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify(comment88))
  }

  if(req.url === '/api/getcomments/89?pageindex=1'){
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080"); // 设置可访问的源
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify(comment89))
  }



  // add comment
  if(req.url === '/api/postcomment/13'){
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080"); // 设置可访问的源
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify(comment13))
  }

  //add share photo category
  if(req.url === '/api/getimgcategory'){
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080"); // 设置可访问的源
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify(imgcategory))
  }

//response for photo list
if(req.url === '/api/getimages/0'){
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080"); // 设置可访问的源
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(photolist0))
}
if(req.url === '/api/getimages/17'){
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080"); // 设置可访问的源
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(photolist17))
}
if(req.url === '/api/getimages/18'){
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080"); // 设置可访问的源
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(photolist18))
}
if(req.url === '/api/getimages/19'){
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080"); // 设置可访问的源
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(photolist19))
}
if(req.url === '/api/getimages/20'){
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080"); // 设置可访问的源
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(photolist20))
}

//response photodetails

if(req.url === '/api/getimageInfo/37'){
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080"); // 设置可访问的源
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(photodetail37))
}


if(req.url === '/api/getimageInfo/38'){
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080"); // 设置可访问的源
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(photodetail38))
}

if(req.url === '/api/getimageInfo/39'){
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080"); // 设置可访问的源
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(photodetail39))
}

// response thumb picture
if(req.url === '/api/getthumimages/37'){
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080"); // 设置可访问的源
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(thumbpic37))
}
if(req.url === '/api/getthumimages/38'){
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080"); // 设置可访问的源
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(thumbpic38))
}
if(req.url === '/api/getthumimages/39'){
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080"); // 设置可访问的源
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(thumbpic39))
}


//response goods request
if(req.url === '/api/getgoods?pageindex=1'){
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080"); // 设置可访问的源
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(goodspage1))
}if(req.url === '/api/getgoods?pageindex=2'){
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080"); // 设置可访问的源
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(goodspage2))
}

// response goods slide picture
if(req.url === '/api/getthumimages/87'){
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080"); // 设置可访问的源
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(slide87))
}
if(req.url === '/api/getthumimages/88'){
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080"); // 设置可访问的源
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(slide88))
}
if(req.url === '/api/getthumimages/89'){
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080"); // 设置可访问的源
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(slide89))
}


//response goods itemdetails87
if(req.url === '/api/goods/getinfo/87'){
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080"); // 设置可访问的源
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(itemdetails87))
}
if(req.url === '/api/goods/getinfo/88'){
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080"); // 设置可访问的源
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(itemdetails88))
}
if(req.url === '/api/goods/getinfo/89'){
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080"); // 设置可访问的源
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(itemdetails89))
}

// response goods desc
if(req.url === '/api/goods/getdesc/87'){
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080"); // 设置可访问的源
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(goodsdesc87))
}
if(req.url === '/api/goods/getdesc/88'){
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080"); // 设置可访问的源
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(goodsdesc88))
}
if(req.url === '/api/goods/getdesc/89'){
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080"); // 设置可访问的源
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(goodsdesc89))
}


// response shoppint cart data
if(req.url === '/api/goods/getshopcartlist/88,87'){
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080"); // 设置可访问的源
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(cartdata))
}
if(req.url === '/api/goods/getshopcartlist/87,88'){
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080"); // 设置可访问的源
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(cartdata))
}



}).listen(3000, function(){
  console.log('please visit http://localhost:3000')
})
