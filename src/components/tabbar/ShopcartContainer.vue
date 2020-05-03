<template>
    <div class="shopcart-container">
        <div class="goods-list">
            <!-- item list -->
            <div class="mui-card" v-for="(item, i) in goodslist" :key=item.id>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<!-- <mt-switch v-model="$store.getters.getGoodsSelected[item.id]" -->
                        <mt-switch v-model="selected[item.id]"
                            @change="selectedChanged(item.id, selected[item.id])"
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
                        <!-- <p>Selected <span class="red">{{ totalItem }}</span>  -->
                        Items. Totoal price: <span class="red">${{ $store.getters.getGoodsCountAndAmount.amount }}</span></p>
                    </div>
                    <mt-button type="danger" @click="goCheckout">Checkout</mt-button>
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
          totalItem: 0, // total items quantity
          sum: 0        // total amount
      }
    },

    created() {
        this.getGoodsList()
    }, 

    methods:{
        goCheckout(){
            this.$router.push( {name: "checkout"})
        },
        
        
        getGoodsList(){
            
            
            if(!this.$store.state.api_token ) 
            {
                console.log('no token')
                //no user token found
                this.$store.commit('getShoppingCart')
                    // get all items' ID
                    var idArr = []
                    // console.log(this.$store.state.cart)
                    this.$store.state.cart.forEach( item => {
                        idArr.push(item.id)
                        //get local selected info
                        this.selected[item.id] = this.$store.getters.getGoodsSelected[item.id]
                        //get local quantity info
                        this.quantity[item.id] = this.$store.getters.getGoodsCount[item.id]
                        })

                    if(idArr.length <= 0) {
                        return
                    }

                    this.$http.get('api/getshopcartlist/' + idArr.join(",")).then(result => {
                        if(result.body.status === 0 ){
                            this.goodslist = result.body.message
                           
                        }
                    })
                
            }else{
                console.log('has token1')
                // user has token. use online shopping cart
                this.$http.get('api/usercart/' + JSON.parse(this.$store.state.api_token).api_token).then(response => {
                let cartItems = JSON.parse(response.bodyText)


                var idArr = []
                var cartGoods = []  // save goods from shopping cart
                cartItems.forEach(item => {
                    idArr.push(item.item_id)                    
                    this.selected[item.item_id] = (item.selected == 1  ? true : false )
                    this.quantity[item.item_id] = item.quantity
                    this.totalItem += item.quantity


                    let o = {}
                    o.id = item.item_id
                    o.count = item.quantity
                    o.selected = (item.selected == 1  ? true : false )
                    o.price = ''
                    cartGoods.push(o)
                })
                console.log(cartGoods)
                console.log(JSON.stringify(cartGoods))
                
               



                
                // console.log(this.selected[1])

                
                
                if(idArr.length <= 0) {
                    return
                }
                this.$http.get('api/getshopcartlist/' + idArr.join(",")).then(result => {
                    if(result.body.status === 0 ){
                        this.goodslist = result.body.message
                        console.log(result.body.message)
                        this.goodslist.forEach(item => {

                            cartGoods.forEach(good =>{
                                
                                if(good.id == item.id)
                                {
                                    good.price = item.sell_price   // get item price and save to list object
                                }
                            })


                            //get item price and item title
                        })
                    }
                })


                this.$store.state.usercart = cartGoods   // sync data to VUEX
                localStorage.setItem('usercart', JSON.stringify(cartGoods))
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
                    this.goodslist.splice(index, 1)
                })
            }




            
        },

        selectedChanged(id, val){  //sync switch status to store
            // console.log( id + '------' + val)
            if(!this.$store.state.api_token ) 
            {
                console.log('no token')
                console.log(val)
                this.$store.commit('updateGoodsSelected', {id, selected:val})
            }else{

                let goodInfo = [{"id": id, "selected": val}]
                let data = {
                    items : JSON.stringify(goodInfo),
                    opt: 'select', //  add opt as flag. if user click, will add related item to cart.
                }
                this.$http.put('http://127.0.0.1:8000/api/usercart/' + JSON.parse(this.$store.state.api_token).api_token, data).then( response=> {
                console.log(response)
                    // this.$router.push('/person')
                })
                this.$store.commit('updateGoodsSelected', {id, selected:val})
            }
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