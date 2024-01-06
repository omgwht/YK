<template>
  <div id="yyjl_main">
    <div class="recodes_div_class recordsTitle">
      <div id="data_id" class="info_rows">
        预约单号
      </div>
      <div id="date" class="info_rows">
        预约日期
      </div>
      <div id="doc_department" class="info_rows">
        科室
      </div>
      <div id="doc_name" class="info_rows">
        医生姓名
      </div>
      <div id="doc_job" class="info_rows">
        医生职位
      </div>
      <div id="state" class="info_rows">
        就诊状态
      </div>
      <div id="operate" class="info_rows">
        操作
      </div>
    </div>
    
    <div v-for="(item, index) in registration_data" :key="index" class="recodes_div_class" >
      <!-- <span>{{ item.date }}</span>
      <span>{{ item.doc_department }}</span>
      <span>{{ item.doc_name }}</span>
      <span>{{ item.doc_job }}</span>
      <span>{{ item.state == 1 ? '已就诊' : '未就诊' }}</span> -->
      <div id="data_id" class="info_rows">
        {{ item.regislation_data_id }}
      </div>
      <div id="date" class="info_rows">
        {{ item.date }}
      </div>
      <div id="doc_department" class="info_rows">
        {{ item.doc_department }}
      </div>
      <div id="doc_name" class="info_rows">
        {{ item.doc_name }}
      </div>
      <div id="doc_job" class="info_rows">
        {{ item.doc_job }}
      </div>
      <div id="state" class="info_rows">
        {{ item.state == 1 ? '已就诊' : '未就诊' }}
      </div>
      <div id="operate" class="info_rows">
        <el-button type="primary" size="mini" v-show="item.state == 0" @click="cancelRegislation(index)">取消预约</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['patient_id_num'],
  data(){
    return{
      patient_token: '',
      initPostData:{
        'patient_id_num': ''
      },
      registration_data: []
    }
  },
  methods:{
    mounted_axios(){
      axios.post('/api/patient/getmyregistrrationrecord', this.initPostData,{
      headers: {
              "Content-Type" : "application/json;charset=UTF-8",
              "token": this.patient_token
            }
    }).then(res => {
      this.registration_data = res.data.data
    })
    },
    cancelRegislation(row_index){
      console.log(row_index)
      console.log(this.registration_data[row_index].regislation_data_id)
      let postData = {
        "regislation_data_id": this.registration_data[row_index].regislation_data_id
      }
      axios.post('/api/patient/deleteregeslationbydataid',postData,{
        headers: {
              "Content-Type" : "application/json;charset=UTF-8",
              "token": this.patient_token
            }
      }).then(res => {
        if(res.data.code == 1){
          this.$message.success('取消挂号成功')
          this.mounted_axios()
        }else{
          this.$message.error('取消挂号失败，请重试')
        }
      })
    }
  },
  mounted(){
    this.patient_token = localStorage.getItem("patient_token")
    this.initPostData.patient_id_num = this.$props.patient_id_num
    this.mounted_axios()
  }
}
</script>

<style>
.recodes_div_class{
  color: #000000;
  display: flex;
  flex-flow: wrap;
}
.recodes_div_class div{
  width: 14%;
}
.info_rows{
  height: 50px;
  line-height: 50px;
  font-size: 15px;
  margin-top: 20px;
}
.recordsTitle{
  font-weight: bold;
}
</style>