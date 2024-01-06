<template>
  <div id="r_biggest">
    <div class="r_choice animated fadeInDown" id="r_first" @click="handleClick('zcjkView')">注册建卡</div>
    <div class="r_choice animated fadeInDown" id="r_second" @click="handleClick('yyghView')">预约挂号</div>
    <div class="r_choice animated fadeInDown" id="r_third" @click="handleClick('yyjlView')">预约记录</div>
    <div class="r_choice animated fadeInUp" id="r_forth" @click="handleClick('grcfView')">个人处方</div>
    <div class="r_choice animated fadeInUp" id="r_fifth" @click="handleClick('chatPage')">消息管理</div>
    <div class="r_choice animated fadeInUp" id="r_sixth" @click="handleClick('ssfkView')">申诉反馈</div>
  </div>
</template>

<script>
export default {
    methods: {
    handleClick(choice) {
      this.$emit('change', choice);
    }
  }
}
</script>

<style>
#r_biggest{
    display: flex;
    flex-flow: wrap;
    width: 58%;
    padding-left: 27%;
}
.r_choice{
    height: 240px;
    width: 200px;
    background-color: #8ba7dd;
    margin-left: 20px;
    margin-top: 20px;
    line-height: 240px;
    font-size: 20px;
    color: #ffffff;
    transition: margin-top 0.3s ease, background-color 0.3s ease; /* 添加过渡效果 */
}
#r_first{
    background-color: #8ba7dd;
}
#r_second{
    background-color: #708cc3;
}
#r_third{
    background-color: #657ba7;
}
#r_forth{
    background-color: #c9b997;
}
#r_fifth{
    background-color: #657ba7;
}
#r_sixth{
    background-color: #85a7e0;
}
/* 添加：hover伪类 */
.r_choice:hover {
    margin-top: -3px; /* 向上移动3px */
}
#r_first:hover{
    background-color: #5a82cf;
}
#r_second:hover{
    background-color: #335baa;
}
#r_third:hover{
    background-color: #234382;
}
#r_forth:hover{
    background-color: #b29b6b;
}
#r_fifth:hover{
    background-color: #234382;
}
#r_sixth:hover{
    background-color: #5181d3;
}
</style>