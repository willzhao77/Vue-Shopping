<template>
    <div>
        <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
					<a href="javascript:;">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							<h1>{{ item.title }}</h1>
							<p class='mui-ellipsis'>
                                <span>Time: {{ item.add_time }}</span>
                                <span>Clicked: {{ item.click }} Times</span>
                            </p>
						</div>
					</a>
				</li>
		

			</ul>
    </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
    data(){
        return {
            newslist: [] //news List
        };
    },
    created(){
        this.getNewsList()
    },
    methods:{
        getNewsList(){ //get news list
            this.$http.get('getnewslist').then(result => {
                if(result.body.status === 0){
                    //if get data from server, save data
                    this.newslist = result.body.message;
                }else{
                    Toast("Load news list faild...")
                }
            })
        }
    }
    
}
</script>

<style lang="scss" scoped>
.mui-table-view{
    li{
        h1{
            font-size: 14px
        }
        .mui-ellipsis{
            font-size: 12px;
            color: #226aff;
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>