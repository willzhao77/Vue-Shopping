<template>
    <div>
        <h4>Your order is confirmed</h4>
    </div>
</template>

<script>
export default {
    data(){
      return {
          showFoot:true, //show footbar 

      }
    },

    created() {
        this.sendDataToParent()
    }, 

    methods:{
        sendDataToParent(){
            this.$emit('footerStatus',this.showFoot)
        },
    }
}
</script>

<style lang="stylus" scoped>

</style>