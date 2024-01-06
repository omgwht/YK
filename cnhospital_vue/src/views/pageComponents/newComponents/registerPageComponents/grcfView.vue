<template>
  <div id="grcf_biggest">
    <el-table :data="dateAndDocNameAndDepAndDesc">
      <el-table-column label="诊断单号" prop="dataId"></el-table-column>
      <el-table-column label="就诊日期" prop="treatDate"></el-table-column>
      <el-table-column label="诊断医生" prop="doctorName"></el-table-column>
      <el-table-column label="诊断结果" prop="detailText" class="setgrcfResStyle"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="checkDatail(scope.row)">查看详细</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="详情" :visible.sync="dialogVisible">
      <!-- <div>{{ showdDetails.detailText }}</div>
      <div>{{ showdDetails.treatDate }}</div> -->
      <grcf-dialog v-bind:showdData="showdDetails"></grcf-dialog>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import grcfDialog from '../../newComponents/registerPageComponents/grcfDialog.vue'
export default {
  components: { grcfDialog },
  props: ['patient_id_num'],
  data(){
    return{
      patient_token: '',
      patientIDNo: '',
      dateAndDocNameAndDepAndDesc: [],
      postData: {
        'patientIDNo': ''
      },
      need_to_show_detail: {},
      need_to_show_drugs: [],
      dialogVisible: false,
      showdDetails:{
        'detailText': '',
        'treatDate': '',
        'treatMedicineName': [],
        'medicineDaysTime': [],
        'DaysTimeMore': [],
        'medicineEatTime': [],
        'EatTimeMore': []
      }
    }
  },
  methods:{
    checkDatail(rowValues){
      var dataId = rowValues.dataId
      let postData = {
        'dataId': dataId
      }
      axios.post('/api/patient/getdetailemr', postData, {
        headers: {
              "Content-Type" : "application/json;charset=UTF-8",
              "token": this.patient_token
            }
      }).then(res => {
        //console.log(res.data.data)
        this.need_to_show_detail = res.data.data
        //console.log(this.need_to_show_detail)
        this.showdDetails.detailText = this.need_to_show_detail[0].detailText
        this.showdDetails.treatDate = this.need_to_show_detail[0].treatDate
        
        this.getDrugs(this.need_to_show_detail[0].dataId, this.need_to_show_detail[0].index_in_emr_affiliate)
      })
    },
    getDrugs(dataId, index_in_emr_affiliate){
      console.log(dataId, index_in_emr_affiliate)
      let postDataindrugs = {
        "dataId": dataId,
        "index_in_emr_affiliate": index_in_emr_affiliate
      }
      axios.post('/api/patient/getemraffiliate',postDataindrugs,{
        headers: {
              "Content-Type" : "application/json;charset=UTF-8",
              "token": this.patient_token
            }
      }).then(res => {
        this.need_to_show_drugs = res.data.data
        //console.log(this.need_to_show_drugs)
        //console.log(this.need_to_show_drugs.length)
        var len = this.need_to_show_drugs.length
        this.showdDetails.treatMedicineName = []
        this.showdDetails.medicineDaysTime = []
        this.showdDetails.DaysTimeMore = []
        this.showdDetails.medicineEatTime = []
        this.showdDetails.EatTimeMore = []
        for (var i = 0; i < len; i++){
          this.showdDetails.treatMedicineName.push(this.need_to_show_drugs[i].treatMedicineName)
          this.showdDetails.medicineDaysTime.push(this.need_to_show_drugs[i].medicineDaysTime)
          this.showdDetails.DaysTimeMore.push(this.need_to_show_drugs[i].DaysTimeMore)
          this.showdDetails.medicineEatTime.push(this.need_to_show_drugs[i].medicineEatTime)
          this.showdDetails.EatTimeMore.push(this.need_to_show_drugs[i].EatTimeMore)
        }
        console.log(this.showdDetails)
        this.dialogVisible = true
      })
    }
  },
  mounted(){
    this.patient_token = localStorage.getItem('patient_token')
    this.patientIDNo = this.$props.patient_id_num
    this.postData.patientIDNo = this.patientIDNo
    axios.post('/api/patient/getpatientemrsbyidNo',this.postData,{
      headers: {
              "Content-Type" : "application/json;charset=UTF-8",
              "token": this.patient_token
            }
    }).then(res => {
      this.dateAndDocNameAndDepAndDesc = res.data.data
    })
  }
}
</script>

<style>
#grcf_biggest{
  padding: 15px 30px;
}
.setgrcfResStyle{
  line-clamp: 2;
  overflow: ellipsis;
}
.el-table__cell .cell{
  line-clamp:1;
  text-overflow:ellipsis;
}
</style>