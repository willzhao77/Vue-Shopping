<template>
    <div>
        <!-- <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in slideList" :key="item.img">
                <img :src="item.img" alt="">
            </mt-swipe-item>
        </mt-swipe> -->
        <SlideShow :slidelist="slidelist" :isfull="true"></SlideShow>     

        <!-- gride  -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/home/newslist">
                            <img  src="/images/menu1.png" alt="">
		                    <div class="mui-media-body">News</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/home/photolist">
		                    <img  src="/images/menu2.png" alt="">
		                    <div class="mui-media-body">Share</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/home/goodslist">
		                    <img  src="/images/menu3.png" alt="">
		                    <div class="mui-media-body">Shopping</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <a href="#">
		                    <img  src="/images/menu4.png" alt="">
		                    <div class="mui-media-body">Message</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/home/watchlist">
		                    <img  src="/images/menu5.png" alt="">
		                    <div class="mui-media-body">Watchlist</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/home/contactus">
		                    <img  src="/images/menu6.png" alt="">
		                    <div class="mui-media-body">Contact us</div></router-link></li>
		        </ul> 


    </div>
</template>

<script>
import SlideShow from '../subcomponents/SlideShow.vue'
import { Toast } from 'mint-ui'

export default {
    data(){
        return{
            slidelist:[] // save slide pictures
        }
    },
    created(){
        this.getSlidePictures();
    },
    methods:{
        getSlidePictures(){ //get pictures for slides
            this.$http.get('api/slideshow').then(result =>{
                // console.log(result.body);
                if(result.body.status === 0){
                    console.log(result.body.message)
                    this.slidelist = result.body.message  //success 
                }else{
                    Toast('Slide pictures loading faild')
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


.mui-grid-view.mui-grid-9{
    background-color: #fff;
    border: none;
    img{
        width: 60px;
        height: 60px;
    }
    }
.mui-grid-view.mui-grid-9 .mui-table-view-cell{
    border: none;
    .mui-media-body{
    font-size: 12px
}
}



</style>