<template>
    <div>
                      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

        <form class="form-horizontal" action='' method="POST">
  <fieldset>
    <div id="legend">
      <legend class="">Register</legend>
    </div>
    <div class="control-group">
      <!-- Username -->
      <label class="control-label"  for="username">Username</label>
      <div class="controls">
        <input type="text" id="username" name="username" placeholder="" class="input-xlarge" v-model="name">
      </div>
    </div>
 
    <div class="control-group">
      <!-- E-mail -->
      <label class="control-label" for="email">E-mail</label>
      <div class="controls">
        <input type="text" id="email" name="email" placeholder="" class="input-xlarge" v-model="email">
      </div>
    </div>
 
    <div class="control-group">
      <!-- Password-->
      <label class="control-label" for="password">Password</label>
      <div class="controls">
        <input type="password" id="password" name="password" placeholder="" class="input-xlarge" v-model="password">
      </div>
    </div>
 
    <div class="control-group">
      <!-- Password -->
      <label class="control-label"  for="password_confirm">Password (Confirm)</label>
      <div class="controls">
        <input type="password" id="password_confirm" name="password_confirm" placeholder="" class="input-xlarge" v-model="password_confirmation">
      </div>
    </div>
 
    <div class="control-group">
      <!-- Button -->
      <div class="controls">
        <button class="btn btn-success" @click.prevent = createAccount>Register</button>
      </div>
    </div>
  </fieldset>
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
        password_confirmation:''
      }
    },
    methods:{
      createAccount(){
        var formData = new FormData()
            formData.append('name', this.name)
            formData.append('password', this.password)
            formData.append('password_confirmation', this.password_confirmation)
         

        this.$http.post('http://127.0.0.1:8000/api/register', formData)
          .then(response => {
                console.log(response.body);
            }, response => {
              console.error(response.body);
            });
      }
    }
}
</script>

<style lang="stylus" scoped>

</style>