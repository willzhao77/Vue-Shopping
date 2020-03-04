<template>
    <div>
                <!-- <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"> -->

        <h3>Account: {{ this.account }}</h3>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell"><img src="images\account.jpg" alt=""> Name: {{this.name}}</li>
            <li class="mui-table-view-cell">
                    <a class="mui-navigate-right"><img src="images\address.png" alt="">Address: {{ this.address }}</a>
            </li>

            <li class="mui-table-view-cell">
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
        }
    },

    created(){
        
    //      if(this.$store.state.token =='' || this.$store.state.token =='')
	//   {
	// 	  console.log('no token')
	//   }else{
    //       console.log('has token')
    //   }
    this.getUserDetails()

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
        },


        getUserDetails(){
            this.$store.commit('getUserToken')
            // console.log(this.$store.state.api_token)
            // console.log(this.$store.state.api_token.api_token)
            
            // console.log(typeof(JSON.parse(this.$store.state.api_token)))
            // console.log(JSON.parse(this.$store.state.api_token).api_token)
            // console.log(this.$store.state.api_token)
            this.$http.get('http://127.0.0.1:8000/api/userdetails/' + JSON.parse(this.$store.state.api_token).api_token).then( response=> {
   
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