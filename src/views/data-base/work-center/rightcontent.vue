<template>
    <div class="app-container">
        <div class="filter-container">
            <div class="filter-items">
                <el-input size="small"
                          :placeholder="$t('workCenter.workCenterCode')"
                          v-model="listQuery.workCenterCode"
                          class="filter-item"
                          @keyup.enter.native="handleQuery" />
                <el-input size="small"
                          :placeholder="$t('workCenter.workCenterName')"
                          v-model="listQuery.workCenterName"
                          class="filter-item"
                          @keyup.enter.native="handleQuery" />
                <el-button class="filter-item"
                           size="small"
                           type="primary"
                           icon="el-icon-search"
                           @click="handleQuery">
                    {{ $t('table.search') }}
                </el-button>
            </div>
        </div>
        <div class="table-container">
            <div class="oprate_btn">
                <el-button class="filter-item"
                           size="small"
                           type="primary"
                           @click="handleCreate"
                           icon="el-icon-plus">
                    {{$t('table.add')}}
                </el-button>
                <el-button class="filter-item"
                           size="small"
                           type="primary"
                           @click="handleUpdate"
                           icon="el-icon-edit">
                    {{$t('table.edit')}}
                </el-button>
                <el-button class="filter-item"
                           size="small"
                           type="primary"
                           @click="handleDelete"
                           icon="el-icon-delete">
                    {{$t('table.delete')}}
                </el-button>
            </div>
            <el-table :key="tableKey"
                      :data="list"
                      border
                      fit
                      :height="theight"
                      highlight-current-row
                      style="width: 100%;"
                      @selection-change='selectRow'
                      cell-class-name="table-cell"
                      header-cell-class-name="header-cell">
                <el-table-column type="selection"
                                 width="30">
                </el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="120"
                                 align="left"
                                 :label="$t('workCenter.workCenterCode')"
                                 prop="workCenterCode"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="120"
                                 align="left"
                                 :label="$t('workCenter.workCenterName')"
                                 prop="workCenterName"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="120"
                                 align="left"
                                 :label="$t('workCenter.workCenterTypeName')"
                                 prop="workCenterTypeName"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="120"
                                 align="left"
                                 :label="$t('workCenter.workCenterClassName')"
                                 prop="workCenterClassName"></el-table-column>
                <!--<el-table-column show-overflow-tooltip width="100" align="center" label="上级工作中心" prop="parentCode"></el-table-column>-->
                <el-table-column show-overflow-tooltip
                                 width="120"
                                 align="left"
                                 :label="$t('workCenter.workCenterGroupName')"
                                 prop="workCenterGroupName"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="100"
                                 align="left"
                                 :label="$t('workCenter.workCenterModelName')"
                                 prop="workCenterModelName"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="100"
                                 align="left"
                                 :label="$t('workCenter.productBeat')"
                                 prop="productBeat"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="100"
                                 align="left"
                                 :label="$t('workCenter.beatTimeunitName')"
                                 prop="beatTimeunitName"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="100"
                                 align="left"
                                 :label="$t('workCenter.productNum')"
                                 prop="productNum"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="100"
                                 align="left"
                                 :label="$t('workCenter.feedAreaName')"
                                 prop="feedAreaName"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 min-width="100"
                                 align="left"
                                 :label="$t('workCenter.bufferArea')"
                                 prop="bufferAreaName"></el-table-column>
            </el-table>

            <pagination :total="total"
                        :page.sync="listQuery.currentPage"
                        :limit.sync="listQuery.pageSize"
                        @pagination="getList" />
            <el-dialog custom-class="dialog-custom"
                       :close-on-click-modal="false"
                       :close-on-press-escape="false"
                       :title="dialogStatus=='create'?$t('table.add'):$t('table.edit')"
                       :visible.sync="dialogFormVisible"
                       @close="handleClose"
                       v-dialogDrag>
                <el-form :inline="true"
                         class='demo-form-inline'
                         :model="temp"
                         :rules="rules"
                         ref="temp"
                         label-width="120px"
                         style="width:auto;">
                    <el-form-item :label="$t('workCenter.orgCode')"
                                  prop="orgCode">
                        <orgSelect disabled
                                   :orgType="DT_ORG_TYPE"
                                   v-model="temp.orgCode">
                        </orgSelect>
                    </el-form-item>
                    <el-form-item :label="$t('workCenter.parentCode')"
                                  prop="parentCode">
                        <el-input v-model="temp.parentName"
                                  disabled></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('workCenter.workCenterType')"
                                  prop="workCenterType">
                        <el-select size="small"
                                   v-model="temp.workCenterType"
                                   :placeholder="$t('table.select')">
                            <el-option v-for="item in dt_workcenter_type"
                                       :key="item.dictItemKey"
                                       :label="item.dictItemValue"
                                       :value="item.dictItemKey"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('workCenter.workCenterClass')"
                                  prop="workCenterClass">
                        <el-select size="small"
                                   v-model="temp.workCenterClass"
                                   :placeholder="$t('table.select')">
                            <el-option v-for="item in dt_workcenter_class"
                                       :key="item.dictItemKey"
                                       :label="item.dictItemValue"
                                       :value="item.dictItemKey"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('workCenter.workCenterCode')"
                                  prop="workCenterCode">
                        <el-input v-model="temp.workCenterCode"
                                  :disabled="dialogStatus!='create'"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('workCenter.workCenterGroupName')">
                        <el-select size="small"
                                   v-model="temp.workCenterGroup"
                                   :placeholder="$t('table.select')">
                            <el-option v-for="item in dt_workcenter_group"
                                       :key="item.dictItemKey"
                                       :label="item.dictItemValue"
                                       :value="item.dictItemKey"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('workCenter.workCenterName')"
                                  prop="workCenterName">
                        <el-input v-model="temp.workCenterName"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('workCenter.workCenterModelName')"
                                  prop="workCenterModel">
                        <el-select :disabled="temp.workCenterClass != 'dt_workcenter_class_line'"
                                   size="small"
                                   v-model="temp.workCenterModel"
                                   :placeholder="$t('table.select')">
                            <el-option v-for="item in dt_workcenter_model"
                                       :key="item.dictItemKey"
                                       :label="item.dictItemValue"
                                       :value="item.dictItemKey"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('workCenter.productNum')"
                                  prop="productNum">
                        <el-input v-model="temp.productNum"
                                  :disabled="temp.workCenterClass != 'dt_workcenter_class_line'"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('workCenter.productBeat')"
                                  prop="productBeat">
                        <el-input v-model="temp.productBeat"
                                  :disabled="temp.workCenterClass != 'dt_workcenter_class_line'">
                            <el-select style="width: 70px"
                                       :disabled="temp.workCenterClass != 'dt_workcenter_class_line'"
                                       size="small"
                                       v-model="temp.beatTimeunit"
                                       :placeholder="$t('table.select')">
                                <el-option v-for="item in dt_timeunit"
                                           :key="item.dictItemKey"
                                           :label="item.dictItemValue"
                                           :value="item.dictItemKey"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>
                    <el-form-item :label="$t('workCenter.beatTimeunitName')"
                                  prop="beatTimeunit">
                        <el-select size="small"
                                   v-model="temp.beatTimeunit"
                                   :placeholder="$t('workCenter.beatTimeunitName')"
                                   clearable>
                            <el-option v-for="item in dt_timeunit"
                                       :key="item.dictItemKey"
                                       :label="item.dictItemValue"
                                       :value="item.dictItemKey"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('workCenter.feedAreaName')">
                        <warehouseSelect :orgCode="temp.orgCode"
                                         v-model="temp.feedArea">
                        </warehouseSelect>
                    </el-form-item>
                    <el-form-item :label="$t('workCenter.bufferArea')">
                        <warehouseSelect :orgCode="temp.orgCode"
                                         v-model="temp.bufferArea">
                        </warehouseSelect>
                    </el-form-item>

                </el-form>
                <div slot="footer"
                     class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
                    <el-button type="primary"
                               @click="dialogStatus==='create'?create():update()">{{ $t('table.confirm') }}</el-button>
                </div>
            </el-dialog>
        </div>

    </div>
