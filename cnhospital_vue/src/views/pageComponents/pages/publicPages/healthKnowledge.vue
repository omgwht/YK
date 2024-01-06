<template>
  <div id="hk_main">
    <el-container>
      <el-header>
        <header-bar></header-bar>
      </el-header>
      <div id="healknow_main">
        <div style="height: 20%;width: 100%;margin-top: 0%;">
          <img style="width: 100%;height: 20%;position: relative;margin-top: -1.3%;" src="../../../../image/upperPic.jpg">
        </div>
        <!-- 这是导航栏，可以分一个组件-->
        <div class="healknow_tabtitle" style="margin-top: 0px;">
          <div class="healknow_tabtitle_in" style="margin-top: 0px;">
            <div><img style="margin-top:0px;margin-left: -128px;position: absolute;width: 30px;height: 45px;"
                src="../../../../image/pubc-title-icon1.png"></div>
            <p style="margin-left: -15px;font-size: 30px;margin-top: 15px;"> {{ tab }}</p>
            <div> <img style="position: absolute;margin-left: 81px;margin-top: -79px;width: 30px;height: 45px;"
                src="../../../../image/pubc-title-icon2.png"></div>
          </div>
        </div>
        <div style="margin-top: -10px;">
          <div class="healknow_tab">
            <el-row :gutter="20">
              <el-col :span="6">
                <div class="healknow_ltab" v-on:click="toReadView">
                  <p class="a1">科普阅读</p>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="healknow_ltab" v-on:click="toLectureView">
                  <p class="a1">健康讲堂</p>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="healknow_ltab" v-on:click="toTestView">
                  <p class="a1">试听科普</p>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="healknow_ltab" v-on:click="toSelfView">
                  <p class="a1">健康自测</p>
                </div>
              </el-col>
            </el-row>
          </div>
          <div id="hk_tabcontent">
            <component :is="currentComponent"></component>
          </div>
        </div>
      </div>
    </el-container>
  </div>
</template>

<script>
import headerBar from '../../newComponents/headerBar.vue';
import readView from '../../newComponents/knowledgeComponents/readView.vue';
import lectureView from '../../newComponents/knowledgeComponents/lectureView.vue';
import selfView from '../../newComponents/knowledgeComponents/selfView.vue';
import testView from '../../newComponents/knowledgeComponents/testView.vue';
export default {
  components: { headerBar, readView, lectureView, selfView, testView },
  data() {
    return {
      currentComponent: 'readView',
      tab: '科普阅读'
    }
  },
  methods: {
    toReadView() {
      this.currentComponent = 'readView';
      this.tab = '科普阅读'
    },
    toLectureView() {
      this.currentComponent = 'lectureView';
      this.tab = '健康讲堂'
    },
    toTestView() {
      this.currentComponent = 'testView';
      this.tab = '试听科普'
    },
    toSelfView() {
      this.currentComponent = 'selfView';
      this.tab = '健康自测'
    }
  }
}
</script>

<style>
#hk_main {
  background-image: url('../../../../image/jkjt3.jpg');
  width: 100%;
  height: 100%;
}

#hk_tabcontent {
  margin-top: 30px;
  width: 80vw;
  margin-left: 10vw;
}

.healknow_tabtitle {
  width: 300px;
  height: auto;
  margin: auto;
  background: transparent;
}

.healknow_tabtitle_in {
  background-image: url();
  background-size: contain;
  background-position: center;
  ;
  font-size: 20px;
  line-height: 50px;
  background-repeat: no-repeat;

}

.healknow_tab {
  width: 750px;
  height: 30px;
  margin: auto;
  background: transparent;
}

.healknow_ltab {
  width: 150px;
  height: 30px;
  border: 2.5px solid darkred;
  background: transparent;
  padding: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.a1 {
  display: block;
  font-size: 15px;
  line-height: 30px;
}

a:link {
  color: black;
  text-decoration: none;
}

a:hover {
  color: black;
  text-decoration: none;
}

a:visited {
  color: black;
  text-decoration: none;
}

.el-pager {
  margin-top: 4px;
}

.el-pagination button:disabled {
  color: #C0C4CC;
  background-color: #FFF;
  cursor: not-allowed;
  margin-top: 4px;
}

.el-pagination .btn-next {
  padding-left: 12px;
  margin-top: 4px;
}

.btn-prev {
  margin-top: 4px;
}</style>
