<template>
    <div class="checkout-container">
        <h2>Check Out</h2>

        <ul class="mui-table-view">
        <li class="mui-table-view-cell mui-collapse mui-active">
            <a class="mui-navigate-right" href="#">Items</a>
            <div class="mui-collapse-content">

            <!-- items -->
            <div class="items" v-for="(item) in goodslist" :key=item.id >
                <img :src=item.img  alt="">
                <p class="title">{{ item.title }}</p>
                <p class="price">{{ item.sell_price }}</p>
                <p class="quantity"> X{{ goodsquantity[item.id] }}</p>
            </div>

            </div>
        </li>
    </ul>



        <!-- delivery -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <h4>Delivery to:</h4>
                    <p>Test UserName</p>
                    <p>No 1 Bigtown street, Nice block, NZ</p>
                    <P>Mobile: 123456789</P>
                </div>
            </div>
		</div>



        <!-- confirm -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner checkout">
                    <div class="left">
                        <p>Total Price: <span class="red">${{ TotalPrice }}</span></p>
                    </div>
                    <mt-button type="danger" @click="goConfirm">Confirm</mt-button>
                </div>
            </div>
		</div>
    </div>
</template>

<script>
export default {
    data(){
      return {
          goodslist: [],  // all item data from cart
          goodsquantity: [],  // save item quantity
          TotalPrice:0, //total items
          showFoot:true, //show footbar

      }
    },

    created() {
        this.getGoodsList()
        this.sendDataToParent()
    },

    methods:{
        sendDataToParent(){
            this.$emit('footerStatus',this.showFoot)
        },
        getGoodsList(){
            this.$store.commit('getShoppingCart')
            // get all items' ID
            var idArr = []
            this.$store.state.cart.forEach( item =>
                {
                    idArr.push(item.id)
                    this.goodsquantity[item.id] = item.count // get item quantity
                })
            // console.log(idArr )
            // console.log(this.goodsquantity[1] )
            if(idArr.length <= 0) {
                return
            }

            this.$http.get('https://shoppingserver.willin.xyz/api/getshopcartlist/' + idArr.join(",")).then(result => {
                if(result.body.status === 0 ){
                    this.goodslist = result.body.message
                    console.log(this.goodslist )
                    this.checkTotalPrice()
                }
            })
        },

        checkTotalPrice(){
            var sum = 0
            for ( item of this.goodslist){
                sum += item.sell_price * this.goodsquantity[item.id]
                console.log(this.goodsquantity[item.id])
            }
            this.TotalPrice = sum
        },

        goConfirm(){
            this.$router.push('/shopping/confirm')
        }
    }
}
</script>

<style lang="scss" scoped>

.checkout-container{

    .mui-card{
        margin:  10px 0px;
    }

    background-color: #eee;
    overflow: hidden;
    img{
            width: 50px;
            height: 50px;
        }

    .items{
        display: flex;
        justify-content: space-between;
        align-items:center;
        margin: 10px 0;
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


    .title{
        width: 50%;

    }
    .price{
        width: 20%;
    }

    .quantity{
        width: 5%;
    }
}
</style>
