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
                title: '健康大讲堂2023年11月安排', 
                link: 'https://www.baidu.com/', 
                description: '【温馨提示】',  
                date: '2032-11-06'  
            },
            {  
                title: '健康大讲堂2023年10月安排',  
                link: 'https://www.baidu.com/', 
                description: '【温馨提示】',  
                date: '2032-11-06'  
            },
            {  
                title: '健康大讲堂2023年9月安排', 
                link: 'https://www.baidu.com/',  
                description: '【温馨提示】',  
                date: '2032-11-06'  
            },
            {  
                title: '健康大讲堂2023年8月安排',  
                link: 'https://www.baidu.com/', 
                description: '【温馨提示】',  
                date: '2032-11-06'  
            },
            {  
                title: '健康大讲堂2023年7月安排',  
                link: 'https://www.baidu.com/', 
                description: '【温馨提示】',  
                date: '2032-11-06'  
            },
            {  
                title: '健康大讲堂2023年6月安排',  
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
  height: 150px;
  margin-top:10px;
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
</style>