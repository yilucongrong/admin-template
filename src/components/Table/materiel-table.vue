<template>
    <div class="app-container calendar-list-container popup">
        <div class="filter-container">
            <div class="filter-items">
                <dictItemSelect class="filter-item"
                                :placeholder="'物料类型'"
                                :dictCode="DICT_CODE.materielType"
                                v-model="listQuery.materielType">
                </dictItemSelect>
                <dictItemSelect class="filter-item"
                                :placeholder="'物料分类'"
                                :dictCode="DICT_CODE.materielClassify"
                                v-model="listQuery.materielClassify">
                </dictItemSelect>
                <dictItemSelect class="filter-item"
                                :placeholder="'物料组'"
                                :dictCode="DICT_CODE.materielGroup"
                                v-model="listQuery.materielGroup">
                </dictItemSelect>
                <el-input @keyup.enter.native="handleQuery"
                          class="filter-item"
                          :placeholder="'规格、型号'"
                          size="mini"
                          v-model="listQuery.specification">
                </el-input>

                <el-input @keyup.enter.native="handleQuery"
                          class="filter-item"
                          :placeholder="'物料编码'"
                          size="mini"
                          v-model="listQuery.materielCode">
                </el-input>
                <el-input @keyup.enter.native="handleQuery"
                          class="filter-item"
                          :placeholder="'物料名称'"
                          size="mini"
                          v-model="listQuery.materielName">
                </el-input>
                <el-input @keyup.enter.native="handleQuery"
                          class="filter-item"
                          :placeholder="'材质'"
                          size="mini"
                          v-model="listQuery.materialQuality">
                </el-input>
                <dictItemSelect class="filter-item"
                                :placeholder="'状态'"
                                :dictCode="DICT_CODE.productionState"
                                v-model="listQuery.productionState">
                </dictItemSelect>

                <el-button class="filter-item"
                           size="mini"
                           type="primary"
                           icon="el-icon-search"
                           @click="handleQuery">{{$t('table.search')}}</el-button>
            </div>
        </div>
        <div class="table-container">
            <el-table :key='tableKey'
                      :data="list"
                      border
                      fit
                      highlight-current-row
                      style="width: 100%"
                      size="mini"
                      cell-class-name="table-cell"
                      @row-click="handleDblclick"
                      height="315"
                      header-cell-class-name="header-cell">
                <el-table-column show-overflow-tooltip
                                 width="120"
                                 align="center"
                                 label="物料编码"
                                 prop="materielCode"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="120"
                                 align="center"
                                 label="物料名称(中文)"
                                 prop="materielName"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="120"
                                 align="center"
                                 label="物料名称(英文)"
                                 prop="materielEngName"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="120"
                                 align="center"
                                 label="物料类型"
                                 prop="materielTypeName"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="120"
                                 align="center"
                                 label="物料分类"
                                 prop="materielClassifyName"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="120"
                                 align="center"
                                 label="物料组"
                                 prop="materielGroupName"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="120"
                                 align="center"
                                 label="规格"
                                 prop="specification"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="120"
                                 align="center"
                                 label="材质"
                                 prop="materialQuality"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="80"
                                 align="center"
                                 label="计量单位"
                                 prop="measuringUnitName"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="120"
                                 align="center"
                                 label="外部物料编码"
                                 prop="externalMaterielCode"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="80"
                                 align="center"
                                 label="重量(KG）"
                                 prop="weight"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="80"
                                 align="center"
                                 label="体积(CM³)"
                                 prop="volume"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="80"
                                 align="center"
                                 label="长(CM)"
                                 prop="length"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="80"
                                 align="center"
                                 label="宽(CM)"
                                 prop="width"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="80"
                                 align="center"
                                 label="高(CM)"
                                 prop="height"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="80"
                                 align="center"
                                 label="保质期(天)"
                                 prop="shelfLife"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="80"
                                 align="center"
                                 label="产品等级"
                                 prop="classStandard"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="120"
                                 align="center"
                                 label="产品标准"
                                 prop="productStandard"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="80"
                                 align="center"
                                 label="生产状态"
                                 prop="productionStateName"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="80"
                                 align="center"
                                 label="重保标记">
                    <template slot-scope="scope">
                        {{ [scope.row.importantMaterielMark, TWO_STATE_OPTIONS] | optionsFilter }}
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="200"
                                 align="center"
                                 label="备注"
                                 prop="remark"></el-table-column>
            </el-table>

            <pagination :total="total"
                        :page.sync="listQuery.currentPage"
                        :limit.sync="listQuery.pageSize"
                        @pagination="getList" />
        </div>
    </div>
</template>
<script>
import { queryRecords } from '@/api/data-base/materiel'
import Pagination from '@/components/Pagination'
import dictItemSelect from '@/components/Select/dictItemSelect.vue'
import { DICT_CODE, TWO_STATE_OPTIONS } from '@/utils/constant'

export default {
    name: 'materiel-table',
    components: { dictItemSelect, Pagination },
    data () {
        return {
            list: null,
            total: 0,
            listQuery: {
                currentPage: 1,
                pageSize: 10,
                materielCode: undefined,
                materielName: undefined,
                materielType: undefined,
                materielClassify: undefined,
                materielGroup: undefined,
                specification: undefined,
                materialQuality: undefined,
                productionState: undefined
            },
            temp: {
                classStandard: undefined,
                externalMaterielCode: undefined,
                height: undefined,
                importantMaterielMark: 0,
                length: undefined,
                materialQuality: undefined,
                materielClassify: undefined,
                materielCode: undefined,
                materielEngName: undefined,
                materielGroup: undefined,
                materielName: undefined,
                materielType: undefined,
                measuringUnit: undefined,
                productStandard: undefined,
                productionState: undefined,
                remark: undefined,
                shelfLife: undefined,
                specification: undefined,
                volume: undefined,
                weight: undefined,
                width: undefined
            },
            materielCode: undefined,
            selectCode: [],
            dialogFormVisible: false,
            dialogFormVisible2: false,
            dialogStatus: '',
            tableKey: 0,
            DICT_CODE: DICT_CODE,
            TWO_STATE_OPTIONS: TWO_STATE_OPTIONS
        }
    },
    created () {
        this.getList()
    },
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
        handleDblclick (row) {
            this.$emit('dblclick', row)
        }
    }
}
</script>
