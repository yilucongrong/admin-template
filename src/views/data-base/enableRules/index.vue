<template>
    <div>
        <div class="app-container">
            <el-row>
                <el-col class="left_col"
                        :span="12">
                    <div class="filter-container">
                        <div class="filter-items">
                            <orgSelect :placeholder="$t('enable_rules.orgCode')"
                                       class="filter-item"
                                       :orgType="DT_ORG_TYPE.factory"
                                       v-model="listQuery.orgCode"></orgSelect>
                            <el-input @keyup.enter.native="handleQuery"
                                      class="filter-item"
                                      :placeholder="$t('enable_rules.warehouseCode')"
                                      size="small"
                                      v-model="listQuery.warehouseCode"></el-input>
                            <el-button class="filter-item"
                                       size="small"
                                       type="primary"
                                       icon="el-icon-search"
                                       @click="handleQuery">{{ $t('table.search') }}</el-button>
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
                            <el-table-column type="selection"
                                             width="30"></el-table-column>
                            <el-table-column show-overflow-tooltip
                                             align="center"
                                             :label="$t('enable_rules.orgName')"
                                             prop="orgName"></el-table-column>
                            <el-table-column show-overflow-tooltip
                                             align="center"
                                             :label="$t('enable_rules.warehouseCode')"
                                             prop="warehouseCode"></el-table-column>
                            <el-table-column show-overflow-tooltip
                                             align="center"
                                             :label="$t('enable_rules.warehouseName')"
                                             prop="warehouseName"></el-table-column>
                            <el-table-column show-overflow-tooltip
                                             align="center"
                                             :label="$t('enable_rules.batchRuleDiffName')"
                                             prop="batchRuleDiffName"></el-table-column>
                        </el-table>
                        <pagination :total="total"
                                    :page.sync="listQuery.currentPage"
                                    :limit.sync="listQuery.pageSize"
                                    @pagination="getList" />
                    </div>
                </el-col>

                <el-col class="right_col"
                        :span="12">
                    <div class="table-container no_t_margin">
                        <div class="oprate_btn no_b_border">
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
                                       @click="handleType"
                                       icon="el-icon-edit">{{$t('table.materialfl')}}</el-button>
                        </div>
                        <hr class="hrtLineStyle">
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
                                  @selection-change="selectRow3"
                                  @row-click="selectRowSub"
                                  ref="tb1">
                            <el-table-column type="selection"
                                             width="30"></el-table-column>
                            <el-table-column show-overflow-tooltip
                                             width="200"
                                             align="left"
                                             :label="$t('enable_rules.batchRuleDiffName')"
                                             prop="batchRuleDiffName"></el-table-column>
                            <el-table-column show-overflow-tooltip
                                             width="200"
                                             align="left"
                                             :label="$t('enable_rules.rowId')"
                                             prop="rowId"></el-table-column>
                            <el-table-column show-overflow-tooltip
                                             min-width="130"
                                             align="left"
                                             :label="$t('enable_rules.rulePrepName')"
                                             prop="rulePrepName"></el-table-column>
                        </el-table>
                        <pagination :total="total1"
                                    :page.sync="listQuery1.currentPage"
                                    :limit.sync="listQuery1.pageSize"
                                    @pagination="getList1"
                                    class="pagination-container" />
                        <hr class="hrLineStyle">
                        <el-table :key="tableKey[2]"
                                  :data="listSub"
                                  border
                                  fit
                                  :height="stheight"
                                  highlight-current-row
                                  style="width: 100%;"
                                  size="mini"
                                  cell-class-name="table-cell"
                                  header-cell-class-name="header-cell">
                            <el-table-column type="selection"
                                             fixed
                                             width="30"
                                             align="center"></el-table-column>
                            <el-table-column show-overflow-tooltip
                                             width="200"
                                             align="left"
                                             :label="$t('enable_rules.objectCode')"
                                             prop="objectCode"></el-table-column>
                            <el-table-column show-overflow-tooltip
                                             min-width="200"
                                             align="left"
                                             :label="$t('enable_rules.objectDescribe')"
                                             prop="objectDescribe"></el-table-column>
                        </el-table>
                        <pagination :total="totalSub"
                                    :page.sync="listQuery1.currentPage"
                                    :limit.sync="listQuery1.pageSize"
                                    @pagination="getList1"
                                    class="pagination-container" />
                    </div>
                    <!-- 新增编辑弹窗 -->
                    <el-dialog custom-class="dialog-custom"
                               class="table_dialog"
                               :close-on-click-modal="false"
                               :close-on-press-escape="false"
                               :title="dialogStatus=='create'?$t('table.add'):$t('table.edit')"
                               :visible.sync="dialogFormVisible"
                               ref="temp"
                               @close="handleClose">
                        <div class="filter-container border_b_1">
                            <div class="filter-items">
                                <el-input @keyup.enter.native="handleQuery"
                                          style="width: 100px;"
                                          class="filter-item"
                                          placeholder="batchRuleDiffName"
                                          size="small"
                                          v-model="temp.batchRuleDiffName"
                                          disabled></el-input>
                            </div>
                        </div>
                        <div class="table-container">
                            <el-table :key="tableKeysub"
                                      :data="list2"
                                      border
                                      fit
                                      height="315"
                                      highlight-current-row
                                      style="width: 100%;"
                                      size="mini"
                                      cell-class-name="table-cell"
                                      header-cell-class-name="header-cell"
                                      @selection-change="selectRow2"
                                      ref="dd">
                                <el-table-column type="selection"
                                                 fixed
                                                 width="30"
                                                 align="center"></el-table-column>
                                <el-table-column show-overflow-tooltip
                                                 width="100"
                                                 align="left"
                                                 :label="$t('enable_rules.rowNo')"
                                                 prop="rowId"></el-table-column>
                                <el-table-column show-overflow-tooltip
                                                 width="150"
                                                 align="left"
                                                 :label="$t('enable_rules.rulePrepCode')"
                                                 prop="rulePrepCode"></el-table-column>
                                <el-table-column show-overflow-tooltip
                                                 min-width="150"
                                                 align="left"
                                                 :label="$t('enable_rules.rulePrepName')"
                                                 prop="rulePrepName"></el-table-column>
                            </el-table>
                            <pagination :total="total2"
                                        :page.sync="listQuery2.currentPage"
                                        :limit.sync="listQuery2.pageSize"
                                        @pagination="getList"
                                        class="pagination-container" />
                        </div>
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

                    <!-- 物料分类弹窗 -->
                    <el-dialog width="40%"
                               custom-class="dialog-custom"
                               class="table_dialog"
                               :close-on-click-modal="false"
                               :close-on-press-escape="false"
                               :title="dialogStatus=='create'?$t('table.add'):$t('table.edit')"
                               :visible.sync="dialogFormVisible1"
                               @close="handleClose">
                        <div class="filter-container border_b_1">
                            <div class="filter-items">
                                <el-input @keyup.enter.native="handleQuery"
                                          style="width: 100px;"
                                          class="filter-item"
                                          :placeholder="$t('enable_rules.batchRuleDiffName')"
                                          size="small"
                                          v-model="temp.batchEnabled"></el-input>
                                <el-button class="filter-item"
                                           size="small"
                                           type="primary"
                                           @click="handleMateriel"
                                           icon="el-icon-plus">{{$t('table.add')}}</el-button>
                                <el-button class="filter-item"
                                           size="small"
                                           type="primary"
                                           @click="handleDeletefl"
                                           icon="el-icon-delete">{{$t('table.delete')}}</el-button>
                            </div>
                        </div>
                        <div class="table-container">
                            <el-table :key="tableKeysub"
                                      :data="list3"
                                      border
                                      fit
                                      height="200px"
                                      highlight-current-row
                                      style="width: 100%;"
                                      size="mini"
                                      cell-class-name="table-cell"
                                      header-cell-class-name="header-cell"
                                      @selection-change="selectRowfl">
                                <el-table-column type="selection"
                                                 fixed
                                                 width="30"
                                                 align="center"></el-table-column>
                                <el-table-column show-overflow-tooltip
                                                 width="200"
                                                 align="left"
                                                 :label="$t('enable_rules.objectCode')"
                                                 prop="objectCode"></el-table-column>
                                <el-table-column show-overflow-tooltip
                                                 min-width="200"
                                                 align="left"
                                                 :label="$t('enable_rules.objectDescribe')"
                                                 prop="objectDescribe"></el-table-column>
                            </el-table>
                            <pagination :total="total3"
                                        :page.sync="listQuery3.currentPage"
                                        :limit.sync="listQuery3.pageSize"
                                        @pagination="getList"
                                        class="pagination-container" />
                        </div>
                        <div slot="footer"
                             class="dialog-footer">
                            <el-button @click="dialogFormVisible1 = false">{{ $t('table.cancel') }}</el-button>
                            <!-- <el-button v-if="dialogStatus=='create'" type="primary" @click="create">{{$t('table.confirm')}}</el-button> -->
                        </div>
                    </el-dialog>

                    <el-dialog custom-class="dialog-custom"
                               class="table_dialog"
                               :close-on-click-modal="false"
                               :close-on-press-escape="false"
                               :title="$t('warehouse.materialClassification')"
                               :visible.sync="typeDialogVisible">
                        <materielDictItemTable @selectRow="selectTypeRow"
                                               v-if="typeDialogVisible"></materielDictItemTable>
                    </el-dialog>

                    <el-dialog custom-class="dialog-custom"
                               class="table_dialog"
                               :close-on-click-modal="false"
                               :close-on-press-escape="false"
                               :title="$t('warehouse.materialSelection')"
                               :visible.sync="partDialogVisible">
                        <wlxzbyzsj ref="wlxzRef"
                                   :orgCode="temp.orgCode"
                                   @selectRow="selectPartRow"
                                   v-if="partDialogVisible"></wlxzbyzsj>
                        <div slot="footer"
                             class="dialog-footer">
                            <el-button type="primary"
                                       @click="materialxz">{{$t('table.confirm')}}</el-button>
                        </div>
                    </el-dialog>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import * as api from "@/api/data-base/enable-rules";
