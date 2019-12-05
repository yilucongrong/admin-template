// 物料主数据物料选择,查询设置的物料选择，基础数据设置物料的选择
<template>
    <div class="tab_container">
        <div class="filter-container border_b_1">
            <div class="filter-items">
                <el-input
                    style="width:130px"
                    size="small"
                    placeholder="仓库编码"
                    v-model="listQuery.warehouseCode"
                    class="filter-item"
                    disabled
                    @keyup.enter.native="handleQuery"
                />
                <el-input
                    style="width:130px"
                    size="small"
                    placeholder="物料编码"
                    v-model="listQuery.materielCode"
                    class="filter-item"
                    @keyup.enter.native="handleQuery"
                />
                <el-input
                    style="width:130px"
                    size="small"
                    placeholder="物料名称"
                    v-model="listQuery.materielName"
                    class="filter-item"
                    @keyup.enter.native="handleQuery"
                />
                <el-button
                    class="filter-item"
                    type="primary"
                    size="small"
                    icon="el-icon-search"
                    @click="handleQuery"
                    >{{ $t('table.query') }}</el-button
                >
            </div>
        </div>
        <div class="table-container">
            <div class="oprate_btn">
                <el-button
                    class="filter-item"
                    type="primary"
                    size="small"
                    @click="handleDelete"
                    icon="el-icon-delete"
                    >{{ $t('table.delete') }}</el-button
                >
            </div>
            <el-table
                ref="tbselect"
                :key="tableKey"
                :data="list"
                border
                fit
                height="305px"
                highlight-current-row
                style="width: 100%;"
                size="mini"
                cell-class-name="table-cell"
                header-cell-class-name="header-cell"
                @selection-change="selectRow"
            >
                <el-table-column
                    type="selection"
                    fixed
                    width="30"
                    align="center"
                ></el-table-column>
                <el-table-column
                    show-overflow-tooltip
                    label="仓库编码"
                    prop="warehouseCode"
                    fixed
                ></el-table-column>
                <el-table-column
                    show-overflow-tooltip
                    label="仓库名称"
                    prop="warehouseName"
                    fixed
                ></el-table-column>
                <el-table-column
                    show-overflow-tooltip
                    align="left"
                    :label="$t('PullListReceipt.area')"
                    prop="wareAreaCode"
                >
                </el-table-column>
                <el-table-column
                    show-overflow-tooltip
                    align="left"
                    :label="$t('PullListReceipt.locator')"
                    prop="wareLocationCode"
                >
                </el-table-column>
                <el-table-column
                    show-overflow-tooltip
                    :label="$t('poFormulation.materielCode')"
                    prop="materielCode"
                ></el-table-column>
                <el-table-column
                    show-overflow-tooltip
                    :label="$t('poFormulation.materielName')"
                    prop="materielName"
                ></el-table-column>
                <el-table-column
                    show-overflow-tooltip
                    min-width="150"
                    align="left"
                    :label="$t('storage_material_distribution.stockEmpName')"
                    prop="stockEmpName"
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
import * as api from '@/api/data-base/warehouse-distribute'
import Pagination from '@/components/Pagination'
import { DICT_CODE, TWO_STATE_OPTIONS, DT_ORG_TYPE } from '@/utils/constant'

export default {
    name: 'wlxz',
    components: { Pagination },
    props: [
        'warehouseCode',
        'orgCode',
        'materielselect',
        'unMutiple',
        'toOrgCode'
    ],
    data() {
        return {
            list: null,
            listSelected: [],
            total: 0,
            parentsRows: null,
            areaList: null,
            locatorList: [],
            listQuery: {
                page: true,
                currentPage: 1,
                pageSize: 10,
                materielCode: undefined,
                supplierCode: undefined,
                orgCode: undefined,
                toOrgCode: undefined,
                warehouseCode: this.warehouseCode
            },
            selectCode: [],
            tableKey: 0,
            activeName2: 'first',
            DICT_CODE: DICT_CODE,
            TWO_STATE_OPTIONS: TWO_STATE_OPTIONS,
            DT_ORG_TYPE: DT_ORG_TYPE
        }
    },
    methods: {
        getList() {
            api.queryRecords(this.listQuery).then(res => {
                console.log(res, '666')
                this.list = res.data.list.map(v => {
                    v.wareAreaCode = v.areaCode
                    v.wareLocationCode = v.locationCode
                    return v
                })
                this.total = res.data.pages.count
            })
        },
        handleDelete() {
            //删除方法
            if (this.selectlistRow) {
                this.$confirm(
                    this.$t('message.isDeleteContinue'),
                    this.$t('message.prompt'),
                    {
                        confirmButtonText: this.$t('message.yes'),
                        cancelButtonText: this.$t('message.no'),
                        type: 'warning'
                    }
                ).then(() => {
                    api.deleteRecord(this.selectlistRow[0].rowId).then(() => {
                        this.getList()
                        this.$notify({
                            title: '成功',
                            message: '删除成功',
                            type: 'success',
                            duration: 2000
                        })
                    })
                })
            } else {
                this.$message({
                    title: '警告',
                    message: '请选择一条信息',
                    type: 'warning'
                })
            }
        },
        selectRow(val) {
            this.selectlistRow = val
        },
        handleQuery() {
            this.listQuery.currentPage = 1
            this.getList()
        },
        handleSizeChange(val) {
            this.listQuery.pageSize = val
            this.getList()
        },
        handleCurrentChange(val) {
            this.listQuery.currentPage = val
            this.getList()
        }
    },
    watch: {
        warehouseCode: {
            handler(newValue) {
                this.listQuery.warehouseCode = newValue
                this.getList()
            },
            deep: true
        }
    }
}
</script>