</template>

<script>
import * as api from '@/api/data-base/work-center'
import Pagination from '@/components/Pagination'
import warehouseSelect from '@/components/Select/warehouse-select.vue'
import orgSelect from '@/components/Select/orgSelect.vue'
import { mapState } from 'vuex';
import global_valfn from '@/utils/global_valfn'

export default {
    name: 'workCenter',
    components: { Pagination, warehouseSelect, orgSelect },
    data () {
        return {
            list: null,
            total: 0,
            DT_ORG_TYPE: 'dt_org_type_factory',
            theight: 0,//表格高度
            listQuery: {
                page: true,
                currentPage: 1,
                pageSize: 10,
                orgCode: undefined,
                workCenterCode: undefined,
                workCenterName: undefined,
                parentCode: undefined
            },
            temp: {
                orgCode: undefined,
                workCenterType: undefined,
                workCenterCode: undefined,
                workCenterName: undefined,
                productNum: undefined,
                feedArea: undefined,
                parentCode: undefined,
                workCenterClass: undefined,
                workCenterGroup: undefined,
                workCenterModel: undefined,
                beatTimeunit: undefined,
                productBeat: undefined,
                bufferArea: undefined
            },
            orgCode: undefined,
            parentCode: undefined,
            parentName: undefined,
            dialogFormVisible: false,
            dialogStatus: '',
            tableKey: 0,
            rules: {
                workCenterType: [
                    { required: true, message: '工作中心类型不能为空', trigger: 'blur' }
                ],
                workCenterClass: [
                    { required: true, message: '工作中心类别不能为空', trigger: 'blur' }
                ],
                workCenterCode: [
                    { required: true, message: '工作中心编号不能为空', trigger: 'blur' },
                    { pattern: /^[A-Z-_0-9]{0,32}$/, message: '由大写字母、数字、-和_组成，长度为32', trigger: 'blur' }
                ],
                workCenterName: [
                    { required: true, message: '工作中心编号不能为空', trigger: 'blur' },
                    { max: 100, message: '颜色简称长度不能超过100', trigger: 'blur' }
                ],
                productNum: [
                    { pattern: /^[1-9]\d{0,8}$/, message: '由正数组成，长度不能超过8', trigger: 'blur' }
                ],
                productBeat: [
                    { pattern: /^[0-9]{0,6}(\.[0-9]{4})?$/, message: '由正数组成，保留四位有效数，长度不能超过6', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        ...mapState({
            dt_workcenter_type: state => state.dict.dt_workcenter_type,
            dt_workcenter_class: state => state.dict.dt_workcenter_class,
            dt_workcenter_group: state => state.dict.dt_workcenter_group,
            dt_workcenter_model: state => state.dict.dt_workcenter_model,
            dt_timeunit: state => state.dict.dt_timeunit
        })
    },
    mounted () {
        this.$store.dispatch('dict/getDicData', ['dt_workcenter_type', 'dt_workcenter_class', 'dt_workcenter_group', 'dt_workcenter_model', 'dt_timeunit']);
        this.setTableHeight();
        //表格高度自适应
        window.onresize = () => {
            this.setTableHeight();
        };
        this.getList();
    },
    methods: {
        getList (node) {
            if (node) {

                this.orgCode = node.orgCode
                if (node.workCenterCode != undefined) {
                    this.parentCode = node.workCenterCode
                    this.parentName = node.label
                } else {
                    this.parentCode = ''
                    this.parentName = ''
                }
                this.listQuery.orgCode = node.orgCode
                this.listQuery.parentCode = node.workCenterCode
            }
            api.queryRecords(this.listQuery).then(res => {
                this.list = res.data.list
                this.total = res.data.pages.count
            })
        },
        //表格高度计算
        setTableHeight () {
            this.theight = global_valfn.getSingleTbHeight();
        },
        handleQuery () {
            this.listQuery.currentPage = 1
            this.getList()
        },
        handleSizeChange (val) {
            this.listQuery.pageSize = val
            this.getList()
        },
        handleCurrentChange (val) {
            this.listQuery.currentPage = val
            this.getList()
        },
        handleCreate () {
            if (!this.orgCode) {
                this.$message.warning('请选择对应工厂或者上级工作中心！')
                return
            }
            this.resetTemp()
            this.temp.orgCode = this.orgCode
            this.temp.parentCode = this.parentCode
            this.temp.parentName = this.parentName
            this.dialogStatus = 'create'
            this.dialogFormVisible = true
        },
        // handleUpdate(row) {
        //   if (!this.orgCode) {
        //     this.$message.warning('请选择对应工厂或者上级工作中心！')
        //     return
        //   }
        //   this.workCenterCode = row.workCenterCode
        //   api.getRecord(row.workCenterCode).then(res => {
        //     this.temp = res
        //     this.temp.parentCode = this.parentCode
        //     this.temp.parentName = this.parentName
        //     this.dialogStatus = 'update'
        //     this.dialogFormVisible = true
        //   })
        // },
        // 获取表格选中时的数据
        selectRow (val) {
            this.selectlistRow = val
        },
        handleUpdate () {//编辑弹窗
            if (!this.orgCode) {
                this.$message.warning('请选择对应工厂或者上级工作中心！')
                return
            }
            if (this.selectlistRow && this.selectlistRow.length == 1) {
                this.readonly = true//员工编码不可以编写
                this.temp = this.selectlistRow[0] // copy obj
                api.getRecord(this.temp.workCenterCode).then(res => {
                    this.temp = res.data
                    this.dialogStatus = 'update'
                    this.dialogFormVisible = true
                    // this.$nextTick(() => {
                    //   this.$refs['temp'].clearValidate()
                    // })
                })
            } else {
                this.$message({
                    title: '警告',
                    message: '请选择一条信息',
                    type: 'warning'
                })
            }
        },
        update () {//编辑
            this.$refs['temp'].validate((valid) => {
                if (valid) {
                    api.updateRecord(this.workCenterCode, this.temp).then(() => {
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
        handleDeleteBatch () {
            if (this.selectCode.length == 0) {
                this.$message.warning('请勾选记录！')
                return
            }
            this.delete(this.selectCode)
        },
        // handleDelete(row) {
        //   let codes = []
        //   codes.push(row.workCenterCode)
        //   this.delete(codes)
        // },
        // delete(codes) {
        //   this.$confirm('此操作将永久删除记录, 是否继续?', '提示', {
        //     confirmButtonText: '确定',
        //     cancelButtonText: '取消',
        //     type: 'warning'
        //   }).then(() => {
        //     api.deleteRecord(codes).then(res => {
        //       this.handleChange()
        //       this.getList()
        //       this.$notify({
        //         title: '成功',
        //         message: '删除成功',
        //         type: 'success',
        //         duration: 2000
        //       })
        //     })
        //   })
        // },
        handleDelete () {//删除列表
            if (this.selectlistRow && this.selectlistRow.length == 1) {
                this.$confirm('此操作将删除所选中数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    let ids = []
                    this.selectlistRow.forEach((val, index) => {
                        ids[index] = val.workCenterCode
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

            } else {
                this.$message({
                    title: '警告',
                    message: '请选择一条信息',
                    type: 'warning'
                })
            }
        },
        create () {
            this.$refs.temp.validate((valid) => {
                if (valid) {
                    api.addRecord(this.temp).then(() => {
                        this.handleChange()
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
        // update() {
        //   this.$refs.temp.validate((valid) => {
        //     if (valid) {
        //       api.updateRecord(this.workCenterCode, this.temp).then(res => {
        //         this.handleChange()
        //         this.getList()
        //         this.dialogFormVisible = false
        //         this.$notify({
        //           title: '成功',
        //           message: '更新成功',
        //           type: 'success',
        //           duration: 2000
        //         })
        //         this.$refs.temp.resetFields()
        //       })
        //     } else {
        //       return false
        //     }
        //   })
        // },
        cancel () {
            this.dialogFormVisible = false
        },
        resetTemp () {
            this.temp = {
                orgCode: undefined,
                workCenterType: undefined,
                workCenterCode: undefined,
                workCenterName: undefined,
                productNum: undefined,
                feedArea: undefined,
                parentCode: undefined,
                workCenterClass: undefined,
                workCenterGroup: undefined,
                workCenterModel: undefined,
                beatTimeunit: undefined,
                productBeat: undefined,
                bufferArea: undefined
            }
        },
        handleClose () {
            this.resetTemp()
            this.$refs.temp.resetFields()
        },
        handleSelectionChange (selection) {
            this.selectCode = selection.map(v => v.workCenterCode)
        },
        handleChange () {
            this.$emit('fresh', true)
        }
    }
}
</script>
