<template>
    <div>
        <div v-for="item in cardData.slice((currentPage-1)*3, currentPage*3)" 
        :key="item.title">  
            <el-card class="box-card " id="healknow_item">  
                <div class="healknow_itemtxt">  
                    <a :href="item.link" target="_blank">  
                        <p class="hk_itemp1">{{ item.title }}</p>  
                    </a>  
                    <p class="hk_itemp2">{{ item.description }}</p>  
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
export default {
    name: 'readView',
    data() {
        return {
            currentPage: 1,
            cardData: [  
            {   
                title: '老肺病，如何躲过这波呼吸道感染高峰？', 
                link: '', 
                description: '【温馨提示】',  
                date: '2032-11-06'  
            },
            {  
                title: '小儿外感发热？试试这套推拿手法！',  
                link: '', 
                description: '【温馨提示】',  
                date: '2032-11-06'  
            },
            {  
                title: '为什么备孕要提前三个月？', 
                link: 'https://www.baidu.com/',  
                description: '【温馨提示】',  
                date: '2032-11-06'  
            },
            {  
                title: '自我评估你的健康水平',  
                link: 'https://www.baidu.com/', 
                description: '【温馨提示】',  
                date: '2032-11-06'  
            },
            {  
                title: '自我评估你的健康水平',  
                link: 'https://www.baidu.com/', 
                description: '【温馨提示】',  
                date: '2032-11-06'  
            },
            {  
                title: '自我评估你的健康水平',  
                link: 'https://www.baidu.com/', 
                description: '【温馨提示】',  
                date: '2032-11-06'  
            }
        ]
        }
    },  
    methods: {  
        handleCurrentChange(val) {  
            this.currentPage = val;  
        }  
    }  
}
</script>
<style>
#healknow_item{
  height: 250px;
  margin-top:10px;
}
#healknow_item img{
  height:  200px;
  aspect-ratio:1;
  margin-left:25px;
  float:left;
}
.healknow_itemtxt{
  width:500px;
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
.el-pager{
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
</style>