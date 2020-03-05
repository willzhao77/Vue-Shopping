<template>
    <div class="shopcart-container">
        <div class="goods-list">
            <!-- item list -->
            <div class="mui-card" v-for="(item, i) in goodslist" :key=item.id>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-switch v-model="$store.getters.getGoodsSelected[item.id]"
                            @change="selectedChanged(item.id, $store.getters.getGoodsSelected[item.id])"
                        ></mt-switch>
                        <img :src="item.img" alt="">
                        <div class="info">
                            <h1>{{ item.title }}</h1>
                            <p>
                                <span class="price">${{ item.sell_price }}</span>
                                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
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
          goodslist: []  // all item data from cart
      }
    },

    created() {
        this.getGoodsList()
    }, 

    methods:{
        getGoodsList(){

            this.$store.commit('getShoppingCart')
            // get all items' ID
            var idArr = []
            this.$store.state.cart.forEach( item => idArr.push(item.id))
            console.log(idArr.length )
            if(idArr.length <= 0) {
                return
            }

            this.$http.get('api/getshopcartlist/' + idArr.join(",")).then(result => {
                if(result.body.status === 0 ){
                    this.goodslist = result.body.message
                }
            })
        },

        remove(id, index){  // use ID remove store,  use index, remove goodslist
            console.log(typeof(this.goodslist))
            this.goodslist.splice(index, 1)
            this.$store.commit('removeFromCart', id)
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