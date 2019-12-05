//储位下拉组件
<template>
  <el-select size="small"
             clearable
             v-model="itemKey"
             @change="changeSelect"
             :disabled="disabled"
             :placeholder="placeholder">
    <el-option v-for="item in options"
               :key="item.locationCode"
               :label="item.locationName"
               :value="item.locationCode">
    </el-option>
  </el-select>
</template>
<script>
import request from '@/utils/request'
export default {
  name: 'warehouseCode',
  props: {
    warehouseCode: {//仓库
      type: String,
      default: ''
    },
    areaCode: {//区位
      type: String,
      default: ''
    },
    locationCode: {//储位
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
    prop: 'locationCode',
    event: 'change'
  },
  data () {
    return {
      options: [],
      itemKey: this.locationCode
    }
  },
  watch: {
    locationCode: {
      handler: function () {
        this.itemKey = this.areaCode
      },
      immediate: true
    },
    areaCode: {
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
        areaCode: this.areaCode,
      }
      return request({
        url: `/warehouses/${listQuery.warehouseCode}/areas/${listQuery.areaCode}/locations`,//查询仓库库位列表
        method: 'get',
      }).then(res => {
        this.options = res
      })
    },
    changeSelect (val) {
      this.$emit('change', val)
      let name = ''
      let org = this.options.filter(v => v.locationCode == val)
        .find((value) => value)
      if (org) {
        name = org.locationName
      }

      this.$emit('selectName', name)
    }
  }
}
</script>
