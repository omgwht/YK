<template>
  <div>
    <el-form :model="emrFormData" :rules="rules" ref="emrFormData">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="医生姓名" prop="doctorName">
            <el-input v-model="emrFormData.doctorName" placeholder="请输入医生姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col id="treat_date" :span="3">
          <el-form-item label="就诊日期" prop="treatDate">
            <el-date-picker v-model="emrFormData.treatDate" placeholder="选择就诊日期" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="患者姓名" prop="patientName">
            <el-input v-model="emrFormData.patientName" placeholder="请输入患者姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="患者身份证号" prop="patientIDNo">
            <el-input v-model="emrFormData.patientIDNo" placeholder="请输入患者身份证号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2" id="patient_age">
          <el-form-item label="患者年龄" prop="patientAge">
            <el-input v-model.number="emrFormData.patientAge" placeholder="请输入">
              <i slot="suffix" style="font-style:normal; margin-right: 10px;">岁</i>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item label="患者性别" prop="patientSex">
            <el-select v-model="emrFormData.patientSex" placeholder="请选择" style="width: 100%;">
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="病历编号" prop="dataId">
            <!-- <el-select v-model="emrFormData.treatType" placeholder="请选择" style="width: 100%;">
                                <el-option label="首次就诊" value="首次就诊"></el-option>
                                <el-option label="非首次就诊" value="非首次就诊"></el-option> -->
            <el-input v-model="emrFormData.dataId" :disabled="true"></el-input>
            <!-- </el-select> -->
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="病历详述" prop="detailText" style="margin-top: -18px;">
            <!-- <div id="detail_div" contenteditable="true">{{ emrFormData.detailText }}</div> -->
            <textarea id="detail_div" v-model="emrFormData.detailText" style="margin-top: -2px;"></textarea>
          </el-form-item>
        </el-col>
      </el-row>

      <hr />



      <el-row :gutter="20">
        <el-col :span="4">
          <el-form-item v-for="(treatMedicineName, index) in emrFormData.treatMedicineName_arr" :label="'治疗药品' + index"
            :key="treatMedicineName.key">
            <el-input v-model="treatMedicineName.value" placeholder="请输入药品名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item v-for="(medicineDaysTime, index) in emrFormData.medicineDaysTime_arr" :label="'每日次数' + index"
            :key="medicineDaysTime.key">
            <!-- <el-input v-model="medicineDaysTime" placeholder="请输入药品使用方法"></el-input> -->
            <el-select v-model="medicineDaysTime.value" placeholder="请选择">
              <el-option label="一日一次" value="一日一次"></el-option>
              <el-option label="一日两次" value="一日两次"></el-option>
              <el-option label="一日三次" value="一日三次"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item v-for="(DaysTimeMore, index) in emrFormData.DaysTimeMore_arr" :label="'次数备注' + index"
            :key="DaysTimeMore.key">
            <el-input v-model="DaysTimeMore.value" placeholder="输入备注"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item v-for="(medicineEatTime, index) in emrFormData.medicineEatTime_arr" :label="'服用时间' + index"
            :key="medicineEatTime.key">
            <el-select v-model="medicineEatTime.value" placeholder="请选择">
              <el-option label="餐前" value="餐前"></el-option>
              <el-option label="餐后" value="餐后"></el-option>
              <el-option label="不适时" value="不适时"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item v-for="(EatTimeMore, index) in emrFormData.EatTimeMore_arr" :label="'时间备注' + index"
            :key="EatTimeMore.key">
            <el-input v-model="EatTimeMore.value" placeholder="输入备注"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item v-for="(EatTimeMore, index) in emrFormData.EatTimeMore_arr" :label="'删除药品' + index"
            :key="EatTimeMore.key">
            <el-button type="danger" icon="el-icon-remove-outline" @click="deleteDrug(index)" plain size="mini">删除药品</el-button>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="3">
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addDrug" plain size="mini">添加药品</el-button>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-button type="primary" @click="submitForm('emrFormData')">提交</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: ['allow_dzbl_get_info', 'choosed_patient_infos'],
  data() {
    return {
      token: '',
      allow_dzbl_getinfo: false,
      choosed_patientinfos: {},
      emrFormData: {
        doctorName: '',
        treatDate: new Date,
        patientName: '',
        patientIDNo: '',
        patientAge: '',
        patientSex: '',
        // treatType:'',
        dataId: '',
        detailText: '',
        treatMedicineName_arr: [{
          value: '',
          key: Date.now()
        }],
        medicineDaysTime_arr: [{
          value: '',
          key: Date.now()
        }],
        DaysTimeMore_arr: [{
          value: '',
          key: Date.now()
        }],
        medicineEatTime_arr: [{
          value: '',
          key: Date.now()
        }],
        EatTimeMore_arr: [{
          value: '',
          key: Date.now()
        }]
      },
      rules: {
        patientName: [
          { required: true, message: '请输入患者姓名', trigger: 'blur' },
        ],
        patientIDNo: [
          { required: true, message: '身份证号不能为空', trigger: 'blur' },
          { validator: this.validID, trigger: 'blur' }
        ],
        patientAge: [
          { required: true, message: '年龄不能为空', trigger: 'blur' },
          { type: 'number', message: '年龄须为数字' }
        ],
        patientSex: [
          { required: true, message: '性别不能为空', trigger: 'blur' }
        ],
        treatType: [
          { required: true, message: '就诊类型不能为空', trigger: 'blur' },
        ],
        detailText: [
          { required: true, message: '详细诊断不能为空', trigger: 'blur' },
        ]
      }
    }
  },
  methods: {
    addDrug() {
      this.emrFormData.treatMedicineName_arr.push({
        value: '',
        key: Date.now()
      });
      this.emrFormData.medicineDaysTime_arr.push({
        value: '',
        key: Date.now()
      });
      this.emrFormData.DaysTimeMore_arr.push({
        value: '',
        key: Date.now()
      });
      this.emrFormData.medicineEatTime_arr.push({
        value: '',
        key: Date.now()
      });
      this.emrFormData.EatTimeMore_arr.push({
        value: '',
        key: Date.now()
      });
    },

    deleteDrug(index) {
      this.emrFormData.treatMedicineName_arr.splice(index, 1);
      this.emrFormData.medicineDaysTime_arr.splice(index, 1);
      this.emrFormData.DaysTimeMore_arr.splice(index, 1);
      this.emrFormData.medicineEatTime_arr.splice(index, 1);
      this.emrFormData.EatTimeMore_arr.splice(index, 1);
    },
    submitForm(formName) {
      console.log('this is submitForm')
      console.log(this.emrFormData);
      // this.$refs[formName].validate((valid) => {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.sendDataToServer(this.emrFormData);
          // // console.log(this.emrFormData);
          axios.post('/api/emr/senddatain', this.emrFormData, {
            headers: {
              'Content-Type': "application/json;charset=UTF-8",
              'token': this.token,
            }
          }).then(res => {
            if(res.data.code == 1){
              this.$message.success('电子病历创建成功！')
            }else{
              this.$message.error('电子病历创建失败，请重试')
            }
            console.log(res)
          })
        } else {
          this.$message.error('请将所有必填项填写完整')
        }
      })
    },
    sendDataToServer(data) {
      axios.post('/api/emr/senddatain', this.emrFormData, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          'token': this.token
        }
      }).then(res => {
        console.log(res.data);
      })
    },
    // 身份证验证
    async validID(rule, value, callback) {
      // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
      let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (reg.test(value)) {
        await this.go(value.length);
        callback()
      } else {
        callback(new Error('身份证号码不正确'))
      }
    },

    // 实现自动生成生日，性别，年龄
    go(val) {
      let iden = this.emrFormData.patientIDNo;
      let sex = null;
      let birth = null;
      let myDate = new Date();
      let month = myDate.getMonth() + 1;
      let day = myDate.getDate();
      let age = 0;

      if (val === 18) {
        age = myDate.getFullYear() - iden.substring(6, 10) - 1;
        sex = iden.substring(16, 17);
        birth = iden.substring(6, 10) + "-" + iden.substring(10, 12) + "-" + iden.substring(12, 14);
        if (iden.substring(10, 12) < month || iden.substring(10, 12) == month && iden.substring(12, 14) <= day) age++;

      }
      if (val === 15) {
        age = myDate.getFullYear() - iden.substring(6, 8) - 1901;
        sex = iden.substring(13, 14);
        birth = "19" + iden.substring(6, 8) + "-" + iden.substring(8, 10) + "-" + iden.substring(10, 12);
        if (iden.substring(8, 10) < month || iden.substring(8, 10) == month && iden.substring(10, 12) <= day) age++;
      }

      if (sex % 2 === 0)
        sex = '0';
      else
        sex = '1';
      //性别  ==> 1:男       0:女
      this.emrFormData.patientSex = sex;
      this.emrFormData.patientAge = age;
      // this.form.birthdate = birth;
    },
  },
  mounted() {
    this.token = localStorage.getItem('token')
    this.allow_dzbl_getinfo = this.$props.allow_dzbl_get_info
    if (this.allow_dzbl_getinfo) {
      this.choosed_patientinfos = this.$props.choosed_patient_infos

      this.emrFormData.patientName = this.choosed_patientinfos.patient_name
      this.emrFormData.treatDate = this.choosed_patientinfos.date
      this.emrFormData.doctorName = this.choosed_patientinfos.doc_name
      this.emrFormData.patientIDNo = this.choosed_patientinfos.patient_id_num
      this.emrFormData.dataId = getTimeNum()
      this.go(this.emrFormData.patientIDNo.length)
    }
  }
}


