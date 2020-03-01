<template>
    <div>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

  <form class="form-signin">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label for="username" class="sr-only">User Name</label>
      <input type="name" id="username" class="form-control" placeholder="username" required autofocus v-model="name">
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control" placeholder="Password" required v-model="password">
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me"> Remember me
        </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit" @click.prevent = login>Sign in</button>
      <button class="btn btn-lg btn-primary btn-block" type="submit" @click="goRegister">register</button>
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

      }
    },

    methods:{
      goRegister(){
        this.$router.push('/register')
      },

      login(){
        var formData = new FormData()
            formData.append('name', this.name)
            formData.append('password', this.password)
         

        this.$http.post('http://127.0.0.1:8000/api/login', formData)
          .then(response => {
                console.log(response.body);
            // check user name and password and redirect to related page
            if(response.body.api_token == '' || typeof response.body.api_token == 'undefined')
            {
              console.log("please Login again.");
              // Toast('UserName or Password not correct')

            }else{
              // console.log("personal page");
              this.$router.push('/person')
            }

            }, response => {
              console.error(response.body);
              Toast('UserName or Password not correct')
            });
      }
    }
}
</script>

<style lang="scss" scoped>

</style>