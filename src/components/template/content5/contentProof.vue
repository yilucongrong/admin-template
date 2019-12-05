<template>
    <div>
        <el-col :span="5"
                class="left_content">
            <div class="table-container">
                <el-table :key="tableKey"
                          :data="list"
                          border
                          fit
                          :height="theight"
                          highlight-current-row
                          style="width: 100%;"
                          ref="tbmain"
                          @selection-change="selectChange"
                          @row-click="rowClick"
                          size="mini"
                          cell-class-name="table-cell"
                          header-cell-class-name="header-cell">
                    <el-table-column type="selection"
                                     fixed
                                     width="30"
                                     align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="50"
                                     align="left"
                                     :label="'单号'"
                                     prop="proofNo"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     align="left"
                                     :label="'创建时间'"
                                     prop="createTime"></el-table-column>
                </el-table>

                <pagination :total="total"
                            :page.sync="listQuery.currentPage"
                            :layout="'total, prev, pager, next'"
                            :limit.sync="listQuery.pageSize"
                            @pagination="getList"
                            class="pagination-container" />
            </div>
        </el-col>
        <el-col :span="19"
                class="right_content">
            <div class="">
                <div class="filter-container">
                    <div class="filter-items">
                        <el-select class="filter-item"
                                   :placeholder="'业务类型'"
                                   size="small"
                                   filterable
                                   v-model="listQuery.dicType">
                            <el-option v-for="item in businessTypeList.options"
                                       :label="item.wareRuleCode+'--'+item.wareRuleName"
                                       :key="item.wareRuleCode"
                                       :value="item.wareRuleCode">
                            </el-option>
                        </el-select>
                        <el-date-picker class="range_date filter-item"
                                        size="small"
                                        v-model="accountRangeTime"
                                        type="daterange"
                                        :start-placeholder="'记账日期'"
                                        :end-placeholder="'结束日期'"
                                        value-format="yyyy-MM-dd"></el-date-picker>

                        <el-button size="small"
                                   class="filter-item"
                                   type="primary"
                                   icon="el-icon-search"
                                   @click="handleQuery">查询</el-button>
                        <el-button size="small"
                                   class="filter-item"
                                   type="primary"
                                   icon="el-icon-printer "
                                   @click="handlePrint">打印</el-button>
                        <el-button size="small"
                                   class="filter-item"
                                   type="primary"
                                   icon="el-icon-upload2"
                                   @click="handleExport">{{$t('btn.export')}}</el-button>
                    </div>
                </div>
                <div class="table-container  border_t_1">
                    <!-- <div class="oprate_btn">
                        <el-button size="small" class="filter-item" type="primary" icon="el-icon-search" @click="handleQuery">{{$t('table.query')}}</el-button>
                        <el-button size="small" class="filter-item" type="primary" icon="el-icon-printer " @click="handlePrint">{{$t('table.print')}}</el-button>
                        <el-button size="small" class="filter-item" type="primary" icon="el-icon-upload2" @click="handleExport">{{$t('btn.export')}}</el-button>
                    </div> -->
                    <el-table key="0"
                              :data="listDetail"
                              :height="sheight"
                              border
                              fit
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
                                         width="130"
                                         align="left"
                                         :label="'凭证号'"
                                         prop="proofNo"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         width="130"
                                         align="left"
                                         :label="'业务类型'"
                                         prop="dicTypeName"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         width="130"
                                         align="left"
                                         :label="'物料编码'"
                                         prop="materielCode"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         width="130"
                                         align="left"
                                         :label="'物料名称'"
                                         prop="materielName"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         width="130"
                                         align="left"
                                         :label="'数量'"
                                         prop="quantity"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         width="130"
                                         align="left"
                                         :label="'组织编码'"
                                         prop="orgCode"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         width="130"
                                         align="left"
                                         :label="'组织名称'"
                                         prop="orgName"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         width="130"
                                         align="left"
                                         :label="'仓库编码'"
                                         prop="warehouseCode"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         width="130"
                                         align="left"
                                         :label="'记账日期'"
                                         prop="createTime"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         align="left"
                                         :label="'创建日期'"
                                         prop="createTime"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         align="left"
                                         :label="'记账人'"
                                         prop="accountor"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         width="130"
                                         align="left"
                                         :label="'库存类型'"
                                         prop="stockTypeName"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         width="130"
                                         align="left"
                                         :label="'库存状态'"
                                         prop="stockStateName"></el-table-column>
                    </el-table>
                    <pagination :total="totals"
                                :page.sync="listQuery.currentPage"
                                :limit.sync="listQuery.pageSize"
                                @pagination="getList"
                                class="pagination-container border_b_1" />
                    <el-table key="1"
                              :data="listDetailSub"
                              border
                              fit
                              :height="sheight"
                              highlight-current-row
                              style="width: 100%;"
                              size="mini"
                              cell-class-name="table-cell"
                              header-cell-class-name="header-cell">
                        <el-table-column show-overflow-tooltip
                                         width="130"
                                         align="left"
                                         :label="'凭证号'"
                                         prop="proofNo"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         width="130"
                                         align="left"
                                         :label="'业务类型'"
                                         prop="dicTypeName"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         width="130"
                                         align="left"
                                         :label="'物料编码'"
                                         prop="materielCode"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         width="130"
                                         align="left"
                                         :label="'物料名称'"
                                         prop="materielName"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         width="130"
                                         align="left"
                                         :label="'数量'"
                                         prop="quantity"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         width="130"
                                         align="left"
                                         :label="'记账日期'"
                                         prop="createTime"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         width="130"
                                         align="left"
                                         :label="'库区'"
                                         prop="wareAreaCode"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         width="130"
                                         align="left"
                                         :label="'库位'"
                                         prop="wareLocationCode"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         width="130"
                                         align="left"
                                         :label="'库存类型'"
                                         prop="stockTypeName"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         width="130"
                                         align="left"
                                         :label="'库存状态'"
                                         prop="stockStateName"></el-table-column>
                    </el-table>
                    <pagination :total="totals"
                                :page.sync="listQuery.currentPage"
                                :limit.sync="listQuery.pageSize"
                                @pagination="getList"
                                class="pagination-container" />
                </div>
            </div>
        </el-col>

    </div>
