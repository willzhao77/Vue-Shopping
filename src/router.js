import VueRouter from 'vue-router'


// import component
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcartContainer from './components/tabbar/ShopcartContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import PersonContainer from './components/tabbar/PersonContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotoList from './components/photos/PhotoList.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'
import GoodsList from './components/goods/GoodsList.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'
import GoodsDesc from './components/goods/GoodsDesc.vue'
import GoodsComment from './components/goods/GoodsComment.vue'
import ContactUs from './components/contact/ContactUs.vue'
import WatchList from './components/watchlist/WatchList.vue'
import login from './components/login/login.vue'
import register from './components/login/register.vue'
import details from './components/person/details.vue'
import checkout from './components/shopping/checkout.vue'
import confirm from './components/shopping/confirm.vue'

// 3. 创建路由对象
var router = new VueRouter({
  routes: [
    {path: '/', redirect: '/home'},
    {path: '/home', component: HomeContainer},
    {path: '/member', component: MemberContainer},
    {path: '/shopcart', component: ShopcartContainer},
    {path: '/search', component: SearchContainer},
    {path: '/person', component: PersonContainer},
    {path: '/home/newslist', component: NewsList},
    {path: '/home/newsinfo/:id', component: NewsInfo},
    {path: '/home/photolist', component: PhotoList},
    {path: '/home/photoInfo/:id', component: PhotoInfo},
    {path: '/home/goodslist/', component: GoodsList},
    {path: '/home/goodsinfo/:id', component: GoodsInfo},
    {path: '/home/goodsdesc/:id', component: GoodsDesc, name: 'goodsdesc' },
    {path: '/home/goodscomment/:id', component: GoodsComment, name: 'goodscomment' },
    {path: '/home/contactus', component: ContactUs},
    {path: '/home/watchlist', component: WatchList},
    {path: '/login', component: login},
    {path: '/register', component: register},
    {path: '/details', component: details},
    {path: '/shopping/checkout', component: checkout},
    {path: '/shopping/confirm', component: confirm},

  ],
  linkActiveClass:'mui-active' //replace active link class
})

// 把路由对象暴露出去
export default router