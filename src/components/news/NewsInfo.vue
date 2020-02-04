<template>
    <div class="newsinfo-container">
        <!-- title -->
        <h3 class="title">{{ newsinfo.title }}</h3>
        <!-- subtitle -->
        <p class="subtitle">
            <span>Time:{{ newsinfo.created_at | dateFormat }}</span>
            <span>Clicked: {{newsinfo.clicked }}</span>
        </p>
        <hr>
        <!-- content -->
        <div class="content" v-html="newsinfo.content"></div>

        <!-- comment component -->
        <comment-box :id="this.id" :whichcomment="'newscomment'"></comment-box>
    </div>
</template>

<script>
//import sub component
import comment from '../subcomponents/comment.vue'


export default {
    data(){
        return{
            id: this.$route.params.id,  //save URL's ID to Data. 
            newsinfo: {},    // news object
        }
    },
    created(){
        this.getNewsInfo()
    },

    methods:{
        getNewsInfo(){  //get news details
            this.$http.get('api/newsinfo/' + this.id).then(result => {
                if(result.body.status === 0 ){
                    this.newsinfo = result.body.message;
                }else{
                    Toast('Load news details faild.')
                }
            })
        }
    },

    components:{
        'comment-box': comment
    }
    
}
</script>


<style lang="scss">
.newsinfo-container{
    padding: 0 4px;
    .title{
        font-size: 16px;
        text-align: center;
        margin: 15 0;
        color: red;
    }
    .subtitle{
        font-size: 13px;
        color: #226aff;
        display: flex;
        justify-content: space-between;
    }
    .content{
        img{
            width: 100%
        }
    }
}
</style>