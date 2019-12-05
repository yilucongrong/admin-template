// 查询+单表
<template>
    <div>
        <div class="app-container">
            <div class="filter-container">
                <div class="filter-items">
                    <el-input style="width:120px"
                              size="small"
                              :placeholder="$t('Interfacemonitor.interfaceCode')"
                              v-model="listQuery.interfaceCode"
                              class="filter-item"
                              @keyup.enter.native="handleQuery" />
                    <el-input style="width:120px"
                              size="small"
                              :placeholder="$t('Interfacemonitor.interfaceName')"
                              v-model="listQuery.interfaceName"
                              class="filter-item"
                              @keyup.enter.native="handleQuery" />
                    <el-input style="width:120px"
                              size="small"
                              :placeholder="$t('Interfacemonitor.externalSystem')"
                              v-model="listQuery.externalSystem"
                              class="filter-item"
                              @keyup.enter.native="handleQuery" />
                    <el-input style="width:120px"
                              size="small"
                              :placeholder="$t('Interfacemonitor.transactionNumber')"
                              v-model="listQuery.transactionNumber"
                              class="filter-item"
                              @keyup.enter.native="handleQuery" />
                    <el-date-picker size="small"
                                    v-model="value3"
                                    type="daterange"
                                    class="filter-item range_date"
                                    :start-placeholder="$t('Interfacemonitor.transactiondate')"
                                    :end-placeholder="$t('Interfacemonitor.transactiondate')"
                                    value-format="yyyy-MM-dd"></el-date-picker>
                    <el-select size="small"
                               v-model="listQuery.state"
                               :placeholder="$t('Interfacemonitor.state')"
                               clearable>
                        <el-option v-for="item in dt_monitor_state"
                                   :key="item.dictItemKey"
                                   :label="item.dictItemValue"
                                   :value="item.dictItemKey">
                        </el-option>
                    </el-select>
                    <el-button class="filter-item"
                               type="primary"
                               size="small"
                               icon="el-icon-search"
                               @click="handleQuery">{{ $t("table.search") }}</el-button>
                </div>
            </div>
            <div class="table-container">
                <div class="oprate_btn">
                    <el-button size="small"
                               class="filter-item"
                               type="primary"
                               icon="el-icon-refresh"
                               @click="handlesynchro">同步接口</el-button>
                    <el-button size="small"
                               class="filter-item"
                               type="primary"
                               icon="el-icon-position"
                               @click="handlemonitor">
                        <!-- <svg-icon icon-class="fs"/> -->
                        发送/更新</el-button>
                    <el-button size="small"
                               class="filter-item"
                               type="primary"
                               icon="el-icon-sort"
                               @click="handledata">交易数据</el-button>
                    <el-button size="small"
                               class="filter-item"
                               type="primary"
                               icon="el-icon-document"
                               @click="handlelog">交易日志</el-button>
                </div>
                <el-table :key="tableKey"
                          :data="list"
                          border
                          fit
                          :height="theight"
                          highlight-current-row
                          style="width: 100%;"
                          @selection-change="selectRow"
                          ref="tb"
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
                                     :label="$t('Interfacemonitor.rowId')"
                                     prop="rowId"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="200"
                                     align="left"
                                     :label="$t('Interfacemonitor.transactionNumber')"
                                     prop="transactionNumber"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="100"
                                     align="left"
                                     :label="$t('Interfacemonitor.interfaceCode')"
                                     prop="interfaceCode"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="100"
                                     align="left"
                                     :label="$t('Interfacemonitor.interfaceName')"
                                     prop="interfaceName"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="200"
                                     align="left"
                                     :label="$t('Interfacemonitor.externalSystem')"
                                     prop="externalSystem"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="200"
                                     align="left"
                                     :label="$t('Interfacemonitor.interfaceDirection')"
                                     prop="interfaceDirection"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="200"
                                     align="left"
                                     :label="$t('Interfacemonitor.executionType')"
                                     prop="executionType"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     min-width="200"
                                     align="left"
                                     :label="$t('Interfacemonitor.status')"
                                     prop="status"></el-table-column>
                </el-table>
                <pagination :total="total"
                            :page.sync="listQuery.currentPage"
                            :limit.sync="listQuery.pageSize"
                            @pagination="getList" />

            </div>
            <!-- <el-dialog width="60%" v-dialogDrag custom-class="dialog-custom" :close-on-click-modal="false" :close-on-press-escape="false" title="交易数据" :visible.sync="dialogFormVisible" @close="handleClose">
                <div class="filter-container">
                    <div class="filter-items">
                        <div class="select-element">
                            <el-input size="small" style="width:120px" placeholder="交易号" v-model="listQuerydata.transactionNumber" class="filter-item"  @keyup.enter.native="handleQuerydata"/>
                            <el-input size="small" style="width:120px" placeholder="接口编号" v-model="listQuerydata.interfaceCode" class="filter-item"  @keyup.enter.native="handleQuerydata"/>
                            <el-input size="small" style="width:120px" placeholder="接口名称" v-model="listQuerydata.interfaceName" class="filter-item"  @keyup.enter.native="handleQuerydata"/>
                            <el-date-picker
                                v-model="valuedata"
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd">
                            </el-date-picker>
                            <el-select style="width:120px" size="small" v-model="listQuerydata.state" placeholder="状态" clearable>
                                <el-option v-for="item in dt_monitor_state"
                                    :key="item.dictItemKey"
                                    :label="item.dictItemValue"
                                    :value="item.dictItemKey">
                                </el-option>
                            </el-select>
                            <el-button class="filter-item" type="primary" size="small" icon="el-icon-search" @click="handleQuerydata">{{ $t("table.search") }}</el-button>
                        </div>
                    </div>
                </div>
                <div class="table-container">
                    <el-table
                        :key="tableKey"
                        :data="listdata"
                        border
                        fit
                        height="315"
                        highlight-current-row
                        style="width: 100%;"
                        @selection-change="selectRow"
                        ref="tb"
                        size="mini"
                        cell-class-name="table-cell"
                        header-cell-class-name="header-cell">
                        <el-table-column type="selection" fixed width="30" align="center"></el-table-column>
                        <el-table-column show-overflow-tooltip width="200" align="left" label="交易编号" prop="transactionNumber"></el-table-column>
                        <el-table-column show-overflow-tooltip width="100" align="left" label="接口编号" prop="interfaceCode"></el-table-column>
                        <el-table-column show-overflow-tooltip width="100" align="left" label="接口名称" prop="interfaceName"></el-table-column>
                        <el-table-column show-overflow-tooltip min-width="200" align="left" label="地址" prop="address"></el-table-column>
                    </el-table>
                    <pagination :total="totaldata" :page.sync="listQuerydata.currentPage" :limit.sync="listQuerydata.pageSize" @pagination="getlistData"/>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">{{$t("table.cancel")}}</el-button>
                    <el-button v-if="dialogStatus == 'create'" type="primary" @click="create">{{ $t("table.confirm") }}</el-button>
                    <el-button v-else type="primary" @click="update">{{$t("table.confirm")}}</el-button>
                </div>
            </el-dialog> -->
            <el-dialog class="table_dialog"
                       custom-class="dialog-custom"
                       title="交易数据"
                       :visible.sync="dialogFormVisible"
                       v-dialogDrag
                       :close-on-click-modal="false">
                <div class="tab_container">

                    <div class="filter-container border_b_1">
                        <div class="filter-items">
                            <el-input size="small"
                                      style="width:120px"
                                      :placeholder="$t('Interfacemonitor.transactionNumber')"
                                      v-model="listQuerydata.transactionNumber"
                                      class="filter-item"
                                      @keyup.enter.native="handleQuerydata" />
                            <el-input size="small"
                                      style="width:120px"
                                      :placeholder="$t('Interfacemonitor.interfaceCode')"
                                      v-model="listQuerydata.interfaceCode"
                                      class="filter-item"
                                      @keyup.enter.native="handleQuerydata" />
                            <el-input size="small"
                                      style="width:120px"
                                      :placeholder="$t('Interfacemonitor.interfaceName')"
                                      v-model="listQuerydata.interfaceName"
                                      class="filter-item"
                                      @keyup.enter.native="handleQuerydata" />
                            <el-date-picker v-model="valuedata"
                                            type="date"
                                            size="small"
                                            placeholder="选择日期"
                                            value-format="yyyy-MM-dd">
                            </el-date-picker>
                            <el-select style="width:120px"
                                       size="small"
                                       v-model="listQuerydata.state"
                                       :placeholder="$t('Interfacemonitor.state')"
                                       clearable>
                                <el-option v-for="item in dt_monitor_state"
                                           :key="item.dictItemKey"
                                           :label="item.dictItemValue"
                                           :value="item.dictItemKey">
                                </el-option>
                            </el-select>
                            <el-button class="filter-item"
                                       type="primary"
                                       size="small"
                                       icon="el-icon-search"
                                       @click="handleQuerydata">{{ $t("table.search") }}</el-button>
                        </div>
                    </div>

                    <div class="table-container">
                        <el-table :key="tableKey"
                                  :data="listdata"
                                  border
                                  fit
                                  height="315"
                                  highlight-current-row
                                  style="width: 100%;"
                                  @selection-change="selectRow"
                                  ref="tb"
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
                                             :label="$t('Interfacemonitor.transactionNumber')"
                                             prop="transactionNumber"></el-table-column>
                            <el-table-column show-overflow-tooltip
                                             width="100"
                                             align="left"
                                             :label="$t('Interfacemonitor.interfaceCode')"
                                             prop="interfaceCode"></el-table-column>
                            <el-table-column show-overflow-tooltip
                                             width="100"
                                             align="left"
                                             :label="$t('Interfacemonitor.interfaceName')"
                                             prop="interfaceName"></el-table-column>
                            <el-table-column show-overflow-tooltip
                                             min-width="200"
                                             align="left"
                                             :label="$t('Interfacemonitor.address')"
                                             prop="address"></el-table-column>
                        </el-table>
                        <pagination :total="totaldata"
                                    :page.sync="listQuerydata.currentPage"
                                    :limit.sync="listQuerydata.pageSize"
                                    @pagination="getlistData" />

                    </div>

                </div>
                <div slot="footer"
                     class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">{{$t("table.cancel")}}</el-button>
                    <el-button v-if="dialogStatus == 'create'"
                               type="primary"
                               @click="create">{{ $t("table.confirm") }}</el-button>
                    <el-button v-else
                               type="primary"
                               @click="update">{{$t("table.confirm")}}</el-button>
                </div>
            </el-dialog>
            <el-dialog v-dialogDrag
                       custom-class="dialog-custom"
                       :close-on-click-modal="false"
                       :close-on-press-escape="false"
                       title="交易日志"
                       :visible.sync="dialogFormVisiblelog"
                       @close="handleClose">
                <textarea v-model="log"
                          style="margin-left:50px"
                          :cols="70"
                          :rows="10"></textarea>
            </el-dialog>
        </div>
    </div>

