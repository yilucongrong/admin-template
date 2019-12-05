// 物料选择by货源清单

<template>
    <div class="tab_container">
        <el-tabs v-model="activeName2"
                 type="card">
            <el-tab-pane :label="$t('table.tbSelected')"
                         name="first">
                <div class="filter-container border_b_1">
                    <orgSelect style="width:130px"
                               :placeholder="$t('poFormulation.orgCode')"
                               class="filter-item"
                               :orgType="DT_ORG_TYPE.factory"
                               v-model="listQuery.orgCode"
                               disabled></orgSelect>
                    <el-input style="width:130px"
                              size="small"
                              :placeholder="$t('poFormulation.materielCode')"
                              v-model="listQuery.materielCode"
                              class="filter-item"
                              @keyup.enter.native="handleQuery" />
                    <el-input style="width:130px"
                              size="small"
                              :placeholder="$t('poFormulation.supplierCode')"
                              v-model="listQuery.supplierCode"
                              class="filter-item"
                              disabled />
                    <el-input style="width:130px"
                              size="small"
                              placeholder="到货单位"
                              v-model="listQuery.toOrgCode"
                              class="filter-item"
                              disabled />
                    <!-- <span class="filter-item-name">客户类型</span> -->
                    <el-button class="filter-item"
                               type="primary"
                               size="small"
                               icon="el-icon-search"
                               @click="handleQuery">{{$t('table.query')}}</el-button>
                </div>

                <div class="table-container">
                    <el-table ref="tbselect"
                              :key="tableKey"
                              :data="list"
                              border
                              fit
                              height="305px"
                              highlight-current-row
                              style="width: 100%;"
                              @select='selectMain'
                              size="mini"
                              cell-class-name="table-cell"
                              header-cell-class-name="header-cell">
                        <el-table-column type="selection"
                                         fixed
                                         width="30"
                                         align="center"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         :label="$t('poFormulation.orgCode')"
                                         prop="orgCode"
                                         fixed></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         :label="$t('poFormulation.materielCode')"
                                         prop="materielCode"
                                         fixed></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         :label="$t('poFormulation.materielName')"
                                         prop="materielName"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         :label="$t('poFormulation.supplierCode')"
                                         prop="supplierCode"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         :label="$t('poFormulation.supplierName')"
                                         prop="supplierName"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         :label="$t('poFormulation.snp')"
                                         prop="snp2">
                            <!-- <template slot-scope="scope">{{scope.row.snp ? scope.row.snp:"1"}}</template> -->
                        </el-table-column>
                        <el-table-column show-overflow-tooltip
                                         :label="$t('poFormulation.specification')"
                                         prop="specification"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         :label="$t('poFormulation.purchaseMeasuringUnit')"
                                         prop="purchaseMeasuringUnit">
                            <template slot-scope="scope">{{scope.row.purchaseMeasuringUnit ? scope.row.snp:scope.row.measuringUnit}}</template>
                        </el-table-column>
                        <el-table-column show-overflow-tooltip
                                         :label="$t('poFormulation.measuringUnit')"
                                         prop="measuringUnit"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         :label="$t('poFormulation.transferRate')"
                                         prop="transferRate">
                            <template slot-scope="scope">{{scope.row.transferRate ? scope.row.transferRate:"1"}}</template>
                        </el-table-column>
                        <el-table-column show-overflow-tooltip
                                         min-width="100"
                                         align="left"
                                         :label="$t('poFormulation.state')"
                                         prop="state">
                            <template slot-scope="scope">{{scope.row.state | stateFilter}}</template>
                        </el-table-column>
                    </el-table>
                    <pagination class="border_b_1"
                                :total="total"
                                :page.sync="listQuery.currentPage"
                                :limit.sync="listQuery.pageSize"
                                @pagination="getList" />
                </div>

            </el-tab-pane>
            <el-tab-pane :label="$t('table.selected')"
                         name="second">
                <div class="table-container">
                    <el-table :key="'2'"
                              :data="listSelected"
                              border
                              fit
                              height="305px"
                              highlight-current-row
                              style="width: 100%;"
                              size="mini"
                              cell-class-name="table-cell"
                              header-cell-class-name="header-cell">
                        <el-table-column show-overflow-tooltip
                                         :label="$t('poFormulation.orgCode')"
                                         prop="orgCode"
                                         fixed></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         :label="$t('poFormulation.materielCode')"
                                         prop="materielCode"
                                         fixed></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         :label="$t('poFormulation.materielName')"
                                         prop="materielName"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         :label="$t('poFormulation.supplierCode')"
                                         prop="supplierCode"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         :label="$t('poFormulation.supplierName')"
                                         prop="supplierName"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         :label="$t('poFormulation.snp')"
                                         prop="snp2"></el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import * as api from "@/api/data-base/source-list";
