<template>
    <div class="photoinfo-container">
        <h3>{{ photoinfo.title }}</h3>
        <p class="subtitle">
            <span>Time: {{ photoinfo.created_at| dateFormat }}</span>
            <span>Clicked: {{ photoinfo.clicked }}</span>
        </p>
        <hr>

        <!-- small picture area -->
        <vue-preview :slides="slide1" @close="handleClose"></vue-preview>

        <!-- picture content -->
        <div class="content" v-html="photoinfo.description"></div>

        <!-- comment -->
        <cmt-box :id="id" :whichcomment="'sharecomment'"></cmt-box>

    </div>
</template>

<script>
//import comment component
import comment from '../subcomponents/comment.vue'


export default {
    data(){
        return {
            id: this.$route.params.id, // get ID from URL
            photoinfo: {}, //picture detail
            slide1: [], // preview picture array
            showFoot:false //Do Not show footbar 
        }
    },
    created(){
       this.getPhotoInfo()
       this.getThumbs() 
       this.sendDataToParent()
    },
    methods:{
        sendDataToParent(){
            this.$emit('footerStatus',this.showFoot)
        },
        getPhotoInfo(){ //get picture detail
            this.$http.get('api/shareitem/' + this.id).then(result => {
                if(result.body.status === 0 ){
                    this.photoinfo = result.body.message
                }
            })
        },

        getThumbs(){
            this.$http.get('api/shareitemimgs/' + this.id).then(result =>{
                if(result.body.status === 0 ){
                    //loop all pictures and all w and h
                    result.body.message.forEach(item => {
                        item.msrc = item.src
                        item.w = 600;
                        item.h = 400;
                    });
                    this.slide1 = result.body.message
                }
            })
        },

        handleClose () {
            console.log('close event')
        }


    },

    components:{
        // register comment component
        "cmt-box": comment
    }
}
</script>

<style lang="scss">
.pswp__img{
    height:auto !important; // fix share detail picture resolution
    margin: 0 !important;  // display big picture no margin
}

.pswp__zoom-wrap{
    transform: translate3d(0px, 100px, 0px) !important;
}



.photoinfo-container{
    padding: 3px;
    h3{
        color: #26A2FF;
        font-size: 15px;
        text-align: center;
        margin: 15px 0 ;
    }
    
    .subtitle{
        display: flex;
        justify-content: space-between;
        font-size: 13px;
    }

    .content{
        font-size: 13px;
        line-height: 30px;
    }

    img {
        height: 80px;
        margin: 10px;
        
        box-shadow: 0 0 8px #999;
    }

   figure{
       display: inline-block;
       margin: 0;
     
   }

}
</style>