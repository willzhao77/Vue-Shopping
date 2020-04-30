<template>
    <div>
                      <!-- <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"> -->
        <h3>Create Account</h3>
        <form class="container" action='' method="POST">
          
         
          

            <!-- Username -->
            <label class=""  for="username">Username</label>
            <div class="">
              <input type="text" id="username" name="username" placeholder="" class="input-xlarge" v-model="name" required>
            </div>

            <!-- E-mail -->
            <label class="" for="email">E-mail</label>
            <div class="">
              <input type="text" id="email" name="email" placeholder="" class="input-xlarge" v-model="email" required>
            </div>

            <!-- Password-->
            <label class="" for="password">Password</label>
            <div class="">
              <input type="password" id="password" name="password" placeholder="" class="input-xlarge" v-model="password" required>
            </div>

            <!-- Password -->
            <label class=""  for="password_confirm">Password (Confirm)</label>
            <div class="">
              <input type="password" id="password_confirm" name="password_confirm" placeholder="" class="input-xlarge" v-model="password_confirmation" required>
            </div>

            <!-- Button -->
            <div class="buttons">
              <button class="mui-btn-primary" @click.prevent = createAccount>Register</button>
              <button class="mui-btn-danger" @click.prevent = cancel>Cancel</button>
            </div>
</form>
    </div>
</template>

<script>
export default {
    data(){
      return {
        name:'',
        email:'',
        password:'',
        password_confirmation:'',
        api_token:'',
      }
    },
    methods:{
      createAccount(){
        var formData = new FormData()
            formData.append('name', this.name)
            formData.append('password', this.password)
            formData.append('password_confirmation', this.password_confirmation)


        this.$http.post('api/register', formData)
          .then(response => {
                console.log(response.body);
                this.api_token = response.body.api_token;
                this.addApiToken();
                this.$router.push('/person')
                this.$router.push('/person')
            }, response => {
              console.error(response.body);
            });
      },

      cancel(){
        this.$router.push('/login')
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
</style> 