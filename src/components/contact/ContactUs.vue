<template>
    <div>
        <form class="contactus">

            <div class="">
                <label>Name:</label>
                <input type="text" placeholder="" style="margin: 10px 0px;" name="name" v-model="name">
            </div>

            <div class="">
                <label>Email:</label>
                <input type="text" placeholder="" style="margin: 10px 0px;" name="email" v-model="email">
            </div>

            <div class="">
                <label>Title:</label>
                <input type="text" placeholder="" style="margin: 10px 0px;" name="title" v-model="title">
            </div>

            <label>Message:</label>
            <div class="mui-input-row" style="margin: 10px 0px;">
                        <textarea id="textarea" rows="8" placeholder="" name="message" v-model="message"></textarea>
            </div>

            <div class="mui-button-row">
                <button type="button" class="mui-btn mui-btn-primary" onclick="return false;" @click.prevent = SendMessage>Send</button>&nbsp;&nbsp;
                <button type="button" class="mui-btn mui-btn-danger" onclick="return false;">Cancel</button>
            </div>
		</form>


    </div>
</template>

<script>
import { Toast } from "mint-ui"
export default {
    data(){
      return {
        name:'',
        email:'',
        title:'',
        message:'',
        showFoot:false //Do Not show footbar
      }
    },

    created(){
        this.sendDataToParent();
    },
    methods:{
        sendDataToParent(){ //send value if show footer
            this.$emit('footerStatus',this.showFoot)
        },
        SendMessage(){
            var formData = new FormData()
                formData.append('name', this.name)
                formData.append('email', this.email)
                formData.append('title', this.title)
                formData.append('message', this.message)

            this.$http.post('https://shoppingserver.willin.xyz/api/contactus', formData)
            .then(response => {
                    if (response.bodyText === 'sent'){
                        Toast('You succesfully sent message.')
                        this.name = ''
                        this.email=''
                        this.title =''
                        this.message =''

                    }

                }, response => {
                console.error(response.body);
                });
        },
    }

}
</script>


<style lang="scss" scoped>
    .contactus{
        margin: 20px 10px;
    }
</style>
