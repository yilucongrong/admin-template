<template>
    <div class="tab_container">
        <div class="filter-container">
            <div class="filter-items">
                <orgSelect class="filter-item"
                           :orgType="DT_ORG_TYPE.factory"
                           v-model="listQuery.orgCode"></orgSelect>
                <el-input @keyup.enter.native="handleQuery"
                          class="filter-item"
                          :placeholder="$t('warehouseDistribute.warehouseCode')"
                          size="small"
                          v-model="listQuery.warehouseCode"></el-input>
                <el-button class="filter-item"
                           size="small"
                           type="primary"
                           icon="el-icon-search"
                           @click="handleQuery">{{ $t('table.search') }}</el-button>
            </div>
        </div>
        <div class="table-container border_t_1">
            <el-table :key="tableKey"
                      :data="list"
                      border
                      fit
                      highlight-current-row
                      style="width: 100%"
                      size="mini"
                      cell-class-name="table-cell"
                      header-cell-class-name="header-cell"
                      @selection-change="selectRow"
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
                        :limit.sync="listQuery.pageSize"
                        @pagination="getList"
                        class="page-container border_b_1" />
        </div>
    </div>
</template>

<script>
import * as api1 from '@/api/data-base/warehouse'
import * as api from '@/api/data-base/warehouse-distribute'
import Pagination from '@/components/Pagination'
import orgSelect from '@/components/Select/orgSelect.vue'
import { DT_ORG_TYPE } from '@/utils/constant'
export default {
    name: 'reservoir-location',
    components: { Pagination, orgSelect },
    data () {
        return {
            list: null,
            list1: null,
            total: 0,
            total1: 0,
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
                orgCode: undefined
            },
            dtos: {
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
            parentsRows3: null,
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
            dialogStatus: '',
            tableKey: 0,
            tableKey1: 0,
            tableKey2: 0,
            DT_ORG_TYPE: DT_ORG_TYPE,
            rules: {}
        }
    },
    created () {
        this.getList()
    },
    methods: {
        getList () {
            //查询组织
            api1.queryRecords(this.listQuery).then(res => {
                this.list = res.data.list
                this.total = res.data.pages.count
            })
        },
        getList1 () {
            //查询仓库物料
            this.listQuery1.warehouseCode = this.selectlistRow1.warehouseCode
            this.listQuery1.orgCode = this.selectlistRow1.orgCode
            api.queryRecords(this.listQuery1).then(res => {
                this.list1 = res.data.list
                this.total1 = res.data.pages.count
            })
        },
        handleQuery () {
            this.listQuery.currentPage = 1
            this.getList()
        },
        selectRow (val) {
            //备选项选中行
            this.selectRowList = val[val.length - 1]
            if (val.length > 1) {
                this.$refs.tb.clearSelection()
                this.$refs.tb.toggleRowSelection(val.pop())
            }
            this.$emit('handSelectRows', this.selectRowList)
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
            }
        }
    }
}
</script>
