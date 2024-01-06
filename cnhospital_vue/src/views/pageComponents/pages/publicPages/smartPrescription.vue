<template>
  <div>
    <el-container>
        <el-header>
            <header-bar></header-bar>
        </el-header>
       
            <div id="echart" style="background-color: aliceblue;height: 700px;width: 100%;margin-top: -15px;"></div>
        
    </el-container>
  </div>
</template>

<script>
import headerBar from '../../newComponents/headerBar.vue'
import * as echarts from 'echarts'
export default {
  components: { headerBar },
  mounted(){
    var myGraphData = [
    { parentNode: '中医学', childNodes: ['经典著作', '经络学', '腧穴学', '中草药'] },
    {
        parentNode: '经典著作',
        childNodes: [
            '黄帝内经',
            '伤寒论',
            '金匮要略',
            '神农本草经',
            '本草纲目',
            '千金方',
            '医学类书籍',
        ],
    },
    { parentNode: '经络学', childNodes: ['经络系统', '十二经脉', '奇经八脉'] },
    { parentNode: '腧穴学', childNodes: ['腧穴分类', '常用腧穴', '经络与腧穴关系'] },
    { parentNode: '中草药', childNodes: ['草药分类', '草药功效', '常用中草药'] },
    { parentNode: '草药功效', childNodes: ['清热解毒', '活血化瘀', '补益养生'] },
    { parentNode: '常用中草药', childNodes: ['人参', '黄芪', '枸杞', '川芎', '石斛'] },
    { parentNode: '医学类书籍', childNodes: ['医学史', '医学哲学', '中医养生'] },
    { parentNode: '经络与腧穴关系', childNodes: ['经络腧穴的相互关系', '经络腧穴的临床应用'] },
    { parentNode: '常见疾病', childNodes: ['感冒', '高血压', '糖尿病', '类风湿关节炎'] },
    { parentNode: '针灸疗法', childNodes: ['经络刺激', '穴位选择', '灸法', '耳针疗法'] },
    { parentNode: '中医诊断', childNodes: ['望诊', '闻诊', '问诊', '切诊'] },
    { parentNode: '中医治疗', childNodes: ['药物治疗', '针灸疗法', '推拿按摩'] },
    // { parentNode: '中医养生', childNodes: ['养生原则', '食疗', '气功'] },
    // { parentNode: '中医养生', childNodes: ['养生原则', '食疗', '气功'] },
    // { parentNode: '中医养生', childNodes: ['养生原则', '食疗', '气功'] },
    // { parentNode: '中医养生', childNodes: ['养生原则', '食疗', '气功'] },
    // { parentNode: '中医养生', childNodes: ['养生原则', '食疗', '气功'] },
    // { parentNode: '中医养生', childNodes: ['养生原则', '食疗', '气功'] },
    // { parentNode: '中医养生', childNodes: ['养生原则', '食疗', '气功'] },
    // { parentNode: '中医养生', childNodes: ['养生原则', '食疗', '气功'] },
    // { parentNode: '中医养生', childNodes: ['养生原则', '食疗', '气功'] },
];

let color = ['#FF605C', '#2394FD', '#2FD5C0','#FFDEAD','#8470FF','#FF69B4','#FFA07A','#FF6347','#8B8970','#C1CDC1','#6CA6CD','#FFC1C1'];
let sourceId = '';

function showBr(s) {
    var re = '';
    var length = s.length;
    for (var i = 0, j = 1; i < length; i++, j++) {
        if (j && j % 6 == 0) {
            re += '\n';
        } else {
            re += s[i];
        }
    }
    return re;
}

function setNodeData(arr, m, n, listdata, font = false) {
    var size = 113;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === '不显示') {
            sourceId = m;
        }
        console.log('n', n);
        listdata.push({
            id: m++,
            category: n,
            name: showBr(arr[i]),
            symbol: 'circle', // 设置所有节点的形状为圆形 'circle'
            symbolSize: arr[i] === '不显示' ? 0 : size,
            draggable: 'true',
            itemStyle: {
                normal: {
                    color: n === 1 ? font : `${font}20`,
                },
            },
           
            label: {
                normal: {
                    textStyle: {
                        color: n === 1 ? '#fff' : font ? font : 'transparent',
                        fontSize: n === 1 ? 18 : 12
                    },
                },
            },
        });
    }
}
function setLinkData(sourceList, m, links) {
    for (var i = 0; i < sourceList.length; i++) {
        links.push({
            source: m,
            target: sourceList[i],
            lineStyle: {
                normal: {
                    color: sourceId === m ? 'transparent' : '#eee',
                },
            },
        });
    }
}

var listdata = [];
var linksdata = [];

var nodeData = myGraphData;
var m = 0;
var source = [];
for (var i = 1; i < nodeData.length; i++) {
    let num = i - 1;
    var node = nodeData[i].parentNode;
    var tx = [node];
    setNodeData(tx, m, 1, listdata, color[num]);
    source.push(m);

    var Data = nodeData[i].childNodes;

    if (i === Math.floor(nodeData.length / 2) + 1) {
        // 如果是中间节点，设置 symbolSize 为较大值
        setNodeData(Data, m + 1, 2, listdata, color[num], 'circle', 100);
    } else {
        setNodeData(Data, m + 1, 2, listdata, color[num]);
    }

    var sourceList = [];
    for (var n = m + 1; n < m + Data.length + 1; n++) {
        sourceList.push(n);
    }
    setLinkData(sourceList, m, linksdata);
    m = m + Data.length + 1;
}
var tx7 = [];
tx7.push(nodeData[0].parentNode);
setNodeData(tx7, m, 0, listdata, color[0]);  // 使用 color[0] 作为中心节点的颜色
setLinkData(source, m, linksdata);

    var histogramChart1 = echarts.init(document.getElementById('echart'));
        histogramChart1.setOption({
          
          tooltip: {
        formatter: '{b}',
    },
    dataZoom: [
    {
        type: 'inside',
        start: 50,   // 设置初始缩放的起始位置
        end: 100,    // 设置初始缩放的结束位置，100 表示不缩放
    },
],

    backgroundColor: '#FFFFFF',
    animationDuration: 0,
    animationEasingUpdate: 'quinticInOut',
    series: [
        {
            name: '中医图谱',
            type: 'graph',
            layout: 'force',
            edgeSymbol: ['', 'arrow'],

            force: {
                repulsion: 5000,
                gravity: 0.4,
                edgeLength:110,
                layoutAnimation: true,
                
            },
            data: listdata,
            links: linksdata,
            categories: [
                {
                    name: '父节点',
                    symbol: 'rect',
                    label: {},
                },
                {
                    name: '层级二',
                    symbol: 'circle',
                },
                {
                    name: '层级三',
                    symbol: 'circle',
                },
            ],
            roam: true,
            label: {
                normal: {
                    show: true,
                },
            },
            lineStyle: {
                normal: {
                    opacity: 0.9,
                    width: 1.5,
                    curveness: 0,
                },
            },
        },
    ],
        
        
        })
  }

}
</script>

<style>

</style>

