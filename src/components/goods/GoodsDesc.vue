<template>
    <div class="goodsdesc-container">
        <h3>{{ info.title }}</h3>

        <hr>

        <div class="content" v-html="info.content"></div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            info: {},  // item datails
            test:'',
            showFoot:true //show footbar

        }
    },

    created(){
        this.getGoodsDesc();
        this.sendDataToParent();
    },

    methods:{
        sendDataToParent(){
            this.$emit('footerStatus',this.showFoot)
        },
        getGoodsDesc(){
            this.$http.get('https://shoppingserver.willin.xyz/api/shopitemdetails/' + this.$route.params.id).then(result => {
                if(result.body.status === 0 ){
                    this.info = result.body.message


                    console.log(this.info.content)
                    console.log(this.test)
                }
        })
        }
    }
}
</script>


<style lang="scss">
.goodsdesc-container{
    padding: 4px;
    h3{
        font-size: 16px;
        color: #22aff2;
        text-align: center;
        margin: 15px 0;
    }

    .content{
        img{
            width: 100%;
        }
    }


}
</style>
