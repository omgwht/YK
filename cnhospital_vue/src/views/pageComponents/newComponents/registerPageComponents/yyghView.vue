<template>
  <div id="yygh">
    <el-steps :active="active" finish-status="success" :space="500" align-center='true'>
      <el-step title="选择科室"></el-step>
      <el-step title="选择医生"></el-step>
      <el-step title="选择日期"></el-step>
    </el-steps>

    <div id="step1" v-show="active == 1">
      <div id="step1_choices" class="step_main">
        <div class="departments_choice animated bounceIn" v-for="(item, index) in departments" :key="index"
          @click="chooseDepartment(index, item)">{{ item }}</div>
      </div>
    </div>
    <div id="step2" v-show="active == 2">
      <div id="step2_choices" class="step_main">
        <div class="names_choice animated bounceIn" v-for="(item, index) in doc_names" :key="index" @click="chooseName(index, item)">
          <div style="margin-top: 30px; font-weight: bolder; font-size: 23px;">{{ item.user_name }}</div>
          <div style="margin-top: 20px; font-weight: bold; font-size: 15px;">{{ item.user_job }}</div>
          <div style="margin-top: 10px; font-size: 15px;">{{ item.user_gender }}</div>
          <!-- item.user_image是证件照的url -->
          <!-- <span>{{ item.user_image }}</span> -->
        </div>
      </div>
    </div>
    <div id="step3" v-show="active == 3">
      <el-date-picker v-model="data_value" type="datetime" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
        placeholder="请选择就诊日期" :picker-options="pickerOptions0"></el-date-picker>
    </div>

    <!-- <el-button style="margin-top: 12px;" @click="last" :disabled="last_disabled">上一步</el-button>
    <el-button style="margin-top: 12px;" @click="next" :disabled="next_disabled">下一步</el-button> -->
    <div style="margin-top: 40px;">
      <el-button type="primary" size="mini" v-show="last_btn_show" @click="gobackToLastOne">上一步</el-button>
      <el-button type="primary" size="mini" v-show="ack_btn_show" @click="submitRegister">确认</el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: ['patient_name', 'patient_id_num'],
  data() {
    return {
      patient_token: '',
      active: 1,
      departments: [],
      doc_names: [],
      data_value: '',
      regislation_data_id: '',
      pickerOptions0: {
        disabledDate(time) {
          // const today = new Date();
          // today.setHours(0, 0, 0, 0); // 将时间设置为当天的开始时间
          // const oneWeekLater = new Date(today);
          // oneWeekLater.setDate(today.getDate() + 7); // 计算一周后的日期
          // const limitDate = new Date(today);
          // limitDate.setDate(today.getDate() + 1); // 计算今天之后的一天的日期

          // // 检查给定的日期是否在限制范围内
          // return time.getTime() < today.getTime() || time.getTime() > limitDate.getTime() || time.getMonth() !== limitDate.getMonth();
         
                // return time.getTime() < Date.now() - 8.64e7;
            
                // 获取今天的日期
                let today = new Date();
                // 获取明天的日期
                today.setDate(today.getDate() + 1);
                // 获取七天后的日期
                today.setDate(today.getDate() + 6);
                // 将日期转换为毫秒数
                let endTime = today.getTime();
                // 获取当前时间的毫秒数
                let startTime = time.getTime();
                // 如果当前时间大于结束时间，说明已经过了7天，返回true表示禁用
                return startTime > endTime;
        }
      },
      last_disabled: true,
      ack_btn_show: false,
      last_btn_show: true,

      choosed_doc_info: {
        doc_job: '',
        doc_name: '',
        date: '',
        doc_department: '',
        patient_name: '',
        patient_id_num: '',
        state: 0,
        regislation_data_id: ''
      },


      // pickerOptions0: {
      //   disabledDate(time) {
      //     const today = new Date();
      //     const oneWeekLater = new Date(today);
      //     oneWeekLater.setDate(today.getDate() + 7);
      //     return time.getTime() > oneWeekLater.getTime();
      //   }
      // }
    };
  },

  methods: {
    chooseDepartment(index, item) {
      this.getDocNameByDepName(item)
      this.active = 2
      this.choosed_doc_info.doc_department = item
      this.choosed_doc_info.patient_name = this.$props.patient_name
      this.choosed_doc_info.patient_id_num = this.$props.patient_id_num
    },
    getDocNameByDepName(department_name) {
      console.log('ok')
      let request_data = {
        'department_name': department_name
      }
      axios.post('/api/patient/getdepartmentdocname', request_data, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "token": this.patient_token
        }
      }).then(res => {
        console.log('this is res')
        console.log(res)
        this.doc_names = res.data.data
      })
    },
    chooseName(index, item) {
      //console.log(index,item)
      this.choosed_doc_info.doc_name = item.user_name
      this.choosed_doc_info.doc_job = item.user_job
      this.active = 3
      this.ack_btn_show = true
      console.log(this.choosed_doc_info)
    },
    submitRegister() {
      this.choosed_doc_info.date = this.data_value
      console.log(this.choosed_doc_info)
      axios.post('/api/patient/setnewregistration', this.choosed_doc_info, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "token": this.patient_token
        }
      }).then(res => {
        if (res.data.code == 1) {
          this.$message({
            type: 'success',
            message: '挂号成功！'
          })
          this.$emit('registrationSuccess', 1)
        } else {
          this.$message({
            type: 'error',
            message: '挂号失败，请重试'
          })
        }
      })
    },
    gobackToLastOne() {
      if (this.active != 1) {
        this.active--;
      }
    }
  },
  mounted() {
    this.patient_token = localStorage.getItem('patient_token')
    console.log(this.token)
    axios.post('/api/patient/getdepartments', '', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'token': this.patient_token
      }
    }).then(res => {
      this.departments = res.data.data
    })
    this.choosed_doc_info.regislation_data_id = getTimeNum()
  },
  watch: {
    // active(oldNum, newNum){
    //   console.log(newNum)
    //   if(newNum == 3){
    //     this.next_btn_content = '确认'
    //   }else{
    //     this.next_btn_content = '下一步'
    //   }
    // }
  }
}
var checkTime = function (i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
};
function getTimeNum() {
  var nowdate = new Date();
  var year = nowdate.getFullYear(),
    month = nowdate.getMonth() + 1,
    date = nowdate.getDate(),
    day = nowdate.getDay(),
    week = ["07", "01", "02", "03", "04", "05", "06"],
    h = nowdate.getHours(),
    m = nowdate.getMinutes(),
    s = nowdate.getSeconds(),
    month = checkTime(month),
    h = checkTime(h),
    m = checkTime(m),
    s = checkTime(s);
  return year + "1" + month + date + week[day] + h + m + s;
}
</script>

