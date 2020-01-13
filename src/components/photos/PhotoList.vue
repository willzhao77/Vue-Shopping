<template>
    <div>
        <!-- top slide -->
        <div id="slider" class="mui-slider">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll">
						<a :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']" v-for="item in cates" :key=item.id>
							{{ item.title }}
						</a>
						
					</div>
				</div>

			</div>
    </div>
</template>

<script>
//import MUI JS
import mui from '../../lib/mui/js/mui.min.js'

export default {
    data(){
			return{
				cates: []  // category list
			}
		},

		created(){
			this.getAllCategory()
		},
		
		mounted(){
			// init 
			// if need control element, it is better control at this moment. the DOM is the newest.
			mui('.mui-scroll-wrapper').scroll({
			deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
		});
		},
    methods:{
			getAllCategory(){
				this.$http.get("api/getimgcategory").then(result => {
					if(result.body.status === 0 ){
						//manually create a full category list
						result.body.message.unshift({ title: "All", id: 0 })
						this.cates = result.body.message
					}
				})
			}
    }
}
</script>

<style lang="scss" scoped>
*{
	touch-action: pan-y
}
</style>