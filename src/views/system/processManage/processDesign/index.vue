//模板2(左树+查+表)
<template>
    <div>
        <el-row>
            <el-col :span="3"
                    class="left-trees">
                <div class="left-tree">
                    <el-tree :data="treeData"
                             :props="defaultProps"
                             @node-click="handleNodeClick"
                             :style="contentStyleObj">
                    </el-tree>
                </div>
            </el-col>
            <el-col :span="21">
                <div class="app-container">
                    <div class="filter-container">
                        <div class="filter-items">
                            <el-input size="small"
                                      :placeholder="$t('table.organizationNum')"
                                      v-model="listQuery.organizationCode"
                                      class="filter-item"
                                      @keyup.enter.native="handleQuery" />
                            <el-input size="small"
                                      :placeholder="$t('table.organizationName')"
                                      v-model="listQuery.organizationName"
                                      class="filter-item"
                                      @keyup.enter.native="handleQuery" />
                            <changeModuleSelect @changeMoudle="changeMoudle"></changeModuleSelect>

                            <el-button class="filter-item-btn"
                                       type="primary"
                                       size="small"
                                       icon="el-icon-search"
                                       @click="handleQuery">
                                {{ $t("btn.search") }}</el-button>
                        </div>
                    </div>
                    <div class="table-container">
                        <div class="oprate_btn">
                            <el-button class="filter-item"
                                       size="small"
                                       type="primary"
                                       @click="handleCreate"
                                       icon="el-icon-plus">新增</el-button>
                        </div>
                        <el-table :key="tableKey"
                                  :data="list"
                                  border
                                  fit
                                  :height="theight"
                                  highlight-current-row
                                  style="width: 100%;"
                                  cell-class-name="table-cell"
                                  header-cell-class-name="header-cell"
                                  @selection-change="selectChange"
                                  @row-click="rowClick"
                                  ref="tb">

                            <el-table-column label="操作"
                                             fixed
                                             width="200px">
                                <template slot-scope="scope">
                                    <el-tooltip content="编辑"
                                                placement="bottom">
                                        <el-button icon="el-icon-edit"
                                                   @click="handleUpdate(scope.$index, scope.row)"></el-button>
                                    </el-tooltip>
                                    <el-button icon="el-icon-delete"
                                               @click="handleDelete(scope.$index, scope.row)"></el-button>
                                    <el-button icon="el-icon-share"></el-button>
                                    <el-button icon="el-icon-upload2"
                                               @click="handleupload(scope.$index, scope.row)"></el-button>
                                    <el-button icon="el-icon-download"
                                               @click="handleDownload(scope.$index, scope.row)"></el-button>
                                    <el-button icon="el-icon-search"
                                               @click="handlesearch(scope.$index, scope.row)"></el-button>
                                    <el-button icon="el-icon-top-right"
                                               @click="handlepublish(scope.$index, scope.row)"></el-button>
                                    <el-button icon="el-icon-refresh-left"
                                               @click="handlereturn(scope.$index, scope.row)"></el-button>
                                </template>
                            </el-table-column>

                            <el-table-column show-overflow-tooltip
                                             label="流程标识"
                                             fixed
                                             prop="organizationCode"
                                             align="center">
                                <template slot-scope="scope">
                                    <span>{{
                                        scope.row.organizationCode
                                    }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column show-overflow-tooltip
                                             label="中文名"
                                             fixed
                                             align="center"
                                             width="120px">
                                <template slot-scope="scope">
                                    <span>{{
                                        scope.row.organizationName
                                    }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column show-overflow-tooltip
                                             label="版本"
                                             align="center"
                                             width="120px">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.typeCN }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column show-overflow-tooltip
                                             label="发布状态">
                                <template slot-scope="scope">
                                    <span>{{
                                        scope.row.businessFunctionCN
                                    }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column show-overflow-tooltip
                                             label="业务码"
                                             align="center">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.contact }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column show-overflow-tooltip
                                             label="英文名"
                                             align="center">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.adress }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column show-overflow-tooltip
                                             label="分类项">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.email }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column show-overflow-tooltip
                                             label="模型类型">
                                <template slot-scope="scope">
                                    <span>{{
                                        scope.row.businessFunctionCN
                                    }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column show-overflow-tooltip
                                             label="描述">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.mobile }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column show-overflow-tooltip
                                             label="创建时间">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.createtime }}</span>
                                </template>
                            </el-table-column>

                        </el-table>
                        <pagination v-show="total > 0"
                                    :total="total"
                                    :page.sync="listQuery.currentPage"
                                    :limit.sync="listQuery.pageSize"
                                    @pagination="getList" />
                    </div>

                    <el-dialog class="form_dialog"
                               width="50%"
                               top="10vh"
                               custom-class="dialog-custom"
                               :title="dialogStatus == 'create' ? '模型扩展新增' : '模型扩展修改'"
                               :close-on-click-modal="false"
                               :visible.sync="dialogVisible">
                        <el-collapse v-model="activeCollNames">
                            <el-collapse-item title="模型扩展表明细"
                                              name="1">
                                <el-form :model="mainList"
                                         ref="mainList"
                                         label-width="130px"
                                         :inline="true"
                                         class="demo-form-inline dialog_form">
                                    <el-form-item label="流程（分类）标识"
                                                  prop="organizationCode">
                                        <el-input style="width: 165px"
                                                  size="small"
                                                  v-model="mainList.organizationCode"></el-input>
                                    </el-form-item>
                                    <el-form-item label="业务码"
                                                  prop="contact">
                                        <el-input style="width: 165px"
                                                  size="small"
                                                  v-model="mainList.contact"></el-input>
                                    </el-form-item>
                                    <el-form-item label="中文名"
                                                  prop="organizationName">
                                        <el-input style="width: 165px"
                                                  size="small"
                                                  v-model="mainList.organizationName"></el-input>
                                    </el-form-item>
                                    <el-form-item label="英文名"
                                                  prop="adress">
                                        <el-input style="width: 165px"
                                                  size="small"
                                                  v-model="mainList.adress"></el-input>
                                    </el-form-item>
                                    <el-form-item label="分类项"
                                                  prop="email">
                                        <el-input style="width: 165px"
                                                  size="small"
                                                  v-model="mainList.email"></el-input>
                                    </el-form-item>
                                    <el-form-item label="节点分类">
                                        <el-select v-model="mainList.region"
                                                   placeholder="请选择">
                                            <el-option label="流程模型"
                                                       value="0"></el-option>
                                            <el-option label="分类项"
                                                       value="1"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="描述"
                                                  prop="mobile">
                                        <el-input style="width:165px;"
                                                  v-model="mainList.mobile"></el-input>
                                    </el-form-item>
                                </el-form>
                            </el-collapse-item>
                        </el-collapse>
                        <div slot="footer"
                             class="dialog-footer">
                            <el-button @click="dialogVisible=!dialogVisible">关闭</el-button>
                            <el-button type="primary"
                                       @click="handlesave">保存</el-button>
                        </div>
                    </el-dialog>
                    <el-dialog class="form_dialog"
                               width="50%"
                               top="10vh"
                               custom-class="dialog-custom"
                               title="请假测试2"
                               :close-on-click-modal="false"
                               :visible.sync="dialogVisibleupload">
                        <el-collapse v-model="activeCollNames">
                            <el-collapse-item title="请假测试2流程"
                                              name="1">
                                <upload></upload>
                            </el-collapse-item>
                        </el-collapse>
                        <div slot="footer"
                             class="dialog-footer">
                            <el-button @click="dialogVisibleupload=!dialogVisibleupload">关闭</el-button>
                            <el-button type="primary"
                                       @click="handleup">上传</el-button>
                        </div>
                    </el-dialog>
                    <el-dialog class="form_dialog"
                               width="50%"
                               top="10vh"
                               custom-class="dialog-custom"
                               title="请假测试2"
                               :close-on-click-modal="false"
                               :visible.sync="dialogVisiblesearch">
                        <el-collapse v-model="activeCollNames">
                            <el-collapse-item title="请假测试2流程图查看"
                                              name="1">
                                <div></div>
                            </el-collapse-item>
                        </el-collapse>
                        <div slot="footer"
                             class="dialog-footer">
                            <el-button @click="dialogVisiblesearch=!dialogVisiblesearch">关闭</el-button>
                        </div>
                    </el-dialog>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import changeModuleSelect from '@/components/template/changeMoudleSelect'
