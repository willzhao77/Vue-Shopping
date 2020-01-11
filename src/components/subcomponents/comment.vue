<template>
  <div class="cmt-container">
    <h3>Create Comment</h3>
    <textarea placeholder="Please enter your comment (max 10)" maxlength="10"></textarea>
    <mt-button type="primary" size="large">Send Comment</mt-button>

    

    <div class="cmt-list">
      <div class="cmt-item" v-for="(item, i) in comments" :key="item.add_time">
        <div class="cmt-title">
          {{ i+1 }} &nbsp;&nbsp; Name: {{ item.user_name }} &nbsp;&nbsp; Time: {{ item.add_time | dateFormat }}
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
      pageIndex : 1, // display the first page by default
      comments:[] //all comments
    }
  },
  created(){
    this.getComments()
  },
  methods:{
    getComments(){  //get comments
      this.$http.get("api/getcomments/"+this.id+"?pageindex=" + this.pageIndex).then(result => {
        if(result.body.status === 0){
          // this.comments = result.body.message
          //keep old comment when click 'more'
          this.comments = this.comments.concat(result.body.message)
        }else{
          Toast('load comments faild...')
        }
      })
    },

    getMore(){ //get more data
      this.pageIndex++
      this.getComments()
    }
  },
  props:["id"]
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