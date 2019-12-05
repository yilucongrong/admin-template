<template>
    <div>
        <div class="app-container">
            <div class="filter-container">
                <div class="filter-items">
                    <AuthoType class="filter-item"  :selectType="1" :placeholder="$t('warehouse.orgCode')" v-model="listQuery.orgCode"
                        @keyup.enter.native="handleQuery"
                    ></AuthoType>
                    <AuthoType class="filter-item" :selectType="3" v-if="!listQuery.orgCode" :placeholder="$t('warehouse.warehouseCode')" v-model="listQuery.warehouseCode"
                        @keyup.enter.native="handleQuery"
                    ></AuthoType>
                    <AuthoType class="filter-item"  :selectType="3" v-else :cascading="listQuery.orgCode"
                        :placeholder="$t('warehouse.warehouseCode')"
                        v-model="listQuery.warehouseCode"
                        @keyup.enter.native="handleQuery"
                    ></AuthoType>
                    <el-select class="filter-item" size="small" v-model="listQuery.warehouseClass" :placeholder="$t('warehouse.warehouseClass')">
                        <el-option v-for="item in dt_warehouse_class" :key="item.dictItemKey" :label="item.dictItemValue" :value="item.dictItemKey"></el-option>
                    </el-select>
                    
                    <el-input size="small" :placeholder="$t('warehouse.warehouseCode')" v-model="listQuery.warehouseCode"  class="filter-item" @keyup.enter.native="handleQuery"/>
                    <el-input size="small" :placeholder="$t('warehouse.warehouseName')" v-model="listQuery.warehouseName"  class="filter-item" @keyup.enter.native="handleQuery"/>
                    <el-button class="filter-item" size="small" type="primary" icon="el-icon-search" @click="handleQuery">
                    {{$t('table.search')}}
                    </el-button>
                </div>
            </div>
            <div class="table-container">
                <div class="oprate_btn">
                     <el-button class="filter-item" size="small" type="primary" @click="handleCreate" icon="el-icon-plus">
                    {{$t('table.add')}}
                    </el-button>
                    <el-button class="filter-item" size="small" type="primary" @click="handleUpdate" icon="el-icon-edit">
                    {{$t('table.edit')}}
                    </el-button>
                    <el-button class="filter-item" size="small" type="primary" @click="handleDelete" icon="el-icon-delete">
                    {{$t('table.delete')}}
                    </el-button>
                    <el-button size="small" class="filter-item" type="primary" icon="el-icon-upload2" @click="handleDownload">
                    {{ $t('table.export') }}
                    </el-button>
                </div>
                <el-table               
                :key="tableKey"
                :data="list"
                border
                fit
               :height="theight"
                highlight-current-row
                style="width: 100%;"
                @selection-change='selectRow' size="mini" cell-class-name="table-cell" header-cell-class-name="header-cell">
                <el-table-column type="selection" width="30">
                </el-table-column>
                <el-table-column show-overflow-tooltip width="120" align="left" :label="$t('warehouse.orgName')" prop="orgName"></el-table-column>
                <el-table-column show-overflow-tooltip width="120" align="left" :label="$t('warehouse.warehouseType')" prop="warehouseTypeName"></el-table-column>
                <el-table-column show-overflow-tooltip width="120" align="left" :label="$t('warehouse.warehouseCode')" prop="warehouseCode"></el-table-column>
                <el-table-column show-overflow-tooltip width="120" align="left" :label="$t('warehouse.warehouseName')" prop="warehouseName"></el-table-column>
                <el-table-column show-overflow-tooltip width="120" align="left" :label="$t('warehouse.warehouseClass')" prop="warehouseClassName"></el-table-column>
                <el-table-column show-overflow-tooltip width="120" align="left" :label="$t('warehouse.warehouseGroupName')" prop="warehouseGroupName"></el-table-column>
                <el-table-column show-overflow-tooltip width="120" align="left" :label="$t('warehouse.erpWarehouseCode')" prop="erpWarehouseCode"></el-table-column>
                <el-table-column show-overflow-tooltip width="120" align="left" :label="$t('warehouse.relation')" prop="relation"></el-table-column>
                <el-table-column show-overflow-tooltip width="120" align="left" :label="$t('warehouse.areaEnabled')">
                <template slot-scope="scope">
                    {{ [scope.row.areaEnabled, TWO_STATE_OPTIONS] | optionsFilter }}
                </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip width="120" align="left" :label="$t('warehouse.locationEnabled')">
                <template slot-scope="scope">
                    {{ [scope.row.locationEnabled, TWO_STATE_OPTIONS] | optionsFilter }}
                </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip width="120" align="left" :label="$t('warehouse.wmsEnabled')">
                <template slot-scope="scope">
                    {{ [scope.row.wmsEnabled, TWO_STATE_OPTIONS] | optionsFilter }}
                </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip width="120" align="left" :label="$t('warehouse.batchEnabled')" prop="batchEnabledName"></el-table-column>
                <el-table-column show-overflow-tooltip width="120" align="left" :label="$t('warehouse.wareLoctionMateriel')" prop="wareLoctionMateriel"></el-table-column>
                <el-table-column show-overflow-tooltip width="120" align="left" :label="$t('warehouse.minusEnabled')" prop="minusEnabledName"></el-table-column>
                <el-table-column show-overflow-tooltip width="120" align="left" :label="$t('warehouse.batchRuleDiff')" prop="batchRuleDiffName"></el-table-column>
                <el-table-column show-overflow-tooltip width="200" align="left" :label="$t('warehouse.warehouseAddr')" prop="warehouseAddr"></el-table-column>
                <el-table-column show-overflow-tooltip width="200" align="left" :label="$t('warehouse.remark')" prop="remark"></el-table-column>
                <el-table-column show-overflow-tooltip width="80" align="left" :label="$t('warehouse.creator')" prop="creator"></el-table-column>
                <el-table-column show-overflow-tooltip width="140" align="left" :label="$t('warehouse.createTime')" prop="createTime"></el-table-column>
                <el-table-column show-overflow-tooltip width="80" align="left" :label="$t('warehouse.updator')" prop="updator"></el-table-column>
                <el-table-column show-overflow-tooltip width="140" align="left" :label="$t('warehouse.updateTime')" prop="updateTime"></el-table-column>
            </el-table>

            <pagination :total="total" :page.sync="listQuery.currentPage"
                        :limit.sync="listQuery.pageSize" @pagination="getList" />
            </div>
            <el-dialog custom-class="dialog-custom" :close-on-click-modal="false" :close-on-press-escape="false"  :title="dialogStatus=='create'?$t('table.add'):$t('table.edit')" :visible.sync="dialogFormVisible" @close="handleClose">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClickTab">
                <el-tab-pane :label="$t('warehouse.basicInformation')" name="1">
                    <div class="tab-items">
                        <el-button size="mini" v-if="dialogStatus=='create'" type="primary" @click="create">{{ $t('table.confirm') }}</el-button>
                        <el-button size="mini" v-else type="primary" @click="update">{{ $t('table.confirm') }}</el-button>
                    </div>
                    <el-form class="mini-space" :model="temp" :inline="true" :rules="rules" ref="temp" label-width="120px"
                                size="mini">

                        <el-form-item :label="$t('warehouse.orgCode')" prop="orgCode">
                        <orgSelect class="filter-item" @selectName="selectName"
                                    :orgType="DT_ORG_TYPE.factory" v-model="temp.orgCode" :disabled="dialogStatus!='create'" >
                        </orgSelect>
                        </el-form-item>
                        <el-form-item :label="$t('warehouse.warehouseType')" prop="warehouseType">
                        <el-select size="small" v-model="temp.warehouseType" :placeholder="$t('table.select')">
                            <el-option v-for="item in dt_warehouse_type" :key="item.dictItemKey" :label="item.dictItemValue"
                                :value="item.dictItemKey">
                            </el-option>
                        </el-select>
                        </el-form-item>
                        <el-form-item :label="$t('warehouse.warehouseClass')" prop="warehouseClass">
                        <el-select size="small" v-model="temp.warehouseClass" :placeholder="$t('table.select')">
                            <el-option v-for="item in dt_warehouse_class" :key="item.dictItemKey" :label="item.dictItemValue"
                                :value="item.dictItemKey">
                            </el-option>
                        </el-select>
                        </el-form-item>
                        <el-form-item :label="$t('warehouse.warehouseCode')" prop="warehouseCode">
                        <el-input v-model="temp.warehouseCode" :disabled="dialogStatus!='create'"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('warehouse.warehouseName')" prop="warehouseName">
                        <el-input v-model="temp.warehouseName"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('warehouse.warehouseGroupName')" prop="warehouseGroup">
                        <el-select size="small" v-model="temp.warehouseGroup" :placeholder="$t('table.select')">
                            <el-option v-for="item in dt_warehouse_group" :key="item.dictItemKey" :label="item.dictItemValue"
                                :value="item.dictItemKey">
                            </el-option>
                        </el-select>
                        </el-form-item>
                        <el-form-item :label="$t('warehouse.erpWarehouseCode')" prop="erpWarehouseCode">
                        <el-input v-model="temp.erpWarehouseCode"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('warehouse.batchEnabled')" prop="batchEnabled">
                        <el-select size="small" v-model="temp.batchEnabled" :placeholder="$t('table.select')">
                            <el-option v-for="item in dt_batch_enabled" :key="item.dictItemKey" :label="item.dictItemValue"
                                :value="item.dictItemKey">
                            </el-option>
                        </el-select>
                        </el-form-item>
                        <el-form-item :label="$t('warehouse.minusEnabled')" prop="minusEnabled">
                        <el-select size="small" v-model="temp.minusEnabled" :placeholder="$t('table.select')">
                            <el-option v-for="item in dt_negativestock_en" :key="item.dictItemKey" :label="item.dictItemValue"
                                :value="item.dictItemKey">
                            </el-option>
                        </el-select>
                        </el-form-item>
                        <el-form-item :label="$t('warehouse.batchRuleDiff')" prop="batchRuleDiff">
                            <el-select size="small" v-model="temp.batchRuleDiff" :placeholder="$t('table.select')">
                                <el-option v-for="item in dt_batch_rule_diff" :key="item.dictItemKey" :label="item.dictItemValue"
                                    :value="item.dictItemKey">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="储位物料关系" prop="wareLoctionMateriel">
                        <el-select size="small" v-model="temp.wareLoctionMateriel" :placeholder="$t('table.select')">
                            <el-option v-for="item in dt_material_relation" :key="item.dictItemKey" :label="item.dictItemValue"
                                :value="item.dictItemKey">
                            </el-option>
                        </el-select>
                        </el-form-item>
                        <el-form-item :label="$t('warehouse.functionEnabled')">
                            <el-checkbox v-model="enableds.areaEnabled">区位启用</el-checkbox>
                            <el-checkbox v-model="enableds.locationEnabled">储位启用</el-checkbox>
                            <el-checkbox v-model="enableds.wmsEnabled">WMS管理</el-checkbox>
                        </el-form-item>
                        <el-form-item :label="$t('warehouse.warehouseAddr')" prop="warehouseAddr">
                            <el-input type="textarea" :rows="2" v-model="temp.warehouseAddr" style="width: 460px"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('warehouse.remark')" prop="remark">
                            <el-input type="textarea" :rows="2" style="width: 460px" v-model="temp.remark"></el-input>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>

                <el-tab-pane :label="$t('warehouse.batchEnabled')" name="2">
                    <div class="tab-items">
                        <el-button size="mini" type="primary" @click="handleCreateBatch">{{ $t('table.add') }}</el-button>
                    </div>
                    <el-table :key='tableKey' :data="batchList" border fit highlight-current-row
                                style="width: 100%"  size="mini"
                                cell-class-name="table-cell"
                                height="200" header-cell-class-name="header-cell">
                        <el-table-column show-overflow-tooltip align="center" label="操作" width="60" fixed>
                            <template slot-scope="scope">
                                <el-button size="mini" style="border:0px" icon="el-icon-delete" @click="handleDeleteBatch(scope.row)">
                                </el-button>
                            </template>
                        </el-table-column>
                        <el-table-column show-overflow-tooltip align="center" :label="$t('warehouse.warehouseCode')" prop="warehouseCode"></el-table-column>
                        <el-table-column show-overflow-tooltip align="center" :label="$t('warehouse.objectCode')" prop="objectCode"></el-table-column>
                        <el-table-column show-overflow-tooltip align="center" :label="$t('warehouse.objectName')" prop="objectName"></el-table-column>
                        <el-table-column show-overflow-tooltip align="center" :label="$t('warehouse.batchEnabledType')" prop="batchEnabledName"></el-table-column>
                    </el-table>
                </el-tab-pane>

                <el-tab-pane :label="$t('warehouse.minusEnabled')" name="3">
                    <div class="tab-items">
                        <el-button size="mini" type="primary" @click="handleCreateMinus">{{ $t('table.add') }}</el-button>
                    </div>
                    <el-table :key='tableKey' :data="minusList" border fit highlight-current-row
                                style="width: 100%"  size="mini"
                                cell-class-name="table-cell"
                                height="200" header-cell-class-name="header-cell">
                        <el-table-column show-overflow-tooltip align="center" :label="$t('warehouse.operation')" width="60" fixed>
                            <template slot-scope="scope">
                                <el-button size="mini" type="danger" @click="handleDeleteMinus(scope.row)">
                                </el-button>
                            </template>
                        </el-table-column>
                        <el-table-column show-overflow-tooltip align="center" :label="$t('warehouse.warehouseCode')" prop="warehouseCode"></el-table-column>
                        <el-table-column show-overflow-tooltip align="center" :label="$t('warehouse.objectCode')" prop="objectCode"></el-table-column>
                        <el-table-column show-overflow-tooltip align="center" :label="$t('warehouse.objectName')" prop="objectName"></el-table-column>
                        <el-table-column show-overflow-tooltip align="center" :label="$t('warehouse.batchEnabledType')" prop="minusEnabledName"></el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>

        <el-dialog custom-class="dialog-custom" class="table_dialog" :close-on-click-modal="false" :close-on-press-escape="false"  :title="$t('warehouse.materialClassification')" :visible.sync="typeDialogVisible">
            <materielDictItemTable @selectRow="selectTypeRow" v-if="typeDialogVisible"></materielDictItemTable>
        </el-dialog>

        <el-dialog width="60%" custom-class="dialog-custom" class="table_dialog" :close-on-click-modal="false" :close-on-press-escape="false"  :title="$t('warehouse.materialSelection')" :visible.sync="partDialogVisible">
            <wlxzbyzsj :unMutiple="true" ref="wlxz" v-if="partDialogVisible"></wlxzbyzsj>
            <div slot="footer" class="dialog-footer">
                <el-button @click="partDialogVisible=!partDialogVisible">{{$t('table.cancel')}}</el-button>
                <el-button type="primary" @click="handleConfirm">{{$t('table.confirm')}}</el-button>
            </div>
        </el-dialog>
        </div>
    </div>
