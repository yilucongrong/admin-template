<template>
    <div class="app-container">
        <div class="filter-container">
            <div class="filter-items">
                <el-input size="small"
                          :placeholder="$t('workstation.stationCode')"
                          v-model="listQuery.stationCode"
                          class="filter-item"
                          @keyup.enter.native="handleQuery" />
                <el-input size="small"
                          :placeholder="$t('workstation.stationName')"
                          v-model="listQuery.stationName"
                          class="filter-item"
                          @keyup.enter.native="handleQuery" />
                <el-button class="filter-item"
                           size="small"
                           type="primary"
                           icon="el-icon-search"
                           @click="handleQuery">{{ $t('table.search') }}</el-button>
            </div>
        </div>
        <div class="table-container">
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
            <el-table :key="tableKey"
                      :data="list"
                      border
                      fit
                      :height="theight"
                      highlight-current-row
                      style="width: 100%;"
                      @selection-change="selectRow"
                      cell-class-name="table-cell"
                      header-cell-class-name="header-cell">
                <el-table-column type="selection"
                                 width="30"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="120"
                                 align="left"
                                 :label="$t('workstation.lineCode')"
                                 prop="lineCode"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="120"
                                 align="left"
                                 :label="$t('workstation.lineName')"
                                 prop="lineName"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="120"
                                 align="left"
                                 :label="$t('workstation.stationCode')"
                                 prop="stationCode"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="120"
                                 align="left"
                                 :label="$t('workstation.stationName')"
                                 prop="stationName"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="120"
                                 align="left"
                                 :label="$t('workstation.stationNo')"
                                 prop="stationNo"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="120"
                                 align="left"
                                 :label="$t('workstation.stationType')"
                                 prop="stationType"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="120"
                                 align="left"
                                 :label="$t('workstation.stationTypeName')"
                                 prop="stationTypeName"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 min-width="100"
                                 align="left"
                                 :label="$t('workstation.feedArea')"
                                 prop="feedArea"></el-table-column>
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
                       v-dialogDrag
                       @close="handleClose">
                <el-form :inline="true"
                         class="demo-form-inline"
                         :model="temp"
                         :rules="rules"
                         ref="temp"
                         label-width="120px"
                         style="width:auto;">
                    <el-form-item :label="$t('workstation.lineCode')"
                                  prop="lineCode">
                        <el-input v-model="temp.lineCode"
                                  disabled></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('workstation.stationCode')"
                                  prop="stationCode">
                        <el-input v-model="temp.stationCode"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('workstation.stationName')"
                                  prop="stationName">
                        <el-input v-model="temp.stationName"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('workstation.stationNo')"
                                  prop="stationNo">
                        <el-input v-model="temp.stationNo"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('workstation.stationType')"
                                  prop="stationType">
                        <el-select size="small"
                                   v-model="temp.stationType"
                                   :placeholder="$t('table.select')">
                            <el-option v-for="item in dt_station_type"
                                       :key="item.dictItemKey"
                                       :label="item.dictItemValue"
                                       :value="item.dictItemKey">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('workstation.feedArea')"
                                  prop="feedArea">
                        <el-input style="width: 165px"
                                  v-model="temp.feedArea"
                                  disabled>
                            <el-button slot="append"
                                       icon="el-icon-search"
                                       @click="handlefeed"></el-button>
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
            <el-dialog custom-class="dialog-custom"
                       class="table-container spacing-one"
                       :title="$t('workstation.feedArea')"
                       :visible.sync="feedAreaDialogFormVisible"
                       v-dialogDrag
                       :close-on-click-modal="false">
                <tkqy :warehouseCode="feedArea"
                      @handSelectAreasRows="feedAreas"></tkqy>
                <div slot="footer"
                     class="dialog-footer">
                    <el-button type="primary"
                               @click="update3">{{$t('table.confirm')}}</el-button>
                </div>
            </el-dialog>
        </div>

    </div>
</template>

<script>
import * as api from "@/api/data-base/work-center";
import Pagination from "@/components/Pagination";
import tkqy from "./tkqy";
import { mapState } from "vuex";
import global_valfn from '@/utils/global_valfn'

