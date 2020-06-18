<template>
    <div>
        <cmtbox :id="$route.params.id" :whichcomment="'shopitemcomment'"></cmtbox> 
    </div>
</template>

<script>
import cmtbox from '../subcomponents/comment.vue'
export default {
    components:{
        cmtbox
    },

    data(){
      return 
        showFoot:false //Do Not show footbar 
      },
     created(){
        this.sendDataToParent();
    },
    methods:{
        sendDataToParent(){
            this.$emit('footerStatus',this.showFoot)
        },
    }


}
</script>


<style lang="scss" scoped>

</style>