</template>

<script>
import * as api from '@/api/data-base/warehouse'
import Pagination from '@/components/Pagination'
import orgSelect from '@/components/Select/orgSelect.vue'
import materielDictItemTable from '@/components/Table/materiel-dict-item-table.vue'
import wlxzbyzsj from '@/components/Select/wlxzbyzsj.vue'
import { DICT_CODE, DT_ORG_TYPE, TWO_STATE_OPTIONS } from '@/utils/constant'
import {mapState} from 'vuex'
import AuthoType from "@/components/Select/AuthoType.vue"; //权限类型下拉组件


export default {
  name: 'warehouse',
  components: { Pagination,orgSelect, materielDictItemTable, wlxzbyzsj,AuthoType },
  data() {
    return {
      list: null,
      total: 0,
      wlselect:null,
      theight: 0,//表格高度
      listQuery: {
        page: true,
        currentPage: 1,
        pageSize: 15,
        warehouseCode: undefined,
        warehouseName: undefined,
        warehouseType: undefined,
        warehouseClass: undefined,
        orgCode: undefined
      },
      temp: {
        areaEnabled: 0,
        batchEnabled: undefined,
        erpWarehouseCode: undefined,
        locationEnabled: 0,
        wmsEnabled: 0,
        minusEnabled: undefined,
        batchRuleDiff:undefined,
        orgCode: undefined,
        orgName: undefined,
        remark: undefined,
        warehouseAddr: undefined,
        warehouseClass: undefined,
        warehouseCode: undefined,
        warehouseGroup: undefined,
        warehouseName: undefined,
        warehouseType: undefined
      },
      enableds: {
        areaEnabled: false,
        locationEnabled: false,
        wmsEnabled: false,
      },
      warehouseCode: undefined,
      orgCode: undefined,
      selectCode: [],
      dialogFormVisible: false,
      dialogStatus: '',
      tableKey: 0,
      DICT_CODE: DICT_CODE,
      DT_ORG_TYPE: DT_ORG_TYPE,
      TWO_STATE_OPTIONS: TWO_STATE_OPTIONS,
      employeeType: undefined,
      activeName: '1',
      typeDialogVisible: false,
      batchList: [],
      partDialogVisible: false,
      minusList: [],
      rules: {
        orgCode: [
          { required: true, message: '请选择组织编码', trigger: 'blur' }
        ],
        warehouseCode: [
          { required: true, message: '仓库编号不能空', trigger: 'blur' },
          { pattern: /^[A-Z0-9]{0,8}$/, message: '由大写字母和数字组成，长度为8', trigger: 'blur' }
        ],
        warehouseName: [
          { required: true, message: '仓库名称不能空', trigger: 'blur' },
          { max: 60, message: '长度不能超过60', trigger: 'blur' }
        ],
        warehouseType: [
          { required: true, message: '请选择仓库类型', trigger: 'blur' }
        ],
        warehouseClass: [
          { required: true, message: '请选择仓库类别', trigger: 'blur' }
        ],
        erpWarehouseCode: [
          { pattern: /^[A-Z0-9]{0,8}$/, message: '由大写字母和数字组成，长度为8', trigger: 'blur' }
        ],
        warehouseAddr: [
          { max: 200, message: '长度不能超过200', trigger: 'blur' }
        ],
        remark: [
          { max: 512, message: '描述长度为512内', trigger: 'blur' }
        ]
      }
    }
  },
  computed:{
      ...mapState({
          dt_warehouse_type:state=>state.dict.dt_warehouse_type,
          dt_warehouse_class:state=>state.dict.dt_warehouse_class,
          dt_warehouse_group:state=>state.dict.dt_warehouse_group,
          dt_batch_enabled:state=>state.dict.dt_batch_enabled,
          dt_negativestock_en:state=>state.dict.dt_negativestock_en,
          dt_batch_rule_diff:state=>state.dict.dt_batch_rule_diff,
          dt_material_relation:state=>state.dict.dt_material_relation
      })
  },
  mounted(){
      this.$store.dispatch('dict/getDicData',['dt_warehouse_type','dt_warehouse_class','dt_warehouse_group','dt_batch_enabled','dt_negativestock_en','dt_batch_rule_diff','dt_material_relation']);
      this.setTableHeight();
      //表格高度自适应
      window.onresize = () => {
        this.setTableHeight()
      };
      this.getList();
  },
  methods: {
    getList() {
      api.queryRecords(this.listQuery).then(res => {
        this.list = res.data.list
        this.total = res.data.pages.count
      })
    },
    //表格高度计算
    setTableHeight () {
        this.theight = this.$myFun.getSingleTbHeight();
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
    // 获取表格选中时的数据
        selectRow (val) {
            this.selectlistRow = val
        },

    handleDownload() {//导出
                this.downloadLoading = true
                import('@/vendor/Export2Excel').then(excel => {
                const tHeader = [
                    '组织名称', '仓库类型', '仓库编码','仓库名称',
                    '仓库类别', '仓库组','ERP仓库编码','储位物料关系',
                    '区位启用','储位启用','WMS管理','批次启用',
                    '储位物料关系','负库存启用','批次规则区分','仓库地址',
                    '备注','创建人','创建时间','修改人',
                    '修改时间'
                    ]
                const filterVal =  [
                    'orgName', 'warehouseTypeName', 'warehouseCode','warehouseName',
                    'warehouseClassName', 'warehouseGroupName','erpWarehouseCode','relation',
                    'areaEnabled','locationEnabled','wmsEnabled','batchEnabledName',
                    'wareLoctionMateriel','minusEnabledName','batchRuleDiffName','warehouseAddr',
                    'remark','creator','createTime','updator',
                    'updateTime'
                    ]
                const data = this.formatJson(filterVal, this.list)
                excel.export_json_to_excel({
                    header: tHeader,
                    data,
                    filename: 'table-list'
                })
                this.downloadLoading = false
                })
            },
    formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => {
                if (j === 'timestamp') {
                    return 
                } else {
                    return v[j]
                }
                }))
            },
    handleUpdate() {//编辑弹窗
    console.log(this.selectlistRow[0],'000')
          if(this.selectlistRow && this.selectlistRow.length==1){
            this.readonly=true//员工编码不可以编写
            this.temp = this.selectlistRow[0] // copy obj
            if(this.selectlistRow[0].locationEnabled==1){
                this.enableds.locationEnabled=true
            }if(this.selectlistRow[0].areaEnabled==1){
                this.enableds.areaEnabled=true
            }if(this.selectlistRow[0].wmsEnabled==1){
                this.enableds.wmsEnabled=true
            }
            api.getRecord(this.temp.warehouseCode).then(res => {
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
         update() {//编辑
          this.$refs['temp'].validate((valid) => {
            if (valid) {
            this.boolean2Int()
              api.updateRecord(this.temp.warehouseCode,this.temp).then(() => {
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
                    ids[index]=val.warehouseCode
                  })
                  api.deleteRecord(ids).then(() => {
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
          this.boolean2Int()
          api.addRecord(this.temp).then(() => {
            this.getList()
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
        areaEnabled: false,
        batchEnabled: undefined,
        erpWarehouseCode: undefined,
        locationEnabled: false,
        wmsEnabled: false,
        minusEnabled: undefined,
        batchRuleDiff:undefined,
        orgCode: undefined,
        orgName: undefined,
        remark: undefined,
        warehouseAddr: undefined,
        warehouseClass: undefined,
        warehouseCode: undefined,
        warehouseGroup: undefined,
        warehouseName: undefined,
        warehouseType: undefined
      }
      this.activeName = '1'
      this.enableds = {
        areaEnabled: false,
        locationEnabled: false,
        wmsEnabled: false,
      }
    },
    handleClose() {
      this.resetTemp()
      this.$refs.temp.resetFields()
    },
    selectName(val) {
      this.temp.orgName = val
    },
    boolean2Int() {
      this.temp.areaEnabled = this.enableds.areaEnabled ? 1 : 0
      this.temp.locationEnabled = this.enableds.locationEnabled ? 1 : 0
      this.temp.wmsEnabled = this.enableds.wmsEnabled ? 1 : 0
    },
    int2Boolean() {
      this.enableds.areaEnabled = this.temp.areaEnabled === 1
      this.enableds.locationEnabled = this.temp.locationEnabled === 1
      this.enableds.wmsEnabled = this.temp.wmsEnabled === 1
    },
    handleClickTab(val) {
      if (val.name == '2') {
        this.listBatch()
      } else if (val.name == '3') {
        this.listMinus()
      }
    },
    listBatch() {
      api.listBatch(this.temp.warehouseCode).then(res => {
        this.batchList = res.data
      })
    },
    handleCreateBatch() {
        console.log(this.temp.batchEnabled,'98789')
      if (this.temp.batchEnabled == 'dt_batch_enabled_type') { //按分类启用
        this.typeDialogVisible = true
      } else if (this.temp.batchEnabled == 'dt_batch_enabled_part') {//按物料启用
        this.partDialogVisible = true
        this.wlselect=null
      }
    },
    handleDeleteBatch(row) {
      this.$confirm('此操作将永久删除记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.deleteBatch(row.warehouseCode, row.objectCode).then(() => {
          this.listByActiveName()
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
        })
      })
    },
    createBatch(temp) {
        console.log(temp,'000')
      api.addBatch(this.temp.warehouseCode, temp).then(() => {
        this.listByActiveName()
        this.typeDialogVisible = false
        this.partDialogVisible = false
        this.$notify({
          title: '成功',
          message: '新增成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    selectTypeRow(rows) {
      const temp = rows.map(v => {
        let temp = {
          warehouseCode: this.temp.warehouseCode,
          objectCode: v.dictItemKey,
          objectName: v.dictItemValue,
          batchEnabled: this.temp.batchEnabled,
          minusEnabled: this.temp.minusEnabled
        }
        return temp
      })
    
      this.createByActiveName(temp)
    },
    listMinus() {
      api.listMinus(this.temp.warehouseCode).then(res => {
        this.minusList = res.data
      })
    },
    handleCreateMinus() {
      if (this.temp.minusEnabled == 'dt_negativestock_en_type') { //按分类启用
        this.typeDialogVisible = true
      } else if (this.temp.minusEnabled == 'dt_negativestock_en_part') { //按物料启用
        this.partDialogVisible = true
      }
    },
    
    handleConfirm(){
        if(this.$refs.wlxz.listSelected.length>0){
            const temp = this.$refs.wlxz.listSelected.map(v => {
        let temp = {
          warehouseCode: this.temp.warehouseCode,
          objectCode: v.materielCode,
          objectName: v.materielName,
          batchEnabled: this.temp.batchEnabled,
          minusEnabled: this.temp.minusEnabled
        }
        return temp
      })
      this.wlselect=temp
            api.addBatch(this.temp.warehouseCode, this.wlselect).then(() => {
                this.listByActiveName()
                this.typeDialogVisible = false
                this.partDialogVisible = false
                this.$notify({
                title: '成功',
                message: '新增成功',
                type: 'success',
                duration: 2000
                })
            })
        }else{
            this.$notify({
            title: '警告',
            message: '请勾选记录',
            type: 'warning',
            duration: 2000
          })
        }
       
    },
    handleDeleteMinus(row) {
      this.$confirm('此操作将永久删除记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.deleteMinus(row.warehouseCode, row.objectCode).then(() => {
          this.listByActiveName()
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
        })
      })
    },
    createMinus(temp) {
      api.addMinus(this.temp.warehouseCode, temp).then(() => {
        this.listByActiveName()
        this.typeDialogVisible = false
        this.partDialogVisible = false
        this.$notify({
          title: '成功',
          message: '新增成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    selectPartRow(rows) {
      const temp = rows.map(v => {
        let temp = {
          warehouseCode: this.temp.warehouseCode,
          objectCode: v.materielCode,
          objectName: v.materielName,
          batchEnabled: this.temp.batchEnabled,
          minusEnabled: this.temp.minusEnabled
        }
        return temp
      })
      this.wlselect=temp
    },
    listByActiveName() {
      if (this.activeName == '2') {
        this.listBatch()
      } else if (this.activeName == '3') {
        this.listMinus()
      }
    },
    createByActiveName(temp) {
      if (this.activeName == '2') {
        this.createBatch(temp)
      } else if (this.activeName == '3') {
        this.createMinus(temp)
      }
    }
  }
}
</script>