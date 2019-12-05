<template>
    <div>
        <div class="app-container">
            <div class="filter-container">
                <div class="filter-items">
                    <el-select size="small"
                               v-model="listQuery.qcType"
                               @keyup.enter.native="handleQuery"
                               :placeholder="$t('purchaseWarehousingTable.qcType')">
                        <el-option v-for="item in dt_quality_inspection_type"
                                   :key="item.dictItemKey"
                                   :label="item.dictItemValue"
                                   :value="item.dictItemKey">
                        </el-option>
                    </el-select>
                    <el-button class="filter-item"
                               type="primary"
                               size="small"
                               icon="el-icon-search"
                               @click="handleQuery">{{ $t('table.search') }}</el-button>
                </div>
            </div>
            <div class="table-container">
                <div class="oprate_btn">
                    <el-button size="small"
                               class="filter-item"
                               type="primary"
                               icon="el-icon-plus"
                               @click="handleCreate">{{ $t('table.add') }}</el-button>
                    <el-button size="small"
                               class="filter-item"
                               type="primary"
                               icon="el-icon-edit"
                               @click="handleModify">{{ $t('table.edit') }}</el-button>
                    <el-button size="small"
                               class="filter-item"
                               type="primary"
                               icon="el-icon-delete"
                               @click="handleDelete">{{ $t('table.delete') }}</el-button>
                </div>
                <el-table :key="tableKey"
                          :data="list"
                          border
                          fit
                          :height="theight"
                          highlight-current-row
                          style="width: 100%;"
                          @selection-change="selectRow"
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
                                     :label="$t('purchaseWarehousingTable.qcType')"
                                     prop="qcTypeName">
                    </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="150"
                                     align="left"
                                     :label="$t('purchaseWarehousingTable.qcClass')"
                                     prop="qcClassName">
                    </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="150"
                                     align="left"
                                     :label="$t('purchaseWarehousingTable.qualified')"
                                     prop="qualifiedName">
                    </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="150"
                                     align="left"
                                     :label="$t('purchaseWarehousingTable.fixQualified')"
                                     prop="fixQualifiedName">
                    </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="150"
                                     align="left"
                                     :label="$t('purchaseWarehousingTable.unqualifiedReturn')"
                                     prop="unqualifiedReturnName">
                    </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="150"
                                     align="left"
                                     :label="$t('purchaseWarehousingTable.compromiseRetain')"
                                     prop="compromiseRetainName">
                    </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     min-width="100"
                                     align="left"
                                     :label="$t('purchaseWarehousingTable.downgradeRetain')"
                                     prop="downgradeRetainName">
                    </el-table-column>
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
                <el-form class="small-space"
                         :model="temp"
                         :rules="rules"
                         ref="temp"
                         label-position="left"
                         label-width="100px"
                         size="mini"
                         style="max-width: 400px; ">
                    <el-form-item :label="$t('purchaseWarehousingTable.qcType')"
                                  prop="qcType">
                        <el-select size="small"
                                   v-model="temp.qcType"
                                   @keyup.enter.native="handleQuery"
                                   :disabled="isEaid">
                            <el-option v-for="item in dt_quality_inspection_type"
                                       :key="item.dictItemKey"
                                       :label="item.dictItemValue"
                                       :value="item.dictItemKey">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('purchaseWarehousingTable.qcClass')"
                                  prop="qcClass">
                        <el-select size="small"
                                   v-model="temp.qcClass"
                                   @keyup.enter.native="handleQuery"
                                   :disabled="isEaid">
                            <el-option v-for="item in dt_quality_nspection_category"
                                       :key="item.dictItemKey"
                                       :label="item.dictItemValue"
                                       :value="item.dictItemKey">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('purchaseWarehousingTable.qualified')"
                                  prop="qualified">
                        <el-input v-model="temp.qualifiedName">
                            <el-button slot="append"
                                       icon="el-icon-search"
                                       @click="handleClickmts"></el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item :label="$t('purchaseWarehousingTable.fixQualified')"
                                  prop="fixQualified">
                        <el-input v-model="temp.fixQualifiedName">
                            <el-button slot="append"
                                       icon="el-icon-search"
                                       @click="handleClickmts1"></el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item :label="$t('purchaseWarehousingTable.unqualifiedReturn')"
                                  prop="unqualifiedReturn">
                        <el-input v-model="temp.unqualifiedReturnName">
                            <el-button slot="append"
                                       icon="el-icon-search"
                                       @click="handleClickmts2"></el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item :label="$t('purchaseWarehousingTable.compromiseRetain')"
                                  prop="compromiseRetain">
                        <el-input v-model="temp.compromiseRetainName">
                            <el-button slot="append"
                                       icon="el-icon-search"
                                       @click="handleClickmts3"></el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item :label="$t('purchaseWarehousingTable.downgradeRetain')"
                                  prop="downgradeRetain">
                        <el-input v-model="temp.downgradeRetainName">
                            <el-button slot="append"
                                       icon="el-icon-search"
                                       @click="handleClickmts4"></el-button>
                        </el-input>
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
                               @click="modify">{{ $t('table.confirm') }}</el-button>
                </div>
            </el-dialog>

            <!-- 移动类型选择 -->
            <el-dialog custom-class="dialog-custom"
                       :title="$t('purchaseWarehousingTable.mobileTypeSelection')"
                       :visible.sync="mtsDialogFormVisible"
                       v-dialogDrag
                       :close-on-click-modal="false">
                <mobileTypeSelection @handSelectRows="handleDblclickmts"></mobileTypeSelection>
                <div slot="footer"
                     class="dialog-footer">
                    <el-button type="primary"
                               @click="update">{{$t('table.confirm')}}</el-button>
                </div>
            </el-dialog>

            <el-dialog custom-class="dialog-custom"
                       :title="$t('purchaseWarehousingTable.mobileTypeSelection')"
                       :visible.sync="mtsDialogFormVisible1"
                       v-dialogDrag
                       :close-on-click-modal="false">
                <mobileTypeSelection @handSelectRows="handleDblclickmts"></mobileTypeSelection>
                <div slot="footer"
                     class="dialog-footer">
                    <el-button type="primary"
                               @click="update1">{{$t('table.confirm')}}</el-button>
                </div>
            </el-dialog>
            <el-dialog custom-class="dialog-custom"
                       :title="$t('purchaseWarehousingTable.mobileTypeSelection')"
                       :visible.sync="mtsDialogFormVisible2"
                       v-dialogDrag
                       :close-on-click-modal="false">
                <mobileTypeSelection @handSelectRows="handleDblclickmts"></mobileTypeSelection>
                <div slot="footer"
                     class="dialog-footer">
                    <el-button type="primary"
                               @click="update2">{{$t('table.confirm')}}</el-button>
                </div>
            </el-dialog>
            <el-dialog custom-class="dialog-custom"
                       :title="$t('purchaseWarehousingTable.mobileTypeSelection')"
                       :visible.sync="mtsDialogFormVisible3"
                       v-dialogDrag
                       :close-on-click-modal="false">
                <mobileTypeSelection @handSelectRows="handleDblclickmts"></mobileTypeSelection>
                <div slot="footer"
                     class="dialog-footer">
                    <el-button type="primary"
                               @click="update3">{{$t('table.confirm')}}</el-button>
                </div>
            </el-dialog>
            <el-dialog custom-class="dialog-custom"
                       :title="$t('purchaseWarehousingTable.mobileTypeSelection')"
                       :visible.sync="mtsDialogFormVisible4"
                       v-dialogDrag
                       :close-on-click-modal="false">
                <mobileTypeSelection @handSelectRows="handleDblclickmts"></mobileTypeSelection>
                <div slot="footer"
                     class="dialog-footer">
                    <el-button type="primary"
                               @click="update4">{{$t('table.confirm')}}</el-button>
                </div>
            </el-dialog>
        </div>
    </div>

