<template>
    <div>
        <!-- <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"> -->
		
        <form class="search">
           

            <div class=" flex" >
					<input type="text" class="mui-input" v-model="keyword">
                    <button type="" class="mui-btn-primary" @click.prevent="getGoodsList">Search</button>
				</div>

           
        </form>

        <div class="searchlist-container">
        <div class="search-list">
            <!-- item list -->
            <div class="mui-card" v-for="(item) in goodslist" :key=item.id @click="goDetail(item.id)">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">

                        <img :src="item.img" alt="">
                        <div class="info">
                            <h1>{{ item.title }}</h1>
                            <p>
                                <span class="price">${{ item.sell_price }}</span>
                            </p>
                        </div>
					</div>
				</div>
			</div>
        </div>
    </div>

    </div>
</template>

<script>
export default {
    name: "aaaaaaa",
    data(){
      return {
          goodslist: [],  // all item data from cart
          keyword: [], // user type keyword
      }
    },

    // created() {
    //     this.getGoodsList()
    // }, 

    methods:{
        getGoodsList(){
            // get all items' ID

            // this.$http.get('api/getshopcartlist/' + 1)).then(result => {
            this.$http.get('api/searchlist/' + this.keyword ).then(result => {
                if(result.body.status === 0 ){
                    this.goodslist = result.body.message
                }
            })
        },

        goDetail(id){
            // use JS route
            this.$router.push('/home/goodsinfo/' + id)
        }
    }
}
</script>

<style lang="scss" scoped>
.search{
    margin: 15px;
}
button{
    margin-left: 5px;
}

.searchlist-container{
    background-color: #eee;
    overflow: hidden;
    .search-list{
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

.flex {
    display: flex;
}
.flex{
    .mui-input{
        height: 40px;
    }
    button{
        height: 40px;
    }
}

</style>