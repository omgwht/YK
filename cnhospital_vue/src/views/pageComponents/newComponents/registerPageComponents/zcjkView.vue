<template>
  <div id="zcjk_biggest">
    <el-tabs v-model="activeName" @tab-click="handleTabClick">
      <el-tab-pane label="注册" name="first">
        <el-form :model="registerFormData" :rules="rules" ref="registerFormData">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="registerFormData.name" placeholder="请输入患者姓名"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="id_num">
            <el-input v-model="registerFormData.id_num" placeholder="请输入患者身份证号码"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="registerFormData.password" placeholder="请输入密码"
              autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="ack_password">
            <el-input type="password" v-model="registerFormData.ack_password" placeholder="请确认密码"
              autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitClick('registerFormData')">注册</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="登录" name="second">
        <el-form :model="loginData" :rules="loginRules" ref="loginData">
          <el-form-item label="身份证号" prop="id_num">
            <el-input v-model="loginData.id_num" placeholder="请输入患者身份证号"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="loginData.password" placeholder="请输入密码" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="patientLogin('loginData')">登录</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>




  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.registerFormData.ack_password !== '') {
          this.$refs.registerFormData.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerFormData.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      activeName: 'second',
      registerFormData: {
        name: '',
        id_num: '',
        password: '',
        ack_password: ''
      },
      loginData: {
        id_num: '',
        password: ''
      },

      rules: {
        token: '',
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        id_num: [
          { required: true, message: '请输入身份证号码', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              const idRegex = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
              if (!idRegex.test(value)) {
                callback(new Error('请输入有效的身份证号码'));
              } else {
                callback();
              }
            }
          }
        ],
        password: [
          { required: true, message: '请输入密码' },
          { validator: validatePass, trigger: 'blur' }
        ],
        ack_password: [
          { required: true, message: '请再次输入密码' },
          { validator: validatePass2, trigger: 'blur' }
        ],
      },
      loginRules: {
        id_num: [
          { required: true, message: '请输入身份证号码', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              const idRegex = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
              if (!idRegex.test(value)) {
                callback(new Error('请输入有效的身份证号码'));
              } else {
                callback();
              }
            }
          }
        ],
        password: [
          { required: true, message: '请输入密码！' }
        ]
      }
    }
  },
  methods: {
    handleTabClick(tab, event) {
      // console.log(tab, event);
    },
    submitClick(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post("/api/patient/register", this.registerFormData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
              //'token': this.token,
            }
          }).then(res => {
            //console.log(res);
            if (res.data.code == 1) {
              this.$message.success(res.data.data)
            } else if (res.data.code == 0) {
              this.$message.error(res.data.data)
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    patientLogin(formName) {
      this.$refs[formName].validate((valid) => {
        this.$emit('patient_id_num', this.loginData.id_num)
        if (valid) {
          axios.post("/api/patient/login", this.loginData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
              //'token': this.token,
            }
          }).then(res => {
            console.log(res);
            if (res.data.code == 1) {
              this.$message.success("登录成功！")
              console.log(res.data.data)
              localStorage.setItem('patient_token', res.data.data)
              this.getPatientName('loginData')
            } else if (res.data.code == 0) {
              this.$message.error("身份证或密码错误，请重试")
            }
          })
        } else {
          //console.log('error submit!!');
          return false;
        }
      });
    },
    getPatientName(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post("/api/patient/login/getloginname", this.loginData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
              //'token': this.token,
            }
          }).then(res => {
            console.log(res.data.data)
            this.$emit('patientName', res.data.data)
            sessionStorage.setItem("user", JSON.stringify(res.data.data))
            sessionStorage.setItem("username", res.data.data)
            console.log(sessionStorage.getItem("user"))
          })
        } else {
          //console.log('error submit!!');
          return false;
        }
      });
    }
  },
  mounted() {
    this.token = localStorage.getItem("token")
    
  }
}
</script>

<style>
#zcjk_biggest{
  padding: 10px 40px;
}
</style>