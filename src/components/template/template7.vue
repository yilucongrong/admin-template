//el-table内部折叠信息
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
                <el-table :data="tableData"
                          :height="theight"
                          border
                          fit
                          highlight-current-row
                          cell-class-name="table-cell"
                          header-cell-class-name="header-cell"
                          @selection-change="selectChange"
                          @expand-change="expandChange"
                          ref="tb">
                    <!-- 注：选择框不能设置width，否则可能造成样式错乱 -->
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-table :data="tableDataInner[props.row.id]"
                                      cell-class-name="table-cell-inner"
                                      header-cell-class-name="header-cell-inner">
                                <el-table-column label="商品 ID"
                                                 prop="id">
                                </el-table-column>
                                <el-table-column label="商品名称"
                                                 prop="name">
                                </el-table-column>
                                <el-table-column label="描述"
                                                 prop="desc">
                                </el-table-column>
                            </el-table>
                        </template>
                    </el-table-column>
                    <el-table-column type="selection"></el-table-column>

                    <el-table-column label="商品 ID"
                                     prop="id">
                    </el-table-column>
                    <el-table-column label="商品名称"
                                     prop="name">
                    </el-table-column>
                    <el-table-column label="描述"
                                     prop="desc">
                    </el-table-column>
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
import Pagination from "@/components/Pagination";
export default {
    name: "zdmb",
    components: { changeModuleSelect, Pagination },
    data () {
        return {
            modalnum: null,//模板编号，非模板页面可删
            theight: 0,//表格高度
            isSingle: true,//表格是否单选 点击各按钮根据流程逻辑控制单多选
            currentSelectedRow: null,//当前选中的行
            selectedRows: null,//多选时选中的所有行
            tableData: null,
            tableDataInner: [],
            total: 0,
            listQuery: {
                currentPage: 0,
                pageSize: 15,
            }
        }
    },
    created () { },
    mounted () {
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
            this.tableData = [{
                id: '0',
                name: '第一张专辑',
                category: '专辑',
                desc: '第一张创作专辑',
                address: '相信音乐',
                shop: '相信音乐国际股份有限公司'
            }, {
                id: '1',
                name: '第二张专辑',
                category: '专辑',
                desc: '爱情万岁',
                address: '相信音乐',
                shop: '相信音乐国际股份有限公司'
            }, {
                id: '2',
                name: '第三张专辑',
                category: '专辑',
                desc: '人生海海',
                address: '相信音乐',
                shop: '相信音乐国际股份有限公司'
            }, {
                id: '3',
                name: '第四张专辑',
                category: '专辑',
                desc: '时光机',
                address: '相信音乐',
                shop: '相信音乐国际股份有限公司'
            }, {
                id: '4',
                name: '第五张专辑',
                category: '专辑',
                desc: '神的孩子都在跳舞',
                address: '相信音乐',
                shop: '相信音乐国际股份有限公司'
            }
            ]
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
            if (this.isSingle) {
                this.$refs.tb.clearSelection(); //清除其他行的选中
            }
            this.$refs.tb.toggleRowSelection(val, "selected"); //单击行绑定点击事件
        },
        expandChange (row, expanded) {
            console.log(row, expanded);
            this.tableDataInner[row.id] = [{
                id: '1',
                name: '陈信宏',
                category: 'mayday',
                desc: '到前面来' + row.id,
                address: '福建省泉州市',
                shop: '相信音乐' + row.id,
                shopId: '1'
            }, {
                id: '2',
                name: '温尚翊',
                category: 'mayday',
                desc: '到前面来' + row.id,
                address: '台湾省台北市',
                shop: '相信音乐' + row.id,
                shopId: '2'
            }];
        }
    }
};
</script>


    