<template>
    <div>
        <div class="app-container">
            <el-row>
                <el-col class="left_col"
                        :span="8">
                    <div class="filter-container">
                        <orgSelect :placeholder="$t('warehouseDistribute.orgCode')"
                                   class="filter-item"
                                   style="width: 120px;"
                                   :orgType="DT_ORG_TYPE.factory"
                                   v-model="listQuery.orgCode"></orgSelect>
                        <el-input @keyup.enter.native="handleQuery"
                                  style="width: 120px;"
                                  class="filter-item"
                                  :placeholder="$t('warehouseDistribute.warehouseCode')"
                                  size="small"
                                  v-model="listQuery.warehouseCode"></el-input>
                        <el-button class="filter-item"
                                   size="small"
                                   type="primary"
                                   icon="el-icon-search"
                                   @click="handleQuery">{{$t('table.search')}}</el-button>
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
                            <el-table-column type="selection"
                                             width="30"
                                             align="center"></el-table-column>
                            <el-table-column show-overflow-tooltip
                                             align="center"
                                             :label="$t('warehouseDistribute.orgName')"
                                             prop="orgName"></el-table-column>
                            <el-table-column show-overflow-tooltip
                                             align="center"
                                             :label="$t('warehouseDistribute.warehouseCode')"
                                             prop="warehouseCode"></el-table-column>
                            <el-table-column show-overflow-tooltip
                                             align="center"
                                             :label="$t('warehouseDistribute.warehouseName')"
                                             prop="warehouseName"></el-table-column>
                        </el-table>
                        <pagination :total="total"
                                    :page.sync="listQuery.currentPage"
                                    :layout="'total, prev, pager, next'"
                                    :limit.sync="listQuery.pageSize"
                                    @pagination="getList"
                                    class="pagination-container" />
                    </div>
                </el-col>
                <el-col class="right_col"
                        :span="16">
                    <div class="filter-container">
                        <div class="filter-items">
                            <el-input size="small"
                                      :placeholder="$t('warehouseDistribute.materielCode')"
                                      v-model="listQuery1.materielCode"
                                      class="filter-item"
                                      @keyup.enter.native="handleQuery" />
                            <el-input size="small"
                                      style="width: 165px"
                                      v-model="listQuery1.stockEmpName"
                                      :placeholder="$t('warehouseDistribute.storeman')">
                                <el-button slot="append"
                                           icon="el-icon-search"
                                           @click="handlegPersonnel"></el-button>
                            </el-input>
                            <el-input size="small"
                                      style="width: 165px"
                                      v-model="listQuery1.goodsReadyEmpName"
                                      :placeholder="$t('warehouseDistribute.stockman')">
                                <el-button slot="append"
                                           icon="el-icon-search"
                                           @click="handlegPersonnel1"></el-button>
                            </el-input>
                            <el-input size="small"
                                      style="width: 165px"
                                      v-model="listQuery1.materialputEmpName"
                                      :placeholder="$t('warehouseDistribute.feeder')">
                                <el-button slot="append"
                                           icon="el-icon-search"
                                           @click="handlegPersonnel2"></el-button>
                            </el-input>
                            <el-button class="filter-item"
                                       type="primary"
                                       size="small"
                                       icon="el-icon-search"
                                       @click="handleQuerysub">{{ $t('table.search') }}</el-button>
                        </div>
                    </div>
                    <div class="table-container no_t_margin no_t_border">
                        <div class="oprate_btn">
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
                                       @click="handleLead"
                                       icon="el-icon-download">{{$t('table.import')}}</el-button>
                            <el-button class="filter-item"
                                       size="small"
                                       type="primary"
                                       @click="handleSet"
                                       icon="el-icon-setting">{{$t('table.parameterSetting')}}</el-button>
                        </div>
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
                                  @selection-change="selectRow2">
                            <el-table-column type="selection"
                                             fixed
                                             width="30"
                                             align="center"></el-table-column>
                            <el-table-column show-overflow-tooltip
                                             width="130"
                                             align="left"
                                             :label="$t('warehouseDistribute.warehouseCode')"
                                             prop="warehouseCode"></el-table-column>
                            <el-table-column show-overflow-tooltip
                                             width="130"
                                             align="left"
                                             :label="$t('warehouseDistribute.warehouseName')"
                                             prop="warehouseName"></el-table-column>
                            <el-table-column show-overflow-tooltip
                                             width="130"
                                             align="left"
                                             :label="$t('warehouseDistribute.materielCode')"
                                             prop="materielCode"></el-table-column>
                            <el-table-column show-overflow-tooltip
                                             width="130"
                                             align="left"
                                             :label="$t('warehouseDistribute.materielName')"
                                             prop="materielName"></el-table-column>
                            <el-table-column show-overflow-tooltip
                                             width="130"
                                             align="left"
                                             :label="$t('warehouseDistribute.storeman')"
                                             prop="stockEmpName"></el-table-column>
                            <el-table-column show-overflow-tooltip
                                             width="130"
                                             align="left"
                                             :label="$t('warehouseDistribute.stockman')"
                                             prop="goodsReadyEmpName"></el-table-column>
                            <el-table-column show-overflow-tooltip
                                             min-width="130"
                                             align="left"
                                             :label="$t('warehouseDistribute.feeder')"
                                             prop="materialputEmpName"></el-table-column>
                            <el-table-column show-overflow-tooltip
                                             min-width="130"
                                             align="left"
                                             :label="$t('warehouseDistribute.creator')"
                                             prop="creator"></el-table-column>
                            <el-table-column show-overflow-tooltip
                                             min-width="130"
                                             align="left"
                                             :label="$t('warehouseDistribute.createTime')"
                                             prop="createTime"></el-table-column>
                            <el-table-column show-overflow-tooltip
                                             min-width="130"
                                             align="left"
                                             :label="$t('warehouseDistribute.updator')"
                                             prop="updator"></el-table-column>
                            <el-table-column show-overflow-tooltip
                                             min-width="130"
                                             align="left"
                                             :label="$t('warehouseDistribute.updateTime')"
                                             prop="updateTime"></el-table-column>
                        </el-table>
                        <pagination :total="total1"
                                    :page.sync="listQuery1.currentPage"
                                    :limit.sync="listQuery1.pageSize"
                                    @pagination="getList1"
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
                                 :model="temp"
                                 :rules="rules"
                                 ref="temp"
                                 label-position="left"
                                 label-width="100px"
                                 :inline="true"
                                 size="mini"
                                 style="max-width: 600px;">
                            <el-form-item :label="$t('warehouseDistribute.warehouseCode')"
                                          prop="warehouseCode">
                                <el-input style="width: 165px"
                                          v-model="temp.warehouseCode"
                                          disabled></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('warehouseDistribute.warehouseName')"
                                          prop="warehouseName">
                                <el-input style="width: 165px"
                                          v-model="temp.warehouseName"
                                          disabled></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('warehouseDistribute.materielCode')"
                                          prop="materielCode">
                                <el-input style="width: 165px"
                                          v-model="temp.materielCode">
                                    <el-button slot="append"
                                               icon="el-icon-search"
                                               @click="handleClickMateriel"></el-button>
                                </el-input>
                            </el-form-item>
                            <el-form-item :label="$t('warehouseDistribute.materielName')"
                                          prop="materielName">
                                <el-input v-model="temp.materielName"
                                          disabled></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('warehouseDistribute.storeman')"
                                          prop="stockEmpName">
                                <el-input style="width: 165px"
                                          v-model="temp.stockEmpName">
                                    <el-button slot="append"
                                               icon="el-icon-search"
                                               @click="handlegPersonnel"></el-button>
                                </el-input>
                            </el-form-item>
                            <el-form-item :label="$t('warehouseDistribute.stockman')"
                                          prop="goodsReadyEmpName">
                                <el-input style="width: 165px"
                                          v-model="temp.goodsReadyEmpName">
                                    <el-button slot="append"
                                               icon="el-icon-search"
                                               @click="handlegPersonnel1"></el-button>
                                </el-input>
                            </el-form-item>
                            <el-form-item :label="$t('warehouseDistribute.feeder')"
                                          prop="materialputEmpName">
                                <el-input style="width: 165px"
                                          v-model="temp.materialputEmpName">
                                    <el-button slot="append"
                                               icon="el-icon-search"
                                               @click="handlegPersonnel2"></el-button>
                                </el-input>
                            </el-form-item>
                            <el-form-item :label="$t('warehouseDistribute.state')"
                                          prop="state">
                                <el-radio-group v-model="temp.state">
                                    <el-radio :label="1">采用</el-radio>
                                    <el-radio :label="0">冻结</el-radio>
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
                               :title="dialogStatus=='createcssz'?$t('table.cssz'):$t('table.edit')"
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
                                 style="width: 400px;">
                            <el-form-item :label="$t('warehouseDistribute.storeman')"
                                          prop="stockEmpName">
                                <el-input style="width: 165px"
                                          v-model="temp.stockEmpName">
                                    <el-button slot="append"
                                               icon="el-icon-search"
                                               @click="handlegPersonnel"></el-button>
                                </el-input>
                            </el-form-item>
                            <el-form-item :label="$t('warehouseDistribute.stockman')"
                                          prop="goodsReadyEmpName">
                                <el-input style="width: 165px"
                                          v-model="temp.goodsReadyEmpName">
                                    <el-button slot="append"
                                               icon="el-icon-search"
                                               @click="handlegPersonnel1"></el-button>
                                </el-input>
                            </el-form-item>
                            <el-form-item :label="$t('warehouseDistribute.feeder')"
                                          prop="materialputEmpName">
                                <el-input style="width: 165px"
                                          v-model="temp.materialputEmpName">
                                    <el-button slot="append"
                                               icon="el-icon-search"
                                               @click="handlegPersonnel2"></el-button>
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

                    <el-dialog width="60%"
                               custom-class="dialog-custom"
                               class="table_dialog"
                               title="选择搜索物料编码"
                               :visible.sync="gysxzDialogFormVisible"
                               v-dialogDrag
                               :close-on-click-modal="false">
                        <wlxzbyzsj ref="wlxzQMRef"></wlxzbyzsj>
                        <div slot="footer"
                             class="dialog-footer">
                            <el-button v-if="dialogStatus=='update1'"
                                       type="primary"
                                       @click="update1">{{$t('table.confirm')}}</el-button>
                            <el-button v-else
                                       type="primary"
                                       @click="update2">{{$t('table.confirm')}}</el-button>
                        </div>
                    </el-dialog>
                    <!-- 保管员-->
                    <el-dialog custom-class="dialog-custom"
                               class="table_dialog"
                               :title="$t('warehouseDistribute.stockman')"
                               :visible.sync="bgPersonnelDialogFormVisible"
                               v-dialogDrag
                               :close-on-click-modal="false">
                        <personSelect @handSelectPersonnelsRows="purchasingPersonnels"
                                      ref="ww"></personSelect>
                        <div slot="footer"
                             class="dialog-footer">
                            <el-button type="primary"
                                       @click="update3">{{$t('table.confirm')}}</el-button>
                        </div>
                    </el-dialog>
                    <!-- 备料员-->
                    <el-dialog custom-class="dialog-custom"
                               class="table_dialog"
                               :title="$t('warehouseDistribute.stockman')"
                               :visible.sync="blPersonnelDialogFormVisible1"
                               v-dialogDrag
                               :close-on-click-modal="false">
                        <personSelect @handSelectPersonnelsRows="purchasingPersonnels"
                                      ref="ww1"></personSelect>
                        <div slot="footer"
                             class="dialog-footer">
                            <el-button type="primary"
                                       @click="update4">{{$t('table.confirm')}}</el-button>
                        </div>
                    </el-dialog>
                    <!-- 投料员-->
                    <el-dialog custom-class="dialog-custom"
                               class="table_dialog"
                               :title="$t('warehouseDistribute.feeder')"
                               :visible.sync="tlPersonnelDialogFormVisible2"
                               v-dialogDrag
                               :close-on-click-modal="false">
                        <personSelect @handSelectPersonnelsRows="purchasingPersonnels"
                                      ref="ww2"></personSelect>
                        <div slot="footer"
                             class="dialog-footer">
                            <el-button type="primary"
                                       @click="update5">{{$t('table.confirm')}}</el-button>
                        </div>
                    </el-dialog>
                    <!-- 导入弹框 -->
                    <el-dialog custom-class="dialog-custom"
                               class="table-container"
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
import orgSelect from "@/components/Select/orgSelect.vue";
import { DT_ORG_TYPE } from "@/utils/constant";
import personSelect from "@/components/Select/personSelect.vue";
import ImportFile from "@/components/ImportFile";
import wlxzbyzsj from "@/components/Select/wlxzbyzsj.vue";

