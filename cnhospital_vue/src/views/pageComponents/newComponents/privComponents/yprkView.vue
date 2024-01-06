<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="formData">
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <el-form-item label="入库单号" prop="drug_inNo">
                          <el-input v-model="formData.drug_inNo" :disabled="true" style="width: 100%;"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="药品名称" prop="drug_name">
                          <el-input v-model="formData.drug_name" placeholder="请输入药品名称" style="width: 100%;"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-row>
                          <el-col id="medicine_bir_time" :span="10">
                              <el-form-item label="生产日期" prop="drug_birTime">
                              <el-date-picker v-model="formData.drug_birTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" placeholder="请选择药品生产日期"></el-date-picker>
                          </el-form-item>
                          </el-col>
                          <el-col :span="10">
                            <el-form-item label="保质期" prop="drug_savaTime" style="margin-left: 20px; position: absolute;">
                                <el-input v-model.number="formData.drug_savaTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" placeholder="保质期" >
                                  <i slot="suffix" style="font-style:normal; margin-right: 10px;">天</i>
                                </el-input>
                            </el-form-item>
                          </el-col>
                      </el-row>
                    </el-col>
                  </el-row>


                  <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="入库类型" prop="drug_inType">
                            <el-select v-model="formData.drug_inType" placeholder="请选择入库类型" style="width: 100%;">
                                <el-option label="采购入库" value="采购入库"></el-option>
                                <el-option label="退换入库" value="退换入库"></el-option>
                                <el-option label="其他入库" value="其他入库"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="药品生产商" prop="drug_producer">
                          <el-input v-model="formData.drug_producer" placeholder="请输入药品生产商" style="width: 100%;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="药品供应商" prop="drug_provider">
                          <el-input v-model="formData.drug_provider" placeholder="请输入药品供应商" style="width: 100%;"></el-input>
                        </el-form-item>
                    </el-col>
                  </el-row>
                  
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <el-form-item label="药品条形码编号" prop="drug_barcodeNo">
                          <el-input v-model.number="formData.drug_barcodeNo" placeholder="请输入条形码编号" style="width: 100%;"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="采购价" prop="drug_inPrice">
                          <el-input v-model.number="formData.drug_inPrice" placeholder="请输入采购价" style="width: 100%;">
                            <i slot="suffix" style="font-style:normal; margin-right: 10px;">元</i>
                          </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="入库人员" prop="drug_inPeoName">
                          <el-input v-model="formData.drug_inPeoName" placeholder="请输入入库人员姓名" style="width: 100%;"></el-input>
                        </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row style="margin-top: -11px;position: absolute;margin-left: 63.7%;">
                    <el-col>
                      <el-form-item>
                          <el-button type="primary" @click="submitClick('formData')" size="mini" id="ack_btn" style="color:#fff;">确认</el-button>
                      </el-form-item>
                    </el-col>
                  </el-row>

                </el-form>

                
                <strong>点击</strong>下方表格即可<strong>快速数据填充</strong>&nbsp;&nbsp;<u>(按药名首字母排序)</u>
                <el-table :data="quickAddData" highlight-current-row height="260px" @current-change="currentChangeEvent" style="margin-top: 20px;">
                  <el-table-column type="index"></el-table-column>
                  <el-table-column label="药品名" prop="drug_name"></el-table-column>
                  <el-table-column label="保质期" prop="drug_savaTime"></el-table-column>
                  <el-table-column label="生产商" prop="drug_producer"></el-table-column>
                  <el-table-column label="供货商" prop="drug_provider"></el-table-column>
                  <el-table-column label="采购价" prop="drug_inPrice"></el-table-column>
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

            formData: {
              drug_inNo: '',
              drug_name: '',
              drug_birTime: '',
              drug_savaTime: '',
              drug_inType: '',
              drug_producer:'',
              drug_provider: '',
              drug_barcodeNo: '',
              drug_inPrice: '',
              drug_inPeoName: ''
            },

            quickAddData: [],

            nowChoose: null,

            rules: {
              drug_inNo: [
                {required: true, message: '请输入入库单号', trigger: 'blur'}
              ],
              drug_name: [
                { required: true, message: '请输入药品名称', trigger: 'blur' }
              ],
              drug_birTime: [
                { required: true, message: '请选择日期', trigger: 'change' }
              ],
              drug_savaTime: [
                { required: true, message: '请输入保质期时间', trigger: 'blur'},
                { type: 'number', message: '数据须为整数'}
              ],
              drug_inType: [
                {required: true, message: '请选择入库类型', trigger: 'change'}
              ],
              drug_producer: [
                {required: true, message: '请输入生产商名称', trigger: 'blur'}
              ],
              drug_provider: [
                {required: true, message: '请输入供应商名称', trigger: 'blur'}
              ],
              // drug_barcodeNo:[
              //   { required: true, message: '请输入条形码编号'},
              //   { type: 'number', message: '编号须为数字'}
              // ],
              drug_inPrice: [
                { required: true, message: '请输入采购价'},
                { type: 'number', message: '价格须为数字'}
              ],
              drug_inPeoName: [
                { required: true, message: '请输入入库人员姓名'}
              ]
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
      out_click(){
        console.log("1");
        localStorage.removeItem("token");
        localStorage.removeItem("user_account");
        this.$message.success('退出成功!');
        router.push('/login');
      },


      submitClick(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post("/api/drugin/senddruginmsg",this.formData,{
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                    'token': this.token,
                }
            }).then(res => {
              console.log(res);
              if(res.data.code == 1){
                this.$message.success('提交成功!');
                this.formData.drug_inNo = getTimeNum()
                this.refreshAlreadyHave();
              }else if(res.data.code == 0){
                this.$message.error('重复执行入库操作');
              }
            })
          } else {
            this.$message.error('请将所有必填项填写完整');
            return false;
          }
        });
      },


      currentChangeEvent(val){
        this.formData.drug_name = val.drug_name;
        this.formData.drug_savaTime = val.drug_savaTime;
        this.formData.drug_provider = val.drug_provider;
        this.formData.drug_producer = val.drug_producer;
        this.formData.drug_inPrice = val.drug_inPrice;
      },

      refreshAlreadyHave(){
        axios.post("/api/drugin/getquickadddata",'',{
            headers:{
                'Content-Type': "application/json;charset=UTF-8",
                'token': this.token,
            }
        }).then(res => {
          this.quickAddData = res.data.data;
        })
      }
    },
    created(){
        this.token = localStorage.getItem("token");
    },
    mounted(){
        this.user_name = localStorage.getItem("user_name");
        
        this.formData.drug_inNo = getTimeNum();

        this.refreshAlreadyHave();

        this.formData.drug_inPeoName = this.user_name;
        
    }
}

var checkTime = function (i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
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
        return year +"1"+ month  + date  + week[day]  + h  + m  + s;
}
</script>

<style>
button.el-button.el-button--primary {
    padding: 3px 25px;
    font-size: 10px;
    line-height: 5px;
}
ul li span{
  color: darkgray;
  margin-top: 0px;
}
.el-input__suffix{
  margin-top: -3px;
}
.el-input__prefix{
  margin-top: -3px;
}
.el-select .el-input .el-select__caret{
  margin-top: -5px;
}
.available div span{
  color: darkgray;
}

#medicine_bir_time i{
  position: absolute;
  margin-top: 5px;
  margin-left: -10px;
}

#ack_btn span{
  color: #fff;
  
}
</style>