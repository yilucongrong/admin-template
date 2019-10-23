<template>
    <!-- bom维护 -->
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <div class="main-header">
                <div class="select-content">
                    <!-- bom类型 -->
                    <el-select size="small"
                               v-model="listQueryMain_a.businessType"
                               @keyup.enter.native="getListMain_a"
                               placeholder="bom类型"
                               clearable>
                        <el-option v-for="item in dt_ckyw_tpye"
                                   :key="item.dictItemKey"
                                   :label="item.dictItemValue"
                                   :value="item.dictItemKey">
                        </el-option>
                    </el-select>
                    <!-- bom类别 -->
                    <el-select size="small"
                               v-model="listQueryMain_a.businessType"
                               @keyup.enter.native="getListMain_a"
                               placeholder="bom类别"
                               clearable>
                        <el-option v-for="item in dt_ckyw_tpye"
                                   :key="item.dictItemKey"
                                   :label="item.dictItemValue"
                                   :value="item.dictItemKey">
                        </el-option>
                    </el-select>
                    <!-- bom级别 -->
                    <el-select size="small"
                               v-model="listQueryMain_a.businessType"
                               @keyup.enter.native="getListMain_a"
                               placeholder="bom级别"
                               clearable>
                        <el-option v-for="item in dt_org_type"
                                   :key="item.dictItemKey"
                                   :label="item.dictItemValue"
                                   :value="item.dictItemKey">
                        </el-option>
                    </el-select>
                    <!-- 组织编码 -->
                    <el-select size="small"
                               v-model="listQueryMain_a.businessType1"
                               @keyup.enter.native="getListMain_a"
                               placeholder="组织编码"
                               clearable>
                        <el-option v-for="item in dt_org_data.options"
                                   :key="item.organizationCode"
                                   :label="item.organizationName"
                                   :value="item.organizationCode">
                        </el-option>
                    </el-select>
                    <!-- 产品编码 -->
                    <el-select size="small"
                               v-model="listQueryMain_a.businessType"
                               @keyup.enter.native="getListMain_a"
                               placeholder="产品编码"
                               clearable>
                        <el-option v-for="item in dt_ckyw_tpye"
                                   :key="item.dictItemKey"
                                   :label="item.dictItemValue"
                                   :value="item.dictItemKey">
                        </el-option>
                    </el-select>
                    <!-- 查询 -->
                    <el-button type="primary"
                               size="small"
                               icon="el-icon-search"
                               @click="getListMain_a">{{ $t('table.search') }}</el-button>
                </div>
            </div>
            <!-- bom主表 -->
            <div class="main-body">
                <div class="btn">
                    <el-button class="filter-item"
                               size="small"
                               type="primary"
                               icon="el-icon-plus">{{$t('table.add')}}</el-button>
                    <el-button class="filter-item"
                               size="small"
                               type="primary"
                               icon="el-icon-edit">{{$t('table.edit')}}</el-button>
                    <el-button class="filter-item"
                               size="small"
                               type="primary"
                               icon="el-icon-delete">{{$t('table.delete')}}</el-button>
                </div>
                <el-table border
                          fit
                          highlight-current-row
                          width='100%'
                          height="315"
                          ref="tbMain_a"
                          header-cell-class-name="header-cell"
                          cell-class-name="table-cell"
                          :data="listMain_a"
                          @selection-change='selectMain_a'
                          @row-click='rowClickMain_a'>
                    <el-table-column type="selection"
                                     width="30"
                                     fixed></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     label="BomID"
                                     prop="rowId"
                                     fixed></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     label="产品编码"
                                     prop="materielCode"
                                     fixed></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     label="产品名称"
                                     prop="materielName"
                                     fixed></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     label="基准数"
                                     prop="cardinalNumber"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     label="版本号"
                                     prop="version"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     label="状态"
                                     prop="status"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     label="生产号"
                                     prop="productionNumber"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     label="订单号"
                                     prop="organizationCode"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     label="组织编码"
                                     prop="organizationCode"></el-table-column>
                </el-table>
                <pagination v-show="totalMain_a>0"
                            :total="totalMain_a"
                            :page.sync="listQueryMain_a.currentPage"
                            :limit.sync="listQueryMain_a.pageSize"
                            @pagination="getListMain_a" />
            </div>
            <!-- bom明细 -->
            <div class="main-body">
                <div class="btn">
                </div>
                <el-table border
                          fit
                          highlight-current-row
                          width='100%'
                          height="315"
                          ref="tbSalve_a"
                          header-cell-class-name="header-cell"
                          cell-class-name="table-cell"
                          :data="listSlave_a"
                          @selection-change='selectSalve_a'
                          @row-click='rowClickSalve_a'></el-table>
                <pagination v-show="totalSlave_a>0"
                            :total="totalSlave_a"
                            :page.sync="listQuerySlave_a.currentPage"
                            :limit.sync="listQuerySlave_a.pageSize"
                            @pagination="getListSlave_a" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import * as api from '@/api/data-base/bom';
import Pagination from "@/components/Pagination";
export default {
    name: "bom",
    components: { Pagination },
    computed: {
        ...mapState({
            dt_org_type: state => state.dict.dt_org_type,
            dt_ckyw_tpye: state => state.dict.dt_ckyw_tpye,
            dt_org_data: state => state.businessComponent.dt_org_data
        })
    },
    mounted () {
        this.$store.dispatch('dict/getDicData', ['dt_org_type', 'dt_ckyw_tpye']);
        this.$store.dispatch('businessComponent/getBusinessComponentData', ['dt_org_data']);
        setTimeout(() => {
            this.getListMain_a()
        }, 0);

    },
    data () {
        return {
            totalMain_a: 0,
            totalSlave_a: 0,
            listMain_a: [],
            listSlave_a: [],
            listQueryMain_a: {
                currentPage: 1,
                pageSize: 10,
            },
            listQuerySlave_a: {
                currentPage: 1,
                pageSize: 10,
            },
        }
    },
    methods: {
        // 查询bom主表
        getListMain_a () {

            // api.getMain_a(this.listQueryMain_a).then(res => {
            //     this.listMain_a=res.data.list
            //     this.totalMain_a=res.data.pages.count

            // })


        },
        // 查询bom从表
        getListSlave_a () {
            api.getSlave_a().then(res => {
                this.listSlave_a = res.data.list
                this.totalSlave_a = res.data.pages.count
            })
        },
        selectMain_a () {

        },
        selectSalve_a () { },
        rowClickMain_a () { },
        rowClickSalve_a () { },
    },
}
</script>

<style lang="scss" scoped>
</style>