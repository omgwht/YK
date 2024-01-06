<template style="background-image: url(../../../../image/loginBackground.png);">
    <div id="biggest" >
      <!-- <div id="loginapp">
        <div id="formArea">
            <el-form label-width="80px" ref="loginForm" >
            <el-form-item label="用户名" prop="user_account">
              <el-input v-model="loginForm.user_account"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="user_password">
              <el-input v-model="loginForm.user_password" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" id="loginBtn">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div> -->
      <!-- 中间有背景区域 -->
      <div id="center_div">
            <div id="center_div_bg">
                <div id="in_center_upper">
                    <div id="in_left">
                        <div id="left_text">中医医院智慧化建设</div>
                    </div>
                    <div id="in_right">
                        <div id="right_text">Version:1.0</div>
                    </div>
                </div>

                <div id="in_center">
                    <div id="center_text">
                        <!-- <form action="./js/login.js" method="post"> -->
                            <div id="user_no">
                                <span>账号：</span>
                                <span><input id="userNo_input" type="text" name="user" v-model="loginForm.user_account"></span>
                            </div>
                            <div id="password">
                                <span>密码：</span>
                                <span><input id="password_input" type="password" name="pwd" v-model="loginForm.user_password"></span>
                            </div>
                            <!-- <div id="btn_submit" onclick="window.location.href='./js/privLogin.js'">
                                <input id="input_submit" type="submit" value="登录">
                            </div> -->
                        <!-- </form> -->
                    </div>
                </div>

                <div id="in_bottom">
                    <div id="bottom_bg">
                        <div id="bottom_text" @click="onSubmit">登录</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
  </template>
  
  <script>
  import axios from 'axios';
  import Canvas from '../../../../scripts/canvas-nest'
  import HeaderBar from '../../newComponents/headerBar.vue';
  
  export default {
    components: {
      Canvas,
      HeaderBar
    },
    data() {
      return {
        loginForm:{
          user_account: '',
          user_password: ''
        }
      }
    },
    methods: {
      onSubmit(loginForm){
        
        var loginData = {
          "user_account" : this.loginForm.user_account,
          "user_password" : this.loginForm.user_password
        }
  
        axios.post("/api/login",this.loginForm).then(result => {
          if(result.data.code==1){
            localStorage.setItem("token",result.data.data),
            localStorage.setItem("user_account",this.loginForm.user_account),
            this.$message({
              message: '登录成功',
              type: 'success'
          });
          this.$router.push({
                name:"privHomepage"
            })
          }else if(result.data.code==10){
            // 登录的用户是管理员
            localStorage.setItem("identity","administrator");
          }else{
            this.$message.error('账号或密码错误，请检查');
          }
        })
        .catch(error => {
          this.$message.error('网络连接异常！');
        })
      }
    }
  }
  </script>
  
  <style>
    #biggest{
      width: 100%;
      height: 100%;
      position: fixed;
      background-size: 100% 100%;
      /* background: url('../../image/background-1.png'); */
    }
    #loginapp{
      width: 50%;
      height: 40%;
      align-items: center;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: 0 auto;
      margin-top: 13%;
      
      border: 2px solid #9A9DFF;
      border-radius: 10px;
      color: white;
      backdrop-filter: blur(10px);
    }
    #formArea{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    #loginBtn{
        font-size: 10px;
        padding: 3px 25px;
    }


    /* 设置中间区域蓝色背景块 */
#center_div{
    position: relative;
    color: white;
    margin-top: -50px;
}
#center_div_bg{
    position: absolute;
    background-color:rgba(0,0,0,0.55);
    backdrop-filter: blur(5px);
    height: 500px;
    width: 65%;
    margin-left: 18%;
    margin-top: 6%;
}

/* 中间区域上方文字块 */
#in_center_upper{
    height: 50px;
    width: 80%;
    border: 2px solid white;
    border-left: 0px;
    border-right: 0px;
    margin-left: 10%;
    margin-top: 5%;
}

/* 左侧 */
#in_left{
    line-height: 50px;
    height: 50px;
    width: 70%;
    border-left: 0px;
    border-right: 2px solid white;
    float: left;
    overflow: hidden;
}
#left_text{
    margin-left: 5%;
    font-size: 25px;
}

/* 右侧 */
#in_right{
    line-height: 50px;
    height: 50px;
    width: 30%;
    margin-left: 70%;
}
#right_text{
    margin-left: 5%;
    font-size: 25px;
    overflow: hidden;
}



/* 中间区域 */
#in_center{
    margin-top: 3%;
    margin-left: 10%;
    width: 80%;
    height: 40%;
    font-size: 40px;
    /* border: 2px solid black; */
    /* overflow: hidden; */
}
#center_text{
    margin-left: 25%;
    margin-top: 7%;
}
#user_no{
    margin-bottom: 5px;
}
#userNo_input{
    /* line-height: 40%; */
    height: 40px;
    font-size: large;
}
#password_input{
    height: 40px;
    font-size: large;
}
#input_submit{
    width:240px;
    height:40px;
    margin-top:25px;
    margin-left: 12%;
    /* background:#B7FF4A; */
    background-image: linear-gradient(to right,#0A284B,40%,#213A5B);
    color: white;
    font-weight: bolder;
    font-size: 20px;
}


/* 底部点击登录区域 */
#in_bottom{
    height: 60px;
    width: 25%;
    /* border: 2px solid wheat; */
    margin-top: 3%;
    margin-left: 65%;
    background-image: linear-gradient(to right,rgb(110,29,42),40%,rgb(195, 23, 52));
}
#bottom_text{
    /* border: 2px solid wheat; */
    line-height: 60px;
    height: 60px;
    font-size: 25px;
    margin-left: 35%;
}
  </style>