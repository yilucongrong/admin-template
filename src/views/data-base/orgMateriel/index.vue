<template>
    <div>
        <div class="app-container">
            <div class="filter-container">
                <div class="filter-items">
                    <orgSelect :placeholder="$t('orgMateriel.orgCode')"
                               class="filter-item"
                               :orgType="DT_ORG_TYPE.factory"
                               v-model="listQuery.orgCode">
                    </orgSelect>
                    <el-input @keyup.enter.native="handleQuery"
                              :placeholder="$t('orgMateriel.materielCode')"
                              class="filter-item"
                              size="small"
                              v-model="listQuery.materielCode">
                    </el-input>
                    <el-input @keyup.enter.native="handleQuery"
                              :placeholder="$t('orgMateriel.materielName')"
                              class="filter-item"
                              size="small"
                              v-model="listQuery.materielName">
                    </el-input>
                    <el-button class="filter-item"
                               size="small"
                               type="primary"
                               icon="el-icon-search"
                               @click="handleQuery">{{$t('table.search')}}</el-button>
                </div>
            </div>
            <div class="table-container">
                <div class="oprate_btn">
                    <el-button size="small"
                               type="primary"
                               @click="handleCreate"
                               icon="el-icon-plus">{{$t('table.add')}}</el-button>
                    <el-button size="small"
                               type="primary"
                               @click="handleUpdate"
                               icon="el-icon-edit">{{$t('table.edit')}}</el-button>
                    <el-button size="small"
                               type="primary"
                               @click="handleDelete"
                               icon="el-icon-delete">{{$t('table.delete')}}</el-button>
                    <el-button size="small"
                               class="filter-item"
                               type="primary"
                               icon="el-icon-upload2"
                               @click="handleDownload">{{ $t("table.export") }}</el-button>
                    <el-button class="filter-item"
                               size="small"
                               type="primary"
                               @click="handleImport"
                               icon="el-icon-download">{{$t('table.import')}}</el-button>
                </div>
                <el-table :key="tableKey"
                          :data="list"
                          border
                          fit
                          :height="theight"
                          highlight-current-row
                          style="width: 100%;"
                          @selection-change='selectRow'
                          size="mini"
                          cell-class-name="table-cell"
                          header-cell-class-name="header-cell">
                    <el-table-column type="selection"
                                     width="30"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="120"
                                     align="center"
                                     :label="$t('orgMateriel.orgName')"
                                     prop="orgName"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="120"
                                     align="center"
                                     :label="$t('orgMateriel.materielCode')"
                                     prop="materielCode"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="120"
                                     align="center"
                                     :label="$t('orgMateriel.materielName')"
                                     prop="materielName"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="120"
                                     align="center"
                                     :label="$t('orgMateriel.madeTypeName')"
                                     prop="madeTypeName"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="120"
                                     align="center"
                                     :label="$t('orgMateriel.supplyModeName')"
                                     prop="supplyModeName"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="120"
                                     align="center"
                                     :label="$t('orgMateriel.safeStock')"
                                     prop="safeStock"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="120"
                                     align="center"
                                     :label="$t('orgMateriel.maxStock')"
                                     prop="maxStock"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="120"
                                     align="center"
                                     :label="$t('orgMateriel.minStock')"
                                     prop="minStock"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="120"
                                     align="center"
                                     :label="$t('orgMateriel.unloadPointName')"
                                     prop="unloadPointName"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="80"
                                     align="center"
                                     :label="$t('orgMateriel.warehouseName')"
                                     prop="warehouseName"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="120"
                                     align="center"
                                     :label="$t('orgMateriel.materialpullTypeName')"
                                     prop="materialpullTypeName"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="80"
                                     align="center"
                                     :label="$t('orgMateriel.stockEmpName')"
                                     prop="stockEmpName"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="80"
                                     align="center"
                                     :label="$t('orgMateriel.materialpullTime')"
                                     prop="materialpullTime"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="120"
                                     align="center"
                                     :label="$t('orgMateriel.materialpullTimeutilName')"
                                     prop="materialpullTimeutilName"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="80"
                                     align="center"
                                     :label="$t('orgMateriel.goodsReadyTime')"
                                     prop="goodsReadyTime"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="120"
                                     align="center"
                                     :label="$t('orgMateriel.goodsReadyTimeutilName')"
                                     prop="goodsReadyTimeutilName"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="120"
                                     align="center"
                                     :label="$t('orgMateriel.materialputTypeName')"
                                     prop="materialputTypeName"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="80"
                                     align="center"
                                     :label="$t('orgMateriel.stockContain')"
                                     prop="stockContain"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="120"
                                     align="center"
                                     :label="$t('orgMateriel.materialputTime')"
                                     prop="materialputTime"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="120"
                                     align="center"
                                     :label="$t('orgMateriel.materialputTimeutilName')"
                                     prop="materialputTimeutilName"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="80"
                                     align="center"
                                     :label="$t('orgMateriel.materialputEmpName')"
                                     prop="materialputEmpName"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="80"
                                     align="center"
                                     :label="$t('orgMateriel.goodsReadyEmpName')"
                                     prop="goodsReadyEmpName"></el-table-column>
                </el-table>
                <pagination :total="total"
                            :page.sync="listQuery.currentPage"
                            :limit.sync="listQuery.pageSize"
                            @pagination="getList" />
            </div>
            <!-- 添加编辑弹框 -->
            <el-dialog custom-class="dialog-custom"
                       :close-on-click-modal="false"
                       :close-on-press-escape="false"
                       :title="dialogStatus=='create'?$t('table.add'):$t('table.edit')"
                       :visible.sync="dialogFormVisible"
                       @close="handleClose">
                <el-form class="mini-space"
                         :model="temp"
                         :rules="rules"
                         ref="temp"
                         label-position="left"
                         label-width="120px"
                         :inline="true"
                         size="mini"
                         style='max-width: 700px; margin-left:10px;'>
                    <el-form-item :label="$t('orgMateriel.orgCode')"
                                  prop="orgCode">
                        <orgSelect class="filter-item"
                                   @selectName="selectName"
                                   :orgType="DT_ORG_TYPE.factory"
                                   v-model="temp.orgCode"
                                   :disabled="dialogStatus!='create'">
                        </orgSelect>
                    </el-form-item>
                    <el-form-item :label="$t('orgMateriel.materielCode')"
                                  prop="materielCode">
                        <el-input style="width: 165px"
                                  v-model="temp.materielCode"
                                  disabled>
                            <el-button slot="append"
                                       icon="el-icon-search"
                                       @click="handleClickMateriel"></el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item :label="$t('orgMateriel.materielName')">
                        <el-input v-model="temp.materielName"
                                  disabled></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('orgMateriel.madeTypeName')"
                                  prop="madeType">
                        <el-select size="small"
                                   v-model="temp.madeType"
                                   :placeholder="$t('table.select')">
                            <el-option v-for="item in dt_manufacture_diff"
                                       :key="item.dictItemKey"
                                       :label="item.dictItemValue"
                                       :value="item.dictItemKey"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('orgMateriel.supplyModeName')"
                                  prop="supplyMode">
                        <el-select size="small"
                                   v-model="temp.supplyMode"
                                   :placeholder="$t('table.select')">
                            <el-option v-for="item in dt_supply_mode"
                                       :key="item.dictItemKey"
                                       :label="item.dictItemValue"
                                       :value="item.dictItemKey"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('orgMateriel.safeStock')"
                                  prop="safeStock">
                        <el-input v-model="temp.safeStock"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('orgMateriel.maxStock')"
                                  prop="maxStock">
                        <el-input v-model="temp.maxStock"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('orgMateriel.minStock')"
                                  prop="minStock">
                        <el-input v-model="temp.minStock"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('orgMateriel.unloadPointName')">
                        <workCenterSelect :orgCode="temp.orgCode"
                                          workCenterType="dt_workcenter_type_wh"
                                          workCenterClass="dt_workcenter_class_platform"
                                          v-model="temp.unloadPoint">
                        </workCenterSelect>
                    </el-form-item>
                    <el-form-item :label="$t('orgMateriel.warehouseName')">
                        <warehouseSelect :orgCode="temp.orgCode"
                                         v-model="temp.warehouseCode">
                        </warehouseSelect>
                    </el-form-item>
                    <el-form-item :label="$t('orgMateriel.materialpullTypeName')">
                        <el-select size="small"
                                   v-model="temp.materialpullType"
                                   :placeholder="$t('table.select')">
                            <el-option v-for="item in dt_materialpull_type"
                                       :key="item.dictItemKey"
                                       :label="item.dictItemValue"
                                       :value="item.dictItemKey"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('orgMateriel.stockEmpName')">
                        <el-input style="width: 165px"
                                  v-model="temp.stockEmpName"
                                  disabled>
                            <el-button slot="append"
                                       icon="el-icon-search"
                                       @click="handleClickEmployee('stock')"></el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item :label="$t('orgMateriel.materialpullTime')"
                                  prop="materialpullTime">
                        <el-input v-model="temp.materialpullTime"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('orgMateriel.materialpullTimeutilName')">
                        <el-select size="small"
                                   v-model="temp.materialpullTimeutil"
                                   :placeholder="$t('table.select')">
                            <el-option v-for="item in dt_timeunit"
                                       :key="item.dictItemKey"
                                       :label="item.dictItemValue"
                                       :value="item.dictItemKey"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('orgMateriel.goodsReadyTime')"
                                  prop="goodsReadyTime">
                        <el-input v-model="temp.goodsReadyTime"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('orgMateriel.goodsReadyTimeutilName')">
                        <el-select size="small"
                                   v-model="temp.goodsReadyTimeutil"
                                   :placeholder="$t('table.select')">
                            <el-option v-for="item in dt_timeunit"
                                       :key="item.dictItemKey"
                                       :label="item.dictItemValue"
                                       :value="item.dictItemKey"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('orgMateriel.materialputTypeName')">
                        <el-select size="small"
                                   v-model="temp.materialputType"
                                   :placeholder="$t('table.select')">
                            <el-option v-for="item in dt_materialput_type"
                                       :key="item.dictItemKey"
                                       :label="item.dictItemValue"
                                       :value="item.dictItemKey"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('orgMateriel.stockContain')"
                                  prop="stockContain">
                        <el-input v-model="temp.stockContain"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('orgMateriel.materialputTime')"
                                  prop="materialputTime">
                        <el-input v-model="temp.materialputTime"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('orgMateriel.materialputTimeutilName')">
                        <el-select size="small"
                                   v-model="temp.materialputTimeutil"
                                   :placeholder="$t('table.select')">
                            <el-option v-for="item in dt_timeunit"
                                       :key="item.dictItemKey"
                                       :label="item.dictItemValue"
                                       :value="item.dictItemKey"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('orgMateriel.materialputEmpName')">
                        <el-input style="width: 165px"
                                  v-model="temp.materialputEmpName"
                                  disabled>
                            <el-button slot="append"
                                       icon="el-icon-search"
                                       @click="handleClickEmployee('materialput')"></el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item :label="$t('orgMateriel.goodsReadyEmpName')">
                        <el-input style="width: 165px"
                                  v-model="temp.goodsReadyEmpName"
                                  disabled>
                            <el-button slot="append"
                                       icon="el-icon-search"
                                       @click="handleClickEmployee('goodsReady')"></el-button>
                        </el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer"
                     class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
                    <el-button type="primary"
                               @click="dialogStatus==='create'?create():update()">{{ $t('table.confirm') }}</el-button>
                </div>
            </el-dialog>

            <el-dialog width="60%"
                       class="table_dialog"
                       custom-class="dialog-custom"
                       :title="$t('orgMateriel.materielCode')"
                       :visible.sync="materielDialogFormVisible">
                <wlxzbyzsj ref="wlxzRef"
                           :unMutiple="true"></wlxzbyzsj>
                <div slot="footer"
                     class="dialog-footer">
                    <el-button @click="materielDialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
                    <el-button type="primary"
                               @click="confirm()">{{ $t('table.confirm') }}</el-button>
                </div>
            </el-dialog>
            <el-dialog custom-class="dialog-custom"
                       class="table_dialog"
                       :title="$t('orgMateriel.employeeCode')"
                       :visible.sync="employeeDialogFormVisible">
                <personSelect @handSelectPersonnelsRows="handleDblclickEmployee"></personSelect>
                <div slot="footer"
                     class="dialog-footer">
                    <el-button @click="employeeDialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
                    <el-button type="primary"
                               @click="personConfirm()">{{ $t('table.confirm') }}</el-button>
                </div>
            </el-dialog>

            <!-- 导入弹框 -->
            <el-dialog width="60%"
                       class="table_dialog"
                       custom-class="dialog-custom"
                       :title="'组织物料参数导入'"
                       :visible.sync="importDialogVisible"
                       v-dialogDrag
                       :close-on-click-modal="false">
                <ImportFile ref="importDialog"
                            :modalNo="modalNo"></ImportFile>
            </el-dialog>
        </div>
    </div>

