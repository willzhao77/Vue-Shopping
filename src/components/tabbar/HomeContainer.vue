<template>
    <div>
        <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in slideList" :key="item.img">
            <img :src="item.img" alt="">
        </mt-swipe-item>
            
        </mt-swipe>
        <h3>Home Container</h3>
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
            this.$http.get('http://localhost:3000/lunbo').then(result =>{
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
</style>