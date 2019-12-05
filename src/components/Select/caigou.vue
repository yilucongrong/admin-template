<template>
    <el-select size="small"
               clearable
               v-model="itemKey"
               @change="changeSelect"
               :disabled="disabled"
               :placeholder="placeholder">
        <el-option v-for="item in options"
                   :key="item.organizationCode"
                   :label="item.organizationName"
                   :value="item.organizationCode">
        </el-option>
    </el-select>
</template>
<script>
import { selectlists as listOrg } from '@/api/system/organization'
export default {
    name: 'caigou',
    props: {
        orgType: {//到货单位：从组织结构中查询组织类型为“工厂”的组织信息
            type: String,
            default: ''
        },
        organizationCode: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: '请选择'
        },
        businessFunction: {//采购组：从组织结构中查询业务职能为“采购组”的组织信息
            type: String,
            default: ''
        },
    },
    model: {
        prop: 'organizationCode',
        event: 'change'
    },
    data () {
        return {
            options: [],
            itemKey: this.organizationCode
        }
    },
    watch: {
        organizationCode () {
            this.itemKey = this.organizationCode;
        }
    },
    created () {
        this.getOptions()
    },
    methods: {
        getOptions () {
            const listQuery = {
                type: this.orgType,
                state: 1,
                businessFunction: this.businessFunction
            }
            listOrg(listQuery).then(res => {
                this.options = res.data
            })
        },
        changeSelect (val) {
            this.$emit('change', val)
            let name = ''
            let org = this.options.filter(v => v.organizationCode == val)
                .find((value) => value)
            if (org) {
                name = org.organizationName
            }

            this.$emit('selectName', name)
        }
    }
}
</script>