import upload from './upload'
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
import {
    selectlists,
    selecttree
} from "@/api/system/organization";
import { mapState } from "vuex";

export default {
    name: "processDesign",
    components: { changeModuleSelect, Pagination, upload },
    data () {
        return {
            modalnum: null,//模板编号
            theight: 0,//表格高度
            isSingle: true,//表格是否单选 点击各按钮根据流程逻辑控制单多选
            currentSelectedRow: null,//当前选中的行
            selectedRows: null,//多选时选中的所有行
            //树高度样式
            contentStyleObj: {
                height: ""
            },
            mainList: {

            },
            treeData: [],
            defaultProps: {
                children: "children",
                label: "organizationName"
            },
            tableKey: 0,//表格索引，虚拟dom渲染表格时使用
            list: [],
            total: 0,
            orgName: [],
            dialogStatus: "",
            activeCollNames: ['1'],
            listLoading: true,
            dialogVisible: false,
            dialogVisibleupload: false,
            dialogVisiblesearch: false,
            listQuery: {
                parentOrgCode: undefined,
                currentPage: 1,
                pageSize: 10,
                organizationCode: undefined,
                organizationName: undefined
            }
        };
    },
    computed: {
        ...mapState({
            dt_org_type: state => state.dict.dt_org_type,
            dt_org_function: state => state.dict.dt_org_function
        })
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
        //模板变化
        changeMoudle (val) {
            this.$emit('changeSelect', val)
        },
        //表格高度计算
        setTableHeight () {
            this.theight = this.$myFun.getSingleTbHeight();
        },
        treeGetList () {
            //点击树查询
            selectlists(this.listQuery).then(response => {
                this.list = response.data.list;
                this.total = response.data.pages.count;
            });
        },
        getList () {
            //查询组织列表
            setTimeout(() => {
                selectlists(this.listQuery).then(response => {
                    let options = [this.dt_org_type, this.dt_org_function];
                    response.data = this.$myFun.codeToName(response.data, options, [
                        "type",
                        "businessFunction"
                    ]);
                    this.list = response.data.list;
                    this.total = response.data.pages.count;
                }),
                    selecttree().then(response => {
                        //获取树数据
                        this.treeData = this.$myFun.addTreeRoot(response.data);
                        this.orgName = response.data.map(function (itmes) {
                            return [itmes.rowId, itmes.organizationName];
                        });
                    });
            }, 1.5 * 100);
        },
        handleQuery () {
            //查询
            this.listQuery.page = 1;

            selectlists(this.listQuery).then(response => {
                let options = [this.dt_org_type, this.dt_org_function];
                response.data = this.$myFun.codeToName(response.data, options, [
                    "type",
                    "businessFunction"
                ]);
                this.list = response.data.list;
            });
        },
        //新增
        handleCreate () {
            this.resetTemp();
            this.dialogVisible = true
            this.dialogStatus = 'create'
        },
        //编辑
        handleUpdate (index, row) {
            console.log(index, row, '123')
            this.dialogVisible = true
            this.mainList = row
            this.dialogStatus = 'update'
        },
        handleDelete (index) { //删除
            this.list.splice(index, 1)
        },
        handleupload () { //上传
            this.dialogVisibleupload = true
        },
        handleDownload () { //下载

        },
        handlesearch () { //流程图查看
            this.dialogVisiblesearch = true
        },
        handlepublish () { //流程图发布

        },
        handlereturn () { //还原版本

        },
        handleup () { //上传

        },
        handlesave () { //保存

        },
        // 表格选择框选中 注:参数为选中的所有行的数组
        selectChange (val) {
            if (this.isSingle) {
                if (val.length > 1) {
                    this.$refs.tb.clearSelection(); //清除其他行的选中
                    this.$refs.tb.toggleRowSelection(val[val.length - 1], "selected"); //单击行绑定点击事件
                } else if (val.length === 1) {
                    this.selectedRows = val;
                    this.currentSelectedRow = val[val.length - 1]
                }
            } else {
                this.selectedRows = val;
                this.currentSelectedRow = val[val.length - 1]
            }
        },
        //点击某行时执行
        rowClick (val) {
            if (this.isSingle) {
                this.$refs.tb.clearSelection(); //清除其他行的选中
            }
            this.$refs.tb.toggleRowSelection(val); //单击行绑定点击事件
        },

        //树高度设置
        setTreeHeight () {
            this.contentStyleObj.height = this.$myFun.getTreehHeight();
        },
        handleNodeClick (data) {
            //点击树查询
            this.listQuery.parentOrgCode = data.rowId;
            this.treeGetList();
        },
        resetTemp () {
            this.mainList = {}
        }
    }
};
</script>
<style>
.el-table .el-button {
    border: none;
    padding: 0;
}
</style>

