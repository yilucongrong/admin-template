<template>
    <div class="tab_container">
        <div class="filter-container border_b_1">
            <div class="filter-items">
                <orgSelect
                    class="filter-item"
                    style="width: 100px;"
                    :orgType="DT_ORG_TYPE.factory"
                    v-model="listQuery.orgCode"
                ></orgSelect>
                <el-input
                    @keyup.enter.native="handleQuery"
                    style="width: 100px;"
                    class="filter-item"
                    :placeholder="$t('warehouseDistribute.warehouseCode')"
                    size="small"
                    v-model="listQuery.warehouseCode"
                ></el-input>
                <el-button
                    class="filter-item"
                    size="small"
                    type="primary"
                    icon="el-icon-search"
                    @click="handleQuery"
                    >{{ $t('table.search') }}</el-button
                >
            </div>
        </div>
        <div class="table-container">
            <el-table
                :key="tableKey"
                :data="list"
                border
                fit
                highlight-current-row
                style="width: 100%"
                size="mini"
                cell-class-name="table-cell"
                height="320"
                header-cell-class-name="header-cell"
                @selection-change="selectRow"
                ref="tb"
            >
                <el-table-column
                    type="selection"
                    fixed
                    width="30"
                    align="center"
                ></el-table-column>
                <el-table-column
                    show-overflow-tooltip
                    align="center"
                    :label="$t('warehouseDistribute.orgName')"
                    prop="orgName"
                ></el-table-column>
                <el-table-column
                    show-overflow-tooltip
                    align="center"
                    :label="$t('warehouseDistribute.warehouseCode')"
                    prop="warehouseCode"
                ></el-table-column>
                <el-table-column
                    show-overflow-tooltip
                    align="center"
                    :label="$t('warehouseDistribute.warehouseName')"
                    prop="warehouseName"
                ></el-table-column>
            </el-table>
            <pagination
                :total="total"
                :page.sync="listQuery.currentPage"
                :limit.sync="listQuery.pageSize"
                @pagination="getList"
            />
        </div>
    </div>
</template>

<script>
import { queryRecords } from '@/api/data-base/warehouse'
import Pagination from '@/components/Pagination'
import orgSelect from '@/components/Select/orgSelect.vue'
import { DT_ORG_TYPE } from '@/utils/constant'
export default {
    name: 'reservoir-location',
    components: { Pagination, orgSelect },
    data() {
        return {
            list: null,
            total: 0,
            listQuery: {
                currentPage: 1,
                pageSize: 10,
                orgCode: undefined,
                warehouseCode: undefined
            },
            dialogStatus: '',
            tableKey: 0,
            tableKey1: 0,
            tableKey2: 0,
            DT_ORG_TYPE: DT_ORG_TYPE,
            rules: {}
        }
    },
    created() {
        this.getList()
    },
    methods: {
        getList() {
            //查询组织
            queryRecords(this.listQuery).then(res => {
                this.list = res.data.list
                this.total = res.data.pages.count
            })
        },
        handleQuery() {
            this.listQuery.currentPage = 1
            this.getList()
        },
        selectRow(val) {
            //备选项选中行
            this.selectRowList = val[val.length - 1]
            if (val.length > 1) {
                this.$refs.tb.clearSelection()
                this.$refs.tb.toggleRowSelection(val.pop())
            }
            this.$emit('handSelectCkbmRows', this.selectRowList)
        }
    }
}
</script>
