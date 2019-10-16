// 折叠面板
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
                <div class="collapse_div">
                    <el-collapse v-model="activeCollNames"
                                 @change="handleCollChange">
                        <el-collapse-item title="一致性 Consistency"
                                          name="1">
                            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                        </el-collapse-item>
                        <el-collapse-item title="反馈 Feedback"
                                          name="2">
                            <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                            <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
                        </el-collapse-item>
                        <el-collapse-item title="效率 Efficiency"
                                          name="3">
                            <div>简化流程：设计简洁直观的操作流程；</div>
                            <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                            <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
                        </el-collapse-item>
                        <el-collapse-item title="可控 Controllability"
                                          name="4">
                            <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
                            <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
                <div class="oprate_btn no_t_border">
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
                          @select="select"
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
    name: "zdmb",
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
            selectedrow: {},
            tableKey: 0, //表格索引
            activeCollNames: ['1']
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
        //单选时执行
        select (val) {
            if (this.isSingle) {
                this.$refs.tb.clearSelection(); //清除其他行的选中
                this.$refs.tb.toggleRowSelection(val, "selected"); //单击行绑定点击事件
            }
        },
        // 表格选择框选中 注:参数为选中的所有行的数组
        selectChange (val) {
            if (!this.isSingle) {
                this.selectedrow = val;
            }
        },
        //点击表格某一行
        rowClick (val) {
            if (this.isSingle) {
                this.$refs.tb.clearSelection(); //清除其他行的选中
            }
            this.$refs.tb.toggleRowSelection(val, "selected"); //单击行绑定点击事件
        },
        //折叠面板
        handleCollChange (val) {
            console.log(val);
        }
    }
};
</script>


    