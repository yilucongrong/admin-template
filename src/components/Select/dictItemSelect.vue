<!--
<template>
  <dictItemSelect class="filter-item" style="width: 200px;"
    :dictCode="'dt_supplier_type'" v-model="listQuery.supplierType"></dictItemSelect>
<template>

用法：提供v-model 双向绑定 change 选中值发生变化时触发, 目前的选中值

<script>
    import dictItemSelect from '@/components/select/dictItemSelect.vue'
<script>
-->

<template>
    <div>
        <div v-if="isMutiple">
            <el-select size="small"
                       multiple
                       clearable
                       v-model="itemKey"
                       @change="changeSelect"
                       :disabled="disabled"
                       :placeholder="placeholder">
                <el-option v-for="item in options"
                           :key="item.dictItemKey"
                           :label="item.dictItemValue"
                           :value="item.dictItemKey">
                </el-option>
            </el-select>
        </div>
        <div v-else>
            <el-select size="small"
                       clearable
                       v-model="itemKey"
                       @change="changeSelect"
                       :disabled="disabled"
                       :placeholder="placeholder">
                <el-option v-for="item in options"
                           :key="item.dictItemKey"
                           :label="item.dictItemValue"
                           :value="item.dictItemKey">
                </el-option>
            </el-select>
        </div>
    </div>
</template>
<script>
import { getRecord } from "@/api/data-base/dict";

export default {
    name: "DictItemSelect",
    props: {
        dictCode: {
            required: true,
            type: String
        },
        dictItemKey: "",
        placeholder: {
            type: String,
            default: ""
        },
        disabled: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: "请选择"
        },
        isMutiple: {
            type: Boolean,
            default: false
        }
    },
    model: {
        prop: "dictItemKey",
        event: "change"
    },
    data() {
        return {
            options: [],
            // placeholder: this.placeholder,
            itemKey: this.dictItemKey
        };
    },
    watch: {
        dictItemKey() {
            this.itemKey = this.dictItemKey;
        }
    },
    created() {
        this.getOptions();
    },
    methods: {
        getOptions() {
            getRecord(this.dictCode).then(res => {
                this.options = res.data.dictItemDTOs;
            });
        },
        changeSelect(val) {
            this.$emit("change", val);
        }
    }
};
</script>