</template>

<script>
import * as api from "@/api/system/Interfacemonitor";
import Pagination from "@/components/Pagination";
import { mapState } from 'vuex';
import { getDomainId } from "@/utils/auth";
import { TWO_isAsync_OPTIONS } from "@/utils/constant";


export default {
    name: "Interfacemonitor",
    components: { Pagination },
    data () {
        return {
            list: null,
            listdata: null,
            total: 0,
            totaldata: 0,
            theight: 0,//表格高度
            flag: false,
            value3: "",
            valuedata: "",
            listQuery: {
                currentPage: 1,
                pageSize: 15,
            },
            listQuerydata: {
                currentPage: 1,
                pageSize: 10,
            },
            taskUpdateStatusDTO: {
                jobGroup: undefined,
                jobName: undefined,
                rowId: undefined,
                status: undefined
            },
            TWO_isAsync_OPTIONS: TWO_isAsync_OPTIONS,
            temp: {
                status: 1,
                remark: undefined,
                creator: getDomainId()
            },
            colorCode: undefined,
            selectCode: [],
            dialogFormVisible: false,
            explainDialogFormVisible: false,
            logDialogFormVisible: false,
            dialogFormVisiblelog: false,
            log: undefined,
            dialogStatus: "",
            tableKey: 0,
            rules: {

            }
        };
    },
    computed: {
        ...mapState({
            dt_implement_type: state => state.dict.dt_implement_type,
            dt_monitor_state: state => state.dict.dt_monitor_state
        })
    },
    mounted () {
        this.$store.dispatch("dict/getDicData", [
            "dt_implement_type",
            "dt_monitor_state"
        ]);
        this.setTableHeight();
        //表格高度自适应
        window.onresize = () => {
            this.setTableHeight()
        };
    },
    created () {
        this.getList();
    },
    filters: {
        statusFilter: function (a) {
            if (a === 1) {
                return "有效"
            } else {
                return "无效"
            }
        },
        isAsyncFilter: function (b) {
            if (b === 1) {
                return "同步"
            } else {
                return "异步"
            }
        },
        typeFilter: function (c) {
            if (c === "it1") {
                return "Spring服务"
            }
        }
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
        handlesynchro () { //同步
            if (this.selectlistRow) {
                api.updateRecord(this.selectlistRow.transactionNumber).then(() => {
                    this.getList()
                    this.$message({
                        title: "成功",
                        message: "同步成功",
                        type: "success",
                        duration: 2000
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
        handlemonitor () { //发送或更新
            if (this.selectlistRow) {
                api.updatemonitor(this.selectlistRow.transactionNumber).then(() => {
                    this.getList()
                    this.$message({
                        title: "成功",
                        message: "发送/更新成功",
                        type: "success",
                        duration: 2000
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
        handleExplain () {
            this.explainDialogFormVisible = true
        },
        handleQuery () {//查询
            this.listQuery.currentPage = 1;
            this.getList();
        },
        handleQuerydata () {
            this.listQuery.currentPage = 1;
            this.getlistData();
        },
        handlelog () {
            if (this.selectlistRow) {
                this.dialogStatus = "log";
                api.queryRecordlog(this.selectlistRow.transactionNumber).then(res => {
                    this.log = res.info
                })
                this.dialogFormVisiblelog = true;
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条信息",
                    type: "warning"
                });
            }

        },
        getlistData () {
            let transdata = {
                transactionNumber: this.selectlistRow.transactionNumber,
                currentPage: 1,
                pageSize: 10,
                time: undefined

            }
            if (this.valuedata) {
                transdata.time = this.valuedata
            } else {
                transdata.time = ""
            }
            api.queryRecorddata(transdata).then(res => {
                this.listdata = res.list
                this.totaldata = res.pages.count
            })
        },
        handledata () {//新增
            if (this.selectlistRow) {
                this.resetTemp();
                this.flag = false
                this.dialogStatus = "create";
                this.getlistData()
                this.dialogFormVisible = true;
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条信息",
                    type: "warning"
                });
            }
        },
        create () {//新增确认按钮
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
        // 获取表格选中时的数据
        selectRow (val) {
            this.selectlistRow = val[val.length - 1];
            if (val.length > 1) {
                this.$refs.tb.clearSelection();
                this.$refs.tb.toggleRowSelection(val.pop());
            }

        },

        handleUpdate () {//编辑弹窗
            if (this.selectlistRow) {
                this.temp = this.selectlistRow
                this.flag = true
                this.dialogStatus = "update";
                this.dialogFormVisible = true;
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条信息",
                    type: "warning"
                });
            }
        },
        update () {//编辑提交
            this.$refs["temp"].validate(valid => {
                if (valid) {
                    this.temp.updator = getDomainId()
                    api.updateRecord(this.temp).then(
                        () => {
                            this.getList();
                            this.dialogFormVisible = false;
                            this.$message({
                                title: "成功",
                                message: "更新成功",
                                type: "success",
                                duration: 2000
                            });
                        }
                    );
                }
            });
        },
        cancel () {//取消弹窗按钮
            this.dialogFormVisible = false;
        },
        resetTemp () {
            this.temp = {
                status: 1,
                remark: undefined,
                flag: false,
                creator: getDomainId()
            };
        },
        handleClose () {
            this.resetTemp();

        },

    }
};
</script>
