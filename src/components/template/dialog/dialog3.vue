//嵌套 dialog
<template>
    <div>
        <el-dialog :title="'外层 Dialog'"
                   :visible.sync="dialogVisible">
            <el-button type="primary"
                       @click="innerVisible = true">打开内层 Dialog</el-button>
            <el-input v-model="list.outerValue"
                      placeholder=""></el-input>
            <el-input v-model="list.testValue"
                      placeholder=""></el-input>
            <el-dialog width="30%"
                       title="内层 Dialog"
                       :visible.sync="innerVisible"
                       append-to-body>
                <el-input v-model="listInner.innerValue"
                          placeholder=""></el-input>
                <div slot="footer"
                     class="dialog-footer">
                    <el-button @click="innerVisible = false">取 消</el-button>
                    <el-button type="primary"
                               size="small"
                               @click="innerConfirm">{{$t('table.confirm')}}</el-button>
                </div>

            </el-dialog>
            <div slot="footer"
                 class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary"
                           size="small"
                           @click="dialogConfirm">{{$t('table.confirm')}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: ['title'],
    data () {
        return {
            dialogVisible: false,
            innerVisible: false,
            list: {
                outerValue: null,
                testValue: null
            },
            listInner: {
                innerValue: null
            }

        };
    },
    methods: {
        initSelect () { },
        //弹框点击确定
        dialogConfirm () {
            this.$emit('handleDialogClick', this.listSelected, 1);
            this.dialogVisible = false;
        },
        innerConfirm () {
            this.list.testValue = this.listInner.innerValue
            this.innerVisible = false;
        }
    }
}
</script>

<style>
</style>