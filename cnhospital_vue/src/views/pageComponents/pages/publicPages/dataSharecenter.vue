<template>
    <div>
        <el-container>
            <el-header>
                <header-bar></header-bar>
            </el-header>
            <div id="datatab">
                <div @click="num = 0" :class="[num == 0 ? 'lightThis' : 'notLight']">采集概况</div>
                <div @click="num = 1" :class="[num == 1 ? 'lightThis' : 'notLight']">指标分析</div>
                <div @click="num = 2" :class="[num == 2 ? 'lightThis' : 'notLight']">趋势分析</div>
                <div @click="num = 3" :class="[num == 3 ? 'lightThis' : 'notLight']">慢病列表</div>
            </div>
        </el-container>
        <div id="content-all">
            <div v-show="num == 0" class="content1">

                <div id="echart1" class="echart animated fadeInLeftBig"> </div>

                <div id="echart2" class="echart animated fadeInDownBig"> </div>
                <div id="echart3" class=""></div>
                <div id="echart4" class="animated fadeInUpBig"></div>
                <div id="echart5" class="echart animated fadeInDownBig"></div>
                <div id="echart6" class="echart"></div>
            </div>
            <div v-show="num == 1" class="content2">
                <div id="echart7" class="echart_2 animated rollIn"></div>
                <div id="echart8" class="echart_2 animated zoomInDown"></div>
                <div id="echart9" class="echart_2 animated bounceInRight"></div>
                <div id="echart10" class="echart_2"></div>
                <div id="echart11" class="echart_2 animated zoomIn"></div>
                <div id="echart12" class="echart_2 "></div>
                <div id="echart13" class="echart_2 animated zoomInUp"></div>
                <div id="echart14" class="echart_2 animated fadeInUpBig"></div>
            </div>
            <div v-show="num == 2" class="content2">

                <div id="e15_e16" style="width: 49.2%;height: 50%;background-color: rgb(255, 255, 255); position: absolute;margin-left: 10px;margin-top: 10px;border-radius: 10px;
                  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;">
                    <div id="echart15" class="two"></div>
                    <div id="echart16" class="two"></div>
                </div>
                <div id="e17_e18" style="width: 49.2%;height: 50%;background-color: rgb(255, 255, 255); position: absolute;margin-left: 50.3%;margin-top: 10px;border-radius: 10px;
                  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;">
                    <div id="echart17" class="two"></div>
                    <div id="echart18" class="two"></div>
                </div>

                <div id="trend_below"
                    style="width: 100%;height: 50%;position: absolute;margin-top: 22.3%;margin-left: 0px;padding-left: -10px;">
                    <div id="echart19" class="echart_2 animated fadeInUpBig"></div>
                    <div id="echart20" class="echart_2 animated fadeInLeftBig">

                    </div>
                    <div id="echart21" class="echart_2 animated fadeInRightBig"></div>
                    <div id="echart22" class="echart_2 animated fadeInUpBig"></div>
                </div>

            </div>
            <div v-show="num == 3" class="content2">
                <input style="margin-left:-1020px;margin-top: 15px;" placeholder='请输入要查找的疾病' v-model="query">
                <tr id="thead">
                    <th>序号</th>
                    <th>姓名</th>
                    <th>慢病</th>
                    <th>操作</th>
                </tr>


                <div style="position:absolute; margin-top: 20px;margin-left:120px ">
                    <transition-group name="item" tag="ul" @before-enter="beforeEnter" @enter="enter" @leave="leave">
                        <div id="list_item" v-for="(item, index) in ComputedList" :key='item.msg' :data-index='index'>
                            <span>
                                {{ item.num }}</span><span>{{ item.name }}</span><span>{{ item.msg }}</span><span>
                                <button @click="showDetail(item.msg, index)">查看</button>
                            </span>
                        </div>
                    </transition-group>
                </div>
                <div id="wordCloud"
                    style="background-color: ;position:absolute; width:850px ;height: 610px;position: absolute;margin-left: 620px;margin-top: -5%;">
                </div>
            </div>

            <el-dialog title="详情" :visible.sync="dialogVisible" center>
                <h2>{{ dialog_title }}</h2><br>
                <div class="characteristic">
                    <strong>表现：</strong> {{ dialog_content_characteristic }}
                </div><br>
                <div class="treat">
                    <strong>治疗方法：</strong> {{ dialog_content_treat }}
                </div><br>
                <div class="medicine">
                    <strong>主要药物：</strong> {{ dialog_content_medicine }}
                </div>
            </el-dialog>


        </div>
    </div>
</template>

<script >
import headerBar from '../../newComponents/headerBar.vue'
import * as echarts from 'echarts'
import AMapLoader from '@amap/amap-jsapi-loader'
import Velocity from 'velocity-animate'
import axios from 'axios'
window._AMapSecurityConfig = { securityJsCode: '83c0846a152313af41e0aab67728eb0f' }
// 使用刚指定的配置项和数据显示图表。

