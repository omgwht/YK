<template>
    <div id="grcf_dialog">
        <div id="treat_date">
            <div style="display: inline-block;"><strong>诊断日期：</strong></div>
            <div style="display: inline-block;">{{ showData.treatDate }}</div>
        </div>
        <div id="detail_text" style="margin-top: 20px;">
            <div style="display: inline;"><strong>详细诊断：</strong></div>
            <div style="display: inline;">{{ showData.detailText }}</div>
        </div>
        <div id="treat_medicine_infos">
            <div class="controlColStyle">
                <strong style="margin-bottom: 10px;">药名</strong>
                <div class="infoCol" v-for="(item, index) in showData.treatMedicineName"
                    v-bind:key="index">
                    <div>{{ item }}</div>
                </div>
            </div>

            <div class="controlColStyle">
                <strong style="margin-bottom: 10px;">每日次数</strong>
                <div class="infoCol" v-for="(item, index) in showData.medicineDaysTime" :key="index">
                    <div>{{ item }}</div>
                </div>
            </div>
            
            <div class="controlColStyle">
                <strong style="margin-bottom: 10px;">次数备注</strong>
                <div class="infoCol" v-for="(item, index) in showData.DaysTimeMore" :key="index">
                    <div>{{ item }}</div>
                </div>
            </div>
            
            <div class="controlColStyle">
                <strong style="margin-bottom: 10px;">服用时间</strong>
                <div class="infoCol" v-for="(item, index) in showData.medicineEatTime" :key="index">
                    <div>{{ item }}</div>
                </div>
            </div>

            <div class="controlColStyle">
                <strong style="margin-bottom: 10px;">时间备注</strong>
                <div class="infoCol" v-for="(item, index) in showData.EatTimeMore" :key="index">
                    <div>{{ item }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['showdData'],
    data() {
        return {
            showData: {
                'detailText': '',
                'treatDate': '',
                'treatMedicineName': [],
                'medicineDaysTime': [],
                'DaysTimeMore': [],
                'medicineEatTime': [],
                'EatTimeMore': []
            }
        }
    },
    mounted() {
        this.showData = this.$props.showdData
        console.log(this.showData)
    }
}
</script>

<style>
#grcf_dialog span {
    color: black;
    font-size: 0px;
}

#treat_medicine_infos {
    margin-left: 80px;
    margin-top: 30px;
    display: flex;
    flex-flow: wrap;
}

#detail_text span {
    color: black;
}

.infoCol {
    width: 100%;
    height: 50px;
    border: 1px solid lightgray;
}
.controlColStyle{
    display: flex; 
    flex-flow: wrap;
    width: 120px;
}
</style>