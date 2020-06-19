<template>
    <div>
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
                                :placeholder="$t('systemMenu.catalogCode')"
                                @keyup.enter.native="handleFilter"
                                class="filter-item"
                                size="small"
                                v-model="listQuery.catalogCode"
                            />
                            <el-input
                                :placeholder="$t('systemMenu.catalogName')"
                                @keyup.enter.native="handleFilter"
                                class="filter-item"
                                size="small"
                                v-model="listQuery.catalogName"
                            />
                            <el-button
                                @click="handleFilter"
                                icon="el-icon-search"
                                size="small"
                                type="primary"
                            >{{ $t('btn.search') }}</el-button>
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
                            >{{ $t('btn.add') }}</el-button>
                            <el-button
                                @click="handleDelete"
                                class="filter-item"
                                icon="el-icon-delete"
                                size="small"
                                type="primary"
                            >{{ $t('btn.delete') }}</el-button>
                            <el-button
                                @click="handleUpdate"
                                class="filter-item"
                                icon="el-icon-edit"
                                size="small"
                                type="primary"
                            >{{ $t('btn.edit') }}</el-button>
                            <el-button
                                @click="handleAdd"
                                class="filter-item"
                                icon="el-icon-edit-outline"
                                size="small"
                                type="primary"
                            >
                                {{
                                $t('systemMenu.resourceAssociation')
                                }}
                            </el-button>
                            <el-button
                                @click="handleBtnAuthority"
                                class="filter-item"
                                icon="el-icon-edit-outline"
                                size="small"
                                type="primary"
                            >{{ $t('systemMenu.buttonOprate') }}</el-button>
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
                            v-loading="listLoading"
                        >
                            <el-table-column type="selection" width="30"></el-table-column>
                            <el-table-column
                                :label="$t('systemMenu.catalogCode')"
                                align="center"
                                prop="catalogCode"
                                show-overflow-tooltip
                                width="120"
                            >
                                <template slot-scope="scope">
                                    <span>{{ scope.row.catalogCode }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                :label="$t('systemMenu.catalogName')"
                                align="center"
                                show-overflow-tooltip
                                width="80"
                            >
                                <template slot-scope="scope">
                                    <span>{{ scope.row.catalogName }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column :label="$t('systemMenu.catalogEngName')" min-width="80" show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <span>{{ scope.row.catalogEngName }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                :label="$t('systemMenu.catalogOrder')"
                                align="center"
                                show-overflow-tooltip
                                width="60"
                            >
                                <template slot-scope="scope">
                                    <span>{{ scope.row.catalogOrder }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column :label="$t('systemMenu.nodeType')" align="center" show-overflow-tooltip width="120">
                                <template slot-scope="scope">
                                    <span>
                                        {{
                                        scope.row.nodeType | nodeFilter
                                        }}
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column :label="$t('systemMenu.parentId')" show-overflow-tooltip width="120">
                                <template slot-scope="scope">
                                    <span>
                                        {{
                                        pidFilter(scope.row.parentId)
                                        }}
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column :label="$t('systemMenu.url')" show-overflow-tooltip width="120">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.url }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                :label="$t('systemMenu.remark')"
                                align="center"
                                prop="remark"
                                show-overflow-tooltip
                                width="180"
                            >
                                <template slot-scope="scope">
                                    <span>{{ scope.row.remark }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                :label="$t('systemMenu.icons')"
                                align="center"
                                prop="icons"
                                show-overflow-tooltip
                                width="180"
                            >
                                <template slot-scope="scope">
                                    <span>
                                        {{ scope.row.icons }}
                                        <svg-icon :icon-class="scope.row.icons" />
                                    </span>
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
                </div>
            </el-col>
        </el-row>

        <!-- 新增，修改弹窗 -->
        <el-dialog
            :close-on-click-modal="false"
            :title="dialogStatus == 'create' ? $t('btn.add') : $t('btn.edit')"
            :visible.sync="dialogFormVisible"
            custom-class="dialog-custom"
            v-dialogDrag
        >
            <el-form :inline="true" :model="temp" :rules="rules" class="small-space" label-width="90px" ref="dataForm">
                <el-form-item :label="$t('systemMenu.catalogCode')" prop="catalogCode">
                    <el-input disabled="disabled" v-if="dialogStatus == 'update'" v-model="temp.catalogCode" />
                    <el-input v-else v-model="temp.catalogCode" />
                </el-form-item>
                <el-form-item :label="$t('systemMenu.catalogName')" prop="catalogName">
                    <el-input v-model="temp.catalogName" />
                </el-form-item>
                <el-form-item :label="$t('systemMenu.catalogEngName')" prop="catalogEngName">
                    <el-input v-model="temp.catalogEngName" />
                </el-form-item>
                <el-form-item :label="$t('systemMenu.catalogOrder')" prop="catalogOrder">
                    <el-input v-model="temp.catalogOrder" />
                </el-form-item>
                <el-form-item :label="$t('systemMenu.parentId')" prop="parentId">
                    <select-tree :options="treeData" :props="defaultProps" :value="0" v-model="temp.parentId" />
                    <!-- <el-input v-model="temp.parentId" disabled="disabled"/> -->
                </el-form-item>
                <el-form-item :label="$t('systemMenu.nodeType')" prop="nodeType">
                    <el-radio-group v-model="temp.nodeType">
                        <el-radio :label="1">{{ $t('from.open') }}</el-radio>
                        <el-radio :label="0">{{ $t('from.stop') }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="$t('systemMenu.url')" prop="url">
                    <el-input v-model="temp.url" />
                </el-form-item>
                <el-form-item :label="$t('systemMenu.allowEmptyValue')" prop="allowEmptyValue">
                    <el-radio-group v-model="temp.allowEmptyValue">
                        <el-radio label="PC">PC</el-radio>
                        <el-radio label="PDA">PDA</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="$t('systemMenu.remark')" prop="remark">
                    <el-input v-model="temp.remark" />
                </el-form-item>
                <el-form-item :label="$t('systemMenu.icons')" prop="icons">
                    <el-select v-model="temp.icons">
                        <el-option :key="item" :label="item" :value="item" v-for="item in icons">
                            <svg-icon :icon-class="item" />
                            <span>{{ item }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div class="dialog-footer" slot="footer">
                <el-button @click="dialogFormVisible = false">
                    {{
                    $t('btn.cancel')
                    }}
                </el-button>
                <el-button
                    @click="
                        dialogStatus === 'create' ? createData() : updateData()
                    "
                    type="primary"
                >{{ $t('btn.confirm') }}</el-button>
            </div>
        </el-dialog>
        <!-- 资源关联弹窗 -->
        <el-dialog
            :close-on-click-modal="false"
            :title="$t('systemMenu.resourceAssociation')"
            :visible.sync="dialogFormUser"
            class="table_dialog"
            custom-class="dialog-custom"
            v-dialogDrag
        >
            <div class="tab_container">
                <el-tabs @tab-click="handleTabClick" type="border-card" v-model="activeName2">
                    <el-tab-pane :label="$t('tabs.unauthed')" name="first">
                        <div class="filter-container border_b_1">
                            <div class="filter-items">
                                <el-button
                                    @click="authority"
                                    class="filter-item"
                                    icon="el-icon-select"
                                    size="small"
                                    type="primary"
                                >{{ $t('btn.empower') }}</el-button>
                            </div>
                        </div>
                        <div class="table-container">
                            <el-table
                                :data="listUnrelation"
                                :key="tableKey"
                                @selection-change="selectRowUser"
                                border
                                cell-class-name="table-cell"
                                fit
                                header-cell-class-name="header-cell"
                                height="350px"
                                highlight-current-row
                                style="width: 100%;"
                                v-loading="listLoading"
                            >
                                <el-table-column type="selection" width="30"></el-table-column>
                                <el-table-column :label="$t('systemResource.endpointCode')" align="center" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <span>
                                            {{
                                            scope.row.endpointCode
                                            }}
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column :label="$t('systemResource.endpointName')" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <span>
                                            {{
                                            scope.row.endpointName
                                            }}
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column :label="$t('systemResource.method')" align="center" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <span>{{ scope.row.method }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :label="$t('systemResource.url')" align="center" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <span>{{ scope.row.url }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :label="$t('systemResource.remark')" align="center" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <span>{{ scope.row.remark }}</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <pagination
                                :limit.sync="listQuery1.pageSize"
                                :page.sync="listQuery1.currentPage"
                                :total="total1"
                                @pagination="getListUnelation"
                                v-show="total1 > 0"
                            />
                        </div>
                    </el-tab-pane>
                    <el-tab-pane :label="$t('tabs.authed')" name="second">
                        <div class="filter-container border_b_1">
                            <div class="filter-items">
                                <el-button
                                    @click="unauthority"
                                    class="filter-item"
                                    icon="el-icon-select"
                                    size="small"
                                    type="primary"
                                >{{ $t('btn.unauthority') }}</el-button>
                            </div>
                        </div>
                        <div class="table-container">
                            <el-table
                                :data="listRelation"
                                :key="tableKey"
                                @selection-change="selectRowUser"
                                border
                                cell-class-name="table-cell"
                                fit
                                header-cell-class-name="header-cell"
                                height="350px"
                                highlight-current-row
                                style="width: 100%;"
                                v-loading="listLoading"
                            >
                                <el-table-column type="selection" width="30"></el-table-column>
                                <el-table-column :label="$t('systemResource.endpointCode')" align="center" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <span>
                                            {{
                                            scope.row.endpointCode
                                            }}
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column :label="$t('systemResource.endpointName')" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <span>
                                            {{
                                            scope.row.endpointName
                                            }}
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column :label="$t('systemResource.method')" align="center" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <span>{{ scope.row.method }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :label="$t('systemResource.url')" align="center" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <span>{{ scope.row.url }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :label="$t('systemResource.remark')" align="center" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <span>{{ scope.row.remark }}</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <pagination
                                :limit.sync="listQuery2.pageSize"
                                :page.sync="listQuery2.currentPage"
                                :total="total2"
                                @pagination="getListRelation"
                                v-show="total2 > 0"
                            />
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-dialog>
        <el-dialog :visible.sync="dialogPvVisible" class="table_dialog" custom-class="dialog-custom" title="Reading statistics">
            <div class="table-container no_t_border">
                <el-table
                    :data="pvData"
                    border
                    cell-class-name="table-cell"
                    fit
                    header-cell-class-name="header-cell"
                    highlight-current-row
                    style="width: 100%"
                >
                    <el-table-column label="Channel" prop="key" show-overflow-tooltip />
                    <el-table-column label="Pv" prop="pv" show-overflow-tooltip />
                </el-table>
            </div>

            <span class="dialog-footer" slot="footer">
                <el-button @click="dialogPvVisible = false" type="primary">
                    {{
                    $t('btn.confirm')
                    }}
                </el-button>
            </span>
        </el-dialog>

        <!-- 按钮权限弹框 -->
        <el-dialog
            :close-on-click-modal="false"
            :title="'按钮操作'"
            :visible.sync="btnAuthorityDialog"
            class="table_dialog"
            custom-class="dialog-custom"
            v-dialogDrag
        >
            <div class="oprate_btn_d border_b_1">
                <el-button
                    @click="addButton"
                    class="filter-item"
                    icon="el-icon-plus"
                    size="small"
                    type="primary"
                >{{ $t('btn.add') }}</el-button>
                <el-button
                    @click="deleteButton"
                    class="filter-item"
                    icon="el-icon-plus"
                    size="small"
                    type="primary"
                >{{ $t('btn.delete') }}</el-button>
            </div>
            <div class="table-container no_t_border no_t_margin">
                <el-table
                    :data="btnFucList"
                    @selection-change="btnSelectChange"
                    border
                    cell-class-name="table-cell"
                    fit
                    header-cell-class-name="header-cell"
                    height="320px"
                    highlight-current-row
                    ref="detailtable"
                    style="width: 100%;"
                >
                    <el-table-column align="center" fixed type="selection" width="30"></el-table-column>
                    <el-table-column :label="'行号'" prop="rowId" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-input required type="text" v-model="scope.row.rowId"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column :label="'功能'" prop="btnFunc" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-input required type="text" v-model="scope.row.btnFunc"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column :label="'按钮名称'" prop="btnName" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-input required type="text" v-model="scope.row.btnName"></el-input>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <div class="dialog-footer" slot="footer">
                <el-button @click="btnAuthorityDialog = !btnAuthorityDialog">
                    {{
                    $t('btn.cancel')
                    }}
                </el-button>
                <el-button @click="confirmBtnList" type="primary">
                    {{
                    $t('btn.confirm')
                    }}
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import {
    selectDatas,
    addData,
    deleteData,
    selectEndpoints,
    addRelation,
    renewData
} from '@/api/system/menu'
import SelectTree from '@/components/SelectTree/index.vue'
import resource from '@/utils/resource'
import getAllHasChildrenRowId from '@/utils/addRouter'

export default {
    name: 'systemMenu',
    components: { Pagination, SelectTree },
    data() {
        return {
            tableKey: 0,
            list: [],
            listRelation: [],
            listUnrelation: [],
            icons: this.$myFun.getSVG,
            treeData: [],
            theight: 0, //表格高度
            btnFucList: [
                { rowId: '1', btnFunc: '添加', btnName: 'btnAdd' },
                { rowId: '2', btnFunc: '编辑', btnName: 'btnEdit' },
                { rowId: '3', btnFunc: '删除', btnName: 'btnDelete' }
            ], //按钮列表
            total: 0,
            total1: 0,
            total2: 0,
            listLoading: true,
            circle: '',
            listQuery: {
                parentId: 0,
                currentPage: 1,
                pageSize: 15,
                page: 1
            },
            listQuery1: {
                currentPage: 1,
                pageSize: 10,
                page: 1
            },
            listQuery2: {
                currentPage: 1,
                pageSize: 10,
                page: 1
            },
            temp: {
                allowEmptyValue: 'PC',
                icons: undefined
            },
            treeList: [],
            dialogFormVisible: false,
            dialogFormUser: false,
            btnAuthorityDialog: false, //按钮权限弹框
            btnSelectRow: [],
            childId: [],
            dialogStatus: '',
            activeName2: 'first',
            rules: {
                catalogCode: [
                    {
                        required: true,
                        message: this.$t('validate.required'),
                        trigger: 'blur'
                    },
                    {
                        max: 100,
                        message: this.$t('validate.max32'),
                        trigger: 'blur'
                    }
                ],
                catalogName: [
                    {
                        required: true,
                        message: this.$t('validate.required'),
                        trigger: 'blur'
                    },
                    {
                        max: 100,
                        message: this.$t('validate.max32'),
                        trigger: 'blur'
                    }
                ],
                nodeType: [
                    {
                        required: true,
                        message: this.$t('validate.required'),
                        trigger: 'blur'
                    }
                ]
            },
            dialogPvVisible: false,
            pvData: [],
            defaultProps: {
                rowId: 'rowId', // 父级唯一标识
                children: 'children',
                label: 'catalogName'
            },
            contentStyleObj: {
                height: null
            }
        }
    },
    created() {
        this.getList()
        this.getTree()
        this.getHeight()
    },
    mounted() {
        this.$store.dispatch('dict/getDicData', [
            'dt_org_type',
            'dt_org_function'
        ])
        this.setTableHeight()
        //表格高度自适应
        window.onresize = () => {
            this.setTableHeight()
            this.setTreeHeight()
        }
        this.getList()
        this.setTreeHeight()
    },
    methods: {
        //添加按钮
        addButton() {
            this.btnFucList.push({ rowId: '', btnFunc: '', btnName: '' })
        },
        //删除按钮
        deleteButton() {},
        //保存按钮
        confirmBtnList() {},
        btnSelectChange(val) {
            this.btnSelectRow = val
        },
        //表格高度计算
        setTableHeight() {
            this.theight = this.$myFun.getSingleTbHeight()
        },
        resetTemp() {
            this.temp = {
                nodeType: 1,
                allowEmptyValue: 'PC'
            }
        },
        pidFilter(value) {
            //父目录过滤器
            if (value === 0) {
                return '根目录'
            } else {
                for (let i = 0; i < this.list.length; i++) {
                    if (this.list[i].rowId == value) {
                        return this.list[i].catalogName
                    }
                }
            }
        },
        handleTabClick(tab) {
            //选项卡切换
            if (tab.name == 'second') {
                this.getListRelation()
            } else {
                this.getListUnelation()
            }
        },
        getHeight() {
            //自适应高度
            this.contentStyleObj.height =
                document.body.scrollHeight - 110 + 'px'
        },
        destroyed() {
            //自适应窗体大小
            window.removeEventListener('resize', this.getHeight)
        },
        getList() {
            //获取数据
            selectDatas(this.listQuery).then(response => {
                this.list = response.data.list.filter(v => {
                    if (resource[v.url]) {
                        if (
                            v.parentId == 0 ||
                            getAllHasChildrenRowId.indexOf(v.rowId) > 0
                        ) {
                            v.icons = v.icons || 'setting-fill'
                        } else {
                            v.icons = v.icons || 'circle'
                        }
                        return v
                    }
                })
                if (this.listQuery.parentId == 0) {
                    this.total = response.data.pages.count - 3
                } else {
                    this.total = response.data.pages.count
                }

                // Just to simulate the time of the request
            })
        },
        getTree() {
            //获取树数据
            selectDatas().then(response => {
                this.treeData = this.$myFun.addTreeRoot(response.data)
                setTimeout(() => {
                    this.listLoading = false
                }, 1.5 * 100)
            })
        },
        //树高度设置
        setTreeHeight() {
            this.contentStyleObj.height = this.$myFun.getTreehHeight()
        },
        handleCreate() {
            //新增弹窗调用
            if (this.listQuery.parentId || this.listQuery.parentId === 0) {
                this.resetTemp()
                this.dialogStatus = 'create'
                this.dialogFormVisible = true
                this.temp.parentId = this.listQuery.parentId
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
        handleUpdate() {
            //更新弹窗调用
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
        handleFilter() {
            //查询
            this.getList()
        },
        createData() {
            //新增
            this.$refs['dataForm'].validate(valid => {
                if (valid) {
                    addData(this.temp).then(() => {
                        this.getList()
                        this.getTree()
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
        updateData() {
            //更新
            this.$refs['dataForm'].validate(valid => {
                if (valid) {
                    // const tempData = Object.assign({}, this.temp)
                    // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
                    renewData(this.temp.catalogCode, this.temp).then(() => {
                        this.getList()
                        this.getTree()
                        this.dialogFormVisible = false
                        this.$message({
                            title: '成功',
                            message: '更新成功',
                            type: 'success',
                            duration: 2000
                        })
                        this.$router.go(0)
                    })
                }
            })
        },
        handleDelete() {
            //删除
            if (this.selectlistRow && this.selectlistRow.length == 1) {
                this.$confirm('此操作将删除所选中数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        deleteData(this.selectlistRow[0].catalogCode).then(
                            () => {
                                this.getList()
                            }
                        )
                        this.getTree()
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
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
        getListRelation() {
            //查询关联的数据
            this.listQuery2.catalogCode = this.selectlistRow[0].catalogCode
            selectEndpoints(this.listQuery2).then(response => {
                this.listRelation = response.data.list
                this.total2 = response.data.pages.count
            })
        },
        getListUnelation() {
            //查询未关联资源列表
            selectEndpoints(this.listQuery1).then(response => {
                this.listUnrelation = response.data.list
                this.total1 = response.data.pages.count
            })
        },
        handleAdd() {
            //资源关联弹窗
            if (this.selectlistRow && this.selectlistRow.length == 1) {
                this.dialogFormUser = true
                if (this.activeName2 == 'second') {
                    this.getListRelation()
                    this.activeName2 = 'first'
                }
                this.getListUnelation()
            } else {
                this.$message({
                    title: '警告',
                    message: '请选择一条信息',
                    type: 'warning'
                })
            }
        },
        authority() {
            //授权
            let fun = 'SAVE'
            if (this.selectlistRowUser && this.selectlistRowUser.length > 0) {
                let endpointCodes = []
                for (
                    let index = 0;
                    index < this.selectlistRowUser.length;
                    index++
                ) {
                    endpointCodes[index] = this.selectlistRowUser[
                        index
                    ].endpointCode
                }
                addRelation(
                    this.selectlistRow[0].catalogCode,
                    endpointCodes,
                    fun
                ).then(() => {
                    // this.getListUnelation()
                    this.$message({
                        title: '成功',
                        message: '授权成功',
                        type: 'success',
                        duration: 2000
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
        unauthority() {
            //取消授权
            let fun = 'REMOVE'
            if (this.selectlistRowUser && this.selectlistRowUser.length > 0) {
                let endpointCodes = []
                for (
                    let index = 0;
                    index < this.selectlistRowUser.length;
                    index++
                ) {
                    endpointCodes[index] = this.selectlistRowUser[
                        index
                    ].endpointCode
                }
                addRelation(
                    this.selectlistRow[0].catalogCode,
                    endpointCodes,
                    fun
                ).then(() => {
                    this.getListRelation()
                    this.$message({
                        title: '成功',
                        message: '取消授权成功',
                        type: 'success',
                        duration: 2000
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

        selectRowUser(val) {
            this.selectlistRowUser = val
        },
        selectRowUser1(val) {
            this.selectlistRowUser1 = val
        },
        handleNodeClick(data) {
            //点击树查询
            this.listQuery.parentId = data.rowId
            this.getList()
        },
        //按钮权限添加
        handleBtnAuthority() {
            this.btnAuthorityDialog = true
        }
    }
}
</script>
