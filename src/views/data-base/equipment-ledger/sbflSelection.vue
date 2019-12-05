<template>
    <div class="tab_container">
        <div class="filter-container border_b_1">
            <div class="filter-items">
                <el-input @keyup.enter.native="handleQuery"
                          placeholder="设备类型编码"
                          class="filter-item"
                          size="small"
                          v-model="listQuery.equipTypeCode"></el-input>
                <el-input @keyup.enter.native="handleQuery"
                          placeholder="设备分类名称"
                          class="filter-item"
                          size="small"
                          v-model="listQuery.equipTypeName"></el-input>
                <el-button class="filter-item-btn"
                           type="primary"
                           size="small"
                           icon="el-icon-search"
                           @click="handleQuery">{{ $t('btn.search') }}</el-button>
            </div>
        </div>
        <div class="table-container">
            <el-table :data="list"
                      height="320px"
                      border
                      fit
                      highlight-current-row
                      cell-class-name="table-cell"
                      header-cell-class-name="header-cell"
                      @selection-change="selectChange"
                      ref="tb">
                <el-table-column type="selection"
                                 width="30"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 min-width="100"
                                 align="center"
                                 label="设备类型编码"
                                 prop="equipTypeCode"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 min-width="100"
                                 align="center"
                                 label="设备分类名称"
                                 prop="equipTypeName"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 min-width="100"
                                 align="center"
                                 label="备注"
                                 prop="note"></el-table-column>
            </el-table>
            <pagination :total="total"
                        :page.sync="listQuery.currentPage"
                        :limit.sync="listQuery.pageSize"
                        @pagination="getList" />

        </div>
    </div>

</template>

<script>
import * as api from "@/api/data-base/equipment-type";
import Pagination from "@/components/Pagination";
import { mapState } from "vuex";
export default {
    name: "equipment-ledger",
    components: { Pagination },
    data () {
        return {
            list: [],
            total: 0,
            listQuery: {
                //查询
                currentPage: 1,
                pageSize: 15
            },
            selectedRows: null,//多选时选中的所有行
            tableKey: 0 //表格索引
        };
    },
    computed: {
        ...mapState({
            dt_role_type: state => state.dict.dt_role_type
        })
    },
    mounted () {
        this.getList()
    },
    methods: {

        //获取表格数据
        getList () {
            api.queryRecords(this.listQuery).then(res => {
                this.list = res.data.list
                this.total = res.data.pages.count
            })
        },
        //表格查询
        handleQuery () {
            this.listQuery.currentPage = 1;
            this.getList();
        },
        // 表格选择框选中 注:参数为选中的所有行的数组
        selectChange (val) {
            this.selectedRows = val[val.length - 1];
            if (val.length > 1) {
                this.$refs.tb.clearSelection();
                this.$refs.tb.toggleRowSelection(val.pop());
            }
            this.$emit("handSelectSbflRows", this.selectedRows);
        },

    }
};
</script>


    