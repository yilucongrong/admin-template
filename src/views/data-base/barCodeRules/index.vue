<template>
    <div>
        <div class="app-container">
            <div class="filter-container">
                <div class="filter-items">
                    <el-input size="small"
                              :placeholder="$t('barCodeRules.rowId')"
                              v-model="listMainQuery.rowId"
                              class="filter-item"
                              @keyup.enter.native="handleQuery" />
                    <el-input size="small"
                              :placeholder="$t('barCodeRules.ruleDescribe')"
                              v-model="listMainQuery.ruleDescribe"
                              class="filter-item"
                              @keyup.enter.native="handleQuery" />
                    <el-select size="small"
                               v-model="listMainQuery.ruleType"
                               :placeholder="$t('barCodeRules.ruleType')"
                               clearable>
                        <el-option v-for="item in dt_rules_type"
                                   :key="item.dictItemKey"
                                   :label="item.dictItemValue"
                                   :value="item.dictItemKey">
                        </el-option>
                    </el-select>
                    <AuthoType :selectType="1"
                               :placeholder="$t('barCodeRules.arrivalCompany')"
                               v-model="listMainQuery.arrivalCompany"></AuthoType>

                    <el-button class="filter-item"
                               type="primary"
                               size="small"
                               icon="el-icon-search"
                               @click="handleQuery">{{ $t('table.search') }}</el-button>
                </div>
            </div>
            <div class="table-container">
                <div class="oprate_btn">
                    <el-button class="filter-item"
                               size="small"
                               type="primary"
                               @click="addMain"
                               icon="el-icon-plus">{{ $t('table.add') }}</el-button>
                    <el-button class="filter-item"
                               size="small"
                               type="primary"
                               @click="updateMain"
                               icon="el-icon-edit">{{ $t('table.edit') }}</el-button>
                    <el-button class="filter-item"
                               size="small"
                               type="primary"
                               @click="deleteMain"
                               icon="el-icon-delete">{{ $t('table.delete') }}</el-button>
                </div>
                <el-table :data="listMain"
                          :key="tableKey"
                          border
                          fit
                          :height="theight"
                          highlight-current-row
                          style="width: 100%;"
                          @selection-change="mainSelectChange"
                          size="mini"
                          cell-class-name="table-cell"
                          header-cell-class-name="header-cell">
                    <el-table-column type="selection"
                                     fixed
                                     width="30"
                                     align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     fixed
                                     align="left"
                                     :label="$t('barCodeRules.rowId')"
                                     prop="rowId"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     fixed
                                     align="left"
                                     :label="$t('barCodeRules.ruleType')"
                                     prop="ruleTypeName"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     align="left"
                                     :label="$t('barCodeRules.ruleDescribe')"
                                     prop="ruleDescribe"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     align="left"
                                     :label="$t('barCodeRules.ruleContent')"
                                     prop="ruleContent"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     align="left"
                                     :label="$t('barCodeRules.arrivalCompany')"
                                     prop="arrivalCompany"></el-table-column>
                </el-table>
                <pagination :total="total"
                            :page.sync="listMainQuery.currentPage"
                            :limit.sync="listMainQuery.pageSize"
                            @pagination="getMainList"
                            class="pagination-container" />
            </div>
            <!-- 弹框 -->
            <div>
                <!-- 主表新增弹框 -->
                <dialogAddMain @refreshTable="getMainList"
                               ref="addMainDialog"></dialogAddMain>
            </div>
        </div>
    </div>
</template>

<script>
import * as api from '@/api/data-base/bar_code_rules'
import Pagination from '@/components/Pagination'
import AuthoType from '@/components/Select/AuthoType.vue' //权限类型下拉组件
import { DICT_CODE } from '@/utils/constant'
import dialogAddMain from './dialog/dialogAddMain'
import { mapState } from 'vuex'

export default {
    name: 'barCodeRules',
    components: { Pagination, dialogAddMain, AuthoType },
    data () {
        return {
            total: 0,
            listMain: [],
            theight: 0, //表格高度
            tableKey: 0, //表格索引
            listMainQuery: {
                rowId: '',
                ruleDescribe: '',
                ruleType: '',
                arrivalCompany: null,
                currentPage: 0,
                pageSize: 15
            },
            editQuery: {
                barcodeRuleId: '',
                currentPage: 0,
                pageSize: 10
            },
            selectMainRow: '',
            DICT_CODE: DICT_CODE
        }
    },
    computed: {
        ...mapState({
            dt_rules_type: state => state.dict.dt_rules_type
        })
    },
    mounted () {
        this.$store.dispatch('dict/getDicData', ['dt_rules_type'])
        this.setTableHeight()
        //表格高度自适应
        window.onresize = () => {
            this.setTableHeight()
        }
        this.getMainList()
    },
    methods: {
        //查询
        handleQuery () {
            this.getMainList()
        },
        //获取主表数据
        getMainList () {
            api.queryRecords(this.listMainQuery).then(res => {
                this.listMain = res.data.list
                this.total = res.data.pages.count
            })
        },
        //表格高度计算
        setTableHeight () {
            this.theight = this.$myFun.getSingleTbHeight()
        },
        //主表行选择变化
        mainSelectChange (val) {
            this.selectMainRow = val
        },
        //主表新增
        addMain () {
            this.$nextTick(() => {
                this.resetAddData()
                this.$refs.addMainDialog.dialogFormVisible = true
                this.$refs.addMainDialog.dialogStatus = 0
            })
        },
        //清空表单
        resetAddData () {
            this.$refs.addMainDialog.AddMainlist = {
                ruleDescribe: '',
                ruleType: '',
                barcodeRuleDetails: [] //所有的内容
            }
            this.$refs.addMainDialog.lastBarcodeRuleDetails = []
            this.$refs.addMainDialog.barcodeRuleDetails = []
            this.$refs.addMainDialog.rowId = ''
        },
        //主表修改
        updateMain () {
            if (this.selectMainRow && this.selectMainRow.length == 1) {
                this.editQuery.barcodeRuleId = this.selectMainRow[0].rowId
                api.getRowDetail(this.editQuery).then(res => {
                    this.$refs.addMainDialog.dialogStatus = 1
                    this.$refs.addMainDialog.AddMainlist = this.selectMainRow[0]
                    this.$refs.addMainDialog.lastBarcodeRuleDetails =
                        res.data.list
                    this.$refs.addMainDialog.barcodeRuleDetails = res.data.list
                    this.$refs.addMainDialog.rowId = this.selectMainRow[0].rowId
                    this.$refs.addMainDialog.dialogFormVisible = true
                })
            } else {
                this.$message({
                    title: '警告',
                    message: '请选择一条信息',
                    type: 'warning'
                })
            }
        },
        //主表删除
        deleteMain () {
            if (this.selectMainRow.length === 1) {
                this.$confirm('确认要删除该条码规则吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        api.deleteRules(
                            this.selectMainRow[0].rowId,
                            this.selectMainRow[0].ruleType
                        ).then(() => {
                            this.getMainList()
                            this.$message({
                                type: 'success',
                                message: '删除成功'
                            })
                        })
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        })
                    })
            } else {
                this.$message.warning('请勾选一条记录！')
                return
            }
        }
    }
}
</script>
