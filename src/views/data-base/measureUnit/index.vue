<template>
    <div>
        <div class="app-container">
            <div class="filter-container">
                <div class="filter-items">
                    <el-input
                        :placeholder="$t('measureUnit.measureCode')"
                        @keyup.enter.native="handleQuery"
                        class="filter-item"
                        size="small"
                        v-model="listQuery.measureCode"
                    />
                    <el-input
                        :placeholder="$t('measureUnit.measureName')"
                        @keyup.enter.native="handleQuery"
                        class="filter-item"
                        size="small"
                        v-model="listQuery.measureName"
                    />
                    <el-select
                        :placeholder="$t('measureUnit.dimension')"
                        @keyup.enter.native="handleQuery"
                        clearable
                        size="small"
                        v-model="listQuery.dimension"
                    >
                        <el-option
                            :key="item.dictItemKey"
                            :label="item.dictItemValue"
                            :value="item.dictItemKey"
                            v-for="item in dt_dimension"
                        />
                    </el-select>
                    <el-button
                        @click="handleQuery"
                        class="filter-item"
                        icon="el-icon-search"
                        size="small"
                        type="primary"
                    >{{ $t('table.search') }}</el-button>
                </div>
            </div>
            <div class="table-container">
                <div class="oprate_btn">
                    <el-button
                        @click="handleCreate"
                        class="filter-item"
                        icon="el-icon-plus"
                        size="small"
                        type="primary"
                    >{{ $t('table.add') }}</el-button>
                    <el-button
                        @click="handleUpdate"
                        class="filter-item"
                        icon="el-icon-edit"
                        size="small"
                        type="primary"
                    >{{ $t('table.edit') }}</el-button>
                    <el-button
                        @click="handleDelete"
                        class="filter-item"
                        icon="el-icon-delete"
                        size="small"
                        type="primary"
                    >{{ $t('table.delete') }}</el-button>
                </div>
                <el-table
                    :data="list"
                    :height="theight"
                    :key="tableKey"
                    @selection-change="selectRow"
                    border
                    cell-class-name="table-cell"
                    fit
                    header-cell-class-name="header-cell"
                    highlight-current-row
                    size="mini"
                    style="width: 100%;"
                >
                    <el-table-column align="center" fixed type="selection" width="30" />
                    <el-table-column
                        :label="$t('measureUnit.measureCode')"
                        align="left"
                        prop="measureCode"
                        show-overflow-tooltip
                        width="120"
                    />
                    <el-table-column
                        :label="$t('measureUnit.measureName')"
                        align="left"
                        prop="measureName"
                        show-overflow-tooltip
                        width="200"
                    />
                    <el-table-column
                        :label="$t('measureUnit.dimension')"
                        align="left"
                        prop="dimensionName"
                        show-overflow-tooltip
                        width="100"
                    />
                    <el-table-column :label="$t('measureUnit.isBase')" align="left" show-overflow-tooltip width="100">
                        <template slot-scope="scope">
                            {{
                            [scope.row.isBase, TWO_STATE_OPTIONS]
                            | optionsFilter
                            }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        :label="$t('measureUnit.transferRate')"
                        align="left"
                        prop="transferRate"
                        show-overflow-tooltip
                        width="100"
                    />
                    <el-table-column
                        :label="$t('measureUnit.isEnabled')"
                        align="left"
                        prop="isEnabled"
                        show-overflow-tooltip
                        width="100"
                    >
                        <template slot-scope="scope">{{ scope.row.isEnabled | isEnabledFilter }}</template>
                    </el-table-column>
                    <el-table-column
                        :label="$t('measureUnit.remark')"
                        align="left"
                        min-width="480"
                        prop="remark"
                        show-overflow-tooltip
                    />
                </el-table>
                <pagination
                    :limit.sync="listQuery.pageSize"
                    :page.sync="listQuery.currentPage"
                    :total="total"
                    @pagination="getList"
                    class="pagination-container"
                />
            </div>
            <el-dialog
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                :title="
                    dialogStatus == 'create'
                        ? $t('table.add')
                        : $t('table.edit')
                "
                :visible.sync="dialogFormVisible"
                @close="handleClose"
                custom-class="dialog-custom"
                v-dialogDrag
            >
                <el-form
                    :inline="true"
                    :model="temp"
                    :rules="rules"
                    class="small-space"
                    label-width="120px"
                    ref="temp"
                    size="mini"
                >
                    <el-form-item :label="$t('measureUnit.measureCode')" prop="measureCode">
                        <el-input :disabled="dialogStatus != 'create'" v-model="temp.measureCode" />
                    </el-form-item>
                    <el-form-item :label="$t('measureUnit.measureName')" prop="measureName">
                        <el-input v-model="temp.measureName" />
                    </el-form-item>
                    <el-form-item :label="$t('measureUnit.dimension')">
                        <el-select :placeholder="$t('table.select')" clearable size="small" v-model="temp.dimension">
                            <el-option
                                :key="item.dictItemKey"
                                :label="item.dictItemValue"
                                :value="item.dictItemKey"
                                v-for="item in dt_dimension"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('measureUnit.isBase')" prop="isBase">
                        <el-select size="small" v-model="temp.isBase">
                            <el-option
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                v-for="item in TWO_STATE_OPTIONS"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('measureUnit.transferRate')" prop="transferRate">
                        <el-input v-model="temp.transferRate" />
                    </el-form-item>
                    <el-form-item :label="$t('measureUnit.isEnabled')" prop="isEnabled">
                        <el-radio-group v-model="temp.isEnabled">
                            <el-radio :label="1">
                                {{
                                $t('measureUnit.valid')
                                }}
                            </el-radio>
                            <el-radio :label="0">
                                {{
                                $t('measureUnit.novalid')
                                }}
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item :label="$t('measureUnit.remark')" prop="remark">
                        <el-input style="width:460px;" type="textarea" v-model="temp.remark" />
                    </el-form-item>
                </el-form>
                <div class="dialog-footer" slot="footer">
                    <el-button @click="cancel()">
                        {{
                        $t('table.cancel')
                        }}
                    </el-button>
                    <el-button @click="create" type="primary" v-if="dialogStatus == 'create'">{{ $t('table.confirm') }}</el-button>
                    <el-button @click="update" type="primary" v-else>
                        {{
                        $t('table.confirm')
                        }}
                    </el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import * as api from '@/api/data-base/measure-unit'
import Pagination from '@/components/Pagination'
import { DICT_CODE, TWO_STATE_OPTIONS } from '@/utils/constant'
import { mapState } from 'vuex'

export default {
    name: 'measureUnit',
    components: { Pagination },
    data() {
        return {
            list: null,
            total: 0,
            theight: 0, //表格高度
            listQuery: {
                page: true,
                currentPage: 1,
                pageSize: 15,
                measureCode: undefined,
                measureName: undefined,
                dimension: undefined
            },
            temp: {
                measureCode: undefined,
                measureName: undefined,
                dimension: undefined,
                transferRate: undefined,
                isBase: 0,
                isEnabled: 1,
                remark: undefined
            },
            selectCode: [],
            dialogFormVisible: false,
            dialogStatus: '',
            tableKey: 0,
            DICT_CODE: DICT_CODE,
            TWO_STATE_OPTIONS: TWO_STATE_OPTIONS,
            rules: {
                measureCode: [
                    {
                        required: true,
                        message: '计量编码不能为空',
                        trigger: 'blur'
                    },
                    {
                        pattern: /^[A-Z-_0-9]{1,50}$/,
                        message: '由大写字母，数字，—和_组成，长度不能超过50',
                        trigger: 'blur'
                    }
                ],
                measureName: [
                    {
                        required: true,
                        message: '计量名称长度不能超过100',
                        trigger: 'blur'
                    }
                ],
                dimension: [
                    {
                        required: true,
                        message: '所属量纲不能为空',
                        trigger: 'blur'
                    }
                ],
                isBase: [
                    {
                        required: true,
                        message: '是否基础单位不能为空',
                        trigger: 'blur'
                    }
                ],
                transferRate: [
                    {
                        required: true,
                        message: '转换率不能为空',
                        trigger: 'blur'
                    },
                    {
                        pattern: /^[0-9]{0,12}(\.[0-9]{2})?$/,
                        message: '由正数组成，保留两位有效数，长度不能超过14',
                        trigger: 'blur'
                    }
                ],
                isEnabled: [
                    {
                        required: true,
                        message: '计量名称长度不能超过100',
                        trigger: 'blur'
                    }
                ],
                remark: [
                    { max: 512, message: '备注长度为512内', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        ...mapState({
            dt_dimension: state => state.dict.dt_dimension
        })
    },
    mounted() {
        this.$store.dispatch('dict/getDicData', ['dt_dimension'])
        this.setTableHeight()
        //表格高度自适应
        window.onresize = () => {
            this.setTableHeight()
        }
        this.getList()
    },
    methods: {
        getList() {
            api.queryRecords(this.listQuery).then(res => {
                this.list = res.data.list
                this.total = res.data.pages.count
            })
        },
        //表格高度计算
        setTableHeight() {
            this.theight = this.$myFun.getSingleTbHeight()
        },
        handleDelete() {
            // 删除列表
            if (this.selectlistRow && this.selectlistRow.length == 1) {
                this.$confirm('此操作将删除所选中数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        const ids = []
                        this.selectlistRow.forEach((val, index) => {
                            ids[index] = val.measureCode
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
            }
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
        },
        handleCreate() {
            this.resetTemp()
            this.dialogStatus = 'create'
            this.dialogFormVisible = true
        },
        handleDeleteBatch() {
            if (this.selectCode.length == 0) {
                this.$message.warning('请勾选记录！')
                return
            }
            this.delete(this.selectCode)
        },

        handleUpdate() {
            if (this.selectlistRow && this.selectlistRow.length == 1) {
                this.readonly = true
                this.temp = this.selectlistRow[0]
                api.getRecord(this.temp.measureCode).then(res => {
                    this.temp = res.data
                    this.dialogStatus = 'update'
                    this.dialogFormVisible = true
                    this.$nextTick(() => {
                        this.$refs['temp'].clearValidate()
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
        update() {
            this.$refs['temp'].validate(valid => {
                if (valid) {
                    api.updateRecord(this.temp.measureCode, this.temp).then(
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
        // 获取表格选中时的数据
        selectRow(val) {
            this.selectlistRow = val
        },
        create() {
            this.$refs.temp.validate(valid => {
                if (valid) {
                    api.addRecord(this.temp).then(() => {
                        this.getList()
                        this.dialogFormVisible = false
                        this.$notify({
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
        cancel() {
            this.dialogFormVisible = false
        },
        resetTemp() {
            this.temp = {
                measureCode: undefined,
                measureName: undefined,
                dimension: undefined,
                transferRate: undefined,
                isBase: 0,
                isEnabled: 1,
                remark: undefined
            }
        },
        handleClose() {
            this.resetTemp()
            this.$refs.temp.resetFields()
        },
        handleSelectionChange(selection) {
            this.selectCode = selection.map(v => v.measureCode)
        }
    }
}
</script>
