//左右表结构 根据从表有无搜索项+从表高度以及nofilter样式，pagenation根据宽度给属性赋值定制显示
<template>
    <div>
        <div class="app-container">
            <el-row>
                <el-col class="left_col"
                        :span="12">
                    <div class="filter-container">
                        <div class="filter-items">
                            <div class="select-element">
                                <el-input size="small"
                                          :placeholder="$t('dict.dictCode')"
                                          v-model="listQuery.dictCode"
                                          class="filter-item"
                                          @keyup.enter.native="handleQuery" />
                                <el-input size="small"
                                          :placeholder="$t('dict.dictName')"
                                          v-model="listQuery.dictName"
                                          class="filter-item"
                                          @keyup.enter.native="handleQuery" />

                                <el-button class="filter-item"
                                           size="small"
                                           type="primary"
                                           icon="el-icon-search"
                                           @click="handleQuery">{{$t('btn.search')}}</el-button>
                            </div>
                        </div>
                    </div>
                    <div class="table-container">
                        <div class="oprate_btn">
                            <changeModuleSelect @changeMoudle="changeMoudle"></changeModuleSelect>
                            <el-button class="filter-item"
                                       size="small"
                                       type="primary"
                                       @click="handleCreate"
                                       icon="el-icon-plus">{{$t('btn.add')}}</el-button>
                            <el-button class="filter-item"
                                       size="small"
                                       type="primary"
                                       @click="handleUpdate"
                                       icon="el-icon-edit">{{$t('btn.edit')}}</el-button>
                            <el-button class="filter-item"
                                       size="small"
                                       type="primary"
                                       @click="handleDelete"
                                       icon="el-icon-delete">{{$t('btn.delete')}}</el-button>
                        </div>

                        <el-table :key="tableKey[0]"
                                  :data="list"
                                  border
                                  fit
                                  :height="theight"
                                  highlight-current-row
                                  style="width: 100%;"
                                  @selection-change="selectChange"
                                  @row-click="rowClick"
                                  size="mini"
                                  cell-class-name="table-cell"
                                  header-cell-class-name="header-cell"
                                  ref="tb">
                            <el-table-column type="selection"
                                             width="30"></el-table-column>
                            <el-table-column show-overflow-tooltip
                                             width="200"
                                             align="left"
                                             :label="$t('dict.dictCode')"
                                             prop="dictCode"></el-table-column>
                            <el-table-column show-overflow-tooltip
                                             width="140"
                                             align="left"
                                             :label="$t('dict.dictName')"
                                             prop="dictName"></el-table-column>
                            <el-table-column show-overflow-tooltip
                                             min-width="120"
                                             align="left"
                                             :label="$t('dict.dictType')">
                                <template slot-scope="scope">
                                    {{ [scope.row.dictType, dictTypeOptions] | optionsFilter }}
                                </template>
                            </el-table-column>
                        </el-table>
                        <pagination :total="total"
                                    :page.sync="listQuery.currentPage"
                                    :limit.sync="listQuery.pageSize"
                                    @pagination="getList" />
                    </div>
                </el-col>

                <el-col class="right_col"
                        :span="12">
                    <div class="nofilter table-container">
                        <div class="oprate_btn_r">
                            <el-button class="filter-item"
                                       size="small"
                                       type="primary"
                                       @click="handleCreateSub"
                                       icon="el-icon-plus">{{$t('btn.add')}}</el-button>
                            <el-button class="filter-item"
                                       size="small"
                                       type="primary"
                                       @click="handleCreateSub"
                                       icon="el-icon-edit">{{$t('btn.edit')}}</el-button>
                            <el-button class="filter-item"
                                       size="small"
                                       type="primary"
                                       @click="handleDeleteSub()"
                                       icon="el-icon-delete">{{$t('btn.delete')}}</el-button>
                        </div>

                        <el-table :key="tableKey[1]"
                                  :data="listSub"
                                  border
                                  fit
                                  :height="stheight"
                                  highlight-current-row
                                  style="width: 100%;"
                                  size="mini"
                                  cell-class-name="table-cell"
                                  header-cell-class-name="header-cell"
                                  v-bind:parentdictCode="dictCode">
                            <el-table-column type="selection"
                                             width="30"></el-table-column>
                            <el-table-column show-overflow-tooltip
                                             width="200"
                                             align="left"
                                             :label="$t('dict.dictItemKey')"
                                             prop="dictItemKey"></el-table-column>
                            <el-table-column show-overflow-tooltip
                                             min-width="140"
                                             align="left"
                                             :label="$t('dict.dictItemValue')"
                                             prop="dictItemValue"></el-table-column>
                        </el-table>
                        <pagination :total="totalSub"
                                    :page.sync="listQuerySub.currentPage"
                                    :limit.sync="listQuerySub.pageSize"
                                    @pagination="getList" />
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import changeModuleSelect from '@/components/template/changeMoudleSelect'
import global_valfn from '@/utils/global_valfn'
import * as api from "@/api/data-base/dict";
import Pagination from "@/components/Pagination";
import { DICT_TYPE_OPTIONS } from "@/utils/constant";

