<template>
    <div>
        <div v-for="(item, index) in cardData.slice((currentPage-1)*3, currentPage*3)" 
        :key="item.title">  
            <el-card class="box-card " id="healknow_item">  
                <div @click="jumpToScience(index)" class="healknow_itemtxt">  
                    <!-- <a :href="item.link" target="_blank">   -->
                        <p class="hk_itemp1">{{item.title }}</p>  
                    <!-- </a>   -->
                    <p class="hk_itemp2"><span><img style="width: 20px;height: 20px;margin-top: 1.3%;margin-left: 3%;" src="https://www.bjzhongyi.com/Public/static/themes/gzb_common/image/arr2.png"></span>{{ item.description }}</p>  
                    <p class="date_txt" style="margin-top: 50px;">{{ item.date }}</p>  
                </div>  
            </el-card>  
        </div>  
        
        <div>
            <el-pagination
             @size-change="handleCurrentChange" 
            @current-change="handleCurrentChange"
                :current-page.sync="currentPage" 
                :page-size="3" 
                layout="prev, pager, next, jumper" 
                :total="cardData.length">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import router from '@/router';
export default {
    name: 'readView',
    data() {
        return {
            currentPage: 1,
            cardData: [  
          
           
            {  
                title: '宽街·科普 | 脂肪肝到底需要治疗吗？肝病科医生为您一次说清',  
                link: '', 
                description: '有人说“脂肪肝不是病”，而且“不痛不痒，没感觉，不用治疗”，但事实真的如此吗？脂肪性肝病（简称脂肪肝）的定义是肝脏脂肪沉积超过5%，通常在体检时通过B超发现。导致脂肪肝的原因有很多，最常见的是代谢障碍是脂肪肝，另一个原因的长期大量饮酒，除此之外还有药物、病毒等因素。代谢相关脂肪肝在我国成年人的发病率已超过25%，也是60岁以上人群最常见的慢性肝病，患病率可达到26.7%~42.8%。同为代谢异常的糖尿病人群合并脂肪肝的比例更高，超过了60%。',  
                date: '2032-11-06'  
            },
            {  
                title: '不懂冬季进补，可能越补越亏！六个方面告诉您为什么不如别人会补',  
                link: '', 
                description: '立冬过后，寒气愈来愈重，根据中医“春夏养阳，秋冬养阴”的原则，秋冬季节已进入进补的季节。中医学认为人要保持健康不生疾病，就必须顺应自然，适应春夏秋冬四时的气候和昼夜规律，以保持人体内外协调，若不然，就会生病。',  
                date: '2032-11-06'  
            },
            {  
                title: '儿童支原体肺炎该如何用药',  
                link: '', 
                description: '近期，儿童支原体肺炎广受关注，这些孩子多伴有发热、干咳等症状。对肺炎支原体感染，一般采取针对性治疗。西药与中药均在支原体肺炎的治疗中发挥巨大作用，例如急性期往往要服用1种抗菌药物抗肺炎支原体，而发热期及恢复期应用中药可有效实现退热、改善咳嗽等症状。',  
                date: '2032-11-06'  
            },
            {  
                title: '月经失调是气血瘀滞？',  
                link: '', 
                description: '【温馨提示】',  
                date: '2032-11-06'  
            },
            {  
                title: '霜降节气，养生有个“四字诀”',  
                link: 'https://www.baidu.com/', 
                description: '【温馨提示】',  
                date: '2032-11-06'  
            },
            {  
                title: '探索慢性病管理的最佳实践！',  
                link: 'https://www.baidu.com/', 
                description: '【温馨提示】',  
                date: '2032-11-06'  
            },
            {  
                title: '探索慢性病管理的最佳实践',  
                link: 'https://www.baidu.com/', 
                description: '【温馨提示】',  
                date: '2032-11-06'  
            },
        ]
        }
    },  
    methods: {
        handleCurrentChange(val) {  
            this.currentPage = val;  
        },
        jumpToScience(index){
            console.log(index)
            // this.$router.push({
            //     name:"healthknowledgeDetail",
            // })
            router.push('/readDetail')
        }
    }  
}
</script>
<style>
#healknow_item{
  height: 150px;
  margin-top:10px;
}
.healknow_itemtxt{
    margin-left: 5%;
  width:1000px;
  float:left;
  text-align: left;
  margin-top: 0px;
  line-height:40px;
  
}
.hk_itemp1{
  display:block;
  font-size:20px;
  overflow: hidden; 
  white-space: nowrap; 
  text-overflow: ellipsis;
}
.hk_itemp2{
    width: 1000px;
  display:block;
  font-size:15px;
  line-height: 15px;
  overflow: hidden; 
  white-space: nowrap; 
  text-overflow: ellipsis;
}
.date_txt{
  display: block;
  font-size:10px;
  margin-top: 40px;
  line-height: 10px;
  overflow: hidden; 
  white-space: nowrap; 
  text-overflow: ellipsis;
}
.el-pagination button, .el-pagination span:not([class*=suffix]) {
    
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 20px;
    vertical-align: top;
    box-sizing: border-box;
}
.el-pager{
    margin-top: 4px;
}
.el-pagination button:disabled {
    color: #C0C4CC;
    background-color: #FFF;
    cursor: not-allowed;
    margin-top: 4px;
}
.btn-prev{
  margin-top: 4px;
}
.el-pagination .btn-prev {
    padding-right: 12px;
    margin-top: 4px;
}
.el-input__inner {
    margin-top: 2.5px;
    -webkit-appearance: none;
    background-color: #FFF;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
}
</style>