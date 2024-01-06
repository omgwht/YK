<template>
    <div id="biggest">
      
      <router-link to="/healthKnowledge">
        <div class="small_block animated fadeInLeft" id="first">
            <img src="../../../image/logo1.png">
                <span class="choice_text">健康科普</span>
            </div>
      </router-link>
        
      <router-link to="/smartPrescription">
        <div class="small_block animated fadeInDown" id="second">
            <img src="../../../image/logo2.png">
                <span class="choice_text">中医图谱</span>
            </div>
      </router-link>
        
      <router-link to="/datasharecenter">
        <div class="small_block animated fadeInUp" id="third">
            <img src="../../../image/logo3.png">
            <span class="choice_text" id="sjgxzx">数据共享中心</span>
        </div>
      </router-link>
        
      <router-link to="/culturEextend">
        <div class="small_block animated fadeInRight" id="forth">
            <img src="../../../image/logo4.png">
            <span class="choice_text">文化传承</span>
        </div>
      </router-link>
        
      <router-link to="/makeRegister">
        <div class="small_block animated fadeInRight" id="fifth">
            <img src="../../../image/logo6.png">
            <span class="choice_text">预约挂号</span>
        </div>
      </router-link>
    </div>
  </template>
  
  <script>
  export default {
    methods:{
      
    }
  }
  </script>
  
  <style>
  #biggest{
      height: 300px;
      width: 600px;
      position: relative;
  }
  .small_block{
      position: absolute;
      width: 240px;
      height: 240px;
      
      font-size: 23px;
      font-weight: bold;
      background-color: #880025;
      color: white;
      border-radius: 10px;
      transition: transform 0.3s ease; 
      
  }
  .small_block :hover {
  transform: scale(1.04); 
}
  #first{
    margin-top: 265px;
    margin-left: -610px;
  }
  #second{
    margin-top: 100px;
    margin-left: -340px;
  }
  #third{
    margin-top: 370px;
    margin-left: -340px;
  }
  #forth{
    margin-top: 265px;
    margin-left: -70px;
  }
  #fifth{
    margin-top: 265px;
    margin-left: 200px;
  }
  .animated {
    -webkit-animation-duration: 1s; 
    animation-duration: 1.5s; 
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
}
  img{
    height: 140px;
    width: 140px;
    margin-top: 20px;
  }
  .choice_text{
    position: absolute;
    margin-top: 170px;
    margin-left: -110px;
  }
  #sjgxzx{
    margin-left: -130px;
  }

  </style>