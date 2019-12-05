<template>
    <div class="app-container">
        <div class="filter-container">
            <div class="filter-items">
                <orgSelect :placeholder="$t('exemption_list.orgPurchas')"
                           class="filter-item"
                           :businessFunction="DT_ORG_FUNCTION.purchas"
                           v-model="listQuery.orgCode"></orgSelect>
                <orgSelect :placeholder="$t('exemption_list.arrivalCompany')"
                           class="filter-item"
                           :orgType="DT_ORG_TYPE.factory"
                           v-model="listQuery.toOrgCode"></orgSelect>
                <el-input size="small"
                          style="width: 165px"
                          v-model="listQuery.supplierName"
                          :placeholder="$t('exemption_list.supplierName')">
                    <el-button slot="append"
                               icon="el-icon-search"
                               @click="showGys('query')"></el-button>
                </el-input>
                <el-button class="filter-item"
                           type="primary"
                           size="small"
                           icon="el-icon-search"
                           @click="handleQuery">{{$t('table.search')}}</el-button>
            </div>
        </div>
        <div class="table-container">
            <!--主表-->
            <div class="oprate_btn">
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
            </div>
            <el-table :key="tableKey[0]"
                      :data="list"
                      border
                      fit
                      :height="theight"
                      highlight-current-row
                      style="width: 100%;"
                      @selection-change="selectRow"
                      size="mini"
                      cell-class-name="table-cell"
                      header-cell-class-name="header-cell"
                      @row-click="selectRow1"
                      ref="tb">
                <el-table-column type="selection"
                                 fixed
                                 width="30"
                                 align="center"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="100"
                                 align="left"
                                 :label="$t('exemption_list.serialNumber')"
                                 prop="rowId"></el-table-column>
                <el-table-column style="disable:none"
                                 show-overflow-tooltip
                                 width="100"
                                 align="left"
                                 :label="$t('exemption_list.orgName')"
                                 prop="orgName"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="100"
                                 align="left"
                                 :label="$t('exemption_list.arrivalCompany')"
                                 prop="toOrgCode"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="100"
                                 align="left"
                                 :label="$t('exemption_list.toOrgName')"
                                 prop="toOrgName"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="300"
                                 align="left"
                                 :label="$t('exemption_list.supplierCode')"
                                 prop="supplierCode"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="300"
                                 align="left"
                                 :label="$t('exemption_list.supplierName')"
                                 prop="supplierName"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 min-width="130"
                                 align="left"
                                 :label="$t('exemption_list.classify')"
                                 prop="uncheckTypeName"></el-table-column>
            </el-table>
            <pagination :total="total"
                        :page.sync="listQuery.currentPage"
                        :limit.sync="listQuery.pageSize"
                        @pagination="getList"
                        class="pagination-container border_b_1" />
            <div class="oprate_btn">
                <el-button class="filter-item"
                           size="small"
                           type="primary"
                           @click="handleCreatemx"
                           icon="el-icon-plus">{{$t('table.add')}}</el-button>
                <el-button class="filter-item"
                           size="small"
                           type="primary"
                           @click="handleDelete1"
                           icon="el-icon-delete">{{$t('table.delete')}}</el-button>
            </div>
            <el-table :key="tableKey[1]"
                      :data="list1"
                      border
                      fit
                      :height="theight"
                      highlight-current-row
                      style="width: 100%;"
                      @selection-change="selectRow2"
                      size="mini"
                      cell-class-name="table-cell"
                      header-cell-class-name="header-cell">
                <el-table-column type="selection"
                                 fixed
                                 width="30"
                                 align="center"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="100"
                                 align="left"
                                 :label="$t('exemption_list.serialNumber')"
                                 prop="rowId"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="400"
                                 align="left"
                                 :label="$t('exemption_list.materielCode')"
                                 prop="materielCode"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 max-width="150"
                                 align="left"
                                 :label="$t('exemption_list.materielCode')"
                                 prop="materielName"></el-table-column>
            </el-table>
            <pagination :total="total1"
                        :page.sync="listQuery1.currentPage"
                        :limit.sync="listQuery1.pageSize"
                        @pagination="getList1"
                        class="pagination-container" />
        </div>

        <!-- 供应商选择弹框 -->
        <gysxz @handleGysClick="handleGysClick"
               :title="$t('exemption_list.supplierCode')"
               ref="dialogRefgys"
               :unMutiple="true"></gysxz>
        <!-- 新增编辑弹窗 -->
        <el-dialog width="30%"
                   custom-class="dialog-custom"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false"
                   :title="dialogStatus=='create'?$t('table.add'):$t('table.edit')"
                   :visible.sync="dialogFormVisible"
                   @close="handleClose">
            <el-form :model="temp"
                     ref="temp"
                     label-width="100px"
                     size="small"
                     style="max-width: 400px; ">
                <el-form-item :label="$t('exemption_list.orgPurchas')"
                              prop="orgCode">
                    <orgSelect :placeholder="$t('exemption_list.orgPurchas')"
                               class="filter-item"
                               :businessFunction="DT_ORG_FUNCTION.purchas"
                               v-model="temp.orgCode"
                               @selectName="orgname"></orgSelect>
                </el-form-item>
                <el-form-item :label="$t('exemption_list.arrivalCompany')"
                              prop="toOrgCode">
                    <orgSelect :placeholder="$t('exemption_list.arrivalCompany')"
                               class="filter-item"
                               :orgType="DT_ORG_TYPE.factory"
                               v-model="temp.toOrgCode"
                               @selectName="orgname1"></orgSelect>
                    <!-- <dictItemSelect  :placeholder="'到货单位'"
            :dictCode="DICT_CODE.arrivalCompany"
            v-model="listQuery.arrivalCompany " class="filter-item">
            </dictItemSelect>-->
                </el-form-item>
                <el-form-item :label="$t('exemption_list.supplierCode')"
                              prop="supplierCode">
                    <el-input style="width: 165px"
                              v-model="temp.supplierCode"
                              :placeholder="$t('exemption_list.supplierCode')">
                        <el-button slot="append"
                                   icon="el-icon-search"
                                   @click="showGys('add')"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item :label="$t('exemption_list.classify')"
                              prop="uncheckTypeName">
                    <!-- <el-select size="small" v-model="temp.uncheckType" laceholder="请选择">
                <el-option label="全免" value="0" ></el-option>
                <el-option label="部分免" value="1" ></el-option>
            </el-select>-->
                    <el-radio-group v-model="temp.uncheckType">
                        <el-radio :label="1">部分免</el-radio>
                        <el-radio :label="0">全免</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer"
                 class="dialog-footer">
                <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
                <el-button v-if="dialogStatus=='create'"
                           type="primary"
                           @click="create">{{ $t('table.confirm') }}</el-button>
                <el-button v-else
                           type="primary"
                           @click="update">{{ $t('table.confirm') }}</el-button>
            </div>
        </el-dialog>

        <!-- 新增物料选择弹窗 -->
        <el-dialog custom-class="dialog-custom"
                   class="table_dialog"
                   :title="$t('exemption_list.wlxz')"
                   :visible.sync="gysxzDialogFormVisible1"
                   v-dialogDrag
                   :close-on-click-modal="false">
            <wlxz ref="wlxzRef"
                  :supplierCode='wlsupplierCode'
                  :orgCode='wlorgCode'></wlxz>
            <div slot="footer"
                 class="dialog-footer">
                <el-button type="primary"
                           @click="create1">{{ $t('table.confirm') }}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import * as api from "@/api/data-base/exemption-list";
