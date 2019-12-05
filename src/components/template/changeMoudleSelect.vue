//模板变化选择组件(模板注意项:表格高度按十几页面布局来，布局尽量减少边线个数，留给表格足够的显示区域，尽量不要出现滚动条)

<template>
    <el-select v-model="modalnum"
               class="filter-item"
               @change="changeMoudle"
               size="small"
               placeholder="选择模板">
        <el-option key=0
                   label="模板1(查+表)"
                   value=0></el-option>
        <el-option key=1
                   label="模板2(左树+查+表)"
                   value=1></el-option>
        <el-option key=2
                   label="模板3(左右表)"
                   value=2></el-option>
        <el-option key=3
                   label="模板4(查+上下表)"
                   value=3></el-option>
        <el-option key=4
                   label="模板5(tab+查&表/左右表)"
                   value=4></el-option>
        <el-option key=5
                   label="模板6(折叠面板)"
                   value=5></el-option>
        <el-option key=6
                   label="模板7(table内折叠信息显示)"
                   value=6></el-option>
        <el-option key=7
                   label="模板8(dialog)"
                   value=7></el-option>
    </el-select>
</template>
<script>

export default {
    name: "changeMoudleSelect",

    data () {
        return {
            modalnum: null
        };
    },
    methods: {
        changeMoudle (val) {
            this.$emit('changeMoudle', val)
        }
    }
};
</script>