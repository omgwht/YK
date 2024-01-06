<template>
  <div style="display: flex; flex-flow: wrap;">
    <!-- <el-row :gutter="20">
                    <el-col :span="3">
                        <img src="../../../../image/R.jpg" style="height: 180px;width: 120px;" alt="图片加载失败">
                    </el-col>
                    <el-col :span="3">
                        <el-form >
                          <el-form-item label="姓名">
                            <el-input v-model="user_name" :disabled="true"></el-input>
                          </el-form-item>
                        </el-form>
                    </el-col>

                    <el-col :span="6">
                        <el-form>
                          <el-form-item label="单位">
                            <el-input v-model="user_hospital" :disabled="true"></el-input>
                          </el-form-item>
                        </el-form>
                    </el-col>

                </el-row>

                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form>
                          <el-form-item label="部门">
                            <el-input v-model="user_department" :disabled="true"></el-input>
                          </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="8">
                        <el-form>
                          <el-form-item label="职位">
                            <el-input v-model="user_job" :disabled="true"></el-input>
                          </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="8">
                        <el-form>
                          <el-form-item label="入职时间">
                            <el-input v-model="user_in_time" :disabled="true"></el-input>
                          </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form>
                          <el-form-item label="年龄">
                            <el-input v-model="user_age" :disabled="true">
                                <i slot="suffix" style="font-style:normal; margin-right: 10px;">岁</i>
                            </el-input>
                          </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="8">
                        <el-form>
                          <el-form-item label="在职时间">
                            <el-input v-model="user_work_year" :disabled="true">
                                <i slot="suffix" style="font-style:normal; margin-right: 10px;">年</i>
                            </el-input>
                          </el-form-item>
                        </el-form>
                    </el-col>
                </el-row> -->

    <div style="width: 20%; height: 400px;  margin-left: 50px; background-color: white; border-radius: 5px;">
      <div id="header"
        style=" border-radius: 50%; height: 80px; width: 80px; margin-left: 33%; margin-top: 30px; overflow: hidden;">
        <img style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%; margin-top: 0px;" src="../../../../image/photo.jpg">
      </div>

      <div class="det" style="margin-top: 50px; color: #e19661;">个人信息</div>
      <div class="det" style="margin-top: 15px;">值班信息</div>
      <div class="det" style="margin-top: 15px;">费用报销</div>
    </div>
    <div
      style="width: 65%; height: 600px; margin-left: 40px; background-color: white; border-radius: 5px; padding: 20px;">
      <el-row :gutter="20">
        <el-col :span="3">
          <el-form>
            <el-form-item label="姓名">
              <el-input v-model="user_name" :disabled="true"></el-input>
            </el-form-item>
          </el-form>
        </el-col>

        <el-col :span="6">
          <el-form>
            <el-form-item label="单位">
              <el-input v-model="user_hospital" :disabled="true"></el-input>
            </el-form-item>
          </el-form>
        </el-col>

      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-form>
            <el-form-item label="部门">
              <el-input v-model="user_department" :disabled="true"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8">
          <el-form>
            <el-form-item label="职位">
              <el-input v-model="user_job" :disabled="true"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8">
          <el-form>
            <el-form-item label="入职时间">
              <el-input v-model="user_in_time" :disabled="true"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-form>
            <el-form-item label="年龄">
              <el-input v-model="user_age" :disabled="true">
                <i slot="suffix" style="font-style:normal; margin-right: 10px;">岁</i>
              </el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8">
          <el-form>
            <el-form-item label="在职时间">
              <el-input v-model="user_work_year" :disabled="true">
                <i slot="suffix" style="font-style:normal; margin-right: 10px;">年</i>
              </el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="项目启动日期" width="180">
            </el-table-column>
            <el-table-column prop="name" label="项目代码" width="180">
            </el-table-column>
            <el-table-column prop="address" label="备注">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      token: '',
      postAccountData: {
        "user_account": localStorage.getItem("user_account")
      },



      user_id: '',
      user_account: '',
      user_password: '',
      user_name: '',
      user_age: '',
      user_hospital: '',
      user_department: '',
      user_job: '',
      user_image: '',
      user_in_time: '',
      user_work_year: '',

      tableData: [{
        date: '2021-05-02',
        name: '2137234',
        address: '中草药成分的分离与鉴定及其对疾病治疗机制的研究'
      }, {
        date: '2021-05-04',
        name: '743822',
        address: '中医经典文献的数字化整理与数据库建设'
      }, {
        date: '2016-05-01',
        name: '3784672',
        address: '中医药防治慢性病的策略与机制研究'
      }, {
        date: '2016-05-03',
        name: '4321881',
        address: '中医药在心血管疾病防治中的应用研究'
      }]

    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    out_click() {
      console.log("1");
      localStorage.removeItem("token");
      localStorage.removeItem("user_account");
      this.$message.success('退出成功!');
      router.push('/login');
    }
  },
  created() {
    this.token = localStorage.getItem("token");
  },
  mounted() {
    axios.post("/api/homepage", this.postAccountData, {
      headers: {
        'Content-Type': "application/json;charset=UTF-8",
        'token': this.token,
      }
    }).then(res => {
      if (res.data.msg == "NOT_LOGIN") {
        router.push('/login');
      } else {
        //获取到了数据信息

        this.user_name = res.data.data.user_name;
        localStorage.setItem("user_name", res.data.data.user_name);
        sessionStorage.setItem("user", JSON.stringify(res.data.data.user_name))
        sessionStorage.setItem("username", res.data.data.user_name)
        console.log(sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : {})
        this.user_image = res.data.data.user_image;
        this.user_hospital = res.data.data.user_hospital;
        this.user_department = res.data.data.user_department;
        this.user_job = res.data.data.user_job;
        this.user_in_time = res.data.data.user_in_time;
        this.user_age = res.data.data.user_age;
        this.user_work_year = res.data.data.user_work_year;
        this.$emit('doc_name', this.user_name)
      }
    })
  }
}
</script>

<style></style>