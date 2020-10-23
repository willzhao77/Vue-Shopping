<template>

    <div class="goods-list">
        <!-- <router-link class="goods-item" v-for="item in goodslist" :key=item.id :to="'/home/goodsinfo/' + item.id" tag="div">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{ item.title }}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">${{ item.sell_price }}</span>
                    <span class="old">${{ item.market_price }}</span>
                </p>
                <p class="sell">
                    <span>Selling</span>
                    <span>left {{ item.stock_quantity }}</span>
                </p>
            </div>
        </router-link> -->

        <div class="goods-item" v-for="item in goodslist" :key=item.id @click="goDetail(item.id)">
            <img :src="item.img" alt="" tag="div">
            <h1 class="title">{{ item.title }}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">${{ item.sell_price }}</span>
                    <span class="old">${{ item.market_price }}</span>
                </p>
                <p class="sell">
                    <span>Selling</span>
                    <span>left {{ item.stock_quantity }}</span>
                </p>
            </div>
        </div>




        <mt-button type="danger" size="large" @click="getMore">Show More...</mt-button>
    </div>


</template>

<script>
export default {
    data(){
        return{
           page: 1, // by default, display first page
           goodslist: [],  // save items array.
           showFoot:true, //show footbar
        }
    },

    created(){
        this.getGoodsList()
        this.sendDataToParent()
    },
    methods:{
        sendDataToParent(){
            this.$emit('footerStatus',this.showFoot)
        },
        getGoodsList(){
            // get item list
            this.$http.get("https://shoppingserver.willin.xyz/api/shoplist?page=" + this.page).then(result => {
                if(result.body.status === 0 ){
                    this.goodslist = this.goodslist.concat(result.body.message.data)
                }
            })
        },

        getMore(){
            this.page ++
            this.getGoodsList()

        },

        goDetail(id){
            // use JS route
            this.$router.push('/home/goodsinfo/' + id)
        }
}
}
</script>

<style lang="scss" scoped>
.goods-list{
    display: flex;
    flex-wrap:wrap;
    padding: 7px;
    justify-content: space-between;
}

.goods-item{
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;

    img{
        width: 100%
    }

    .title{
        font-size: 14px;
    }

    .info{
        background-color: #eee;
        p{
            margin: 0;
            padding: 5px;
        }

        .price{
            .now{
                color: red;
                font-weight: bold;
                font-size: 16px;
            }
            .old{
                text-decoration: line-through;
                font-size: 12px;
                margin-left: 10px;
            }


        }

        .sell{
            display: flex;
            justify-content: space-between;
            font-size: 13px;
        }
    }

}

</style>
