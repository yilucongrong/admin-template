//查+上下表
<template>
    <div class="app-container">
        <div class="filter-container">
            <div class="filter-items">
                <el-input size="small"
                          :placeholder="'订单号'"
                          v-model="listQuery.orderNumber"
                          class="filter-item"
                          @keyup.enter.native="handleQuery" />

                <el-input size="small"
                          style="width: 165px"
                          v-model="listQuery.supplierName"
                          :placeholder="'选择供应商'"
                          disabled>
                    <el-button v-if="domainName!=='supplier'"
                               slot="append"
                               icon="el-icon-search"
                               @click="dialogGys=!dialogGys"></el-button>
                </el-input>
                <changeModuleSelect @changeMoudle="changeMoudle"></changeModuleSelect>
                <el-button class="filter-item"
                           type="primary"
                           size="small"
                           icon="el-icon-search"
                           @click="handleQuery">{{$t('btn.search')}}</el-button>

            </div>
        </div>
        <div class="table-container">
            <!--主表-->
            <div class="oprate_btn">
                <el-button class="filter-item"
                           size="small"
                           type="primary"
                           @click="handlePublish"
                           icon="el-icon-edit-outline">{{$t('btn.publish')}}</el-button>
                <el-button class="filter-item"
                           size="small"
                           type="primary"
                           @click="handleDelete"
                           icon="el-icon-delete">{{$t('btn.delete')}}</el-button>
                <el-button class="filter-item"
                           size="small"
                           type="primary"
                           icon="el-icon-price-tag">包装标签</el-button>
                <el-button style="display:none;"
                           class="filter-item"
                           size="small"
                           type="primary"
                           @click="dialogPrintTagVisible=!dialogPrintTagVisible"
                           icon="el-icon-price-tag">{{$t('table.tagPrint')}}</el-button>
                <el-button class="filter-item"
                           size="small"
                           type="primary"
                           @click="handlePublish"
                           icon="el-icon-truck">修改车辆</el-button>
            </div>
            <el-table :key="tableKey[0]"
                      :data="list"
                      border
                      fit
                      :height="theight"
                      highlight-current-row
                      style="width: 100%;"
                      @selection-change="selectChange"
                      @row-click="rowClick"
                      size="mini"
                      cell-class-name="table-cell"
                      header-cell-class-name="header-cell"
                      ref='tbmain'>
                <el-table-column type="selection"
                                 fixed
                                 width="30"
                                 align="center"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 align="left"
                                 :label="$t('deliveryPublish.deliverNo')"
                                 prop="orderNumber"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 align="left"
                                 :label="$t('deliveryPublish.arrivalCompany')"
                                 prop="arrivalCompany"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="130"
                                 align="left"
                                 :label="$t('deliveryPublish.arrivalRepository')"
                                 prop="arrivalRepository"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 align="left"
                                 :label="$t('deliveryPublish.supplier')"
                                 prop="supplierCode"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 align="left"
                                 :label="$t('deliveryPublish.createTime')"
                                 prop="createTime"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 align="left"
                                 :label="$t('deliveryPublish.state')"
                                 prop="stateCN"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 align="left"
                                 :label="$t('deliveryPublish.contact')"
                                 prop="contact"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 align="left"
                                 :label="$t('deliveryPublish.mobile')"
                                 prop="mobile"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="130"
                                 align="left"
                                 :label="$t('deliveryPublish.plateNumber')"
                                 prop="plateNumber"></el-table-column>
            </el-table>
            <pagination :total="total"
                        :page.sync="listQuery.currentPage"
                        :limit.sync="listQuery.pageSize"
                        @pagination="getList"
                        class="pagination-container border_b_1" />
            <el-table :key="tableKey[1]"
                      :data="listSub"
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
        </div>

        <!-- 分开表样式 -->
        <!-- <div class="table-container">
            <el-table :data="listSub"
                      :key="tableKey[1]"
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
import changeModuleSelect from '@/components/template/changeMoudleSelect'

// import * as api from "@/api/purchase/delivery_Publish";
import Pagination from "@/components/Pagination";
import { mapGetters } from 'vuex';

export default {
    name: "delivery_Publish",
    components: { changeModuleSelect, Pagination },
    data () {
        return {
            modalnum: null,//模板编号
            theight: 0,
            isSingle: true,//表格是否单选 点击各按钮根据流程逻辑控制单多选
            currentSelectedRow: null,//当前选中的行
            selectedRows: null,//多选时选中的所有行
            list: null,
            listSub: null,
            total: 0,
            selectedrow: null,//主表选中行
            listQuery: {
                page: true,
                currentPage: 1,
                pageSize: 10
            },
            sublistQuery: {
                page: true,
                currentPage: 1,
                pageSize: 10
            },
            tableKey: [0, 1]//表格索引，虚拟dom渲染表格时使用

        };
    },
    computed: {
        ...mapGetters([
            'domainName',
            'domainId',
        ])
    },
    mounted () {
        this.setTableHeight();
        //表格高度自适应
        window.onresize = () => {
            this.setTableHeight()
        };
        this.listQuery.state = 'CREATE';
        this.getDelivery();
    },
    methods: {
        changeMoudle (val) {
            this.$emit('changeSelect', val)
        },
        //表格高度计算
        setTableHeight () {
            this.theight = this.$myFun.getSingleTbHeight() - 185;
        },
        //主表数据获取
        getDelivery () {
            if (this.listQuery.supplierCode) {
                // api.getDelivery(this.listQuery).then(res => {
                //     this.list = res.list;
                //     this.total = res.pages.count;
                //     this.setFirstLine();
                //     if (this.list[0]) {
                //         this.getSubList(this.list[0])
                //     }
                // });
            }
        },
        //显示主表
        getList () {
            this.getDelivery();
        },
        //显示从表
        getSubList (row) {
            this.sublistQuery.supplierCode = row.supplierCode;
            this.sublistQuery.orderNumber = row.orderNumber;
            // api.getDeliveryDetail(this.sublistQuery).then(res => {
            //     this.listSub = res.deliveryOrderItemDTOList;
            // });
        },
        //发布
        handlePublish () {

        },
        //删除
        handleDelete () {

        },
        //查询
        handleQuery () {
            this.listSub = [];
            this.listQuery.currentPage = 1;
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
        // 表格选择框选中 注:参数为选中的所有行的数组
        selectChange (val) {
            if (this.isSingle) {
                if (val.length > 1) {
                    this.$refs.tb.clearSelection(); //清除其他行的选中
                    this.$refs.tb.toggleRowSelection(val[val.length - 1], "selected"); //单击行绑定点击事件
                } else if (val.length === 1) {
                    this.selectedRows = val;
                    this.currentSelectedRow = val[val.length - 1]
                }
            } else {
                this.selectedRows = val;
                this.currentSelectedRow = val[val.length - 1]
            }
        },
        //点击表格某一行
        rowClick (val) {
            if (this.isSingle) {
                this.$refs.tb.clearSelection(); //清除其他行的选中
            }
            this.$refs.tb.toggleRowSelection(val, "selected"); //单击行绑定点击事件
            this.getSubList(val);
        },
        //加载时默认选中第一行
        setFirstLine () {
            this.$nextTick(() => {
                this.$refs.tbmain.setCurrentRow(this.list[0]);
            });
        }
    }
};
</script>

