import VueRouter from 'vue-router'


// import component
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcartContainer from './components/tabbar/ShopcartContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotoList from './components/photos/PhotoList.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'
import GoodsList from './components/goods/GoodsList.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'


// 3. 创建路由对象
var router = new VueRouter({
  routes: [
    {path: '/', redirect: '/home'},
    {path: '/home', component: HomeContainer},
    {path: '/member', component: MemberContainer},
    {path: '/shopcart', component: ShopcartContainer},
    {path: '/search', component: SearchContainer},
    {path: '/home/newslist', component: NewsList},
    {path: '/home/newsinfo/:id', component: NewsInfo},
    {path: '/home/photolist', component: PhotoList},
    {path: '/home/photoInfo/:id', component: PhotoInfo},
    {path: '/home/goodslist/', component: GoodsList},
    {path: '/home/goodsinfo/:id', component: GoodsInfo}
  ],
  linkActiveClass:'mui-active' //replace active link class
})

// 把路由对象暴露出去
export default router