<template>
    <div>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

        <h3>Test User</h3>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell"><img src="images\account.jpg" alt=""> Account: Test123</li>
            <li class="mui-table-view-cell">
                    <a class="mui-navigate-right"><img src="images\address.png" alt="">Address: 123 Test address</a>
            </li>

            <li class="mui-table-view-cell">
                    <a class="mui-navigate-right"><img src="images\mobile.jpg" alt=""> Mobile: 123456789</a>
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

        }
    },

    created(){
        
    //      if(this.$store.state.token =='' || this.$store.state.token =='')
	//   {
	// 	  console.log('no token')
	//   }else{
    //       console.log('has token')
    //   }
    },

    methods: {
        
        logout(){

            var formData = new FormData()
            formData.append('api_token', this.$store.state.api_token)

            console.log(this.$store.state.api_token)

            this.$http.post('http://127.0.0.1:8000/api/logout', this.$store.state.api_token)
          .then(response => {
              this.$store.commit('removeApiToken')
              this.$router.push('/login')
            });
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