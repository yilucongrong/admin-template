<template>
    <div>
        <div class="tab_container">
            <div class="filter-container border_b_1">
                <div class="filter-items">
                    <span class="filter-item-name">物料类型</span>
                    <dictItemSelect class="filter-item"
                                    style="width: 120px;"
                                    :dictCode="DICT_CODE.materielType"
                                    v-model="listQuery.materielType">
                    </dictItemSelect>
                    <span class="filter-item-name">物料分类</span>
                    <dictItemSelect class="filter-item"
                                    style="width: 120px;"
                                    :dictCode="DICT_CODE.materielClassify"
                                    v-model="listQuery.materielClassify">
                    </dictItemSelect>
                    <span class="filter-item-name">物料组</span>
                    <dictItemSelect class="filter-item"
                                    style="width: 120px;"
                                    :dictCode="DICT_CODE.materielGroup"
                                    v-model="listQuery.materielGroup">
                    </dictItemSelect>
                    <span class="filter-item-name">物料编码</span>
                    <el-input @keyup.enter.native="handleQuery"
                              style="width: 120px;"
                              class="filter-item"
                              size="small"
                              v-model="listQuery.materielCode">
                    </el-input>
                    <span class="filter-item-name">物料名称</span>
                    <el-input @keyup.enter.native="handleQuery"
                              style="width: 120px;"
                              class="filter-item"
                              size="small"
                              v-model="listQuery.materielName">
                    </el-input>
                    <el-button class="filter-item"
                               size="small"
                               type="primary"
                               icon="el-icon-search"
                               @click="handleQuery">搜索</el-button>
                </div>
            </div>

            <div class="table-container">
                <div class="oprate_btn">
                    <el-button class="filter-item"
                               size="small"
                               type="primary"
                               @click="handleCreate"
                               icon="el-icon-plus">{{$t('table.add')}}</el-button>
                </div>
                <el-table :key='tableKey'
                          :data="list"
                          border
                          fit
                          highlight-current-row
                          style="width: 100%"
                          size="mini"
                          cell-class-name="table-cell"
                          @selection-change="handleSelectionChange"
                          height="200"
                          header-cell-class-name="header-cell">
                    <el-table-column type="selection"
                                     align="center"
                                     width="40"></el-table-column>
                    <el-table-column width="120"
                                     align="center"
                                     label="物料编码"
                                     prop="materielCode"></el-table-column>
                    <el-table-column width="120"
                                     align="center"
                                     label="物料名称"
                                     prop="materielName"></el-table-column>
                    <el-table-column width="120"
                                     align="center"
                                     label="物料类型"
                                     prop="materielTypeName"></el-table-column>
                    <el-table-column width="120"
                                     align="center"
                                     label="物料分类"
                                     prop="materielClassifyName"></el-table-column>
                    <el-table-column width="120"
                                     align="center"
                                     label="物料组"
                                     prop="materielGroupName"></el-table-column>
                    <el-table-column width="120"
                                     align="center"
                                     label="规格"
                                     prop="specification"></el-table-column>
                    <el-table-column width="120"
                                     align="center"
                                     label="材质"
                                     prop="materialQuality"></el-table-column>
                    <el-table-column width="80"
                                     align="center"
                                     label="计量单位"
                                     prop="measuringUnitName"></el-table-column>
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
import { queryRecords } from '@/api/data-base/materiel'
import Pagination from '@/components/Pagination'
import dictItemSelect from '@/components/Select/dictItemSelect.vue'
import { DICT_CODE } from '@/utils/constant'

export default {
    name: 'materiel-multiple-table',
    components: { dictItemSelect, Pagination },
    props: {
        orgCode: {
            required: true,
            type: String,
            default: ''
        }
    },
    data () {
        return {
            list: null,
            total: 0,
            listQuery: {
                page: true,
                currentPage: 1,
                pageSize: 10,
                orgCode: this.orgCode,
                materielCode: undefined,
                materielName: undefined,
                materielType: undefined,
                materielClassify: undefined,
                materielGroup: undefined,
                specification: undefined,
                materialQuality: undefined,
                productionState: undefined
            },
            selectRow: [],
            tableKey: 0,
            DICT_CODE: DICT_CODE
        }
    },
    created () {
        this.getList()
    },
    //    watch: {
    //      orgCode: {
    //        handler: function (val, oldVal) {
    //          this.resetTemp()
    //          if (val) {
    //            this.getList()
    //          } else {
    //            this.list = []
    //          }
    //          if (oldVal) {
    //            this.selectValue = undefined;
    //            this.$emit('change', undefined)
    //          }
    //        },
    //        immediate: true
    //      }
    //    },
    methods: {
        getList () {
            queryRecords(this.listQuery).then(res => {
                this.list = res.data.list
                this.total = res.data.pages.count
            })
        },
        handleQuery () {
            this.listQuery.currentPage = 1
            this.getList()
        },
        handleSizeChange (val) {
            this.listQuery.pageSize = val
            this.getList()
        },
        handleCurrentChange (val) {
            this.listQuery.currentPage = val
            this.getList()
        },
        handleCreate () {
            if (this.selectRow.length == 0) {
                this.$message.warning('请勾选记录！')
                return
            }
            this.$emit('selectRow', this.selectRow)
        },
        handleSelectionChange (selection) {
            this.selectRow = selection
            this.$emit('selectRow', this.selectRow)
        },
        resetTemp () {
            this.selectRow = []
            this.listQuery = {
                page: true,
                currentPage: 1,
                pageSize: 10,
                orgCode: this.orgCode,
                materielCode: undefined,
                materielName: undefined,
                materielType: undefined,
                materielClassify: undefined,
                materielGroup: undefined,
                specification: undefined,
                materialQuality: undefined,
                productionState: undefined
            }
        }
    }
}
</script>
