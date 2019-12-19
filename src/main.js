import Vue from 'vue'

// import router
import VueRouter from 'vue-router'
// use router
Vue.use(VueRouter)

// import router
import router from './router.js'



// import MUI css
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

//import 
import 'mint-ui/lib/style.css'



//import Minit-UI component
import { Header, Swipe, SwipeItem } from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);


//import vue-resource
import VueResource from 'vue-resource'
// use vue-resource
Vue.use(VueResource)


//import App component
import app from './App.vue'

var vm = new Vue({
  el: '#app',
  render: c => c(app),
  router //use router
})