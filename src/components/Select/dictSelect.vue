<template>
    <!-- 通用字典下拉框，适合所有字典下拉框-->
    <el-select size="small"
               clearable
               v-model="itemKey"
               @change="changeSelect"
               :disabled="disabled"
               :placeholder="placeholder">
        <el-option v-for="item in options"
                   :key="item.dictItemKey"
                   :label="item.dictItemValue"
                   :value="item.dictItemKey"></el-option>
    </el-select>
</template>
<script>
export default {
    name: "dictSelect",
    props: {
        selectType: {
            //查询业务，对应store/modules/dict.js 业务类型名称
            type: String
        },
        disabled: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: "请选择",
        },
        dictItemKey: {
            type: String,
            default: "",
        }
    },
    computed: {
        options () {
            this.itemKey = null; //每次变化，先清空文本框数据
            return this.$store.state.dict[this.selectType]
        }
    },
    model: {
        prop: "dictItemKey",
        event: "change",
    },
    watch: {
        dictItemKey () {
            this.itemKey = this.dictItemKey;

        }
    },
    mounted () {
        this.$store.dispatch("dict/getDicData", [this.selectType])
    },
    data () {
        return {
            itemKey: this.dictItemKey
        };

    },
    methods: {
        changeSelect (val) {
            this.$emit("change", val)


            let selectRow = this.options
                .filter(v => v.dictItemKey == val)
                .find((value) => value)
            this.$emit("getSelectRow", selectRow);
            this.$emit("getSelectName", selectRow.dictItemValue)
        }
    }
};
</script>