export default {
    components: {
        headerBar,

    },
    data() {
        return {
            echarts1_data: [
                        { value: 335, name: '高血压' },
                        { value: 310, name: '糖尿病' },
                        { value: 234, name: '脑卒中' },
                        { value: 135, name: '慢阻肺' },
                        { value: 235, name: '慢性肾病' }
                    ],
            query: '',
            dialogVisible: false,
            dialog_title: '',
            dialog_content_characteristic: '',
            dialog_content_treat: '',
            dialog_content_medicine: '',
            dialog_content:[
                [{
                    name: "甘阳上亢",
                    characteristic: "甘阳上亢是指阳气过盛，表现为面红、口渴、头痛等症状。",
                    treat: " 清热泻火，降阳平喘。",
                    medicine: "生石膏、知母、黄芩等清热泻火的中草药，可采用龙胆泻肝丸、清热解毒口服液等方剂。"
                }],
                [{
                    "name": "风湿头痛",
                    "characteristic": "风湿头痛表现为头部沉重、酸痛，受风湿侵袭。",
                    "treat": " 祛风散寒，活血止痛。",
                    "medicine": "桂枝、羌活、川芎等具有祛风散寒、活血止痛的中草药，可使用桂枝加附子汤、祛风通络胶囊等方剂。"
                }],[{
                    "name": "心阳不振",
                    "characteristic": "心阳不振表现为寒凝心窝、气短、面色苍白等。",
                    "treat": "温补心阳，益气养血。",
                    "medicine": "人参、黄芪、肉桂等有温补心阳、益气养血作用的中草药，可采用六味地黄丸、归脾汤等方剂。"
                }],[{
                    "name": "气滞血瘀",
                    "characteristic": "心阳不振表现为寒凝心窝、气短、面色苍白等。",
                    "treat": " 理气活血，祛瘀通络。",
                    "medicine": "川芎、赤芍、丹参等具有活血祛瘀作用的中药，可采用血府逐瘀丸、活血化瘀口服液等方剂。"
                }],
                [{
                    "name": "湿热郁滞",
                    "characteristic": "心阳不振表现为寒凝心窝、气短、面色苍白等。",
                    "treat": "  清热利湿，疏肝解郁。",
                    "medicine": "黄连、栀子、柴胡等清热利湿的中草药，可以使用龙胆泻肝丸、柴胡疏肝散等方剂。"
                }],[{
                    "name": "气虚血瘀",
                    "characteristic": "气滞血瘀是一种中医疾病，指体内气机郁滞，血液循环受阻。典型症状包括疼痛、淤血、瘀斑等。气滞血瘀常见于肝脾不调、情绪不畅，导致气血运行受阻，形成病理性的淤滞。治疗上以理气活血、祛瘀通络为主，采用针灸、中药等疗法。",
                    "treat": " 补气活血，调理脏腑。",
                    "medicine": "当归、黄芪、川芎等补气养血的中药，可使用归脾汤、四物汤等方剂。"
                }],[{
                    "name": "肝郁气滞",
                    "characteristic": "风湿头痛表现为头部沉重、酸痛，受风湿侵袭。",
                    "treat": " 疏肝理气，缓解情绪。",
                    "medicine": "柴胡、郁金、枸杞等具有疏肝解郁作用的中草药，可采用柴胡疏肝散、逍遥散等方剂。"
                }],[{
                    "name": "肺燥痰结",
                    "characteristic": "风湿头痛表现为头部沉重、酸痛，受风湿侵袭。",
                    "treat": "润肺化痰，清热宣肺。",
                    "medicine": "麦冬、川贝、百合等具有润肺化痰的中草药，可使用清肺化痰口服液、百合固金汤等方剂。"
                }],[{
                    "name": "肾阳虚寒",
                    "characteristic": "风湿头痛表现为头部沉重、酸痛，受风湿侵袭。",
                    "treat": " 温补肾阳，祛寒驱湿。",
                    "medicine": "仙灵骨、肉苁蓉、杜仲等有温补肾阳作用的中草药，可采用金匮肾气丸、左归丸等方剂。"
                }],[{
                    "name": "心火亢盛",
                    "characteristic": "心火亢盛是中医辨证体系中的一种证型，主要表现为心火过旺，常伴有心悸、失眠、口干、口苦等症状。",
                    "treat": " 清热降火，宁心安神。",
                    "medicine": "黄连、玄参、丹参、夜交藤、龙眼肉等"
                }],[{
                    "name": "湿热壅滞",
                    "characteristic": "身体发热，口干舌燥，尿黄便秘，头重疲倦，感觉浑身沉重",
                    "treat": "  清热利湿，饮食清淡，多饮水，避免油腻食物。",
                    "medicine": "黄连、黄芩、泽泻。"
                }]
            ],
            items: [{ msg: '甘阳上亢', name: '李**', num: '01' },
            { msg: '风湿头痛', name: '赵**', num: '02' },
            { msg: '心阳不振', name: '周**', num: '03' },
            { msg: '气滞血瘀', name: '钱**', num: '04' },
            { msg: '湿热郁滞', name: '孙**', num: '05' },
            { msg: '气虚血瘀', name: '李**', num: '06' },
            { msg: '肝郁气滞', name: '吴**', num: '07' },
            { msg: '脾虚湿困', name: '郑**', num: '08' },
            { msg: '肺燥痰结', name: '王**', num: '09' },
            { msg: '肾阳虚寒', name: '闫**', num: '10' },
            { msg: '心火亢盛', name: '林**', num: '11' },
            { msg: '湿热壅滞', name: '刘**', num: '12' },
            { msg: '血瘀阻滞', name: '阿**', num: '13' },
            { msg: '寒湿侵袭', name: '李**', num: '14' },
            { msg: '脾虚湿困', name: '赵**', num: '15' },
            { msg: '肝阳上亢', name: '孙**', num: '16' },
            { msg: '风寒袭表', name: '贺**', num: '17' },
            { msg: '肾阳亏虚', name: '何**', num: '18' }],
            num: 0,
            map: null,
            marker: null,
            list: [],
            editableTabsValue: '2',
            editableTabs: [{
                title: '采集概况',
                name: '1',
                content: 'Tab 1 content'
            }, {
                title: '指标分析',
                name: '2',
                content: 'Tab 2 content'
            },
            {
                title: '趋势分析',
                name: '3',
                content: 'Tab 3 content'
            },
            {
                title: '慢病列表',
                name: '4',
                content: 'Tab 4 content'
            },

            ],
            tabIndex: 2,





            echarts1_data: []

        }

    },
    computed: {
        ComputedList() {
            var vm = this.query
            var nameList = this.items
            return nameList.filter(function (item) {
                return item.msg.toLowerCase().indexOf(vm.toLowerCase()) != -1
            })
        }
    },
    methods: {
        showDetail(value, index) {
            console.log(value, index)
            this.dialog_title = value
            console.log(this.dialog_content[index][0].characteristic)
            console.log(this.dialog_content[index].characteristic)
            this.dialog_content_characteristic = this.dialog_content[index][0].characteristic
            this.dialog_content_medicine = this.dialog_content[index][0].medicine
            this.dialog_content_treat = this.dialog_content[index][0].treat
            this.dialogVisible = true
        },
        beforeEnter(el) {
            el.style.opacity = 0
            el.style.height = 0
        },
        randomNum(minNum, maxNum) {
            switch (arguments.length) {
                case 1:
                    return parseInt(Math.random() * minNum + 1, 10);

                case 2:
                    return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);

                default:
                    return 0;

            }
        },
        enter(el) {
            var delay = el.dataset.index * 150
            setTimeout(function () {
                Velocity(el, { opacity: 1, height: '1.6em' }, { completed: null })
            }, delay)
        },
        leave(el, done) {
            var delay = el.dataset.index * 150
            setTimeout(function () {
                Velocity(el, { opacity: 0, height: 0 }, { completed: done })
            }, delay)
        },
        //地图
        initMap() {
            AMapLoader.load({
                key: '83c0846a152313af41e0aab67728eb0f', // 申请好的Web端开发者Key，首次调用 load 时必填
                version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                plugins: [''],// 需要使用的的插件列表，如比例尺'AMap.Scale'等

            })
                .then(AMap => {
                    this.map = new AMap.Map('echart3', {
                        //设置地图容器id
                        viewMode: '3D', //是否为3D地图模式                     
                        zoom: 2,
                        center: [113.369988, 34.805883],
                        showIndoorMap: false,
                        mapStyle: ''
                    });
                    this.map.setMap
                    var markers = [];
                    var allowCollision = false;
                    var layer = new AMap.LabelsLayer({
                        zooms: [3, 20, 20],
                        zIndex: 1000,
                        // collision: false,
                        // 设置 allowCollision：true，可以让标注避让用户的标注
                        allowCollision,
                    });
                    layer.add(markers);
                    // 图层添加到地图
                    this.map.add(layer);

                    var icon = {
                        // 图标类型，现阶段只支持 image 类型
                        type: 'image',
                        // 图片 url


                        // 图片尺寸
                        size: [64, 30],
                        // 图片相对 position 的锚点，默认为 bottom-center
                        anchor: 'center',
                    };
                    var markerContent = '' +
                        '<div class="custom-content-marker">' +
                        '   <img src="https://z1.ax1x.com/2023/11/28/piDmGTO.png">' +
                        '</div>';
                    var marker1 = new AMap.Marker({
                        position: [114.346687, 34.801985],
                        content: markerContent
                    });
                    var marker2 = new AMap.Marker({
                        position: [114.364648, 34.795555],
                        content: markerContent
                    });
                    var marker3 = new AMap.Marker({
                        position: [114.356889, 34.797698],
                        content: markerContent
                    });
                    var marker4 = new AMap.Marker({
                        position: [114.342158, 34.794443],
                        content: markerContent
                    });

                    // 将 markers 添加到地图
                    this.map.add(marker1);
                    this.map.add(marker2);
                    this.map.add(marker3);
                    this.map.add(marker4);




                    // 初始化 labelMarker
                    var LabelsData = [
                        {
                            name: '自提点1',
                            position: [114.346687, 34.801985],
                            zooms: [1, 20],
                            opacity: 1,
                            zIndex: 10,
                            fold: true,
                            icon,
                            text: {
                                // 要展示的文字内容
                                content: '河南大学附属医院',
                                // 文字方向，有 icon 时为围绕文字的方向，没有 icon 时，则为相对 position 的位置
                                direction: 'right',
                                // 在 direction 基础上的偏移量
                                offset: [-20, -5],
                                // 文字样式
                                style: {
                                    // 字体大小
                                    fontSize: 15,
                                    // 字体颜色
                                    fillColor: 'red',
                                    //
                                    strokeColor: '#fff',
                                    strokeWidth: 2,
                                    fold: true,
                                    padding: '2, 5',
                                },
                            },
                        },
                        {
                            name: '自提点2',
                            position: [114.364648, 34.795555],
                            zooms: [1, 20],
                            opacity: 1,
                            zIndex: 16,
                            icon,
                            text: {
                                content: '开封市鼓楼中医院',
                                direction: 'right',
                                offset: [-20, -5],
                                style: {
                                    // 字体大小
                                    fontSize: 15,
                                    // 字体颜色
                                    fillColor: 'red',
                                    //
                                    strokeColor: '#fff',
                                    strokeWidth: 2,
                                    fold: true,
                                    padding: '2, 5',
                                },

                            },
                        },
                        // {
                        //     name: '自提点3',
                        //     position: [114.445506,34.760754],
                        //     zooms: [1, 20],
                        //     opacity: 1,
                        //     zIndex: 8,
                        //     icon,
                        //     text: {
                        //         content: '开封市祥符区中医院',
                        //         direction: 'right',
                        //         offset: [-20, -5],
                        //         style: textStyle,
                        //     },
                        // },
                        {
                            name: '自提点4',
                            position: [114.356889, 34.797698],
                            zooms: [1, 20],
                            opacity: 1,
                            zIndex: 23,
                            icon,
                            text: {
                                content: '开封市中心医院',
                                direction: 'right',
                                offset: [-20, -5],
                                style: {
                                    // 字体大小
                                    fontSize: 15,
                                    // 字体颜色
                                    fillColor: 'red',
                                    //
                                    strokeColor: '#fff',
                                    strokeWidth: 2,
                                    fold: true,
                                    padding: '2, 5',
                                },
                            },
                        },
                        {
                            name: '自提点5',
                            position: [114.342158, 34.794443],
                            zooms: [2, 20],
                            opacity: 1,
                            zIndex: 6,
                            icon,
                            text: {
                                content: '河南大学淮河医院',
                                direction: 'right',
                                offset: [-20, -5],
                                style: {
                                    // 字体大小
                                    fontSize: 15,
                                    // 字体颜色
                                    fillColor: 'red',
                                    //
                                    strokeColor: '#fff',
                                    strokeWidth: 2,
                                    fold: true,
                                    padding: '2, 5',
                                },
                            },
                        },

                    ];

                    for (var i = 0; i < LabelsData.length; i++) {
                        var curData = LabelsData[i];
                        curData.extData = {
                            index: i,
                        };

                        var labelMarker = new AMap.LabelMarker(curData);

                        markers.push(labelMarker);
                    }
                    // 将 marker 添加到图层
                    layer.add(markers);

                    this.map.setFitView(null, false, [100, 150, 10, 10]);

                })

                .catch(e => {
                    console.log(e)
                });

        },

        initChart1(){
            //echart1


        var pieChart = echarts.init(document.getElementById('echart1'));
        pieChart.setOption({
            title: {
                text: "近一周排名前五类疾病占比",
                left: 'center',
                top: 20,
            },

            color: ["#87cefa", "#ff7f50", "#32cd32", "#da70d6", "#FD6C88"],

            legend: {
                y: '245',
                x: 'center',
                textStyle: {
                    color: 'black',

                },
                data: ['高血压', '糖尿病', '脑卒中', '慢阻肺', '慢性肾病'],
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a}<br/>{b}<br/>{c}G ({d}%)"
            },
            grid: {
                bottom: 0,

                left: 20
            },
            calculable: false,
            series: [
                {
                    name: '采集数据量',
                    type: 'pie',
                    radius: ['40%', '66%'],
                    center: ['50%', '50%'],
                    itemStyle: {
                        normal: {
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            }
                        },
                        emphasis: {
                            label: {
                                show: true,
                                position: 'center',
                                textStyle: {
                                    fontSize: '20',
                                    fontWeight: 'bold'
                                }
                            }
                        }
                    },
                    // data: [
                    //     { value: 335, name: '高血压' },
                    //     { value: 310, name: '糖尿病' },
                    //     { value: 234, name: '脑卒中' },
                    //     { value: 135, name: '慢阻肺' },
                    //     { value: 235, name: '慢性肾病' }
                    // ]
                    data: this.echarts1_data
                }
            ]
        });
        }

    },



    mounted() {
        var echarts1_data;
        axios.post('/api/datashare/echarts1','',{
            headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "token": this.token
          }
        }).then(res => {
            this.echarts1_data = res.data.data
            //echarts1_data = res.data.data.map(item => ({value: Number(item.value), name: item.name}))
            console.log(echarts1_data)
            this.initChart1()
        })
        console.log(echarts1_data)
        this.initMap()
        
        


        // var myColor = ['#1089E7', '#F57474', '#56D0E3', '#F8B448', '#8B78F6'];

        

        //echart2预测
        let color = ["#8B5CFF", "#00CA69"];

        let xAxisData = ["1", "2", "3", "4", "5", "6", "7", "8"];
        let yAxisData1 = [10000, 13800, 35000, 17300, 18000, 15000, 18000, 23000];
        let yAxisData2 = [23300, 23300, 20000, 18000, 19900, 23300, 21000, 18000];

        const hexToRgba = (hex, opacity) => {
            let rgbaColor = "";
            let reg = /^#[\da-f]{6}$/i;
            if (reg.test(hex)) {
                rgbaColor = `rgba(${parseInt("0x" + hex.slice(1, 3))},${parseInt(
                    "0x" + hex.slice(3, 5)
                )},${parseInt("0x" + hex.slice(5, 7))},${opacity})`;
            }
            return rgbaColor;
        };

        var histogramChart1 = echarts.init(document.getElementById('echart4'));
        histogramChart1.setOption({
            backgroundColor: "#fff",
            color: color,
            legend: {
                top: 20,
            },
            tooltip: {
                trigger: "axis",
                formatter: function (params) {
                    let html = "";
                    params.forEach((v) => {
                        html += `<div style="color: #666;font-size: 14px;line-height: 24px">
                <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${color[v.componentIndex]
                            };"></span>
                ${v.seriesName}2020.${v.name}  
                <span style="color:${color[v.componentIndex]
                            };font-weight:700;font-size: 18px;margin-left:10px">${v.value
                            }</span>
                万元`;
                    });
                    return html;
                },
                extraCssText:
                    "background: #fff; border-radius: 0;box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);color: #333;",
                axisPointer: {
                    type: "shadow",
                    shadowStyle: {
                        color: "#ffffff",
                        shadowColor: "rgba(225,225,225,1)",
                        shadowBlur: 5,
                    },
                },
            },
            grid: {
                top: 50,
                bottom: 10,
                left: 10,
                right: 10,
                containLabel: true,
            },
            xAxis: [
                {
                    type: "category",
                    boundaryGap: false,
                    axisLabel: {
                        formatter: "2023-{value}",
                        textStyle: {
                            color: "#333",
                        },
                    },
                    axisLine: {
                        lineStyle: {
                            color: "#D9D9D9",
                        },
                    },
                    data: xAxisData,
                },
            ],
            yAxis: [
                {
                    type: "value",
                    name: "（单位/人）",
                    axisLabel: {
                        textStyle: {
                            color: "#666",
                        },
                    },
                    nameTextStyle: {
                        color: "#666",
                        fontSize: 12,
                        lineHeight: 40,
                    },
                    // 分割线
                    splitLine: {
                        lineStyle: {
                            type: "dashed",
                            color: "#E9E9E9",
                        },
                    },
                    axisLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                },
            ],
            series: [
                {
                    // name: "2018",
                    name: "预测人流量",
                    type: "line",
                    smooth: true,
                    symbolSize: 8,
                    zlevel: 3,
                    lineStyle: {
                        normal: {
                            color: color[0],
                            shadowBlur: 3,
                            shadowColor: hexToRgba(color[0], 0.5),
                            shadowOffsetY: 8,
                        },
                    },
                    symbol: "circle", //数据交叉点样式
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1,
                                [
                                    {
                                        offset: 0,
                                        color: hexToRgba(color[0], 0.3),
                                    },
                                    {
                                        offset: 1,
                                        color: hexToRgba(color[0], 0.1),
                                    },
                                ],
                                false
                            ),
                            shadowColor: hexToRgba(color[0], 0.1),
                            shadowBlur: 10,
                        },
                    },
                    data: yAxisData1,
                },
                {
                    name: "实际人流量",
                    type: "line",
                    smooth: true,
                    symbolSize: 8,
                    zlevel: 3,
                    lineStyle: {
                        normal: {
                            color: color[1],
                            shadowBlur: 3,
                            shadowColor: hexToRgba(color[1], 0.5),
                            shadowOffsetY: 8,
                        },
                    },
                    symbol: "circle", //数据交叉点样式 (实心点)
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1,
                                [
                                    {
                                        offset: 0,
                                        color: hexToRgba(color[1], 0.3),
                                    },
                                    {
                                        offset: 1,
                                        color: hexToRgba(color[1], 0.1),
                                    },
                                ],
                                false
                            ),
                            shadowColor: hexToRgba(color[1], 0.1),
                            shadowBlur: 10,
                        },
                    },
                    data: yAxisData2,
                },
            ],
        })
        //表3地图



        //表6条状图
        var echart4 = echarts.init(document.getElementById('echart6'));
        echart4.setOption(

            {
                color: ["#87cefa", "#ff7f50", "#32cd32", "#da70d6",],
                legend: {
                    y: 'center',
                    x: 'center',
                    data: ['河南大学附属医院', '开封市中心医院', '河南大学淮河医院', '开封市鼓楼中医院'],

                    textStyle: {
                        color: 'black',

                    }
                },

                calculable: true,
                legend: {
                    y: '300',
                    x: 'center',
                    textStyle: {
                        color: 'black',
                    },
                    data: ['河南大学附属医院', '开封市中心医院', '河南大学淮河医院', '开封市鼓楼中医院'],
                },
                title: {
                    text: '各医院门诊住院费用',
                    left: 'center',
                    top: 20
                },
                grid: {
                    left: '5%',
                    right: '0%',
                    bottom: '0%',
                    containLabel: true
                },

                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },

                xAxis: [
                    {
                        type: 'value',
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: ['#f2f2f2'],
                                width: 0,
                                type: 'solid'
                            }
                        }

                    }
                ],

                yAxis: [
                    {
                        type: 'category',
                        data: ['人数(人)', '人次(人)', '费用(元)'],
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: 'black'
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                width: 0,
                                type: 'solid'
                            }
                        }
                    }
                ],

                series: [
                    {
                        name: '河南大学附属医院',
                        type: 'bar',
                        stack: '总量',
                        itemStyle: { normal: { label: { show: true, position: 'insideRight' } } },
                        data: [320, 302, 301]
                    },
                    {
                        name: '开封市中心医院',
                        type: 'bar',
                        stack: '总量',
                        itemStyle: { normal: { label: { show: true, position: 'insideRight' } } },
                        data: [120, 132, 101]
                    },
                    {
                        name: '河南大学淮河医院',
                        type: 'bar',
                        stack: '总量',
                        itemStyle: { normal: { label: { show: true, position: 'insideRight' } } },
                        data: [220, 182, 191]
                    },
                    {
                        name: '开封市鼓楼中医院',
                        type: 'bar',
                        stack: '总量',
                        itemStyle: { normal: { label: { show: true, position: 'insideRight' } } },
                        data: [150, 212, 201]
                    }

                ]
            });
        //表5折线图
        var echart5 = echarts.init(document.getElementById('echart2'));
        echart5.setOption(
            {
                title: {
                    text: '数据采集数(当日)',
                    left: 'center',
                    top: 20
                },
                color: ["#87cefa", "#ff7f50", "#32cd32", "#da70d6",],
                legend: {
                    y: '245',
                    x: 'center',
                    textStyle: {
                        color: 'black',

                    },
                    data: ['河南大学附属医院', '开封市中心医院', '河南大学淮河医院', '开封市鼓楼中医院'],
                },
                calculable: false,
                tooltip: {
                    trigger: 'item',
                    formatter: "{a}<br/>{b}<br/>{c}条"
                },
                yAxis: [
                    {
                        type: 'value',
                        axisLine: { onZero: false },
                        axisLine: {
                            lineStyle: {
                                color: '#034c6a'
                            },
                        },

                        axisLabel: {
                            textStyle: {
                                color: 'black'
                            },
                            formatter: function (value) {
                                return value + "条"
                            },
                        },
                        splitLine: {
                            lineStyle: {
                                width: 0,
                                type: 'solid'
                            }
                        }
                    }
                ],
                xAxis: [
                    {
                        type: 'category',
                        data: ['8:00', '10:00', '12:00', '14:00', '16:00', '18:00'],
                        axisLine: {
                            lineStyle: {
                                color: '#034c6a'
                            },
                        },
                        splitLine: {
                            "show": false
                        },
                        axisLabel: {
                            textStyle: {
                                color: 'black'
                            },
                            formatter: function (value) {
                                return value + ""
                            },
                        },
                        splitLine: {
                            lineStyle: {
                                width: 0,
                                type: 'solid'
                            }
                        },
                    }
                ],
                grid: {
                    left: '5%',
                    right: '5%',
                    bottom: '20%',
                    containLabel: true
                },
                series: [
                    {
                        name: '河南大学附属医院',
                        type: 'line',
                        smooth: true,
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    shadowColor: 'rgba(0,0,0,0.4)'
                                }
                            }
                        },
                        data: [15, 0, 20, 45, 22.1, 25,].reverse()
                    },
                    {
                        name: '开封市中心医院',
                        type: 'line',
                        smooth: true,
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    shadowColor: 'rgba(0,0,0,0.4)'
                                }
                            }
                        },
                        data: [25, 10, 30, 55, 32.1, 35,].reverse()
                    },
                    {
                        name: '河南大学淮河医院',
                        type: 'line',
                        smooth: true,
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    shadowColor: 'rgba(0,0,0,0.4)'
                                }
                            }
                        },
                        data: [35, 20, 40, 65, 42.1, 45,].reverse()
                    },
                    {
                        name: '开封市鼓楼中医院',
                        type: 'line',
                        smooth: true,
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    shadowColor: 'rgba(0,0,0,0.4)'
                                }
                            }
                        },
                        data: [45, 30, 50, 75, 52.1, 55, 6].reverse()
                    }
                ]


            })
        //表7折线图
        var echart7 = echarts.init(document.getElementById('echart5'));
        echart7.setOption({
            title: {
                text: '就诊人数(当日)',
                left: 'center',
                top: 20
            },
            color: ["#87cefa", "#ff7f50", "#32cd32", "#da70d6",],
            legend: {
                y: '245',
                x: 'center',
                textStyle: {
                    color: 'black',

                },
                data: ['河南大学附属医院', '开封市中心医院', '河南大学淮河医院', '开封市鼓楼中医院'],
            },
            calculable: false,
            tooltip: {
                trigger: 'item',
                formatter: "{a}<br/>{b}<br/>{c}条"
            },
            yAxis: [
                {
                    type: 'value',
                    axisLine: { onZero: false },
                    axisLine: {
                        lineStyle: {
                            color: '#034c6a'
                        },
                    },

                    axisLabel: {
                        textStyle: {
                            color: 'black'
                        },
                        formatter: function (value) {
                            return value + "k条"
                        },
                    },
                    splitLine: {
                        lineStyle: {
                            width: 0,
                            type: 'solid'
                        }
                    }
                }
            ],
            xAxis: [
                {
                    type: 'category',
                    data: ['8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
                    axisLine: {
                        lineStyle: {
                            color: '#034c6a'
                        },
                    },
                    splitLine: {
                        "show": false
                    },
                    axisLabel: {
                        textStyle: {
                            color: 'black'
                        },
                        formatter: function (value) {
                            return value + ""
                        },
                    },
                    splitLine: {
                        lineStyle: {
                            width: 0,
                            type: 'solid'
                        }
                    },
                }
            ],
            grid: {
                left: '5%',
                right: '5%',
                bottom: '20%',
                containLabel: true
            },
            series: [
                {
                    name: '河南大学附属医院',
                    type: 'line',
                    smooth: true,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                shadowColor: 'rgba(0,0,0,0.4)'
                            }
                        }
                    },
                    data: [15, 0, 20, 45, 22.1, 25, 70, 55, 76]
                },
                {
                    name: '开封市中心医院',
                    type: 'line',
                    smooth: true,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                shadowColor: 'rgba(0,0,0,0.4)'
                            }
                        }
                    },
                    data: [25, 10, 30, 55, 32.1, 35, 80, 65, 76]
                },
                {
                    name: '河南大学淮河医院',
                    type: 'line',
                    smooth: true,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                shadowColor: 'rgba(0,0,0,0.4)'
                            }
                        }
                    },
                    data: [35, 20, 40, 65, 42.1, 45, 90, 75, 96]
                },
                {
                    name: '开封市鼓楼中医院',
                    type: 'line',
                    smooth: true,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                shadowColor: 'rgba(0,0,0,0.4)'
                            }
                        }
                    },
                    data: [45, 30, 50, 75, 52.1, 55, 100, 85, 106]
                }
            ]

        })
        //指标分析
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //echart7
        var myColor = ['#1089E7', '#F57474', '#56D0E3', '#F8B448', '#8B78F6'];

        //各医院门诊人次
        var histogramChart1 = echarts.init(document.getElementById('echart7'));
        histogramChart1.setOption({

            grid: {
                top: '20%',
                left: '42%',
                right: '50',
                bottom: '10%'
            },
            title: {
                text: "各医院门诊人次",
                top: 20,
                left: 'center'
            },
            xAxis: {
                show: false
            },
            yAxis: [{
                show: true,
                data: ['河南大学附属医院', '开封市中心医院', '河南大学淮河医院', '开封市鼓楼中医院'],
                inverse: true,
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: 'black',
                    formatter: (value, index) => {
                        return [

                            `{lg|${index + 1}}  ` + '{title|' + value + '} '
                        ].join('\n')
                    },
                    rich: {
                        lg: {
                            backgroundColor: '#339911',
                            color: '#fff',
                            borderRadius: 15,
                            // padding: 5,
                            align: 'center',
                            width: 15,
                            height: 15
                        },
                    }
                },


            }, {
                show: true,
                inverse: true,
                data: [4000, 3000, 2000, 1000],
                axisLabel: {
                    textStyle: {
                        fontSize: 12,
                        color: 'black',
                    },
                },
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },

            }],
            series: [{
                name: '条',
                type: 'bar',
                yAxisIndex: 0,
                data: [40, 30, 20, 10],
                barWidth: 10,
                itemStyle: {
                    normal: {
                        barBorderRadius: 20,
                        color: function (params) {
                            var num = myColor.length;
                            return myColor[params.dataIndex % num]
                        },
                    }
                },
                label: {
                    normal: {
                        show: true,
                        position: 'inside',
                        formatter: '{c}%'
                    }
                },
            }, {
                name: '框',
                type: 'bar',
                yAxisIndex: 1,
                barGap: '-100%',
                data: [100, 100, 100, 100],
                barWidth: 15,
                itemStyle: {
                    normal: {
                        color: 'none',
                        borderColor: '#00c1de',
                        borderWidth: 3,
                        barBorderRadius: 15,
                    }
                }
            },]
        })
        //各医院住院人次
        var histogramChart2 = echarts.init(document.getElementById('echart11'));
        histogramChart2.setOption({

            grid: {
                top: '20%',
                left: '42%',
                right: '50',
                bottom: '10%'
            },
            title: {
                text: "各医院住院人次",
                left: 'center',
                top: 20
            },
            xAxis: {
                show: false
            },
            yAxis: [{
                show: true,
                data: ['河南大学附属医院', '开封市中心医院', '河南大学淮河医院', '开封市鼓楼中医院'],
                inverse: true,
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: 'black',
                    formatter: (value, index) => {
                        return [

                            `{lg|${index + 1}}  ` + '{title|' + value + '} '
                        ].join('\n')
                    },
                    rich: {
                        lg: {
                            backgroundColor: '#339911',
                            color: '#fff',
                            borderRadius: 15,

                            align: 'center',
                            width: 15,
                            height: 15
                        },
                    }
                },


            }, {
                show: true,
                inverse: true,
                data: [2200, 2400, 2600, 2800],
                axisLabel: {
                    textStyle: {
                        fontSize: 12,
                        color: 'black',
                    },
                },
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },

            }],
            series: [{
                name: '条',
                type: 'bar',
                yAxisIndex: 0,
                data: [22, 24, 26, 28],
                barWidth: 10,
                itemStyle: {
                    normal: {
                        barBorderRadius: 20,
                        color: function (params) {
                            var num = myColor.length;
                            return myColor[params.dataIndex % num]
                        },
                    }
                },
                label: {
                    normal: {
                        show: true,
                        position: 'inside',
                        formatter: '{c}%'
                    }
                },
            }, {
                name: '框',
                type: 'bar',
                yAxisIndex: 1,
                barGap: '-100%',
                data: [100, 100, 100, 100],
                barWidth: 15,
                itemStyle: {
                    normal: {
                        color: 'none',
                        borderColor: '#00c1de',
                        borderWidth: 3,
                        barBorderRadius: 15,
                    }
                }
            },]
        })
        //手术工作量
        var pieChart1 = echarts.init(document.getElementById('echart10'));
        pieChart1.setOption({
            color: ["#87cefa", "#ff7f50", "#32cd32", "#da70d6",],
            tooltip: {
                trigger: 'item',
                formatter: "{a}<br/>{b}<br/>{c}台"
            },
            calculable: true,
            title: {
                text: "手术工作量",
                left: 'center',
                top: 20
            },
            grid: {
                left: 'center'
            },
            series: [
                {
                    name: '手术工作量',
                    type: 'pie',
                    radius: [30, 110],
                    center: ['50%', '55%'],
                    roseType: 'area',
                    //x: '50%',
                    max: 40,
                    sort: 'ascending',
                    data: [
                        { value: 10, name: '河南大学淮河医院' },
                        { value: 5, name: '开封市鼓楼中医院' },
                        { value: 15, name: '开封市中心医院' },
                        { value: 25, name: '河南大学附属医院' },
                    ]
                }
            ]
        })
        //医疗费用
        var lineChart1 = echarts.init(document.getElementById('echart8'));
        lineChart1.setOption({
            color: ["#87cefa", "#ff7f50", "#32cd32", "#da70d6",],
            tooltip: {
                trigger: 'item',
                formatter: "{a}<br/>{b}<br/>{c}元"
            },
            legend: {
                data: ['河南大学附属医院', '开封市中心医院', '河南大学淮河医院', '开封市鼓楼中医院'],
                y: 'bottom',
                x: 'center',
                textStyle: {
                    color: 'black',
                    fontSize: 12
                }
            },
            title: {
                text: "各医院医疗费用",
                left: 'center',
                top: 20
            },
            grid: {
                left: '5%',
                right: '5%',
                bottom: '15%',
                containLabel: true
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                    axisLine: {
                        lineStyle: {
                            color: '#87cefa'
                        },
                    },
                    axisLabel: {
                        interval: 0,
                        rotate: 40,

                        textStyle: {
                            color: 'black',
                            fontSize: 13
                        }
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLine: {
                        lineStyle: {
                            color: '#87cefa'
                        },
                    },
                    splitLine: {
                        "show": false
                    },
                    axisLabel: {
                        textStyle: {
                            color: 'black'
                        },
                        formatter: function (value) {
                            return value + "元"
                        },
                    },
                }
            ],
            series: [
                {
                    name: '河南大学附属医院',
                    type: 'line',
                    smooth: true,
                    itemStyle: { normal: { areaStyle: { type: 'default' } } },
                    data: [10, 12, 21, 54, 260, 830, 710]
                },
                {
                    name: '开封市中心医院',
                    type: 'line',
                    smooth: true,
                    itemStyle: { normal: { areaStyle: { type: 'default' } } },
                    data: [30, 182, 434, 791, 390, 30, 10]
                },
                {
                    name: '开封市鼓楼中医院',
                    type: 'line',
                    smooth: true,
                    itemStyle: { normal: { areaStyle: { type: 'default' } } },
                    data: [1320, 1132, 601, 234, 120, 90, 20]
                },
                {
                    name: '河南大学淮河医院',
                    type: 'line',
                    smooth: true,
                    itemStyle: { normal: { areaStyle: { type: 'default' } } },
                    data: [320, 132, 61, 34, 20, 9, 2]
                }
            ]

        })
        //体检人次
        var lineChart2 = echarts.init(document.getElementById('echart12'));
        lineChart2.setOption({
            color: ["#87cefa", "#ff7f50", "#32cd32", "#da70d6",],
            tooltip: {
                trigger: 'item',
                formatter: "{a}<br/>{b}<br/>{c}人"
            },
            title: {
                text: "各医院体检人次",
                left: 'center',
                top: 20
            },
            legend: {
                data: ['河南大学附属医院', '开封市中心医院', '河南大学淮河医院', '开封市鼓楼中医院'],
                y: 'bottom',
                x: 'center',
                textStyle: {
                    color: 'black',
                    fontSize: 12
                }
            },
            grid: {
                left: '5%',
                right: '5%',
                bottom: '15%',
                containLabel: true
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                    axisLine: {
                        lineStyle: {
                            color: '#87cefa'
                        },
                    },
                    axisLabel: {
                        interval: 0,
                        rotate: 40,

                        textStyle: {
                            color: 'black',
                            fontSize: 13
                        }
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLine: {
                        lineStyle: {
                            color: '#87cefa'
                        },
                    },
                    splitLine: {
                        "show": false
                    },
                    axisLabel: {
                        textStyle: {
                            color: 'black'
                        },
                        formatter: function (value) {
                            return value + "人"
                        },
                    },
                }
            ],
            series: [
                {
                    name: '河南大学附属医院',
                    type: 'line',
                    smooth: true,
                    itemStyle: { normal: { areaStyle: { type: 'default' } } },
                    data: [120, 122, 221, 524, 460, 530, 610]
                },
                {
                    name: '开封市中心医院',
                    type: 'line',
                    smooth: true,
                    itemStyle: { normal: { areaStyle: { type: 'default' } } },
                    data: [130, 682, 534, 691, 490, 130, 110]
                },
                {
                    name: '开封市鼓楼中医院',
                    type: 'line',
                    smooth: true,
                    itemStyle: { normal: { areaStyle: { type: 'default' } } },
                    data: [320, 132, 161, 134, 112, 190, 120]
                },
                {
                    name: '河南大学淮河医院',
                    type: 'line',
                    smooth: true,
                    itemStyle: { normal: { areaStyle: { type: 'default' } } },
                    data: [320, 132, 461, 34, 202, 93, 222]
                }
            ]

        })
        //床位数量分布
        var pieChart2 = echarts.init(document.getElementById('echart14'));
        pieChart2.setOption({
            color: ["#87cefa", "#ff7f50", "#32cd32", "#da70d6",],
            tooltip: {
                trigger: 'item',
                formatter: "{a}<br/>{b}<br/>{c}床"
            },
            title: {
                text: "床位数量分布",
                left: 'center',
                top: 20
            },
            calculable: true,
            series: [
                {
                    name: '床位数量分布',
                    type: 'pie',
                    radius: [30, 110],
                    center: ['45%', '55%'],
                    roseType: 'area',
                    x: '0%',
                    max: 40,
                    sort: 'ascending',
                    data: [
                        { value: 700, name: '河南大学附属医院' },
                        { value: 500, name: '开封市中心医院' },
                        { value: 105, name: '河南大学淮河医院' },
                        { value: 250, name: '开封市鼓楼中医院' },
                    ]
                }
            ]
        })

        //药占比
        var histogramChart3 = echarts.init(document.getElementById('echart9'));
        histogramChart3.setOption({
            title: {
                text: "各药类占比",
                left: 'center',
                top: 20
            },
            color: ['#87cefa'],
            grid: {
                left: '5%',
                right: '5%',
                bottom: '3%',
                containLabel: true
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a}<br/>{b}<br/>{c}%"
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    data: ['河南大学附属医院', '开封市中心医院', '河南大学淮河医院', '开封市鼓楼中医院'],
                    axisLine: {
                        lineStyle: {
                            color: '#87cefa'
                        },
                    },
                    axisLabel: {
                        interval: 0,
                        rotate: 40,

                        textStyle: {
                            color: 'black',
                            fontSize: 13
                        }
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLine: {
                        lineStyle: {
                            color: '#87cefa'
                        },
                    },
                    splitLine: {
                        "show": false
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#fff'
                        },
                        formatter: function (value) {
                            return value + "%"
                        },
                    },
                }
            ],
            series: [
                {
                    name: '药占比',
                    type: 'bar',
                    barWidth: 30,
                    data: [60, 80, 70, 50],
                },
            ]
        });
        //平均住院天数
        var histogramChart4 = echarts.init(document.getElementById('echart13'));
        histogramChart4.setOption({
            color: ['#87cefa'],
            title: {
                text: "各药类占比",
                left: 'center',
                top: 20
            },
            grid: {
                left: '5%',
                right: '5%',
                bottom: '3%',
                containLabel: true
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a}<br/>{b}<br/>{c}天"
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    data: ['河南大学附属医院', '开封市中心医院', '河南大学淮河医院', '开封市鼓楼中医院'],
                    axisLine: {
                        lineStyle: {
                            color: '#87cefa'
                        },
                    },
                    axisLabel: {
                        interval: 0,
                        rotate: 40,

                        textStyle: {
                            color: 'black',
                            fontSize: 13
                        }
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLine: {
                        lineStyle: {
                            color: '#87cefa'
                        },
                    },
                    splitLine: {
                        "show": false
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#fff'
                        },
                        formatter: function (value) {
                            return value + "天"
                        },
                    },
                }
            ],
            series: [
                {
                    name: '平均住院天数',
                    type: 'bar',
                    barWidth: 30,
                    data: [6, 8, 7, 5],
                },
            ]
        });
        ////////////////////////////////////////////////////////////////////////////////////////////////
        //echart15
        //主要传染病
        var chart15 = echarts.init(document.getElementById('echart15'));
        chart15.setOption({

            color: ['#5bc0de'],
            title: {
                text: "主要传染病",
                left: 'center',
                top: 20


            },
            grid: {
                left: '5%',
                right: '5%',
                bottom: '8%',
                containLabel: true
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a}<br/>{b}<br/>{c}人"
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    data: ['感染性腹泻', '流行性感冒', '登革热', '手足口病', '水痘', '流行性眼腺炎', '猩红热', '甲型病毒性肝炎', '疟疾'],
                    axisLine: {
                        lineStyle: {
                            color: '#5bc0de'
                        },
                    },
                    axisLabel: {
                        interval: 0,
                        rotate: 40,
                        textStyle: {
                            color: 'black'
                        }
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLine: {
                        lineStyle: {
                            color: '#5bc0de'
                        },
                    },
                    splitLine: {
                        "show": false
                    },
                    axisLabel: {
                        textStyle: {
                            color: 'black'
                        },
                        formatter: function (value) {
                            return value + ""
                        },
                    },
                }
            ],
            series: [
                {
                    name: '主要传染病',
                    type: 'bar',
                    barWidth: 20,
                    data: [2210, 1085, 926, 669, 634, 452, 412, 312, 156],
                },
            ]
        })
        //传染病发病趋势
        var Chart2 = echarts.init(document.getElementById('echart16'));
        Chart2.setOption({
            title: {
                text: "传染病发病趋势",
                top: 20,
                left: 'center'
            },
            color: ["#ffc20e", "#00ae9d"],
            grid: {
                top: "20%",
                left: "2%",
                right: "2%",
                bottom: "15%",
                containLabel: true
            },
            tooltip: {
                trigger: "axis",
                backgroundColor: "rgba(61, 85, 102, 0.2)",
                borderWidth: 1,
                borderColor: "#9DBAE1", // 边框颜色
                // 选中线颜色
                axisPointer: {
                    lineStyle: {
                        color: "#9DBAE1"
                    }
                },
                // 字体颜色
                textStyle: {
                    color: "black",
                    fontSize: 10
                }
            },
            legend: {
                right: "3%",
                icon: "circle",
                itemWidth: 8,
                itemGap: 20,
                textStyle: {
                    padding: [0, 0, 0, 5]
                }
            },
            xAxis: [

                {
                    type: "category",
                    boundaryGap: true,
                    axisLabel: {
                        color: "#33a3dc",
                        fontSize: 14,
                        show: true,
                    },
                    axisLine: {
                        lineStyle: {
                            color: "rgba(255,255,255,.1)"
                        }
                    },
                    data: ["4月", "5月", "6月", "7月", "8月", "9月", "10月"]
                }
            ],
            yAxis: [
                {
                    type: "value",
                    name: "",
                    axisLabel: {
                        color: "#33a3dc",
                        fontSize: 14
                    },
                    splitLine: {
                        lineStyle: {
                            type: "solid",
                            color: "rgba(255,255,255,.1)",
                            width: 1
                        }
                    }
                }
            ],
            series: [
                {
                    name: "",
                    type: "line",
                    smooth: true, // 是否平滑曲线显示
                    // symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
                    symbolSize: 0,
                    lineStyle: {
                        normal: {
                            color: "#ffc20e" // 线条颜色
                        }
                    },
                    areaStyle: {
                        // 区域填充样式
                        normal: {
                            // 线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
                                [
                                    { offset: 0, color: "rgba(255,194,14, 0.8)" },
                                    { offset: 1, color: "rgba(255,194,14, 0)" }
                                ],
                                false
                            )
                            // shadowColor: "rgba(53,142,215, 0.9)", // 阴影颜色
                            // shadowBlur: 20 // shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                        }
                    },
                    data: [20, 58, 19, 56, 86, 35, 25]
                },
                {
                    name: "",
                    type: "line",
                    smooth: true, // 是否平滑曲线显示
                    // symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
                    symbolSize: 0,
                    lineStyle: {
                        normal: {
                            color: "#00ae9d" // 线条颜色
                        }
                    },
                    areaStyle: {
                        // 区域填充样式
                        normal: {
                            // 线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
                                [
                                    { offset: 0, color: "rgba(0,174,157, 0.8)" },

                                ],
                                false
                            )
                            // shadowColor: "rgba(53,142,215, 0.9)", // 阴影颜色
                            // shadowBlur: 20 // shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                        }
                    },
                    data: [40, 29, 38, 28, 43, 45, 62]
                }
            ]


        })

        //主要疾病排行
        var Chart3 = echarts.init(document.getElementById('echart17'));
        Chart3.setOption({
            title: {
                text: "主要疾病排行",
                top: 20,
                left: 'center'
            },
            grid: {
                top: '15%',
                left: '25%',
                right: '20%',
                bottom: '15%'
            },
            xAxis: {
                show: false
            },
            yAxis: [{
                show: true,
                data: ['肾阴虚', '肾阳虚', '胃胀', '足三里', '甲状腺', '大便出血', '水痘', '脾胃湿热'],
                inverse: true,
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: 'black',
                    formatter: (value, index) => {
                        return [

                            `{lg|${index + 1}}  ` + '{title|' + value + '} '
                        ].join('\n')
                    },
                    rich: {
                        lg: {
                            backgroundColor: '#339911',
                            color: '#fff',
                            borderRadius: 15,
                            // padding: 5,
                            align: 'center',
                            width: 15,
                            height: 15
                        },
                    }
                },


            }, {
                show: true,
                inverse: true,
                data: [2000, 1800, 1200, 1100, 900, 900, 800, 700],
                axisLabel: {
                    textStyle: {
                        fontSize: 12,
                        color: 'black',
                    },
                },
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },

            }],
            series: [{
                name: '条',
                type: 'bar',
                yAxisIndex: 0,
                data: [20, 18, 12, 11, 9, 9, 8, 7],
                barWidth: 10,
                itemStyle: {
                    normal: {
                        barBorderRadius: 20,
                        color: function (params) {
                            var num = myColor.length;
                            return myColor[params.dataIndex % num]
                        },
                    }
                },
                label: {
                    normal: {
                        show: true,
                        position: 'inside',
                        formatter: '{c}%'
                    }
                },
            }, {
                name: '框',
                type: 'bar',
                yAxisIndex: 1,
                barGap: '-100%',
                data: [100, 100, 100, 100, 100, 100, 100, 100],
                barWidth: 15,
                itemStyle: {
                    normal: {
                        color: 'none',
                        borderColor: '#00c1de',
                        borderWidth: 1,
                        barBorderRadius: 15,
                    }
                }
            },]
        })
        //预警信息
        var Chart9 = echarts.init(document.getElementById('echart20'));
        Chart9.setOption({
            title: {
                text: '预警信息',
                left: 'center',
                top: 20
            },

            backgroundColor: '#ffffff',
            color: ['#f36119', '#ff9921', '#20c8ff', '#2cb7ff', '#1785ef'],
            "tooltip": {
                "trigger": "axis",
                "axisPointer": {
                    "type": "cross",
                    "label": {
                        "backgroundColor": "red"
                    },
                    "lineStyle": {
                        "color": "#9eb2cb"
                    }
                }
            },

            "legend": {
                show: false,
                "top": "top",
                "left": "2%",
                "textStyle": {
                    "color": "#000"
                },
                "itemHeight": 2,
                "data": ['9月21日感染性腹泻发病：123人次', '9月21日感染性腹泻发病：123人次', '商务', '即将成交', '赢单']
            },
            grid: {
                top: 20,
                "left": "2%",
                "right": 20,
                "bottom": 30,
                "containLabel": true,
                "borderWidth": 0.5
            },

            series: [
                {
                    top: 66,
                    bottom: 40,
                    type: 'funnel',
                    left: '20%',
                    width: '60%',
                    gap: 16,
                    minSize: 180,
                    maxSize: 310,
                    label: {
                        show: true,
                        position: 'inside',
                        // formatter: '{b}  ({c}万)'
                    },
                    data: [
                        { value: 100, name: '9月21日感染性腹泻发病：123人次' },
                        { value: 80, name: '9月20日流行性感冒：57人次' },
                        { value: 60, name: '9月19日:手足口病发病同比增长220%' },
                        { value: 40, name: '9月17日流行性感冒：157人次' },
                        { value: 20, name: '9月18日登革热死亡:2人' },

                    ]
                },
                // 复制一份第一个的，隐藏主体把延长线放长

            ]
        })
        //疾病发病趋势
        var Chart39 = echarts.init(document.getElementById('echart18'));
        Chart39.setOption({
            title: {
                text: "主要疾病发病趋势",
                top: 20,
                left: 'center'
            },
            color: ["#ffc20e", "#00ae9d"],
            grid: {
                top: "20%",
                left: "2%",
                right: "2%",
                bottom: "15%",
                containLabel: true
            },
            tooltip: {
                trigger: "axis",
                backgroundColor: "rgba(61, 85, 102, 0.2)",
                borderWidth: 1,
                borderColor: "#9DBAE1", // 边框颜色
                // 选中线颜色
                axisPointer: {
                    lineStyle: {
                        color: "#9DBAE1"
                    }
                },
                // 字体颜色
                textStyle: {
                    color: "black",
                    fontSize: 10
                }
            },
            legend: {
                right: "3%",
                icon: "circle",
                itemWidth: 8,
                itemGap: 20,
                textStyle: {
                    padding: [0, 0, 0, 5]
                }
            },
            xAxis: [

                {
                    type: "category",
                    boundaryGap: true,
                    axisLabel: {
                        color: "#33a3dc",
                        fontSize: 14,
                        show: true,
                    },
                    axisLine: {
                        lineStyle: {
                            color: "rgba(255,255,255,.1)"
                        }
                    },
                    data: ["4月", "5月", "6月", "7月", "8月", "9月", "10月"]
                }
            ],
            yAxis: [
                {
                    type: "value",
                    name: "",
                    axisLabel: {
                        color: "#33a3dc",
                        fontSize: 14
                    },
                    splitLine: {
                        lineStyle: {
                            type: "solid",
                            color: "rgba(255,255,255,.1)",
                            width: 1
                        }
                    }
                }
            ],
            series: [
                {
                    name: "",
                    type: "line",
                    smooth: true, // 是否平滑曲线显示
                    // symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
                    symbolSize: 0,
                    lineStyle: {
                        normal: {
                            color: "#ffc20e" // 线条颜色
                        }
                    },
                    areaStyle: {
                        // 区域填充样式
                        normal: {
                            // 线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
                                [
                                    { offset: 0, color: "rgba(255,194,14, 0.8)" },

                                ],
                                false
                            )
                            // shadowColor: "rgba(53,142,215, 0.9)", // 阴影颜色
                            // shadowBlur: 20 // shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                        }
                    },
                    data: [20, 51, 19, 26, 46, 35, 25]
                },
                {
                    name: "",
                    type: "line",
                    smooth: true, // 是否平滑曲线显示
                    // symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
                    symbolSize: 0,
                    lineStyle: {
                        normal: {
                            color: "#00ae9d" // 线条颜色
                        }
                    },
                    areaStyle: {
                        // 区域填充样式
                        normal: {
                            // 线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
                                [
                                    { offset: 0, color: "rgba(0,174,157, 0.8)" },

                                ],
                                false
                            )
                            // shadowColor: "rgba(53,142,215, 0.9)", // 阴影颜色
                            // shadowBlur: 20 // shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                        }
                    },
                    data: [40, 29, 38, 28, 43, 45, 62]
                }
            ],



        })

        //年龄分布
        var pieChart100 = echarts.init(document.getElementById('echart22'));
        pieChart100.setOption({
            color: ["#32cd32", "#ff7f50", "#87cefa", "#FD6C88", "#4b5cc4", "#faff72"],
            title: {
                text: '患者年龄分布',
                left: 'center',
                top: '20'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a}<br/>{b}<br/>{c}人"
            },
            calculable: true,
            series: [
                {
                    name: '发病人数',
                    type: 'pie',
                    radius: [30, 110],
                    center: ['50%', '55%'],
                    roseType: 'area',




                    sort: 'ascending',
                    data: [
                        { value: 10, name: '婴儿(1-3岁)' },
                        { value: 5, name: '少儿(4-10岁)' },
                        { value: 15, name: '少年(10-18岁)' },
                        { value: 25, name: '青年(18-45岁)' },
                        { value: 125, name: '中年(45-60岁)' },
                        { value: 175, name: '老年(60岁以上)' },
                    ]
                }
            ]
        })
        var labelFromatter = {
            normal: {
                label: {
                    position: 'center',
                    formatter: function (params) {
                        console.log(params)
                        if (params.name == "女性") {
                            return "女性" + ":" + (params.percent + '%')
                        } else {
                            return "男性" + ":" + (params.percent + '%')
                        }
                    },
                },
                labelLine: {
                    show: false
                }
            },
        };

        var pieChart21 = echarts.init(document.getElementById('echart21'));
        pieChart21.setOption({
            title: {
                text: '患者性别分布',
                left: 'center',
                top: '20'
            },
            color: ['#87cefa', '#FD6C88'],
            tooltip: {
                trigger: 'item',
                formatter: "{b}({c})<br/>{d}%"
            },

            series: [
                {
                    type: 'pie',
                    center: ['50%', '55%'],
                    radius: [70, 105],
                    x: '0%', // for funnel
                    itemStyle: labelFromatter,
                    data: [
                        { name: '男性', value: 158 },
                        { name: '女性', value: 142 },
                    ]
                },
            ],
        })
        //主要症状
        var histogramChart19 = echarts.init(document.getElementById('echart19'));
        histogramChart19.setOption({
            title: {
                text: '主要症状',
                left: 'center',
                top: '20'
            },
            color: ['#FD6C88'],
            grid: {
                left: '5%',
                right: '7%',
                bottom: '10%',
                containLabel: true
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a}<br/>{b}<br/>{c}人"
            },
            calculable: true,
            yAxis: [
                {
                    type: 'category',
                    data: ['腹痛、腹胀、腹泻', '恶心、呕吐、食欲不振', '肌肉酸痛、乏力', '持续高烧', '头痛、眼眶痛、肌肉疼', '皮疹、水泡', '呼吸浅促', '发热、咳嗽、流口水'],
                    axisLine: {
                        lineStyle: {
                            color: '#FD6C88'
                        },
                    },
                    axisLabel: {
                        textStyle: {
                            color: 'black'
                        }
                    }
                }
            ],
            xAxis: [
                {
                    type: 'value',
                    axisLine: {
                        lineStyle: {
                            color: '#FD6C88'
                        },
                    },
                    splitLine: {
                        "show": false
                    },
                    axisLabel: {
                        textStyle: {
                            color: 'black'
                        },
                        formatter: function (value) {
                            return value + ""
                        },
                    },
                }
            ],
            series: [
                {
                    name: '主要症状',
                    type: 'bar',
                    barWidth: 20,
                    data: [1750, 1416, 1136, 819, 704, 413, 251, 175],
                },
            ]
        })
        var colorList = [[
            '#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed',
            '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0',
            '#1e90ff', '#ff6347', '#7b68ee', '#d0648a', '#ffd700',
            '#6b8e23', '#4ea397', '#3cb371', '#b8860b', '#7bd9a5'
        ],
        [
            '#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed',
            '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0',
            '#1e90ff', '#ff6347', '#7b68ee', '#00fa9a', '#ffd700',
            '#6b8e23', '#ff00ff', '#3cb371', '#b8860b', '#30e0e0'
        ],
        [
            '#929fff', '#9de0ff', '#ffa897', '#af87fe', '#7dc3fe',
            '#bb60b2', '#433e7c', '#f47a75', '#009db2', '#024b51',
            '#0780cf', '#765005', '#e75840', '#26ccd8', '#3685fe',
            '#9977ef', '#f5616f', '#f7b13f', '#f9e264', '#50c48f'
        ]][2];

        var names = [

            "肝阳上亢",
            "风寒",
            "气虚",
            "虚寒泄泻",
            "恶寒发热",
            "色素斑",
            "内伤发热",
            "小儿暑温",
            "伏暑",
            "寒滞肝脉症",
            "痰浊眩晕",
            "经行头痛",
            "赤痢",
            "肝热病",
            "色斑",
            "暑湿",
            "肝火犯肺",
            "硬皮病",
            "胃痛",
            "产后血瘀",
            "心律失常",
            "甲状腺结节肿",
            "便秘",
            "湿疹",
            "骨髓炎",
            "支气管哮喘",
            // "荨麻疹",
            // "便秘",
            // "便秘",
        ]

        var obj = {
            "name": "人口库",
            //"value": 2373,
            "symbol": "image://data:image/png",
            "symbolSize": 0,
            "draggable": false,
            "itemStyle": {
                "normal": {
                    //"shadowBlur": 20,
                    //"shadowColor": colorList[2],
                    //"color": colorList[2]
                }
            },
            "label": {
                "normal": {
                    show: false, // 是否显示标签。
                }
            }
        }




        var data = []
        var links = []
        data.push(obj)
        for (var i = 0; i < names.length; i++) {
            var c = this.randomNum(0, 19)
            obj = {
                "name": names[i],
                //"value": 2373,
                "symbolSize": this.randomNum(40, 120),
                "draggable": false,
                "itemStyle": {
                    "normal": {
                        "shadowBlur": 20,
                        "shadowColor": colorList[c],
                        "color": colorList[c]
                    }
                }
            }
            data.push(obj)

            var link = {
                source: '人口库',
                target: names[i],
            }

            links.push(link)
        }


        var pieChart29 = echarts.init(document.getElementById('wordCloud'));
        pieChart29.setOption({
            // 图表标题
            title: {
                show: false,//显示策略，默认值true,可选为：true（显示） | false（隐藏）
                text: '人口库',//主标题文本，'\n'指定换行
                x: 'center',        // 水平安放位置，默认为左对齐，可选为：
                // 'center' ¦ 'left' ¦ 'right'
                // ¦ {number}（x坐标，单位px）
                y: 'center',             // 垂直安放位置，默认为全图顶端，可选为：
                // 'top' ¦ 'bottom' ¦ 'center'
                // ¦ {number}（y坐标，单位px）
                //textAlign: null          // 水平对齐方式，默认根据x设置自动调整
                //backgroundColor: 'rgba(0,0,0,0)',
                //borderColor: '#ccc',    // 标题边框颜色
                //borderWidth: 0,         // 标题边框线宽，单位px，默认为0（无边框）
                //padding: 5,             // 标题内边距，单位px，默认各方向内边距为5，
                // 接受数组分别设定上右下左边距，同css
                itemGap: 10,            // 主副标题纵向间隔，单位px，默认为10，
                textStyle: {
                    fontSize: 50,
                    fontWeight: 'bolder',
                    color: '#fff'        // 主标题文字颜色
                },
                subtextStyle: {
                    color: '#aaa'        // 副标题文字颜色
                }
            },
            //backgroundColor:'rgba(255, 255, 255, 0.5)',
            animationDurationUpdate: function (idx) {
                // 越往后的数据延迟越大
                return idx * 1000;
            },
            animationEasingUpdate: 'bounceIn',
            //color: ['#fff', '#fff', '#fff'],
            series: [{
                type: 'graph',
                name: "name",
                layout: 'force',
                force: {
                    // initLayout: , // 力引导的初始化布局，默认使用xy轴的标点
                    repulsion: 1300, // 节点之间的斥力因子。支持数组表达斥力范围，值越大斥力越大。
                    gravity: 0.2, // 节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
                    edgeLength: 200, // 边的两个节点之间的距离，这个距离也会受 repulsion影响 。值越大则长度越长
                    layoutAnimation: true // 因为力引导布局会在多次迭代后才会稳定，这个参数决定是否显示布局的迭代动画
                    // 在浏览器端节点数据较多（>100）的时候不建议关闭，布局过程会造成浏览器假死。                        
                },
                lineStyle: { // ========关系边的公用线条样式。
                    normal: {
                        color: 'rgba(255, 0, 255, 0.4)',
                        width: '1', //线的粗细
                        type: 'solid', // 线的类型 'solid'（实线）'dashed'（虚线）'dotted'（点线）
                        curveness: 0.3, // 线条的曲线程度，从0到1
                        opacity: 0 // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。默认0.5
                    },
                    emphasis: { // 高亮状态

                    }
                },
                roam: true,
                label: {
                    normal: {
                        show: true,
                        color: "#fff"
                    },
                },
                data: data,
                links: links
            }]


        })


        let index = 0;
        setInterval(function () {
            // 这里的7 为x轴的长度
            if (index >= 7) {
                index = 0;
            }
            Chart2.dispatchAction({
                type: "showTip", // 提示框
                seriesIndex: 0,
                dataIndex: index // 第 lightIndex 柱子高亮
            });
            index += 1;
        }, 2000);

        setInterval(function () {
            // 这里的7 为x轴的长度
            if (index >= 7) {
                index = 0;
            }
            Chart39.dispatchAction({
                type: "showTip", // 提示框
                seriesIndex: 0,
                dataIndex: index // 第 lightIndex 柱子高亮
            });
            index += 1;
        }, 2000);
    },

}