<style>
#step1_choices {
  display: flex;
  flex-flow: wrap;
  margin-left: 16%;
  /* border: 2px solid red; */
  width: 70%;
}

#step2_choices{
  /* border: 1px solid red; */
  width: 88%;
  margin-left: 7%;
}

.departments_choice {
  height: 80px;
  width: 150px;
  line-height: 80px;
  font-size: 20px;

  background-color: #d0deaa;
  border-radius: 5px;
  margin-left: 15px;
  margin-top: 20px;
}

.names_choice {
  height: 150px;
  width: 300px;
  /* border: 2px solid blue; */
  background-color: #d0deaa;
  margin-left: 20px;
  margin-top: 20px;
  border-radius: 5px;
  font-size: large;
}

.step_main {
  width: 100%;
  display: flex;
  flex-flow: wrap;
  margin-top: 30px;
}

#yygh>#step3 span {
  color: black;
}

#yygh>.el-button span {
  color: black;
}

#step2_choices>.names_choice span {
  color: black;
}

.next-month>div>span {
  color: #bdbdbd;
}

.available>div>span {
  color: #bdbdbd;
}
.el-button--mini span {
  padding-left: 0px;
}
.el-input__icon{
  margin-left: -30px;
}
.is-plain span{
  color: black;
}

#step3 i{
  position: absolute;
  margin-left: -30px;
  margin-top: 0px;
}
</style>