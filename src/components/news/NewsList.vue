<template>
    <div>
        <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
					<router-link :to="'/home/newsinfo/' + item.id">
						<img class="mui-media-object mui-pull-left" :src="item.img">
						<div class="mui-media-body">
							<h1>{{ item.title }}</h1>
							<p class='mui-ellipsis'>
                                <span>Time: {{ item.add_time | dateFormat }}</span>
                                <span>Clicked: {{ item.clicked }} Times</span>
                            </p>
						</div>
					</router-link>
				</li>


			</ul>
    </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
    data(){
        return {
            newslist: [], //news List
            showFoot:true, //show footbar
        };
    },
    created(){
        this.getNewsList()
        this.sendDataToParent()
    },
    methods:{
        sendDataToParent(){
            this.$emit('footerStatus',this.showFoot)
        },
        getNewsList(){ //get news list
            this.$http.get('https://shoppingserver.willin.xyz/api/newslist').then(result => {
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
