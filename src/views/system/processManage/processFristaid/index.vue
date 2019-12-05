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
                          :height="theight"
                          highlight-current-row
                          style="width: 100%;"
                          @selection-change="selectRow"
                          size="mini"
                          cell-class-name="table-cell"
                          header-cell-class-name="header-cell">
                    <el-table-column label="操作"
                                     fixed
                                     width="200px">
                        <template slot-scope="scope">
                            <el-tooltip content="流程信息配置"
                                        placement="left-end">
                                <el-button icon="el-icon-scissors"
                                           @click="handleCreate(scope.$index, scope.row)"></el-button>
                            </el-tooltip>
                            <el-button icon="el-icon-set-up"
                                       @click="handleDelete(scope.$index, scope.row)"></el-button>
                            <el-button icon="el-icon-share"></el-button>
                            <el-button icon="el-icon-video-play"
                                       @click="handleupload(scope.$index, scope.row)"></el-button>
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="120"
                                     align="left"
                                     :label="$t('color.colorCode')"
                                     prop="colorCode"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="200"
                                     align="left"
                                     :label="$t('color.colorName')"
                                     prop="colorName"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="100"
                                     align="left"
                                     :label="$t('color.colorAbbreviation')"
                                     prop="colorAbbreviation"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="100"
                                     align="left"
                                     :label="$t('color.state')">
                        <template slot-scope="scope">
                            {{ scope.row.state | stateFilter }}
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     min-width="480"
                                     align="left"
                                     :label="$t('color.remark')"
                                     prop="remark"></el-table-column>
                </el-table>

                <pagination :total="total"
                            :page.sync="listQuery.currentPage"
                            :limit.sync="listQuery.pageSize"
                            @pagination="getList" />
            </div>
            <el-dialog custom-class="dialog-custom"
                       width="50%"
                       class="table_dialog"
                       :close-on-click-modal="false"
                       :close-on-press-escape="false"
                       v-dialogDrag
                       title="选择用户多选"
                       :visible.sync="dialogFormVisible"
                       @close="handleClose">
                <addUser></addUser>
                <div slot="footer"
                     class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">{{
                        $t('table.cancel')
                    }}</el-button>
                    <el-button type="primary"
                               @click="create">{{ $t('table.confirm') }}</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import * as api from '@/api/data-base/color'
import Pagination from '@/components/Pagination'
import addUser from './addUser'
import { parseTime } from '@/utils'

export default {
    name: 'color',
    components: { Pagination, addUser },
    data () {
        return {
            list: null,
            total: 0,
            theight: 0, //表格高度
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
            rules: {
                colorCode: [
                    {
                        required: true,
                        message: '颜色编码不能为空',
                        trigger: 'blur'
                    },
                    {
                        pattern: /^[A-Z-_0-9]{0,32}$/,
                        message: '由大写字母、数字、-和_组成，长度为32',
                        trigger: 'blur'
                    }
                ],
                colorName: [
                    {
                        required: true,
                        message: '编码名称不能为空',
                        trigger: 'blur'
                    },
                    {
                        max: 100,
                        message: '颜色名称长度不能超过100',
                        trigger: 'blur'
                    }
                ],
                colorAbbreviation: [
                    {
                        max: 50,
                        message: '颜色简称长度不能超过50',
                        trigger: 'blur'
                    }
                ],
                remark: [
                    { max: 512, message: '备注长度为512内', trigger: 'blur' }
                ]
            }
        }
    },
    created () {
        this.getList()
    },
    mounted () {
        this.setTableHeight()
        //表格高度自适应
        window.onresize = () => {
            this.setTableHeight()
        }
        this.getList()
    },
    methods: {
        getList () {
            api.queryRecords(this.listQuery).then(res => {
                this.list = res.data.list
                this.total = res.data.pages.count
            })
        },
        //表格高度计算
        setTableHeight () {
            this.theight = this.$myFun.getSingleTbHeight()
        },
        handleQuery () {
            //查询
            this.listQuery.currentPage = 1
            this.getList()
        },
        handleCreate () {
            //新增
            this.resetTemp()
            this.dialogStatus = 'create'
            this.dialogFormVisible = true
        },
        // 获取表格选中时的数据
        selectRow (val) {
            this.selectlistRow = val
        },

        handleUpdate () {
            //编辑弹窗
            if (this.selectlistRow && this.selectlistRow.length == 1) {
                this.readonly = true //组织编码不可以编写
                this.temp = this.selectlistRow[0] // copy obj
                api.getRecord(this.temp.colorCode).then(res => {
                    this.temp = res.data
                    this.dialogStatus = 'update'
                    this.dialogFormVisible = true
                    // this.$nextTick(() => {
                    //     this.$refs["temp"].clearValidate();
                    // });
                })
            } else {
                this.$message({
                    title: '警告',
                    message: '请选择一条信息',
                    type: 'warning'
                })
            }
        },
        update () {
            //编辑提交
            this.$refs['temp'].validate(valid => {
                if (valid) {
                    api.updateRecord(this.temp.colorCode, this.temp).then(
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
            //删除列表
            if (this.selectlistRow && this.selectlistRow.length == 1) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        let ids = []
                        this.selectlistRow.forEach((val, index) => {
                            ids[index] = val.colorCode
                        })
                        api.deleteRecord(ids).then(() => {
                            this.getList(),
                                this.$message({
                                    title: '成功',
                                    message: '删除成功',
                                    type: 'success',
                                    duration: 2000
                                })
                        })
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
        create () {
            //新增确认按钮
            this.$refs.temp.validate(valid => {
                if (valid) {
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
                } else {
                    return false
                }
            })
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
        handleSelectionChange (selection) {
            this.selectCode = selection.map(v => v.colorCode)
        },
        handleDownload () {
            this.downloadLoading = true
            import('@/vendor/Export2Excel').then(excel => {
                const tHeader = [
                    '颜色编码',
                    '颜色名称',
                    '颜色简称',
                    '状态',
                    '备注'
                ]
                const filterVal = [
                    'colorCode',
                    'colorName',
                    'colorAbbreviation',
                    'state',
                    'remark'
                ]
                const data = this.formatJson(filterVal, this.list)
                excel.export_json_to_excel({
                    header: tHeader,
                    data,
                    filename: 'table-list'
                })
                this.downloadLoading = false
            })
        },
        formatJson (filterVal, jsonData) {
            return jsonData.map(v =>
                filterVal.map(j => {
                    if (j === 'timestamp') {
                        return parseTime(v[j])
                    } else {
                        return v[j]
                    }
                })
            )
        }
    }
}
</script>
<style>
.el-table .el-button {
    border: none;
    padding: 0;
}
</style>