/**
       * 根据身份证号获取年龄
       * @param:身份证号
       */
function getAgeByAnalyzeIDCard(IDCard) {
  var age = 0, yearBirth, monthBirth, dayBirth;
  //获取用户身份证号码
  var userCard = IDCard;
  //如果身份证号码为undefind则返回空
  if (!userCard) {
    return age;
  }
  var reg = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/; //验证身份证号码的正则
  if (reg.test(userCard)) {
    if (userCard.length == 15) {
      var org_birthday = userCard.substring(6, 12);
      //获取出生年月日
      yearBirth = "19" + org_birthday.substring(0, 2);
      monthBirth = org_birthday.substring(2, 4);
      dayBirth = org_birthday.substring(4, 6);
    } else if (userCard.length == 18) {
      //获取出生年月日
      yearBirth = userCard.substring(6, 10);
      monthBirth = userCard.substring(10, 12);
      dayBirth = userCard.substring(12, 14);

    }
    //获取当前年月日并计算年龄
    var myDate = new Date();
    var monthNow = myDate.getMonth() + 1;
    var dayNow = myDate.getDate();
    var age = myDate.getFullYear() - yearBirth;
    if (monthNow < monthBirth || (monthNow == monthBirth && dayNow < dayBirth)) {
      age--;
    }
    //返回年龄
    return age;
  } else {
    return ''
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
#detail_div {
  height: 300px;
  width: 98%;
  border: 2px solid lightgrey;
  border-radius: 5px;
  position: relative;
  margin-top: 40px;
  text-align: left;
  line-height: 19px;
  font-size: 15px;
  padding: 15px;
  overflow: auto;
}
.el-button--danger span{
  color: black;
}
.el-button--mini span{
  color: black;
}

#treat_date i{
  position: absolute;
  margin-left: -10px;
  margin-top: 5px;
}

#patient_age i{
  font-size: 15px;
  color: gray;
  position: absolute;
  margin-top: 5px;
  margin-left: -20px;
}
</style>