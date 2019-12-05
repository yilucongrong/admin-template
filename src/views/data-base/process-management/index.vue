<template>
    <div>
        <div class="app-container">
            <div class="filter-container">
                <div class="filter-items">
                    <el-input @keyup.enter.native="handleQuery"
                              placeholder="工序路线编码"
                              class="filter-item"
                              size="small"
                              v-model="listQuery.routeCode"></el-input>
                    <el-input @keyup.enter.native="handleQuery"
                              placeholder="工序路线名称"
                              class="filter-item"
                              size="small"
                              v-model="listQuery.routeName"></el-input>
                    <el-button class="filter-item-btn"
                               type="primary"
                               size="small"
                               icon="el-icon-search"
                               @click="handleQuery">{{ $t('btn.search') }}</el-button>
                </div>
            </div>
            <div class="table-container">
                <div class="oprate_btn">
                    <el-button size="small"
                               class="filter-item"
                               type="primary"
                               icon="el-icon-plus"
                               @click="handleCreate">{{ $t('btn.add') }}</el-button>
                    <el-button size="small"
                               class="filter-item"
                               type="primary"
                               icon="el-icon-edit"
                               @click="handleUpdate">{{ $t('btn.edit') }}</el-button>
                    <el-button size="small"
                               class="filter-item"
                               type="primary"
                               icon="el-icon-delete"
                               @click="handleDelete">{{ $t('btn.delete') }}</el-button>
                </div>
                <el-table :key="tableKey"
                          :data="list"
                          :height="theight"
                          border
                          fit
                          highlight-current-row
                          cell-class-name="table-cell"
                          header-cell-class-name="header-cell"
                          @selection-change="selectChange"
                          @row-click="rowClick"
                          ref="tb">
                    <el-table-column type="selection"
                                     width="30"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     min-width="100"
                                     align="center"
                                     label="自增"
                                     prop="rowId"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     min-width="100"
                                     align="center"
                                     label="产品编码"
                                     prop="materialNo"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     min-width="100"
                                     align="center"
                                     label="工序路线编码"
                                     prop="routeCode"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     min-width="100"
                                     align="center"
                                     label="工序路线名称"
                                     prop="routeName"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     min-width="100"
                                     align="center"
                                     label="备注"
                                     prop="note"></el-table-column>
                </el-table>
                <pagination :total="total"
                            :page.sync="listQuery.currentPage"
                            :limit.sync="listQuery.pageSize"
                            @pagination="getList" />

                <el-dialog custom-class="dialog-custom"
                           :close-on-click-modal="false"
                           :close-on-press-escape="false"
                           :title="
                        dialogStatus == 'create'
                            ? $t('table.add')
                            : $t('table.edit')
                    "
                           :visible.sync="dialogFormVisible"
                           v-dialogDrag
                           @close="handleClose">
                    <el-form class="small-space"
                             :model="temp"
                             ref="temp"
                             label-position="left"
                             label-width="100px"
                             size="mini"
                             style="max-width: 400px; ">
                        <el-form-item label="产品编码"
                                      prop="materialNo">
                            <el-input v-model="temp.materialNo"
                                      :disabled="dialogStatus != 'create'"></el-input>
                        </el-form-item>
                        <el-form-item label="工艺路线编码"
                                      prop="routeCode">
                            <el-input v-model="temp.routeCode"></el-input>
                        </el-form-item>
                        <el-form-item label="工艺路线名称"
                                      prop="routeName">
                            <el-input v-model="temp.routeName"></el-input>
                        </el-form-item>
                        <el-form-item label="备注"
                                      prop="note">
                            <el-input v-model="temp.note"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer"
                         class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">{{
                            $t('table.cancel')
                        }}</el-button>
                        <el-button v-if="dialogStatus == 'create'"
                                   type="primary"
                                   @click="create">{{ $t('table.confirm') }}</el-button>
                        <el-button v-else
                                   type="primary"
                                   @click="update">{{
                            $t('table.confirm')
                        }}</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
