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
    </div>
</template>
<script>
import temp1 from "@/components/template/template1"; // 查询+单表
import temp2 from "@/components/template/template2"; // 查询+单表
import temp3 from "@/components/template/template3"; // 查询+单表
import temp4 from "@/components/template/template4"; // 查询+单表


export default {
    name: 'template1',
    components: { temp1, temp2, temp3, temp4 },
    data () {
        return {
            showTemp: [1, 0, 0, 0, 0]
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