export default {
    name: "warehouseDistribute",
    components: {
        Pagination,
        orgSelect,
        personSelect,
        ImportFile,
        wlxzbyzsj
    },
    data () {
        return {
            list: null,
            list1: null,
            theight: 0,
            stheight: 0,//右子表高度
            tableKey: [0, 1],//表格索引，虚拟dom渲染表格时使用
            total: 0,
            total1: 0,
            listQuery: {
                currentPage: 1,
                pageSize: 15,
                orgName: undefined,
                warehouseCode: undefined
            },
            listQuery1: {
                currentPage: 1,
                pageSize: 15,
                warehouseCode: undefined,
                orgCode: undefined,
                stockEmpName: undefined,
                stockEmp: undefined,
            },

            dtos1: {
                warehouseCode: undefined,
                materielCode: undefined,
                materielName: undefined,
                stockEmp: undefined,
                stockEmpName: undefined,
                goodsReadyEmp: undefined,
                goodsReadyEmpName: undefined,
                materialputEmp: undefined,
                materialputEmpName: undefined,
                state: undefined,
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
            parentsRows3: [],
            parentsRows2: null,
            temp: {
                orgName: undefined,
                warehouseCode: undefined,
                warehouseName: undefined,
                purchaseName: undefined,
                materielCode: undefined,
                materielName: undefined,
                storeman: undefined,
                stockman: undefined,
                feeder: undefined
            },
            locationDialogVisible: false,
            dialogFormVisible: false,
            dialogFormVisible1: false,
            dialogFormVisible2: false,
            gysxzDialogFormVisible: false,
            materielDialogFormVisible: false,
            bgPersonnelDialogFormVisible: false,
            blPersonnelDialogFormVisible1: false,
            tlPersonnelDialogFormVisible2: false,
            importDialogVisible: false,//导入弹框
            modalNo: 'EXTP-BAS-0001',//导入模板编号
            dialogStatus: "",
            // DICT_CODE: DICT_CODE,
            DT_ORG_TYPE: DT_ORG_TYPE,
            // TWO_STATE_OPTIONS: TWO_STATE_OPTIONS,
            rules: {}
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
        this.getList();
    },
    methods: {
        getList () {//查询组织
            api1.queryRecords(this.listQuery).then(res => {
                this.list = res.data.list;
                this.total = res.data.pages.count;
            });
        },
        //表格高度计算
        setTableHeight () {
            this.theight = this.$myFun.getSingleTbHeight() + 55;
            this.stheight = this.theight - 42;
        },
        getList1 () {//查询仓库物料
            this.listQuery1.warehouseCode = this.selectlistRow.warehouseCode;
            this.listQuery1.orgCode = this.selectlistRow.orgCode;
            api.queryRecords(this.listQuery1).then(res => {
                console.log(res, '9')
                this.list1 = res.data.list;
                // console.log(this.list)
                this.total1 = res.data.pages.count;
            });
        },

        handleCreate () {//新增方法
            this.resetTemp();
            if (this.selectlistRow) {
                this.dialogStatus = "create";
                this.temp.warehouseCode = this.selectlistRow.warehouseCode;
                this.temp.warehouseName = this.selectlistRow.warehouseName;
                this.dialogFormVisible = true;
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条信息",
                    type: "warning"
                });
            }
        },
        create () {//新增方法
            // this.dtos.warehouseCode=this.temp.warehouseCode
            // this.dtos.materielCode=this.temp.materielCode
            // this.dtos.materielName=this.temp.materielName
            // this.dtos.stockEmpName=this.temp.stockEmpName
            // this.dtos.goodsReadyEmpName=this.temp.goodsReadyEmpName
            // this.dtos.materialputEmpName=this.temp.materialputEmpName
            // this.dtos.state=this.temp.state
            // this.dtos.orgName=this.selectlistRow.orgName
            // this.dtos.orgCode=this.selectlistRow.orgCode
            // this.dtos=this.temp
            api.addRecord(this.temp).then(() => {
                this.getList1();
                this.dialogFormVisible = false;
                this.$notify({
                    title: "成功",
                    message: "新增成功",
                    type: "success",
                    duration: 2000
                });
                this.$refs.xz.qx();
            });
        },
        handleUpdate () {//编辑方法
            this.resetTemp();
            if (this.selectlistRow2 && this.selectlistRow2.length == 1) {
                this.dialogStatus = "update";
                this.temp = this.selectlistRow2[0];
                this.dialogFormVisible = true;
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条信息",
                    type: "warning"
                });
            }
        },
        update () {//编辑方法
            // this.dtos1.warehouseCode=this.temp.warehouseCode
            // this.dtos1.warehouseName=this.temp.warehouseName
            // this.dtos1.materielCode=this.temp.materielCode
            // this.dtos1.materielName=this.temp.materielName
            // this.dtos1.stockEmp=this.selectlistRow2[0].stockEmp
            // this.dtos1.stockEmpName=this.temp.stockEmpName
            // this.dtos1.goodsReadyEmp=this.selectlistRow2[0].goodsReadyEmp
            // this.dtos1.goodsReadyEmpName=this.temp.goodsReadyEmpName
            // this.dtos1.materialputEmp=this.selectlistRow2[0].materialputEmp
            // this.dtos1.materialputEmpName=this.temp.materialputEmpName
            // this.dtos1.state=this.temp.state
            // this.dtos1.orgCode=this.selectlistRow2[0].orgCode
            // this.dtos1.orgName=this.selectlistRow2[0].orgName
            this.dtos1 = this.selectlistRow2[0];
            api.updateRecord(this.selectlistRow2[0].rowId, this.dtos1).then(() => {
                this.getList1();
                this.dialogFormVisible = false;
                this.$notify({
                    title: "成功",
                    message: "编辑成功",
                    type: "success",
                    duration: 2000
                });
                this.$refs.xz.qx();
            });
        },
        handleDelete () {//删除方法
            if (this.selectlistRow2 && this.selectlistRow2.length == 1) {
                this.$confirm("此操作将永久删除该文件，是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    api.deleteRecord(this.selectlistRow2[0].rowId).then(() => {
                        this.getList1();
                        this.$notify({
                            title: "成功",
                            message: "删除成功",
                            type: "success",
                            duration: 2000
                        });
                    });
                }).catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                })
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条信息",
                    type: "warning"
                });
            }
        },
        handleSet () {//参数设置
            // this.resetTemp()
            if (this.selectlistRow2 && this.selectlistRow2.length > 0) {
                this.dialogStatus = "createcssz";
                this.temp.stockEmpName = this.selectlistRow2[0].stockEmpName;
                this.temp.goodsReadyEmpName = this.selectlistRow2[0].goodsReadyEmpName;
                this.temp.materialputEmpName = this.selectlistRow2[0].materialputEmpName;
                this.dialogFormVisible1 = true;
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择信息",
                    type: "warning"
                });
            }
        },
        createcssz () { //参数设置
            let b = this.selectlistRow2.map(v => {
                return v.rowId;
            });
            this.dtoscssz.rowIds = b;
            this.dtoscssz.stockEmp = this.selectlistRow2[0].stockEmp;
            this.dtoscssz.stockEmpName = this.temp.stockEmpName;
            this.dtoscssz.goodsReadyEmp = this.selectlistRow2[0].goodsReadyEmp;
            this.dtoscssz.goodsReadyEmpName = this.temp.goodsReadyEmpName;
            this.dtoscssz.materialputEmp = this.selectlistRow2[0].materialputEmp;
            this.dtoscssz.materialputEmpName = this.temp.materialputEmpName;
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
        handleLead () {//导入
            this.importDialogVisible = true;
            this.$nextTick(() => {
                this.$refs.importDialog.getList();
            })
        },
        handlegPersonnel () {//业务人员（保管员）
            this.bgPersonnelDialogFormVisible = true;
        },
        handlegPersonnel1 () {//业务人员（备料员）
            this.blPersonnelDialogFormVisible1 = true;
            //  this.$refs.ww1.dd1()
        },
        handlegPersonnel2 () {//业务人员（投料员）
            this.tlPersonnelDialogFormVisible2 = true;
            // this.$refs.ww2.dd1()
        },
        purchasingPersonnels (row) { //业务人员选中行
            this.parentsRows3 = row;
        },
        handSelectRows1 (row) { //物料信息选中行
            this.parentsRows2 = row;
        },
        mydata () { },
        handleCreatewl () {//新增物料弹窗
            if (this.selectlistRow) {
                this.dialogStatus = "update1";
                this.gysxzDialogFormVisible = true;
                this.$nextTick(function () {
                    this.$refs.wlxzQMRef.getList();
                })
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条信息",
                    type: "warning"
                });
            }
        },
        handleClickMateriel () {//新增
            //  this.$refs.xz.qx();
            this.gysxzDialogFormVisible = true;
            this.$nextTick(function () {
                this.$refs.wlxzQMRef.getList();
            })
        },

        update1 () {//新增物料确认按钮
            if (this.$refs.wlxzQMRef.listSelected.length) {
                // this.temp.supplierCode = this.parentsRows3[0].employeeCode;
                let a = this.$refs.wlxzQMRef.listSelected.map(v => {
                    v.orgCode = this.selectlistRow.orgCode;
                    v.orgName = this.selectlistRow.orgName;
                    v.warehouseCode = this.selectlistRow.warehouseCode;
                    return v;
                });
                console.log(a, "999");
                api.addRecord1(a).then(() => {
                    this.getList1();
                    this.gysxzDialogFormVisible = false;
                    this.$notify({
                        title: "成功",
                        message: "新增成功",
                        type: "success",
                        duration: 2000
                    });
                    this.$refs.xz.qx();
                });
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条信息",
                    type: "warning"
                });
            }
        },
        update2 () {//新增中物料编码弹窗确认按钮
            if (this.$refs.wlxzQMRef.listSelected.length == 1) {
                this.temp.orgCode = this.selectlistRow.orgCode;
                this.temp.orgName = this.selectlistRow.orgName;
                this.temp.materielCode = this.$refs.wlxzQMRef.listSelected[0].materielCode;
                this.temp.materielName = this.$refs.wlxzQMRef.listSelected[0].materielName;
                this.gysxzDialogFormVisible = false;
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条信息",
                    type: "warning"
                });
            }
        },
        update3 () {//保管员中弹窗确认按钮
            if (this.dialogFormVisible || this.dialogFormVisible1) {
                if (!this.parentsRows3[0]) {
                    this.temp.stockEmpName = "";
                    this.temp.stockEmp = "";
                    this.bgPersonnelDialogFormVisible = false;
                } else {
                    this.temp.stockEmpName = this.parentsRows3[0].employeeName;
                    this.temp.stockEmp = this.parentsRows3[0].employeeCode;
                    this.bgPersonnelDialogFormVisible = false;
                }
            } else {
                if (!this.parentsRows3[0]) {
                    this.listQuery1.stockEmpName = "";
                    this.listQuery1.stockEmp = "";
                    this.temp.stockEmpName = ""
                    this.bgPersonnelDialogFormVisible = false;
                } else {
                    this.listQuery1.stockEmp = this.parentsRows3[0].employeeCode;
                    this.listQuery1.stockEmpName = this.parentsRows3[0].employeeName;
                    this.temp.stockEmpName = ""
                    this.bgPersonnelDialogFormVisible = false;
                }

            }
        },
        update4 () {//备料员中弹窗确认按钮
            if (this.dialogFormVisible || this.dialogFormVisible1) {
                if (!this.parentsRows3[0]) {
                    this.temp.goodsReadyEmpName = "";
                    this.temp.goodsReadyEmp = "";
                    this.blPersonnelDialogFormVisible1 = false;

                } else {
                    this.temp.goodsReadyEmpName = this.parentsRows3[0].employeeName;
                    this.temp.goodsReadyEmp = this.parentsRows3[0].employeeCode;
                    this.blPersonnelDialogFormVisible1 = false;
                }
            } else {
                if (!this.parentsRows3[0]) {
                    this.listQuery1.goodsReadyEmp = "";
                    this.listQuery1.goodsReadyEmpName = "";
                    this.temp.goodsReadyEmpName = ""
                    this.blPersonnelDialogFormVisible1 = false;
                } else {
                    this.listQuery1.goodsReadyEmp = this.parentsRows3[0].employeeCode;
                    this.listQuery1.goodsReadyEmpName = this.parentsRows3[0].employeeName;
                    this.temp.goodsReadyEmpName = ""
                    this.blPersonnelDialogFormVisible1 = false;
                }
            }
        },

        update5 () {//投料员中弹窗确认按钮

            if (this.dialogFormVisible || this.dialogFormVisible1) {
                if (!this.parentsRows3[0]) {
                    this.temp.materialputEmpName = "";
                    this.temp.materialputEmp = "";
                    this.tlPersonnelDialogFormVisible2 = false;
                } else {
                    this.temp.materialputEmpName = this.parentsRows3[0].employeeName;
                    this.temp.materialputEmp = this.parentsRows3[0].employeeCode;
                    this.tlPersonnelDialogFormVisible2 = false;
                }
            } else {
                if (!this.parentsRows3[0]) {
                    this.listQuery1.materialputEmp = "";
                    this.listQuery1.materialputEmpName = "";
                    this.temp.materialputEmpName = ""
                    this.tlPersonnelDialogFormVisible2 = false;
                } else {
                    this.listQuery1.materialputEmp = this.parentsRows3[0].employeeCode;
                    this.listQuery1.materialputEmpName = this.parentsRows3[0].employeeName;
                    this.temp.materialputEmpName = ""
                    this.tlPersonnelDialogFormVisible2 = false;
                }

            }


        },
        handleQuery () {
            this.listQuery.currentPage = 1;
            this.getList();
        },
        handleQuerysub () {
            this.getList1();
        },
        handleSizeChange (val) {
            this.listQuery.pageSize = val;
            this.getList();
        },
        handleCurrentChange (val) {
            this.listQuery.currentPage = val;
            this.getList();
        },
        handleClose () {
            this.resetTemp();
            this.$refs.temp.resetFields();
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
        selectRow2 (val) {//表二复选框选中方法
            this.selectlistRow2 = val;
        },

        resetTemp () {
            this.temp = {
                materielCode: undefined,
                materielName: undefined,
                warehouseCode: undefined,
                warehouseName: undefined,
                state: 1,
                stockEmpName: undefined,
                goodsReadyEmpName: undefined,
                materialputEmpName: undefined
            };
        }
    }
};
</script>
<style scoped>
</style>

