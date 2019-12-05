//区位下拉组件
<template>
  <el-select size="small"
             clearable
             v-model="itemKey"
             @change="changeSelect"
             :disabled="disabled"
             :warehouseCode="warehouseCode"
             :placeholder="placeholder">
    <el-option v-for="item in options"
               :key="item.areaCode"
               :label="item.areaName"
               :value="item.areaCode">
    </el-option>
  </el-select>
</template>
<script>
import request from '@/utils/request'
export default {
  name: 'wareAreaCode',
  props: {
    warehouseCode: {//到货仓库：
      required: true,
      type: String,
      default: ''
    },
    areaCode: {
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
  },
  model: {
    prop: 'areaCode',
    event: 'change'
  },
  data () {
    return {
      options: [],
      itemKey: this.areaCode
    }
  },
  watch: {
    areaCode: {
      handler: function () {
        this.itemKey = this.areaCode
      },
      immediate: true
    },
    warehouseCode: {
      handler: function (val, oldVal) {
        if (val) {
          this.getOptions()
        } else {
          this.options = []
        }
        if (oldVal) {
          this.itemKey = undefined;
          this.$emit('change', undefined)
        }
      },
      immediate: true
    }
  },
  methods: {
    getOptions () {
      const listQuery = {
        warehouseCode: this.warehouseCode,
      }
      return request({
        url: `/warehouses/${listQuery.warehouseCode}/areas`,//查询仓库库区列表
        method: 'get',
      }).then(res => {
        this.options = res
      })
    },
    changeSelect (val) {
      this.$emit('change', val)
      let name = ''
      let org = this.options.filter(v => v.areaCode == val)
        .find((value) => value)
      if (org) {
        name = org.areaName
      }

      this.$emit('selectName', name)
    }
  }
}
</script>