import * as api from '@/api/data-base/process-management'
import Pagination from '@/components/Pagination'
import { mapState } from 'vuex'
export default {
    name: 'processManagement',
    components: { Pagination },
    data () {
        return {
            theight: 0, //表格高度
            isSingle: true, //表格是否单选 点击各按钮根据流程逻辑控制单多选
            list: [],
            total: 0,
            listQuery: {
                //查询
                currentPage: 1,
                pageSize: 15
            },
            temp: {
                equipTypeCode: undefined,
                equipTypeName: undefined,
                note: undefined
            },
            dialogFormVisible: false,
            dialogStatus: '',
            currentSelectedRow: null, //当前选中的行
            selectedRows: null, //多选时选中的所有行
            tableKey: 0 //表格索引
        }
    },
    created () { },
    computed: {
        ...mapState({
            dt_role_type: state => state.dict.dt_role_type
        })
    },
    mounted () {
        this.$store.dispatch('dict/getDicData', ['dt_role_type'])
        this.setTableHeight()
        //表格高度自适应
        window.onresize = () => {
            this.setTableHeight()
        }
        this.getList()
    },
    methods: {
        //表格高度计算
        setTableHeight () {
            this.theight = this.$myFun.getSingleTbHeight()
        },
        //获取表格数据
        getList () {
            api.queryRecords(this.listQuery).then(res => {
                this.list = res.data.list
                this.total = res.data.pages.count
            })
        },
        //表格查询
        handleQuery () {
            this.listQuery.currentPage = 1
            this.getList()
        },
        handleClose () {
            this.resetTemp()
            this.$refs.temp.resetFields()
        },
        //表格显示条数变化
        handleSizeChange (val) {
            this.listQuery.pageSize = val
            this.getList()
        },
        //表格当前页变化
        handleCurrentChange (val) {
            this.listQuery.currentPage = val
            this.getList()
        },
        resetTemp () {
            this.temp = {
                equipTypeCode: undefined,
                equipTypeName: undefined,
                note: undefined
            }
        },
        handleCreate () {
            //新增按钮单击事件方法
            this.resetTemp()
            this.dialogStatus = 'create'
            this.dialogFormVisible = true
        },
        create () {
            api.addRecord(this.temp).then(() => {
                this.getList()
                this.dialogFormVisible = false
                this.$message({
                    title: '成功',
                    message: '新增成功',
                    type: 'success',
                    duration: 2000
                })
            })
        },
        handleUpdate () {
            //编辑按钮单击事件方法
            if (this.selectedRows && this.selectedRows.length == 1) {
                this.temp = this.selectedRows[0]
                api.getRecord(this.temp.routeCode).then(res => {
                    this.temp = res.data;
                    this.dialogStatus = "update";
                    this.dialogFormVisible = true;
                });
            } else {
                this.$message({
                    title: '警告',
                    message: '请选择一条信息',
                    type: 'warning'
                })
            }
        },
        update () {
            //编辑确认
            this.$refs['temp'].validate(valid => {
                if (valid) {
                    api.updataRecord(this.temp.routeCode, this.temp).then(
                        () => {
                            this.getList()
                            this.dialogFormVisible = false
                            this.$message({
                                title: '成功',
                                message: '更新成功',
                                type: 'success',
                                duration: 2000
                            })
                        }
                    )
                }
            })
        },
        handleDelete () {
            //删除按钮单击事件方法
            if (this.selectedRows && this.selectedRows.length == 1) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        api.deleteRecord(this.selectedRows[0].routeCode).then(
                            () => {
                                this.getList(),
                                    this.$message({
                                        title: '成功',
                                        message: '删除成功',
                                        type: 'success',
                                        duration: 2000
                                    })
                            }
                        )
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
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
        // 表格选择框选中 注:参数为选中的所有行的数组
        selectChange (val) {
            this.selectedRows = val;
        },
        //点击表格某一行
        rowClick (val) {
            this.$refs.tb.toggleRowSelection(val, 'selected') //单击行绑定点击事件
        }
    }
}
</script>
