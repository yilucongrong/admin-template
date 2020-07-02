// 查询+单表
<template>
    <div>
        <div class="app-container">
            <div class="filter-container">
                <div class="filter-items">
                    <el-input
                        :placeholder="$t('roleManagement.roleCode')"
                        @keyup.enter.native="handleQuery"
                        class="filter-item"
                        size="small"
                        v-model="listQuery.roleCode"
                    ></el-input>
                    <el-input
                        :placeholder="$t('roleManagement.roleName')"
                        @keyup.enter.native="handleQuery"
                        class="filter-item"
                        size="small"
                        v-model="listQuery.roleName"
                    ></el-input>
                    <el-select :placeholder="$t('roleManagement.roleType')" clearable size="small" v-model="listQuery.roleType">
                        <el-option
                            :key="item.dictItemKey"
                            :label="item.dictItemValue"
                            :value="item.dictItemKey"
                            v-for="item in dt_role_type"
                        ></el-option>
                    </el-select>
                    <changeModuleSelect @changeMoudle="changeMoudle"></changeModuleSelect>

                    <el-button
                        @click="handleQuery"
                        class="filter-item-btn"
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
                        @click="handleUpdate"
                        class="filter-item"
                        icon="el-icon-edit"
                        size="small"
                        type="primary"
                    >{{ $t('btn.edit') }}</el-button>
                    <el-button
                        @click="handleDelete"
                        class="filter-item"
                        icon="el-icon-delete"
                        size="small"
                        type="primary"
                    >{{ $t('btn.delete') }}</el-button>
                    <el-button
                        @click="handleCreate"
                        class="filter-item"
                        icon="el-icon-edit-outline"
                        size="small"
                        type="primary"
                    >{{ $t('userManagement.functionAuthorization') }}</el-button>
                    <el-button
                        @click="handleCreate"
                        class="filter-item"
                        icon="el-icon-edit-outline"
                        size="small"
                        type="primary"
                    >{{ $t('userManagement.userAuthorization') }}</el-button>
                </div>
                <el-table
                    :data="list"
                    :height="theight"
                    :key="tableKey"
                    @row-click="rowClick"
                    @selection-change="selectChange"
                    border
                    cell-class-name="table-cell"
                    fit
                    header-cell-class-name="header-cell"
                    highlight-current-row
                    ref="tb"
                >
                    <el-table-column type="selection" width="30"></el-table-column>
                    <el-table-column
                        :label="$t('roleManagement.roleCode')"
                        align="center"
                        prop="roleCode"
                        show-overflow-tooltip
                        width="120"
                    ></el-table-column>
                    <el-table-column
                        :label="$t('roleManagement.roleName')"
                        align="center"
                        prop="roleName"
                        show-overflow-tooltip
                        width="200"
                    ></el-table-column>
                    <el-table-column
                        :label="$t('roleManagement.roleType')"
                        align="center"
                        prop="roleType"
                        show-overflow-tooltip
                        width="200"
                    >
                        <template slot-scope="scope">
                            <span>{{ scope.row.roleTypeCN}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="角色域" prop="domainScope" show-overflow-tooltip width="120"></el-table-column>
                    <el-table-column
                        :label="$t('roleManagement.remark')"
                        align="center"
                        min-width="100"
                        prop="remark"
                        show-overflow-tooltip
                    ></el-table-column>
                </el-table>
                <pagination
                    :limit.sync="listQuery.pageSize"
                    :page.sync="listQuery.currentPage"
                    :total="total"
                    @pagination="getList"
                />
            </div>
        </div>
    </div>
</template>

<script>
import changeModuleSelect from '@/components/template/changeMoudleSelect'

import * as api from '@/api/system/role'
import Pagination from '@/components/Pagination'
import { mapState } from 'vuex'
export default {
    name: 'jsgl',
    components: { changeModuleSelect, Pagination },
    data() {
        return {
            modalnum: null, //模板编号，非模板页面可删
            theight: 0, //表格高度
            isSingle: true, //表格是否单选 点击各按钮根据流程逻辑控制单多选
            list: [],
            total: 0,
            listQuery: {
                //查询
                page: true,
                currentPage: 1,
                pageSize: 15
            },
            currentSelectedRow: null, //当前选中的行
            selectedRows: null, //多选时选中的所有行
            tableKey: 0 //表格索引
        }
    },
    created() {},
    computed: {
        ...mapState({
            dt_role_type: state => state.dict.dt_role_type
        })
    },
    mounted() {
        this.$store.dispatch('dict/getDicData', ['dt_role_type'])
        this.setTableHeight()
        //表格高度自适应
        window.onresize = () => {
            this.setTableHeight()
        }
        this.getList()
    },
    methods: {
        //模板切换事件，非模板页面可删
        changeMoudle(val) {
            this.$emit('changeSelect', val)
        },
        //表格高度计算
        setTableHeight() {
            this.theight = this.$myFun.getSingleTbHeight()
        },
        //获取表格数据
        getList() {
            api.selectrole(this.listQuery).then(response => {
                let options = [this.dt_role_type]
                response.data = this.$myFun.codeToName(response.data, options, [
                    'dt_role_type'
                ])
                this.list = response.data.list
                this.total = response.data.pages.count
                // Just to simulate the time of the request
                setTimeout(() => {
                    this.listLoading = false
                }, 1.5 * 100)
            })
        },
        //表格查询
        handleQuery() {
            this.listQuery.currentPage = 1
            this.getList()
        },
        //表格显示条数变化
        handleSizeChange(val) {
            this.listQuery.pageSize = val
            this.getList()
        },
        //表格当前页变化
        handleCurrentChange(val) {
            this.listQuery.currentPage = val
            this.getList()
        },
        handleCreate() {
            //新增按钮单击事件方法
        },
        handleUpdate() {
            //编辑按钮单击事件方法
        },
        handleDelete() {
            //删除按钮单击事件方法
        },
        // 表格选择框选中 注:参数为选中的所有行的数组
        selectChange(val) {
            if (this.isSingle) {
                if (val.length > 1) {
                    this.$refs.tb.clearSelection() //清除其他行的选中
                    this.$refs.tb.toggleRowSelection(
                        val[val.length - 1],
                        'selected'
                    ) //单击行绑定点击事件
                } else if (val.length === 1) {
                    this.selectedRows = val
                    this.currentSelectedRow = val[val.length - 1]
                }
            } else {
                this.selectedRows = val
                this.currentSelectedRow = val[val.length - 1]
            }
        },
        //点击表格某一行
        rowClick(val) {
            this.$refs.tb.toggleRowSelection(val, 'selected') //单击行绑定点击事件
        }
    }
}
</script>


    