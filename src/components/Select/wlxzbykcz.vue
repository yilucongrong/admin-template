// 库存帐物料选择
<template>
    <!-- /v1/accounts/summarise查询库存账列表 -->
    <div class="tab_container">
        <el-tabs v-model="activeName2"
                 type="border-card">
            <el-tab-pane label="备选"
                         name="first">
                <div class="filter-container border_b_1">
                    <AuthoType class="filter-item"
                               :disabled="isEdit"
                               :selectType=1
                               :placeholder="'组织编码'"
                               v-model="listQuery.orgCode"
                               @keyup.enter.native="handleQuery"></AuthoType>
                    <AuthoType class="filter-item"
                               :disabled="isEdit"
                               :selectType=3
                               v-if="!listQuery.orgCode"
                               :placeholder="'请先选择组织'"
                               v-model="listQuery.warehouseCode"
                               @keyup.enter.native="handleQuery"></AuthoType>
                    <AuthoType class="filter-item"
                               :disabled="isEdit"
                               :selectType=3
                               v-else
                               :cascading="listQuery.orgCode"
                               :placeholder="'仓库编码'"
                               v-model="listQuery.warehouseCode"
                               @keyup.enter.native="handleQuery"></AuthoType>
                    <el-select class="filter-item"
                               multiple
                               size="small"
                               v-model="stockStateArr"
                               placeholder="库存状态"
                               clearable
                               @keyup.enter.native="getList">
                        <el-option v-for="item in dt_stock_status"
                                   :key="item.dictItemKey"
                                   :label="item.dictItemValue"
                                   :value="item.dictItemKey">
                        </el-option>
                    </el-select>
                    <el-select class="filter-item"
                               size="small"
                               v-model="listQuery.stockType"
                               placeholder="库存类型"
                               clearable
                               @keyup.enter.native="getList">
                        <el-option v-for="item in dt_stock_type"
                                   :key="item.dictItemKey"
                                   :label="item.dictItemValue"
                                   :value="item.dictItemKey">
                        </el-option>
                    </el-select>
                    <el-select class="filter-item"
                               size="small"
                               v-model="listQuery.materielType"
                               placeholder="物料类型"
                               clearable
                               @keyup.enter.native="getList">
                        <el-option v-for="item in dt_materiel_type"
                                   :key="item.dictItemKey"
                                   :label="item.dictItemValue"
                                   :value="item.dictItemKey">
                        </el-option>
                    </el-select>
                    <el-input size="small"
                              placeholder="物料编码"
                              v-model="listQuery.materielCode"
                              class="filter-item"
                              @keyup.enter.native="getList" />
                    <el-input size="small"
                              placeholder="物料名称"
                              v-model="listQuery.materielName"
                              class="filter-item"
                              @keyup.enter.native="getList" />
                    <el-select class="filter-item"
                               placeholder="区位"
                               size="small"
                               v-model="listQuery.wareAreaCode"
                               @change="changeAreaSel">
                        <el-option v-for="item in areaList"
                                   :key="item.areaCode"
                                   :label="item.areaName"
                                   :value="item.areaCode">
                        </el-option>
                    </el-select>
                    <el-select class="filter-item"
                               placeholder="储位"
                               size="small"
                               v-model="listQuery.wareLocationCode">
                        <el-option v-for="item in locatorList"
                                   :key="item.locationCode"
                                   :label="item.locationName"
                                   :value="item.locationCode">
                        </el-option>
                    </el-select>

                    <el-button class="filter-item"
                               size="small"
                               type="primary"
                               icon="el-icon-search"
                               @click="handleQuery">{{$t('table.search')}}</el-button>
                </div>
                <!-- 备选项 -->
                <div class="table-container">
                    <el-table :key="tableKey"
                              :data="list"
                              border
                              fit
                              height="325"
                              highlight-current-row
                              style="width: 100%;"
                              ref="tb_bx"
                              @select='selectMain'
                              size="mini"
                              cell-class-name="table-cell"
                              header-cell-class-name="header-cell">
                        <el-table-column type="selection"
                                         width="30"
                                         fixed></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         label="序号"
                                         prop="rowId"
                                         fixed></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         label="物料编码"
                                         prop="materielCode"
                                         fixed></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         label="数量"
                                         prop="endingNum"
                                         fixed></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         label="仓库"
                                         prop="warehouseCode"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         label="仓库名称"
                                         prop="warehouseName"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         label="区位"
                                         prop="wareAreaCode"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         label="区位名称"
                                         prop="wareAreaName"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         label="储位"
                                         prop="wareLocationCode"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         label="储位名称"
                                         prop="wareLocationName"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         label="批次"
                                         prop="batchNo"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         label="计量单位"
                                         prop="unit"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         label="计量单位名称"
                                         prop="unitName"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         label="库存状态"
                                         prop="stockState"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         label="库存类型"
                                         prop="stockType"></el-table-column>
                    </el-table>

                    <pagination :total="total"
                                :page.sync="listQuery.currentPage"
                                :limit.sync="listQuery.pageSize"
                                @pagination="getList" />
                </div>
            </el-tab-pane>
            <!-- 已选项 -->
            <el-tab-pane label="已选"
                         name="second">
                <div class="table-container">
                    <el-table :data="listSelected"
                              border
                              fit
                              height="310px"
                              size="mini"
                              highlight-current-row
                              style="width: 100%;"
                              cell-class-name="table-cell"
                              header-cell-class-name="header-cell"
                              ref="tb_selected">
                        <el-table-column show-overflow-tooltip
                                         label="序号"
                                         prop="rowId"
                                         fixed></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         label="物料编码"
                                         prop="materielCode"
                                         fixed></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         label="数量"
                                         prop="endingNum"
                                         fixed></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         label="仓库"
                                         prop="warehouseCode"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         label="仓库名称"
                                         prop="warehouseName"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         label="区位"
                                         prop="wareAreaCode"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         label="区位名称"
                                         prop="wareAreaName"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         label="储位"
                                         prop="wareLocationCode"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         label="储位名称"
                                         prop="wareLocationName"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         label="批次"
                                         prop="batchNo"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         label="计量单位"
                                         prop="unit"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         label="计量单位名称"
                                         prop="unitName"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         label="库存状态"
                                         prop="stockState"></el-table-column>
                        <el-table-column show-overflow-tooltip
                                         label="库存类型"
                                         prop="stockType"></el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>

        </el-tabs>
    </div>
