<template>
    <div>
        <mt-swipe :auto="4000">
        <mt-swipe-item>1</mt-swipe-item>
        <mt-swipe-item>2</mt-swipe-item>
        <mt-swipe-item>3</mt-swipe-item>
        </mt-swipe>

        <h3>Home Container</h3>
    </div>
</template>

<script>
export default {
    
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
    }
}
</style>