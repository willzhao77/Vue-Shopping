<template>
    <div class="photoinfo-container">
        <h3>{{ photoinfo.title }}</h3>
        <p class="subtitle">
            <span>Time: {{ photoinfo.add_time | dateformat }}</span>
            <span>Clicked: {{ photoinfo.click }}</span>
        </p>
        <hr>

        <!-- small picture area -->


        <!-- picture content -->
        <div class="content" v-html="photoinfo.content"></div>

        <!-- comment -->
        <cmt-box :id="id"></cmt-box>

    </div>
</template>

<script>
//import comment component
import comment from '../subcomponents/comment.vue'


export default {
    data(){
        return {
            id: this.$route.params.id, // get ID from URL
            photoinfo: {} //picture detail
        }
    },
    created(){
       this.getPhotoInfo(); 
    },
    methods:{
        getPhotoInfo(){ //get picture detail
        this.$http.get('api/getimageInfo/' + this.id).then(result => {
            if(result.body.status === 0 ){
                this.photoinfo = result.body.message[0]
            }
        })

        }
    },

    components:{
        // register comment component
        "cmt-box": comment
    }
}
</script>

<style lang="scss" scoped>
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
}
</style>