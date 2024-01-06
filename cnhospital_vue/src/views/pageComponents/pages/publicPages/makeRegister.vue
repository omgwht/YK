<template>
  <div id="makeRegister_biggest">
    <el-container>
        <el-header>
            <header-bar></header-bar>
            <span v-show="backIconShow" id="back_icon" @click="handleBackClick"><i class="el-icon-arrow-left"></i>返回上一页</span>
        </el-header>
        <el-main id="main">
            <div id="show_patient_name" v-show="patient_name_show">{{ patient_name }}</div>
            <!-- <register-choices @change="handleChange"></register-choices> -->
            <component @patientName="setPatientName" @change="handleChange" 
            @patient_id_num="getPatientIdNum" 
            @registrationSuccess="setCurrentComponent"
            :is="currentComponent" 
            v-bind:patient_name="patient_name_str" 
            v-bind:patient_id_num="patient_id_num"
            ></component>
        </el-main>
    </el-container>
  </div>
</template>

<script>
import headerBar from '../../newComponents/headerBar.vue'
import RegisterChoices from '../../newComponents/registerChoices.vue'
import zcjkView from '../../newComponents/registerPageComponents/zcjkView.vue'
import yyghView from '../../newComponents/registerPageComponents/yyghView.vue'
import yyjlView from '../../newComponents/registerPageComponents/yyjlView.vue'
import grcfView from '../../newComponents/registerPageComponents/grcfView.vue'
import xxglView from '../../newComponents/registerPageComponents/xxglView.vue'
import ssfkView from '../../newComponents/registerPageComponents/ssfkView.vue'
// import chatView from '../../newComponents/privComponents/chatView.vue'
import chatPage from '../../newComponents/registerPageComponents/chatPage.vue'
export default {
  components: { headerBar, RegisterChoices, zcjkView, yyghView, yyjlView, grcfView, xxglView, ssfkView, chatPage},
    data() {
        return {
        currentComponent: 'register-choices',
        backIconShow: false,
        patient_name: '请先登录',
        allow_state: false,
        patient_name_show: true,
        patient_name_str: '',
        patient_id_num: ''
        };
    },
    methods: {
        handleChange(choice) {
            console.log(choice);
            switch(choice){
                case 'zcjkView':
                        this.currentComponent = 'zcjk-view'
                        this.backIconShow = true
                        this.patient_name_show = false
                    break
                case 'yyghView':
                    if(this.allow_state == true){
                        this.currentComponent = 'yygh-view'
                        this.backIconShow = true
                        this.patient_name_show = false
                    }
                    else{
                        this.$message({
                            message: '请先登录！',
                            type: 'warning'
                        });
                    }
                    break
                case 'yyjlView':
                    if(this.allow_state == true){
                        this.currentComponent = 'yyjl-view'
                        this.backIconShow = true
                        this.patient_name_show = false
                    }
                    else{
                        this.$message({
                            message: '请先登录！',
                            type: 'warning'
                        });
                    }
                    break
                case 'grcfView':
                    if(this.allow_state == true){
                        this.currentComponent = 'grcf-view'
                        this.backIconShow = true
                        this.patient_name_show = false
                    }
                    else{
                        this.$message({
                            message: '请先登录！',
                            type: 'warning'
                        });
                    }
                    break
                case 'xxglView':
                    if(this.allow_state == true){
                        this.currentComponent = 'xxgl-view'
                        this.backIconShow = true
                        this.patient_name_show = false
                    }
                    else{
                        this.$message({
                            message: '请先登录！',
                            type: 'warning'
                        });
                    }
                    break
                case 'ssfkView':
                    if(this.allow_state == true){
                        this.currentComponent = 'ssfk-view'
                        this.backIconShow = true
                        this.patient_name_show = false
                    }
                    else{
                        this.$message({
                            message: '请先登录！',
                            type: 'warning'
                        });
                    }
                    break
                    case 'chatPage':
                    if(this.allow_state == true){
                        this.currentComponent = 'chat-page'
                        this.backIconShow = true
                        this.patient_name_show = false
                    }
                    else{
                        this.$message({
                            message: '请先登录！',
                            type: 'warning'
                        });
                    }
                    break
            }
        },
        handleBackClick(){
            this.currentComponent = 'register-choices'
            this.backIconShow = false
            this.patient_name_show = true
        },
        setPatientName(name){
            console.log(name)
            this.patient_name_str = name
            this.patient_name = '您好，'+name
            this.patient_name_show = true
            this.backIconShow = false 
            this.allow_state = true
            this.currentComponent = 'register-choices'
        },
        setCurrentComponent(code){
            if(code == 1){
                this.currentComponent = 'register-choices'
                this.patient_name_show = true
            }
        },
        getPatientIdNum(id_num){
            this.patient_id_num = id_num
        }
  }
}
</script>

<style>
#makeRegister_biggest{
    background-color: #f8f3d4;
}
#back_icon{
    position: absolute;
    margin-top: -40px;
    margin-left: -1450px;
    color: #ffffff;
}
header-bar{
    margin-left: 0px;
}
</style>