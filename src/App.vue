<template>
	<div class="app-container">

		<!-- top head -->
			<mt-header fixed title="Vue Project">
				<span to="/" slot="left" @click="goBack" v-show="flag">
					<mt-button icon="back">Back</mt-button>
				</span>
			</mt-header>
			

		<!-- center area -->
		<transition>
			<!-- <keep-alive include="a"> -->
				<router-view v-on:footerStatus = "ifShowFooter"></router-view>
			<!-- </keep-alive> -->
		</transition>
		



		<!-- bottom -->
		<nav class="mui-bar mui-bar-tab" @click="loadToken" v-show="isShow">
				<router-link class="mui-tab-item-b" to="/home">
					<span class="mui-icon mui-icon-home"></span>
					<span class="mui-tab-label">Home</span>
				</router-link>
				<!-- <router-link class="mui-tab-item-b" to="/member">
					<span class="mui-icon mui-icon-contact"></span>
					<span class="mui-tab-label">Member</span>
				</router-link> -->
				<router-link class="mui-tab-item-b" to="/shopcart">
					<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id="badge">{{ $store.getters.getAllCount }}</span></span>
					<span class="mui-tab-label">Cart</span>
				</router-link>
				<router-link class="mui-tab-item-b" to="/search">
					<span class="mui-icon mui-icon-search"></span>
					<span class="mui-tab-label">Search</span>
				</router-link>
				<router-link class="mui-tab-item-b" to= "/person">
					<span class="mui-icon mui-icon-person"></span>
					<span class="mui-tab-label" >me</span>
				</router-link>
		</nav>
	</div>
</template>

<script>
export default {
  name: 'page-tabbar',
  data() {
    return {
	flag : false,
	mepage: '',
	isShow:true,
    }
  },
  
  created(){
	  this.flag = this.$route.path === '/home' ? false : true
		this.$store.commit('getShoppingCart')
	console.log(this.$route.path)
	  this.loadToken()
// this.$store.commit('getUserToken')
// console.log(this.$store.state.api_token)
// 	  if(this.$store.state.api_token =='' || typeof this.$store.state.api_token === 'undefined' || this.$store.state.api_token == null)
// 	  {
// 		//   console.log(this.$store.state.api_token)
// 		  this.mepage = "/login"
// 		//   console.log("login")
// 	  }else{
// 		//   console.log(this.$store.state.api_token)
// 		//   console.log('to person')
// 		  this.mepage = "/person"
//       }
  },

  methods:{
	goBack(){
		//click go back
		if(this.$route.path === "/login"){
			this.$router.push("/")
		}else{
			this.$router.go(-1)
		}

		
		

		
	},

	ifShowFooter(val){   //check if show footer from child component
			this.isShow = val
        },

	isFootShow(data){
		this.isShow = data
	},

	loadToken(){
		this.$store.commit('getUserToken')
		console.log(this.$store.state.api_token)
	  if(this.$store.state.api_token =='' || typeof this.$store.state.api_token === 'undefined' || this.$store.state.api_token == null)
	  {
		//   console.log(this.$store.state.api_token)
		  this.mepage = "/login"
		//   console.log("login")
	  }else{
		  this.$http.get('api/userdetails/' + JSON.parse(this.$store.state.api_token).api_token).then( response=> {
			if( !response.body){
				// console.log("Token not avaiable")
				 this.mepage = "/login"

			}else{
				// console.log("Token avaiable")
				this.mepage = "/person"
			}

		  })


		//   console.log(this.$store.state.api_token)
		//   console.log('to person')
		  
      }

	},


  },

  watch:{
	  "$route.path": function(newVal){
		  if (newVal === "/home"){
			  this.flag = false
		  }else{
			  this.flag = true
		  }
	  }
  }
}


</script>


<style lang="scss" scoped>

.mint-header{
	z-index: 99;
}

.app-container{
  padding-top: 40px;
  padding-bottom: 50px;
  overflow-x: hidden; // fix Animation over screen on X
}

.v-enter
{
	opacity: 0;
	transform: translateX(100%);  // Animation start from right side 100%
}

.v-leave-to{
	opacity: 0;
	transform: translateX(-100%);// Animation finish from left side 100%
	position: absolute; //Animation, leave and start at same X-level.
}

.v-enter-active,
.v-leave-active{
	transition: all 0.5s ease;
}
</style>