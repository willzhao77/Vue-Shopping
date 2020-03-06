<template>
    <div class="checkout-container">
        <h2>Check Out</h2>

        <ul class="mui-table-view"> 
        <li class="mui-table-view-cell mui-collapse">
            <a class="mui-navigate-right" href="#">Items</a>
            <div class="mui-collapse-content">
            
            <!-- items -->
            <div class="items">
                <img src="http://localhost:8000/img/shop/1581476430iphonea.jpg" alt=""> 
                <p class="title">AppleiPhoneiPhoneiPhone iPhone11111 111111111 iPhoneiPhone iPhone11111</p>
                <p class="price">$5633.00</p>
                <p class="quantity"> x3</p>
            </div>

            <div class="items">
                <img src="http://localhost:8000/img/shop/1581476430iphonea.jpg" alt=""> 
                <p class="title">苹果Apple iPhone iPhone iPhone iPhone</p>
                <p class="price">$5633.00</p>
                <p class="quantity"> x3</p>
            </div>

            <div class="items">
                <img src="http://localhost:8000/img/shop/1581476430iphonea.jpg" alt=""> 
                <p class="title">苹果Apple iPhone iPhone iPhone iPhone</p>
                <p class="price">$5633.00</p>
                <p class="quantity"> x3</p>
            </div>

            <div class="items">
                <img src="http://localhost:8000/img/shop/1581476430iphonea.jpg" alt=""> 
                <p class="title">苹果Apple iPhone iPhone iPhone iPhone</p>
                <p class="price">$5633.00</p>
                <p class="quantity"> x3</p>
            </div>

            <div class="items">
                <img src="http://localhost:8000/img/shop/1581476430iphonea.jpg" alt=""> 
                <p class="title">苹果Apple </p>
                <p class="price">$5633.00</p>
                <p class="quantity"> x3</p>
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
                        <p>Total Price: <span class="red">$100</span></p>
                    </div>
                    <mt-button type="danger" @click="goConfirm">Confirm</mt-button>
                </div>
            </div>
		</div>
    </div>
</template>

<script>
export default {

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