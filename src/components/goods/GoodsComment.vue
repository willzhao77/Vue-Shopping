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
    } 
}
</script>


<style lang="scss" scoped>

</style>