</script>

<style>
#content-all {
    position: absolute;
    margin-top: -3px;
    height: 87%;
    width: 99.1%;
    background: url(../../../../image/databg.jpg);
}

.content1 {
    position: absolute;

    height: 87%;
    width: 100%;


}

.echart {
    height: 55%;
    width: 21%;
    background-color: white;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

}

#echart1 {
    position: absolute;
    margin-left: 10px;
    margin-top: 10px;
}

#echart2 {
    position: absolute;
    margin-left: 10px;
    margin-top: 20.7%;


}

#echart3 {
    position: absolute;
    margin-left: 22.27%;
    margin-top: 10px;
    height: 80%;
    width: 55.5%;
    background-color: white;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}

#echart4 {
    position: absolute;
    height: 30%;
    width: 55.5%;
    margin-left: 22.27%;
    margin-top: 29.55%;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}

#echart5 {
    position: absolute;
    margin-left: 78.41%;
    margin-top: 10px;
}

#echart6 {
    position: absolute;
    margin-left: 78.41%;
    margin-top: 20.7%;
}

#datatab div {
    float: left;
    margin-left: 5px;
    padding-top: 10px;
    background-color: rgb(255, 255, 255);
    height: 35px;
    width: 130px;
}

#datatab div:hover {
    color: rgb(254, 209, 81);
}

#datatab {
    position: relative;
    margin-left: -6px;
    margin-top: -20px;
}


.echart_2 {
    float: left;
    width: 362px;
    height: 295px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    margin-left: 10px;
    margin-top: 10px;
    background-color: white;
}

.content2 {}

.two {
    float: inline-start;
    width: 350px;
    height: 340px;

    margin-left: 10px;
    border-radius: 10px;
}

#trend_below div {
    margin-top: -8px;
    width: 363px;
}

span {}

.custom-content-marker img {
    height: 30px;
    width: 30px;
}

.lightThis {
    background-color: rgb(225, 187, 137);
    color: rgb(254, 209, 81)
}

.notLight {
    background-color: #ffff;
    color: black;
}

#list_item {
    margin-left: -80%;


}

#list_item span {
    color: black;
    line-height: 0px;
    text-align: left;
    margin-left: 80px;
}

#thead th {
    width: 120px;
}

#thead {
    display: block;
    margin-left: -5px;
    margin-top: 25px;
}

#wordCloud {
    width: 900px;
    height: 900px;
}
</style>
