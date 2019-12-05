<template>
    <div>
        <div class="app-container">
            <el-row>
                <el-col class="left_col"
                        :span="8">
                    <div class="filter-container">
                        <div class="filter-items">
                            <div class="select-element">
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
                            </div>
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
                                  @selection-change="selectRow"
                                  @row-click="selectRow1"
                                  ref="tb">
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
                                    :layout="'total, prev, pager, next'"
                                    :page.sync="listQuery.currentPage"
                                    :limit.sync="listQuery.pageSize"
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
                                       icon="el-icon-edit">{{$t('table.parameterSetting')}}</el-button>
                        </div>
                        <hr class="hrLineStyle">
                        <el-table :key="tableKey[1]"
                                  :data="list1"
                                  border
                                  fit
                                  :height="stheight"
                                  highlight-current-row
                                  style="width: 100%;"
                                  size="mini"
                                  cell-class-name="table-cell"
                                  header-cell-class-name="header-cell"
                                  @selection-change="selectRow2"
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
                                    :page.sync="listQuery1.currentPage"
                                    :limit.sync="listQuery1.pageSize"
                                    @pagination="getList1"
                                    class="pagination-container" />
                    </div>
                </el-col>
                <!-- 新增编辑弹窗 -->
                <el-dialog custom-class="dialog-custom"
                           :close-on-click-modal="false"
                           :close-on-press-escape="false"
                           :title="dialogStatus=='create'?$t('table.add'):$t('table.edit')"
                           :visible.sync="dialogFormVisible"
                           @close="handleClose">
                    <el-form class="small-space"
                             :model="temp"
                             :rules="rules"
                             ref="temp"
                             label-position="left"
                             label-width="100px"
                             :inline="true"
                             size="mini"
                             style="max-width: 600px; ">
                        <el-form-item :label="$t('storage_material_distribution.warehouseCode')"
                                      prop="warehouseCode">
                            <el-input style="width: 165px"
                                      v-model="temp.warehouseCode"
                                      disabled></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('storage_material_distribution.warehouseName')"
                                      prop="warehouseName">
                            <el-input style="width: 165px"
                                      v-model="temp.warehouseName"
                                      disabled></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('storage_material_distribution.areaCode')"
                                      prop="areaCode">
                            <el-input style="width: 165px"
                                      v-model="temp.areaCode"
                                      disabled></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('storage_material_distribution.areaName')"
                                      prop="areaName">
                            <el-input style="width: 165px"
                                      v-model="temp.areaName"
                                      disabled></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('storage_material_distribution.locationCode')"
                                      prop="locationCode">
                            <el-input style="width: 165px"
                                      v-model="temp.locationCode"
                                      disabled></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('storage_material_distribution.locationName')"
                                      prop="locationName">
                            <el-input style="width: 165px"
                                      v-model="temp.locationName"
                                      disabled></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('storage_material_distribution.materielCode')"
                                      prop="materielCode">
                            <el-input style="width: 165px"
                                      v-model="temp.materielCode">
                                <el-button slot="append"
                                           icon="el-icon-search"
                                           @click="handleClickMateriel"></el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item :label="$t('storage_material_distribution.materielName')"
                                      prop="materielName">
                            <el-input v-model="temp.materielName"
                                      disabled></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('storage_material_distribution.stockEmpName')"
                                      prop="stockEmpName">
                            <el-input style="width: 165px"
                                      v-model="temp.stockEmpName"
                                      disabled>
                                <el-button slot="append"
                                           icon="el-icon-search"
                                           @click="handlegPersonnel"></el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item :label="$t('storage_material_distribution.state')"
                                      prop="state">
                            <el-radio-group v-model="temp.state">
                                <el-radio :label="1">有效</el-radio>
                                <el-radio :label="0">无效</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-form>
                    <div slot="footer"
                         class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
                        <el-button v-if="dialogStatus=='create'"
                                   type="primary"
                                   @click="create">{{$t('table.confirm')}}</el-button>
                        <el-button v-else
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
                           :visible.sync="dialogFormVisible1"
                           @close="handleClose">
                    <el-form class="small-space"
                             :model="temp"
                             :rules="rules"
                             ref="temp"
                             label-position="left"
                             label-width="80px"
                             :inline="true"
                             size="mini"
                             style="width: 400px; ">
                        <el-form-item :label="$t('storage_material_distribution.stockEmpName')"
                                      prop="stockEmpName">
                            <el-input style="width: 165px"
                                      v-model="temp.stockEmpName"
                                      disabled>
                                <el-button slot="append"
                                           icon="el-icon-search"
                                           @click="handlegPersonnel"></el-button>
                            </el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer"
                         class="dialog-footer">
                        <el-button @click="dialogFormVisible1 = false">{{ $t('table.cancel') }}</el-button>
                        <el-button v-if="dialogStatus=='createcssz'"
                                   type="primary"
                                   @click="createcssz">{{$t('table.confirm')}}</el-button>
                        <el-button v-else
                                   type="primary"
                                   @click="update">{{$t('table.confirm')}}</el-button>
                    </div>
                </el-dialog>
                <!-- 新增物料弹窗 -->
                <el-dialog class="table_dialog"
                           custom-class="dialog-custom"
                           :close-on-click-modal="false"
                           :title="$t('warehouse.materialClassification')"
                           :visible.sync="gysxzDialogFormVisible">
                    <materielTable @selectRow="selectTypeRow"></materielTable>
                    <div slot="footer"
                         class="dialog-footer">
                        <el-button v-if="dialogStatus=='update2'"
                                   type="primary"
                                   @click="update2">{{$t('table.confirm')}}</el-button>
                        <el-button v-else
                                   type="primary"
                                   @click="update3">{{$t('table.confirm')}}</el-button>
                    </div>
                </el-dialog>

                <!-- 仓库编码 -->
                <el-dialog custom-class="dialog-custom"
                           class="table_dialog"
                           :title="$t('storage_material_distribution.warehouseCode')"
                           :visible.sync="ckbmDialogFormVisible"
                           v-dialogDrag
                           :close-on-click-modal="false">
                    <ckbm @handSelectRows="handleDblclickckbm"></ckbm>
                    <div slot="footer"
                         class="dialog-footer">
                        <el-button type="primary"
                                   @click="update1">{{$t('table.confirm')}}</el-button>
                    </div>
                </el-dialog>

                <!-- 保管员 -->
                <el-dialog class="table_dialog"
                           custom-class="dialog-custom"
                           :title="$t('warehouseDistribute.stockman')"
                           :visible.sync="purchasingPersonnelDialogFormVisible"
                           v-dialogDrag
                           :close-on-click-modal="false">
                    <personSelect @handSelectPersonnelsRows="purchasingPersonnels"
                                  ref="ww"></personSelect>
                    <div slot="footer"
                         class="dialog-footer">
                        <el-button type="primary"
                                   @click="update4">{{$t('table.confirm')}}</el-button>
                    </div>
                </el-dialog>
            </el-row>
        </div>
    </div>
