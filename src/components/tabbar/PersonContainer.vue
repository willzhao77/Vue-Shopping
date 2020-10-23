<template>
    <div>
                <!-- <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"> -->

        <h3>Account: {{ this.account }}</h3>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell" @click="details">
                <a class="mui-navigate-right"><img src="images\account.jpg" alt=""> Name: {{this.name}}</a>
            </li>

            <li class="mui-table-view-cell" @click="details">
                    <a class="mui-navigate-right"><img src="images\address.png" alt="">Address: {{ this.address }}</a>
            </li>

            <li class="mui-table-view-cell" @click="details">
                    <a class="mui-navigate-right"><img src="images\mobile.jpg" alt=""> Mobile: {{ this.mobile }}</a>
            </li>
            <li class="mui-table-view-cell">
                    <a class="mui-navigate-right"><img src="images\order.png" alt=""> Order: 00001</a>
            </li>
            <li class="mui-table-view-cell">
                    <a class="mui-navigate-right"><img src="images\history.jpg" alt=""> Hisotry: None</a>
            </li>
            <li class="mui-table-view-cell"><img src="images\ver.jpg" alt=""> Version: 1.0</li>
        </ul>

        <mt-button type="primary" size="large" @click="logout">logout</mt-button>
    </div>
</template>

<script>
export default {

    data(){
        return {
            account:'',
            email:'',
            name:'',
            address:'',
            mobile:'',
            showFoot:true, //show footbar
        }
    },

    created(){

    //      if(this.$store.state.token =='' || this.$store.state.token =='')
	//   {
	// 	  console.log('no token')
	//   }else{
    //       console.log('has token')
    //   }
    this.checkToken()
    this.getUserDetails()
    this.loadCartItem()
    this.loadWatchList()
    this.sendDataToParent()

    },

    methods: {
        sendDataToParent(){    // send if show footerStatus value to parent component
            this.$emit('footerStatus',this.showFoot)
        },

        checkToken(){ // check if Token is unavailable
            if(this.$store.state.api_token == null || this.$store.state.api_token == ''){
                this.$router.replace('/login')
            }
        },

        details(){
            console.log('todetails')
            this.$router.push('/details')
        },

        logout(){
            if(this.$store.state.api_token == null || this.$store.state.api_token == ''){
                return
            }

            var formData = new FormData()
            formData.append('api_token', this.$store.state.api_token)

            console.log(this.$store.state.api_token)

            this.$http.post('https://shoppingserver.willin.xyz/api/logout', this.$store.state.api_token)
          .then(response => {
              this.$store.commit('removeApiToken')
              // console.log(response)
              this.$router.push('/login')
            }).catch(function () {});
        },


        getUserDetails(){
            if(this.$store.state.api_token == null || this.$store.state.api_token == ''){
                return
            }
            this.$store.commit('getUserToken')
            // console.log(this.$store.state.api_token)
            // console.log(this.$store.state.api_token.api_token)

            // console.log(typeof(JSON.parse(this.$store.state.api_token)))
            // console.log(JSON.parse(this.$store.state.api_token).api_token)
            // console.log(this.$store.state.api_token)
            this.$http.get('https://shoppingserver.willin.xyz/api/userdetails/' + JSON.parse(this.$store.state.api_token).api_token).then( response=> {
            console.log(response.body)
            userInfo = response.body
            this.account = userInfo.name
            this.email = userInfo.email

            //check if user has details info
             if(response.body.to_details){
                this.name = userInfo.to_details.name
                this.address = userInfo.to_details.address
                this.mobile = userInfo.to_details.mobile
             }
            })
        },

        loadWatchList(){
            if(this.$store.state.api_token == null || this.$store.state.api_token == ''){
                return
            }
            this.$http.get('https://shoppingserver.willin.xyz/api/userwatchlist/' + JSON.parse(this.$store.state.api_token).api_token).then(response => {
                console.log(JSON.parse(response.bodyText))
                if(response.bodyText == 0){ //if not find user by this token
                    this.$store.commit('removeApiToken')   //remove token
                    return
                }

                let watchListIds = JSON.parse(response.bodyText)
                var watchList = []  // save goods from shopping cart
                watchListIds.forEach(val => {
                    let o = {}
                    o.id = val
                    watchList.push(o)
                })
                console.log(JSON.stringify(watchList))
                this.$store.state.userWatchList = watchList   // sync data to VUEX
                localStorage.setItem('userWatchList', JSON.stringify(watchList))
            })
        },

        loadCartItem(){
            if(this.$store.state.api_token == null || this.$store.state.api_token == ''){
                return
            }
            this.$http.get('https://shoppingserver.willin.xyz/api/usercart/' + JSON.parse(this.$store.state.api_token).api_token).then(response => {
                let cartItems = JSON.parse(response.bodyText)
                if(response.bodyText == 0){ //if not find user by this token
                    this.$store.commit('removeApiToken')   //remove token
                    return
                }
                var cartGoods = []  // save goods from shopping cart
                cartItems.forEach(item => {


                    let o = {}
                    o.id = item.item_id
                    o.count = item.quantity
                    o.selected = (item.selected == 1  ? true : false )
                    o.price = ''
                    cartGoods.push(o)
                })
                console.log(cartGoods)
                console.log(JSON.stringify(cartGoods))
                this.$store.state.usercart = cartGoods   // sync data to VUEX
                localStorage.setItem('usercart', JSON.stringify(cartGoods))
            })



        }
    },
}
</script>

<style lang="scss" scoped>
h3{
    text-align: center;
    padding: 10px;
    color:#1668b5;
}
img{
    height: 30px;
}

ul{
    color: #404d48;
}
</style>
