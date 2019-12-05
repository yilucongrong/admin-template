<template>
    <div>
        <el-row>
            <el-col class="left_content"
                    :span="12">
                <div class="filter-container">
                    <div class="filter-items">
                        <el-select filterable
                                   size="small"
                                   v-model="listQuery.referentType"
                                   :placeholder="$t('ruleAttrDefine.referentType')"
                                   clearable>
                            <el-option v-for="item in dt_referdata_resource"
                                       :key="item.dictItemKey"
                                       :label="item.dictItemValue"
                                       :value="item.dictItemKey">
                            </el-option>
                        </el-select>
                        <el-input size="small"
                                  :placeholder="$t('ruleAttrDefine.referentObject')"
                                  v-model="listQuery.referentObject"
                                  class="filter-item" />
                        <el-input size="small"
                                  :placeholder="$t('ruleAttrDefine.remark')"
                                  v-model="listQuery.remark"
                                  class="filter-item" />
                        <el-select filterable
                                   size="small"
                                   v-model="listQuery.objectType"
                                   :placeholder="$t('ruleAttrDefine.objectType')"
                                   clearable>
                            <el-option key=1
                                       label="主体"
                                       value=1></el-option>
                            <el-option key=2
                                       label="明细"
                                       value=2></el-option>
                        </el-select>
                        <el-button size="small"
                                   class="filter-item"
                                   type="primary"
                                   icon="el-icon-search"
                                   @click="handleQueryMain">{{$t('table.query')}}</el-button>
                    </div>
                </div>

                <div class="table-container">
                    <div class="oprate_btn">
                        <el-button class="filter-item"
                                   size="small"
                                   type="primary"
                                   @click="handleAddMain"
                                   icon="el-icon-plus">{{$t('table.add')}}</el-button>
                        <el-button class="filter-item"
                                   size="small"
                                   type="primary"
                                   @click="handleDeleteMain"
                                   icon="el-icon-delete">{{$t('table.delete')}}</el-button>
                    </div>

                    <el-table :data="list"
                              border
                              :key="tableKey[0]"
                              :height="theight"
                              fit
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
                                         :label="$t('ruleAttrDefine.referentTypeName')"
                                         prop="referentTypeName">
                            <template slot-scope="{row}">
                                {{row.referentTypeName?row.referentTypeName:row.referentType}}
                            </template>
                        </el-table-column>
                        <el-table-column show-overflow-tooltip
                                         align="left"
                                         :label="$t('ruleAttrDefine.referentObject')"
                                         prop="referentObject"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         align="left"
                                         :label="$t('ruleAttrDefine.objectType')"
                                         prop="objectType">
                            <template slot-scope="{row}">
                                {{row.objectType==1?'主体':'明细'}}
                            </template>
                        </el-table-column>
                        <el-table-column show-overflow-tooltip
                                         align="left"
                                         :label="$t('ruleAttrDefine.remark')"
                                         prop="remark"></el-table-column>
                    </el-table>
                    <pagination :total="total"
                                :page.sync="listQuery.currentPage"
                                :limit.sync="listQuery.pageSize"
                                @pagination="getList"
                                class="pagination-container" />
                </div>
            </el-col>

            <el-col class="right_content"
                    :span="12">
                <div class="filter-container">
                    <div class="filter-items">
                        <el-input size="small"
                                  :placeholder="$t('ruleAttrDefine.attributeCode')"
                                  v-model="listQueryDetail.attributeCode"
                                  class="filter-item" />
                        <el-input size="small"
                                  :placeholder="$t('ruleAttrDefine.attributeName')"
                                  v-model="listQueryDetail.attributeName"
                                  class="filter-item" />
                    </div>
                </div>
                <div class="table-container">
                    <div class="oprate_btn">
                        <el-button class="filter-item"
                                   type="primary"
                                   size="small"
                                   icon="el-icon-search"
                                   @click="handleAdd">{{$t('table.add')}}</el-button>
                        <el-button class="filter-item"
                                   size="small"
                                   type="primary"
                                   @click="handleDelete"
                                   icon="el-icon-delete">{{$t('table.delete')}}</el-button>
                    </div>
                    <el-table :data="listDetail"
                              :key="tableKey[1]"
                              :height="stheight"
                              border
                              fit
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
                        <el-table-column show-overflow-tooltip
                                         align="left"
                                         :label="$t('ruleAttrDefine.rowId')"
                                         prop="rowId"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         align="left"
                                         :label="$t('ruleAttrDefine.attributeCode')"
                                         prop="attributeCode"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         align="left"
                                         :label="$t('ruleAttrDefine.attributeName')"
                                         prop="attributeName"></el-table-column>
                    </el-table>
                    <pagination :total="totalDetail"
                                :page.sync="listQueryDetail.currentPage"
                                :limit.sync="listQueryDetail.pageSize"
                                @pagination="getListDetail"
                                class="pagination-container" />
                </div>
            </el-col>
        </el-row>

    </div>