</template>

<script>

import Pagination from "@/components/Pagination";

export default {
    name: "Hand_pulled_material",
    components: { Pagination },
    data () {
        return {
            theight: 0,
            sheight: 0,
            isSingle: true,//表格是否单选 点击各按钮根据流程逻辑控制单多选
            currentSelectedRow: null,//当前选中的行
            selectedRows: null,//多选时选中的所有行
            list: null,
            listDetail: null,
            listDetailSub: null,
            total: 0,
            totals: 0,
            rangeTime: "",
            accountRangeTime: "",
            selectRows: [],
            businessTypeList: [],
            supplierRows: [],
            listQuery: {
                page: true,
                currentPage: 1,
                pageSize: 10,
                orgCode: '',
                warehouseCode: '',
                dicType: ''
            },
            sublistQueryf: {
                page: true,
                currentPage: 1,
                pageSize: 10,
                method: 'proofDetai'
            },
            sublistQuerys: {
                page: true,
                currentPage: 1,
                pageSize: 10,
                method: 'processingDetail'
            },
            tableKey: 0,
            dialogPrintVisible: false,
            printData: {},//打印数据
            printList: []
        };
    },
    filters: {

    },
    mounted () {
        this.setTableHeight();
        //表格高度自适应
        window.onresize = () => {
            this.setTableHeight()
        };
    },
    methods: {
        //表格高度计算
        setTableHeight () {
            this.theight = this.$myFun.getSingleTbHeight() + 53;
            this.sheight = (this.$myFun.getSingleTbHeight() - 33) / 2;
        },
        //主表数据获取
        getList () {
            if (this.rangeTime) {
                let d1 = this.rangeTime[0];
                let d2 = this.rangeTime[1];
                this.listQuery.createDateBegin = d1;
                this.listQuery.createDateEnd = d2;
            } else {
                this.listQuery.createDateStart = null;
                this.listQuery.createDateEnd = null;
            }
            if (this.accountRangeTime) {
                let d1 = this.accountRangeTime[0];
                let d2 = this.accountRangeTime[1];
                this.listQuery.accountDateBegin = d1;
                this.listQuery.accountDateEnd = d2;
            } else {
                this.listQuery.accountDateBegin = null;
                this.listQuery.accountDateEnd = null;
            }

        },
        //查询
        handleQuery () {
            this.listRow = [];
            this.listQuery.currentPage = 1;
            this.getList();
        },
        //每页大小变化
        handleSizeChange (val) {
            this.listQuery.pageSize = val;
            this.getList();
        },
        //当前页变化
        handleCurrentChange (val) {
            this.listQuery.currentPage = val;
            this.getList();
        },
        // 表格选择框选中 注:参数为选中的所有行的数组
        selectChange (val) {
            if (this.isSingle) {
                if (val.length > 1) {
                    this.$refs.tb.clearSelection(); //清除其他行的选中
                    this.$refs.tb.toggleRowSelection(val[val.length - 1], "selected"); //单击行绑定点击事件
                } else if (val.length === 1) {
                    this.selectedRows = val;
                    this.currentSelectedRow = val[val.length - 1]
                }
            } else {
                this.selectedRows = val;
                this.currentSelectedRow = val[val.length - 1]
            }
        },
        //点击表格某一行
        rowClick (val) {
            if (this.isSingle) {
                this.$refs.tb.clearSelection(); //清除其他行的选中
            }
            this.$refs.tb.toggleRowSelection(val, "selected"); //单击行绑定点击事件
            this.getSubList(val);
        },
        //显示从表
        getSubList () {

        },
        //打印
        handlePrint () {

        },
        //导出
        handleExport () {

        }
    }
}
</script>