import orgSelect from "@/components/Select/orgSelect.vue";
import Pagination from "@/components/Pagination";
import { DICT_CODE, TWO_STATE_OPTIONS, DT_ORG_TYPE } from "@/utils/constant";


export default {
    name: "wlxz",
    components: { Pagination, orgSelect },
    props: ['supplierCode', 'orgCode', 'materielselect', 'unMutiple', 'toOrgCode'],
    data () {
        return {
            list: null,
            listSelected: [],
            total: 0,
            parentsRows: null,
            listQuery: {
                page: true,
                currentPage: 1,
                pageSize: 10,
                materielCode: undefined,
                supplierCode: undefined,
                orgCode: undefined,
                toOrgCode: undefined
            },
            selectCode: [],
            tableKey: 0,
            activeName2: 'first',
            DICT_CODE: DICT_CODE,
            TWO_STATE_OPTIONS: TWO_STATE_OPTIONS,
            DT_ORG_TYPE: DT_ORG_TYPE
        };
    },
    methods: {
        checked (i) {
            this.$refs.tbselect.toggleRowSelection(this.list[i], true);
        },
        getList () {
            api.queryRecords(this.listQuery).then(res => {
                this.list = res.data.list;
                this.total = res.data.pages.count;
                if (this.listSelected) {
                    this.listSelected.forEach(items => {
                        items.snp2 = items.snp;
                        this.list.forEach((item, index) => {
                            if (item.materielCode === items.materielCode) {
                                this.$nextTick(function () {
                                    this.checked(index)
                                })
                            }
                        })
                    })
                }
            });
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
        //检查是否取消勾选
        checkUnsel (val, row) {
            let isuncheck = true;
            val.forEach(item => {
                if (item.materielCode === row.materielCode) {
                    isuncheck = false;
                }
            });
            return isuncheck;
        },
        selectMain (val, row) {
            if (this.unMutiple) {
                let isuncheck = this.checkUnsel(val, row);
                if (!isuncheck) {
                    let arr = [];
                    arr.push(val[val.length - 1])
                    this.listSelected = arr;
                    if (val.length > 1) {
                        this.$refs.tbselect.clearSelection()
                        this.$refs.tbselect.toggleRowSelection(val[val.length - 1], 'selected')
                    }
                } else {
                    this.listSelected = [];
                }
            } else {
                let isuncheck = this.checkUnsel(val, row);
                if (!isuncheck) {
                    if (this.listSelected) {
                        val.forEach((items, indexv) => {
                            let isSelected = false;
                            this.listSelected.forEach((item) => {
                                if (item.materielCode === items.materielCode) {
                                    isSelected = true
                                }
                            })
                            if (!isSelected) {
                                this.listSelected.push(val[indexv]);
                            }
                        })
                    } else {
                        this.listSelected = val;
                    }
                } else {
                    this.listSelected = this.listSelected.filter(item => {
                        return item.materielCode !== row.materielCode;
                    })
                }
            }
        }
    },
    watch: {
        supplierCode: {
            handler (newValue) {
                this.listQuery.supplierCode = newValue
                this.getList()
            },
            deep: true
        },
        orgCode: {
            handler (newValue) {
                this.listQuery.orgCode = newValue
                this.getList()
            },
            deep: true
        },
        toOrgCode: {
            handler (newValue) {
                this.listQuery.toOrgCode = newValue
                this.getList()
            },
            deep: true
        },
    }

};
</script>