export default {
    components: { Pagination, tkqy },
    data () {
        return {
            list: null,
            total: 0,
            theight: 0,//表格高度
            listQuery: {
                page: true,
                currentPage: 1,
                pageSize: 15,
                workCenterCode: undefined,
                stationCode: undefined,
                stationName: undefined,
                lineCode: undefined,
                stationNo: undefined,
                stationType: undefined,
                feedArea: undefined
            },
            parentsRows: null,
            isEdit: true,
            temp: {
                workCenterCode: undefined,
                stationCode: undefined,
                stationName: undefined,
                lineCode: undefined,
                stationNo: undefined,
                stationType: undefined,
                feedArea: undefined
            },
            feedArea: undefined,
            stationCode: undefined,
            warehouseCode: undefined,
            workCenterCode: undefined,
            feedAreaDialogFormVisible: undefined,
            dialogFormVisible: false,
            dialogStatus: "",
            tableKey: 0,
            rules: {
                stationCode: [
                    {
                        required: true,
                        message: "工位编码不能为空",
                        trigger: "blur"
                    }
                ],
                stationName: [
                    {
                        required: true,
                        message: "工位名称不能为空",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    computed: {
        ...mapState({
            dt_station_type: state => state.dict.dt_station_type,
            dt_workcenter_type: state => state.dict.dt_workcenter_type,
            dt_workcenter_class: state => state.dict.dt_workcenter_class,
            dt_workcenter_group: state => state.dict.dt_workcenter_group,
            dt_workcenter_model: state => state.dict.dt_workcenter_model,
            dt_timeunit: state => state.dict.dt_timeunit
        })
    },
    mounted () {
        this.$store.dispatch("dict/getDicData", [
            "dt_workcenter_type",
            "dt_workcenter_class",
            "dt_workcenter_group",
            "dt_workcenter_model",
            "dt_timeunit",
            "dt_station_type"
        ]);
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
                const workCenterCode = node.workCenterCode;
                this.workCenterCode = node.workCenterCode;
                this.feedArea = node.feedArea;
                this.lineCode = node.label;
                api.queryList(workCenterCode, this.listQuery).then(res => {
                    this.list = res.data.list;
                    this.total = res.data.pages.count;
                });
            }
        },
        //表格高度计算
        setTableHeight () {
            this.theight = global_valfn.getSingleTbHeight();
        },
        getList1 () {
            api.queryList(this.workCenterCode, this.listQuery).then(res => {
                this.list = res.data.list;
                this.total = res.data.pages.count;
            });
        },
        handleQuery () {
            this.listQuery.currentPage = 1;
            api.queryList(this.workCenterCode, this.listQuery).then(res => {
                this.list = res.data.list;
                this.total = res.data.pages.count;
            });
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
            if (!this.workCenterCode) {
                this.$message.warning("请选择对应工厂或者上级工作中心！");
                return;
            }
            this.resetTemp();
            this.temp.workCenterCode = this.workCenterCode;
            this.temp.lineCode = this.lineCode;
            this.dialogStatus = "create";
            this.dialogFormVisible = true;
        },
        selectRow (val) {
            this.selectlistRow = val;
        },
        handleUpdate () {
            //编辑弹窗
            if (!this.workCenterCode) {
                this.$message.warning("请选择对应工厂或者上级工作中心！");
                return;
            }
            if (this.selectlistRow && this.selectlistRow.length == 1) {
                this.lineCode = true; //生产线不可以编写
                this.temp = this.selectlistRow[0];
                api.queryJob(
                    this.temp.workCenterCode,
                    this.temp.stationCode
                ).then(res => {
                    this.temp = res.data;
                    this.dialogStatus = "update";
                    this.dialogFormVisible = true;
                    this.$nextTick(() => {
                        this.$refs["temp"].clearValidate();
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
            //编辑
            this.$refs["temp"].validate(valid => {
                if (valid) {
                    api.updateJob(
                        this.workCenterCode,
                        this.temp.stationCode,
                        this.temp
                    ).then(() => {
                        this.getList1();
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
        update3 () {
            //投控区域
            if (this.parentsRows.length && this.parentsRows.length == 1) {
                this.temp.feedArea = this.parentsRows[0].locationCode;
                this.feedAreaDialogFormVisible = false;
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条信息",
                    type: "warning"
                });
            }
        },
        feedAreas (row) {
            this.parentsRows = row;
        },
        handleDelete () {
            //删除列表
            if (this.selectlistRow && this.selectlistRow.length == 1) {
                this.$confirm("此操作将删除所选中数据, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        let ids = [];
                        this.selectlistRow.forEach((val, index) => {
                            ids[index] = val.stationCode;
                        });
                        api.deleteJob(this.workCenterCode, ids).then(
                            () => {
                                this.getList1(),
                                    this.$message({
                                        title: "成功",
                                        message: "删除成功",
                                        type: "success",
                                        duration: 2000
                                    });
                            }
                        );
                    })
                    .catch(() => {
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
                    api.creatJob(this.temp.workCenterCode, this.temp).then(
                        () => {
                            this.getList1();
                            this.dialogFormVisible = false;
                            this.$notify({
                                title: "成功",
                                message: "新增成功",
                                type: "success",
                                duration: 2000
                            });
                        }
                    );
                } else {
                    return false;
                }
            });
        },
        cancel () {
            this.dialogFormVisible = false;
        },
        resetTemp () {
            this.temp = {
                workCenterCode: undefined,
                stationCode: undefined,
                stationName: undefined,
                lineCode: undefined,
                stationNo: undefined,
                stationType: undefined,
                parentCode: undefined,
                feedArea: undefined
            };
        },
        handleClose () {
            this.resetTemp();
            this.$refs.temp.resetFields();
        },
        handleSelectionChange (selection) {
            this.selectCode = selection.map(v => v.workCenterCode);
        },
        handleChange () {
            this.$emit("fresh", true);
        },
        handlefeed () {
            this.feedAreaDialogFormVisible = true;
        }
    }
};
</script>
