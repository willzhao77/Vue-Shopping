<template>
    <div>
        <form class="form-signin">
        <h1 class="h3 mb-3 font-weight-normal">Personal Details</h1>
            <div>
                <label for="username" class="">Name</label>
                <input type="name" id="username" class="" placeholder=""  autofocus v-model="name">
            </div>
                
            

            <div>
                <label for="username" class="">Address</label>
                <input type="name" id="username" class="" placeholder=""   v-model="address">
            </div>
            

           <div>
                <label for="username" class="">Mobile</label>
                <input type="name" id="username" class="" placeholder=""   v-model="mobile">
            </div>

            <div class="buttons">
                <button class="mui-btn mui-btn-primary buttonitem" type="submit" @click = "update">Update</button>
                <button class="mui-btn mui-btn-danger buttonitem" type="submit" @click= "cancel">Cancel</button>
            </div>
            
        </form>
    </div>
</template>

<script>
export default {
    data(){
        return{
            name:"",
            address:"",
            mobile:"",

        }
    },

    created(){
            this.getUserDetails()
        },

    methods:{

        

        update(){
           
          this.$http.put('http://127.0.0.1:8000/api/userdetails/' + JSON.parse(this.$store.state.api_token).api_token).then( response=> {
              console.log(response)

          })
           },

        cancel(){
            this.$router.push('/person')
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
    }
}
</script>

<style lang="css" scoped>
label {
    display: block;
    margin-top: 10px;
 }
input{
    width: 100%;
    height: 30px;
}

form{
    margin: 10px;
}

.buttons{
    margin-top: 15px;
    display: flex; 
    justify-content: center; 
}
.buttonitem{
    margin: 5px
}
</style>