//会计周期
<template>
    <div>
        <div class="app-container">
            <div class="filter-container">
                <div class="filter-item">
                    <el-date-picker v-model="listQuery_a.accountingYear"
                                    size="small"
                                    value-format="yyyy"
                                    type="year"
                                    placeholder="选择年"></el-date-picker>
                    <el-button type="primary"
                               size="small"
                               icon="el-icon-search"
                               @click="getList_a">{{ $t('table.search') }}</el-button>
                </div>
            </div>
            <div class="table-container">
                <div class="oprate_btn">
                    <el-button size="small"
                               class="filter-item"
                               type="primary"
                               icon="el-icon-circle-plus-outline"
                               @click="createAccounting">{{$t('btn.generate')}}</el-button>
                    <el-button size="small"
                               class="filter-item"
                               type="primary"
                               icon="el-icon-plus"
                               @click="addAccounting">{{$t('btn.add')}}</el-button>
                    <el-button size="small"
                               class="filter-item"
                               type="primary"
                               icon="el-icon-edit"
                               @click="updataAccounting">{{$t('btn.edit')}}</el-button>
                    <el-button size="small"
                               class="filter-item"
                               type="primary"
                               icon="el-icon-delete"
                               @click="deleteAccounting">{{$t('btn.delete')}}</el-button>
                    <el-button size="small"
                               class="filter-item"
                               type="primary"
                               icon="el-icon-open"
                               @click="openAccounting">{{$t('btn.open')}}</el-button>
                    <el-button size="small"
                               class="filter-item"
                               type="primary"
                               icon="el-icon-turn-off "
                               @click="closeAccounting">{{$t('btn.close')}}</el-button>
                    <el-button size="small"
                               class="filter-item"
                               type="primary"
                               icon="el-icon-turn-off "
                               @click="handleCarry">{{$t('btn.kjzqjz')}}</el-button>
                </div>
                <el-table :data="list_a"
                          border
                          fit
                          @selection-change='selectRow_a'
                          highlight-current-row
                          :key="tableKey"
                          :height="theight"
                          width='100%'
                          size="mini"
                          cell-class-name="table-cell"
                          header-cell-class-name="header-cell"
                          @row-click="clickRow_a"
                          ref="dt_a">
                    <el-table-column type="selection"
                                     width="30"
                                     fixed></el-table-column>
                    <el-table-column width="80px"
                                     show-overflow-tooltip
                                     :label="$t('accountingCycle.rowId')"
                                     prop="rowId"></el-table-column>
                    <el-table-column width="100px"
                                     show-overflow-tooltip
                                     :label="$t('accountingCycle.accountingYear')"
                                     prop="accountingYear"></el-table-column>
                    <el-table-column width="100px"
                                     show-overflow-tooltip
                                     :label="$t('accountingCycle.accountingYears')"
                                     prop="accountingYears"></el-table-column>
                    <el-table-column width="100px"
                                     show-overflow-tooltip
                                     :label="$t('accountingCycle.beginDate')"
                                     prop="beginDate">
                    </el-table-column>
                    <el-table-column width="100px"
                                     show-overflow-tooltip
                                     :label="$t('accountingCycle.endDate')"
                                     prop="endDate">
                    </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     :label="$t('accountingCycle.stateName')"
                                     prop="stateName"></el-table-column>
                </el-table>
                <pagination :total="total_a"
                            :page.sync="listQuery_a.currentPage"
                            :limit.sync="listQuery_a.pageSize"
                            @pagination="getList_a" />
            </div>
            <!-- 会计周期生成 -->
            <el-dialog custom-class="dialog-custom"
                       width="400px"
                       class="spacing"
                       title="会计周期生成"
                       :visible.sync="creatDialogFormVisible"
                       v-dialogDrag
                       :close-on-click-modal="false">
                <el-form class="small-space"
                         size="mini"
                         ref="dataForm"
                         :inline="true"
                         :model="temp"
                         label-width="120px">
                    <el-form-item :label="$t('accountingCycle.accountingYear')"
                                  prop="accountingYear">
                        <el-date-picker v-model="temp.accountingYear"
                                        value-format="yyyy"
                                        type="year"
                                        placeholder="选择年"></el-date-picker>
                    </el-form-item>
                    <el-form-item :label="$t('accountingCycle.createType')"
                                  prop="createType">
                        <el-select size="mini"
                                   v-model="temp.createType"
                                   :placeholder="$t('table.select')">
                            <el-option v-for="item in dt_time_type"
                                       :key="item.dictItemKey"
                                       :label="item.dictItemValue"
                                       :value="item.dictItemKey">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('accountingCycle.beginNo')">
                        <el-input v-model="temp.beginNo"
                                  type="number"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('accountingCycle.endNo')">
                        <el-input v-model="temp.endNo"
                                  type="number"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer"
                      class="dialog-footer">
                    <el-button @click="creatDialogFormVisible = false">取 消</el-button>
                    <el-button type="primary"
                               @click="creatConfirm">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 会计周期新增 -->
            <el-dialog custom-class="dialog-custom"
                       class="spacing"
                       :title="dialogStatus=='create'?'会计周期新增':'会计周期修改'"
                       :visible.sync="addDialogFormVisible"
                       v-dialogDrag
                       :close-on-click-modal="false">
                <el-form class="small-space"
                         size="mini"
                         ref="dataForm"
                         :inline="true"
                         :rules="rules"
                         :model="temp"
                         label-width="120px">
                    <el-form-item :label="$t('accountingCycle.kjzq')"
                                  prop="accountingYears">
                        <el-date-picker v-model="temp.accountingYears"
                                        value-format="yyyyMM"
                                        type="month"
                                        placeholder="选择年月"
                                        :disabled="disabled"></el-date-picker>
                    </el-form-item>
                    <el-form-item :label="$t('accountingCycle.times')">
                        <el-date-picker v-model="temp.times"
                                        type="daterange"
                                        value-format="yyyy-MM-dd"
                                        range-separator="-"
                                        :start-placeholder="$t('accountingCycle.beginNo')"
                                        :end-placeholder="$t('accountingCycle.endNo')"></el-date-picker>
                    </el-form-item>
                </el-form>
                <span slot="footer"
                      class="dialog-footer">
                    <el-button @click="addDialogFormVisible = false">取 消</el-button>
                    <el-button type="primary"
                               @click="dialogStatus==='create'?addConfirm():editConfirm()">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import * as api from '@/api/data-base/accountingCycle.js'
