<template>
    <div class="shopcart-container">
        <div class="goods-list">
            <!-- item list -->
            <div class="mui-card" v-for="(item, i) in goodslist" :key=item.id>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<!-- <mt-switch v-model="$store.getters.getGoodsSelected[item.id]" -->
                        <mt-switch v-model="selected[item.id]"
                            @change="selectedChanged(item.id, $store.getters.getGoodsSelected[item.id])"
                        ></mt-switch>
                        <img :src="item.img" alt="">
                        <div class="info">
                            <h1>{{ item.title }}</h1>
                            <p>
                                <span class="price">${{ item.sell_price }}</span>
                                <!-- <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox> -->
                                <numbox :initcount="quantity[item.id]" :goodsid="item.id"></numbox>
                                <a href="" @click.prevent="remove(item.id, i)">Del</a>
                            </p>
                        </div>
					</div>
				</div>
			</div>
        </div>

        <!-- checkout -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner checkout">
                    <div class="left">
                        <p>Shopping cart</p>
                        <p>Selected <span class="red">{{ $store.getters.getGoodsCountAndAmount.count }}</span> 
                        Items. Totoal price: <span class="red">${{ $store.getters.getGoodsCountAndAmount.amount }}</span></p>
                    </div>
                    <mt-button type="danger">Checkout</mt-button>
                </div>
            </div>
		</div>
    </div>
</template>

<script>
import numbox from '../subcomponents/shopcart_numbox.vue'
export default {
    data(){
      return {
          goodslist: [],  // all item data from cart
          selected: [],    // if item selected
          quantity:[],  //item quantity
      }
    },

    created() {
        this.getGoodsList()
    }, 

    methods:{
        
        
        getGoodsList(){
            
            
            if(!this.$store.state.api_token ) 
            {
                console.log('no token')
                //no user token found
                this.$store.commit('getShoppingCart')
                    // get all items' ID
                    var idArr = []
                    // console.log(this.$store.state.cart)
                    this.$store.state.cart.forEach( item => idArr.push(item.id))

                    if(idArr.length <= 0) {
                        return
                    }

                    this.$http.get('api/getshopcartlist/' + idArr.join(",")).then(result => {
                        if(result.body.status === 0 ){
                            this.goodslist = result.body.message
                        }
                    })
                
            }else{
                console.log('has token')
                // user has token. use online shopping cart
                this.$http.get('http://127.0.0.1:8000/api/usercart/' + JSON.parse(this.$store.state.api_token).api_token).then(response => {
                let cartItems = JSON.parse(response.bodyText)
                var idArr = []
                
                cartItems.forEach(item => {
                    idArr.push(item.item_id)
                    this.selected[item.item_id] = (item.selected = 1  ? true : false )
                    this.quantity[item.item_id] = item.quantity
                })

                
                // console.log(this.selected[1])

                
                
                if(idArr.length <= 0) {
                    return
                }
                this.$http.get('api/getshopcartlist/' + idArr.join(",")).then(result => {
                    if(result.body.status === 0 ){
                        this.goodslist = result.body.message
                        // console.log(this.goodslist)
                    }
                })
            })
                
            }


            








                    
        },

        remove(id, index){  // use ID remove store,  use index, remove goodslist
            if(!this.$store.state.api_token ) 
            {
                //no user token found
                console.log(typeof(this.goodslist))
                this.goodslist.splice(index, 1)
                this.$store.commit('removeFromCart', id)
            }else{
                // user has token. use online shopping cart
                console.log("delete item")

                let data = {
                itemID : id,
            }

                this.$http.delete('http://127.0.0.1:8000/api/usercart/' + JSON.parse(this.$store.state.api_token).api_token, {body: data}).then(response => {
                    // console.log(response.body)
                    // this.getGoodsList()

                })
            }




            
        },

        selectedChanged(id, val){  //sync switch status to store
            // console.log( id + '------' + val)
            this.$store.commit('updateGoodsSelected', {id, selected:val})
        }
    },

    components:{
        numbox
    }
}
</script>

<style lang="scss" scoped>
.shopcart-container{
    background-color: #eee;
    overflow: hidden;
    .goods-list{
        .mui-card-content-inner{
            display: flex;
            align-items: center;
        }
        img{
            width: 60px;
            height: 60px;
        }
        h1{
            font-size: 13px;
        }
        .info{
            .price{
                color: red;
                font-weight: bold;
            }
        }
    }

    .checkout{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .red{
          color: red;
          font-weight: bold;
          font-size: 16px;
      }
    }
}
</style>