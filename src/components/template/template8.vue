
//dialog模板
<template>
    <div>
        <div class="app-container">
            <div class="filter-container">
                <div class="filter-items">
                    <el-button class="filter-item-btn"
                               type="primary"
                               @click="handleClick(item.id)"
                               size="small"
                               v-for="item in buttonsInfo"
                               :key="item.id">{{ item.des }}</el-button>
                    <changeModuleSelect @changeMoudle="changeMoudle"></changeModuleSelect>

                </div>
            </div>
            <div class="dialog_content">
                <span>用于展示信息</span><br>
                <span>{{selectedInfos}}</span>
            </div>
        </div>

        <!--弹框-->
        <!-- table多选 -->
        <dialog1 @handleDialogClick="handleDialogClick"
                 :title="'dialog1多选'"
                 ref="dialogRef1"
                 :unMutiple="unMutiple[0]"></dialog1>

        <!-- table单选 -->
        <dialog1 @handleDialogClick="handleDialogClick"
                 :title="'dialog1单选'"
                 ref="dialogRef2"
                 :unMutiple="unMutiple[1]"></dialog1>

        <!-- tableform -->
        <dialog2 @handleDialogClick="handleDialogClick"
                 :title="'dialog2form+表单'"
                 :curdialogStatus="curdialogStatus"
                 ref="dialogRef3"
                 :unMutiple="unMutiple[2]"></dialog2>

        <!-- 嵌套dialog -->
        <dialog3 @handleDialogClick="handleDialogClick"
                 :title="'嵌套dialog'"
                 ref="dialogRef4"
                 :unMutiple="unMutiple[2]"></dialog3>

    </div>
</template>
<script>
import changeModuleSelect from '@/components/template/changeMoudleSelect'
import dialog1 from './dialog/dialog1.vue'
import dialog2 from './dialog/dialog2.vue'
import dialog3 from './dialog/dialog3.vue'

export default {
    name: "zdmb",
    components: { changeModuleSelect, dialog1, dialog2, dialog3 },
    data () {
        return {
            buttonsInfo: [{ id: 1, catelog: 'dialog', value: 'dialog1', des: 'table多选' },
            { id: 2, catelog: 'dialog', value: 'dialog2', des: 'table单选' },
            { id: 3, catelog: 'dialog', value: 'dialog3', des: 'form' },
            { id: 4, catelog: 'dialog', value: 'dialog4', des: '嵌套' },
                // { id: 5, catelog: 'dialog', value: 'dialog5', des: 'formTable' }
            ],
            selectedInfos: null,//选中的弹框内容
            dialogVisible: {
                dialogVisible1: false,
                dialogVisible2: false,
                dialogVisible3: false,
                dialogVisible4: false,
                dialogVisible5: false
            },
            curdialogStatus: 0,
            unMutiple: [false, true, true],

        }
    },
    methods: {
        //模板切换事件，非模板页面可删
        changeMoudle (val) {
            this.$emit('changeSelect', val)
        },
        handleClick (val) {
            console.log(this.$refs, 'dialogRef' + val, this.selectedInfos);
            this.$refs['dialogRef' + val].dialogVisible = true;
            this.$nextTick(() => {
                this.$refs['dialogRef' + val].initSelect(this.selectedInfos);
            })
        },
        //弹框1 emit调用
        handleDialogClick (val, index) {
            console.log(val, index);
            this.selectedInfos = val;
            //需使用数据在此处遍历selectedInfos赋值
        },

    }
}
</script>
<style scoped>
.dialog_content {
    margin-top: 10px;
}
</style>