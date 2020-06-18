<template>
    <div>
                <!-- <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"> -->

  <form class="container">
      <h3 class="h3 mb-3 font-weight-normal">Please sign in</h3>


 


      <label for="username" class="labels">User Name</label>
      <div class="inputbox">
        <input type="text" id="username" class=""  required  v-model="name" autofocus>
      </div>
      

      

      <label for="inputPassword" class="">Password</label>
      <div class="inputbox">
        <input type="password" id="inputPassword" class=""  required v-model="password">
      </div>
      
      
      <div class="buttons">
        <button class="mui-btn-primary" type="submit" @click.prevent = login>Sign in</button>
        <button class="mui-btn-danger" type="submit" @click="goRegister">register</button>
      </div>

      
    </form>
    
    </div>
</template>

<script>
import { Toast } from 'mint-ui'

export default {
    data(){
      return {
        name:'',
        password:'',
        api_token:'',
        showFoot:false //Do Not show footbar 
      }
    },

    created(){
        this.sendDataToParent();
    },
    methods:{
      sendDataToParent(){
            this.$emit('footerStatus',this.showFoot)
        },
      goRegister(){
        this.$router.push('/register')
      },
      login(){
        var formData = new FormData()
            formData.append('name', this.name)
            formData.append('password', this.password)
         
        this.$http.post('api/login', formData)
          .then(response => {
                // console.log(response.body);
            // check user name and password and redirect to related page
            if(response.body.api_token == '' || typeof response.body.api_token == 'undefined')
            {
              // console.log("please Login again.");
              // console.error(response.body);
              Toast('UserName or Password not correct')
            }else{
              // console.log("personal page");
              console.log(response.body.api_token);
              this.api_token = response.body.api_token;
              this.addApiToken();
              this.$router.push('/person')
            }
            }, response => {
              // console.error(response.body);
              Toast('UserName or Password not correct')
            });
      },

      addApiToken(){
            var token = { api_token: this.api_token }

            // call mutations from store, save item to cart
            this.$store.commit('addApiToken', token)
        },
    }
}
</script>

<style lang="scss" scoped>
h3{
  text-align:center;
  margin: 20px 0;
}

.container{
  margin: 10px;

}

.buttons{
  margin-top: 10px;
  display: flex;
  justify-content: center;

  button{
    margin: 5px;
  }
}

.inputbox{
  margin: 10px 0;
}



</style>