<template>
    <div>
                      <!-- <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"> -->
        <h3>Create Account</h3>

        <form class="container" action='' method="POST">
          

            <!-- Username -->
            
            <div class="form-group" :class="{ 'form-group--error': $v.name.$error }">
              <label class="form__label"  for="username">Username</label>
              <input class="form__input" type="text" id="username" name="username" placeholder="" v-model.trim="$v.name.$model"/>
            </div>
            
            <div class="error" v-if="!$v.name.required">Field is required.</div>
            <div class="error" v-if="!$v.name.minLength">Name must have at least {{$v.name.$params.minLength.min}} letters.</div>
            <div class="error" v-if="!$v.name.maxLength">Name must have less than {{$v.name.$params.maxLength.min}} letters.</div>

            <!-- E-mail -->
            
             <div class="form-group" :class="{ 'form-group--error': $v.email.$error }">
              <label class="form__label"  for="username">email</label>
              <input class="form__input" type="text" id="email" name="email" placeholder="" v-model.trim="$v.email.$model"/>
            </div>
            <div class="error" v-if="!$v.email.required">Field is required.</div>
            <div class="error" v-if="!$v.email.email">Please enter your Email address.</div>
 

   
         

            <!-- Password-->
            
            <div class="" :class="{ 'form-group--error': $v.password.$error }">
              <label class="" for="password">Password</label>
              <input class="form__input" type="password" id="password" name="password" placeholder="" v-model.trim="$v.password.$model"/>
              <div class="error" v-if="!$v.password.required">Field is required.</div>
              <div class="error" v-if="!$v.password.minLength">Name must have at least {{$v.password.$params.minLength.min}} letters.</div>
              <div class="error" v-if="!$v.password.maxLength">Name must have less than {{$v.password.$params.maxLength.min}} letters.</div>
            
            </div>

            <!-- Password -->
            
            <div class="" :class="{ 'form-group--error': $v.password_confirmation.$error }">
              <label class=""  for="password_confirmation">Password (Confirm)</label>
              <input class="form__input" type="password" id="password_confirmation" name="password_confirmation" placeholder="" v-model.trim="$v.password_confirmation.$model"/>
              <!-- <div class="error" v-if="!$v.password_confirmation.required">Field is required.</div> -->
              <div class="error" v-if="!$v.password_confirmation.sameAsPassword">Passwords must be identical.</div>
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

import { required, minLength, maxLength, email, sameAs } from 'vuelidate/lib/validators'

export default {
    data(){
      return {
        name:'',
        email:'',
        password:'',
        password_confirmation:'',
        api_token:'',
        showFoot:false //Do Not show footbar 
      }
    },

    validations:{
      name: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(10),
      },

      email: {
        required,
        email
      },

      // email:{
      //   email
      // },

      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(10),
      },
      password_confirmation: {
        required,
        sameAsPassword: sameAs('password')
      },
    },

    created(){
        this.sendDataToParent();
    },

    methods:{
      sendDataToParent(){
            this.$emit('footerStatus',this.showFoot)
        },
      createAccount(){

        this.$v.$touch()
        if (this.$v.$invalid) {
        console.log("fill all")
        return
      } else {
        var formData = new FormData()
            formData.append('name', this.name)
            formData.append('email', this.email)
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
      }


        
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

.error{
  color: red;
  text-align: right;
  font-size: 12px;
  float: right;
  margin-top: -15px;
}

.success{
  color: green;
  text-align: right;
  font-size: 12px;
}
</style> 