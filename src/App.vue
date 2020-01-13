<template>
	<div class="app-container">

		<!-- top head -->
			<mt-header fixed title="Vue Project"></mt-header>


		<!-- center area -->
		<transition>
			<router-view></router-view>
		</transition>
		



		<!-- bottom -->
		<nav class="mui-bar mui-bar-tab">
				<router-link class="mui-tab-item-b" to="/home">
					<span class="mui-icon mui-icon-home"></span>
					<span class="mui-tab-label">Home</span>
				</router-link>
				<router-link class="mui-tab-item-b" to="/member">
					<span class="mui-icon mui-icon-contact"></span>
					<span class="mui-tab-label">Member</span>
				</router-link>
				<router-link class="mui-tab-item-b" to="/shopcart">
					<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id="badge">0</span></span>
					<span class="mui-tab-label">Cart</span>
				</router-link>
				<router-link class="mui-tab-item-b" to="/search">
					<span class="mui-icon mui-icon-search"></span>
					<span class="mui-tab-label">Search</span>
				</router-link>
		</nav>       
	</div>
</template>

<script>
export default {
  name: 'page-tabbar',
  data() {
    return {
      selected: 'tab1'
    };
  }
};


</script>


<style lang="scss" scoped>
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