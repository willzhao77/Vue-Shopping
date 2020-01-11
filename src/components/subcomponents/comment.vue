<template>
  <div class="cmt-container">
    <h3>Create Comment</h3>
    <textarea placeholder="Please enter your comment (max 10)" maxlength="10"></textarea>
    <mt-button type="primary" size="large">Send Comment</mt-button>

    

    <div class="cmt-list">
      <div class="cmt-item">
        <div class="cmt-title">
          1 &nbsp;&nbsp; Name: None &nbsp;&nbsp; Time: 2012-12-12 12:12:12
        </div>
        <div class="cmt-body">
          This is test commoent
        </div>
      </div>

      <div class="cmt-item">
        <div class="cmt-title">
          1 &nbsp;&nbsp; Name: None &nbsp;&nbsp; Time: 2012-12-12 12:12:12
        </div>
        <div class="cmt-body">
          This is test commoent
        </div>
      </div>
      <div class="cmt-item">
        <div class="cmt-title">
          1 &nbsp;&nbsp; Name: None &nbsp;&nbsp; Time: 2012-12-12 12:12:12
        </div>
        <div class="cmt-body">
          This is test commoent
        </div>
      </div>





    </div>

    <mt-button type="danger" size="large" plain>Show More...</mt-button>
  </div>
</template>
<script>
export default {
  
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