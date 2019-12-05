// 查询+单表
<template>
    <div>
        <div class="tab_container">
            <div class="filter-container border_b_1">
                <div class="filter-items">
                    <el-input size="small"
                              placeholder="任务号"
                              v-model="listQuery.jobCoding"
                              class="filter-item"
                              @keyup.enter.native="handleQuery" />
                    <el-input size="small"
                              placeholder="任务名称"
                              v-model="listQuery.jobName"
                              class="filter-item" />
                    <el-date-picker size="small"
                                    v-model="value3"
                                    type="daterange"
                                    start-placeholder="执行日期"
                                    end-placeholder="执行日期"
                                    value-format="yyyy-MM-dd"></el-date-picker>
                    <!-- <span class="filter-item-name">客户类型</span> -->
                    <el-button class="filter-item "
                               type="primary"
                               size="small"
                               icon="el-icon-search"
                               @click="handleQuery">{{$t('table.query')}}</el-button>
                </div>
            </div>

            <div class="table-container">
                <el-table ref="tbselect"
                          :key="tableKey"
                          :data="list"
                          border
                          fit
                          highlight-current-row
                          style="width: 100%;"
                          size="mini"
                          cell-class-name="table-cell"
                          header-cell-class-name="header-cell">
                    <el-table-column type="expand">
                        <template slot-scope="scope">
                            <span>{{scope.row.errorInfo}}</span>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column type="selection"  width="30" align="center"></el-table-column> -->
                    <el-table-column show-overflow-tooltip
                                     label="序号"
                                     prop="rowId"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     label="任务号"
                                     prop="jobCoding"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     label="任务名称"
                                     prop="jobName"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     label="执行日期"
                                     prop="executionDate"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     label="执行结果"
                                     prop="executionResult">
                        <template slot-scope="scope">
                            {{ scope.row.executionResult | resultFilter }}
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     label="耗时"
                                     prop="timeConsuming"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     label="corn表达式"
                                     prop="cronExpression"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     label="主机IP"
                                     prop="hostIp"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     label="主机名"
                                     prop="hostName"></el-table-column>
                </el-table>
                <pagination :total="total"
                            :page.sync="listQuery.currentPage"
                            :limit.sync="listQuery.pageSize"
                            @pagination="getList" />

            </div>
        </div>
    </div>
</template>

<script>
import * as api from "@/api/system/task_configuration";
import Pagination from "@/components/Pagination";
export default {
    name: "Customer",
    components: { Pagination },
    props: ['supplierCode', 'orgCode', 'materielselect', 'unMutiple'],
    data () {
        return {
            list: null,
            total: 0,
            parentsRows: null,
            value3: "",
            selectedDetails: null,//已选中内容
            listQuery: {
                page: true,
                currentPage: 1,
                pageSize: 10,
                materielCode: undefined,
                supplierCode: undefined,
                orgCode: undefined,
                executionDateStart: undefined,
                executionDateEnd: undefined
            },
            temp: {
                materielCode: undefined,
                supplierCode: undefined,
                orgCode: undefined,
                materielName: undefined,
                state: 1,
                supplierName: undefined
            },
            selectCode: [],
            tableKey: 0,
        };
    },
    created () {
        this.getList()
    },
    filters: {
        resultFilter: function (a) {
            if (a === 1) {
                return "等待被执行"
            } else if (a === 2) {
                return "暂停"
            } else if (a === 3) {
                return "删除"
            } else if (a === 4) {
                return "出现异常"
            } else if (a === 5) {
                return "开始执行"
            } else if (a === 6) {
                return "执行成功"
            }
        }
    },
    methods: {
        getList () {
            if (this.value3) {
                this.listQuery.executionDateStart = this.value3[0]
                this.listQuery.executionDateEnd = this.value3[1]
            } else {
                this.listQuery.executionDateStart = ""
                this.listQuery.executionDateEnd = ""
            }
            api.queryRecordsLog(this.listQuery).then(res => {
                this.list = res.data.list
                this.list.forEach((item, index) => {
                    item.rowId = (this.listQuery.currentPage - 1) * this.listQuery.pageSize + index + 1
                })
                this.total = res.data.pages.count
            })
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
    },
};
</script>
