//查+上下表
<template>
    <div class="app-container calendar-list-container">
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
                <el-select v-model="modalnum"
                           @change="changeMoudle"
                           size="small"
                           placeholder="选择模板">
                    <el-option key=0
                               label="模板1(查+表)"
                               value=0></el-option>
                    <el-option key=1
                               label="模板2(左树+查+表)"
                               value=1></el-option>
                    <el-option key=2
                               label="模板3(左右表)"
                               value=2></el-option>
                    <el-option key=3
                               label="模板4(查+上下表)"
                               value=3></el-option>
                    <el-option key=4
                               label="模板5(tab+左右表)"
                               value=4></el-option>
                    <el-option key=5
                               label="模板6(tab+上下表)"
                               value=5></el-option>
                </el-select>
                <el-button class="filter-item"
                           type="primary"
                           size="small"
                           icon="el-icon-search"
                           @click="handleQuery">{{$t('table.search')}}</el-button>

            </div>
        </div>
        <div class="table-container">
            <!--主表-->
            <div class="oprate_btn">
                <el-button class="filter-item"
                           size="small"
                           type="primary"
                           @click="handlePublish"
                           icon="el-icon-edit-outline">{{$t('table.publish')}}</el-button>
                <el-button class="filter-item"
                           size="small"
                           type="primary"
                           @click="handleDelete"
                           icon="el-icon-delete">{{$t('table.delete')}}</el-button>
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
                           @click="updateCar"
                           icon="el-icon-truck">修改车辆</el-button>
            </div>
            <el-table :key="tableKey"
                      :data="list"
                      border
                      fit
                      :height="theight"
                      highlight-current-row
                      style="width: 100%;"
                      @selection-change='selectRow'
                      size="mini"
                      cell-class-name="table-cell"
                      header-cell-class-name="header-cell"
                      @row-click='showSubTable'
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
                        class="pagination-container no_b_border" />
            <el-table :data="listRow"
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
        <!-- <div class="table-container">
            <el-table :data="listRow"
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
import global_valfn from '@/utils/global_valfn'
import * as api from "@/api/purchase/delivery_Publish";
import Pagination from "@/components/Pagination";
import { DICT_CODE, DT_ORG_TYPE, TWO_STATE_OPTIONS } from "@/utils/constant";
import { codeToName } from '@/utils/codeToName'
import { mapState, mapGetters } from 'vuex';

