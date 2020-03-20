<template>
    <!-- use watch check max value from parent component -->
    <div class="mui-numbox" data-numbox-min='1' style="height:25px">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
            <input id="test" class="mui-input-numbox" type="" :value="initcount" @change="countChanged" ref="numbox" readonly />
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
	</div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js';
export default { 
    mounted(){
        mui(".mui-numbox").numbox();
        // console.log(this.max)
    },

    methods:{
        countChanged(){

            if(!this.$store.state.api_token )  // if no token
            {
            // console.log(this.goodsid)
            // update quantity from cart when quantity changed
            this.$store.commit('updateGoodsInfo', {
                id: this.goodsid,
                count: this.$refs.numbox.value
                })
            }else{  // if found token
                let goodInfo = [{id: this.goodsid, count: this.$refs.numbox.value}]

                let data = {
                    items : JSON.stringify(goodInfo),
                    opt: '', //  add opt as flag. if user click, will add related item to cart.
                }
                this.$http.put('http://127.0.0.1:8000/api/usercart/' + JSON.parse(this.$store.state.api_token).api_token, data).then( response=> {
                console.log(response)
                    // this.$router.push('/person')
                })

                this.$store.commit('updateGoodsInfo', {
                id: this.goodsid,
                count: this.$refs.numbox.value
                })

            }
            
            
        }
    },

    props:["initcount", "goodsid"]

}
</script>

<style lang="scss" scoped>

</style>