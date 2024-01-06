<template>
  <div class="main_block">
      <el-container>
        <el-header>
            <header-bar class="animated fadeInDown"></header-bar>
        </el-header>
        <el-main id="main">
            <!-- <public-choices id="choices"></public-choices> -->
            <choices-view id="choices"></choices-view>
        </el-main>
    </el-container>
  </div>
</template>

<script>
import ChoicesView from '../../newComponents/ChoicesView.vue'
import headerBar from '../../newComponents/headerBar.vue'

// import PublicChoices from '../../newComponents/publicChoices.vue'
export default {
  components: { headerBar, ChoicesView },

}
</script>


<style>
#choices{
  margin-left: 65%;
  margin-top: -50px;
}
.main_block{
  background-image: url(../../../../image/mainPageBG.jpg);
  background-repeat: no-repeat;
}
#main{
  height: 1000px;
}

</style>