export default {
    name: "dict",
    components: { changeModuleSelect, Pagination },
    data () {
        return {
            modalnum: null,//模板编号
            theight: 0,
            stheight: 0,//右子表高度
            isSingle: false,//表格是否单选 点击各按钮根据流程逻辑控制单多选
            list: null,
            listSub: [],
            total: 0,
            totalSub: 0,
            listQuery: {
                page: true,
                currentPage: 1,
                pageSize: 10,
                dictCode: undefined,
                dictName: undefined,
                dictType: undefined,
                dictItemKey: undefined,
                dictItemValue: undefined
            },
            listQuerySub: {
                page: true,
                currentPage: 1,
                pageSize: 10
            },
            temp: {
                dictCode: undefined,
                dictName: undefined,

                dictType: undefined,
                dictItemDTOs: []
            },
            dictCode: undefined,
            selectCode: [],
            tableKey: [0, 1],//表格索引，虚拟dom渲染表格时使用
            dictTypeOptions: DICT_TYPE_OPTIONS,
            dictItems: []
        };
    },
    mounted () {
        this.setTableHeight();
        //表格高度自适应
        window.onresize = () => {
            this.setTableHeight()
        };
        this.getList();
    },
    methods: {
        //表格高度计算
        setTableHeight () {
            this.theight = global_valfn.getSingleTbHeight() - 2;
            this.stheight = this.theight + 58;
        },
        //模板变化
        changeMoudle (val) {
            this.$emit('changeSelect', val)
        },
        getList () {
            api.queryRecords(this.listQuery).then(res => {
                this.list = res.data.list;
                this.total = res.data.pages.count;
            });
        },
        getListSub () {//查询明细
            api.getRecord(this.selectlistRow.dictCode).then(res => {
                this.listSub = res.data.dictItemDTOs;
                this.total1 = res.data.dictItemDTOs.length;
            });
        },
        handleQuery () {
            this.listQuery.currentPage = 1;
            this.getList();
        },
        handleSizeChange (val) {
            this.listQuery.pageSize = val;
            this.getList();
        },
        handleCurrentChange (val) {
            this.listQuery.currentPage = val;
            this.getList();
        },
        handleCreate () {
            this.resetTemp();
            this.dialogStatus = "create";
            this.dialogFormVisible = true;
        },
        handleCreateSub () {//新增明细弹窗

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
        handleUpdate () { //编辑弹窗

        },
        handleDelete () {//删除字典列表
            if (this.selectlistRow) {
                this.$confirm("此操作将删除所选中数据, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {

                }).catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条信息",
                    type: "warning"
                });
            }
        },
        handleDeleteSub () {//删除明细列表
            if (this.selectlistRow1 && this.selectlistRow1.length == 1) {
                this.$confirm("此操作将删除所选中数据, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {

                }).catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条信息",
                    type: "warning"
                });
            }
        },

    }
};
</script>