import Pagination from '@/components/Pagination' // 分页组件
import { mapState } from 'vuex';
export default {
    name: "accountingCycle",
    components: { Pagination },
    data () {
        return {
            listQuery_a: {
                currentPage: 1,
                pageSize: 15,
            },
            disabled: false,
            total_a: 0,
            theight: 0,//表格高度
            tableKey: 0,//表格索引
            list_a: [],
            addDialogFormVisible: false,
            creatDialogFormVisible: false,
            dialogStatus: '',
            temp: {
                times: []
            },
            rules: {},
        }
    },
    computed: {
        ...mapState({
            dt_time_type: state => state.dict.dt_time_type,
        }),
    },
    mounted () {
        this.$store.dispatch('dict/getDicData', ['dt_time_type']);
        this.setTableHeight();
        //表格高度自适应
        window.onresize = () => {
            this.setTableHeight()
        };
    },
    created () {
        this.getList_a()
    },
    methods: {
        getList_a () {//会计周期主表
            api.getData_a(this.listQuery_a).then(res => {
                this.list_a = res.data.list
                this.total_a = res.data.pages.count
            })
        },
        //表格高度计算
        setTableHeight () {
            this.theight = this.$myFun.getSingleTbHeight();
        },
        resetTemp () {
            this.temp = {
            }
        },
        createAccounting () {//生成会计周期
            this.creatDialogFormVisible = true
            this.resetTemp()
        },
        creatConfirm () {//生成会计周期确认
            let dto = {
                accountingBatchDTO: {
                    accountingYear: this.temp.accountingYear,
                    createType: this.temp.createType,
                    beginNo: parseInt(this.temp.beginNo),
                    endNo: parseInt(this.temp.endNo),
                },
                method: 'batch'
            }
            api.creatData_a(dto).then(() => {
                this.$message({
                    title: '成功',
                    message: '生成成功',
                    type: 'success'
                })
                this.creatDialogFormVisible = false
                this.getList_a()
            })
        },
        addAccounting () {//新增会计周期
            this.dialogStatus = 'create'
            this.disabled = false
            this.resetTemp()
            this.addDialogFormVisible = true
        },
        addConfirm () {//新增会计周期确认method
            let dto = {
                accountingSingleDTO: {
                    accountingYears: this.temp.accountingYears,
                    beginDate: this.temp.times[0],
                    endDate: this.temp.times[1],
                },
                method: 'one'
            }
            api.creatData_a(dto).then(() => {
                this.$message({
                    title: '成功',
                    message: '新增成功',
                    type: 'success'
                })
                this.addDialogFormVisible = false
                this.getList_a()
            })
        },
        updataAccounting () {//修改会计周期
            if (this.selectlistRow_a) {
                this.dialogStatus = 'edit'
                this.disabled = true
                this.addDialogFormVisible = true
                this.temp = this.selectlistRow_a
                this.temp.times = [this.selectlistRow_a.beginDate, this.selectlistRow_a.endDate]

            } else {
                this.$message({
                    title: '警告',
                    message: '请选择一条信息',
                    type: 'warning'
                })
            }

        },
        editConfirm () {//修改会计周期确认
            let dto = {
                accountingYears: this.temp.accountingYears,
                beginDate: this.temp.times[0],
                endDate: this.temp.times[1],
            }
            api.upData_a(dto).then(() => {
                this.$message({
                    title: '成功',
                    message: '修改成功',
                    type: 'success'
                })
                this.addDialogFormVisible = false
                this.getList_a()
            })
        },
        deleteAccounting () {//删除会计周期
            let AccountingList = [this.selectlistRow_a.rowId]
            api.deleteData_a(AccountingList).then(() => {
                this.$message({
                    title: '成功',
                    message: '删除成功',
                    type: 'success'
                })
                this.getList_a()

            })
        },
        openAccounting () {//开启会计周期
            if (this.selectlistRow_a && this.selectlistRow_a.stateName !== '开启') {//0开启，1关闭
                let dto = {
                    method: 'open',
                    rowId: this.selectlistRow_a.rowId
                }
                api.changeData_a(dto).then(() => {
                    this.$message({
                        title: '成功',
                        message: '开启成功',
                        type: 'success'
                    })
                    this.getList_a()
                })
            } else {
                this.$message({
                    title: '警告',
                    message: '请选择一条关闭信息',
                    type: 'warning'
                })
            }
        },
        closeAccounting () {//关闭会计周期
            if (this.selectlistRow_a && this.selectlistRow_a.stateName !== '关闭') {//0开启，1关闭
                let dto = {
                    method: 'close',
                    rowId: this.selectlistRow_a.rowId
                }
                api.changeData_a(dto).then(() => {
                    this.$message({
                        title: '成功',
                        message: '关闭成功',
                        type: 'success'
                    })
                    this.getList_a()
                })
            } else {
                this.$message({
                    title: '警告',
                    message: '请选择一条开启信息',
                    type: 'warning'
                })
            }
        },
        handleCarry () {
            if (this.selectlistRow_a && this.selectlistRow_a.stateName !== '关闭' && this.selectlistRow_a.stateName !== '未开启') {
                api.Carry(this.selectlistRow_a.accountingYears).then(() => {
                    this.$message({
                        title: '成功',
                        message: '结转成功',
                        type: 'success'
                    })
                    this.getList_a()
                })
            } else {
                this.$message({
                    title: '警告',
                    message: '请选择一条开启信息',
                    type: 'warning'
                })
            }
        },
        selectRow_a (val) {//会计周期主表选中
            this.selectlistRow_a = val[val.length - 1]
            if (val.length > 1) {
                this.$refs.dt_a.clearSelection()//清除其他行的选中
                this.$refs.dt_a.toggleRowSelection(val[val.length - 1], 'selected')//单击行绑定点击事件
            }
            this.$refs.dt_a.setCurrentRow(this.selectlistRow_a);
        },
        clickRow_a (val) {//会计周期主表行点击
            this.selectlistRow_a = val
            this.$refs.dt_a.clearSelection()//清除其他行的选中
            this.$refs.dt_a.toggleRowSelection(val)//单击行绑定点击事件
        }
    },
}
</script>

<style scoped>
.table-container .spacing .el-dialog .dialog-custom {
    width: 350px;
}
</style>