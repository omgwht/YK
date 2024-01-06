<template>
  <div id="cover_biggest">
    <div id="two_text">
        <img src="../../../../image/coverText1.png">
        <img src="../../../../image/coverText2.png">
    </div>
    <div id="cover_two_btn">
        <div   @click="handleBtn1Click"><img id="cover_btn1" class="cover_btns" src="../../../../image/coverLogo1.png"></div>
        <div   @click="handleBtn2Click"><img id="cover_btn2" class="cover_btns" src="../../../../image/coverLogo2.png"></div>
    </div>
  </div>
</template>

<script>
export default {
    methods:{
        handleBtn1Click(){
            localStorage.setItem("now_page",'ggxt')
            this.$router.push({
                name:"mainpage",
                // 可以传递参数
                // params:{
                    
                // }
            })
        },
        handleBtn2Click(){
            localStorage.setItem("now_page",'glxt')
            this.$router.push({
                name:"privatemain"
            })
        },

    }
}
</script>

<style>
#cover_biggest{
    height: 1000px;
    width: 100%;
    background-image: url('../../../../image/coverBG.jpg');
    background-repeat: no-repeat;
    background-size: contain;
    position: relative;
}
#two_text{
    padding-top: 50px;
}
#cover_two_btn{
    width: 900px;
    position: relative;
    padding-top: 100px;
    padding-left: 300px;
}
#cover_btn1{
    margin-left: -600px;
}
#cover_btn2{
    margin-top: -195px;
    margin-left: 600px;
}
.cover_btns{
    transition: transform 0.3s ease-in-out;
}
#cover_btn1:hover, #cover_btn2.cover_btns:hover {
    transform: translateY(-20px);
}
</style>