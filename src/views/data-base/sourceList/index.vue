// 查询+单表
<template>
    <div>
        <div class="app-container">
            <div class="filter-container">
                <div class="filter-items">
                    <orgSelect :placeholder="$t('sourceList.orgCode')"
                               class="filter-item"
                               :businessFunction="DT_ORG_FUNCTION.purchas"
                               v-model="listQuery.orgCode"></orgSelect>
                    <el-input size="small"
                              :placeholder="$t('sourceList.materielCode')"
                              v-model="listQuery.materielCode"
                              class="filter-item"
                              @keyup.enter.native="handleQuery" />
                    <el-input size="small"
                              :placeholder="$t('sourceList.supplierCode')"
                              v-model="listQuery.supplierCode"
                              class="filter-item"
                              @keyup.enter.native="handleQuery" />
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
                               @click="handleUpdate">{{ $t('table.edit') }}</el-button>
                    <el-button size="small"
                               class="filter-item"
                               type="primary"
                               icon="el-icon-delete"
                               @click="handleDelete">{{ $t('table.delete') }}</el-button>
                    <el-button size="small"
                               class="filter-item"
                               type="primary"
                               icon="el-icon-upload2"
                               @click="handleDownload">{{ $t('table.export') }}</el-button>
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
                          @selection-change="selectRow"
                          size="mini"
                          cell-class-name="table-cell"
                          header-cell-class-name="header-cell">
                    <el-table-column type="selection"
                                     fixed
                                     width="30"
                                     align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="120"
                                     align="left"
                                     :label="$t('sourceList.orgCode')"
                                     prop="orgCode"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="120"
                                     align="left"
                                     :label="$t('sourceList.orgName')"
                                     prop="orgCodeCN"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="120"
                                     align="left"
                                     :label="$t('sourceList.materielCode')"
                                     prop="materielCode"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="120"
                                     align="left"
                                     :label="$t('sourceList.materielName')"
                                     prop="materielName"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="120"
                                     align="left"
                                     :label="$t('sourceList.supplierCode')"
                                     prop="supplierCode"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="100"
                                     align="left"
                                     :label="$t('sourceList.supplierName')"
                                     prop="supplierName"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     min-width="100"
                                     align="left"
                                     :label="$t('sourceList.state')"
                                     prop="state">
                        <template slot-scope="scope">{{scope.row.state | stateFilter}}</template>
                    </el-table-column>
                </el-table>
                <pagination :total="total"
                            :page.sync="listQuery.currentPage"
                            :limit.sync="listQuery.pageSize"
                            @pagination="getList" />
            </div>
            <!-- 新增编辑弹框 -->
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
                         label-width="100px"
                         :inline="true"
                         size="mini"
                         style="max-width: 600px; ">
                    <el-form-item :label="$t('sourceList.orgCode')"
                                  prop="orgCode">
                        <orgSelect class="filter-item"
                                   :businessFunction="DT_ORG_FUNCTION.purchas"
                                   v-model="temp.orgCode"
                                   :disabled="dialogStatus!='create'"></orgSelect>
                    </el-form-item>
                    <el-form-item :label="$t('sourceList.materielCode')"
                                  prop="materielCode">
                        <el-input style="width: 165px"
                                  v-model="temp.materielCode"
                                  disabled>
                            <el-button slot="append"
                                       icon="el-icon-search"
                                       @click="handleClickMateriel"></el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item :label="$t('sourceList.materielName')"
                                  prop="materielName">
                        <el-input v-model="temp.materielName"
                                  disabled></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('sourceList.supplierCode')"
                                  prop="supplierCode">
                        <el-input style="width: 165px"
                                  v-model="temp.supplierCode"
                                  disabled>
                            <el-button slot="append"
                                       icon="el-icon-search"
                                       @click="handleClickgysxz"></el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item :label="$t('sourceList.supplierName')"
                                  prop="supplierName">
                        <el-input v-model="temp.supplierName"
                                  disabled></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('sourceList.state')"
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
                               @click="create">{{ $t('table.confirm') }}</el-button>
                    <el-button v-else
                               type="primary"
                               @click="update">{{ $t('table.confirm') }}</el-button>
                </div>
            </el-dialog>

            <el-dialog width="60%"
                       class="table_dialog"
                       custom-class="dialog-custom"
                       :title="$t('sourceList.materielCode')"
                       :visible.sync="materielDialogFormVisible"
                       @dblclick="mydata">
                <wlxzbySourceList ref="wlxz"
                                  :unMutiple="true"></wlxzbySourceList>
                <div slot="footer"
                     class="dialog-footer">
                    <el-button type="primary"
                               @click="wlxzConfirm">{{ $t('table.confirm') }}</el-button>
                </div>
            </el-dialog>
            <!-- 供应商选择弹框 -->
            <gysxz @handleGysClick="handleGysClick"
                   :title="'供应商选择'"
                   ref="gysxz"
                   :unMutiple="true"></gysxz>
            <!-- 导入弹框 -->
            <el-dialog custom-class="dialog-custom"
                       :title="'储位物料导入'"
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
import * as api from "@/api/data-base/source-list";
import { selectlists } from '@/api/system/organization'
import Pagination from "@/components/Pagination";
import orgSelect from "@/components/Select/orgSelect.vue";
import { DT_ORG_FUNCTION } from "@/utils/constant";
import { validatorContactNumber, validatorEmail } from "@/utils/validate";
import wlxzbySourceList from "@/components/Select/wlxzbySourceList.vue";
import gysxz from "@/components/Select/gysxz"; //供应商选择
import { parseTime } from '@/utils'
import ImportFile from "@/components/ImportFile";
export default {
    name: "sourceList",
    components: {
        Pagination,
        orgSelect,
        gysxz,
        wlxzbySourceList,
        ImportFile
    },
    data () {
        return {
            list: null,
            total: 0,
            parentsRows: null,
            parentsRows1: null,
            theight: 0,//表格高度
            listQuery: {
                page: true,
                currentPage: 1,
                pageSize: 15,
                materielCode: undefined,
                supplierCode: undefined,
                orgCode: undefined
            },
            temp: {
                materielCode: undefined,
                supplierCode: undefined,
                orgCode: undefined,
                materielName: undefined,
                state: 1,
                supplierName: undefined,
                stockContain: undefined
            },
            importDialogVisible: false,//导入弹框
            modalNo: 'EXTP-BAS-0007',//导入模板编号
            orgCode: undefined,
            selectCode: [],
            dialogFormVisible: false,
            materielDialogFormVisible: false,
            gysxzDialogFormVisible: false,
            dialogStatus: "",
            tableKey: 0,

            DT_ORG_FUNCTION: DT_ORG_FUNCTION,


            rules: {
                customerCode: [
                    { required: true, message: "客户编码不能为空", trigger: "blur" },
                    { pattern: /^[A-Z-_0-9]{1,50}$/, message: "由大写字母，数字，—和_组成，长度不能超过50", trigger: "blur" }
                ],
                customerName: [
                    { required: true, message: "客户名称不能为空", trigger: "blur" },
                    { max: 100, message: "长度不能超过100", trigger: "blur" }
                ],
                contact: [{ max: 50, message: "长度不能超过50", trigger: "blur" }],
                contactNumber: [{ validator: validatorContactNumber, trigger: "blur" }],
                email: [{ validator: validatorEmail, trigger: "blur" }],
                address: [{ max: 512, message: "长度不能超过512", trigger: "blur" }],
                remark: [{ max: 512, message: "描述长度为512内", trigger: "blur" }]
            }
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
        getList () {
            selectlists().then(response => {
                api.queryRecords(this.listQuery).then(res => {
                    res.data.list.forEach((item, index) => {
                        response.data.forEach((option) => {
                            if (option.organizationCode == item['orgCode']) {
                                res.data.list[index]['orgCode' + 'CN'] = option.organizationName;
                            }
                        });
                    });
                    this.list = res.data.list;
                    this.total = res.data.pages.count;
                });
            }),
                api.queryRecords(this.listQuery).then(res => {
                    this.list = res.data.list;
                    this.total = res.data.pages.count;
                });
        },
        //表格高度计算
        setTableHeight () {
            this.theight = this.$myFun.getSingleTbHeight();
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
        handleCreate () {
            this.resetTemp();
            this.dialogStatus = "create";
            this.dialogFormVisible = true;
        },
        selectRow (val) {
            this.selectlistRow = val;
        },
        handleUpdate () {
            if (this.selectlistRow && this.selectlistRow.length == 1) {
                this.readonly = true; //组织编码不可以编写
                this.temp = this.selectlistRow[0]; // copy obj
                this.dialogStatus = "update";
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
        update () {
            this.$refs["temp"].validate(valid => {
                if (valid) {
                    api.updateRecord(this.temp.rowId, this.temp).then(() => {
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
        mydata () { },
        handleDelete () {//删除列表
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
        create () {
            this.$refs.temp.validate(valid => {
                if (valid) {
                    api.addRecord(this.temp).then(() => {
                        this.getList();
                        this.dialogFormVisible = false;
                        this.$notify({
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
        resetTemp () {
            this.temp = {
                materielCode: undefined,
                supplierCode: undefined,
                orgCode: undefined,
                materielName: undefined,
                stockContain: undefined,
                state: 1,
                supplierName: undefined
            };
        },
        handleClose () {
            this.resetTemp();
            this.$refs.temp.resetFields();
        },
        handleClickgysxz () {
            this.$refs.gysxz.dialogVisible = true;
        },
        // handleDblclickgysxz (row) {//父子页面通信
        //     this.parentsRows = row;
        // },
        handleGysClick (row) {//供应商选中弹窗确认按钮
            this.temp.supplierCode = row[0].supplierCode;
            this.temp.supplierName = row[0].supplierName;
        },
        handleClickMateriel () {
            this.materielDialogFormVisible = true;
        },
        // handleDblclickMateriel (row) {
        //     this.parentsRows1 = row;
        //     this.parentsRows1.snp = this.parentsRows1.stockContain;
        //     this.temp.materialQuality = this.parentsRows1.materialQuality;
        //     this.temp.materielCode = this.parentsRows1.materielCode;
        //     this.temp.materielName = this.parentsRows1.materielName;
        //     this.temp.materielClassify = this.parentsRows1.materielClassify;
        //     this.temp.materielGroup = this.parentsRows1.materielGroup;
        //     this.temp.measuringUnit = this.parentsRows1.measuringUnit;
        //     this.temp.measuringUnitName = this.parentsRows1.measuringUnitName;
        //     this.temp.materielType = this.parentsRows1.materielType;
        //     this.temp.specification = this.parentsRows1.specification;
        //     this.materielDialogFormVisible = false;
        // },
        wlxzConfirm () {
            if (this.$refs.wlxz.listSelected.length > 0) {
                this.temp = this.$refs.wlxz.listSelected[0]
                this.materielDialogFormVisible = false;
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条信息",
                    type: "warning"
                });
            }


        },
        selectName (val) {
            this.temp.orgCode = val;
        },
        handleDownload () {
            this.downloadLoading = true
            import('@/vendor/Export2Excel').then(excel => {
                const tHeader = [
                    '组织编码', '组织名称', '物料编码',
                    '物料名称', "供应商编码", "供应商名称",
                    '状态'
                ]
                const filterVal = [
                    'orgCode', 'orgName', 'materielCode',
                    'materielName', "supplierCode", "supplierName",
                    'state'
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
        formatJson (filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => {
                if (j === 'timestamp') {
                    return parseTime(v[j])
                } else {
                    return v[j]
                }
            }))
        },
        handleImport () {
            this.importDialogVisible = true;
            this.$nextTick(() => {
                this.$refs.importDialog.getList();
            })
        }

    }
};
</script>
