<template>
  <el-select size="small" clearable v-model="selectValue" @change="changeSelect" :orgCode="orgCode" :placeholder="placeholder" :disabled="disabled">
    <el-option v-for="item in options" :key="item.warehouseCode" :label="item.warehouseName" :value="item.warehouseCode">
    </el-option>
  </el-select>
</template>
<script>
  import request from '@/utils/request'

  export default {
    name: 'warehouse-select',
    props: {
      orgCode: {
        required: true,
        type: String,
        default: ''
      },
      warehouseCode: {
        type: String,
        default: ''
      },
      placeholder:{
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
    },
    model: {
      prop: 'warehouseCode',
      event: 'change'
    },
    data() {
      return {
        options: [],
        selectValue: this.warehouseCode
      }
    },
    watch: {
      warehouseCode: {
        handler: function (val, oldVal) {
          this.selectValue = this.warehouseCode
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
      getOptions() {
        return request({
          url: '/warehouses',
          method: 'get',
          params: {
            orgCode: this.orgCode
          }
        }, ).then(res => {
          this.options = res
        })
      },
      changeSelect(val) {
        this.$emit('change', val)
        let name = ''
        let org = this.options.filter(v => v.warehouseCode == val)
          .find((value, index, arr) => value)
        if (org) {
          name = org.warehouseName
        }

        this.$emit('selectName', name)
      }
    }
  }
</script>
