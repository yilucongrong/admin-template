<template>
    <div class="tab_container">
        <div class="filter-container border_b_1">
            <div class="filter-items">
                <el-input size="small"
                          placeholder="供应商编码"
                          v-model="listQuery.supplierCode"
                          class="filter-item"
                          @keyup.enter.native="handleQuery" />
                <el-input size="small"
                          placeholder="供应商名称"
                          v-model="listQuery.supplierName"
                          class="filter-item"
                          @keyup.enter.native="handleQuery" />
                <el-select size="small"
                           v-model="listQuery.supplierType"
                           placeholder="供应商类型"
                           clearable
                           @keyup.enter.native="handleQuery">
                    <el-option v-for="item in dt_supplier_type"
                               :key="item.dictItemKey"
                               :label="item.dictItemValue"
                               :value="item.dictItemKey"></el-option>
                </el-select>

                <el-button class="filter-item"
                           type="primary"
                           size="small"
                           icon="el-icon-search"
                           @click="handleQuery">搜索</el-button>
            </div>
        </div>
        <div class="table-container">
            <el-table :key="tableKey"
                      :data="list"
                      border
                      fit
                      height="315"
                      highlight-current-row
                      style="width: 100%;"
                      @selection-change='selectRow'
                      size="mini"
                      cell-class-name="table-cell"
                      header-cell-class-name="header-cell"
                      ref="tb">
                <el-table-column type="selection"
                                 fixed
                                 width="30"
                                 align="center">
                </el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="120"
                                 align="left"
                                 label="供应商编码"
                                 prop="supplierCode"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="120"
                                 align="left"
                                 label="供应商名称"
                                 prop="supplierName"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="120"
                                 align="left"
                                 label="供应商分类"
                                 prop="supplierTypeName"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="120"
                                 align="left"
                                 label="供货分类"
                                 prop="supplyClassifyName"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="120"
                                 align="left"
                                 label="供货商等级"
                                 prop="supplierGradeName"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="100"
                                 align="left"
                                 label="联系人"
                                 prop="contact"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="100"
                                 align="left"
                                 label="联系电话"
                                 prop="contactNumber"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="160"
                                 align="left"
                                 label="邮箱"
                                 prop="email"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="260"
                                 align="left"
                                 label="地址"
                                 prop="address"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 min-width="480"
                                 align="left"
                                 label="备注"
                                 prop="remark"></el-table-column>
            </el-table>

            <pagination :total="total"
                        :page.sync="listQuery.currentPage"
                        :limit.sync="listQuery.pageSize"
                        @pagination="getList" />
        </div>

    </div>
</template>

<script>
import * as api from '@/api/data-base/equipment-ledger'
import Pagination from '@/components/Pagination'
import { DICT_CODE } from '@/utils/constant'
import { mapState } from 'vuex';

export default {
    name: 'supplier',
    components: { Pagination },
    data () {
        return {
            list: null,
            total: 0,
            listQuery: {
                page: true,
                currentPage: 1,
                pageSize: 10,
                supplierCode: undefined,
                supplierName: undefined,
                supplierType: undefined
            },

            supplierCode: undefined,
            selectCode: [],
            dialogFormVisible: false,
            importDialogVisible: false,
            dialogStatus: '',
            tableKey: 0,
            DICT_CODE: DICT_CODE,

        }
    },
    computed: {
        ...mapState({
            dt_supplier_type: state => state.dict.dt_supplier_type,
        })
    },
    mounted () {
        this.$store.dispatch('dict/getDicData', ['dt_supplier_type']);
        this.getList();
    },
    methods: {
        getList () {
            api.querySuppierRecords(this.listQuery).then(res => {
                this.list = res.data.list
                this.total = res.data.pages.count
            })
        },
        handleQuery () {
            this.listQuery.currentPage = 1
            this.getList()
        },
        selectRow (val) {
            this.selectlistRow = val[val.length - 1];
            if (val.length > 1) {
                this.$refs.tb.clearSelection();
                this.$refs.tb.toggleRowSelection(val.pop());
            }
            this.$emit("handSelectSupplierRows", this.selectlistRow);
        },
    }
}
</script>
