//查+上下表
<template>
    <div class="app-container">
        <div class="filter-container">
            <div class="filter-items">
                <el-select size="small"
                           class="filter-item"
                           v-model="listQuery.bomType"
                           @keyup.enter.native="handleQuery"
                           :placeholder="$t('instorageProcess.bomType')"
                           clearable>
                    <el-option v-for="item in dt_stores_bom_type"
                               :key="item.dictItemKey"
                               :label="item.dictItemValue"
                               :value="item.dictItemKey"></el-option>
                </el-select>
                <orgSelect :placeholder="$t('instorageProcess.orgCode')"
                           class="filter-item"
                           :orgType="DT_ORG_TYPE.factory"
                           v-model="listQuery.orgCode"></orgSelect>
                <el-input size="small"
                          v-model="listQuery.materielCode"
                          :placeholder="$t('instorageProcess.materielCode')"
                          disabled>
                    <el-button slot="append"
                               icon="el-icon-search"
                               @click="showQMwlxz"></el-button>
                </el-input>
                <el-select size="small"
                           class="filter-item"
                           v-model="listQuery.state"
                           @keyup.enter.native="handleQuery"
                           :placeholder="$t('instorageProcess.state')"
                           clearable>
                    <el-option label="编制"
                               value="0"></el-option>
                    <el-option label="生效"
                               value="1"></el-option>
                </el-select>
                <el-input size="small"
                          :placeholder="$t('instorageProcess.standardNum')"
                          v-model="listQuery.standardNum"
                          class="filter-item"
                          @keyup.enter.native="handleQuery" />
                <el-button class="filter-item"
                           type="primary"
                           size="small"
                           icon="el-icon-search"
                           @click="handleQuery">{{$t('table.query')}}</el-button>

            </div>
        </div>
        <div class="table-container">
            <!--主表-->
            <div class="oprate_btn">
                <el-button size="small"
                           class="filter-item"
                           type="primary"
                           icon="el-icon-plus"
                           @click="handleCreate">{{$t('table.add')}}</el-button>
                <el-button size="small"
                           class="filter-item"
                           type="primary"
                           icon="el-icon-edit"
                           @click="handleEdit">{{$t('table.edit')}}</el-button>
                <el-button size="small"
                           class="filter-item"
                           type="primary"
                           icon="el-icon-delete"
                           @click="handleDelete">{{$t('table.delete')}}</el-button>
                <el-button size="small"
                           class="filter-item"
                           type="primary"
                           icon="el-icon-delete"
                           @click="handlePublish">{{$t('table.publish')}}</el-button>
            </div>
            <el-table :key="tableKey[0]"
                      :data="list"
                      border
                      fit
                      :height="theight"
                      highlight-current-row
                      style="width: 100%;"
                      size="mini"
                      cell-class-name="table-cell"
                      header-cell-class-name="header-cell"
                      ref="tb"
                      @row-click='mainRowClick'
                      @selection-change='mainSelectChange'>
                <el-table-column type="selection"
                                 fixed
                                 width="30"
                                 align="center"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="130"
                                 align="left"
                                 :label="$t('instorageProcess.rowId')"
                                 prop="rowId"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="130"
                                 align="left"
                                 :label="$t('instorageProcess.versions')"
                                 prop="versions"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="130"
                                 align="left"
                                 :label="$t('instorageProcess.materielCode')"
                                 prop="materielCode"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="130"
                                 align="left"
                                 :label="$t('instorageProcess.materielName')"
                                 prop="materielName"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="130"
                                 align="left"
                                 :label="$t('instorageProcess.standardNum')"
                                 prop="standardNum"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="130"
                                 align="left"
                                 :label="$t('instorageProcess.effDateBegin')"
                                 prop="effDateBegin"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="130"
                                 align="left"
                                 :label="$t('instorageProcess.effDateEnd')"
                                 prop="effDateEnd"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 min-width="130"
                                 align="left"
                                 :label="$t('instorageProcess.state')"
                                 prop="state">
                    <template slot-scope="scope">{{scope.row.state===0 ? "编制":"生效"}}</template>
                </el-table-column>
            </el-table>
            <pagination :total="total"
                        :page.sync="listQuery.currentPage"
                        :limit.sync="listQuery.pageSize"
                        @pagination="getList"
                        class="pagination-container border_b_1" />

            <el-table :key="tableKey[1]"
                      :data="listSub"
                      border
                      fit
                      :height="theight"
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
                                 width="100"
                                 align="left"
                                 :label="$t('instorageProcess.rowId')"
                                 prop="rowId"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="150"
                                 align="left"
                                 :label="$t('instorageProcess.materielCode')"
                                 prop="materielCode"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="150"
                                 align="left"
                                 :label="$t('instorageProcess.materielName')"
                                 prop="materielName"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="150"
                                 align="left"
                                 :label="$t('instorageProcess.assemblingNum')"
                                 prop="assemblingNum"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="150"
                                 align="left"
                                 :label="$t('instorageProcess.dismantlingNum')"
                                 prop="dismantlingNum"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 min-width="150"
                                 align="left"
                                 :label="$t('instorageProcess.measuringUnit')"
                                 prop="measuringUnit"></el-table-column>
            </el-table>
            <pagination :total="totalSub"
                        :page.sync="listQuerySub.currentPage"
                        :limit.sync="listQuerySub.pageSize"
                        @pagination="getSubList"
                        class="pagination-container" />
        </div>
        <!-- 筛选条件物料主数据弹框 -->
        <el-dialog width="80%"
                   custom-class="dialog-custom"
                   class="table_dialog"
                   title="选择搜索物料编码"
                   :visible.sync="wlxzQMDialog"
                   v-dialogDrag
                   :close-on-click-modal="false">
            <wlxzbyzsj :unMutiple="true"
                       ref="wlxzQMRef"></wlxzbyzsj>
            <div slot="footer"
                 class="dialog-footer">
                <el-button type="primary"
                           @click="confirmQM">{{$t('table.confirm')}}</el-button>
            </div>
        </el-dialog>

        <!-- 新增选择物料下拉框弹框 -->
        <el-dialog width="80%"
                   custom-class="dialog-custom"
                   class="table_dialog"
                   title="选择物料编码"
                   :visible.sync="wlxzAMSDialog"
                   v-dialogDrag
                   :close-on-click-modal="false">
            <wlxzbyzsj :unMutiple="true"
                       ref="wlxzAMSRef"></wlxzbyzsj>
            <div slot="footer"
                 class="dialog-footer">
                <el-button type="primary"
                           @click="confirmAMS">{{$t('table.confirm')}}</el-button>
            </div>
        </el-dialog>

        <!-- 新增添加物料详情 -->
        <el-dialog width="80%"
                   custom-class="dialog-custom"
                   class="table_dialog"
                   title="选择物料"
                   :visible.sync="wlxzAMDDialog"
                   v-dialogDrag
                   :close-on-click-modal="false">
            <wlxzbyzsj ref="wlxzAMDRef"></wlxzbyzsj>
            <div slot="footer"
                 class="dialog-footer">
                <el-button type="primary"
                           @click="confirmAMD">{{$t('table.confirm')}}</el-button>
            </div>
        </el-dialog>

        <!-- 新增弹框 -->
        <el-dialog class="form_dialog"
                   width="75%"
                   top="10vh"
                   custom-class="dialog-custom"
                   :title="dialogStatus==0?$t('table.add'):$t('table.edit')"
                   :close-on-click-modal="false"
                   :visible.sync="DialogAddmain">
            <el-form :rules="rules"
                     :model="AddMainlist"
                     ref="AddMainlist"
                     label-width="130px"
                     :inline="true"
                     class="demo-form-inline dialog_form">

                <el-form-item :label="$t('instorageProcess.versions')"
                              prop="versions">
                    <el-input size="small"
                              v-model="AddMainlist.versions"
                              disabled></el-input>
                </el-form-item>
                <el-form-item :label="$t('instorageProcess.orgCode')"
                              prop="orgCode">
                    <orgSelect :disabled="isEdit"
                               class="filter-item"
                               :orgType="DT_ORG_TYPE.factory"
                               v-model="AddMainlist.orgCode"></orgSelect>
                </el-form-item>
                <el-form-item :label="$t('instorageProcess.bomType')"
                              prop="bomType">
                    <el-select size="small"
                               :disabled="isEdit"
                               v-model="AddMainlist.bomType"
                               @keyup.enter.native="handleQuery"
                               placeholder="请选择"
                               clearable>
                        <el-option v-for="item in dt_stores_bom_type"
                                   :key="item.dictItemKey"
                                   :label="item.dictItemValue"
                                   :value="item.dictItemKey"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('instorageProcess.materielCode')"
                              prop="materielCode">
                    <el-input size="small"
                              v-model="AddMainlist.materielCode"
                              :placeholder="''"
                              disabled>
                        <el-button :disabled="isEdit"
                                   slot="append"
                                   icon="el-icon-search"
                                   @click="showAMSwlxz"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item :label="$t('instorageProcess.standardNum')"
                              prop="standardNum">
                    <el-input size="small"
                              v-model="AddMainlist.standardNum"></el-input>
                </el-form-item>
                <el-form-item :label="$t('instorageProcess.effDateBegin')"
                              prop="effDateBegin">
                    <el-date-picker size="small"
                                    v-model="AddMainlist.effDateBegin"
                                    value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                <el-form-item :label="$t('instorageProcess.effDateEnd')"
                              prop="effDateEnd">
                    <el-date-picker size="small"
                                    v-model="AddMainlist.effDateEnd"
                                    value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                <el-form-item :label="$t('instorageProcess.remarks')"
                              prop="remarks">
                    <el-input size="small"
                              v-model="AddMainlist.remarks"></el-input>
                </el-form-item>
            </el-form>
            <div class="oprate_btn">
                <el-button class="filter-item"
                           size="small"
                           type="primary"
                           @click="addMateriel"
                           icon="el-icon-plus">{{ $t('table.add') }}</el-button>
                <el-button class="filter-item"
                           size="small"
                           type="primary"
                           @click="deleteMateriel"
                           icon="el-icon-delete">{{ $t('table.delete') }}</el-button>
                <el-button size="small"
                           class="filter-item"
                           type="primary"
                           icon="el-icon-refresh-right"
                           @click="handelRefresh">{{$t('table.refresh')}}</el-button>
            </div>
            <div class="table-container">
                <el-table :data="bomDetailCreateDTOList"
                          border
                          fit
                          height="320px"
                          highlight-current-row
                          style="width: 100%;"
                          ref="detailtable"
                          @selection-change='addSelectChange'
                          size="mini"
                          cell-class-name="table-cell"
                          header-cell-class-name="header-cell">
                    <el-table-column type="selection"
                                     fixed
                                     width="30"
                                     align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     align="left"
                                     :label="$t('instorageProcess.materielCode')"
                                     prop="materielCode"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     align="left"
                                     :label="$t('instorageProcess.materielName')"
                                     prop="materielName"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     align="left"
                                     :label="$t('instorageProcess.assemblingNum')"
                                     prop="assemblingNum">
                        <template slot-scope="{row}">
                            <el-input size="small"
                                      v-model="row.assemblingNum"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     align="left"
                                     :label="$t('instorageProcess.dismantlingNum')"
                                     prop="dismantlingNum">
                        <template slot-scope="{row}">
                            <el-input size="small"
                                      v-model="row.dismantlingNum"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     align="left"
                                     :label="$t('instorageProcess.specification')"
                                     prop="specification"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     align="left"
                                     :label="$t('instorageProcess.measuringUnit')"
                                     prop="measuringUnit"></el-table-column>
                </el-table>
            </div>
            <div slot="footer"
                 class="dialog-footer">
                <el-button @click="DialogAddmain=!DialogAddmain">{{$t('table.cancel')}}</el-button>
                <el-button type="primary"
                           @click="dialogStatus==0?addMainConfirm():updateMainConfirm()">{{$t('table.confirm')}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>


<script>
import Pagination from "@/components/Pagination";
import orgSelect from "@/components/Select/orgSelect.vue";
import { DT_ORG_TYPE } from "@/utils/constant";
import { mapState } from "vuex";
import wlxzbyzsj from '@/components/Select/wlxzbyzsj'//主数据物料信息模块
import * as api from "@/api/data-base/instorageProcess"


export default {
    name: "instorageProcess",
    components: {
        Pagination,
        orgSelect,
        wlxzbyzsj
    },
    data () {
        return {
            list: null,
            listSub: null,
            total: 0,
            totalSub: 0,
            theight: 0,
            tableKey: [0, 1],//表格索引，虚拟dom渲染表格时使用
            listQuery: {
                page: true,
                currentPage: 1,
                pageSize: 10,
                bomType: '',
                orgCode: '',
                materielCode: '',
                state: '',
                standardNum: ''
            },
            listQuerySub: {
                page: true,
                currentPage: 1,
                pageSize: 10
            },
            AddMainlist: {
                bomType: "",
                effDateBegin: "",
                effDateEnd: "",
                materielCode: "",
                materielName: "",
                measuringUnit: "",
                orgCode: "",
                remarks: "",
                specification: "",
                standardNum: '',
                bomDetailCreateDTOList: []
            },
            bomDetailCreateDTOList: [],
            mdobj: {
                assemblingNum: 0,
                detaiType: "",
                dismantlingNum: 0,
                materielCode: "",
                materielName: "",
                measuringUnit: "",
                routeType: "",
                specification: ""
            },
            selectRows: [],//主表选中数据
            dialogStatus: "",

            DT_ORG_TYPE: DT_ORG_TYPE,
            DialogAddmain: false,//新增弹框
            wlxzQMDialog: false,//物料选择弹框
            wlxzAMSDialog: false,
            wlxzAMDDialog: false,
            rules: {
                orgCode: [
                    { required: true, message: '不能为空', trigger: 'blur' },
                ],
                bomType: [
                    { required: true, message: '请选择', trigger: 'blur' },
                ],
                materielCode: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ]
            },
            isEdit: false
        };
    },
    computed: {
        ...mapState({
            dt_stores_bom_type: state => state.dict.dt_stores_bom_type,
        })
    },
    mounted () {
        this.$store.dispatch("dict/getDicData", [
            "dt_stores_bom_type"
        ]);
        this.setTableHeight();
        //表格高度自适应
        window.onresize = () => {
            this.setTableHeight()
        };

    },
    methods: {
        getList () { //查询主表
            if (!this.listQuery.orgCode) {
                this.$message({
                    type: "warning",
                    message: "请选择组织编码"
                })
            } else if (!this.listQuery.bomType) {
                this.$message({
                    type: "warning",
                    message: "请选择BOM类型"
                })
            } else {
                api.queryRecords(this.listQuery.orgCode, this.listQuery.bomType, this.listQuery).then(res => {
                    this.list = res.data.list;
                })
            }
        },
        //表格高度计算
        setTableHeight () {
            this.theight = this.$myFun.getSingleTbHeight() - 185;
        },
        //获取从表
        getSubList (val) {
            this.listQuerySub.versions = val.versions;
            api.queryRecordsDetail(val.versions, this.listQuerySub).then(res => {
                this.listSub = res.data.list;
            })
        },
        handleQuery () {
            this.listQuery.currentPage = 1;
            this.getList();
        },
        handleCreate () { //新增
            this.isEdit = false;
            this.resetAddList();
            this.dialogStatus = 0;
            this.DialogAddmain = true;
        },
        handleDelete () { //删除
            if (this.selectRows && this.selectRows.length !== 0) {
                this.$confirm("此操作将永久删除该记录,是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    let bomList = [];
                    this.selectRows.forEach((item) => {
                        bomList.push(item.versions);
                    });
                    api.deleteRecords(bomList).then(() => {
                        this.getList();
                        this.listSub = [];
                        this.$message({
                            title: "成功",
                            message: "删除成功",
                            type: "success",
                            duration: 2000
                        });
                    });
                })
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条信息",
                    type: "warning",
                    duration: 2000
                });
            }
        },
        //修改
        handleEdit () {
            if (this.selectRows.length === 1) {
                this.resetAddList();
                this.dialogStatus = 1;
                this.AddMainlist = this.selectRows[0];
                api.queryRecordsDetail(this.selectRows[0].versions, {}).then(res => {
                    this.bomDetailCreateDTOList = res.data;
                    this.DialogAddmain = true;
                    this.isEdit = true;
                })
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条信息",
                    type: "warning",
                    duration: 2000
                });
            }
        },
        //发布
        handlePublish () {
            if (this.selectRows) {
                this.$confirm("此操作将发布所选内容,是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    let bomList = [];
                    this.selectRows.forEach((item) => {
                        bomList.push(item.versions);
                    });
                    api.publishRecords(bomList).then(() => {
                        this.getList();
                        this.listSub = [];
                        this.$message({
                            title: "成功",
                            message: "发布成功",
                            type: "success",
                            duration: 2000
                        });
                    });
                })
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条信息",
                    type: "warning",
                    duration: 2000
                });
            }
        },
        //查询条件物料选择相关
        showQMwlxz () {
            this.wlxzQMDialog = true;
            this.$nextTick(function () {
                this.$refs.wlxzQMRef.getList();
            })
        },
        confirmQM () {//查询条件物料选中中弹窗确认按钮
            if (this.$refs.wlxzQMRef.listSelected.length > 0) {
                this.listQuery.materielCode = this.$refs.wlxzQMRef.listSelected[0].materielCode;
                this.wlxzQMDialog = false;
            } else {
                this.listQuery.materielCode = null;
                this.wlxzQMDialog = false;
            }
        },
        //新增物料选择相关
        showAMSwlxz () {
            this.wlxzAMSDialog = true;
            this.$nextTick(function () {
                this.$refs.wlxzAMSRef.getList();
            })
        },
        confirmAMS () {//新增物料选中中弹窗确认按钮
            if (this.$refs.wlxzAMSRef.listSelected.length > 0) {
                this.AddMainlist.measuringUnit = this.$refs.wlxzAMSRef.listSelected[0].measuringUnit;
                this.AddMainlist.materielName = this.$refs.wlxzAMSRef.listSelected[0].materielName;
                this.AddMainlist.materielCode = this.$refs.wlxzAMSRef.listSelected[0].materielCode;
                this.wlxzAMSDialog = false;
            } else {
                this.AddMainlist.measuringUnit = '';
                this.AddMainlist.materielName = '';
                this.AddMainlist.materielCode = '';
                this.wlxzAMSDialog = false;
            }
        },
        //新增物料详情相关
        confirmAMD () {//查询条件物料选中中弹窗确认按钮
            if (this.$refs.wlxzAMDRef.listSelected.length > 0) {
                this.bomDetailCreateDTOList = this.$refs.wlxzAMDRef.listSelected;
                this.$set(this.AddMainlist, 'bomDetailCreateDTOList', this.AddMainlist.bomDetailCreateDTOList)
                this.wlxzAMDDialog = false;
            } else {
                this.bomDetailCreateDTOList = [];
                this.wlxzAMSDialog = false;
            }
        },
        //新增弹框删除物料
        deleteMateriel () {
            this.selectwlRows.forEach(itenw => {
                this.bomDetailCreateDTOList.forEach((item, index) => {
                    if (itenw.materielCode === item.materielCode) {
                        this.bomDetailCreateDTOList.splice(index, 1);
                    }
                });
            })
        },
        //新增弹框添加物料
        addMateriel () {
            this.$refs.AddMainlist.validate((valid) => {
                if (valid) {
                    this.isEdit = true;
                    this.wlxzAMDDialog = !this.wlxzAMDDialog;
                    this.$nextTick(function () {
                        this.$refs.wlxzAMDRef.listSelected = this.bomDetailCreateDTOList;
                        this.$refs.wlxzAMDRef.getList();
                    })
                }
            })
        },
        mainRowClick (val) {
            this.selectRows = val;
            if (val.length !== 0) {
                this.getSubList(val[val.length - 1]);
            }
        },
        mainSelectChange (val) {
            this.selectRows = val;
            if (val.length !== 0) {
                this.getSubList(val[val.length - 1]);
            }
        },
        // addRowClick(val){
        //     this.selectwlRows = val;
        //     this.$refs.detailtable.clearSelection()
        //     this.$refs.detailtable.toggleRowSelection(val,'selected')
        //     this.getSubList(val);
        // },
        addSelectChange (val) {
            this.selectwlRows = val;
        },
        updateMainConfirm () {
            this.$refs.AddMainlist.validate((valid) => {
                if (valid) {
                    this.AddMainlist.bomDetailCreateDTOList = this.bomDetailCreateDTOList;
                    api.updateRecords(this.AddMainlist).then(() => {
                        this.DialogAddmain = false;
                        this.listSub = [];
                        this.getList();
                    });
                }
            })
        },
        addMainConfirm () {
            this.$refs.AddMainlist.validate((valid) => {
                if (valid) {
                    this.AddMainlist.bomDetailCreateDTOList = this.bomDetailCreateDTOList;
                    api.createRecords(this.AddMainlist).then(() => {
                        this.getList();
                        this.listSub = [];
                        this.DialogAddmain = false;
                    });
                }
            })
        },
        resetAddList () {
            this.bomDetailCreateDTOList = [];
            this.AddMainlist = {
                bomType: "",
                effDateBegin: "",
                effDateEnd: "",
                materielCode: "",
                materielName: "",
                measuringUnit: "",
                orgCode: "",
                remarks: "",
                specification: "",
                standardNum: '',
                bomDetailCreateDTOList: []
            }
        },
        handelRefresh () {
            this.isEdit = false;
            this.resetForm();
            this.resetAddList();
        },
        resetForm () {
            this.$refs['AddMainlist'].resetFields();
        }
    }
};
</script>
<!--<style >
.el-range-editor--small.el-input__inner {
  height: 32px;
  /* margin-left: 5px; */
}
.el-input.is-disabled .el-input__inner {
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
  cursor: not-allowed;
  height: 32px;
  /* margin-left: 5px; */
}
thead .el-table-column--selection .cell {
  display: none;
}
</style>-->