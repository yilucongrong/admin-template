<template>
    <div>
        <div class="filter-container">
            <div class="filter-items">
                <div class="select-element">
                    <el-input
                        size="small"
                        :placeholder="
                            $t('materielTransferType.transferTypeCode')
                        "
                        v-model="listMainQuery.wareRuleCode"
                        class="filter-item"
                        @keyup.enter.native="handleQuery"
                    />
                    <el-input
                        size="small"
                        :placeholder="
                            $t('materielTransferType.transferTypeName')
                        "
                        v-model="listMainQuery.wareRuleName"
                        class="filter-item"
                        @keyup.enter.native="handleQuery"
                    />
                    <el-button
                        class="filter-item"
                        type="primary"
                        size="small"
                        icon="el-icon-circle-check"
                        @click="handleQuery"
                        >{{ $t('table.confirm') }}</el-button
                    >
                </div>
            </div>
        </div>
        <div class="table-container">
            <el-table
                :data="listMain"
                border
                fit
                height="320px"
                highlight-current-row
                style="width: 100%;"
                ref="tbmain"
                @selection-change="selectRow"
                size="mini"
                cell-class-name="table-cell"
                header-cell-class-name="header-cell"
            >
                <el-table-column
                    type="selection"
                    fixed
                    width="30"
                    align="center"
                ></el-table-column>
                <el-table-column
                    show-overflow-tooltip
                    align="left"
                    :label="$t('materielTransferType.transferTypeCode')"
                    prop="wareRuleCode"
                ></el-table-column>
                <el-table-column
                    show-overflow-tooltip
                    align="left"
                    :label="$t('materielTransferType.transferTypeName')"
                    prop="wareRuleName"
                ></el-table-column>
            </el-table>
            <pagination
                :total="total"
                :page.sync="listMainQuery.currentPage"
                :limit.sync="listMainQuery.pageSize"
                @pagination="getMainList"
                class="pagination-container"
            />
        </div>
    </div>
</template>
<script>
import * as api from '@/api/data-base/material_transfer_type'
import Pagination from '@/components/Pagination'

export default {
    name: 'materiel_transfer_type',
    components: { Pagination },
    data() {
        return {
            total: 0,
            listMain: [],
            listMainQuery: {
                wareRuleCode: '',
                wareRuleName: '',
                statsClassify: '',
                currentPage: 0,
                pageSize: 10
            }
        }
    },
    mounted() {
        this.getMainList()
    },
    methods: {
        handleQuery() {
            this.getMainList()
        },
        getMainList() {
            api.queryRecords(this.listMainQuery).then(res => {
                this.listMain = res.data.list
                this.total = res.data.pages.count
            })
        },
        selectRow(val) {
            this.$emit('handSelectRows', val)
            this.$emit('handSelectRows1', val.wareRuleCode)
        }
    }
}
</script>
