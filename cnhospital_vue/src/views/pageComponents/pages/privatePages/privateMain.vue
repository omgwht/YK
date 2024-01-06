<template>
  <el-container id="priv_login_biggest">
        <el-header>
            <header-bar></header-bar>
        </el-header>
        <el-main id="main">
            <login-view id="login_view_div"></login-view>
        </el-main>
    </el-container>
  
</template>

<script>
import HeaderBar from '../../newComponents/headerBar.vue';
import LoginView from './loginView.vue';

export default {
  components: {
    HeaderBar,
    LoginView
  },
  
}
</script>

<style>
  #priv_login_biggest{
    height: 100%;
    background-image: url('../../../../image/loginBackground.png') ;
    background-color: #f7f2eb;
    background-repeat: no-repeat
    ;
    
  }
  #main{
    height: 800px;
  }
</style>