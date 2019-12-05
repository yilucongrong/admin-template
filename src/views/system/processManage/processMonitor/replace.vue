<template>
    <div>
        <div class="app-container">
            <div class="filter-container">
                <div class="filter-items">
                    <el-input size="small"
                              :placeholder="$t('color.colorCode')"
                              v-model="listQuery.colorCode"
                              class="filter-item"
                              @keyup.enter.native="handleQuery" />
                    <el-input size="small"
                              :placeholder="$t('color.colorName')"
                              v-model="listQuery.colorName"
                              @keyup.enter.native="handleQuery" />
                    <el-button class="filter-item"
                               type="primary"
                               size="small"
                               icon="el-icon-search"
                               @click="handleQuery">{{ $t('table.search') }}</el-button>
                </div>
            </div>
            <div class="table-container">
                <el-table :key="tableKey"
                          :data="list"
                          border
                          fit
                          highlight-current-row
                          style="width: 100%;"
                          @selection-change="selectRow"
                          size="mini"
                          cell-class-name="table-cell"
                          header-cell-class-name="header-cell">
                    <el-table-column type="selection"
                                     fixed
                                     width="30"
                                     align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="120"
                                     align="left"
                                     label="序号"
                                     prop="colorCode"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="200"
                                     align="left"
                                     label="实例号"
                                     prop="colorName"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="100"
                                     align="left"
                                     label="流程定义号"
                                     prop="colorAbbreviation"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="100"
                                     align="left"
                                     label="业务号"
                                     prop="colorAbbreviation">
                    </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="120"
                                     align="left"
                                     label="活动号"
                                     prop="colorCode"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="200"
                                     align="left"
                                     label="活动名称"
                                     prop="colorName"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="100"
                                     align="left"
                                     label="任务号"
                                     prop="colorAbbreviation"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="100"
                                     align="left"
                                     label="所有人"
                                     prop="colorAbbreviation">
                    </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     min-width="480"
                                     align="left"
                                     label="执行人"
                                     prop="remark"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="100"
                                     align="left"
                                     label="授权类型"
                                     prop="colorAbbreviation">
                    </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     min-width="480"
                                     align="left"
                                     label="开始时间"
                                     prop="remark"></el-table-column>
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
import * as api from '@/api/data-base/color'
import Pagination from '@/components/Pagination'


export default {
    name: 'color',
    components: { Pagination },
    data () {
        return {
            list: null,
            total: 0,
            listQuery: {
                page: true,
                currentPage: 1,
                pageSize: 15,
                colorCode: undefined,
                colorName: undefined
            },
            temp: {
                colorCode: undefined,
                colorName: undefined,
                colorAbbreviation: undefined,
                state: 1,
                remark: undefined
            },
            colorCode: undefined,
            selectCode: [],
            dialogFormVisible: false,
            dialogStatus: '',
            tableKey: 0,
        }
    },
    created () {
        this.getList()
    },
    mounted () {

        this.getList()
    },
    methods: {
        getList () {
            api.queryRecords(this.listQuery).then(res => {
                this.list = res.data.list
                this.total = res.data.pages.count
            })
        },

        handleQuery () {
            //查询
            this.listQuery.currentPage = 1
            this.getList()
        },

        // 获取表格选中时的数据
        selectRow (val) {
            this.selectlistRow = val
        },
        cancel () {
            //取消弹窗按钮
            this.dialogFormVisible = false
        },
        resetTemp () {
            this.temp = {
                colorCode: undefined,
                colorName: undefined,
                colorAbbreviation: undefined,
                state: 1,
                remark: undefined
            }
        },
        handleClose () {
            this.resetTemp()
            this.$refs.temp.resetFields()
        },

    }
}
</script>
