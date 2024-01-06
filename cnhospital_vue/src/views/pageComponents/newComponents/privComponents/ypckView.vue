<template>
  <div>
    <el-input
                            v-model="search"
                            size="mini"
                            placeholder="输入关键字搜索"
                            />
    <el-table :data="alreadyDrugData.filter(data => !search || data.drug_name.includes(search) || data.drug_barcodeNo.includes(search))" style="width: 100%;">
                  <el-table-column label="药名" prop="drug_name" align="center"></el-table-column>
                  <el-table-column label="保质期至" prop="drug_canSaveto" align="center"></el-table-column>
                  <el-table-column label="保质期剩余(天)" prop="drug_leftLiveTime" align="center"></el-table-column>
                  <el-table-column label="条形码编号" prop="drug_barcodeNo" align="center"></el-table-column>
                  <el-table-column label="价格(元)" prop="drug_inPrice" align="center"></el-table-column>
                  <el-table-column align="center">
                      <template slot="header">
                        
                      </template>
                      <template slot-scope="scope" >
                          <el-button size="mini" @click="handleDelete(scope.$index,scope.row)" type="danger">出库</el-button>
                      </template>
                  </el-table-column>
                </el-table>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data(){
       return{
            token:'',
            postAccountData: {
                "user_account": localStorage.getItem("user_account")
            },

            user_name:'',

            drugInShow: false,
            drugOutShow: false,

            alreadyDrugData: [],
            search: '',

            deleteInfoData:{
              drug_barcodeNo: '',
              drug_name: ''
            }
            

        }
    },
    methods: {
        handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      onInput() {
      this.$forceUpdate();
    },
      out_click(){
        localStorage.removeItem("token");
        localStorage.removeItem("user_account");
        this.$message.success('退出成功!');
        router.push('/login');
      },

      handleDelete(index, row){
        /**
         * index获取点击行的索引
         * this.alreadyDrugData[index]获取了该行的数据
         */
        this.$confirm('确认要将此药品出库吗？','提示',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'
        }).then(() => {
          //获取入库时的条形码
          var barcode = this.alreadyDrugData[index].drug_barcodeNo;
          this.deleteInfoData.drug_barcodeNo = barcode;
          this.deleteInfoData.drug_name = this.alreadyDrugData[index].drug_name;
          axios.post('/api/drugout/deletedrug',this.deleteInfoData,{
            headers: {
              "Content-Type" : "application/json;charset=UTF-8",
              "token": this.token
            }
          }).then(res => {
            if(res.data.code==1){
              this.$message({
                type:'success',
                message:'出库成功'
              })
              this.init();
            }else{
              this.$message({
                type:'error',
                message:'出库过程出了些错误，请重试'
              })
            }
          })
        }).catch(() => {
          this.$message({
            type:'info',
            message:'已取消'
          })
        })
      },

      init(){
        axios.post('/api/drugout/drugoutinfo','',{
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "token": this.token
          }
        }).then(res => {
          this.alreadyDrugData = res.data.data;
        })
      }
    },
    created(){
        this.token = localStorage.getItem("token");
    },
    mounted(){
        this.user_name = localStorage.getItem("user_name");
        this.init();
    }
}
</script>

<style>
.el-button--small {
    padding: 5px 25px;
}
.el-button--default > span{
  color: #606266;
  font-size: 15px;
}
.el-button--primary > span{
  color: #ffffff;
  font-size: 15px;
}
</style>