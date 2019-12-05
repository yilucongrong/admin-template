<template>
    <div>
        <el-row>
            <el-col class="left_content"
                    :span="12">
                <div class="table-container border_r_1">
                    <div class="oprate_btn no_t_border">
                        <el-button size="small"
                                   class="filter-item"
                                   type="primary"
                                   icon="el-icon-delete"
                                   @click="handleDelete">{{$t('table.delete')}}</el-button>
                    </div>
                    <el-table :data="list"
                              border
                              :key="tableKey[0]"
                              :height="theight"
                              fit
                              highlight-current-row
                              style="width: 100%;"
                              ref="tbmain"
                              @selection-change='selectRow'
                              size="mini"
                              cell-class-name="table-cell"
                              header-cell-class-name="header-cell">
                        <el-table-column type="selection"
                                         fixed
                                         width="30"
                                         align="center"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         align="left"
                                         :label="$t('ruleAttrDefine.rowId')"
                                         prop="rowId"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         align="left"
                                         :label="$t('ruleAttrDefine.rulePrepCode')"
                                         prop="rulePrepCode"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         align="left"
                                         :label="$t('ruleAttrDefine.rulePrepName')"
                                         prop="rulePrepName"></el-table-column>
                    </el-table>
                    <pagination :total="total"
                                :page.sync="listQuery.currentPage"
                                :limit.sync="listQuery.pageSize"
                                @pagination="getList"
                                class="pagination-container" />
                </div>
            </el-col>

            <el-col class="right_content no_l_border"
                    :span="12">
                <el-form style="margin-top:50px;"
                         :model="listAdd"
                         status-icon
                         :rules="rules"
                         ref="rule"
                         label-width="100px"
                         class="no_b_border">
                    <el-form-item :label="$t('ruleAttrDefine.rulePrepCode')"
                                  prop="rulePrepCode">
                        <el-input v-model="listAdd.rulePrepCode"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('ruleAttrDefine.rulePrepName')"
                                  prop="rulePrepName">
                        <el-input v-model="listAdd.rulePrepName"></el-input>
                    </el-form-item>
                </el-form>
                <el-button style="margin-left:200px;"
                           size="small"
                           class="filter-item"
                           type="primary"
                           icon="el-icon-plus"
                           @click="handleAdd">{{$t('table.add')}}</el-button>
            </el-col>
        </el-row>
    </div>

</template>

<script>
import { queryBatchRecords, addBatchRecords, deleteBatchRecords } from "@/api/data-base/ruleAttrDefine";
import Pagination from "@/components/Pagination";

export default {
    name: "contentBatch",
    components: { Pagination },
    data () {
        return {
            list: [],
            listAdd: {
                rulePrepCode: '',
                rulePrepName: ''
            },
            total: 0,
            theight: 0,
            tableKey: [0],//表格索引，虚拟dom渲染表格时使用
            selectRows: [],
            listQuery: {
                page: true,
                currentPage: 1,
                pageSize: 10

            },
            rules: {

            }
        };
    },
    created () {
        this.getList();
    },
    mounted () {
        this.setTableHeight();
        //表格高度自适应
        window.onresize = () => {
            this.setTableHeight()
        };
    },
    methods: {
        //显示主表
        getList () {
            queryBatchRecords(this.listQuery).then(res => {
                this.list = res.data.list;
                this.total = res.data.pages.count;
            });
        },
        //表格高度计算
        setTableHeight () {
            this.theight = this.$myFun.getSingleTbHeight() - 35;

        },
        //查询
        handleQuery () {
            this.listRow = [];
            this.listQuery.currentPage = 1;
            this.getList();
        },
        //每页大小变化
        handleSizeChange (val) {
            this.listQuery.pageSize = val;
            this.getList();
        },
        //当前页变化
        handleCurrentChange (val) {
            this.listQuery.currentPage = val;
            this.getList();
        },
        //主表勾选框选中
        selectRow (val) {
            this.selectRows = val[val.length - 1];
            if (val.length > 1) {
                this.$refs.tbmain.clearSelection()
                this.$refs.tbmain.toggleRowSelection(val[val.length - 1], 'selected')
            }
        },
        handleDelete () {
            if (this.selectRows.rowId) {
                deleteBatchRecords(this.selectRows.rulePrepCode).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    });
                    this.getList();
                })
            } else {
                this.$message.warning(this.$t('message.checkedplease'));
            }
        },
        handleAdd () {
            if (this.listAdd.rulePrepCode && this.listAdd.rulePrepName) {
                addBatchRecords(this.listAdd).then(() => {
                    this.$message({
                        type: 'success',
                        message: '新增成功'
                    });
                    this.getList();
                })
            } else {
                this.$message.warning('请填写完整');
            }
        }
    }
}
</script>

<style scoped>
</style>
