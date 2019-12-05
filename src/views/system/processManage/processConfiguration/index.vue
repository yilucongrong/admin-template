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
                                    <el-tooltip content="流程信息配置"
                                                placement="left-end">
                                        <el-button icon="el-icon-scissors"
                                                   @click="handleUpdate(scope.$index, scope.row)"></el-button>
                                    </el-tooltip>
                                    <el-button icon="el-icon-set-up"
                                               @click="handleDelete(scope.$index, scope.row)"></el-button>
                                    <el-button icon="el-icon-share"></el-button>
                                    <el-button icon="el-icon-video-play"
                                               @click="handleupload(scope.$index, scope.row)"></el-button>
                                </template>
                            </el-table-column>

                            <el-table-column show-overflow-tooltip
                                             label="流程定义号"
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
                                             label="流程标识号"
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
                                             label="流程名称"
                                             align="center"
                                             width="120px">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.typeCN }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column show-overflow-tooltip
                                             label="流程版本">
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
                                             label="发布状态"
                                             align="center">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.adress }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column show-overflow-tooltip
                                             label="发布时间">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.email }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column show-overflow-tooltip
                                             label="结束服务名">
                                <template slot-scope="scope">
                                    <span>{{
                                        scope.row.businessFunctionCN
                                    }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column show-overflow-tooltip
                                             label="备注">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.mobile }}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                        <pagination v-show="total > 0"
                                    :total="total"
                                    :page.sync="listQuery.currentPage"
                                    :limit.sync="listQuery.pageSize"
                                    @pagination="getList" />
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import changeModuleSelect from '@/components/template/changeMoudleSelect'
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
import {
    selectlists,
    selecttree
} from "@/api/system/organization";
import { mapState } from "vuex";

export default {
    name: "processDesign",
    components: { changeModuleSelect, Pagination },
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
        handleUpdate () {

        },
        handleDelete () {

        },
        handleupload () { //流程模拟

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