export default {
    name: "delivery_Publish",
    components: { Pagination },
    data () {
        return {
            modalnum: null,//模板编号
            theight: 0,
            list: null,
            listRow: null,
            packDataList: null,
            packPrintList: [],
            updatePacklist: {
                barCode: [],
                method: '',
                supplierBatch: '',
                supplierRemark: ''
            },
            total: 0,
            rangeTime: "",
            selectRows: [],
            selectPackRows: [],
            listQuery: {
                page: true,
                currentPage: 1,
                pageSize: 10,
                supplierCode: '',//供应商编号,
                arrivalCompany: '',
                orderNumber: undefined,//订单号
                releaseDateStart: undefined,//订单状态
                releaseDateEnd: undefined,
                state: undefined//订单状态
            },
            sublistQuery: {
                page: true,
                currentPage: 1,
                pageSize: 10,
                supplierCode: '',//供应商编号
                orderNumber: undefined//订单号
            },
            listQueryPack: {
                orderNumber: '',
                materielCode: '',
                orderNumbers: [],
                barcodeRuleDetails: []
            },
            temp: {
                supplierCode: '',
                orderNumber: '',
                contact: '',
                mobile: '',
                plateNumber: '',
                method: ''
            },
            printData: {},//打印数据
            selectCode: [],
            dialogFormVisible: false,
            dialogPrintVisible: false,
            dialogPrintTagVisible: false,
            dialogPack: false,//包装标签tag
            dialogPackSet: false,//包装标签设置
            dialogPackPrintVisible: false,//打印弹框显示
            dialogGys: false,
            dialogStatus: "",
            parentsRows: [],
            tableKey: 0,
            DICT_CODE: DICT_CODE,
            DT_ORG_TYPE: DT_ORG_TYPE,
            TWO_STATE_OPTIONS: TWO_STATE_OPTIONS,
            isPublish: true,
            rules: {
                contact: [
                    { max: 32, message: this.$t('validate.max32'), trigger: 'blur' }
                ],
                mobile: [
                    { max: 32, message: this.$t('validate.max32'), trigger: 'blur' }
                ],
                plateNumber: [
                    { max: 32, message: this.$t('validate.max32'), trigger: 'blur' }
                ]
            },
            packData: {
                detailDTOS: [],
                dicType: "LB01",
                dicTypeName: "外购件",
                sourceType: "source_type01",
                sourceTypeName: "交货单"
            }
        };
    },
    computed: {
        ...mapState({
            dt_delivery_state: state => state.dict.dt_delivery_state
        }),
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
            this.theight = global_valfn.getSingleTbHeight() - 185;
        },
        //主表数据获取
        getDelivery () {
            if (this.listQuery.supplierCode) {
                api.getDelivery(this.listQuery).then(res => {
                    let options = [this.dt_delivery_state];
                    res = codeToName(res, options, ['state']);
                    this.list = res.list;
                    this.total = res.pages.count;
                    this.setFirstLine();
                    if (this.list[0]) {
                        this.getSubList(this.list[0])
                    }
                });
            }
        },
        //显示主表
        getList () {
            if (this.rangeTime) {
                var d1 = this.rangeTime[0];
                var d2 = this.rangeTime[1];
                this.listQuery.releaseDateStart = d1;
                this.listQuery.releaseDateEnd = d2;
            } else {
                this.listQuery.releaseDateStart = '';
                this.listQuery.releaseDateEnd = '';
            }
            this.getDelivery();
        },
        //显示从表
        getSubList (row) {
            this.sublistQuery.supplierCode = row.supplierCode;
            this.sublistQuery.orderNumber = row.orderNumber;
            api.getDeliveryDetail(this.sublistQuery).then(res => {
                this.listRow = res.deliveryOrderItemDTOList;
            });
        },
        //发布
        handlePublish () {
            if (this.selectRows) {
                if (this.selectRows.state) {
                    this.$confirm(this.$t('message.isPublishOrder'), this.$t('message.prompt'), {
                        confirmButtonText: this.$t('message.yes'),
                        cancelButtonText: this.$t('message.no'),
                        type: 'warning'
                    }).then(() => {
                        this.isPublish = true;
                        this.resetTemp();
                        this.dialogFormVisible = true;
                        this.dialogStatus = "publish";
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: this.$t('message.canceledPublish')
                        });
                    });
                } else {
                    this.$message.warning(this.$t('message.checkedplease'));
                    return false;
                }
            } else {
                this.$message.warning(this.$t('message.checkedplease'));
                return false;
            }
        },
        //发布提交
        publishConfirm () {
            this.temp.supplierCode = this.selectRows.supplierCode;
            this.temp.orderNumber = this.selectRows.orderNumber;
            this.temp.state = 'RELEASE';
            this.temp.method = 'RELEASE';
            api.updateDelivery(this.temp).then(() => {
                this.dialogFormVisible = false;
                this.$message.success(this.$t('message.publishSuccess'));
                this.getDelivery();
            });
        },
        //发布前修改车辆信息
        updateCar () {
            this.isPublish = false;
            this.dialogFormVisible = true;
        },
        updateCarConfirm () {
            this.$confirm(this.$t('message.isDeleteContinue'), this.$t('message.prompt'), {
                confirmButtonText: this.$t('message.confirm'),
                cancelButtonText: this.$t('message.cancel'),
                type: 'warning'
            }).then(() => {
                this.dialogFormVisible = true;
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: this.$t('message.deleteCanceled')
                });
            });
        },
        //删除
        handleDelete () {
            if (this.selectRows) {
                if (this.selectRows.state) {
                    let state = this.selectRows.state;
                    if (state !== 'CREATE') {
                        this.$message({
                            type: 'warning',
                            message: this.$t('message.cannotDeleteUnCreateOrder')
                        });
                    } else {
                        this.$confirm(this.$t('message.isDeleteContinue'), this.$t('message.prompt'), {
                            confirmButtonText: this.$t('message.confirm'),
                            cancelButtonText: this.$t('message.cancel'),
                            type: 'warning'
                        }).then(() => {
                            let datas = {}
                            datas.supplierCode = this.selectRows.supplierCode;
                            datas.orderNumber = this.selectRows.orderNumber;
                            api.deleteDelivery(datas).then(() => {
                                this.getDelivery();
                                this.$message({
                                    type: 'success',
                                    message: this.$t('message.deleteSuccessed')
                                });
                            });
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: this.$t('message.deleteCanceled')
                            });
                        });
                    }
                } else {
                    this.$message.warning(this.$t('message.checkedplease'));
                    return false;
                }
            } else {
                this.$message.warning(this.$t('message.checkedplease'));
                return false;
            }

        },
        //单据打印
        receiptPrint () {
            if (this.selectRows) {
                if (this.selectRows.state) {
                    this.dialogPrintVisible = true;
                    this.dialogStatus = "print";
                    this.printData = this.selectRows;
                    this.$nextTick(() => {
                        this.$refs.childQRcode.qrCreate(this.printData.orderNumber)
                    });
                } else {
                    this.$message.warning(this.$t('message.checkedplease'));
                    return false;
                }
            } else {
                this.$message.warning(this.$t('message.checkedplease'));
                return false;
            }

        },
        //单据打印执行
        doReceiptPrint () {
            let newWin = window.open("");
            var newstr = document.getElementById('receipt').innerHTML;
            newWin.document.write(newstr);
            newWin.document.close();//IE添加

            setTimeout(function () {
                newWin.print();
                newWin.close();
            }, 100);
        },
        //关闭交货单
        handleClose () {
            if (this.selectRows) {
                if (this.selectRows.state) {
                    let state = this.selectRows.state;
                    if (state !== 'RELEASE') {
                        this.$message({
                            type: 'warning',
                            message: this.$t('message.cannotCloseUnPublishOrder')
                        });
                    } else {
                        this.$confirm(this.$t('message.isCloseOrderContinue'), this.$t('message.prompt'), {
                            confirmButtonText: this.$t('message.confirm'),
                            cancelButtonText: this.$t('message.cancel'),
                            type: 'warning'
                        }).then(() => {
                            let datas = {}
                            datas.supplierCode = this.selectRows.supplierCode;
                            datas.orderNumber = this.selectRows.orderNumber;
                            datas.state = 'CLOSE';
                            datas.method = 'CLOSE';
                            api.updateDelivery(datas).then(() => {
                                this.getDelivery();
                                this.$message({
                                    title: "",
                                    message: this.$t('message.closed'),
                                    type: "success"
                                });
                            });
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: this.$t('message.cancelClose')
                            });
                        });
                    }
                } else {
                    this.$message.warning(this.$t('message.checkedplease'));
                    return false;
                }
            } else {
                this.$message.warning(this.$t('message.checkedplease'));
                return false;
            }
        },
        //查询
        handleQuery () {
            this.listRow = [];
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
        //主表勾选框选中
        selectRow (val) {
            this.selectRows = val[val.length - 1]
            if (val.length > 1) {
                this.$refs.tbmain.clearSelection()
                this.$refs.tbmain.toggleRowSelection(val[val.length - 1], 'selected')
            }
            this.$refs.tbmain.setCurrentRow(this.selectRows);
            if (val.length !== 0) {
                this.getSubList(val[val.length - 1]);
            }
        },
        //主表点击显示从表
        showSubTable (val) {
            this.selectRows = val;
            this.$refs.tbmain.clearSelection()
            this.$refs.tbmain.toggleRowSelection(val, 'selected')
            this.getSubList(val);
        },
        //重置联系人输入框
        resetTemp () {
            this.temp = {
                contact: '',
                mobile: '',
                plateNumber: ''
            };
        },
        //供应商选择
        handleDblclickgysxz (row) {
            this.parentsRows = row;
        },
        //供应商选中弹窗确认按钮
        update1 () {
            if (!this.parentsRows[0]) {
                this.$message({
                    title: this.$t('message.warning'),
                    message: this.$t('message.checkedoneplease'),
                    type: "warning"
                });
            } else {
                if (this.parentsRows.length && this.parentsRows.length == 1) {
                    this.temp.supplierCode = this.parentsRows[0].supplierCode;
                    this.temp.supplierName = this.parentsRows[0].supplierName;
                    this.listQuery.supplierCode = this.parentsRows[0].supplierCode;
                    this.listQuery.supplierName = this.parentsRows[0].supplierName;
                    this.dialogGys = false;
                } else {
                    this.$message({
                        title: this.$t('message.warning'),
                        message: this.$t('message.checkedoneplease'),
                        type: "warning"
                    });
                }
            }
        },
        //加载时默认选中第一行
        setFirstLine () {
            this.$nextTick(() => {
                this.$refs.tbmain.setCurrentRow(this.list[0]);
            });
        },

        //选中标签列表
        selectPackRow (val) {
            this.selectPackRows = val;
        },
        //标签打印设置
        handlePackSetting () {
            if (this.selectPackRows.length > 0) {
                this.dialogPackSet = true;
            } else {
                this.$message({
                    title: this.$t('message.warning'),
                    message: this.$t('message.checkedoneplease'),
                    type: "warning"
                });
            }
        },
        //批量打印
        handleBulkPrint () {
            if (this.selectPackRows.length === 0) {
                this.$message({
                    title: this.$t('message.warning'),
                    message: '请选择要打印的标签',
                    type: "warning"
                });
            } else {
                let printable = true;
                try {
                    this.selectPackRows.forEach(item => {
                        if (item.printSign === 1) {
                            printable = false;
                            this.$message({
                                title: this.$t('message.warning'),
                                message: '所选项包含已打印过的标签，不能进行批量打印',
                                type: "warning"
                            });
                            throw ''
                        }
                    });
                    if (printable) {
                        this.updateMethod = 'batchPrint';
                        this.createPrintPack();
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        },
        //补打
        handleFillPrint () {
            if (this.selectPackRows.length === 0) {
                this.$message({
                    title: this.$t('message.warning'),
                    message: '请选择要打印的标签',
                    type: "warning"
                });
            } else {
                let printable = true;
                try {
                    this.selectPackRows.forEach(item => {
                        if (item.printSign === 0) {
                            printable = false;
                            this.$message({
                                title: this.$t('message.warning'),
                                message: '所选项包含未打印过的标签，不能进行补打',
                                type: "warning"
                            });
                        }
                    });
                    if (printable) {
                        this.updateMethod = 'makeUpPrint';
                        this.createPrintPack();
                    }
                } catch (e) {
                    console.log(e);
                }
            }

        },
        initUpdatePacklist () {
            let barcodes = new Array();
            this.selectPackRows.forEach(item => {
                barcodes.push(item.barCode);
            });
            this.updatePacklist.barCode = barcodes;
            this.updatePacklist.method = this.updateMethod;
            if (this.updateMethod !== 'setUp') {
                this.updatePacklist.supplierBatch = '';
                this.updatePacklist.supplierRemark = '';
            }
        },
        //标签设置确认提交
        confirmPackBatch () {
            this.updateMethod = 'setUp';
            this.initUpdatePacklist();
            api.updatePackTag(this.updatePacklist).then(() => {
                api.queryPackTag(this.listQueryPack).then(resq => {
                    this.packDataList = resq;
                });
                this.$message.success('设置成功');
            })
        },
        //执行包装标签打印
        doPackPrint () {
            this.$confirm('是否进行打印操作？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                this.dialogPackPrintVisible = false;
                this.initUpdatePacklist();
                api.updatePackTag(this.updatePacklist).then(() => {
                    api.queryPackTag(this.listQueryPack).then(resq => {
                        this.packDataList = resq;
                    });
                    this.$message.success('设置成功');
                });
                let newWin = window.open("");
                var newstr = document.getElementById('packprint').innerHTML;
                newWin.document.write(newstr);
                newWin.document.close();//IE添加

                setTimeout(function () {
                    newWin.print();
                    newWin.close();
                }, 100);
            })

        }
    }
};
</script>
<style scoped>
/* 打印最后一行样式 */
.tablelastrow {
    border-bottom: 2px solid #d5d8da;
    height: 24px;
}
</style>

