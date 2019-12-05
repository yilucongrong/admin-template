//客户选择
<template>
    <div class="tab_container">
        <el-tabs v-model="activeName"
                 type="card">
            <el-tab-pane :label="$t('table.tbSelected')"
                         name="first">
                <div class="filter-container border_b_1">
                    <div class="filter-items">
                        <el-input size="small"
                                  :placeholder="$t('customer.customerCode')"
                                  v-model="listQuery1.customerCode"
                                  class="filter-item"
                                  @keyup.enter.native="handleQuery" />
                        <el-input size="small"
                                  :placeholder="$t('customer.customerName')"
                                  v-model="listQuery1.customerName"
                                  class="filter-item"
                                  @keyup.enter.native="handleQuery" />
                        <el-button type="primary"
                                   size="small"
                                   icon="el-icon-search"
                                   @click="handleFilter1">{{ $t('btn.search') }}</el-button>
                    </div>
                </div>

                <div class="table-container">
                    <el-table :data="list1"
                              ref="tbselect"
                              border
                              fit
                              highlight-current-row
                              style="width: 100%;"
                              @selection-change="selectChange"
                              size="mini"
                              cell-class-name="table-cell"
                              header-cell-class-name="header-cell">
                        <el-table-column type="selection"
                                         fixed
                                         width="30"
                                         align="center">
                        </el-table-column>
                        <el-table-column show-overflow-tooltip
                                         align="left"
                                         :label="$t('customer.customerCode')"
                                         prop="customerCode"
                                         fixed></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         align="left"
                                         :label="$t('customer.customerName')"
                                         prop="customerName"
                                         fixed></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         align="left"
                                         :label="$t('customer.customerType')"
                                         prop="customerTypeName"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         min-width="200px"
                                         align="left"
                                         :label="$t('customer.customerPropertyName')"
                                         prop="customerPropertyName"></el-table-column>
                    </el-table>
                    <pagination class="border_b_1"
                                v-show="total1>0"
                                :total="total1"
                                :page.sync="listQuery1.currentPage"
                                :limit.sync="listQuery1.pageSize"
                                @pagination="getList1" />
                </div>
            </el-tab-pane>
            <el-tab-pane v-if="!unMutiple"
                         :label="$t('table.selected')"
                         name="second">
                <div class="table-container">
                    <el-table :data="list2"
                              border
                              fit
                              height="250px"
                              highlight-current-row
                              style="width: 100%;"
                              size="mini"
                              cell-class-name="table-cell"
                              header-cell-class-name="header-cell">
                        <el-table-column show-overflow-tooltip
                                         align="left"
                                         :label="$t('customer.customerCode')"
                                         prop="customerCode"
                                         fixed></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         align="left"
                                         :label="$t('customer.customerName')"
                                         prop="customerName"
                                         fixed></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         align="left"
                                         :label="$t('customer.customerType')"
                                         prop="customerTypeName"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         align="left"
                                         :label="$t('customer.customerPropertyName')"
                                         prop="customerPropertyName"></el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import Pagination from '@/components/Pagination' // 分页组件
import * as api from '@/api/data-base/customer'
export default {
    name: 'khxz',
    components: { Pagination },
    props: ['unMutiple'],
    data () {
        return {
            // listLoading:true,
            // list:'',
            list1: null,
            list2: null,
            total1: 0,
            total2: 0,
            activeName: 'first',
            listQuery1: {
                currentPage: 1,
                pageSize: 10,
            },
            listQuery2: {
                currentPage: 1,
                pageSize: 10,
            },
            isEdit: true
        }
    },
    created () {//创建时加载备选项
        this.getList1()
    },
    methods: {
        handleFilter1 () {//查询备选项
            this.getList1()
        },
        handleFilter2 () {//查询已选项
            this.getList2()
        },
        getList1 () {//备选项查询
            api.queryRecords(this.listQuery1).then(res => {
                res = res.data;
                this.list1 = res.list
                this.total1 = res.pages.count
            })
        },
        getList2 () {//已选项查询
            this.list2 = this.selectRowData1
        },
        selectChange (val) {
            if (this.unMutiple) {
                this.selectOneRow(val);
            } else {
                this.selectRow1(val);
            }
        },
        selectRow1 (val) {//备选项选中行
            this.selectRowData1 = val
            this.list2 = this.selectRowData1
            this.$emit('handSelectRows', val)
        },
        selectOneRow (val) {
            let arr = [];
            arr.push(val[val.length - 1])
            this.selectRowData1 = arr;
            if (val.length > 1) {
                this.$refs.tbselect.clearSelection()
                this.$refs.tbselect.toggleRowSelection(val[val.length - 1], 'selected')
            }
            this.list2 = this.selectRowData1
            this.$emit('handSelectRows', arr)
        }
    }
}
</script>
