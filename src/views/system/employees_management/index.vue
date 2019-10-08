// 暂时测试模板

<template>
    <div>
        <temp1 v-if="showTemp[0]"></temp1>
        <temp2 v-if="showTemp[1]"></temp2>
    </div>
</template>
<script>
import temp1 from "@/components/template/template1"; // 查询+单表
import temp2 from "@/components/template/template2"; // 查询+单表

export default {
    name: 'template1',
    components: { temp1, temp2 },
    data () {
        return {
            showTemp: [0, 1, 0]
        }
    }
}
</script>