</template>


<script>
import * as api from '@/api/data-base/org-materiel'
import Pagination from '@/components/Pagination'
import orgSelect from '@/components/Select/orgSelect.vue'
import workCenterSelect from '@/components/Select/work-center-select.vue'
import warehouseSelect from '@/components/Select/warehouse-select.vue'
import wlxzbyzsj from '@/components/Select/wlxzbyzsj.vue'
import personSelect from '@/components/Select/personSelect.vue'
import { DICT_CODE, DT_ORG_TYPE } from '@/utils/constant'
import { mapState } from 'vuex'
import { parseTime } from "@/utils";
import ImportFile from "@/components/ImportFile";


export default {
    name: 'orgMateriel',
    components: {        Pagination,
        orgSelect, wlxzbyzsj, personSelect, workCenterSelect, warehouseSelect, ImportFile    },
    data () {
        return {
            list: null,
            total: 0,
            theight: 0,//表格高度
            listQuery: {
                currentPage: 1,
                pageSize: 15,
                materielCode: undefined,
                materielName: undefined,
                orgCode: undefined
            },
            temp: {
                goodsReadyEmp: undefined,
                goodsReadyEmpName: undefined,
                goodsReadyTime: undefined,
                goodsReadyTimeutil: undefined,
                madeType: undefined,
                materialpullTime: undefined,
                materialpullTimeutil: undefined,
                materialpullType: undefined,
                materialputEmp: undefined,
                materialputEmpName: undefined,
                materialputTime: undefined,
                materialputTimeutil: undefined,
                materialputType: undefined,
                materielCode: undefined,
                materielName: undefined,
                maxStock: undefined,
                minStock: undefined,
                orgCode: undefined,
                orgName: '',
                safeStock: undefined,
                stockContain: undefined,
                stockEmp: undefined,
                stockEmpName: undefined,
                supplyMode: undefined,
                unloadPoint: undefined,
                warehouseCode: undefined
            },
            importDialogVisible: false,//导入弹框
            modalNo: 'EXTP-BAS-0002',//导入模板编号
            materielCode: undefined,
            orgCode: undefined,
            selectCode: [],
            parentRows: [],
            dialogFormVisible: false,
            employeeDialogFormVisible: false,
            materielDialogFormVisible: false,
            dialogStatus: '',
            tableKey: 0,
            DICT_CODE: DICT_CODE,
            DT_ORG_TYPE: DT_ORG_TYPE,
            employeeType: undefined,
            rules: {
                orgCode: [
                    { required: true, message: '请选择组织编码', trigger: 'blur' }
                ],
                materielCode: [
                    { required: true, message: '请选择物料编码', trigger: 'blur' }
                ],
                madeType: [
                    { required: true, message: '请选择制造区分', trigger: 'blur' }
                ],
                supplyMode: [
                    { required: true, message: '请选择供货方式', trigger: 'blur' }
                ],
                safeStock: [
                    { pattern: /^[1-9]\d{0,11}$/, message: '由正数组成，长度不能超过12', trigger: 'blur' }
                ],
                maxStock: [
                    { pattern: /^[1-9]\d{0,11}$/, message: '由正数组成，长度不能超过12', trigger: 'blur' }
                ],
                minStock: [
                    { pattern: /^[1-9]\d{0,11}$/, message: '由正数组成，长度不能超过12', trigger: 'blur' }
                ],
                materialpullTime: [
                    { pattern: /^[0-9]{0,6}(\.[0-9]{2})?$/, message: '由正数组成，保留两位有效数，长度不能超过6', trigger: 'blur' }
                ],
                goodsReadyTime: [
                    { pattern: /^[0-9]{0,6}(\.[0-9]{2})?$/, message: '由正数组成，保留两位有效数，长度不能超过6', trigger: 'blur' }
                ],
                stockContain: [
                    { pattern: /^[1-9]\d{0,5}$/, message: '由正数组成，长度不能超过6', trigger: 'blur' }
                ],
                materialputTime: [
                    { pattern: /^[0-9]{0,6}(\.[0-9]{2})?$/, message: '由正数组成，保留两位有效数，长度不能超过6', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        ...mapState({
            dt_manufacture_diff: state => state.dict.dt_manufacture_diff,
            dt_supply_mode: state => state.dict.dt_supply_mode,
            dt_materialpull_type: state => state.dict.dt_materialpull_type,
            dt_timeunit: state => state.dict.dt_timeunit,
            dt_materialput_type: state => state.dict.dt_materialput_type
        })
    },
    mounted () {
        this.$store.dispatch('dict/getDicData', ['dt_manufacture_diff', 'dt_supply_mode', 'dt_materialpull_type', 'dt_timeunit', 'dt_materialput_type']);
        this.setTableHeight();
        //表格高度自适应
        window.onresize = () => {
            this.setTableHeight()
        };
        this.getList();
    },
    methods: {
        getList () {
            api.queryRecords(this.listQuery).then(res => {
                this.list = res.data.list
                this.total = res.data.pages.count
            })
        },
        //表格高度计算
        setTableHeight () {
            this.theight = this.$myFun.getSingleTbHeight();
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
            this.resetTemp()
            this.dialogStatus = 'create'
            this.dialogFormVisible = true
        },
        // 获取表格选中时的数据
        selectRow (val) {
            this.selectlistRow = val
        },
        handleUpdate () {//编辑弹窗
            if (this.selectlistRow && this.selectlistRow.length == 1) {
                this.readonly = true//员工编码不可以编写
                this.temp = this.selectlistRow[0] // copy obj
                api.getRecord(this.temp.orgCode, this.temp.materielCode).then(res => {
                    this.temp = res.data
                    this.dialogStatus = 'update'
                    this.dialogFormVisible = true
                    this.$nextTick(() => {
                        this.$refs['temp'].clearValidate()
                    })
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
                    // const tempData = Object.assign({}, this.temp)
                    // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
                    api.updateRecord(this.temp.orgCode, this.temp.materielCode, this.temp).then(() => {
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
        confirm () {
            if (this.$refs.wlxzRef.listSelected.length > 0) {
                this.temp.materielCode = this.$refs.wlxzRef.listSelected[0].materielCode
                this.materielDialogFormVisible = false
            } else {
                this.$message({
                    title: '警告',
                    message: '请选择一条信息',
                    type: 'warning'
                })
            }
        },
        //查询关联的员工记录
        // getUserList(code){
        //   selectuser(code).then(response =>{
        //       this.listuser = response.data
        //       // this.total = response.data.pages.count
        //       })
        // },
        // handadduser(){
        //   adduser(this.selectlistRow[0].employeeCode,this.temp).then(() => {
        //         this.handleUser()
        //         this.$message({
        //           title: '成功',
        //           message: '创建成功',
        //           type: 'success',
        //           duration: 2000
        //         })
        //       })
        // },

        handleDelete () {//删除列表
            if (this.selectlistRow && this.selectlistRow.length == 1) {
                this.$confirm('此操作将删除所选中数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    let ids = []
                    let ids1 = []
                    this.selectlistRow.forEach((val, index) => {
                        ids[index] = val.orgCode
                    })
                    this.selectlistRow.forEach((val, index) => {
                        ids1[index] = val.materielCode
                    })
                    api.deleteRecord(ids, ids1).then(() => {
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
                        this.getList()
                        this.dialogFormVisible = false
                        this.$message({
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

        resetTemp () {
            this.temp = {
                goodsReadyEmp: undefined,
                goodsReadyEmpName: undefined,
                goodsReadyTime: undefined,
                goodsReadyTimeutil: undefined,
                madeType: undefined,
                materialpullTime: undefined,
                materialpullTimeutil: undefined,
                materialpullType: undefined,
                materialputEmp: undefined,
                materialputEmpName: undefined,
                materialputTime: undefined,
                materialputTimeutil: undefined,
                materialputType: undefined,
                materielCode: undefined,
                materielName: undefined,
                maxStock: undefined,
                minStock: undefined,
                orgCode: undefined,
                orgName: '',
                safeStock: undefined,
                stockContain: undefined,
                stockEmp: undefined,
                stockEmpName: undefined,
                supplyMode: undefined,
                unloadPoint: undefined,
                warehouseCode: undefined
            }
        },
        handleClose () {
            this.resetTemp()
            this.$refs.temp.resetFields()
        },
        handleClickMateriel () {
            this.materielDialogFormVisible = true
        },
        handleDblclickMateriel (row) {
            this.temp.materielCode = row.materielCode
            this.temp.materielName = row.materielName
            this.materielDialogFormVisible = false
        },
        handleClickEmployee (employee) {
            this.employeeType = employee
            this.employeeDialogFormVisible = true
        },
        handleDblclickEmployee (row) {
            this.parentRows = row
        },
        personConfirm () {
            if (!this.parentRows[0]) {
                if (this.employeeType == 'stock') {
                    this.temp.stockEmp = ""
                    this.temp.stockEmpName = ""

                } else if (this.employeeType == 'materialput') {
                    this.temp.materialputEmp = ""
                    this.temp.materialputEmpName = ""
                } else if (this.employeeType == 'goodsReady') {
                    this.temp.goodsReadyEmp = ""
                    this.temp.goodsReadyEmpName = ""
                }
                this.employeeDialogFormVisible = false
            } else {
                if (this.employeeType == 'stock') {
                    this.temp.stockEmp = this.parentRows[0].employeeCode
                    this.temp.stockEmpName = this.parentRows[0].employeeName

                } else if (this.employeeType == 'materialput') {
                    this.temp.materialputEmp = this.parentRows[0].employeeCode
                    this.temp.materialputEmpName = this.parentRows[0].employeeName
                } else if (this.employeeType == 'goodsReady') {
                    this.temp.goodsReadyEmp = this.parentRows[0].employeeCode
                    this.temp.goodsReadyEmpName = this.parentRows[0].employeeName
                }
                this.employeeDialogFormVisible = false
            }
        },
        selectName (val) {
            this.temp.orgName = val
        },
        handleDownload () {
            this.downloadLoading = true;
            import("@/vendor/Export2Excel").then(excel => {
                const tHeader = [
                    "组织编码", "物料编码", "物料名称",
                    "制造分区", "供货方式", "安全库存",
                    "最高库存", "最低库存", "卸货点",
                    "仓库", "拉料分类", "保管员",
                    "拉料提前期", "拉料提前期单位", "备料提前期",
                    "备料提前期单位", "投料分类", "入场SNP",
                    "投料提前期", "投料提前期单位", "投料员",
                    "备料员"
                ];
                const filterVal = [
                    "orgCode", "materielCode", "materielName",
                    "madeTypeName", "supplyMode", "safeStock",
                    "maxStock", "minStock", "unloadPointName",
                    "warehouseName", "materialpullTypeName", "stockEmpName",
                    "materialpullTime", "materialpullTimeutilName", "goodsReadyTime",
                    "goodsReadyTimeutilName", "materialputTypeName", "stockContain",
                    "materialputTime", "materialputTimeutilName", "materialputEmpName",
                    "goodsReadyEmpName"
                ];
                const data = this.formatJson(filterVal, this.list);
                excel.export_json_to_excel({
                    header: tHeader,
                    data,
                    filename: "table-list"
                });
                this.downloadLoading = false;
            });
        },
        formatJson (filterVal, jsonData) {
            return jsonData.map(v =>
                filterVal.map(j => {
                    if (j === "timestamp") {
                        return parseTime(v[j]);
                    } else {
                        return v[j];
                    }
                })
            );
        },
        handleImport () {
            this.importDialogVisible = true;
            this.$nextTick(() => {
                this.$refs.importDialog.getList();
            })
        }
    }
}
</script>
