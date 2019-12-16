import Vue from 'vue'

// imort Minit UI component

import { Header } from 'mint-ui';

import { Tabbar, TabItem } from 'mint-ui';

Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);



import 'mint-ui/lib/style.css'





Vue.component(Header.name, Header);


import app from './App.vue'

var vm = new Vue({
  el: '#app',
  render: c => c(app)
})