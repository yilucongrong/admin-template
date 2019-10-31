<template>
    <el-row>
        <el-col :span="3"
                class="left-trees">
            <div class="left-tree">
                <el-tree :data="treeData"
                         :props="defaultProps"
                         @node-click="handleNodeClick"
                         :style="contentStyleObj"></el-tree>
            </div>
        </el-col>
        <el-col :span="21">
            <div class="app-container">
                <div class="filter-container">
                    <div class="filter-items">
                        <el-input size="small"
                                  :placeholder="$t('systemMenu.catalogCode')"
                                  v-model="listQuery.catalogCode"
                                  class="filter-item"
                                  @keyup.enter.native="handleFilter" />
                        <el-input size="small"
                                  :placeholder="$t('systemMenu.catalogName')"
                                  v-model="listQuery.catalogName"
                                  class="filter-item"
                                  @keyup.enter.native="handleFilter" />
                        <el-button type="primary"
                                   size="small"
                                   icon="el-icon-search"
                                   @click="handleFilter">{{ $t('btn.search') }}</el-button>
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
                                   icon="el-icon-delete"
                                   @click="handleDelete">{{ $t('btn.delete') }}</el-button>
                        <el-button size="small"
                                   class="filter-item"
                                   type="primary"
                                   icon="el-icon-edit"
                                   @click="handleUpdate">{{ $t('btn.edit') }}</el-button>
                        <el-button size="small"
                                   class="filter-item"
                                   type="primary"
                                   icon="el-icon-edit-outline"
                                   @click="handleAdd">{{$t('systemMenu.resourceAssociation')}}</el-button>
                        <el-button size="small"
                                   class="filter-item"
                                   type="primary"
                                   icon="el-icon-edit-outline"
                                   @click="handleBtnAuthority">{{$t('systemMenu.buttonOprate')}}</el-button>
                    </div>
                    <el-table v-loading="listLoading"
                              :key="tableKey"
                              :data="list"
                              border
                              fit
                              :height="theight"
                              highlight-current-row
                              style="width: 100%;"
                              cell-class-name="table-cell"
                              header-cell-class-name="header-cell"
                              @selection-change='selectRow'
                              @row-click="rowClick"
                              ref="tb_a">
                        <el-table-column type="selection"
                                         width="30">
                        </el-table-column>
                        <el-table-column show-overflow-tooltip
                                         :label="$t('systemMenu.catalogCode')"
                                         prop="catalogCode"
                                         align="center"
                                         width="120">
                            <template slot-scope="scope">
                                <span>{{ scope.row.catalogCode }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column show-overflow-tooltip
                                         :label="$t('systemMenu.catalogName')"
                                         width="80"
                                         align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.catalogName }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column show-overflow-tooltip
                                         :label="$t('systemMenu.catalogEngName')"
                                         min-width="80">
                            <template slot-scope="scope">
                                <span>{{ scope.row.catalogEngName }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column show-overflow-tooltip
                                         :label="$t('systemMenu.catalogOrder')"
                                         width="60"
                                         align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.catalogOrder }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column show-overflow-tooltip
                                         :label="$t('systemMenu.nodeType')"
                                         width="120"
                                         align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.nodeType|nodeFilter }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column show-overflow-tooltip
                                         :label="$t('systemMenu.parentId')"
                                         width="120">
                            <template slot-scope="scope">
                                <span>{{ pidFilter(scope.row.parentId) }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column show-overflow-tooltip
                                         :label="$t('systemMenu.url')"
                                         width="120">
                            <template slot-scope="scope">
                                <span>{{ scope.row.url }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column show-overflow-tooltip
                                         :label="$t('systemMenu.remark')"
                                         align="center"
                                         width="180">
                            <template slot-scope="scope">
                                <span>{{ scope.row.remark }}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <pagination v-show="total>0"
                                :total="total"
                                :page.sync="listQuery.currentPage"
                                :limit.sync="listQuery.pageSize"
                                @pagination="getList" />
                </div>

                <!-- 新增，修改弹窗 -->
                <el-dialog custom-class="dialog-custom"
                           :title="dialogStatus=='create'?$t('btn.add'):$t('btn.edit')"
                           :visible.sync="dialogFormVisible"
                           v-dialogDrag
                           :close-on-click-modal="false">
                    <el-form class="small-space"
                             ref="dataForm"
                             :inline="true"
                             :rules="rules"
                             :model="temp"
                             label-width="90px">

                        <el-form-item :label="$t('systemMenu.catalogCode')"
                                      prop="catalogCode">
                            <el-input v-if="dialogStatus=='update'"
                                      v-model="temp.catalogCode"
                                      disabled="disabled" />
                            <el-input v-else
                                      v-model="temp.catalogCode" />
                        </el-form-item>
                        <el-form-item :label="$t('systemMenu.catalogName')"
                                      prop="catalogName">
                            <el-input v-model="temp.catalogName" />
                        </el-form-item>
                        <el-form-item :label="$t('systemMenu.catalogEngName')"
                                      prop="catalogEngName">
                            <el-input v-model="temp.catalogEngName" />
                        </el-form-item>
                        <el-form-item :label="$t('systemMenu.catalogOrder')"
                                      prop="catalogOrder">
                            <el-input v-model="temp.catalogOrder" />
                        </el-form-item>
                        <el-form-item :label="$t('systemMenu.parentId')"
                                      prop="parentId">
                            <select-tree :options="treeData"
                                         v-model="temp.parentId"
                                         :props="defaultProps"
                                         :value="0" />
                            <!-- <el-input v-model="temp.parentId" disabled="disabled"/> -->
                        </el-form-item>
                        <el-form-item :label="$t('systemMenu.nodeType')"
                                      prop="nodeType">
                            <el-radio-group v-model="temp.nodeType">
                                <el-radio :label="1">{{$t('from.open')}}</el-radio>
                                <el-radio :label="0">{{$t('from.stop')}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item :label="$t('systemMenu.url')"
                                      prop="url">
                            <el-input v-model="temp.url" />
                        </el-form-item>
                        <el-form-item label="设备端口"
                                      prop="allowEmptyValue">
                            <el-radio-group v-model="temp.allowEmptyValue">
                                <el-radio label="PC">PC</el-radio>
                                <el-radio label="PDA">PDA</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item :label="$t('systemMenu.remark')"
                                      prop="remark">
                            <el-input v-model="temp.remark" />
                        </el-form-item>
                        <el-form-item label="图标"
                                      prop="icon">
                            <el-select v-model="temp.icon">
                                <el-option v-for="item in icons"
                                           :key="item"
                                           :label="item"
                                           :value="item">
                                    <svg-icon :icon-class="item" />
                                    <span>{{item}}</span>
                                </el-option>

                            </el-select>
                        </el-form-item>
                    </el-form>
                    <div slot="footer"
                         class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">{{ $t('btn.cancel') }}</el-button>
                        <el-button type="primary"
                                   @click="dialogStatus==='create'?createData():updateData()">{{ $t('btn.confirm') }}</el-button>
                    </div>
                </el-dialog>
                <!-- 资源关联弹窗 -->
                <el-dialog :title="$t('systemMenu.resourceAssociation')"
                           :visible.sync="dialogFormUser"
                           v-dialogDrag
                           :close-on-click-modal="false">

                    <el-tabs v-model="activeName2"
                             type="border-card"
                             @tab-click="handleTabClick">
                        <el-tab-pane :label="$t('tabs.tbSelected')"
                                     name="first">
                            <div class="filter-container">
                                <div class="filter-items">
                                    <el-button size="small"
                                               class="filter-item"
                                               type="primary"
                                               icon="el-icon-select"
                                               @click="authority">{{ $t('btn.empower') }}</el-button>
                                </div>
                            </div>
                            <div class="table-container">
                                <el-table v-loading="listLoading"
                                          :key="tableKey"
                                          :data="listUnrelation"
                                          border
                                          fit
                                          height="350px"
                                          highlight-current-row
                                          cell-class-name="table-cell"
                                          header-cell-class-name="header-cell"
                                          style="width: 100%;"
                                          @selection-change='selectRowUser'>
                                    <el-table-column type="selection"
                                                     width="30">
                                    </el-table-column>
                                    <el-table-column show-overflow-tooltip
                                                     :label="$t('systemResource.endpointCode')"
                                                     width="120"
                                                     align="center">
                                        <template slot-scope="scope">
                                            <span>{{ scope.row.endpointCode }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column show-overflow-tooltip
                                                     :label="$t('systemResource.endpointName')"
                                                     width="120">
                                        <template slot-scope="scope">
                                            <span>{{ scope.row.endpointName }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column show-overflow-tooltip
                                                     :label="$t('systemResource.method')"
                                                     width="120"
                                                     align="center">
                                        <template slot-scope="scope">
                                            <span>{{ scope.row.method }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column show-overflow-tooltip
                                                     :label="$t('systemResource.url')"
                                                     width="120"
                                                     align="center">
                                        <template slot-scope="scope">
                                            <span>{{ scope.row.url }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column show-overflow-tooltip
                                                     :label="$t('systemResource.remark')"
                                                     width="120"
                                                     align="center">
                                        <template slot-scope="scope">
                                            <span>{{ scope.row.remark }}</span>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <pagination v-show="total1>0"
                                            :total="total1"
                                            :page.sync="listQuery1.currentPage"
                                            :limit.sync="listQuery1.pageSize"
                                            @pagination="getListUnelation" />
                            </div>
                        </el-tab-pane>
                        <el-tab-pane :label="$t('tabs.selected')"
                                     name="second">

                            <div class="filter-container">
                                <div class="filter-items">
                                    <el-button size="small"
                                               class="filter-item"
                                               type="primary"
                                               icon="el-icon-select"
                                               @click="unauthority">{{$t('btn.unauthority')}}</el-button>
                                </div>
                            </div>
                            <div class="table-container">
                                <el-table v-loading="listLoading"
                                          :key="tableKey"
                                          :data="listRelation"
                                          border
                                          fit
                                          height="350px"
                                          cell-class-name="table-cell"
                                          header-cell-class-name="header-cell"
                                          highlight-current-row
                                          style="width: 100%;"
                                          @selection-change='selectRowUser'>
                                    <el-table-column type="selection"
                                                     width="30">
                                    </el-table-column>
                                    <el-table-column show-overflow-tooltip
                                                     :label="$t('systemResource.endpointCode')"
                                                     width="120"
                                                     align="center">
                                        <template slot-scope="scope">
                                            <span>{{ scope.row.endpointCode }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column show-overflow-tooltip
                                                     :label="$t('systemResource.endpointName')"
                                                     width="120">
                                        <template slot-scope="scope">
                                            <span>{{ scope.row.endpointName }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column show-overflow-tooltip
                                                     :label="$t('systemResource.method')"
                                                     width="120"
                                                     align="center">
                                        <template slot-scope="scope">
                                            <span>{{ scope.row.method }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column show-overflow-tooltip
                                                     :label="$t('systemResource.url')"
                                                     width="120"
                                                     align="center">
                                        <template slot-scope="scope">
                                            <span>{{ scope.row.url }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column show-overflow-tooltip
                                                     :label="$t('systemResource.remark')"
                                                     width="120"
                                                     align="center">
                                        <template slot-scope="scope">
                                            <span>{{ scope.row.remark }}</span>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <pagination v-show="total2>0"
                                            :total="total2"
                                            :page.sync="listQuery2.currentPage"
                                            :limit.sync="listQuery2.pageSize"
                                            @pagination="getListRelation" />
                            </div>
                        </el-tab-pane>

                    </el-tabs>
                </el-dialog>
                <el-dialog :visible.sync="dialogPvVisible"
                           title="Reading statistics">
                    <el-table :data="pvData"
                              border
                              fit
                              highlight-current-row
                              cell-class-name="table-cell"
                              header-cell-class-name="header-cell"
                              style="width: 100%">
                        <el-table-column show-overflow-tooltip
                                         prop="key"
                                         label="Channel" />
                        <el-table-column show-overflow-tooltip
                                         prop="pv"
                                         label="Pv" />
                    </el-table>
                    <span slot="footer"
                          class="dialog-footer">
                        <el-button type="primary"
                                   @click="dialogPvVisible = false">{{ $t('btn.confirm') }}</el-button>
                    </span>
                </el-dialog>

                <!-- 按钮权限弹框 -->
                <el-dialog custom-class="dialog-custom"
                           :title="'按钮操作'"
                           :visible.sync="btnAuthorityDialog"
                           v-dialogDrag
                           :close-on-click-modal="false">
                    <div class="table_tag">
                        <el-button class="filter-item"
                                   size="small"
                                   type="primary"
                                   @click="addButton"
                                   icon="el-icon-plus">{{ $t('btn.add') }}</el-button>
                        <el-button class="filter-item"
                                   size="small"
                                   type="primary"
                                   @click="deleteButton"
                                   icon="el-icon-plus">{{ $t('btn.delete') }}</el-button>
                    </div>
                    <el-table :data="btnFucList"
                              border
                              fit
                              height="320px"
                              highlight-current-row
                              style="width: 100%;"
                              ref="detailtable"
                              @selection-change='btnSelectChange'
                              cell-class-name="table-cell"
                              header-cell-class-name="header-cell">
                        <el-table-column type="selection"
                                         fixed
                                         width="30"
                                         align="center"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         :label="'行号'"
                                         prop="rowId">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.rowId"
                                          type="text"
                                          required></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column show-overflow-tooltip
                                         :label="'功能'"
                                         prop="btnFunc">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.btnFunc"
                                          type="text"
                                          required></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column show-overflow-tooltip
                                         :label="'按钮名称'"
                                         prop="btnName">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.btnName"
                                          type="text"
                                          required></el-input>
                            </template>
                        </el-table-column>
                    </el-table>

                    <div slot="footer"
                         class="dialog-footer">
                        <el-button @click="btnAuthorityDialog=!btnAuthorityDialog">{{$t('btn.cancel')}}</el-button>
                        <el-button type="primary"
                                   @click="confirmBtnList">{{$t('btn.confirm')}}</el-button>
                    </div>
                </el-dialog>
            </div>
        </el-col>
    </el-row>

</template>
<script>
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import global_valfn from '@/utils/global_valfn'
import { selectDatas, addData, deleteData, selectEndpoints, addRelation, renewData } from '@/api/system/menu'
import SelectTree from '@/components/SelectTree/index.vue';
import { loadtreeDates } from '@/utils/treeDate'

export default {
    name: 'xtcd',
    components: { Pagination, SelectTree },
    data () {
        return {
            tableKey: 0,
            list: [],
            listRelation: [],
            listUnrelation: [],
            icons: this.$myFun.getSVG,
            treeData: [],
            theight: 0,//表格高度
            btnFucList: [{ rowId: '1', btnFunc: '添加', btnName: 'btnAdd' }, { rowId: '2', btnFunc: '编辑', btnName: 'btnEdit' }, { rowId: '3', btnFunc: '删除', btnName: 'btnDelete' }],//按钮列表
            total: 0,
            total1: 0,
            total2: 0,
            listLoading: true,
            listQuery: {
                currentPage: 1,
                pageSize: 15,
                page: 1,
            },
            listQuery1: {
                currentPage: 1,
                pageSize: 200,
                page: 1,
            },
            listQuery2: {
                currentPage: 1,
                pageSize: 15,
                page: 1,
            },
            temp: {
                allowEmptyValue: 'PC',
                icon: undefined
            },
            dialogFormVisible: false,
            dialogFormUser: false,
            btnAuthorityDialog: false,//按钮权限弹框
            btnSelectRow: [],
            dialogStatus: '',
            activeName2: 'first',
            rules: {
                catalogCode: [
                    { required: true, message: this.$t('validate.required'), trigger: 'blur' },
                    { max: 100, message: this.$t('validate.max32'), trigger: 'blur' }
                ],
                catalogName: [
                    { required: true, message: this.$t('validate.required'), trigger: 'blur' },
                    { max: 100, message: this.$t('validate.max32'), trigger: 'blur' }
                ],
                nodeType: [
                    { required: true, message: this.$t('validate.required'), trigger: 'blur' },
                ]
            },
            dialogPvVisible: false,
            pvData: [],
            defaultProps: {
                rowId: 'rowId',   // 父级唯一标识
                children: 'children',
                label: 'catalogName',
            },
            contentStyleObj: {
                height: null,
            },

        };
    },
    created () {
        this.getList();
        this.getTree();
        this.getHeight()
    },
    mounted () {
        this.$store.dispatch("dict/getDicData", [
            "dt_org_type",
            "dt_org_function"
        ]);
        this.setTableHeight();
        //表格高度自适应
        window.onresize = () => {
            this.setTableHeight();
            this.setTreeHeight();
        };
        this.getList();
        this.setTreeHeight();
    },
    methods: {
        //添加按钮
        addButton () {
            this.btnFucList.push({ rowId: '', btnFunc: '', btnName: '' })
        },
        //删除按钮
        deleteButton () {
            console.log(this.btnSelectRow);
        },
        //保存按钮
        confirmBtnList () {
            console.log(this.btnFucList)
        },
        btnSelectChange (val) {
            this.btnSelectRow = val;
        },
        //表格高度计算
        setTableHeight () {
            this.theight = global_valfn.getSingleTbHeight();
        },
        resetTemp () {
            this.temp = {
                nodeType: 1,
                allowEmptyValue: 'PC'
            }
        },
        pidFilter (value) {//父目录过滤器
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
        handleTabClick (tab) {//选项卡切换
            if (tab.name == "second") {
                this.getListRelation()
            } else {
                this.getListUnelation()

            }
        },
        getHeight () {//自适应高度
            this.contentStyleObj.height = document.body.scrollHeight - 110 + 'px';
        },
        destroyed () {//自适应窗体大小
            window.removeEventListener('resize', this.getHeight)
        },
        getList () {//获取数据
            this.listLoading = true
            selectDatas(this.listQuery).then(response => {
                this.list = response.data.list
                this.total = response.data.pages.count
                // Just to simulate the time of the request
                setTimeout(() => {
                    this.listLoading = false
                }, 1.5 * 100)
            })
        },
        getTree () {//获取树数据
            selectDatas().then(response => {
                this.treeData = loadtreeDates(response.data)
                setTimeout(() => {
                    this.listLoading = false
                }, 1.5 * 100)
            })
        },
        //树高度设置
        setTreeHeight () {
            this.contentStyleObj.height = global_valfn.getTreehHeight();
        },
        handleCreate () {//新增弹窗调用
            if (this.listQuery.parentId || this.listQuery.parentId === 0) {
                this.resetTemp()
                this.dialogStatus = 'create'
                this.dialogFormVisible = true
                console.log(this.icons, '1111')
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
        handleUpdate () {//更新弹窗调用
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
        handleFilter () {//查询
            this.getList()
        },
        createData () {//新增
            this.$refs['dataForm'].validate((valid) => {
                if (valid) {
                    addData(this.temp).then(() => {
                        this.getList();
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
        updateData () {//更新
            this.$refs['dataForm'].validate((valid) => {
                if (valid) {
                    // const tempData = Object.assign({}, this.temp)
                    // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
                    renewData(this.temp.catalogCode, this.temp).then(() => {
                        this.getList();
                        this.getTree()
                        this.dialogFormVisible = false
                        this.$message({
                            title: '成功',
                            message: '更新成功',
                            type: 'success',
                            duration: 2000
                        })
                    })
                }
            })
        },
        handleDelete () {//删除
            if (this.selectlistRow && this.selectlistRow.length == 1) {
                this.$confirm('此操作将删除所选中数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',

                }).then(() => {
                    deleteData(this.selectlistRow[0].catalogCode).then(() => {
                        this.getList()
                    })
                    this.getTree()
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            } else {
                this.$message({
                    title: '警告',
                    message: '请选择一条信息',
                    type: 'warning'
                })
            }

        },
        getListRelation () {//查询关联的数据
            this.listQuery2.catalogCode = this.selectlistRow[0].catalogCode
            selectEndpoints(this.listQuery2).then(response => {
                this.listRelation = response.data.list
                this.total2 = response.data.pages.count
            })
        },
        getListUnelation () {//查询未关联资源列表
            selectEndpoints(this.listQuery1).then(response => {
                this.listUnrelation = response.data.list
                this.total1 = response.data.pages.count
            })
        },
        handleAdd () {//资源关联弹窗
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
        authority () {//授权
            let fun = 'SAVE'
            if (this.selectlistRowUser && this.selectlistRowUser.length > 0) {
                let endpointCodes = []
                for (let index = 0; index < this.selectlistRowUser.length; index++) {
                    endpointCodes[index] = this.selectlistRowUser[index].endpointCode
                }
                addRelation(this.selectlistRow[0].catalogCode, endpointCodes, fun).then(() => {
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
        unauthority () {//取消授权
            let fun = 'REMOVE'
            if (this.selectlistRowUser && this.selectlistRowUser.length > 0) {
                let endpointCodes = []
                for (let index = 0; index < this.selectlistRowUser.length; index++) {
                    endpointCodes[index] = this.selectlistRowUser[index].endpointCode
                }
                addRelation(this.selectlistRow[0].catalogCode, endpointCodes, fun).then(() => {
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
        selectRow (val) {
            if (val.length > 1) {
                this.$refs.tb_a.clearSelection()//清除其他行的选中
                this.$refs.tb_a.toggleRowSelection(val[val.length - 1], 'selected')//单击行绑定点击事件
            } else if (val.length === 1) {
                this.selectlistRow = val
            }
        },
        rowClick (val) {
            this.$refs.tb_a.clearSelection()//清除其他行的选中
            this.$refs.tb_a.toggleRowSelection(val)//单击行绑定点击事件
        },

        selectRowUser (val) {
            this.selectlistRowUser = val
        },
        selectRowUser1 (val) {
            this.selectlistRowUser1 = val
        },
        handleNodeClick (data) {//点击树查询
            this.listQuery.parentId = data.rowId
            this.getList()
        },
        //按钮权限添加
        handleBtnAuthority () {
            this.btnAuthorityDialog = true;
        }
    },

};
</script>
