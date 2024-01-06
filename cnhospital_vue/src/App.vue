<template>
  <div id="app">
    <!-- <login-view></login-view> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import LoginView from './views/element/LoginView.vue'


export default {
  components: {  },
  mounted(){
    window.addEventListener('unload', e => this.unloadHandler(e))
  },
  destroyed(){

    window.removeEventListener('unload', e => this.unloadHandler(e))
  },
  methods: {
    async unloadHandler(e){
      await localStorage.clear();
      window.close();
    }
  }
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: white;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

router-view{
  height: 1000px;
}

body{
  padding: 0px;
}
.el-header{
  padding-top: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
  padding-left: 0px;
}
el-header{
  padding-top: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
  padding-left: 0px;
}
header.el-header{
  padding-top: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
  padding-left: 0px;
}

.el-button{
  padding: 5px 10px;
}
.el-button--mini, .el-button--mini.is-round {
    padding: 0px 5px;
}
.el-button--mini span{
  padding-left: 5px;
  padding-right: 15px;
  font-size: 15px;
  line-height: 30px;
  padding-top: 5px;
  padding-bottom: 5px;
}

.el-button span{
  margin-left: 0px;
  margin-left: 10px;
}
</style>