</template>


<script>
import * as api1 from "@/api/data-base/warehouse";
import * as api from "@/api/data-base/warehouse-distribute";
import Pagination from "@/components/Pagination";
import { DT_ORG_TYPE } from "@/utils/constant";
import materielTable from "./materielTable";
import personSelect from "@/components/Select/personSelect"; //物料信息模块
import ckbm from "./ckbm";

export default {
    name: "storage_material_classification",
    components: {
        Pagination,
        materielTable,
        personSelect,
        ckbm,
    },
    data () {
        return {
            list: null,
            list1: null,
            tableKey: [0, 1],//表格索引，虚拟dom渲染表格时使用
            theight: 0,
            stheight: 0,//右子表高度
            total: 0,
            total1: 0,
            listQuery: {
                currentPage: 1,
                pageSize: 15,
                orgCode: undefined,
                warehouseCode: undefined
            },
            listQuery1: {
                currentPage: 1,
                pageSize: 15,
                locationCode: undefined,
                warehouseCode: undefined,
                areaCode: undefined
            },
            parentsRows: null,
            parentsRows2: null,
            parentsRows3: null,
            temp: {
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
            },
            dtos: {
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
            },
            dtos1: {
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
            },
            dtoscssz: {
                stockEmp: undefined,
                stockEmpName: undefined,
                goodsReadyEmp: undefined,
                goodsReadyEmpName: undefined,
                materialputEmp: undefined,
                materialputEmpName: undefined,
                rowIds: [],
                warehouseCode: undefined
            },
            warehouseCode: undefined,
            warehouseName: undefined,
            areaCode: undefined,
            materielCode: undefined,
            materielName: undefined,
            stockEmpName: undefined,
            state: 1,
            ckbmDialogFormVisible: false,
            locationDialogVisible: false,
            dialogFormVisible: false,
            dialogFormVisible1: false,
            dialogFormVisible2: false,
            gysxzDialogFormVisible: false,
            materielDialogFormVisible: false,
            purchasingPersonnelDialogFormVisible: false,
            dialogStatus: "",
            DT_ORG_TYPE: DT_ORG_TYPE,
            rules: {}
        };
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
        getList1 () {
            this.listQuery1.rule = 'Classified'
            api.queryRecords(this.listQuery1).then(res => {
                this.list1 = res.data.list;
                this.total1 = res.data.pages.count;
            });
        },
        selectRow (val) {//表一复选框选中方法
            this.selectlistRow = val[val.length - 1];
            this.getList1();
        },
        selectRow1 (val) {//表一单击行选中方法
            this.selectlistRow1 = val;
            this.listQuery1.warehouseCode = this.selectlistRow1.warehouseCode;
            this.listQuery1.areaCode = this.selectlistRow1.areaCode;
            this.getList1();
        },
        selectRow2 (val) {//表二复选框选中方法
            this.selectlistRow2 = val[val.length - 1];
            if (val.length > 1) {
                this.$refs.mx.clearSelection();
                this.$refs.mx.toggleRowSelection(val.pop());
            }

        },
        handleClickckbm () {//打开仓库弹窗
            this.ckbmDialogFormVisible = true;
        },
        handleDblclickckbm (row) {//仓库弹窗父子传值
            this.parentsRows = row;
        },
        selectTypeRow (row) {//物料信息选中行
            this.parentsRows2 = row;
        },
        handleCreatewl () {//新增物料弹窗
            if (this.selectlistRow1) {
                this.dialogStatus = "update2";
                this.gysxzDialogFormVisible = true;

            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条信息",
                    type: "warning"
                });
            }
        },
        update2 () {//新增物料确认按钮
            this.dtos = [];
            this.parentsRows2.forEach((item, index) => {
                let obj = {
                    areaCode: this.selectlistRow1.areaCode,
                    locationCode: this.selectlistRow1.locationCode,
                    warehouseCode: this.selectlistRow1.warehouseCode,
                    orgCode: this.parentsRows.orgCode,
                    orgName: this.parentsRows.orgName,
                    locationMaterielRule: 'Classified',
                };
                this.dtos.push(obj)
                this.dtos[index].materielCode = item.dictItemKey
                this.dtos[index].materielName = item.dictItemValue
            });
            api.addRecord1(this.dtos).then(() => {
                this.getList1();
                this.gysxzDialogFormVisible = false;
                this.$notify({
                    title: "成功",
                    message: "新增成功",
                    type: "success",
                    duration: 2000
                });
            });

        },
        update3 () {//新增物料编码弹窗确认按钮
            if (this.parentsRows2 && this.parentsRows2.length == 1) {
                this.temp.materielCode = this.parentsRows2[0].dictItemKey;
                this.temp.materielName = this.parentsRows2[0].dictItemValue;
                this.gysxzDialogFormVisible = false;
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条信息",
                    type: "warning"
                });
            }
        },
        update4 () {//保管员中弹窗确认按钮
            if (this.parentsRows3) {
                this.temp.stockEmpName = this.parentsRows3[0].employeeName;
                this.purchasingPersonnelDialogFormVisible = false;
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条信息",
                    type: "warning"
                });
            }
        },
        handleSet () {//参数设置弹窗
            if (this.selectlistRow2) {
                this.dialogStatus = "createcssz";
                this.dialogFormVisible1 = true;
                this.temp.stockEmpName = this.selectlistRow2.stockEmpName
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
            rowIdsArry.push(this.selectlistRow2.rowId);
            this.dtoscssz.rowIds = rowIdsArry;
            this.dtoscssz.stockEmp = this.temp.stockEmp;
            this.dtoscssz.stockEmpName = this.temp.stockEmpName;
            api.updateRecordcssz(this.dtoscssz).then(() => {
                this.getList1();
                this.dialogFormVisible1 = false;
                this.$notify({
                    title: "成功",
                    message: "编辑成功",
                    type: "success",
                    duration: 2000
                });
            });
        },
        handleDelete () {//删除方法
            if (this.selectlistRow2) {
                this.$confirm(this.$t('message.isDeleteContinue'), this.$t('message.prompt'), {
                    confirmButtonText: this.$t('message.yes'),
                    cancelButtonText: this.$t('message.no'),
                    type: 'warning'
                }).then(() => {
                    api.deleteRecord(this.selectlistRow2.rowId).then(() => {
                        this.getList1();
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

        handleCreate () {//新增方法
            this.resetTemp();
            if (this.selectlistRow1) {
                this.dialogStatus = "create";
                this.temp.warehouseCode = this.selectlistRow1.warehouseCode;
                this.temp.locationCode = this.selectlistRow1.locationCode;
                this.temp.areaCode = this.selectlistRow1.areaCode;
                this.temp.warehouseName = this.parentsRows.warehouseName;
                this.temp.locationName = this.selectlistRow1.locationName;
                this.temp.areaName = this.selectlistRow1.areaName;
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
            if (this.selectlistRow2) {
                this.dialogStatus = "update";
                this.temp.warehouseCode = this.selectlistRow1.warehouseCode;
                this.temp.warehouseName = this.parentsRows.warehouseName;
                this.temp.locationCode = this.selectlistRow1.locationCode;
                this.temp.locationName = this.selectlistRow1.locationName;
                this.temp.areaCode = this.selectlistRow1.areaCode;
                this.temp.areaName = this.selectlistRow1.areaName;
                this.temp.materielCode = this.selectlistRow2.materielCode;
                this.temp.materielName = this.selectlistRow2.materielName;
                this.temp.stockEmp = this.selectlistRow2.stockEmp;
                this.temp.stockEmpName = this.selectlistRow2.stockEmpName;
                this.temp.goodsReadyEmpName = this.selectlistRow2.goodsReadyEmpName;
                this.temp.materialputEmpName = this.selectlistRow2.materialputEmpName;
                this.temp.goodsReadyEmp = this.selectlistRow2.goodsReadyEmp;
                this.temp.materialputEmpName = this.selectlistRow2.materialputEmpName;
                this.dialogFormVisible = true;
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条信息",
                    type: "warning"
                });
            }
        },
        handleLead () { },
        handlegPersonnel () {//业务人员
            this.purchasingPersonnelDialogFormVisible = true;
        },
        purchasingPersonnels (row) {//保管员父子传值
            this.parentsRows3 = row;
        },
        handleClickMateriel () {//物料分类编码弹窗
            this.gysxzDialogFormVisible = true;
        },
        create () {
            this.dtos.warehouseCode = this.temp.warehouseCode;
            this.dtos.warehouseName = this.temp.warehouseName;
            this.dtos.materielCode = this.temp.materielCode;
            this.dtos.materielName = this.temp.materielName;
            this.dtos.locationCode = this.temp.locationCode;
            this.dtos.locationName = this.temp.locationName;
            this.dtos.goodsReadyEmp = this.temp.goodsReadyEmp;
            this.dtos.goodsReadyEmpName = this.temp.goodsReadyEmpName;
            this.dtos.materialputEmp = this.temp.materialputEmp;
            this.dtos.materialputEmpName = this.temp.materialputEmpName;
            this.dtos.locationMaterielRule = "Classified";
            this.dtos.areaCode = this.temp.areaCode;
            this.dtos.areaName = this.temp.areaName;
            this.dtos.stockEmp = this.temp.stockEmp;
            this.dtos.stockEmpName = this.temp.stockEmpName;
            this.dtos.state = this.temp.state;
            this.dtos.orgName = this.parentsRows.orgCode;
            this.dtos.orgCode = this.parentsRows.orgName;
            api.addRecord(this.dtos).then(() => {
                this.getList1();
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
            this.dtos1.warehouseCode = this.temp.warehouseCode;
            this.dtos1.warehouseName = this.temp.warehouseName;
            this.dtos1.materielCode = this.temp.materielCode;
            this.dtos1.materielName = this.temp.materielName;
            this.dtos1.locationCode = this.temp.locationCode;
            this.dtos1.locationName = this.temp.locationName;
            this.dtos1.areaCode = this.temp.areaCode;
            this.dtos1.areaName = this.temp.areaName;
            this.dtos1.stockEmp = this.selectlistRow2.stockEmp;
            this.dtos1.stockEmpName = this.temp.stockEmpName;
            this.dtos1.goodsReadyEmp = this.selectlistRow2.goodsReadyEmp;
            this.dtos1.goodsReadyEmpName = this.temp.goodsReadyEmpName;
            this.dtos1.materialputEmp = this.selectlistRow2.materialputEmp;
            this.dtos1.materialputEmpName = this.temp.materialputEmpName;
            this.dtos1.state = this.temp.state;
            this.dtos1.orgCode = this.selectlistRow2.orgCode;
            this.dtos1.orgName = this.selectlistRow2.orgName;
            api.updateRecord(this.selectlistRow2.rowId, this.dtos1).then(() => {
                this.getList1();
                this.dialogFormVisible = false;
                this.$notify({
                    title: "成功",
                    message: "编辑成功",
                    type: "success",
                    duration: 2000
                });
            });
        },
        update1 () {
            if (this.parentsRows) {
                this.listQuery.warehouseCode = this.parentsRows.warehouseCode;
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
            this.$refs.temp.resetFields();
        },
        resetTemp () {
            this.temp = {
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