</template>

<script>
import { queryRecords, queryRecordsDetail, addMainRecords, deleteMainRecords } from "@/api/data-base/ruleAttrDefine";
import Pagination from "@/components/Pagination";
import { mapState } from 'vuex';

export default {
    name: "contentBatch",
    components: { Pagination },
    data () {
        return {
            list: [],
            addList: {},
            listDetail: [],
            theight: 0,
            stheight: 0,//右子表高度
            tableKey: [0, 1],//表格索引，虚拟dom渲染表格时使用
            total: 0,
            totalDetail: 0,
            selectRowsDetail: [],
            selectRows: null,
            parentId: null,
            listQuery: {
                currentPage: 0,
                pageSize: 10,
                referentType: '',
                referentObject: '',
                remark: '',
                objectType: ''
            },
            listQueryDetail: {
                rowId: null,
                attributeCode: '',
                attributeName: '',
                currentPage: 0,
                pageSize: 10,
            }
        };
    },
    computed: {
        ...mapState({
            dt_referdata_resource: state => state.dict.dt_referdata_resource,
        })
    },
    mounted () {
        this.$store.dispatch('dict/getDicData', ['dt_referdata_resource']);
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
            queryRecords(this.listQuery).then(res => {
                this.total = res.data.pages.count;
                this.list = res.data.list;
            });
        },
        //表格高度计算
        setTableHeight () {
            this.theight = this.$myFun.getSingleTbHeight() - 120;
            this.stheight = this.theight + 40;
        },
        getListDetail () {
            if (this.selectRows) {
                this.listQueryDetail.rowId = this.selectRows.rowId;
                queryRecordsDetail(this.listQueryDetail).then(res => {
                    this.totalDetail = res.data.pages.count;
                    this.listDetail = res.data.list;
                });
            }
        },
        handleQueryMain () {
            this.listQuery.currentPage = 0;
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
                this.$refs.tbmain.toggleRowSelection(val[val.length - 1], 'selected');
            }
            this.getListDetail();
        },
        selectRowDetail (val) {
            this.selectRowsDetail = val;
        },
        handleDelete () {
            if (this.selectRows.rowId) {
                if (this.selectRowsDetail.length) {
                    let rowIds = new Array();
                    for (let i = 0; i < this.selectRowsDetail.length; i++) {
                        rowIds.push(this.selectRowsDetail[i].rowId);
                    }
                    deleteMainRecords(this.selectRows.rowId, rowIds).then(() => {
                        this.$message({
                            type: 'success',
                            message: '已删除'
                        });
                        this.getListDetail();
                    })
                } else {
                    this.$message.warning(this.$t('message.checkedplease'));
                }

            } else {
                this.$message.warning('请先选择左表数据');
            }
        },
        //添加明细
        handleAdd () {
            if (this.selectRows) {
                if (this.listQueryDetail.attributeCode && this.listQueryDetail.attributeName) {
                    this.addList = Object.assign({}, this.selectRows);
                    this.addList.referentDataItems = new Array();
                    let delist = Object.assign({}, this.listQueryDetail);
                    delist.parentRowId = this.selectRows.rowId;
                    this.addList.referentDataItems.push(delist);
                    delete this.addList.referentDataItems.pageSize;
                    delete this.addList.referentDataItems.currentPage;
                    delete this.addList.referentDataItems.rowId;

                    addMainRecords(this.addList).then(() => {
                        this.$message({
                            type: 'success',
                            message: '添加成功'
                        });
                        this.listQueryDetail = {
                            rowId: this.selectRows.rowId,
                            attributeCode: '',
                            attributeName: '',
                            currentPage: 0,
                            pageSize: 10,
                        };
                        this.getListDetail();
                    });
                } else {
                    this.$message.warning(this.$t('请先填写属性码和属性名称'));
                }
            } else {
                this.$message.warning(this.$t('请先选择一条规则属性'));
            }
        },
        //左表新增
        handleAddMain () {
            this.addList = Object.assign({}, this.listQuery);
            delete this.addList.currentPage;
            delete this.addList.pageSize;
            if (this.addList.objectType && this.addList.referentObject && this.addList.referentType) {
                addMainRecords(this.addList).then(() => {
                    this.$message({
                        type: 'success',
                        message: '添加成功'
                    });
                    this.listQuery = {
                        currentPage: 0,
                        pageSize: 10,
                        referentType: '',
                        referentObject: '',
                        remark: '',
                        objectType: ''
                    };
                    this.listDetail = [];
                    this.getList();
                });
            } else {
                this.$message.warning(this.$t('请将条件填写完整'));
            }
        },
        handleDeleteMain () {
            if (this.selectRows.rowId) {
                let rowIds = '';
                deleteMainRecords(this.selectRows.rowId, rowIds).then(() => {
                    this.$message({
                        type: 'success',
                        message: '已删除'
                    });
                    this.listDetail = [];
                    this.getList();
                })
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
