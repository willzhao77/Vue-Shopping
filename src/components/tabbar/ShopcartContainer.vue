<template>
    <div class="shopcart-container">
        <div class="goods-list">
            <!-- item list -->
            <div class="mui-card" v-for="item in goodslist" :key=item.id>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-switch></mt-switch>
                        <img :src="item.thumb_path" alt="">
                        <div class="info">
                            <h1>{{ item.title }}</h1>
                            <p>
                                <span class="price">${{ item.sell_price }}</span>
                                <numbox></numbox>
                                <a href="">del</a>
                            </p>
                        </div>
					</div>
				</div>
			</div>
        </div>

        <!-- checkout -->
        <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						这是一个最简单的卡片视图控件；卡片视图常用来显示完整独立的一段信息，比如一篇文章的预览图、作者信息、点赞数量等
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
            // get all items' ID
            var idArr = []
            this.$store.state.cart.forEach( item => idArr.push(item.id))
            if(idArr.length <= 0) {
                return
            }

            this.$http.get('api/goods/getshopcartlist/' + idArr.join(",")).then(result => {
                if(result.body.status === 0 ){
                    this.goodslist = result.body.message
                }
            })
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
}
</style>