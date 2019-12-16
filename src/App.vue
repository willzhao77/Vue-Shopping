<template>
  <div class="app-container">

   <!-- top head -->
    <mt-header fixed title="Vue Project"></mt-header>


    <!-- center area -->




    <!-- bottom -->
<mt-tabbar v-model="selected" fixed>
  <mt-tab-item id="tab1">
    <img slot="icon" src="images/1.png">
    tab1
  </mt-tab-item>
  <mt-tab-item id="tab2">
    <img slot="icon" src="images/2.png">
    tab2
  </mt-tab-item>
  <mt-tab-item id="tab3">
    <img slot="icon" src="images/3.png">
    tab3
  </mt-tab-item>
  <mt-tab-item id="tab4">
    <img slot="icon" src="images/4.png">
    tab4
  </mt-tab-item>
</mt-tabbar>

    


    <h1>这是app组件</h1>

  

  <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
    
  </div>
</template>

<script>
export default {
  name: 'page-tabbar',
  data() {
    return {
      selected: 'tab1'
    };
  }
};


</script>


<style lang="scss" scoped>
.app-container{
  padding-top: 40px;
}




</style>