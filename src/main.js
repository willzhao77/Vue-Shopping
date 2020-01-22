import Vue from 'vue'

// import router
import VueRouter from 'vue-router'
// use router
Vue.use(VueRouter)

// import router
import router from './router.js'

//import Vuex
import Vuex from 'vuex'
Vue.use(Vuex)


var cart = JSON.parse(localStorage.getItem('cart') || '[]')


var store = new Vuex.Store({
  state: {  //this.$store.stat..***
    cart: cart // data from cart.  Like: { id: item ID, count: quantity, price: sale_price, selected: true }
  },
  mutations: {  // this.$store.commit('***', 'paramiter')
    addToCart(state, goodsinfo){
      // click add cart. save item info to cart
      // if already have same item, only need add quantity
      // if no, push item data to cart.

      //default, no item in cart
      var flag = false
      state.cart.some( item => {
        if(item.id == goodsinfo.id ){
          item.count += parseInt(goodsinfo.count)
          flag = true
          return true
        }
      })
      
      //if no same item in cart. Add this item.
      if(!flag){
        state.cart.push(goodsinfo)
      }

      // save cart to localStorage
      localStorage.setItem('cart', JSON.stringify(state.cart))
      
    }
  },
  getters:{ // this.$store.getters.****
            // like computed
            // like filter
      getAllCount(state){
        var c = 0;
        state.cart.forEach( item => {
          c += item.count
        })
        return c
      }

  }
})



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
  router, //use router
  store,  // use store
})