</template>

<script>
import * as api from '@/api/project/wms/wlxz/wlxzbykcz'
import AuthoType from '@/components/Select/AuthoType.vue'//权限类型下拉组件
import Pagination from '@/components/Pagination'
import { mapState } from 'vuex'

export default {
    name: 'wlxzbykcz',
    components: { Pagination, AuthoType },
    props: ['orgCode', 'unMutiple', 'stockType', 'warehouseCode'],
    data () {
        return {
            list: null,
            total: 0,
            areaList: null,
            locatorList: null,
            stockStateArr: [],
            listQuery: {
                currentPage: 1,
                pageSize: 10,
                materielCode: undefined,
                materielName: undefined,
                orgCode: this.orgCode,
                warehouseCode: this.warehouseCode,
                stockType: this.stockType,
                stockState: this.stockState
            },
            activeName2: 'first',
            listSelected: [],
            materielCode: undefined,
            selectCode: [],
            tableKey: 0,
            employeeType: undefined,
            isEdit: false,
            isUnselected: false
        }
    },
    computed: {
        ...mapState({
            dt_stock_type: state => state.dict.dt_stock_type,
            dt_stock_status: state => state.dict.dt_stock_status,
            dt_materiel_type: state => state.dict.dt_materiel_type,
        })
    },
    mounted () {
        this.$store.dispatch('dict/getDicData', ['dt_stock_type', 'dt_stock_status', 'dt_materiel_type', 'dt_stock_type']);
        this.getAreaList();
        this.getList();
    },
    methods: {
        getList () {
            this.listQuery.stockState = this.stockStateArr.join(',');
            api.queryRecords(this.listQuery).then(res => {
                res = res.data;
                this.list = res.list
                this.total = res.pages.count;
                if (this.listSelected) {
                    this.listSelected.forEach(items => {
                        this.list.forEach((item, index) => {
                            if (item.rowId === items.rowId) {
                                this.$nextTick(function () {
                                    this.checked(index)
                                })
                            }
                        })
                    })
                }
            })
        },
        checked (i) {
            this.$refs.tb_bx.toggleRowSelection(this.list[i], true);
        },
        handleQuery () {
            this.listQuery.currentPage = 1
            this.getList()
        },
        //检查是否取消勾选
        checkUnsel (val, row) {
            let isuncheck = true;
            val.forEach(item => {
                if (item.rowId === row.rowId) {
                    isuncheck = false;
                }
            });
            return isuncheck;
        },
        selectMain (val, row) {
            let isuncheck = this.checkUnsel(val, row);
            if (!isuncheck) {
                if (this.unMutiple) {
                    if (val.length == 1) {
                        this.listSelected = val;
                    }
                    else {
                        this.$message({
                            title: "警告",
                            message: "请选择一条信息",
                            type: "warning"
                        });
                    }
                } else {
                    if (this.listSelected) {
                        val.forEach((items, indexv) => {
                            let isSelected = false;
                            this.listSelected.forEach((item) => {
                                if (item.rowId === items.rowId) {
                                    isSelected = true
                                }
                            })
                            if (!isSelected) {
                                this.listSelected.push(val[indexv]);
                            }
                        })
                    } else {
                        this.listSelected = val;
                    }
                }
            } else {
                this.listSelected = this.listSelected.filter(item => {
                    return item.rowId !== row.rowId;
                })
            }
        },
        getAreaList () {
            api.getArea(this.warehouseCode).then(resa => {
                resa = resa.data;
                this.areaList = resa;
            })
        },
        changeAreaSel (val) {
            api.getLocator(this.warehouseCode, val).then(res => {
                res = res.data;
                this.locatorList = res;
            })
        }
    },
    watch: {
        orgCode: {
            handler (newValue) {
                this.listQuery.orgCode = newValue
                this.getList()
            },
            deep: true
        },
        warehouseCode: {
            handler (newValue) {
                this.listQuery.warehouseCode = newValue
                this.getList()
            },
            deep: true
        },

        stockType: {
            handler (newValue) {
                this.listQuery.stockType = newValue
                this.getList()
            },
            deep: true
        }
    }
}
</script>
