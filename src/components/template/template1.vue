// 查询+单表
<template>
    <div>
        <div class="app-container">
            <div class="filter-container">
                <div class="filter-items">
                    <el-input @keyup.enter.native="handleQuery"
                              :placeholder="$t('roleManagement.roleCode')"
                              class="filter-item"
                              size="small"
                              v-model="listQuery.roleCode"></el-input>
                    <el-input @keyup.enter.native="handleQuery"
                              :placeholder="$t('roleManagement.roleName')"
                              class="filter-item"
                              size="small"
                              v-model="listQuery.roleName"></el-input>
                    <el-select size="small"
                               v-model="listQuery.roleType"
                               :placeholder="$t('roleManagement.roleType')"
                               clearable>
                        <el-option v-for="item in dt_role_type"
                                   :key="item.dictItemKey"
                                   :label="item.dictItemValue"
                                   :value="item.dictItemKey"></el-option>
                    </el-select>
                    <changeModuleSelect @changeMoudle="changeMoudle"></changeModuleSelect>

                    <el-button class="filter-item-btn"
                               type="primary"
                               size="small"
                               icon="el-icon-search"
                               @click="handleQuery">{{ $t('table.search') }}</el-button>
                </div>
            </div>
            <div class="table-container">
                <div class="oprate_btn">
                    <el-button size="small"
                               class="filter-item"
                               type="primary"
                               icon="el-icon-plus"
                               @click="handleCreate">{{ $t('table.add') }}</el-button>
                    <el-button size="small"
                               class="filter-item"
                               type="primary"
                               icon="el-icon-edit"
                               @click="handleUpdate">{{ $t('table.edit') }}</el-button>
                    <el-button size="small"
                               class="filter-item"
                               type="primary"
                               icon="el-icon-delete"
                               @click="handleDelete">{{ $t('table.delete') }}</el-button>
                    <el-button size="small"
                               class="filter-item"
                               type="primary"
                               icon="el-icon-edit-outline"
                               @click="handleCreate">{{ $t('userManagement.functionAuthorization') }}</el-button>
                    <el-button size="small"
                               class="filter-item"
                               type="primary"
                               icon="el-icon-edit-outline"
                               @click="handleCreate">{{ $t('userManagement.userAuthorization') }}</el-button>
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
                                     width="120"
                                     align="center"
                                     :label="$t('roleManagement.roleCode')"
                                     prop="roleCode"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="200"
                                     align="center"
                                     :label="$t('roleManagement.roleName')"
                                     prop="roleName"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="200"
                                     align="center"
                                     :label="$t('roleManagement.roleType')"
                                     prop="roleType">
                        <template slot-scope="scope">
                            <span>{{ scope.row.roleTypeCN}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="120"
                                     align="center"
                                     label="角色域"
                                     prop="domainScope"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     min-width="100"
                                     align="center"
                                     :label="$t('roleManagement.remark')"
                                     prop="remark"></el-table-column>
                </el-table>
                <pagination :total="total"
                            :size="15"
                            :page.sync="listQuery.currentPage"
                            :limit.sync="listQuery.pageSize"
                            @pagination="getList" />
            </div>
        </div>
    </div>

</template>

<script>
import changeModuleSelect from '@/components/template/changeMoudleSelect'
import global_valfn from '@/utils/global_valfn'
import * as api from "@/api/system/role";
import Pagination from "@/components/Pagination";
import { mapState } from "vuex";
import { codeToName } from "@/utils/codeToName";
export default {
    name: "jsgl",
    components: { changeModuleSelect, Pagination },
    data () {
        return {
            modalnum: null,//模板编号，非模板页面可删
            theight: 0,//表格高度
            isSingle: true,//表格是否单选 点击各按钮根据流程逻辑控制单多选
            list: [],
            total: 0,
            listQuery: {
                //查询
                page: true,
                currentPage: 1,
                pageSize: 15
            },
            currentSelectedRow: null,//当前选中的行
            selectedRows: null,//多选时选中的所有行
            tableKey: 0 //表格索引
        };
    },
    created () { },
    computed: {
        ...mapState({
            dt_role_type: state => state.dict.dt_role_type
        })
    },
    mounted () {
        this.$store.dispatch("dict/getDicData", ["dt_role_type"]);
        this.setTableHeight();
        //表格高度自适应
        window.onresize = () => {
            this.setTableHeight()
        };
        this.getList();
    },
    methods: {
        //模板切换事件，非模板页面可删
        changeMoudle (val) {
            this.$emit('changeSelect', val)
        },
        //表格高度计算
        setTableHeight () {
            this.theight = global_valfn.getSingleTbHeight();
        },
        //获取表格数据
        getList () {
            api.selectrole(this.listQuery).then(response => {
                let options = [this.dt_role_type];
                response.data = codeToName(response.data, options, [
                    "dt_role_type"
                ]);
                this.list = response.data.list;
                this.total = response.data.pages.count;
                // Just to simulate the time of the request
                setTimeout(() => {
                    this.listLoading = false;
                }, 1.5 * 100);
            });
        },
        //表格查询
        handleQuery () {
            this.listQuery.currentPage = 1;
            this.getList();
        },
        //表格显示条数变化
        handleSizeChange (val) {
            this.listQuery.pageSize = val;
            this.getList();
        },
        //表格当前页变化
        handleCurrentChange (val) {
            this.listQuery.currentPage = val;
            this.getList();
        },
        handleCreate () {
            //新增按钮单击事件方法
        },
        handleUpdate () {
            //编辑按钮单击事件方法
        },
        handleDelete () {
            //删除按钮单击事件方法
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
        //点击表格某一行
        rowClick (val) {
            this.$refs.tb.toggleRowSelection(val, "selected"); //单击行绑定点击事件
        }
    }
};
</script>


    