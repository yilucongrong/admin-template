<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <div class="filter-items">
      <div class="select-element">
        <el-input size="small" :placeholder="$t('supplier.supplierCode')" v-model="listQuery.supplierCode" class="filter-item" @keyup.enter.native="handleQuery"/>
        <el-input size="small" :placeholder="$t('supplier.supplierName')" v-model="listQuery.supplierName" class="filter-item" @keyup.enter.native="handleQuery"/>
        <el-select size="small" v-model="listQuery.supplierType" :placeholder="$t('supplier.supplierType')"  clearable @keyup.enter.native="handleQuery">
          <el-option v-for="item in dt_supplier_type" :key="item.dictItemKey" :label="item.dictItemValue" :value="item.dictItemKey"></el-option>
        </el-select>
        
        <el-button class="filter-item" type="primary" size="small" icon="el-icon-search" @click="handleQuery">{{ $t('table.search') }}</el-button>
      </div>
      </div>
    </div>
    <div class="table-container">
      <div class="table-items">
          <el-button size="small" class="filter-item" type="primary" icon="el-icon-plus" @click="handleCreate">{{ $t('table.add') }}</el-button>
          <el-button size="small" class="filter-item" type="primary" icon="el-icon-edit" @click="handleUpdate">{{ $t('table.edit') }}</el-button>
          <el-button size="small" class="filter-item" type="primary" icon="el-icon-delete" @click="handleDelete">{{ $t('table.delete') }}</el-button>
      </div>
     <el-table
              :key="tableKey"
              :data="list"
              border
              fit
              height="315"
              highlight-current-row
              style="width: 100%;" cell-class-name="table-cell" header-cell-class-name="header-cell"
              @selection-change='selectRow'  @row-click="rowClick"  ref="tb_a">
        <el-table-column type="selection" fixed width="30" align="center">
        </el-table-column>
        <el-table-column show-overflow-tooltip width="120" align="left" :label="$t('supplier.supplierCode')" prop="supplierCode"></el-table-column>
        <el-table-column show-overflow-tooltip width="120" align="left" :label="$t('supplier.supplierName')" prop="supplierName"></el-table-column>
        <el-table-column show-overflow-tooltip width="120" align="left" :label="$t('supplier.supplierTypeName')" prop="supplierTypeName"></el-table-column>
        <el-table-column show-overflow-tooltip width="120" align="left" :label="$t('supplier.supplyClassifyName')" prop="supplyClassifyName"></el-table-column>
        <el-table-column show-overflow-tooltip width="120" align="left" :label="$t('supplier.supplierGradeName')" prop="supplierGradeName"></el-table-column>
        <el-table-column show-overflow-tooltip width="100" align="left" :label="$t('supplier.contact')" prop="contact"></el-table-column>
        <el-table-column show-overflow-tooltip width="100" align="left" :label="$t('supplier.contactNumber')" prop="contactNumber"></el-table-column>
        <el-table-column show-overflow-tooltip width="160" align="left" :label="$t('supplier.email')" prop="email"></el-table-column>
        <el-table-column show-overflow-tooltip width="260" align="left" :label="$t('supplier.address')" prop="address"></el-table-column>
        <el-table-column show-overflow-tooltip min-width="480" align="left" :label="$t('supplier.remark')" prop="remark"></el-table-column>
      </el-table>

      <pagination :total="total" :page.sync="listQuery.currentPage"
                  :limit.sync="listQuery.pageSize" @pagination="getList" />
    </div>

    <el-dialog custom-class="dialog-custom" :close-on-click-modal="false" :close-on-press-escape="false"  :title="dialogStatus=='create'?$t('table.add'):$t('table.edit')" :visible.sync="dialogFormVisible" @close="handleClose" v-dialogDrag>
      <el-form class="small-space" :model="temp" :rules="rules" ref="temp" label-position="left" label-width="100px"
               :inline="true"
               style='max-width: 600px; '>
        <el-form-item :label="$t('supplier.supplierCode')" prop="supplierCode">
          <el-input v-model="temp.supplierCode" :disabled="dialogStatus!='create'"></el-input>
        </el-form-item>
        <el-form-item :label="$t('supplier.supplierName')" prop="supplierName">
          <el-input v-model="temp.supplierName"></el-input>
        </el-form-item>
        <el-form-item :label="$t('supplier.supplierType')">
          <el-select size="small" v-model="temp.supplierType" :placeholder="$t('supplier.supplierType')">
            <el-option v-for="item in dt_supplier_type" :key="item.dictItemKey" :label="item.dictItemValue" :value="item.dictItemKey"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('supplier.supplyClassifyName')">
          <el-select size="small" v-model="temp.supplyClassify" :placeholder="$t('table.select')">
            <el-option v-for="item in dt_materiel_classify" :key="item.dictItemKey" :label="item.dictItemValue" :value="item.dictItemKey"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('supplier.supplierGradeName')">
          <el-select size="small" v-model="temp.supplierGrade" :placeholder="$t('table.select')">
            <el-option v-for="item in dt_supplier_level" :key="item.dictItemKey" :label="item.dictItemValue" :value="item.dictItemKey"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('supplier.contact')" prop="contact">
          <el-input v-model="temp.contact"></el-input>
        </el-form-item>
        <el-form-item :label="$t('supplier.contactNumber')" prop="contactNumber">
          <el-input v-model="temp.contactNumber"></el-input>
        </el-form-item>
        <el-form-item :label="$t('supplier.email')" prop="email">
          <el-input v-model="temp.email"></el-input>
        </el-form-item>
        <el-form-item :label="$t('supplier.address')" prop="address">
          <el-input v-model="temp.address"></el-input>
        </el-form-item>
        <el-form-item :label="$t('supplier.remark')" prop="remark">
          <el-input v-model="temp.remark"></el-input>
        </el-form-item>
        <el-form-item label="通讯地址" prop="address" >
          <el-input class="big-label" type="textarea" :rows="2" v-model="temp.address"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="remark">
          <el-input class="big-label" type="textarea" :rows="2" v-model="temp.remark"></el-input>

        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create">{{ $t('table.confirm') }}</el-button>
        <el-button v-else type="primary" @click="update">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '@/api/data-base/supplier'
