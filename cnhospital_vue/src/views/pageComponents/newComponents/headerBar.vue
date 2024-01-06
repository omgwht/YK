<template>
  <div class="animated fadeInDown">
    <div id="biggest_block">
        <el-row>
          <el-col :span="16">
            <div>&nbsp;</div>
          </el-col>
          <el-col :span="8">
                <router-link to="/mainpage">
                    <span id="ggxt_router_link" @click="pubChangeBtnBG('ggxt')" ref="ggxt" :style="{ backgroundImage: `url(${ggxtimgUrl})` }">公众版</span>
                </router-link>
                <router-link to="/privatemain">
                    <span id="glxt_router_link" @click="pubChangeBtnBG('glxt')" ref="glxt" :style="{ backgroundImage: `url(${glxtimgUrl})` }">员工版</span>
                </router-link>
          </el-col>
        </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      now_page: 'ggxt',
      ggxtimgUrl: require('../../../image/header-icon1_yellow.png'),
      glxtimgUrl: require('../../../image/header-icon1_white.png')
    }
  },
  methods:{
    pubChangeBtnBG(clicked_page_name){
      if(clicked_page_name == 'ggxt'){
        localStorage.setItem("now_page",'ggxt')
        this.now_page = 'ggxt'
        this.ggxtimgUrl = require('../../../image/header-icon1_yellow.png')
        this.glxtimgUrl = require('../../../image/header-icon1_white.png')
      }
      else{
        localStorage.setItem("now_page",'glxt')
        this.now_page = 'glxt'
        this.glxtimgUrl = require('../../../image/header-icon1_yellow.png')
        this.ggxtimgUrl = require('../../../image/header-icon1_white.png')
      }
    }
  },
  mounted(){
    var now_page = localStorage.getItem("now_page")
    if(now_page == 'ggxt'){
      this.ggxtimgUrl = require('../../../image/header-icon1_yellow.png')
      this.glxtimgUrl = require('../../../image/header-icon1_white.png')
    }else if(now_page == 'glxt'){
      this.glxtimgUrl = require('../../../image/header-icon1_yellow.png')
      this.ggxtimgUrl = require('../../../image/header-icon1_white.png')
    }
  }
}
</script>

<style>
.el-main{
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
#biggest_block{
    background-color: #6e1d2a;
    height: 40px;
    margin-left: 0px;
    margin-right: 0px;
    margin-bottom: 0px;
    width: 100%;
}
span{
    margin-left: 30px;
    font-size: 20px;
    line-height: 40px;
    margin-top: 1px;
    margin-bottom: 5px;
    color: white;
}
#ggxt_router_link{
  display: inline-block;
  width: 150px;
  background-size: contain;
  background-repeat: no-repeat;
}
#glxt_router_link{
  display: inline-block;
  width: 150px;
  background-size: contain;
  background-repeat: no-repeat;
}

</style>