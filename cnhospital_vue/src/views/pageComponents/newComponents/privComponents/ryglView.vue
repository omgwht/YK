<template>
  <div>
    <el-tabs type="border-card" value="内科" @tab-click="handleTabClick">
                    <el-tab-pane :key="index" :label="item" v-for="(item,index) in dept_info_arr" :name="item">
                        <span style="float: left; margin-top: 10px;">以下为&nbsp;<strong>{{ item }}</strong>&nbsp;的人员信息</span>
                        <el-input v-model="searchKeyWords" placeholder="请输入搜索内容" suffix-icon="el-icon-search" style="width: 20%; margin-bottom: 10px; float: right;"></el-input>
                        <el-table :data="tableData.filter(data => !searchKeyWords || data.user_name.includes(searchKeyWords) || data.user_job.includes(searchKeyWords))" stripe border height="500px" v-loading="loading">
                          <el-table-column label="姓名" prop="user_name"></el-table-column>
                          <el-table-column label="年龄" prop="user_age"></el-table-column>
                          <el-table-column label="性别" prop="user_gender"></el-table-column>
                          <el-table-column label="科室" prop="user_department"></el-table-column>
                          <el-table-column label="职位" prop="user_job"></el-table-column>
                          <el-table-column label="入职时间" prop="user_in_time"></el-table-column>
                          <el-table-column label="工作时间" prop="user_work_year"></el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data(){
        return{
            token:'',
            user_name:'',
            
            dept_info_arr:[],
            postData:{
                "dept_name": ''
            },

            tableData:[],

            searchKeyWords:'',
            searvhViewEmptyData:[],
            nowDeptIndex:0,
            loading: false

        }
    },
    methods: {
      out_click(){
        localStorage.removeItem("token");
        localStorage.removeItem("user_account");
        this.$message.success('退出成功!');
        router.push('/login');
      },
      firstTimeLoadData(){
        this.loading = true;
        axios.post("/api/peomanage",'',{
            headers:{
                'Content-Type': "application/json;charset=UTF-8",
                'token': this.token,
            }
        }).then(res => {
                
                    //获取到了数据信息
                    this.user_name = localStorage.getItem("user_name");
                    //获取具体的部门信息
                    this.dept_info_arr = res.data.data;

                    //加载页面后默认展示第一个科室的信息
                    this.postData.dept_name = this.dept_info_arr[this.nowDeptIndex];
                    axios.post("/api/peomanage/deptinfo",this.postData,{
                            headers:{
                                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                                'token': this.token,
                            }
                        }).then(res => {
                            this.tableData = res.data.data;
                            this.searvhViewEmptyData = this.tableData;
                            this.loading = false;
                        })
                
        });
      },
      handleTabClick(tab, event){
            this.postData.dept_name = this.dept_info_arr[tab.index];
            this.nowDeptIndex = tab.index;
            axios.post("/api/peomanage/deptinfo",this.postData,{
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                    'token': this.token,
                }
            }).then(res => {
                this.tableData = res.data.data;
                this.searvhViewEmptyData = this.tableData;
                //获取信息的具体字段
                //console.log(this.tableData[0].user_department);
            })
      },
      searchInfoByKeyWords(){
        //获取到搜索框的内容
        //console.log(this.searchKeyWords);
        let filterKeyWords = this.searchKeyWords;
        let filterResource = this.tableData.filter(
            item => {
                let user_name_str = item.user_name+"";
                let user_job_str = item.user_job+"";
                if(filterKeyWords == ""){
                    this.firstTimeLoadData();
                    return item;
                }
                else if(filterKeyWords!="" && (user_name_str.includes(filterKeyWords) || user_job_str.includes(filterKeyWords))){
                    return item;
                }
            }
        );
        this.tableData = filterResource;
      }
    },
    // watch:{
    //     searchKeyWords:{
    //         handler(){
    //             this.searchInfoByKeyWords();
    //         }
    //     }
    // },
    created(){
        this.token = localStorage.getItem("token");
    },
    mounted(){
        //this.searchInfoByKeyWords();
        this.firstTimeLoadData();
    }
}
</script>

<style>

</style>