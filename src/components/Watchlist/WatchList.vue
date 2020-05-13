<template>
    <div class="watchlist-container">
        <h3>Watch list</h3>
        <div class="watch-list">
            <!-- item list -->
            <div class="mui-card" v-for="(item, i) in goodslist" :key=item.id>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">

                        <img :src="item.img" alt="">
                        <div class="info">
                            <div class="title">{{ item.title }}</div>
                            <p>
                                <span class="price">${{ item.sell_price }}</span>
                                <button class="button button2" @click="remove(item.id, i)">Remove</button>
                            </p>
                        </div>
					</div>
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
            this.$store.commit('getWatchList')
           console.log(this.$store.state.watchList )


            // get all items' ID
            var idArr = []
            this.$store.state.watchList.forEach( item => idArr.push(item.id))
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
            // console.log(typeof(this.goodslist))
            //remove item from user's watch list

            if(this.$store.state.api_token )  // if has token
            {
                var goodsinfo = { id: id, opt: "remove" }
                this.$http.put('api/userwatchlist/' + JSON.parse(this.$store.state.api_token).api_token, goodsinfo).then( response=> {
                        // console.log(response)
                        })
            }else{
                
            }
            this.goodslist.splice(index, 1)
            this.$store.commit('removeFromWatchList', id)


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
.watchlist-container{
    background-color: #eee;
    overflow: hidden;
    .watch-list{
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


h3{
    text-align: center;
    padding: 10px;
    color:#1668b5;
}

.button2 {
    border-radius: 4px;
    background-color: #EF4F4F;
    color: #fff;
    font-size: 14px;
    text-align: center;
    font-weight: 400;
    line-height: 1.42;
    cursor: pointer;
    float:right;
    }
.info{
    width: 100%;
}

</style>