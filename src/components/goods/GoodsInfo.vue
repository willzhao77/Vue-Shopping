<template>
    <div class="goodsinfo-container">
        <!-- slide pictures -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <SlideShow :slidelist="slide" :isfull="false"></SlideShow>
                </div>
            </div>
        </div>

        <!-- item purchase -->
        <div class="mui-card">
				<div class="mui-card-header">{{ goodsinfo.title }}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="price">
                            Market Price: <del>${{ goodsinfo.market_price }}</del>&nbsp;&nbsp; Our Price: <span class="now_price">${{ goodsinfo.sell_price }}</span>
                        </p>
                        <p>Quantity:<numbox></numbox></p>
                        <p>
                            <mt-button type="primary" size="small">Buy It Now</mt-button>
                            <mt-button type="danger" size="small">Add To Cart</mt-button>
                        </p>
					</div>
				</div>
			</div>
        <!-- item details -->
        <div class="mui-card">
				<div class="mui-card-header">Sepcification</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>Item Number: {{ goodsinfo.goods_no }}</p>
                        <p>Available: {{ goodsinfo.stock_quantity }}</p>
                        <p>Listing Time: {{ goodsinfo.add_time | dateFormat }}</p>
					</div>
				</div>
				<div class="mui-card-footer">
                    <mt-button type="primary" size="large" plain>Item Details</mt-button>
                    <mt-button type="danger" size="large" plain>Item Comment</mt-button>
                </div>
			</div>

    </div>
</template>

<script>
import SlideShow from '../subcomponents/SlideShow.vue'
import numbox from '../subcomponents/goodsinfo_numbox.vue'

export default {
    data(){
        return{
            id: this.$route.params.id, // save item id
            slide: [], // slide pictures 
            goodsinfo: {}   //item details
        }
    },

    created() {
        this.getSlidePictures()
        this.getGoodsInfo()
    },

    methods:{
        getSlidePictures(){
            this.$http.get("api/getthumimages/" + this.id).then(result => {
                if(result.body.status === 0 ){
                    result.body.message.forEach( item => {
                        item.img = item.src
                    })
                    this.slide = result.body.message
                }
            })
        },

        getGoodsInfo(){
            this.$http.get('api/goods/getinfo/' + this.id).then(result => {
                if(result.body.status === 0 ){
                    this.goodsinfo = result.body.message[0]
                }
            })
        }
    },

    components:{
        SlideShow,
        numbox

    }
}
</script>

<style lang="scss" scoped>
.goodsinfo-container{
    background-color: #eee;
    overflow:hidden;

    .now_price{
        color: red;
        font-size: 16px;
        font-weight: bold;
    }
    .mui-card-footer{
        display: block;
        button{
             margin: 15px 0;
        }
    }
}
</style>