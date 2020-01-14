import Vue from 'vue'

// import router
import VueRouter from 'vue-router'
// use router
Vue.use(VueRouter)

// import router
import router from './router.js'



// import MUI css
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'

//import 
import 'mint-ui/lib/style.css'



//import Minit-UI component
// import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui';
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload)

import MintUI from 'mint-ui'
Vue.use(MintUI)

// install picture preview
import VuePreview from 'vue-preview'
Vue.use(VuePreview)




//import vue-resource
import VueResource from 'vue-resource'
// use vue-resource
Vue.use(VueResource)


// import time plugin
import moment from 'moment'

//define globle filter
Vue.filter('dateFormat', function(dataStr, pattern="YYYY-MM-DD HH:mm:ss"){
  return moment(dataStr).format(pattern)
})



//set root path
Vue.http.options.root = 'http://localhost:3000';

//set global format
Vue.http.options.emulateJSON = true;

//import App component
import app from './App.vue'

var vm = new Vue({
  el: '#app',
  render: c => c(app),
  router //use router
})