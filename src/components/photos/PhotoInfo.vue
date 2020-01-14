<template>
    <div>
        <h3>Title</h3>
        <p class="subtitle">
            <span>Time:</span>
            <span>Clicked:</span>
        </p>
        <hr>

        <!-- small picture area -->


        <!-- picture content -->
        <div class="content"></div>

        <!-- comment -->


    </div>
</template>

<script>
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
    }
}
</script>

<style lang="scss" scoped>

</style>