</template>

<script>
import * as api from "@/api/data-base/purchaseWarehousingTable";
import Pagination from "@/components/Pagination";
import { mapState } from "vuex";
import mobileTypeSelection from "./mobileTypeSelection";
export default {
    name: "purchaseWarehousingTable",
    components: { Pagination, mobileTypeSelection },
    data () {
        return {
            list: null,
            total: 0,
            theight: 0,//表格高度
            listQuery: {
                page: true,
                currentPage: 1,
                pageSize: 15,
                qcType: undefined
            },
            temp: {
                qcClass: undefined,
                qcType: undefined,
                qcClassName: undefined,
                qcTypeName: undefined,
                qualified: undefined,
                fixQualified: undefined,
                unqualifiedReturn: undefined,
                compromiseRetain: undefined,
                downgradeRetain: undefined
            },
            isEaid: false,
            mtsDialogFormVisible: false,
            mtsDialogFormVisible1: false,
            mtsDialogFormVisible2: false,
            mtsDialogFormVisible3: false,
            mtsDialogFormVisible4: false,
            dialogFormVisible: false,
            dialogStatus: "",
            tableKey: 0,
            rules: {
                qcClass: [{ required: true, message: "质检类型不能为空", trigger: "blur" }],
                qcType: [{ required: true, message: "质检类型不能为空", trigger: "blur" }],
                qualified: [{ required: true, message: "质检类型不能为空", trigger: "blur" }],
                fixQualified: [{ required: true, message: "质检类型不能为空", trigger: "blur" }],
                unqualifiedReturn: [{ required: true, message: "质检类型不能为空", trigger: "blur" }],
                compromiseRetain: [{ required: true, message: "质检类型不能为空", trigger: "blur" }],
                downgradeRetain: [{ required: true, message: "质检类型不能为空", trigger: "blur" }]
            }
        };
    },
    computed: {
        ...mapState({
            dt_quality_inspection_type: state => state.dict.dt_quality_inspection_type,
            dt_quality_nspection_category: state => state.dict.dt_quality_nspection_category
        })
    },
    mounted () {
        this.$store.dispatch("dict/getDicData", ["dt_quality_inspection_type", "dt_quality_nspection_category"]);
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
                this.list = res.data.list;
                this.total = res.data.pages.count;
            });
        },
        //表格高度计算
        setTableHeight () {
            this.theight = this.$myFun.getSingleTbHeight();
        },
        handleQuery () {//查询
            this.listQuery.currentPage = 1;
            this.getList();
        },
        handleCreate () {//新增
            this.resetTemp();
            this.dialogStatus = "create";
            this.dialogFormVisible = true;
        },
        selectRow (val) {
            this.selectlistRow = val;
        },
        handleClickmts () {
            this.mtsDialogFormVisible = true;
        },
        handleClickmts1 () {
            this.mtsDialogFormVisible1 = true;
        },
        handleClickmts2 () {
            this.mtsDialogFormVisible2 = true;
        },
        handleClickmts3 () {
            this.mtsDialogFormVisible3 = true;
        },
        handleClickmts4 () {
            this.mtsDialogFormVisible4 = true;
        },
        handleDblclickmts (row) {
            this.parentsRows = row;

        },


        //合格弹窗确认
        update () {
            if (this.parentsRows.length && this.parentsRows.length == 1) {
                this.temp.qualifiedName = this.parentsRows[0].wareRuleName;
                this.temp.qualified = this.parentsRows[0].wareRuleCode;
                this.mtsDialogFormVisible = false;
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条信息",
                    type: "warning"
                });
            }
        },
        //返修合格确认
        update1 () {
            if (this.parentsRows.length && this.parentsRows.length == 1) {
                this.temp.fixQualifiedName = this.parentsRows[0].wareRuleName;
                this.temp.fixQualified = this.parentsRows[0].wareRuleCode;
                this.mtsDialogFormVisible1 = false;
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条信息",
                    type: "warning"
                });
            }
        },
        //不合格退回确认
        update2 () {
            if (this.parentsRows.length && this.parentsRows.length == 1) {
                this.temp.unqualifiedReturnName = this.parentsRows[0].wareRuleName;
                this.temp.unqualifiedReturn = this.parentsRows[0].wareRuleCode;
                this.mtsDialogFormVisible2 = false;
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条信息",
                    type: "warning"
                });
            }
        },
        //让步留用确认
        update3 () {
            if (this.parentsRows.length && this.parentsRows.length == 1) {
                this.temp.compromiseRetainName = this.parentsRows[0].wareRuleName;
                this.temp.compromiseRetain = this.parentsRows[0].wareRuleCode;
                this.mtsDialogFormVisible3 = false;
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条信息",
                    type: "warning"
                });
            }
        },
        //降级留用确认
        update4 () {
            if (this.parentsRows.length && this.parentsRows.length == 1) {
                this.temp.downgradeRetainName = this.parentsRows[0].wareRuleName;
                this.temp.downgradeRetain = this.parentsRows[0].wareRuleCode;
                this.mtsDialogFormVisible4 = false;
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条信息",
                    type: "warning"
                });
            }
        },
        //修改确认
        handleModify () {
            if (this.selectlistRow && this.selectlistRow.length == 1) {
                this.isEaid = true;
                this.temp = this.selectlistRow[0];
                this.dialogStatus = "modify";
                this.dialogFormVisible = true;
                this.$nextTick(() => {
                    this.$refs["temp"].clearValidate();
                });
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条信息",
                    type: "warning"
                });
            }

        },
        //修改确认按钮
        modify () {
            this.$refs["temp"].validate(valid => {
                if (valid) {
                    api.updateRecord(this.temp).then(() => {
                        this.getList();
                        this.dialogFormVisible = false;
                        this.$message({
                            title: "成功",
                            message: "更新成功",
                            type: "success",
                            duration: 2000
                        });
                    });
                }
            });

        },
        handleDelete () { //删除列表
            if (this.selectlistRow && this.selectlistRow.length == 1) {
                this.$confirm("此操作将删除所选中数据, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    let ids = [];
                    this.selectlistRow.forEach((val, index) => {
                        ids[index] = val.rowId;
                    });
                    api.deleteRecord(ids).then(() => {
                        this.getList(),
                            this.$message({
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
        //新增确认按钮
        create () {
            this.$refs.temp.validate(valid => {
                if (valid) {
                    api.addRecord(this.temp).then(() => {
                        this.getList();
                        this.dialogFormVisible = false;
                        this.$message({
                            title: "成功",
                            message: "新增成功",
                            type: "success",
                            duration: 2000
                        });
                    });
                } else {
                    return false;
                }
            });

        },
        cancel () {//取消弹窗按钮
            this.dialogFormVisible = false;
        },
        resetTemp () {
            this.temp = {
                qcClass: undefined,
                qcType: undefined,
                qcClassName: undefined,
                qcTypeName: undefined,
                qualified: undefined,
                fixQualified: undefined,
                unqualifiedReturn: undefined,
                compromiseRetain: undefined,
                downgradeRetain: undefined
            };
        },
        handleClose () {
            this.resetTemp();
            this.$refs.temp.resetFields();
        }
    }
};
</script>
