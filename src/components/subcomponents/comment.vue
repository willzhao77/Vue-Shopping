<template>
  <div class="cmt-container">
    <h3>Create Comment</h3>
    <textarea placeholder="Please enter your comment (max 100)" maxlength="100" v-model="msg"></textarea>
    <mt-button type="primary" size="large" @click="postComment">Send Comment</mt-button>

    

    <div class="cmt-list">
      <div class="cmt-item" v-for="(item, i) in comments" :key="item.add_time">
        <div class="cmt-title">
          {{ i+1 }} &nbsp;&nbsp; Name: {{ item.name }} &nbsp;&nbsp; Time: {{ item.created_at | dateFormat }}
        </div>
        <div class="cmt-body">
          {{ item.content === 'undefined' ? 'no conment from this user' : item.content }}
        </div>
      </div>
    </div>

    <mt-button type="danger" size="large" plain @click="getMore">Show More...</mt-button>
  </div>
</template>
<script>
import { Toast } from "mint-ui"
export default {
  data(){
    return {
      page : 1, // display the first page by default
      comments:[], //all comments
      msg: '', //comment content
    }
  },
  created(){
    this.getComments()
  },
  methods:{
    getComments(){  //get comments
      this.$http.get("api/" + this.whichcomment + "/"+this.id+"?page=" + this.page).then(result => {
        if(result.body.status === 0){
          // this.comments = result.body.message
          //keep old comment when click 'more'
          this.comments = this.comments.concat(result.body.message.data)
        }else{
          Toast('load comments faild...')
        }
      })
    },
    getMore(){ //get more data
      this.page++
      this.getComments()
    },

    postComment(){ // send comment
      //check if comment is empty
      if(this.msg.trim().length == 0){
        return Toast("Please enter comment!")
      }


      //parameter 1: URL
      //parameter 2: object to server { content: this.msg }
      //parameter 3: format for form { emulateJSON:true }
      this.$http.post('api/' + this.whichcomment, {id: this.id, name:"none", content:this.msg.trim()}).then(function(result){
        if(result.status === 200){
          
          // create a new comment object
          var cmt = {
            user_name: 'None',
            add_time: Date.now(),
            content: this.msg.trim()
          }
          this.comments.unshift(cmt)
          this.msg=''
        }
      })
    },
  },
  props:["id", "whichcomment"]
}
</script>
<style lang="scss" scoped>
.cmt-container{
  h3{
    font-size: 18px
  }
  textarea{
    font-size: 14px;
    height: 85px;
    margin: 0
  }
  .cmt-list{
    margin: 5px 0;
    .cmt-item{
      font-size: 13px;
      .cmt-title{
        line-height: 30px;
        background: #ccc;
        
      }
      .cmt-body{
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}



</style>