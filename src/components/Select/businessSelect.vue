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
            filterKey: {//过滤条件字段'businessFunction',
                type: String,
                default: ''
            },
            filterValue: {//过滤条件值"dt_org_function_rd",
                type: String,
                default: ''
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
            },
            // dictItemKey:{
            //     type: String,
            //     default: ''
            // }
        },
        computed: {
            options(){
                if(this.$store.state.businessComponent[this.selectType]){
                    return this.$store.state.businessComponent[this.selectType].options.filter(v => {
                        if(this.filterKey){
                            return v[this.filterKey] == this.filterValue
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
        model: {
            prop: 'dictItemKey',
            event: 'change'
        },
        data() {
            return {
                itemKey: this.dictItemKey
            }
        },
        watch: {
            options(newValue, oldValue) {
                this.itemKey=undefined
            }
        },
        methods: {
            changeSelect(val) {
                this.$emit('change', val)
                let selectRow = this.options.filter(v => v[this.showField[0]] == val)
                .find((value, index, arr) => value)
                this.$emit('getSelectRow', selectRow)
                this.$emit('getSelectName', selectRow[this.showField[1]])
            }
        }
    }
</script>
