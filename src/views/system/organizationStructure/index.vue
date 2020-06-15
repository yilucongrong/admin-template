<template>
    <el-row>
        <el-col :span="3" class="left-trees">
            <div class="left-tree">
                <el-tree :data="treeData" :props="defaultProps" :style="contentStyleObj" @node-click="handleNodeClick"></el-tree>
            </div>
        </el-col>
        <el-col :span="21">
            <div class="app-container">
                <div class="filter-container">
                    <div class="filter-items">
                        <el-input
                            :placeholder="$t('table.organizationNum')"
                            @keyup.enter.native="handleFilter"
                            class="filter-item"
                            size="small"
                            v-model="listQuery.organizationCode"
                        />
                        <el-input
                            :placeholder="$t('table.organizationName')"
                            @keyup.enter.native="handleFilter"
                            class="filter-item"
                            size="small"
                            v-model="listQuery.organizationName"
                        />

                        <el-button @click="handleFilter" icon="el-icon-search" size="small" type="primary">{{ $t("btn.search") }}</el-button>
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
                        >{{ $t("btn.add") }}</el-button>
                        <el-button
                            @click="handleDownload"
                            class="filter-item"
                            icon="el-icon-download"
                            size="small"
                            type="primary"
                        >{{ $t("btn.export") }}</el-button>
                        <el-button
                            @click="handleUpdate"
                            class="filter-item"
                            icon="el-icon-edit"
                            size="small"
                            type="primary"
                        >{{ $t("btn.edit") }}</el-button>
                        <el-button
                            @click="handleDelete"
                            class="filter-item"
                            icon="el-icon-delete"
                            size="small"
                            type="primary"
                        >{{ $t("btn.delete") }}</el-button>
                    </div>
                    <el-table
                        :data="list"
                        :height="theight"
                        :key="tableKey"
                        @row-click="rowClick"
                        @selection-change="selectRow"
                        border
                        cell-class-name="table-cell"
                        fit
                        header-cell-class-name="header-cell"
                        highlight-current-row
                        ref="tb_a"
                        style="width: 100%;"
                    >
                        <el-table-column align="center" fixed type="selection" width="30"></el-table-column>
                        <el-table-column
                            :label="$t('table.organizationNum')"
                            align="center"
                            fixed
                            prop="organizationCode"
                            show-overflow-tooltip
                            width="120"
                        >
                            <template slot-scope="scope">
                                <span>
                                    {{
                                    scope.row.organizationCode
                                    }}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            :label="$t('table.organizationName')"
                            align="center"
                            fixed
                            show-overflow-tooltip
                            width="120px"
                        >
                            <template slot-scope="scope">
                                <span>
                                    {{
                                    scope.row.organizationName
                                    }}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('table.organizationType')" fixed min-width="140px" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span>{{ scope.row.typeCN }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('table.parentId')" align="center" show-overflow-tooltip width="120px">
                            <template slot-scope="scope">
                                <span>
                                    {{
                                    scope.row.parentId
                                    | organizationFilter(scope.row)
                                    }}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('table.contacts')" align="center" show-overflow-tooltip width="120px">
                            <template slot-scope="scope">
                                <span>{{ scope.row.contact }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('table.address')" align="center" show-overflow-tooltip width="120px">
                            <template slot-scope="scope">
                                <span>{{ scope.row.adress }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('table.email')" show-overflow-tooltip width="150px">
                            <template slot-scope="scope">
                                <span>{{ scope.row.email }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('table.businessFunction')" show-overflow-tooltip width="150px">
                            <template slot-scope="scope">
                                <span>
                                    {{
                                    scope.row.businessFunctionCN
                                    }}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('table.mobile')" show-overflow-tooltip width="150px">
                            <template slot-scope="scope">
                                <span>{{ scope.row.mobile }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('table.remarks')" show-overflow-tooltip width="150px">
                            <template slot-scope="scope">
                                <span>{{ scope.row.remark }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('table.state')" show-overflow-tooltip width="80px">
                            <template slot-scope="scope">
                                <span>
                                    {{
                                    scope.row.state | stateFilter
                                    }}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            :label="$t('table.postalCode')"
                            class-name="status-col"
                            show-overflow-tooltip
                            width="120px"
                        >
                            <template slot-scope="scope">
                                <span>{{ scope.row.postalCode }}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <pagination
                        :limit.sync="listQuery.pageSize"
                        :page.sync="listQuery.currentPage"
                        :total="total"
                        @pagination="getList"
                        v-show="total > 0"
                    />
                </div>

                <el-dialog
                    :close-on-click-modal="false"
                    :title="
                        dialogStatus == 'create'
                            ? $t('btn.add')
                            : $t('btn.edit')
                    "
                    :visible.sync="dialogFormVisible"
                    custom-class="dialog-custom"
                    v-dialogDrag
                >
                    <el-form :inline="true" :model="temp" :rules="rules" class="small-space" label-width="120px" ref="dataForm">
                        <el-form-item :label="$t('table.organizationNum')" prop="organizationCode">
                            <el-input disabled="disabled" v-if="dialogStatus == 'update'" v-model="temp.organizationCode" />
                            <el-input v-else v-model="temp.organizationCode" />
                        </el-form-item>
                        <el-form-item :label="$t('table.organizationName')" prop="organizationName">
                            <el-input v-model="temp.organizationName" />
                        </el-form-item>
                        <el-form-item :label="$t('table.parentId')" prop="parentId">
                            <el-input disabled="disabled" v-model="temp.parentId" />
                        </el-form-item>
                        <el-form-item :label="$t('table.organizationType')" prop="type">
                            <el-select :placeholder="$t('table.select')" size="small" v-model="temp.type">
                                <el-option
                                    :key="item.dictItemKey"
                                    :label="item.dictItemValue"
                                    :value="item.dictItemKey"
                                    v-for="item in dt_org_type"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="$t('table.contacts')">
                            <el-input v-model="temp.contact" />
                        </el-form-item>
                        <el-form-item :label="$t('table.email')" prop="email">
                            <el-input v-model="temp.email" />
                        </el-form-item>
                        <el-form-item :label="$t('table.postalCode')" prop="postalCode">
                            <el-input v-model="temp.postalCode" />
                        </el-form-item>
                        <el-form-item :label="$t('table.businessFunction')" prop="businessFunction">
                            <el-select :placeholder="$t('table.select')" size="small" v-model="temp.businessFunction">
                                <el-option
                                    :key="item.dictItemKey"
                                    :label="item.dictItemValue"
                                    :value="item.dictItemKey"
                                    v-for="item in dt_org_function"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="$t('table.mobile')" prop="mobile">
                            <el-input v-model="temp.mobile" />
                        </el-form-item>
                        <el-form-item :label="$t('table.state')" prop="state">
                            <el-radio-group v-model="temp.state">
                                <el-radio :label="1">
                                    {{
                                    $t("from.open")
                                    }}
                                </el-radio>
                                <el-radio :label="0">
                                    {{
                                    $t("from.stop")
                                    }}
                                </el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item :label="$t('table.address')">
                            <el-input :rows="2" type="textarea" v-model="temp.adress"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('table.remarks')" prop="remark">
                            <el-input :rows="2" type="textarea" v-model="temp.remark"></el-input>
                        </el-form-item>
                    </el-form>
                    <div class="dialog-footer" slot="footer">
                        <el-button @click="dialogFormVisible = false">
                            {{
                            $t("btn.cancel")
                            }}
                        </el-button>
                        <el-button
                            @click="
                                dialogStatus === 'create'
                                    ? createData()
                                    : updateData()
                            "
                            type="primary"
                        >{{ $t("btn.confirm") }}</el-button>
                    </div>
                </el-dialog>

                <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
                    <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
                        <el-table-column label="Channel" prop="key" show-overflow-tooltip />
                        <el-table-column label="Pv" prop="pv" show-overflow-tooltip />
                    </el-table>
                    <span class="dialog-footer" slot="footer">
                        <el-button @click="dialogPvVisible = false" type="primary">{{ $t("btn.confirm") }}</el-button>
                    </span>
                </el-dialog>
            </div>
        </el-col>
    </el-row>
</template>
<script>
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import {
    selectlists,
    creat,
    deletelist,
    updatalist,
    selecttree
} from '@/api/system/organization'
import { parseTime } from '@/utils'
import { mapState } from 'vuex'
export default {
    name: 'organizationStructure',
    components: { Pagination },
    data() {
        return {
            treeData: [],
            defaultProps: {
                children: 'children',
                label: 'organizationName'
            },
            tableKey: 0,
            theight: 0, //表格高度
            list: [],
            total: 0,
            orgType: [],
            orgFun: [],
            orgName: [],
            listLoading: true,
            listQuery: {
                parentOrgCode: undefined,
                currentPage: 1,
                pageSize: 15,
                organizationCode: undefined,
                organizationName: undefined
            },
            showReviewer: false,
            temp: {
                state: 1,
                email: undefined,
                postalCode: undefined
            },
            dialogFormVisible: false,
            dialogStatus: '',
            dialogPvVisible: false,
            pvData: [],
            rules: {
                organizationCode: [
                    {
                        required: true,
                        message: this.$t('validate.required'),
                        trigger: 'blur'
                    },
                    {
                        max: 32,
                        message: this.$t('validate.max32'),
                        trigger: 'blur'
                    }
                ],
                organizationName: [
                    {
                        required: true,
                        message: this.$t('validate.required'),
                        trigger: 'blur'
                    },
                    {
                        max: 32,
                        message: this.$t('validate.max32'),
                        trigger: 'blur'
                    }
                ],
                parentId: [
                    {
                        required: true,
                        message: this.$t('validate.required'),
                        trigger: 'blur'
                    }
                ],
                type: [
                    {
                        required: true,
                        message: this.$t('validate.required'),
                        trigger: 'blur'
                    }
                ],
                businessFunction: [
                    {
                        required: true,
                        message: this.$t('validate.required'),
                        trigger: 'blur'
                    }
                ],
                mobile: [
                    {
                        max: 32,
                        message: this.$t('validate.max32'),
                        trigger: 'blur'
                    }
                ]
            },
            contentStyleObj: {
                height: ''
            },
            downloadLoading: false
        }
    },
    computed: {
        ...mapState({
            dt_org_type: state => state.dict.dt_org_type,
            dt_org_function: state => state.dict.dt_org_function
        })
    },
    mounted() {
        this.$store.dispatch('dict/getDicData', [
            'dt_org_type',
            'dt_org_function'
        ])
        this.getList()
        this.getHeight()
        this.setTableHeight()
        //表格高度自适应
        window.onresize = () => {
            this.setTableHeight()
            this.setTreeHeight()
        }
        this.setTreeHeight()
    },
    methods: {
        treeGetList() {
            //点击树查询
            selectlists(this.listQuery).then(response => {
                this.list = response.data.list
                this.total = response.data.pages.count
            })
        },
        getList() {
            //查询组织列表
            setTimeout(() => {
                selectlists(this.listQuery).then(response => {
                    let options = [this.dt_org_type, this.dt_org_function]
                    response.data = this.$myFun.codeToName(
                        response.data,
                        options,
                        ['type', 'businessFunction']
                    )
                    this.list = response.data.list
                    this.total = response.data.pages.count
                }),
                    selecttree().then(response => {
                        //获取树数据
                        this.treeData = this.$myFun.addTreeRoot(response.data)
                        this.orgName = response.data.map(function(itmes) {
                            return [itmes.rowId, itmes.organizationName]
                        })
                    })
            }, 1.5 * 100)
        },
        handleFilter() {
            //查询
            this.listQuery.page = 1

            selectlists(this.listQuery).then(response => {
                let options = [this.dt_org_type, this.dt_org_function]
                response.data = this.$myFun.codeToName(response.data, options, [
                    'type',
                    'businessFunction'
                ])
                this.list = response.data.list
            })
        },
        resetTemp() {
            //重置temp
            this.temp = {
                state: 1,
                parentId: this.temp.parentId
            }
        },
        //表格高度计算
        setTableHeight() {
            this.theight = this.$myFun.getSingleTbHeight()
        },
        //树高度设置
        setTreeHeight() {
            this.contentStyleObj.height = this.$myFun.getTreehHeight()
        },
        filertOrgName(val) {
            for (let i = 0; i < this.orgName.length; i++) {
                if (this.orgName[i][0] == val) {
                    return this.orgName[i][1]
                }
                if (val == 0) {
                    return '根目录'
                }
            }
        },
        handleCreate() {
            //新增弹窗调用
            if (this.temp.parentId || this.temp.parentId == 0) {
                this.resetTemp()
                this.dialogStatus = 'create'
                this.dialogFormVisible = true
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
            } else {
                this.$message({
                    title: '警告',
                    message: '请选择上级菜单',
                    type: 'warning'
                })
            }
        },
        createData() {
            //新增
            this.$refs['dataForm'].validate(valid => {
                if (valid) {
                    creat(this.temp).then(() => {
                        this.getList()
                        this.dialogFormVisible = false
                        this.$message({
                            title: '成功',
                            message: '创建成功',
                            type: 'success',
                            duration: 2000
                        })
                    })
                }
            })
        },
        handleUpdate() {
            if (this.selectlistRow && this.selectlistRow.length == 1) {
                this.temp = this.selectlistRow[0] // copy obj
                this.dialogStatus = 'update'
                this.dialogFormVisible = true
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
            } else {
                this.$message({
                    title: '警告',
                    message: '请选择一条信息',
                    type: 'warning'
                })
            }
        },
        updateData() {
            this.$refs['dataForm'].validate(valid => {
                if (valid) {
                    updatalist(this.temp.organizationCode, this.temp).then(
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
            if (val.length > 1) {
                this.$refs.tb_a.clearSelection() //清除其他行的选中
                this.$refs.tb_a.toggleRowSelection(
                    val[val.length - 1],
                    'selected'
                ) //单击行绑定点击事件
            } else if (val.length === 1) {
                this.selectlistRow = val
            }
        },
        rowClick(val) {
            this.$refs.tb_a.clearSelection() //清除其他行的选中
            this.$refs.tb_a.toggleRowSelection(val) //单击行绑定点击事件
        },
        handleDelete() {
            //删除列表
            if (this.selectlistRow && this.selectlistRow.length == 1) {
                this.$confirm('此操作将删除所选中数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        this.listLoading = true
                        let ids = []
                        this.selectlistRow.forEach((val, index) => {
                            ids[index] = val.organizationCode
                        })
                        deletelist(ids).then(() => {
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
        handleDownload() {
            this.downloadLoading = true
            import('@/vendor/Export2Excel').then(excel => {
                const tHeader = [
                    '编码',
                    '名称',
                    '类型',
                    '父级ID',
                    '联系人',
                    '地址',
                    '邮箱',
                    '业务类型',
                    '电话',
                    '备注',
                    '状态',
                    '邮编'
                ]
                const filterVal = [
                    'organizationCode',
                    'organizationName',
                    'typeCN',
                    'parentId',
                    'contact',
                    'adress',
                    'email',
                    'businessFunctionCN',
                    'mobile',
                    'remark',
                    'state',
                    'postalCode'
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
        formatJson(filterVal, jsonData) {
            return jsonData.map(v =>
                filterVal.map(j => {
                    if (j === 'timestamp') {
                        return parseTime(v[j])
                    } else {
                        return v[j]
                    }
                })
            )
        },
        getHeight() {
            this.contentStyleObj.height =
                document.body.scrollHeight - 110 + 'px'
        },
        handleNodeClick(data) {
            //点击树查询
            this.temp.parentId = data.rowId
            this.listQuery.parentOrgCode = data.rowId
            this.treeGetList()
        }
    }
}
</script>


