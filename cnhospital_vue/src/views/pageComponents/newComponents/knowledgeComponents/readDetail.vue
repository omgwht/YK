<template>
    <div>
        <el-header>
            <header-bar></header-bar>
        </el-header>
        <el-main>
            <div style="background-image:url(./src/image/databg.jpg) ">
        <div>
            <h1 style="text-align: center;">宽街·科普 | 脂肪肝到底需要治疗吗？肝病科医生为您一次说清</h1>
            <p style="text-align: center;">发布时间：2023-11-17 作者：肝病科</p>
        </div>
        <div style="width: 70%; margin-left: 15%;margin-top:3%; ">
            <p class="content">有人说“脂肪肝不是病”，而且“不痛不痒，没感觉，不用治疗”，但事实真的如此吗？</p>
            <p class="content">
                脂肪性肝病（简称脂肪肝）的定义是肝脏脂肪沉积超过5%，通常在体检时通过B超发现。导致脂肪肝的原因有很多，最常见的是代谢障碍是脂肪肝，另一个原因的长期大量饮酒，除此之外还有药物、病毒等因素。</p>
            <p class="content">代谢相关脂肪肝在我国成年人的发病率已超过25%，也是60岁以上人群最常见的慢性肝病，患病率可达到26.7%~42.8%。同为代谢异常的糖尿病人群合并脂肪肝的比例更高，超过了60%。
            </p>
            <p class="content">
                很多脂肪肝病人没有症状，只是在体检时B超提示有脂肪肝，肝功能也是正常的，这种脂肪肝属于单纯性脂肪肝。但是有大约15％左右的病人会发展为脂肪性肝炎，表现为丙氨酸氨基转移酶（ALT）、γ-谷氨酰转肽酶（GGT）升高，3.7%会发展成肝硬化，另有一小部分会发展成肝癌，每10000个脂肪肝病人中，每年进展为肝癌的人数大约是18人。
            </p>
            <p class="content">除此之外，脂肪肝还与心血管疾病、肝外恶性肿瘤的发病关系密切，有研究发现脂肪肝是冠心病的独立危险因素，从这个角度来讲，脂肪肝的危害并不限于肝脏，更多是提示人体内环境的紊乱，需要积极治疗。
            </p>
            <p class="content"><b>控制脂肪肝，从减重开始</b></p>
            <p class="content">
                脂肪肝的发病与超重/肥胖有关，而超重/肥胖主要是因为热量摄入过多、能量消耗减少的生活方式所致，因此，生活方式改善是脂肪肝治疗的基础。国内外指南都将改变不良生活习惯、保持健康体重（减重）作为一线治疗。体重减轻可以明显改善脂肪肝，体重下降5%则肝内脂肪含量显著下降，体重下降10%以上，那么90%的患者肝脏炎症得到缓解，45%患者的肝纤维化可以得到改善。
            </p>
            <p class="content">
                怎么减体重呢？先从饮食习惯入手。有人正餐主食量大，爱吃油炸、烧烤，有的爱喝含糖饮料，有的爱吃甜食，有的爱吃坚果等等。就建议主食（碳水）减少，一般可以减少1/3至1/2，减少油的摄入、减少零食等。</p>
            <img src="https://www.bjzhongyi.com/Uploads/Picture/2023/11/20/u655ac6dfcb8c3.png">
            <p class="content">运动一般选择能够长期坚持、适合老年人的运动方式，比如广播体操、慢跑、快走、自行车、八段锦、太极拳等，每周至少5次，每次不少于30分钟。</p>
            <p class="content">通过饮食和运动相结合，消耗的热量大于入量，体重会逐渐下降，肝内的脂肪逐渐消减，伴随的糖代谢、脂代谢异常也会好转。</p>
            <p class="content"><b>老年人体检查出中度脂肪肝，需要治疗吗？</b></p>
            <p class="content">在临床当中还是首先要判断脂肪肝的病因，是代谢相关的，还是酒精性或者药物性造成的。</p>
            <p class="content">如果是代谢相关的脂肪肝，会先做肝脏脂肪的定量检测，能更准确评估脂肪肝的程度，通过数值高低进一步评估轻、中、重度。</p>
            <p class="content">同时检查肝功能，判断是否伴有转氨酶的升高，还有一部分人会出现谷氨酰转肽酶的升高，如果有升高，就进入到了脂肪性肝炎的阶段，持续炎症会向肝纤维化方向发展，需要积极治疗。</p>
            <img 
                src="https://www.bjzhongyi.com/Uploads/Picture/2023/11/20/u655ac6eeb5165.png">

            <p class="content">
                对脂肪肝的评估还包括血压、血脂、血糖、尿酸等指标，因为一般脂肪肝不是孤立出现的，是代谢综合征的一部分，往往合并上面那些指标的异常，这些是心血管病的的危险因素。因此，脂肪肝没有发生转氨酶的升高，发生心血管病的风险仍然显著升高。那么控制脂肪肝的意义，就不只是着眼于肝病的进展，而更多通过改善生活方式，降低心脑血管病的发生风险，治疗还是很有必要的。
            </p>
        </div>
    </div>
        </el-main>
    </div>
</template>

<script>
import headerBar from '../../newComponents/headerBar.vue'
export default {
  components: { headerBar },
    mounted(){
        console.log('this is detail')
    }
}
</script>

<style>
.content {
    font-size: 20px;
    margin-top: 30px;
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    margin-bottom: 30px;
    line-height: 30px;
    text-indent: 2em;
}</style>