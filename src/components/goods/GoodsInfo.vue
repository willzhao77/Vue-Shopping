<template>
    <div class="goodsinfo-container">
        <!-- slide pictures -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <SlideShow :slidelist="slide" :isfull="false"></SlideShow>
                </div>
            </div>
        </div>

        <!-- item purchase -->
        <div class="mui-card">
				<div class="mui-card-header">页眉</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						包含页眉页脚的卡片，页眉常用来显示面板标题，页脚用来显示额外信息或支持的操作（比如点赞、评论等）
					</div>
				</div>
			</div>
        <!-- item details -->
        <div class="mui-card">
				<div class="mui-card-header">页眉</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						包含页眉页脚的卡片，页眉常用来显示面板标题，页脚用来显示额外信息或支持的操作（比如点赞、评论等）
					</div>
				</div>
				<div class="mui-card-footer">页脚</div>
			</div>

    </div>
</template>

<script>
import SlideShow from '../subcomponents/SlideShow.vue'

export default {
    data(){
        return{
            id: this.$route.params.id, // save item id
            slide: [] // slide pictures 
        }
    },

    created() {
        this.getSlidePictures()
    },

    methods:{
        getSlidePictures(){
            this.$http.get("api/getthumimages/" + this.id).then(result => {
                if(result.body.status === 0 ){
                    result.body.message.forEach( item => {
                        item.img = item.src
                    })
                    this.slide = result.body.message
                }
            })
        }
    },

    components:{
        SlideShow
    }
}
</script>

<style lang="scss" scoped>
.goodsinfo-container{
    background-color: #eee;
    overflow:hidden;
}
</style>