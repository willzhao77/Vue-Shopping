<template>
    <div>
        <form class="">
        <h1 class="h3 mb-3 font-weight-normal">Personal Details</h1>

            <div class="">
                <label for="username">Name:</label>
                <input type="text" id="username" style="margin: 10px 0px;" name="name" v-model="name">
            </div>
            <div class="">
                <label for="address">Address:</label>
                <input type="text" id="address" style="margin: 10px 0px;" name="address" v-model="address">
            </div>
            <div class="">
                <label for="mobile">Mobile:</label>
                <input type="text" id="mobile" style="margin: 10px 0px;" name="mobile" v-model="mobile">
            </div>

            <div class="buttons">
                <button class="mui-btn mui-btn-primary buttonitem" type="submit" @click.prevent = "update">Update</button>
                <button class="mui-btn mui-btn-danger buttonitem" type="submit" @click.prevent= "cancel">Cancel</button>
            </div>
            
        </form>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
    data(){
        return{
            name:"",
            address:"",
            mobile:"",
            showFoot:false, //show footbar 

        }
    },

    created(){
            this.getUserDetails()
            this.sendDataToParent()
        },

    methods:{

        sendDataToParent(){
            this.$emit('footerStatus',this.showFoot)
        },

        update(){

            var data1 = {
                name : this.name,
                address : this.address,
                mobile : this.mobile
            }
                    
           
            this.$http.put('api/userdetails/' +  JSON.parse(this.$store.state.api_token).api_token, data1).then( response=> {
                if(response.bodyText == "saved")
                {
                    this.$router.push("/person")
                }else{
                    Toast('Save details failed.')
                }
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
            this.$http.get('api/userdetails/' + JSON.parse(this.$store.state.api_token).api_token).then( response=> {
   
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