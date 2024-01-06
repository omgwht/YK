<template>
    <el-container>
        <el-header class="header">
            <header-bar></header-bar>
        </el-header>
        <el-container>
            <el-aside id="priv_el_aside" width="240px">
                <priv-asideview @componentName="getNeededComponentName" v-bind:nowNeedActiveIndex="aside_bar_active_index"></priv-asideview>
            </el-aside>
            <el-main id="priv_el_main">
                <!-- <my-infocpt></my-infocpt> -->
                <component :is="currentComponent" 
                  @doc_name="setDocName"
                  v-bind:doc_name_props="doc_name"
                  @choosed_patient_info="getPatientInfoAndGoEMR"
                  v-bind:choosed_patient_infos="choosedPatientInfo"
                  v-bind:allow_dzbl_get_info="allow_dzbl"></component>
            </el-main>
  </el-container>
</el-container>
</template>

<script>
import axios from 'axios';
import router from '@/router';
import HeaderBar from '../../newComponents/headerBar.vue';
import PrivAsideview from '../../newComponents/privAsideview.vue';
import MyInfocpt from '../../newComponents/privComponents/myInfocpt.vue';
import RyglView from '../../newComponents/privComponents/ryglView.vue';
import yprkView from '../../newComponents/privComponents/yprkView.vue';
import ypckView from '../../newComponents/privComponents/ypckView.vue';
import dzblView from '../../newComponents/privComponents/dzblView.vue';
import docRegislation from '../../newComponents/privComponents/docRegislation.vue';
import chatView from '../../newComponents/privComponents/chatView.vue';
import chatPage from '../../newComponents/registerPageComponents/chatPage.vue'
export default {
  components: {HeaderBar, PrivAsideview, MyInfocpt, RyglView, yprkView, ypckView, dzblView, docRegislation, chatView, chatPage},
    data(){
        return{
            currentComponent: 'my-infocpt',
            token:'',
            doc_name: '',
            choosedPatientInfo: {},
            aside_bar_active_index: 1,
            allow_dzbl: false
            // postAccountData: {
            //     "user_account": localStorage.getItem("user_account")
            // },



            // user_id:'',
            // user_account:'',
            // user_password:'',
            // user_name:'',
            // user_age:'',
            // user_hospital:'',
            // user_department:'',
            // user_job:'',
            // user_image:'',
            // user_in_time:'',
            // user_work_year:''

        }
    },
    methods: {
      getNeededComponentName(name){
        console.log(name)
        this.currentComponent = name
      },
      setDocName(doc_name){
        this.doc_name = doc_name
      },
      getPatientInfoAndGoEMR(choosed_patient_info){
        this.choosedPatientInfo = choosed_patient_info
        this.allow_dzbl = true
        this.currentComponent = 'dzbl-view'
        this.aside_bar_active_index = 5
        
      }
    },
    //     handleOpen(key, keyPath) {
    //     console.log(key, keyPath);
    //   },
    //   handleClose(key, keyPath) {
    //     console.log(key, keyPath);
    //   },
    //   out_click(){
    //     console.log("1");
    //     localStorage.removeItem("token");
    //     localStorage.removeItem("user_account");
    //     this.$message.success('退出成功!');
    //     router.push('/login');
    //   },

    
    // created(){
    //     this.token = localStorage.getItem("token");
    // },
    // mounted(){
    //     axios.post("/api/homepage",this.postAccountData,{
    //         headers:{
    //             'Content-Type': "application/json;charset=UTF-8",
    //             'token': this.token,
    //         }
    //     }).then(res => {
    //             if(res.data.msg == "NOT_LOGIN"){
    //                 router.push('/login');
    //             }else{
    //                 //获取到了数据信息

    //                 this.user_name = res.data.data.user_name;
    //                 localStorage.setItem("user_name",res.data.data.user_name);
    //                 this.user_image = res.data.data.user_image;
    //                 this.user_hospital = res.data.data.user_hospital;
    //                 this.user_department = res.data.data.user_department;
    //                 this.user_job = res.data.data.user_job;
    //                 this.user_in_time = res.data.data.user_in_time;
    //                 this.user_age = res.data.data.user_age;
    //                 this.user_work_year = res.data.data.user_work_year;

    //             }
    //     })
    // }
}
</script>

<style>
#priv_el_main{
  background-image: url('../../../../image/privBG_1.jpg');
  margin-top: -20px;
}


#priv_el_aside{
  width: 190px;
  min-height: calc(100vh - 80px);
  background-color: #f7f2eb;
  margin-top: -20px;
}

span {
  margin-left: 10px;
}

.transition-box {
    margin-bottom: 10px;
    width: 100px;
    height: 40px;
    line-height: 40px;
    border-radius: 4px;
    background-color: #355896;
    text-align: center;
    color: #fff;
    font-size: 10px;
    box-sizing: border-box;
    margin-right: 20px;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #fff;
    font-size: 25px;
    line-height: 25px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
.el-main{
  padding: 20px;
  height: auto;
  overflow: auto;
  margin-top: 0px;
}
</style>