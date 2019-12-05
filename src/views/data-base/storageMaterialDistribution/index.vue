<template>
    <div>
        <div class="app-container">
            <el-row>
                <el-col class="left_col"
                        :span="8">
                    <div class="filter-container">
                        <div class="filter-items">
                            <el-input size="small"
                                      style="width: 165px"
                                      v-model="listQuery.warehouseCode"
                                      :placeholder="$t('storage_material_distribution.warehouseCode')"
                                      disabled>
                                <el-button slot="append"
                                           icon="el-icon-search"
                                           @click="handleClickckbm"></el-button>
                            </el-input>
                            <el-button class="filter-item"
                                       size="small"
                                       type="primary"
                                       icon="el-icon-search"
                                       @click="handleQuery">{{$t('table.search')}}</el-button>
                            <el-button class="filter-item"
                                       size="small"
                                       type="primary"
                                       icon="el-icon-setting"
                                       @click="handleDistribute">物料库位</el-button>
                        </div>
                    </div>
                    <div class="table-container no_t_margin no_t_border">
                        <el-table :key="tableKey[0]"
                                  :data="list"
                                  border
                                  fit
                                  highlight-current-row
                                  style="width: 100%"
                                  size="mini"
                                  cell-class-name="table-cell"
                                  :height="theight"
                                  header-cell-class-name="header-cell"
                                  @selection-change="selectRowMain"
                                  @row-click="selectRow_line"
                                  ref="tbmain">
                            <el-table-column type="selection"
                                             fixed
                                             width="30"
                                             align="center"></el-table-column>
                            <el-table-column show-overflow-tooltip
                                             align="center"
                                             :label="$t('storage_material_distribution.warehouseCode')"
                                             prop="warehouseCode"></el-table-column>
                            <el-table-column show-overflow-tooltip
                                             align="center"
                                             :label="$t('storage_material_distribution.areaCode')"
                                             prop="areaCode"></el-table-column>
                            <el-table-column show-overflow-tooltip
                                             align="center"
                                             :label="$t('storage_material_distribution.locationCode')"
                                             prop="locationCode"></el-table-column>
                        </el-table>
                        <pagination :total="total"
                                    :page.sync="listQuery.currentPage"
                                    :limit.sync="listQuery.pageSize"
                                    :layout="'total, prev, pager, next'"
                                    class="pagination-container"
                                    @pagination="getList" />
                    </div>
                </el-col>

                <el-col class="right_col"
                        :span="16">
                    <div class="table-container no_t_margin">
                        <div class="oprate_btn no_b_border">
                            <el-button class="filter-item"
                                       size="small"
                                       type="primary"
                                       @click="handleCreatewl"
                                       icon="el-icon-plus">{{$t('table.addMaterials')}}</el-button>
                            <el-button class="filter-item"
                                       size="small"
                                       type="primary"
                                       @click="handleCreate"
                                       icon="el-icon-plus">{{$t('table.add')}}</el-button>
                            <el-button class="filter-item"
                                       size="small"
                                       type="primary"
                                       @click="handleUpdate"
                                       icon="el-icon-edit">{{$t('table.edit')}}</el-button>
                            <el-button class="filter-item"
                                       size="small"
                                       type="primary"
                                       @click="handleDelete"
                                       icon="el-icon-delete">{{$t('table.delete')}}</el-button>
                            <el-button class="filter-item"
                                       size="small"
                                       type="primary"
                                       @click="handleSet"
                                       icon="el-icon-setting">{{$t('table.parameterSetting')}}</el-button>
                            <el-button class="filter-item"
                                       size="small"
                                       type="primary"
                                       @click="handleLead"
                                       icon="el-icon-download">{{$t('table.import')}}</el-button>
                        </div>
                        <hr class="hrLineStyle">
                        <el-table :key="tableKey[1]"
                                  :data="listSub"
                                  border
                                  fit
                                  :height="stheight"
                                  highlight-current-row
                                  style="width: 100%;"
                                  size="mini"
                                  cell-class-name="table-cell"
                                  header-cell-class-name="header-cell"
                                  @selection-change="selectRowSub"
                                  ref='mx'>
                            <el-table-column type="selection"
                                             fixed
                                             width="30"
                                             align="center"></el-table-column>
                            <el-table-column show-overflow-tooltip
                                             width="150"
                                             align="left"
                                             :label="$t('storage_material_distribution.warehouseCode')"
                                             prop="warehouseCode"></el-table-column>
                            <el-table-column show-overflow-tooltip
                                             width="150"
                                             align="left"
                                             :label="$t('storage_material_distribution.areaCode')"
                                             prop="areaCode"></el-table-column>
                            <el-table-column show-overflow-tooltip
                                             width="150"
                                             align="left"
                                             :label="$t('storage_material_distribution.locationCode')"
                                             prop="locationCode"></el-table-column>
                            <el-table-column show-overflow-tooltip
                                             width="150"
                                             align="left"
                                             :label="$t('storage_material_distribution.materielCode')"
                                             prop="materielCode"></el-table-column>
                            <el-table-column show-overflow-tooltip
                                             width="150"
                                             align="left"
                                             :label="$t('storage_material_distribution.materielName')"
                                             prop="materielName"></el-table-column>
                            <el-table-column show-overflow-tooltip
                                             min-width="150"
                                             align="left"
                                             :label="$t('storage_material_distribution.stockEmpName')"
                                             prop="stockEmpName"></el-table-column>
                        </el-table>
                        <pagination :total="total1"
                                    :page.sync="listQuerySub.currentPage"
                                    :limit.sync="listQuerySub.pageSize"
                                    @pagination="getlistSub"
                                    class="pagination-container" />
                    </div>
                    <!-- 新增编辑弹窗 -->
                    <el-dialog custom-class="dialog-custom"
                               :close-on-click-modal="false"
                               :close-on-press-escape="false"
                               :title="dialogStatus=='create'?$t('table.add'):$t('table.edit')"
                               :visible.sync="dialogFormVisible"
                               @close="handleClose">
                        <el-form class="small-space"
                                 :model="addList"
                                 :rules="rules"
                                 ref="maintb"
                                 label-position="left"
                                 label-width="100px"
                                 :inline="true"
                                 size="mini"
                                 style="max-width: 600px; ">
                            <el-form-item :label="$t('storage_material_distribution.warehouseCode')"
                                          prop="warehouseCode">
                                <el-input style="width: 165px"
                                          v-model="addList.warehouseCode"
                                          disabled></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('storage_material_distribution.warehouseName')"
                                          prop="warehouseName">
                                <el-input style="width: 165px"
                                          v-model="addList.warehouseName"
                                          disabled></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('storage_material_distribution.areaCode')"
                                          prop="areaCode">
                                <el-input style="width: 165px"
                                          v-model="addList.areaCode"
                                          disabled></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('storage_material_distribution.areaName')"
                                          prop="areaName">
                                <el-input style="width: 165px"
                                          v-model="addList.areaName"
                                          disabled></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('storage_material_distribution.locationCode')"
                                          prop="locationCode">
                                <el-input style="width: 165px"
                                          v-model="addList.locationCode"
                                          disabled></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('storage_material_distribution.locationName')"
                                          prop="locationName">
                                <el-input style="width: 165px"
                                          v-model="addList.locationName"
                                          disabled></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('storage_material_distribution.materielCode')"
                                          prop="materielCode">
                                <el-input style="width: 165px"
                                          v-model="addList.materielCode">
                                    <el-button slot="append"
                                               icon="el-icon-search"
                                               @click="handleClickMateriel"></el-button>
                                </el-input>
                            </el-form-item>
                            <el-form-item :label="$t('storage_material_distribution.materielName')"
                                          prop="materielName">
                                <el-input v-model="addList.materielName"
                                          disabled></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('storage_material_distribution.stockEmpName')"
                                          prop="stockEmpName">
                                <el-input style="width: 165px"
                                          v-model="addList.stockEmpName"
                                          disabled>
                                    <el-button slot="append"
                                               icon="el-icon-search"
                                               @click="handlegPersonnelForm"></el-button>
                                </el-input>
                            </el-form-item>
                            <el-form-item :label="$t('storage_material_distribution.state')"
                                          prop="state">
                                <el-radio-group v-model="addList.state">
                                    <el-radio :label=1>有效</el-radio>
                                    <el-radio :label=0>无效</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-form>
                        <div slot="footer"
                             class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
                            <el-button v-if="dialogStatus=='create'"
                                       type="primary"
                                       @click="create">{{$t('table.confirm')}}</el-button>
                            <el-button v-if="dialogStatus=='update'"
                                       type="primary"
                                       @click="update">{{$t('table.confirm')}}</el-button>
                        </div>
                    </el-dialog>

                    <!-- 参数设置弹窗 -->
                    <el-dialog width="30%"
                               custom-class="dialog-custom"
                               :close-on-click-modal="false"
                               :close-on-press-escape="false"
                               :title="$t('storage_material_distribution.parSetBulWindow')"
                               :visible.sync="dialogFormVisibleParams"
                               @close="handleCloseParams">
                        <el-form class="small-space"
                                 :model="paramList"
                                 :rules="rules"
                                 ref="paramForm"
                                 label-position="left"
                                 label-width="80px"
                                 :inline="true"
                                 size="mini"
                                 style="width: 400px; ">
                            <el-form-item :label="$t('storage_material_distribution.stockEmpName')"
                                          prop="stockEmpName">
                                <el-input style="width: 165px"
                                          v-model="paramList.stockEmpName"
                                          disabled>
                                    <el-button slot="append"
                                               icon="el-icon-search"
                                               @click="handlegPersonnel"></el-button>
                                </el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer"
                             class="dialog-footer">
                            <el-button @click="dialogFormVisibleParams = false">{{ $t('table.cancel') }}</el-button>
                            <el-button type="primary"
                                       @click="createcssz">{{$t('table.confirm')}}</el-button>
                        </div>
                    </el-dialog>

                    <el-dialog width="60%"
                               custom-class="dialog-custom"
                               class="table_dialog"
                               title="选择搜索物料编码"
                               :visible.sync="wlxzDialogFormVisible"
                               v-dialogDrag
                               :close-on-click-modal="false">
                        <zsjwlxz ref="wlxzRef"></zsjwlxz>
                        <div slot="footer"
                             class="dialog-footer">
                            <el-button v-if="dialogStatus=='confirmMateriel'"
                                       type="primary"
                                       @click="confirmMateriel">{{$t('table.confirm')}}</el-button>
                            <el-button v-else
                                       type="primary"
                                       @click="update3">{{$t('table.confirm')}}</el-button>
                        </div>
                    </el-dialog>

                    <el-dialog width="60%"
                               custom-class="dialog-custom"
                               class="table_dialog"
                               title="储位物料分配"
                               :visible.sync="ckwlDialogFormVisible"
                               v-dialogDrag
                               :close-on-click-modal="false">
                        <ckwlfp ref="wlfp"
                                :warehouseCode="warehouseCode"></ckwlfp>
                    </el-dialog>

                    <!-- 仓库编码 -->
                    <el-dialog class="table_dialog"
                               custom-class="dialog-custom"
                               :title="$t('storage_material_distribution.warehouseCode')"
                               :visible.sync="ckbmDialogFormVisible"
                               v-dialogDrag
                               :close-on-click-modal="false">
                        <ckbm @handSelectCkbmRows="confirmCkbm"></ckbm>
                        <div slot="footer"
                             class="dialog-footer">
                            <el-button type="primary"
                                       @click="confirmWarehouseCode">{{$t('table.confirm')}}</el-button>
                        </div>
                    </el-dialog>

                    <!-- 保管员 -->
                    <el-dialog custom-class="dialog-custom"
                               class="table_dialog"
                               :title="$t('warehouseDistribute.stockman')"
                               :visible.sync="keeperFormVisibleParams"
                               v-dialogDrag
                               :close-on-click-modal="false">
                        <personSelect @handSelectPersonnelsRows="purchasingPersonnels"
                                      ref="ww"></personSelect>
                        <div slot="footer"
                             class="dialog-footer">
                            <el-button v-if="dialogStatusParam==='keeperParam'"
                                       type="primary"
                                       @click="confirmKeeper">{{$t('table.confirm')}}</el-button>
                            <el-button v-if="dialogStatusParam==='keeperForm'"
                                       type="primary"
                                       @click="confirmKeeperForm">{{$t('table.confirm')}}</el-button>
                        </div>
                    </el-dialog>

                    <!-- 导入弹框 -->
                    <el-dialog custom-class="dialog-custom"
                               class="table_dialog"
                               :title="'储位物料导入'"
                               :visible.sync="importDialogVisible"
                               v-dialogDrag
                               :close-on-click-modal="false">
                        <ImportFile ref="importDialog"
                                    :modalNo="modalNo"></ImportFile>
                    </el-dialog>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import * as api1 from "@/api/data-base/warehouse";
