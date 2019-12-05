<template>
    <div class="tab_container">     
        <div class="filter-container border_b_1">
            <div class="filter-items">
                <span class="filter-item-name">分类编码</span>
                <el-input @keyup.enter.native="handleQuery"
                          style="width: 120px;"
                          class="filter-item"
                          size="mini"
                          v-model="listQuery.dictItemKey">
                </el-input>
                <span class="filter-item-name">分类名称</span>
                <el-input @keyup.enter.native="handleQuery"
                          style="width: 120px;"
                          class="filter-item"
                          size="mini"
                          v-model="listQuery.dictItemValue">
                </el-input>

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
                      @selection-change="handleSelectionChange"
                      cell-class-name="table-cell"
                      header-cell-class-name="header-cell">
                <el-table-column type="selection"
                                 align="center"
                                 width="40"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 
                                 align="center"
                                 label="分类编码"
                                 prop="dictItemKey"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 
                                 align="center"
                                 label="分类名称"
                                 prop="dictItemValue"></el-table-column>
            </el-table>
        </div>         
    </div>  
</template>
<script>
import { getRecord } from '@/api/data-base/dict'
import { DICT_CODE } from '@/utils/constant'

export default {
    name: 'materiel-dict-item-table',
    data () {
        return {
            list: null,
            listQuery: {
                page: false,
                dictItemKey: undefined,
                dictItemValue: undefined
            },
            temp: {
                dictItemKey: undefined,
                dictItemValue: undefined
            },
            tableKey: 0,
            selectRow: [],
            DICT_CODE: DICT_CODE
        }
    },
    created () {
        this.getList()
    },
    methods: {
        getList () {
            getRecord(DICT_CODE.materielClassify).then(res => {
                this.list = res.data.dictItemDTOs
            })
        },
        handleQuery () {
            this.getList()
        },
        handleCreate () {
            if (this.selectRow.length == 0) {
                this.$message.warning('请勾选记录！')
                return
            }
            // this.$emit('selectRow', this.selectRow)
        },
        handleSelectionChange (val) {
             this.$emit('selectRow', val)
        }
    }
}
</script>
