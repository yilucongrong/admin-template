<template>
    <div>
        <div class="tab_container">
            <div class="filter-container border_b_1">
                <div class="filter-items">
                    <span class="filter-item-name">{{$t('measureUnit.measureCode')}}</span>
                    <el-input class="filter-item"
                              size="small"
                              v-model="listQuery.measureCode">
                    </el-input>
                    <span class="filter-item-name">{{$t('measureUnit.measureName')}}</span>
                    <el-input class="filter-item"
                              size="small"
                              v-model="listQuery.measureName">
                    </el-input>
                    <span class="filter-item-name">{{$t('measureUnit.dimension')}}</span>
                    <dictItemSelect class="filter-item"
                                    :dictCode="DICT_CODE.dimension"
                                    v-model="listQuery.dimension">
                    </dictItemSelect>
                    <el-button class="filter-item"
                               size="small"
                               type="primary"
                               icon="el-icon-search"
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
                          header-cell-class-name="header-cell">
                    <el-table-column show-overflow-tooltip
                                     width="120"
                                     align="center"
                                     :label="$t('measureUnit.measureCode')"
                                     prop="measureCode"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="200"
                                     align="center"
                                     :label="$t('measureUnit.measureName')"
                                     prop="measureName"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="100"
                                     align="center"
                                     :label="$t('measureUnit.dimension')"
                                     prop="dimensionName"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="100"
                                     align="center"
                                     :label="$t('measureUnit.isBase')">
                        <template slot-scope="scope">
                            <!--{{ scope.row.isBase}}-->
                            {{ [scope.row.isBase, TWO_STATE_OPTIONS] | optionsFilter }}
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="100"
                                     align="center"
                                     :label="$t('measureUnit.transferRate')"
                                     prop="transferRate"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     min-width="100"
                                     align="center"
                                     :label="$t('measureUnit.remark')"
                                     prop="remark"></el-table-column>
                </el-table>
            </div>
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
                this.list = res.data;
            });
        },
        handleDblclick (row) {
            this.$emit("dblclick", row);
        }
    }
};
</script>
