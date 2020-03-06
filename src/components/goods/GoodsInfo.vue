<template>
    <div class="goodsinfo-container">
        <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>
        
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
                        <p>Quantity:<numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox>
                        <button type="button" :class="['mui-btn', 'mui-btn-warning', {'mui-btn-outlined':!flag}]" @click="addToWatchList"><span class="mui-icon mui-icon mui-icon-star">Watchlist</span></button>
                         </p>
                        <p>
                            <mt-button type="primary" size="small">Buy It Now</mt-button>
                            <mt-button type="danger" size="small" @click="addToShopCart">Add To Cart</mt-button>
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
                    <mt-button type="primary" size="large" plain @click="goDesc(id)">Item Details</mt-button>
                    <mt-button type="danger" size="large" plain @click="goComment(id)">Item Comment</mt-button>
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
            goodsinfo: {},   //item details
            ballFlag: false,  // control ball display
            selectedCount: 1,  // save user selected item's quantity
            flag: false, // check if watched this item

        }
    },

    created() {
        this.getSlidePictures()
        this.getGoodsInfo()
        this.ifWatched()
    },

    methods:{
        getSlidePictures(){
            this.$http.get("api/shopitemimgs/" + this.id).then(result => {
                if(result.body.status === 0 ){
                    result.body.message.forEach( item => {
                        item.img = item.src
                    })
                    this.slide = result.body.message
                }
            })
        },

        getGoodsInfo(){
            this.$http.get('api/shopitem/' + this.id).then(result => {
                if(result.body.status === 0 ){
                    this.goodsinfo = result.body.message
                }
            })
        },

        goDesc(id){ //go to description page
            this.$router.push({ name: "goodsdesc", params:{ id }})
        },

        goComment(id){
            this.$router.push({ name: "goodscomment", params:{ id }})
        },

        addToShopCart(){
            this.ballFlag = !this.ballFlag
            // { id: item ID, count: quantity, price: sale_price, selected: true }
            // create an obj to save in Store -- cart
            var goodsinfo = { id: this.id, count: this.selectedCount, price: this.goodsinfo.sell_price, selected: true }
           
            // call mutations from store, save item to cart
            this.$store.commit('addToCart', goodsinfo)


            //prepare data to save cart item to server.
            var goodstoarray=[];
            goodstoarray.push(goodsinfo);   

             let data = {
                items : JSON.stringify(goodstoarray),
            }



            //add cart items to server
            this.$http.put('http://127.0.0.1:8000/api/usercart/' + JSON.parse(this.$store.state.api_token).api_token, data).then( response=> {
            console.log(response)
                // this.$router.push('/person')
            })
        },

        addToWatchList(){
            var goodsinfo = { id: this.id }

            if(this.flag)
            {
                console.log("remove watch list")
                this.$store.commit('removeFromWatchList', goodsinfo.id)
                
                

            }else{
                // call mutations from store, save item to cart
                
                this.$store.commit('addToWatchList', goodsinfo)
                
               
            }
            this.flag = !this.flag
            this.ifWatched()
        },


        beforeEnter(el){
            el.style.transform = "translate(0, 0)"
        },

        enter(el, done){
            el.offsetWidth

            // get ball position
            const ballPostion = this.$refs.ball.getBoundingClientRect();
            // get cart icon postion
            const badgePosition = document.getElementById('badge').getBoundingClientRect();

            const xDiff = badgePosition.left - ballPostion.left
            const yDiff = badgePosition.top - ballPostion.top

            el.style.transform = `translate(${xDiff}px, ${yDiff}px)`
            el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,0.68)"
            done()
        },

        afterEnter(el){
            this.ballFlag = !this.ballFlag
        },

        getSelectedCount(count){
            this.selectedCount = count
            // console.log('get number from sub-component ' + this.selectedCount)
        },

        ifWatched(){
            console.log("before:" + this.$store.state.watchList)
            this.$store.commit('getWatchList')
            console.log("after:" +this.$store.state.watchList)
            // get all items' ID
            // var idArr = []
            // let watchData = JSON.parse(this.$store.state.watchList)
            this.$store.state.watchList.forEach( item => {
                if(item.id == this.id) {
                           this.flag = true    
                }
            })
        },


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

    .ball{
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        z-index: 99;
        top: 390px;
        left: 136px;
    }
}
</style>