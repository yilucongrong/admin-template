<template>
  <!-- 基于权限，仓库，工厂，业务类型下拉框 -->
  <el-select size="small"
             clearable
             v-model="itemKey"
             @change="changeSelect"
             :disabled="disabled"
             :placeholder="placeholder">
    <el-option v-for="item in options"
               :key="item.objectCode"
               :label="item.objectName"
               :value="item.objectCode">
    </el-option>
  </el-select>
</template>
<script>
import { AUTHO_SELECT_LIST, DT_ORG_TYPE } from '@/utils/constant'
import { selectlists as listOrg } from '@/api/system/organization'
import { getName } from '@/utils/auth'
import request from '@/utils/request'

export default {
  name: 'AuthoType',
  props: {
    //下拉框类型
    selectType: {
      type: Number,
      required: true
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    objectCode: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    cascading: {
      type: String,
      default: ''
    },
    isDefault: {
      type: Boolean,
      default: false
    }
  },
  model: {
    prop: 'objectCode',
    event: 'change'
  },
  data () {
    return {
      options: [],
      AUTHO_SELECT_LIST: AUTHO_SELECT_LIST,
      DT_ORG_TYPE: DT_ORG_TYPE,
      itemKey: this.objectCode
    }
  },
  created () {
    this.getOptions()
  },
  watch: {
    objectCode () {
      this.itemKey = this.objectCode;
    },
    cascading () {
      this.itemKey = ''
      this.getOptions();
    }
  },
  methods: {
    getOptions () {
      if (this.selectType === 3 && this.cascading == '') {
        this.options = [];
      } else {
        const listQuery = {
          userName: getName(),
          accessTypeCode: this.AUTHO_SELECT_LIST[this.selectType].accessTypeCode,
          metaDataType: this.AUTHO_SELECT_LIST[this.selectType].metaDataCode,
          currentPage: 1,
          pageSize: 10,
          page: 1,
        }
        request({
          url: `/keyguard/users/${listQuery.userName}/datas/accessTypeCode=${listQuery.accessTypeCode}&metaDataType=${listQuery.metaDataType}`,//数据权限元数据列表查询
          method: 'get'
        }).then(res => {
          this.getAllList(res.data);
          this.options = res.data;
        })
      }
    },
    changeSelect (val) {
      this.$emit('change', val)
      let name = ''
      let org = this.options.filter(v => v.objectCode == val)
        .find((value) => value)
      if (org) {
        name = org.objectName
      }

      this.$emit('selectName', name)
    },
    //默认选中
    setDefaultVal (i) {
      if (this.options.length > 0) {
        if (this.isDefault) {
          this.itemKey = this.options[0].objectCode;
          this.$emit('setdefault', this.itemKey, i);
        }
      }
    },
    getAllList (data) {
      switch (this.selectType) {
        //公司权限
        case 0: {
          break;
        }
        //工厂权限
        case 1: {
          let listQuery = {
            type: this.DT_ORG_TYPE.factory,
            state: 1
          }
          listOrg(listQuery).then(res => {
            this.options = data.filter(item => {
              let isF = false;
              res.data.forEach(itemr => {
                if (itemr.organizationCode === item.objectCode) {
                  isF = true;
                }
              });
              return isF;
            });
            this.setDefaultVal(1);
          });
          break;
        }
        //采购组织权限
        case 2: {
          let listQuery = {
            businessFunction: this.businessFunction,
            state: 1
          }
          listOrg(listQuery).then(res => {
            this.options = data.filter(item => {
              let isF = false;
              res.data.forEach(itemr => {
                if (itemr.organizationCode === item.objectCode) {
                  isF = true;
                }
              });
              return isF;
            });
            this.setDefaultVal(2);
          });
          break;
        }
        //仓库权限
        case 3: {
          if (this.cascading) {
            request({
              url: '/iwms/warehouses',
              method: 'get',
              params: {
                orgCode: this.cascading
              }
            }).then(res => {
              res = res.data;
              this.options = data.filter(item => {
                let isF = false;
                res.forEach(itemr => {
                  if (itemr.warehouseCode === item.objectCode) {
                    isF = true;
                  }
                });
                return isF;
              });
              this.setDefaultVal(3);
            });
          }
          break;
        }
        //往来仓库权限
        case 4: {
          if (this.cascading) {
            request({
              url: '/iwms/warehouses',
              method: 'get',
              params: {
                orgCode: this.cascading
              }
            }).then(res => {
              res = res.data;
              this.options = data.filter(item => {
                let isF = false;
                res.forEach(itemr => {
                  if (itemr.warehouseCode === item.objectCode) {
                    isF = true;
                  }
                });
                return isF;
              });
              this.setDefaultVal(4);
            });
          }
          break;
        }
        //车间
        case 5: {
          break;
        }
        //生产线 工作中心
        case 6: {
          break;
        }
        //工位
        case 7: {
          break;
        }
        //仓储业务 业务类型
        case 8: {
          break;
        }
      }


    }
  }
}
</script>
