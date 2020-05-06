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


import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

var cart = JSON.parse(localStorage.getItem('cart') || '[]')


var store = new Vuex.Store({
  state: {  //this.$store.stat..***
    cart: [], // data from cart.  Like: { id: item ID, count: quantity, price: sale_price, selected: true }
    usercart: [], // data for online cart items
    watchList:[], // used to save user's watchlist
    // userWatchList:[], // used to save login user's watch list
    api_token:'',
  },
  mutations: {  // this.$store.commit('***', 'paramiter')

  getUserToken(state){
    state.api_token = localStorage.getItem('api_token')
  },

  getWatchList(state){

    var currentList = 'watchList'
 
    if(state.api_token )  // if has token
      {
        console.log('main has token for userWatchList')
        currentList = 'userWatchList'
      }
      

    if(localStorage.getItem(currentList) != null){
      state.watchList = JSON.parse(localStorage.getItem(currentList))
    }
    
  },

  getShoppingCart(state){
    if(localStorage.getItem('cart') != null){
      state.cart = JSON.parse(localStorage.getItem('cart'))
    }
  },
 
    addToCart(state, goodsinfo){
      // console.log(state.api_token)
      if(!state.api_token )  // if no token
      {

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
      }else{  // if found token
        // usercart used save online cart item
        console.log(state.usercart)
        var flag = false
        state.usercart.some( item => {
          if(item.id == goodsinfo.id ){
            item.count += parseInt(goodsinfo.count)
            flag = true
            console.log(item.id + "------" + goodsinfo.id)
            return true
          }
        })
        
        //if no same item in cart. Add this item.
        if(!flag){
          console.log(goodsinfo)
          state.usercart.push(goodsinfo)
        }

        // save cart to localStorage
        localStorage.setItem('usercart', JSON.stringify(state.usercart))
      }

      
      
    },



    addToWatchList(state, goodsinfo){
      // click add list. save item info to list
      // if already have same item, only need add quantity
      // if no, push item data to cart.

      //default, no item in cart
      var flag = false
      state.watchList.some( item => {  //check if item already in cart
        if(item.id == goodsinfo.id ){
          flag = true
          return true
        }
      })
      

      //if no same item in cart. Add this item.
      if(!flag){
        if(!state.api_token )  // if no token
        {
          console.log("main no token part")
          state.watchList.push(goodsinfo)

          // save cart to localStorage
          localStorage.setItem('watchList', JSON.stringify(state.watchList))
        }else{    // if has token
          console.log("main has token part")
          state.watchList.push(goodsinfo)


          // save cart to localStorage
          localStorage.setItem('userWatchList', JSON.stringify(state.watchList))
        }




        
      }
    },


    addApiToken(state, token){
      state.api_token = token;
      localStorage.setItem('api_token', JSON.stringify(state.api_token))
    },

    removeApiToken(state, token){
      state.api_token = '';
      localStorage.setItem('api_token', '')
    },


    updateGoodsInfo(state, goodsinfo){ //update goods qantity on cart
      
      if(!state.api_token )  // if no token
      {
        // update quantity
        state.cart.some(item=> {
          if(item.id == goodsinfo.id) {
            item.count = parseInt(goodsinfo.count)
            return true
          }
        })

        // update quantity, save data to localStorage
        localStorage.setItem('cart', JSON.stringify(state.cart))
      }else{// if has token
        // update quantity
        state.usercart.some(item=> {
          if(item.id == goodsinfo.id) {
            item.count = parseInt(goodsinfo.count)
            return true
          }
        })

        // update quantity, save data to localStorage
        localStorage.setItem('usercart', JSON.stringify(state.usercart))
      }
      

    
    
    
    
    
    
    
    
    
    
    },

    removeFromCart(state, id){  // remove item from store
      console.log(typeof(state.cart))
      state.cart.some((item, i) => {
        if(item.id == id){
          state.cart.splice(i, 1)
          return true;
        }
      })

      // save cart to localStorage
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },


    removeFromWatchList(state, id){  // remove item from store

      if(!state.api_token )  // if no token
      {

        console.log(state.watchList)
        state.watchList.some((item, i) => {
          if(item.id == id){
      
            state.watchList.splice(i, 1)
          

            return true;
          }
        })

        // save cart to localStorage
        localStorage.setItem('watchList', JSON.stringify(state.watchList))
      }else{
        state.watchList.some((item, i) => {
          if(item.id == id){
      
            state.watchList.splice(i, 1)
          

            return true;
          }
        })

        // save cart to localStorage
        localStorage.setItem('userWatchList', JSON.stringify(state.watchList))
      }





    },

    

    updateGoodsSelected(state, info){

      if(!state.api_token )  // if no token
      {
        state.cart.some(item => {
          if(item.id == info.id){
            item.selected = info.selected
          }
        })
        // update status, save data to localStorage
        localStorage.setItem('cart', JSON.stringify(state.cart))

      }else{// if has token
        state.usercart.some(item => {
          if(item.id == info.id){
            item.selected = info.selected
          }
        })
        // update status, save data to localStorage
        localStorage.setItem('usercart', JSON.stringify(state.usercart))
      }





    }
  },
  getters:{ // this.$store.getters.****
            // like computed
            // like filter
      

      getAllCount(state){

        if(!state.api_token )  // if no token
      {
        var c = 0;
        state.cart.forEach( item => {
          c += item.count
        })
        return c
      }else{// if has token 
        var c = 0;
        state.usercart.forEach( item => {
          c += item.count
        })
        return c
      }



        




      },

      getGoodsCount(state){
        var o = {}
        state.cart.forEach( item => {
          o[item.id] = item.count
        })
        return o
      },

      getGoodsSelected(state){
        var o = {}
        state.cart.forEach( item => {
          o[item.id] = item.selected
        })
        return o
      },

      getGoodsCountAndAmount(state){
        
      if(!state.api_token )  // if no token
      {
        var o = {
          count: 0,   // selected quantity
          amount: 0   // totoal price
        }
        state.cart.forEach( item=> {
          if(item.selected){
            o.count += item.count
            o.amount += item.price * item.count
          }
        })
        return o
      }else{// if has token 
        var o = {
          count: 0,   // selected quantity
          amount: 0   // totoal price
        }
        state.usercart.forEach( item=> {
          if(item.selected){
            o.count += item.count
            o.amount += item.price * item.count
          }
        })
        return o
      }
        





      },

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
Vue.http.options.root = 'http://shoppingserver.willin.xyz/';

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