<template>
  <div>
    <el-button @click="checkToday" type="text" :class="[ now_check_index == 2 ? 'highlight_this' : 'not_highlight_this']" ref="reg_btn_2">查看今天的挂号</el-button>
    <el-button @click="checkAnotherDay" type="text" :class="[ now_check_index == 1 ? 'highlight_this' : 'not_highlight_this']" ref="reg_btn_1">查看今天及以后的挂号</el-button>
     <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="今天以后的挂号" name="first" @click="checkAnotherDay">今天以后的挂号</el-tab-pane>
    <el-tab-pane label="今天的挂号" name="second" @click="checkToday">今天的挂号</el-tab-pane>
  </el-tabs> -->
    <el-table :data="regislationList" :row-class-name="changeTableRowColor">
      <el-table-column label="患者姓名" prop="patient_name" align="center"></el-table-column>
      <el-table-column label="患者身份证号" prop="patient_id_num" align="center"></el-table-column>
      <el-table-column label="就诊日期" prop="date" align="center"></el-table-column>
      <el-table-column label="就诊状态" prop="state" :formatter="formatterState" align="center"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
            <el-button type="primary" size="mini" v-show="setNoticeBtnShowState(scope.row)">通知就诊</el-button>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="gotoEMRPage(scope.row)" v-if="ERMShowFirst(scope.row)">填写病历</el-button>
            <el-button type="primary" size="mini" @click="gotoseeEMR(scope.row)" v-if="ERMShowSecond(scope.row)">查看病历</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    props: ['doc_name_props'],
    data(){
        return{
            token: '',
            activeName: 'second',
            doc_name: '',
            regislationList: [],
            post_data: {
                'doc_name': ''
            },
            now_check_index: 2,
            showEMRIndex: 1
        }
    },
    methods:{
        formatterState(row, column){
            if(row.state == 1){
                return '已就诊'
            }else{
                return '未就诊'
            }
        },
        changeTableRowColor({row, rowIndex}){
            if(row.state == 0){
                return 'success-row'
            }else if(row.state == 1){
                return 'warning-row'
            }
        },
        setNoticeBtnShowState(row){
            if(row.state == 0){
                return true
            }else{
                return false
            }
        },
        gotoEMRPage(row){
            this.$emit('choosed_patient_info',row)
        },
        checkAnotherDay(){
            this.now_check_index = 1
        axios.post('/api/doctor/getregislationbyname',this.post_data,{
            headers: {
              "Content-Type" : "application/json;charset=UTF-8",
              "token": this.token
            }
        }).then(res => {
            this.regislationList = res.data.data.filter(item => {
                const itemDate = new Date(item.date);
                const today = new Date();
                return itemDate > today;
            });
            
        })
        },
        checkToday(){
            this.now_check_index = 2
            this.post_data.doc_name = this.doc_name
        axios.post('/api/doctor/getregislationbyname',this.post_data,{
            headers: {
              "Content-Type" : "application/json;charset=UTF-8",
              "token": this.token
            }
        }).then(res => {
            let today = new Date()
            this.regislationList = res.data.data.filter(item => {
                let itemDate = new Date(item.date)
                return itemDate.getFullYear() === today.getFullYear() && itemDate.getMonth() === today.getMonth() && itemDate.getDate() === today.getDate()
            })
            
        })
        },
        ERMShowFirst(row){
            if(row.state == 1){
                return false
            }else{
                return true
            }
        },
        ERMShowSecond(row){
            if(row.state == 1){
                return true
            }else{
                return false
            }
        }
    },
    mounted(){
        this.doc_name = this.$props.doc_name_props
        this.token = localStorage.getItem('token')

        this.post_data.doc_name = this.doc_name
        axios.post('/api/doctor/getregislationbyname',this.post_data,{
            headers: {
              "Content-Type" : "application/json;charset=UTF-8",
              "token": this.token
            }
        }).then(res => {
            // this.regislationList = res.data.data.filter(item => {
            //     const itemDate = new Date(item.date);
            //     const today = new Date();
            //     console.log(itemDate+","+today)
            //     return itemDate == today;
            // });

            //只显示今天的
            //console.log(res.data.data)
            let today = new Date()
            this.regislationList = res.data.data.filter(item => {
                let itemDate = new Date(item.date)
                return itemDate.getFullYear() === today.getFullYear() && itemDate.getMonth() === today.getMonth() && itemDate.getDate() === today.getDate()
            })

            // console.log(res.data.data)
            // let today = new Date()
            // this.regislationList = res.data.data.filter(item => {
            //     let itemDate = new Date(item.date)
            //     return (itemDate.getFullYear() === today.getFullYear() && itemDate.getMonth() === today.getMonth() && itemDate.getDate() === today.getDate()) ||
            //     (itemDate.getFullYear() === today.getFullYear() && itemDate.getMonth() === today.getMonth() && itemDate.getDate() > today.getDate()) ||
            //     (itemDate.getFullYear() === today.getFullYear() && itemDate.getMonth() > today.getMonth() && itemDate.getDate() === today.getDate()) ||
            //     (itemDate.getFullYear() > today.getFullYear() && itemDate.getMonth() === today.getMonth() && itemDate.getDate() === today.getDate())
            // })
        })
    }
}
</script>

<style>
 .el-table .success-row {
    background: #f0f9eb;
  }
  .el-table .warning-row {
    background: oldlace;
  }
  .doc_reg_head_btn span{
    color: black;
  }
  .highlight_this span{
    color: #e19661;
  }
  .not_highlight_this span{
    color: #999596;
  }
</style>