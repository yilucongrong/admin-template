<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <div class="filter-items">
                <span class="filter-item-name">计量编码</span>
                <el-input class="filter-item"
                          size="mini"
                          v-model="listQuery.measureCode">
                </el-input>
                <span class="filter-item-name">计量名称</span>
                <el-input class="filter-item"
                          size="mini"
                          v-model="listQuery.measureName">
                </el-input>
                <span class="filter-item-name">所属量纲</span>
                <dictItemSelect class="filter-item"
                                :dictCode="DICT_CODE.dimension"
                                v-model="listQuery.dimension">
                </dictItemSelect>
                <el-button class="filter-item"
                           size="mini"
                           type="primary"
                           icon="search"
                           @click="handleQuery">{{$t('btn.search')}}</el-button>
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
                      @row-dblclick="handleDblclick"
                      height="200"
                      header-cell-class-name="header-cell">
                <el-table-column show-overflow-tooltip
                                 width="120"
                                 align="center"
                                 label="计量编码"
                                 prop="measureCode"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="200"
                                 align="center"
                                 label="计量名称"
                                 prop="measureName"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="100"
                                 align="center"
                                 label="所属量纲"
                                 prop="dimensionName"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="100"
                                 align="center"
                                 label="是否基本计量">
                    <template slot-scope="scope">
                        <!--{{ scope.row.isBase}}-->
                        {{ [scope.row.isBase, TWO_STATE_OPTIONS] | optionsFilter }}
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="100"
                                 align="center"
                                 label="装换率"
                                 prop="transferRate"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 min-width="480"
                                 align="center"
                                 label="备注"
                                 prop="remark"></el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import { queryRecords } from "@/api/data-base/measure-unit";
import dictItemSelect from "@/components/Select/dictItemSelect.vue";
import { DICT_CODE, TWO_STATE_OPTIONS } from "@/utils/constant";

export default {
    name: "measure-unit-table",
    components: { dictItemSelect },
    data () {
        return {
            list: null,
            listQuery: {
                measureCode: undefined,
                measureName: undefined,
                dimension: undefined,
                isEnabled: 1
            },
            tableKey: 0,
            DICT_CODE: DICT_CODE,
            TWO_STATE_OPTIONS: TWO_STATE_OPTIONS
        };
    },
    created () {
        this.handleQuery();
    },
    methods: {
        handleQuery () {
            queryRecords(this.listQuery).then(res => {
                this.list = res;
            });
        },
        handleDblclick (row) {
            this.$emit("dblclick", row);
        }
    }
};
</script>
