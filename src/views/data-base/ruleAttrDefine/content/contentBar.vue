<template>
    <div>
        <el-row>
            <el-col class="left_content"
                    :span="12">
                <div class="filter-container">
                    <div class="filter-items">
                        <el-select class="filter-item"
                                   filterable
                                   size="small"
                                   v-model="listQuery.ruleType"
                                   :placeholder="$t('ruleAttrDefine.ruleType')"
                                   clearable
                                   @keyup.enter.native="getList">
                            <el-option v-for="item in dt_rules_type"
                                       :key="item.dictItemKey"
                                       :label="item.dictItemValue"
                                       :value="item.dictItemKey">
                            </el-option>
                        </el-select>
                        <el-button size="small"
                                   class="filter-item"
                                   type="primary"
                                   icon="el-icon-search"
                                   @click="handleQuery">{{$t('table.query')}}</el-button>
                    </div>
                </div>
                <hr class="hrLineStyle">
                <div class="table-container">
                    <el-table :data="list"
                              border
                              fit
                              :key="tableKey[0]"
                              :height="theight"
                              highlight-current-row
                              style="width: 100%;"
                              ref="tbmain"
                              @selection-change='selectRow'
                              size="mini"
                              cell-class-name="table-cell"
                              header-cell-class-name="header-cell">
                        <el-table-column type="selection"
                                         fixed
                                         width="30"
                                         align="center"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         align="left"
                                         :label="$t('ruleAttrDefine.ruleType')"
                                         prop="ruleType"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         align="left"
                                         :label="$t('ruleAttrDefine.totalNum')"
                                         prop="totalNum"></el-table-column>
                    </el-table>
                    <pagination :total="total"
                                :page.sync="listQuery.currentPage"
                                :layout="'total, prev, pager, next'"
                                :limit.sync="listQuery.pageSize"
                                @pagination="getList"
                                class="pagination-container" />
                </div>
            </el-col>

            <el-col class="right_content"
                    :span="12">
                <div class="table-container">
                    <div class="filter-container">
                        <div class="filter-items">
                            <el-input size="small"
                                      :placeholder="$t('ruleAttrDefine.rulePrepCode')"
                                      v-model="listQueryDetail.rulePrepCode"
                                      class="filter-item" />
                            <el-input size="small"
                                      :placeholder="$t('ruleAttrDefine.rulePrepName')"
                                      v-model="listQueryDetail.rulePrepName"
                                      class="filter-item" />
                            <el-button class="filter-item"
                                       size="small"
                                       type="primary"
                                       @click="handleAdd"
                                       icon="el-icon-plus">{{$t('table.add')}}</el-button>
                            <el-button class="filter-item"
                                       size="small"
                                       type="primary"
                                       @click="handleDelete"
                                       icon="el-icon-delete">{{$t('table.delete')}}</el-button>
                        </div>
                    </div>
                    <hr class="hrLineStyle">
                    <el-table :data="listDetail"
                              border
                              :key="tableKey[1]"
                              fit
                              :height="stheight"
                              highlight-current-row
                              style="width: 100%;"
                              @selection-change='selectRowDetail'
                              size="mini"
                              cell-class-name="table-cell"
                              header-cell-class-name="header-cell"
                              ref='tbdetail'>
                        <el-table-column type="selection"
                                         fixed
                                         width="30"
                                         align="center"></el-table-column>
                        <!-- <el-table-column show-overflow-tooltip align="left" :label="'序号'" prop="rowId"></el-table-column> -->
                        <el-table-column show-overflow-tooltip
                                         align="left"
                                         :label="$t('ruleAttrDefine.rulePrepCode')"
                                         prop="rulePrepCode"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         align="left"
                                         :label="$t('ruleAttrDefine.rulePrepName')"
                                         prop="rulePrepName"></el-table-column>
                    </el-table>
                </div>
            </el-col>
        </el-row>

    </div>
</template>


<script>
import { queryBarRecords, queryBarRecordsDetail, addBarRecords, deleteBarRecords } from "@/api/data-base/ruleAttrDefine";
import Pagination from "@/components/Pagination";
import { mapState } from 'vuex';

export default {
    name: "contentBatch",
    components: { Pagination },
    data () {
        return {
            list: [],
            listDetail: [],
            total: 0,
            tableKey: [0, 1],//表格索引，虚拟dom渲染表格时使用
            theight: 0,
            stheight: 0,//右子表高度
            totalDetail: 0,
            selectRowsDetail: [],
            selectRows: [],
            listQuery: {
                page: true,
                currentPage: 1,
                pageSize: 10
            },
            listQueryDetail: {
                rulePrepCode: "",
                rulePrepName: "",
                page: true,
                currentPage: 1,
                pageSize: 10
            },
            rules: {

            }
        };
    },
    computed: {
        ...mapState({
            dt_rules_type: state => state.dict.dt_rules_type
        })
    },
    mounted () {
        this.$store.dispatch('dict/getDicData', ['dt_rules_type']);
        this.setTableHeight();
        //表格高度自适应
        window.onresize = () => {
            this.setTableHeight()
        };
        this.getList();
    },
    methods: {
        //显示主表
        getList () {
            queryBarRecords(this.listQuery).then(res => {
                this.list = res.data.list;
                this.total = res.data.pages.count;
            });
        },
        //表格高度计算
        setTableHeight () {
            this.theight = this.$myFun.getSingleTbHeight() - 35;
            this.stheight = this.theight + 43;
        },
        getListDetail () {
            if (this.selectRows) {
                queryBarRecordsDetail(this.selectRows.ruleType, this.listQueryDetail).then(res => {
                    this.listDetail = res.data;
                });
            }
        },
        //查询
        handleQuery () {
            this.listQuery.currentPage = 1;
            this.getList();
        },
        //每页大小变化
        handleSizeChange (val) {
            this.listQuery.pageSize = val;
            this.getList();
        },
        //当前页变化
        handleCurrentChange (val) {
            this.listQuery.currentPage = val;
            this.getList();
        },
        //主表勾选框选中
        selectRow (val) {
            this.selectRows = val[val.length - 1];
            if (val.length > 1) {
                this.$refs.tbmain.clearSelection()
                this.$refs.tbmain.toggleRowSelection(val[val.length - 1], 'selected')
            }
            this.getListDetail();
        },
        selectRowDetail (val) {
            this.selectRowsDetail = val[val.length - 1];
            if (val.length > 1) {
                this.$refs.tbdetail.clearSelection()
                this.$refs.tbdetail.toggleRowSelection(val[val.length - 1], 'selected')
            }
        },
        handleDelete () {
            if (this.selectRows.ruleType && this.selectRowsDetail.rulePrepCode) {
                deleteBarRecords(this.selectRows.ruleType, this.selectRowsDetail.rulePrepCode).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    });
                    this.selectRowsDetail = [];
                    this.getListDetail();
                });
            } else {
                this.$message.warning(this.$t('message.checkedplease'));
            }
        },
        handleAdd () {
            if (this.selectRows.ruleType) {
                let addData = Object.assign({}, this.listQueryDetail);
                delete addData.pageSize;
                delete addData.page;
                delete addData.currentPage;
                addBarRecords(this.selectRows.ruleType, addData).then(() => {
                    this.$message({
                        type: 'success',
                        message: '新增成功'
                    });
                    this.selectRowsDetail = [];
                    this.getListDetail();
                });
            } else {
                this.$message.warning(this.$t('message.checkedplease'));
            }
        },
    }
}
</script>

<style scoped>
.contentStyle {
    margin: 0 5px;
    height: 420px;
    background-color: #fff;
}
</style>
