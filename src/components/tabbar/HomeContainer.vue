<template>
    <div>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in slideList" :key="item.img">
                <img :src="item.img" alt="">
            </mt-swipe-item>
        </mt-swipe>

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
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img  src="/images/menu4.png" alt="">
		                    <div class="mui-media-body">Feedback</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img  src="/images/menu5.png" alt="">
		                    <div class="mui-media-body">Video</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img  src="/images/menu6.png" alt="">
		                    <div class="mui-media-body">Contact us</div></a></li>
		        </ul> 


    </div>
</template>

<script>

import { Toast } from 'mint-ui'

export default {
    data(){
        return{
            slideList:[] // save slide pictures
        }
    },
    created(){
        this.getSlidePictures();
    },
    methods:{
        getSlidePictures(){ //get pictures for slides
            this.$http.get('lunbo').then(result =>{
                // console.log(result.body);
                if(result.body.status === 0){
                    this.slideList = result.body.message  //success 
                }else{
                    Toast('Slide pictures loading faild')
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.mint-swipe{
    height:200px;
    .mint-swipe-item{
        &:nth-child(1){
            background: red;
        }
        &:nth-child(2){
            background:blue;
        }
        &:nth-child(3){
            background: cyan;
        }

        img{
            width: 100%;
            height: 100%;
        }
    }
}

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