import Pagination from "@/components/Pagination";
import orgSelect from "@/components/Select/orgSelect.vue";
import { DICT_CODE, DT_ORG_FUNCTION, DT_ORG_TYPE, THE_STATE_OPTIONS } from "@/utils/constant";
import gysxz from "@/components/Select/gysxz"; //供应商选择
import wlxz from "@/components/Select/wlxzbySourceList"; //物料信息模块

export default {
    name: "exemptionList",
    components: { Pagination, orgSelect, gysxz, wlxz },
    data () {
        return {
            list: null,
            list1: null,
            total: 0,
            total1: 0,
            theight: 0,
            wlsupplierCode: "",
            wlorgCode: "",
            ok: false,
            listQuery: {
                page: true,
                currentPage: 1,
                pageSize: 10,
                orgPurchas: undefined,
                arrivalCompany: undefined,
                supplierName: undefined
            },
            listQuery1: {
                page: true,
                currentPage: 1,
                pageSize: 10,
                supplierCode: undefined,
                orderNumber: undefined,
                uncheckId: undefined
            },

            temp: {
                orgPurchas: undefined,
                arrivalCompany: undefined,
                supplierCode: undefined,
                rowId: undefined,
                supplierName: undefined,
                classify: undefined,
                materielCode: undefined,
                materielName: undefined,
                uncheckType: 1
            },
            uncheckDTO: {
                orgCode: undefined,
                orgName: undefined,
                rowId: undefined,
                supplierCode: undefined,
                supplierName: undefined,
                toOrgCode: undefined,
                toOrgName: undefined,
                uncheckType: undefined,
                method: undefined
            },
            uncheckItemsDTOList: [],
            dto: {
                orgCode: undefined,
                orgName: undefined,
                rowId: undefined,
                supplierCode: undefined,
                supplierName: undefined,
                toOrgCode: undefined,
                toOrgName: undefined,
                uncheckType: undefined,
                method: undefined
            },
            del: {
                orgCode: undefined,
                orgName: undefined,
                rowId: undefined,
                supplierCode: undefined,
                supplierName: undefined,
                toOrgCode: undefined,
                toOrgName: undefined,
                uncheckType: undefined
            },
            dtodel: {
                materielCode: undefined,
                materielName: undefined,
                rowId: undefined
            },
            gysxzDialogFormVisible: undefined,
            gysxzDialogFormVisible1: undefined,

            // measureCode: undefined,
            selectCode: [],
            dialogFormVisible: false,
            parentsRows: [],
            dialogStatus: "",
            tableKey: [0, 1],//表格索引，虚拟dom渲染表格时使用
            isChangeAddS: false,
            DICT_CODE: DICT_CODE,
            DT_ORG_FUNCTION: DT_ORG_FUNCTION,
            DT_ORG_TYPE: DT_ORG_TYPE,
            // dimensionOptions: DICT_CODE,
            THE_STATE_OPTIONS: THE_STATE_OPTIONS
        };
    },
    created () {
        this.getList();
    },
    mounted () {
        this.setTableHeight();
        //表格高度自适应
        window.onresize = () => {
            this.setTableHeight()
        };
    },
    methods: {
        getList () {//查询主表
            api.queryRecords(this.listQuery).then(res => {
                this.list = res.data.list;
                this.total = res.data.pages.count;
            });
        },
        //表格高度计算
        setTableHeight () {
            this.theight = this.$myFun.getSingleTbHeight() - 185;
        },
        getList1 () {//查询订单明细
            this.listQuery1.uncheckId = this.selectlistRow.rowId;
            api.queryRecordsmx(this.listQuery1).then(res => {
                this.list1 = res.data.list;
                this.total1 = res.data.pages.count;
            });
        },
        //供应商显示
        showGys (val) {
            this.gysValue = val;
            this.$refs.dialogRefgys.dialogVisible = true;
        },
        //供应商确认
        handleGysClick (gysRows) {
            this.supplierRows = gysRows;
            if (this.gysValue === 'query') {
                if (!this.supplierRows[0]) {
                    this.listQuery.supplierCode = "";
                    this.listQuery.supplierName = "";
                    this.$refs.dialogRefgys.dialogVisible = false;
                } else if (this.supplierRows.length === 1) {
                    this.listQuery.supplierCode = this.supplierRows[0].supplierCode;
                    this.listQuery.supplierName = this.supplierRows[0].supplierName;
                    this.$refs.dialogRefgys.dialogVisible = false;
                }
            } else if (this.gysValue === 'add') {
                if (!this.supplierRows[0]) {
                    this.$message({
                        title: this.$t("message.warning"),
                        message: this.$t("message.checkedplease"),
                        type: "warning"
                    });
                } else if (this.supplierRows.length === 1) {
                    this.temp.supplierCode = this.supplierRows[0].supplierCode;
                    this.temp.supplierName = this.supplierRows[0].supplierName;
                    this.$refs.dialogRefgys.dialogVisible = false;
                }
            }
        },
        handleCreate () {//主表新增
            this.resetTemp();
            this.dialogStatus = "create";
            this.dialogFormVisible = true;
        },
        orgname (name) {
            this.uncheckDTO.orgName = name;
        },
        orgname1 (name) {
            this.uncheckDTO.toOrgName = name;
        },
        create () {//主表新增
            this.uncheckDTO.orgCode = this.temp.orgCode;
            // this.uncheckDTO.orgName=this.temp.orgName
            this.uncheckDTO.supplierCode = this.temp.supplierCode;
            this.uncheckDTO.supplierName = this.temp.supplierName;
            this.uncheckDTO.toOrgCode = this.temp.toOrgCode;
            // this.uncheckDTO.toOrgName=this.temp.toOrgName
            this.uncheckDTO.uncheckType = this.temp.uncheckType;
            let dd = {
                uncheckDTO: this.uncheckDTO,
                uncheckItemsDTOList: [], //不能为空
                method: "uncheck"
            };
            console.log(dd);
            this.method = "uncheck";
            api.addRecord1(dd).then(() => {
                this.dialogFormVisible = false;
                this.$notify({
                    title: "成功",
                    message: "新增成功",
                    type: "success",
                    duration: 2000
                });
                console.log(1);
                this.getList();
            });
        },
        handleCreatemx () {//新增明细
            if (this.selectlistRow) {
                setTimeout(() => {
                    this.$refs.wlxzRef.listQuery.orgCode = this.selectlistRow.orgCode;
                    this.$refs.wlxzRef.listQuery.supplierCode = this.selectlistRow.supplierCode;
                    this.$refs.wlxzRef.getList();
                }, 0);
                this.dialogStatus = "create1";
                this.gysxzDialogFormVisible1 = true;
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条信息",
                    type: "warning"
                });
            }
        },
        create1 () { //新增明细
            this.parentsRows2 = this.$refs.wlxzRef.listSelected;
            if (this.parentsRows2 && this.parentsRows2.length > 0) {
                console.log(this.parentsRows2);
                this.uncheckItemsDTOList = [];
                for (let i = 0; i < this.parentsRows2.length; i++) {
                    this.uncheckItemsDTOList[i] = {}; //必须先声明它里面的每一项都是集合
                    this.uncheckItemsDTOList[i].rowId = this.selectlistRow.rowId;
                    this.uncheckItemsDTOList[i].materielCode = this.parentsRows2[i].materielCode;
                    this.uncheckItemsDTOList[i].materielName = this.parentsRows2[i].materielName;
                }
                console.log(this.uncheckItemsDTOList);
                let mx = {
                    uncheckDTO: {},
                    uncheckItemsDTOList: this.uncheckItemsDTOList,
                    method: "uncheckItems"
                };
                api.addRecord(mx).then(() => {
                    this.getList1();
                    this.gysxzDialogFormVisible1 = false;
                    this.$notify({
                        title: "成功",
                        message: "新增成功",
                        type: "success",
                        duration: 2000
                    });
                    this.$refs.wlxzRef.clearSelection();
                });
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择信息",
                    type: "warning"
                });
            }
        },
        handleUpdate () {//编辑
            this.resetTemp();
            if (this.selectlistRow) {
                this.dialogStatus = "update";
                this.dialogFormVisible = true;
                this.temp.orgCode = this.selectlistRow.orgCode;
                this.temp.toOrgCode = this.selectlistRow.toOrgCode;
                this.temp.supplierCode = this.selectlistRow.supplierCode;
                this.temp.supplierName = this.selectlistRow.supplierName;
                this.temp.uncheckType = this.selectlistRow.uncheckType;
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条信息",
                    type: "warning"
                });
            }
        },
        update () {//编辑
            this.dto.orgCode = this.temp.orgCode;
            this.dto.orgName = this.selectlistRow.orgName;
            // console.log(this.selectlistRow1.orgName)
            this.dto.supplierCode = this.temp.supplierCode;
            this.dto.supplierName = this.temp.supplierName;
            this.dto.toOrgCode = this.temp.toOrgCode;
            this.dto.toOrgName = this.selectlistRow.toOrgName;
            this.dto.uncheckType = this.temp.uncheckType;
            console.log(this.dto.orgName);
            api.updateRecord(this.selectlistRow.rowId, this.dto).then(() => {
                this.getList();
                this.dialogFormVisible = false;
                this.$notify({
                    title: "成功",
                    message: "新增成功",
                    type: "success",
                    duration: 2000
                });
            });
        },

        handleDelete () {//主表删除
            if (this.selectlistRow) {
                this.$confirm(this.$t("message.isDeleteContinue"), this.$t("message.prompt"), {
                    confirmButtonText: this.$t("message.confirm"),
                    cancelButtonText: this.$t("message.cancel"),
                    type: "warning"
                }).then(() => {
                    this.del = this.selectlistRow;
                    api.deleteRecord(this.del).then(() => {
                        this.getList();
                        this.dialogFormVisible = false;
                        this.$notify({
                            title: this.$t("message.success"),
                            message: this.$t("message.deleteSuccessed"),
                            type: "success",
                            duration: 2000
                        });
                    });
                }).catch(() => {
                    this.$message({
                        type: "info",
                        message: this.$t("message.deleteCanceled")
                    });
                });
            } else {
                this.$message({
                    title: this.$t("message.warning"),
                    message: this.$t("message.checkedoneplease"),
                    type: "warning"
                });
            }
        },

        handleDelete1 () {//删除明细
            if (this.selectlistRow2 && this.selectlistRow2.length == 1) {
                this.$confirm(this.$t("message.isDeleteContinue"), this.$t("message.prompt"), {
                    confirmButtonText: this.$t("message.confirm"),
                    cancelButtonText: this.$t("message.cancel"),
                    type: "warning"
                }).then(() => {
                    console.log(this.selectlistRow2[0].rowId);
                    this.dtodel.rowId = this.selectlistRow2[0].rowId;
                    this.dtodel.materielCode = this.selectlistRow2[0].materielCode;
                    this.dtodel.materielName = this.selectlistRow2[0].materielName;
                    api.deleteRecordmx(this.dtodel).then(() => {
                        this.getList1();
                        this.dialogFormVisible = false;
                        this.$notify({
                            title: this.$t("message.success"),
                            message: this.$t("message.deleteSuccessed"),
                            type: "success",
                            duration: 2000
                        });
                    });
                }).catch(() => {
                    this.$message({
                        type: "info",
                        message: this.$t("message.deleteCanceled")
                    });
                })

            } else {
                this.$message({
                    title: this.$t("message.warning"),
                    message: this.$t("message.checkedoneplease"),
                    type: "warning"
                });
            }
        },
        handleQuery () {
            this.listQuery.currentPage = 1;
            this.getList();
        },
        handleSizeChange (val) {
            this.listQuery.pageSize = val;
            this.getList();
        },
        handleCurrentChange (val) {
            this.listQuery.currentPage = val;
            this.getList();
        },
        handleClickgysxz () {
            this.$refs.dialogRefgys.dialogVisible = true;
        },
        handleDblclickgysxz (row) {//父子页面通信
            this.parentsRows = row;
            // this.gysxzDialogFormVisible = false;
        },
        showGysxz () {
            this.isChangeAddS = true;
            this.gysxzDialogFormVisible = !this.gysxzDialogFormVisible;
        },
        update1 () {//供应商选中弹窗确认按钮
            if (!this.isChangeAddS) {
                if (!this.parentsRows[0]) {
                    this.listQuery.supplierCode = "";
                    this.listQuery.supplierName = "";
                    this.gysxzDialogFormVisible = false;
                } else if (this.parentsRows.length === 1) {
                    this.listQuery.supplierCode = this.parentsRows[0].supplierCode;
                    this.listQuery.supplierName = this.parentsRows[0].supplierName;
                    this.gysxzDialogFormVisible = false;
                }
            } else {
                if (!this.parentsRows[0]) {
                    this.$message({
                        title: this.$t("message.warning"),
                        message: this.$t("message.checkedplease"),
                        type: "warning"
                    });
                } else if (this.parentsRows.length === 1) {
                    this.temp.supplierCode = this.parentsRows[0].supplierCode;
                    this.temp.supplierName = this.parentsRows[0].supplierName;
                    this.gysxzDialogFormVisible = false;
                }
                this.isChangeAddS = false;
            }
        },

        handleDeleteBatch () {
            if (this.selectCode.length == 0) {
                this.$message.warning("请勾选记录！");
                return;
            }
            this.delete(this.selectCode);
        },
        selectRow (val) {//表一复选框选中方法
            this.selectlistRow = val[val.length - 1];
            if (val.length > 1) {
                this.$refs.tb.clearSelection();
                this.$refs.tb.toggleRowSelection(val.pop());
            }
            this.$refs.tb.setCurrentRow(this.selectlistRow);
            if (this.selectlistRow) {
                this.getList1();
            }
        },

        selectRow1 (val) {//表一单击行选中方法
            this.selectlistRow1 = val;
            this.$refs.tb.clearSelection();
            this.$refs.tb.toggleRowSelection(val); //单击行绑定点击事件
        },

        selectRow2 (val) {//明细表复选框选中方法
            this.selectlistRow2 = val;
        },

        cancel () {
            this.dialogFormVisible = false;
        },
        resetTemp () {
            this.temp = {
                measureCode: undefined,
                measureName: undefined,
                dimension: undefined,
                transferRate: undefined,
                isBase: 0,
                isEnabled: 1,
                remark: undefined,
                uncheckType: 1,
                supplierCode: undefined,
                supplierName: undefined
            };
        },
        handleClose () {
            this.resetTemp();
            this.$refs.temp.resetFields();
        },
        handleSelectionChange (selection) {
            this.selectCode = selection.map(v => v.measureCode);
        }
    }
};
</script>
<style >
/* .el-input {
  width: 200px;
}
.el-textarea{
  width: 200px;
}
.el-form-item__label{
  width: 120px !important
}
.el-dialog{
  width: 470px;
}
.el-dialog__footer{
  padding:  10px 76px 30px ;
}
.el-dialog__body{
  padding:30px 20px 0px 20px;
} */
</style>