import * as api from "@/api/data-base/warehouse-distribute";
import Pagination from "@/components/Pagination";
import ImportFile from "@/components/ImportFile";
import { DT_ORG_TYPE } from "@/utils/constant";
import personSelect from "@/components/Select/personSelect.vue"; //物料信息模块
import ckbm from "./ckbm";
import ckwlfp from "./ckwlfp";
import zsjwlxz from "@/components/Select/zsjwlxz.vue";

export default {
    name: "storageMaterialDistribution",
    components: {
        Pagination,
        personSelect,
        ckbm,
        ImportFile,
        zsjwlxz,
        ckwlfp
    },
    data () {
        return {
            list: null,
            listSub: [],
            unMutiple: false,
            theight: 0,
            stheight: 0,//右子表高度
            tableKey: [0, 1],//表格索引，虚拟dom渲染表格时使用
            total: 0,
            total1: 0,
            modalNo: 'EXTP-BAS-0004',//导入模板编号
            selectRows: {},
            selectRowsSub: {},
            listQuery: {
                currentPage: 1,
                pageSize: 15,
                warehouseCode: undefined
            },
            listQuerySub: {
                currentPage: 1,
                pageSize: 15,
                locationCode: undefined,
                warehouseCode: undefined,
                areaCode: undefined,
                rule: 'materiel'
            },
            addList: {
                warehouseCode: undefined,
                warehouseName: undefined,
                materielCode: undefined,
                materielName: undefined,
                locationCode: undefined,
                locationName: undefined,
                areaCode: undefined,
                areaName: undefined,
                stockEmp: undefined,
                stockEmpName: undefined,
                state: 1,
                orgName: undefined,
                orgCode: undefined
            },
            paramList: {
                rowIds: [],
                stockEmp: undefined,
                stockEmpName: undefined
            },
            ckbmRows: {},
            formWlRows: null,
            keeperRows: null,
            dtoscssz: {
                stockEmp: undefined,
                stockEmpName: undefined,
                rowIds: [],
                warehouseCode: undefined
            },
            ckbmDialogFormVisible: false,
            dialogFormVisible: false,
            dialogFormVisibleParams: false,
            dialogFormVisible2: false,
            importDialogVisible: false,//导入弹框
            wlxzDialogFormVisible: false,
            keeperFormVisibleParams: false,
            ckwlDialogFormVisible: false,
            warehouseCode: undefined,
            dialogStatus: "",
            dialogStatusParam: "",
            DT_ORG_TYPE: DT_ORG_TYPE,
            rules: {}
        };
    },
    watch: {
        'listQuery.warehouseCode': {
            handler (newValue) {
                this.listQuery.warehouseCode = newValue
            },
            deep: true,
            immediate: true
        }
    },
    created () {
        // this.getList()
    },
    mounted () {
        this.setTableHeight();
        //表格高度自适应
        window.onresize = () => {
            this.setTableHeight()
        };

    },
    methods: {
        getList () {
            api1.queryLocation(this.listQuery.warehouseCode, this.listQuery).then(res => {
                this.list = res.data.list;
                this.total = res.data.pages.count;
            });
        },
        //表格高度计算
        setTableHeight () {
            this.theight = this.$myFun.getSingleTbHeight() + 52;
            this.stheight = this.theight;
        },
        getlistSub () {
            // this.listQuerySub.rule = 'materiel'
            api.queryRecords(this.listQuerySub).then(res => {
                this.listSub = res.data.list;
                this.total1 = res.data.pages.count;
            });
        },
        selectRowMain (val) {//左表复选框选中方法
            this.selectRows = val[val.length - 1]
            if (val.length > 1) {
                this.$refs.tbmain.clearSelection()
                this.$refs.tbmain.toggleRowSelection(val[val.length - 1], 'selected')
            }
            if (val.length !== 0) {
                this.listQuerySub.warehouseCode = this.selectRows.warehouseCode;
                this.listQuerySub.areaCode = this.selectRows.areaCode;
                this.listQuerySub.locationCode = this.selectRows.locationCode;
                this.getlistSub();
            }
        },
        selectRow_line (val) {//左表单击行选中方法
            this.selectRows = val;
            this.$refs.tbmain.clearSelection()
            this.$refs.tbmain.toggleRowSelection(val, 'selected')
        },
        selectRowSub (val) {//右表复选框选中方法
            this.selectRowsSub = val;
            // console.log(this.selectRowsSub,11111)
            // if (val.length > 1) {
            //     this.$refs.mx.clearSelection();
            //     this.$refs.mx.toggleRowSelection(val[val.length-1],'selected');
            // }
        },
        handleDistribute () {
            if (this.listQuery.warehouseCode) {
                this.ckwlDialogFormVisible = true
                this.warehouseCode = this.listQuery.warehouseCode
            } else {
                this.$message({
                    title: "警告",
                    message: "请先选择仓库编码",
                    type: "warning"
                })
            }

        },
        //主表仓库选择设置
        handleClickckbm () {
            this.ckbmDialogFormVisible = true;
        },
        //仓库编码确认
        confirmCkbm (row) {
            this.ckbmRows = row;
        },
        confirmMateriel () {//新增物料确认按钮
            if (this.$refs.wlxzRef.listSelected.length > 0) {
                let dtos = [];
                let wlList = this.$refs.wlxzRef.listSelected;
                wlList.forEach((item) => {
                    let obj = {
                        areaCode: this.selectRows.areaCode,
                        locationCode: this.selectRows.locationCode,
                        warehouseCode: this.selectRows.warehouseCode,
                        orgCode: this.ckbmRows.orgCode,
                        orgName: this.ckbmRows.orgName,
                        materielCode: item.materielCode,
                        materielName: item.materielName,
                        locationMaterielRule: 'materiel',
                    };
                    dtos.push(obj)
                });
                api.addRecord1(dtos).then(() => {
                    this.getlistSub();
                    this.wlxzDialogFormVisible = false;
                    this.$notify({
                        title: "成功",
                        message: "新增成功",
                        type: "success",
                        duration: 2000
                    });
                });
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条信息",
                    type: "warning"
                });
            }
        },
        update3 () {//新增物料编码弹窗确认按钮
            this.formWlRows = this.$refs.wlxzRef.listSelected;
            if (this.formWlRows && this.formWlRows.length == 1) {
                this.addList.materielCode = this.formWlRows[0].materielCode;
                this.addList.materielName = this.formWlRows[0].materielName;
                this.wlxzDialogFormVisible = false;
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条信息",
                    type: "warning"
                });
            }
        },
        confirmKeeper () {//参数设置保管员中弹窗确认按钮
            if (this.keeperRows && this.keeperRows.length == 1) {
                this.paramList.stockEmpName = this.keeperRows[0].employeeName;
                this.paramList.stockEmp = this.keeperRows[0].employeeCode;
                this.keeperFormVisibleParams = false;
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条信息",
                    type: "warning"
                });
            }
        },
        confirmKeeperForm () {//新增编辑中弹窗确认按钮
            if (this.keeperRows && this.keeperRows.length == 1) {
                this.addList.stockEmpName = this.keeperRows[0].employeeName;
                this.addList.stockEmp = this.keeperRows[0].employeeCode;
                this.keeperFormVisibleParams = false;
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条信息",
                    type: "warning"
                });
            }
        },
        handleSet () {//参数设置弹窗
            console.log(this.selectRowsSub, '000')
            if (this.selectRowsSub) {
                this.dialogFormVisibleParams = true;
                console.log(this.selectRowsSub, '000')
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择信息",
                    type: "warning"
                });
            }
        },
        createcssz () {//参数设置确认
            let rowIdsArry = [];
            rowIdsArry.push(this.selectRowsSub[0].rowId);
            this.paramList.rowIds = rowIdsArry;
            api.updateRecordcssz(this.paramList).then(() => {
                this.getlistSub();
                this.dialogFormVisibleParams = false;
                this.$notify({
                    title: "成功",
                    message: "设置成功",
                    type: "success",
                    duration: 2000
                });
            });
        },
        handleDelete () {//删除方法
            if (this.selectRowsSub) {
                this.$confirm(this.$t('message.isDeleteContinue'), this.$t('message.prompt'), {
                    confirmButtonText: this.$t('message.yes'),
                    cancelButtonText: this.$t('message.no'),
                    type: 'warning'
                }).then(() => {
                    api.deleteRecord(this.selectRowsSub[0].rowId).then(() => {
                        this.getlistSub();
                        this.$notify({
                            title: "成功",
                            message: "删除成功",
                            type: "success",
                            duration: 2000
                        });
                    });
                });
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条信息",
                    type: "warning"
                });
            }
        },
        handleCreatewl () {//新增物料弹窗
            if (this.selectRows.warehouseCode) {
                this.dialogStatus = "confirmMateriel";
                this.wlxzDialogFormVisible = true;
                this.$nextTick(() => {
                    this.unMutiple = false;
                    this.$refs.wlxzRef.isEdit = true;
                    this.$refs.wlxzRef.getList();
                })
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条信息",
                    type: "warning"
                });
            }

        },
        handleCreate () {//新增方法
            // this.resetTemp();
            if (this.selectRows.warehouseCode) {
                this.dialogStatus = "create";
                this.setDefault();
                this.dialogFormVisible = true;
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条信息",
                    type: "warning"
                });
            }
        },
        handleUpdate () {//编辑方法
            // this.resetTemp();
            if (this.selectRowsSub) {
                this.dialogStatus = "update";
                this.setDefault();
                this.addList.state = this.selectRowsSub[0].state;
                this.addList.materielCode = this.selectRowsSub[0].materielCode;
                this.addList.materielName = this.selectRowsSub[0].materielName;
                this.addList.stockEmp = this.selectRowsSub[0].stockEmp;
                this.addList.materialputEmpName = this.selectRowsSub[0].materialputEmpName;
                this.dialogFormVisible = true;
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条信息",
                    type: "warning"
                });
            }
        },
        handleLead () {
            this.importDialogVisible = true;
            this.$nextTick(() => {
                this.$refs.importDialog.getList();
            })
        },
        handlegPersonnel () {//业务人员
            if (this.selectRowsSub) {
                this.dialogStatusParam = "keeperParam";
                this.keeperFormVisibleParams = true;
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条物料信息",
                    type: "warning"
                });
            }
        },
        handlegPersonnelForm () {
            if (this.selectRowsSub) {
                this.dialogStatusParam = "keeperForm";
                this.keeperFormVisibleParams = true;
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条物料信息",
                    type: "warning"
                });
            }
        },
        purchasingPersonnels (row) {
            this.keeperRows = row;
        },
        handleClickMateriel () {
            this.wlxzDialogFormVisible = true;
            this.$nextTick(() => {
                this.unMutiple = true;
                this.$refs.wlxzRef.isEdit = true;
                this.$refs.wlxzRef.getList();
            })
        },
        //固定值赋值
        setDefault () {
            this.addList.orgName = this.ckbmRows.orgCode;
            this.addList.orgCode = this.ckbmRows.orgName;
            this.addList.warehouseCode = this.ckbmRows.warehouseCode;
            this.addList.warehouseName = this.ckbmRows.warehouseName;
            this.addList.areaName = this.selectRows.areaName;
            this.addList.locationName = this.selectRows.locationName;
            this.addList.locationCode = this.selectRows.locationCode;
            this.addList.areaCode = this.selectRows.areaCode;
            this.addList.stockEmp = this.selectRows.stockEmp;
            this.addList.stockEmpName = this.selectRows.stockEmpName;
        },
        create () {
            // this.setDefault();
            this.addList.locationMaterielRule = "materiel";
            api.addRecord(this.addList).then(() => {
                this.getlistSub();
                this.dialogFormVisible = false;
                this.$notify({
                    title: "成功",
                    message: "新增成功",
                    type: "success",
                    duration: 2000
                });
            });
        },
        update () {//编辑方法
            this.addList.locationMaterielRule = "materiel";
            api.updateRecord(this.selectRowsSub[0].rowId, this.addList).then(() => {
                this.getlistSub();
                this.dialogFormVisible = false;
                this.$notify({
                    title: "成功",
                    message: "编辑成功",
                    type: "success",
                    duration: 2000
                });
            });
        },
        //仓库编码确认
        confirmWarehouseCode () {
            if (this.ckbmRows) {
                this.listQuery.warehouseCode = this.ckbmRows.warehouseCode;
                this.ckbmDialogFormVisible = false;
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条信息",
                    type: "warning"
                });
            }
        },
        handleQuery () {
            this.listQuery.currentPage = 1;
            this.getList();
        },
        handleClose () {
            this.resetTemp();
            this.$refs.maintb.resetFields();
        },
        handleCloseParams () {
            this.keeperFormVisibleParams = false;
        },
        resetTemp () {
            this.addList = {
                warehouseCode: undefined,
                warehouseName: undefined,
                materielCode: undefined,
                materielName: undefined,
                locationCode: undefined,
                locationName: undefined,
                areaCode: undefined,
                areaName: undefined,
                stockEmp: undefined,
                stockEmpName: undefined,
                goodsReadyEmp: undefined,
                goodsReadyEmpName: undefined,
                materialputEmp: undefined,
                materialputEmpName: undefined,
                state: 1,
                orgName: undefined,
                orgCode: undefined
            };
        }
    }
};
</script>
<style scoped>
</style>