import Pagination from '@/components/Pagination'
import { validatorContactNumber,validatorEmail } from '@/utils/validate'
import {mapState} from 'vuex';

export default {
  name: 'Supplier',
  components: { Pagination},
  data() {
    return {
      list: null,
      total: 0,
      listQuery: {
        page: true,
        currentPage: 1,
        pageSize: 10,
        supplierCode: undefined,
        supplierName: undefined,
        supplierType: undefined
      },
      temp: {
        supplierCode: undefined,
        supplierName: undefined,
        supplierType: undefined,
        supplyClassify: undefined,
        supplierGrade: undefined,
        address: undefined,
        contact: undefined,
        contactNumber: undefined,
        email: undefined,
        remark: undefined
      },
      supplierCode: undefined,
      selectCode: [],
      dialogFormVisible: false,
      dialogStatus: '',
      tableKey: 0,
      rules: {
        supplierCode: [
          { required: true, message: '供应商编码不能为空', trigger: 'blur' },
          { pattern: /^[A-Z-_0-9]{1,50}$/, message: '由大写字母，数字，—和_组成，长度不能超过50', trigger: 'blur' }
        ],
        supplierName: [
          { required: true, message: '供应商名称不能为空', trigger: 'blur' },
          { max: 100, message: this.$t('validate.max32'), trigger: 'blur' }
        ],
        contact: [
          { max: 50, message: '长度不能超过50', trigger: 'blur' }
        ],
        contactNumber: [
          { validator: validatorContactNumber, trigger: 'blur' }
        ],
        email: [
          { validator: validatorEmail, trigger: 'blur' }
        ],
        address: [
          { max: 512, message: '长度不能超过512', trigger: 'blur' }
        ],
        remark: [
          { max: 512, message: '描述长度为512内', trigger: 'blur' }
        ]
      }
    }
  },
  computed:{
      ...mapState({
          dt_supplier_type:state=>state.dict.dt_supplier_type,
          dt_supplier_level:state=>state.dict.dt_supplier_level,
          dt_materiel_classify:state=>state.dict.dt_materiel_classify
      })
  },
  mounted(){
      this.$store.dispatch('dict/getDicData',['dt_supplier_type','dt_supplier_level','dt_materiel_classify']);
      this.getList();
  },
  methods: {
    getList() {
      api.queryRecords(this.listQuery).then(res => {
        this.list = res.data.list
        this.total = res.data.pages.count
      })
    },
    handleQuery() {
      this.listQuery.currentPage = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.currentPage = val
      this.getList()
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    selectRow (val) {
        if (val.length > 1) {
            this.$refs.tb_a.clearSelection()//清除其他行的选中
            this.$refs.tb_a.toggleRowSelection(val[val.length-1],'selected')//单击行绑定点击事件
        }else if(val.length===1){
            this.selectlistRow =val
        }
    },
    rowClick(val){
        this.$refs.tb_a.clearSelection()//清除其他行的选中
        this.$refs.tb_a.toggleRowSelection(val)//单击行绑定点击事件
    },
    handleUpdate() {
        if(this.selectlistRow && this.selectlistRow.length==1){
          this.readonly=true//组织编码不可以编写
          this.temp = this.selectlistRow[0] // copy obj
          console.log(this.temp)
          api.getRecord(this.temp.supplierCode).then(res => {
          this.temp=res.data
          this.dialogStatus = 'update'
          this.dialogFormVisible = true
          this.$nextTick(() => {
            this.$refs['temp'].clearValidate()
          })
          })
        }else{
          this.$message({
                  title: '警告',
                  message: '请选择一条信息',
                  type: 'warning'
                })
        }
      },
    update() {
        this.$refs['temp'].validate((valid) => {
          if (valid) {
          api.updateRecord(this.temp.supplierCode,this.temp).then(() => {
              this.getList();
              this.dialogFormVisible = false
              this.$message({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
            })
          }
        })
      },
    handleDelete() {//删除列表
          if(this.selectlistRow && this.selectlistRow.length==1){
            this.$confirm('此操作将删除所选中数据, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning',
                  
                }).then(() => {
                    let ids=[]
                    this.selectlistRow.forEach((val,index) => {
                      ids[index]=val.supplierCode
                    })
                   api.deleteRecord(ids).then(response => {
                      this.getList(),
                      this.$message({
                              title: '成功',
                              message: '删除成功',
                              type: 'success',
                              duration: 2000
                            })
                    })
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消删除'
                  });
                });
           
          }else{
            this.$message({
                    title: '警告',
                    message: '请选择一条信息',
                    type: 'warning'
                  })
          }
      },
    create() {
      this.$refs.temp.validate((valid) => {
        if (valid) {
          api.addRecord(this.temp).then(res => {
            this.getList()
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '新增成功',
              type: 'success',
              duration: 2000
            })
          })
        } else {
          return false
        }
      })
    },
    resetTemp() {
      this.temp = {
        supplierCode: undefined,
        supplierName: undefined,
        supplierType: undefined,
        supplyClassify: undefined,
        supplierGrade: undefined,
        address: undefined,
        contact: undefined,
        contactNumber: undefined,
        email: undefined,
        remark: undefined
      }
    },
    handleClose() {
      this.resetTemp()
      this.$refs.temp.resetFields()
    }
  }
}
</script>
