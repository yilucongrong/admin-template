<template>
    <!-- 通用业务下拉框，适合所有业务下拉框-->
    <el-select size="small" clearable v-model="itemKey" @change="changeSelect" :disabled="disabled"
                :placeholder="placeholder">
        <el-option v-for="item in options" :key="item[showField[0]]" :label="item[showField[1]]"
                :value="item[showField[0]]">
        </el-option>
    </el-select>
</template>
<script>
    import { mapState } from 'vuex'
    export default {
        name: 'businessSelect',
        props: {
            filterData: {//过滤条件{key:'businessFunction',value:'"dt_org_function_rd"'},
                type: Object,
                default: {}
            },
            selectType: {//查询业务，对应store/modules/businessComponent.js 业务类型名称
                type: String
            },
            showField:{//显示的字段['organizationCode','organizationName']
                type: Array
            },
            disabled: {
                type: Boolean,
                default: false
            },
            placeholder: {
                type: String,
                default: '请选择'
            }
        },
        computed: {
            options(){
                this.itemKey=undefined//每次变化，先清空文本框数据
                if(this.$store.state.businessComponent[this.selectType]){
                    return this.$store.state.businessComponent[this.selectType].options.filter(v => {
                        if(this.filterData.key){
                            return v[this.filterData.key] == this.filterData.value
                        }else{
                            return v
                        }
                    }) 
                }
            }
        },
        mounted () {
            this.$store.dispatch('businessComponent/getBusinessComponentData',[this.selectType]);
        },
        data() {
            return {
                itemKey: this.showField[0]//[0]显示code,[1]显示name
            }
        },
        methods: {
            changeSelect(val) {
                let selectRow = this.options.filter(v => v[this.showField[0]] == val)
                .find((value, index, arr) => value)
                this.$emit('getSelectRow', selectRow)
                this.$emit('getSelectName', selectRow[this.showField[1]])
            }
        }
    }
</script>
