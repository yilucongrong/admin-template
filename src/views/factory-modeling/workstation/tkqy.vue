<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <div class="filter-items">
                <div class="select-element">
                    <el-input size="small"
                              :placeholder="$t('workstation.locationCode')"
                              v-model="listQuery.locationCode"
                              class="filter-item"
                              @keyup.enter.native="handleQuery" />
                    <el-input size="small"
                              :placeholder="$t('workstation.locationName')"
                              v-model="listQuery.locationName"
                              class="filter-item"
                              @keyup.enter.native="handleQuery" />
                    <el-button class="filter-item"
                               type="primary"
                               size="small"
                               icon="el-icon-search"
                               @click="handleQuery">{{ $t('table.search') }}</el-button>
                </div>
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
                      @selection-change="selectRow"
                      cell-class-name="table-cell"
                      header-cell-class-name="header-cell">
                <el-table-column type="selection"
                                 fixed
                                 width="30"
                                 align="center"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="120"
                                 align="left"
                                 :label="$t('workstation.warehouseCode')"
                                 prop="warehouseCode"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="200"
                                 align="left"
                                 :label="$t('workstation.areaCode')"
                                 prop="areaCode"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="100"
                                 align="left"
                                 :label="$t('workstation.locationCode')"
                                 prop="locationCode"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="100"
                                 align="left"
                                 :label="$t('workstation.locationName')"
                                 prop="locationName"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="100"
                                 align="left"
                                 :label="$t('workstation.warehouseName')"
                                 prop="warehouseName"></el-table-column>
            </el-table>
            <pagination :total="total"
                        :page.sync="listQuery.currentPage"
                        :limit.sync="listQuery.pageSize"
                        @pagination="getList" />
        </div>
    </div>
</template>

<script>
import * as api from "@/api/data-base/warehouse";
import Pagination from "@/components/Pagination";

export default {
    name: "Color",
    components: { Pagination },
    props: {
        warehouseCode: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            list: null,
            total: 0,
            listQuery: {
                page: true,
                currentPage: 1,
                pageSize: 10,
                warehouseCode: undefined,
                locationCode: undefined,
                locationName: undefined
            },
            temp: {
                locationCode: undefined,
                locationName: undefined,
                warehouseCode: undefined,
                warehouseName: undefined,
                areaCode: undefined
            },

            locationCode: undefined,
            locationName: undefined,
            warehouseName: undefined,
            areaCode: undefined,
            selectCode: [],
            dialogStatus: "",
            tableKey: 0
        };
    },
    mounted () {
        this.getList();
    },
    methods: {
        getList () {
            api.queryLocation(this.warehouseCode, this.listQuery).then(res => {
                this.list = res.data.list;
                this.total = res.data.pages.count;
            });
        },
        handleQuery () {//查询
            this.listQuery.currentPage = 1;
            this.getList();
        },
        // 获取表格选中时的数据
        selectRow (val) {
            this.selectlistRow = val;
            this.$emit("handSelectAreasRows", val);
        },
        create () {//新增确认按钮
            this.$refs.temp.validate(valid => {
                if (valid) {
                    api.addRecord(this.temp).then(() => {
                        this.getList();
                        this.dialogFormVisible = false;
                        this.$message({
                            title: "成功",
                            message: "新增成功",
                            type: "success",
                            duration: 2000
                        });
                    });
                } else {
                    return false;
                }
            });
        },
        cancel () {//取消弹窗按钮
            this.dialogFormVisible = false;
        },
        resetTemp () {
            this.temp = {
                colorCode: undefined,
                colorName: undefined,
                colorAbbreviation: undefined,
                state: 1,
                remark: undefined
            };
        },
        handleClose () {
            this.resetTemp();
            this.$refs.temp.resetFields();
        },
        handleSelectionChange (selection) {
            this.selectCode = selection.map(v => v.colorCode);
        },
    }
};
</script>