import Pagination from "@/components/Pagination";
import orgSelect from "@/components/Select/orgSelect.vue";
import { DT_ORG_TYPE } from "@/utils/constant";
import * as api1 from "@/api/data-base/warehouse";
import materielDictItemTable from "@/components/Table/materiel-dict-item-table.vue";
import wlxzbyzsj from "@/components/Select/wlxzbyzsj.vue";


export default {
    name: "enableRules",
    components: {
        Pagination,
        orgSelect,
        materielDictItemTable,
        wlxzbyzsj
    },
    data () {
        return {
            list: null,
            list1: null,
            list2: null,
            list3: null,
            listSub: null,
            tableKey: [0, 1, 2],//表格索引，虚拟dom渲染表格时使用
            theight: 0,
            stheight: 0,//右子表高度
            tableKeysub: 0,
            total: 0,
            total1: 0,
            total2: 0,
            total3: 0,
            totalSub: 0,
            listQuery: {
                currentPage: 1,
                pageSize: 10,
                orgName: undefined,
                warehouseCode: undefined
            },
            listQuery1: {
                currentPage: 1,
                pageSize: 10,
                warehouseCode: undefined,
                batchRuleId: undefined
            },
            listQuery2: {
                currentPage: 1,
                pageSize: 10
            },
            listQuery3: {
                currentPage: 1,
                pageSize: 10
            },
            dto: {
                batchRuleDiff: undefined,
                batchRulePreparation: undefined
            },
            dtoupdate: {
                batchRuleDiff: undefined,
                batchRulePreparation: undefined
            },
            parentsRows3: null,
            temp: {
                orgName: undefined,
                warehouseCode: undefined,
                warehouseName: undefined,
                ruleDivision: undefined,
                ruleType: undefined,
                ruleCode: undefined,
                batchRule: undefined,
                dataItem: undefined,
                objCode: undefined,
                remark: undefined,
                typeCode: undefined,
                typeName: undefined,
                batchEnabled: undefined
            },
            dialogFormVisible: false,
            dialogFormVisible1: false,
            dialogFormVisible2: false,
            typeDialogVisible: false,
            partDialogVisible: false,
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
    },
    methods: {
        getList () {
            this.list1 = []
            this.listSub = []
            api1.queryRecords(this.listQuery).then(res => {
                this.list = res.data.list;
                this.total = res.data.pages.count;
                this.$nextTick(function () {
                    this.checked()
                })
            });
        },
        //表格高度计算
        setTableHeight () {
            this.theight = this.$myFun.getSingleTbHeight() + 52;
            this.stheight = this.theight / 2 - 23;
        },
        checked () {
            this.$refs.tb.toggleRowSelection(this.list[0], true);//官网方法，重点
        },
        getList1 () {
            this.listQuery1.warehouseCode = this.selectlistRow.warehouseCode;
            api.queryRecords(this.listQuery1).then(res => {
                this.list1 = res.data;
                this.total1 = res.data.length;
            });
        },
        getListSub () {
            api.queryItems(this.selectlistRow3.rowId).then(res => {
                this.listSub = res.data
                this.totalSub = res.data.length
            })
        },

        materialxz () { //物料选中中弹窗确认按钮
            if (this.$refs.wlxzRef.listSelected.length > 0) {
                const temp = this.$refs.wlxzRef.listSelected.map(v => {
                    let temp = {
                        warehouseCode: this.selectlistRow.warehouseCode,
                        objectCode: v.materielCode,
                        objectDescribe: v.materielName,
                        batchRuleId: this.selectlistRow3.rowId
                    };
                    return temp;
                });
                this.createByActiveName(temp);
                // this.partDialogVisible = false;
            } else {
                this.$message({
                    title: this.$t("message.warning"),
                    message: this.$t("message.checkedplease"),
                    type: "warning"
                });
            }
        },
        //  selectPartRow(rows) { //父子通信
        //     this.parentsRows = rows
        // },
        selectPartRow (rows) {
            this.parentsRows = rows

        },
        selectRow (val) { //表一复选框选中方法
            this.selectlistRow = val[val.length - 1];
            if (val.length > 1) {
                this.$refs.tb.clearSelection();
                this.$refs.tb.toggleRowSelection(val.pop());
            }
            this.$refs.tb.setCurrentRow(this.selectlistRow);
            if (this.selectlistRow) {
                this.getList1();
                this.listSub = []
            }
        },

        selectRow1 (val) {//表一单击行选中方法
            this.selectlistRow1 = val;
            this.$refs.tb.clearSelection();
            this.$refs.tb.toggleRowSelection(val); //单击行绑定点击事件
        },

        selectRow2 (val) { //新增编辑弹窗
            this.selectlistRow2 = val;
        },
        selectRow3 (val) {//表二复选框选中方法
            this.selectlistRow3 = val[val.length - 1];
            if (val.length > 1) {
                this.$refs.tb1.clearSelection();
                this.$refs.tb1.toggleRowSelection(val.pop());
            }
            if (this.selectlistRow3) {
                this.getListSub()
            }
        },
        selectRowSub (val) {//表二单击行选中方法
            this.selectlistRowSub = val;
            this.$refs.tb1.clearSelection();
            this.$refs.tb1.toggleRowSelection(val); //单击行绑定点击事件
        },
        selectRowfl (val) {
            this.selectlistRowfl = val;
        },
        selectTypeRow (rows) {
            const temp = rows.map(v => {
                let temp = {
                    warehouseCode: this.selectlistRow.warehouseCode,
                    objectCode: v.dictItemKey,
                    objectDescribe: v.dictItemValue,
                    batchRuleId: this.selectlistRow3.rowId

                };
                return temp;
            });
            this.createByActiveName1(temp);
        },


        createByActiveName (temp) {
            this.createBatch(temp);
        },
        createByActiveName1 (temp) {
            this.createfl(temp);
        },

        createfl (temp) {
            api.addRecordpc(this.selectlistRow3.rowId, temp).then(() => {
                this.getList3();
                this.typeDialogVisible = false;
                this.partDialogVisible = false;
                this.$notify({
                    title: "成功",
                    message: "新增成功",
                    type: "success",
                    duration: 2000
                });
            });
        },
        createBatch (temp) {
            api.addRecordpc(this.selectlistRow3.rowId, temp).then(() => {
                this.getList3();
                this.typeDialogVisible = false;
                this.partDialogVisible = false;
                this.$notify({
                    title: "成功",
                    message: "新增成功",
                    type: "success",
                    duration: 2000
                });
                this.getListSub()
            });
        },
        handleCreate () {
            this.resetTemp();
            if (this.selectlistRow) {
                this.dialogStatus = "create";
                this.temp.batchRuleDiffName = this.selectlistRow.batchRuleDiffName;
                api.queryRecordsbz(this.selectlistRow).then(res => {
                    this.list2 = res.data;
                    this.total2 = res.data.length;
                });
                this.dialogFormVisible = true;
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条信息",
                    type: "warning"
                });
            }
        },
        create () {
            if (this.selectlistRow2) {
                this.dto.batchRuleDiff = this.selectlistRow.batchRuleDiff;
                this.dto.batchRulePreparation = this.selectlistRow2;

                api.addRecord(this.selectlistRow.warehouseCode, this.dto).then(() => {
                    this.getList1();
                    this.dialogFormVisible = false;
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
                    message: "请选择新增信息",
                    type: "warning"
                });
            }
        },

        getList3 () {
            api.queryRecordsbfl(this.selectlistRow3.rowId).then(res => {
                this.list3 = res.data;
                this.total = res.data.length;
            });
        },
        handleType () {
            this.resetTemp();
            if (this.selectlistRow3) {
                this.dialogStatus = "create";
                this.dialogFormVisible1 = true;
                this.temp.batchEnabled = this.selectlistRow3.batchRuleDiffName;
                api.queryRecordsbfl(this.selectlistRow3.rowId).then(res => {
                    this.list3 = res.data;
                    this.total = res.data.length;
                });
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条信息",
                    type: "warning"
                });
            }
        },
        handleUpdate () {
            this.resetTemp();
            if (this.selectlistRow3) {
                this.dialogStatus = "update";
                api.queryRecordsbz1(this.selectlistRow3.rowId).then(res => {
                    let b = [];
                    let a = res.data
                    api.queryRecordsbz(this.selectlistRow).then(res => {
                        b = res.data
                        this.temp.batchRuleDiffName = this.selectlistRow3.batchRuleDiffName;
                        this.dialogFormVisible = true;
                        this.list2 = res.data;
                        this.total2 = res.data.length;
                        this.$nextTick(function () {
                            // //在渲染之后执行toggleRowSelection方法
                            // this.$refs.dd.toggleRowSelection(this.list2[b.indexOf(a[0])]); //判断a的值是不是在b数组里并返回索引
                            b.forEach((val, index) => {
                                a.forEach((val1) => {
                                    if (val.rulePrepCode == val1.rulePrepCode) {
                                        this.$refs.dd.toggleRowSelection(this.list2[index])
                                    }
                                })
                            })
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
        update () {
            // this.dtoupdate.batchRuleId=this.selectlistRow3.rowId
            this.dtoupdate.batchRuleDiff = this.selectlistRow3.batchRuleDiff;
            this.dtoupdate.batchRulePreparation = this.selectlistRow2;
            api.updateRecord(this.selectlistRow3.rowId, this.dtoupdate).then(() => {
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

        handleDelete () {
            if (this.selectlistRow3) {
                this.$confirm("此操作将永久删除该文件,是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    api.deleteRecord(this.selectlistRow3.rowId).then(() => {
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
                });
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条信息",
                    type: "warning"
                });
            }
        },
        handleDeletefl () {
            if (this.selectlistRowfl && this.selectlistRowfl.length == 1) {
                this.$confirm("此操作将永久删除该文件,是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    api.deleteRecordfl(this.selectlistRow3.rowId, this.selectlistRowfl[0].objectCode).then(() => {
                        this.getList3();
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
        handleMateriel () {
            if (this.temp.batchEnabled == "按物料分类") {
                this.typeDialogVisible = true;
            }
            if (this.temp.batchEnabled == "全作用") {
                this.typeDialogVisible = true;
            } else if (this.temp.batchEnabled == "按物料编码") {
                this.partDialogVisible = true;
                // this.$nextTick(()=>{
                //     this.$refs.wlxzRef.listSelected = [...this.list3];
                //     this.$refs.wlxzRef.getList();
                // })

            }
        },
        handleLead () { },

        update1 () { },

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
        handleClose () {
            this.resetTemp();
        },
        toggleSelection (rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.dd.toggleRowSelection(row);
                });
            } else {
                this.$refs.dd.clearSelection();
            }
        },
        resetTemp () {
            this.temp = {
                orgName: undefined,
                warehouseCode: undefined,
                warehouseName: undefined,
                ruleDivision: undefined,
                ruleType: undefined,
                ruleCode: undefined,
                batchRule: undefined,
                dataItem: undefined,
                objCode: undefined,
                remark: undefined
            };
        }
    }
};
</script>
<style scoped>
</style>

