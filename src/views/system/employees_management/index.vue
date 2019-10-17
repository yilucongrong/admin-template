// 暂时测试模板

<template>
    <div>
        <temp1 @changeSelect="changeSelect"
               v-if="showTemp[0]"></temp1>
        <temp2 @changeSelect="changeSelect"
               v-if="showTemp[1]"></temp2>
        <temp3 @changeSelect="changeSelect"
               v-if="showTemp[2]"></temp3>
        <temp4 @changeSelect="changeSelect"
               v-if="showTemp[3]"></temp4>
        <temp5 @changeSelect="changeSelect"
               v-if="showTemp[4]"></temp5>
        <temp6 @changeSelect="changeSelect"
               v-if="showTemp[5]"></temp6>
        <temp7 @changeSelect="changeSelect"
               v-if="showTemp[6]"></temp7>
        <temp8 @changeSelect="changeSelect"
               v-if="showTemp[7]"></temp8>
    </div>
</template>
<script>
import temp1 from "@/components/template/template1"; // 模板1(查询+单表)
import temp2 from "@/components/template/template2"; // 模板2(左树+查+表)
import temp3 from "@/components/template/template3"; // 模板3(左右表)
import temp4 from "@/components/template/template4"; // 模板4(查+上下表)
import temp5 from "@/components/template/template5"; // 模板5(tab+查&表/左右表)
import temp6 from "@/components/template/template6"; // 模板6(折叠面板)
import temp7 from "@/components/template/template7"; // 模板7(table内折叠信息显示)
import temp8 from "@/components/template/template8"; // 模板8(弹框模板)
export default {
    name: 'templateAll',
    components: { temp1, temp2, temp3, temp4, temp5, temp6, temp7, temp8 },
    data () {
        return {
            showTemp: [1, 0, 0, 0, 0, 0, 0, 0]
        }
    },
    methods: {
        changeSelect (val) {
            for (let i = 0; i < this.showTemp.length; i++) {
                if (i == val) {
                    this.$set(this.showTemp, i, 1);
                } else {
                    this.$set(this.showTemp, i, 0);
                }
            }
        }
    }
}
</script>