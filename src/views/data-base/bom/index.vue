<template>
    <div class="app-container">
        <div class="filter-container">
            <div class="filter-items">
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
        <div class="table-container">
            <!--主表-->
            <div class="oprate_btn">
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
                      :key="tableKey[0]"
                      highlight-current-row
                      width='100%'
                      :height="theight"
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
            <el-table border
                      fit
                      :key="tableKey[1]"
                      highlight-current-row
                      width='100%'
                      :height="theight"
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

        <!-- 
            //分开表样式
        <div class="table-container">
            <el-table :data="listSub"
                      border
                      fit
                      :height="theight"
                      highlight-current-row
                      style="width: 100%;"
                      size="mini"
                      cell-class-name="table-cell"
                      header-cell-class-name="header-cell">
                <el-table-column show-overflow-tooltip
                                 width="50"
                                 align="left"
                                 :label="$t('deliveryPublish.rowNo')"
                                 prop="rowNo"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="150"
                                 align="left"
                                 :label="$t('deliveryPublish.materielCode')"
                                 prop="materielCode"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 align="left"
                                 :label="$t('deliveryPublish.materielName')"
                                 prop="materielName"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 align="left"
                                 :label="$t('deliveryPublish.deliverQuantity')"
                                 prop="deliverQuantity"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 align="left"
                                 :label="$t('deliveryPublish.arrivalDate')"
                                 prop="arrivalDate"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 align="left"
                                 :label="$t('deliveryPublish.remark')"
                                 prop="remark"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 align="left"
                                 :label="$t('deliveryPublish.snp')"
                                 prop="snp"></el-table-column>
            </el-table>
        </div> -->
    </div>
</template>

<script>
import { mapState } from 'vuex'
import * as api from '@/api/data-base/bom';
import Pagination from "@/components/Pagination";
import global_valfn from '@/utils/global_valfn'
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
        this.setTableHeight();
        //表格高度自适应
        window.onresize = () => {
            this.setTableHeight()
        };
        this.getListMain_a();
    },
    data () {
        return {
            tableKey: [0, 1],//表格索引，虚拟dom渲染表格时使用
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
        //表格高度计算
        setTableHeight () {
            this.theight = global_valfn.getSingleTbHeight() - 185;
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