<template>
    <el-select :placeholder="placeholder"
               size="small"
               clearable
               v-model="selectValue"
               @change="changeSelect"
               :disabled="disabled">
        <el-option v-for="item in options"
                   :key="item.workCenterCode"
                   :label="item.workCenterName"
                   :value="item.workCenterCode">
        </el-option>
    </el-select>
</template>
<script>
// import fetch from '@/utils/fetch'
import request from '@/utils/request'
export default {
    name: 'work-center-select',
    props: {
        orgCode: {
            required: true,
            type: String,
            default: ''
        },
        workCenterType: {
            required: true,
            type: String,
            default: ''
        },
        workCenterClass: {
            required: true,
            type: String,
            default: ''
        },
        workCenterCode: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: '请选择'
        },
        disabled: {
            type: Boolean,
            default: false
        },
    },
    model: {
        prop: 'workCenterCode',
        event: 'change'
    },
    data () {
        return {
            options: [],
            selectValue: this.workCenterCode
        }
    },
    watch: {
        workCenterCode: {
            handler: function () {
                this.selectValue = this.workCenterCode
            },
            immediate: true
        },
        orgCode: {
            handler: function (val, oldVal) {

                if (val) {
                    this.getOptions()
                } else {
                    this.options = []
                }
                if (oldVal) {
                    this.selectValue = undefined;
                    this.$emit('change', undefined)
                }
            },
            immediate: true
        }
    },
    methods: {
        getOptions () {

            return request({
                url: '/iwms/work-centers',
                method: 'get',
                params: {
                    orgCode: this.orgCode,
                    workCenterType: this.workCenterType,
                    workCenterClass: this.workCenterClass
                }
            }).then(res => {
                this.options = res.data
                this.$emit('linecode', this.options)
            })
        },
        changeSelect (val) {
            let name = ''
            let dd = this.options.filter(v => {
                if (v.workCenterCode == val) {
                    return v
                }
            })
            let org = this.options.filter(v => v.workCenterCode == val)
                .find((value) => value)
            if (org) {
                name = org.workCenterName
            }
            this.$emit('selectName1', name)
            this.$emit('change', val)
            this.$emit('change1', dd)
        }
    }
}
</script>
