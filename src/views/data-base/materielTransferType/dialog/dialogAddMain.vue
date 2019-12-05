<template>
    <div>
        <el-dialog width="75%"
                   top="10vh"
                   custom-class="dialog-custom"
                   :title="dialogStatus==0?$t('table.add'):$t('table.edit')"
                   :close-on-click-modal="false"
                   :visible.sync="dialogFormVisible">
            <el-form :rules="rules"
                     :model="AddMainlist"
                     ref="AddMainlist"
                     label-position="left"
                     label-width="130px"
                     :inline="true"
                     class="demo-form-inline">
                <el-form-item v-if="dialogStatus!==0"
                              :label="$t('materielTransferType.transferTypeCode')"
                              prop="wareRuleCode">
                    <el-input size="small"
                              v-model="AddMainlist.wareRuleCode"
                              disabled></el-input>
                </el-form-item>
                <el-form-item v-else
                              :label="$t('materielTransferType.transferTypeCode')"
                              prop="wareRuleCode">
                    <el-input size="small"
                              v-model="AddMainlist.wareRuleCode"></el-input>
                </el-form-item>
                <el-form-item :label="$t('materielTransferType.transferTypeName')"
                              prop="wareRuleName">
                    <el-input size="small"
                              v-model="AddMainlist.wareRuleName"></el-input>
                </el-form-item>
                <el-form-item :label="$t('materielTransferType.statisticType')"
                              prop="statsClassify">
                    <el-select clearable
                               size="small"
                               v-model="AddMainlist.statsClassify"
                               :placeholder="$t('table.select')">
                        <el-option v-for="item in dt_statistic_type"
                                   :key="item.dictItemKey"
                                   :label="item.dictItemValue"
                                   :value="item.dictItemKey">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('materielTransferType.displayGroup')"
                              prop="screenGroupNum">
                    <el-input size="small"
                              v-model="AddMainlist.screenGroupNum"></el-input>
                </el-form-item>
                <el-form-item :label="$t('materielTransferType.isProBatch')"
                              prop="isProdBatch">
                    <el-select clearable
                               size="small"
                               v-model="AddMainlist.isProdBatch"
                               :placeholder="$t('materielTransferType.select')">
                        <el-option v-for="item in booleanValue[0]"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('materielTransferType.isProQC')"
                              prop="isQcNotice">
                    <el-select clearable
                               size="small"
                               v-model="AddMainlist.isQcNotice"
                               :placeholder="$t('materielTransferType.select')">
                        <el-option v-for="item in booleanValue[0]"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('materielTransferType.referDataSource')"
                              prop="refSources">
                    <el-select clearable
                               size="small"
                               v-model="AddMainlist.refSources"
                               :placeholder="$t('table.select')">
                        <el-option v-for="item in dt_referdata_resource"
                                   :key="item.dictItemKey"
                                   :label="item.dictItemValue"
                                   :value="item.dictItemKey">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('materielTransferType.isOverCheck')"
                              prop="isSuperIndicaChk">
                    <el-select clearable
                               size="small"
                               v-model="AddMainlist.isSuperIndicaChk"
                               :placeholder="$t('materielTransferType.select')">
                        <el-option v-for="item in booleanValue[0]"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('materielTransferType.refDataUpdate')"
                              prop="refUpdate">
                    <el-select clearable
                               size="small"
                               v-model="AddMainlist.refUpdate"
                               :placeholder="$t('materielTransferType.select')">
                        <el-option v-for="item in booleanValue[0]"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('materielTransferType.isNegativeCheck')"
                              prop="isNegativeStockChk">
                    <el-select clearable
                               size="small"
                               v-model="AddMainlist.isNegativeStockChk"
                               :placeholder="$t('materielTransferType.select')">
                        <el-option v-for="item in booleanValue[0]"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('materielTransferType.getStockState')"
                              prop="fetchStockStatArr">
                    <el-select clearable
                               multiple
                               size="small"
                               v-model="AddMainlist.fetchStockStatArr"
                               :placeholder="$t('table.select')">
                        <el-option v-for="item in dt_stock_status"
                                   :key="item.dictItemKey"
                                   :label="item.dictItemValue"
                                   :value="item.dictItemKey">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('materielTransferType.getStockType')"
                              prop="fetchStockTypeArr">
                    <el-select clearable
                               multiple
                               size="small"
                               v-model="AddMainlist.fetchStockTypeArr"
                               :placeholder="$t('table.select')">
                        <el-option v-for="item in dt_stock_type"
                                   :key="item.dictItemKey"
                                   :label="item.dictItemValue"
                                   :value="item.dictItemKey">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('materielTransferType.setStockState')"
                              prop="storeStockStat">
                    <el-select clearable
                               size="small"
                               v-model="AddMainlist.storeStockStat"
                               :placeholder="$t('table.select')">
                        <el-option v-for="item in dt_stock_status"
                                   :key="item.dictItemKey"
                                   :label="item.dictItemValue"
                                   :value="item.dictItemKey">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('materielTransferType.setStockType')"
                              prop="storeStockType">
                    <el-select clearable
                               size="small"
                               v-model="AddMainlist.storeStockType"
                               :placeholder="$t('table.select')">
                        <el-option v-for="item in dt_stock_type"
                                   :key="item.dictItemKey"
                                   :label="item.dictItemValue"
                                   :value="item.dictItemKey">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('materielTransferType.isAccount')"
                              prop="isAccount">
                    <el-select clearable
                               size="small"
                               v-model="AddMainlist.isAccount"
                               :placeholder="$t('materielTransferType.select')">
                        <el-option v-for="item in booleanValue[0]"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('materielTransferType.accountField')"
                              prop="accountField">
                    <el-select clearable
                               size="small"
                               v-model="AddMainlist.accountField"
                               :placeholder="$t('table.select')">
                        <el-option v-for="item in dt_account_field"
                                   :key="item.dictItemKey"
                                   :label="item.dictItemValue"
                                   :value="item.dictItemKey">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('materielTransferType.accountSide')"
                              prop="accountDirection">
                    <el-select clearable
                               size="small"
                               v-model="AddMainlist.accountDirection"
                               :placeholder="$t('materielTransferType.select')">
                        <el-option v-for="item in booleanValue[1]"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('materielTransferType.activityIdentification')"
                              prop="bizTypeFlag">
                    <el-select clearable
                               size="small"
                               v-model="AddMainlist.bizTypeFlag"
                               :placeholder="$t('table.select')">
                        <el-option v-for="item in dt_businesstype_identity"
                                   :key="item.dictItemKey"
                                   :label="item.dictItemValue"
                                   :value="item.dictItemKey">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('materielTransferType.isAutoIndicate')"
                              prop="isTrigProdInd">
                    <el-select clearable
                               size="small"
                               v-model="AddMainlist.isTrigProdInd"
                               :placeholder="$t('materielTransferType.select')">
                        <el-option v-for="item in booleanValue[0]"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('materielTransferType.isAutoProof')"
                              prop="isTrigAutoProof">
                    <el-select clearable
                               size="small"
                               v-model="AddMainlist.isTrigAutoProof"
                               :placeholder="$t('materielTransferType.select')">
                        <el-option v-for="item in booleanValue[0]"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('materielTransferType.reverseBusinessType')"
                              prop="reversalBizType">
                    <el-input v-model="AddMainlist.reversalBizType"></el-input>
                </el-form-item>
                <el-form-item :label="'是否单件'"
                              prop="isSingle">
                    <el-select clearable
                               size="small"
                               @change="forceUpdateSel"
                               v-model="AddMainlist.isSingle"
                               :placeholder="$t('materielTransferType.select')">
                        <el-option v-for="item in booleanValue[0]"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="'是否冲销类型'"
                              prop="isReversal">
                    <el-select clearable
                               size="small"
                               @change="forceUpdateSel"
                               v-model="AddMainlist.isReversal"
                               :placeholder="$t('materielTransferType.select')">
                        <el-option v-for="item in booleanValue[0]"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="'是否集成'"
                              prop="isIntegration">
                    <el-select clearable
                               size="small"
                               @change="forceUpdateSel"
                               v-model="AddMainlist.isIntegration"
                               :placeholder="$t('materielTransferType.select')">
                        <el-option v-for="item in booleanValue[0]"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="'库存类型取值方式'"
                              prop="stockTypeValueMode">
                    <el-select clearable
                               size="small"
                               @change="forceUpdateSel"
                               v-model="AddMainlist.stockTypeValueMode"
                               :placeholder="$t('table.select')">
                        <el-option v-for="item in dt_stockType_valueMode"
                                   :key="item.dictItemKey"
                                   :label="item.dictItemValue"
                                   :value="item.dictItemKey">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="'库位匹配方式'"
                              prop="wareLocationMode">
                    <el-select clearable
                               size="small"
                               @change="forceUpdateSel"
                               v-model="AddMainlist.wareLocationMode"
                               :placeholder="$t('table.select')">
                        <el-option v-for="item in dt_location_match"
                                   :key="item.dictItemKey"
                                   :label="item.dictItemValue"
                                   :value="item.dictItemKey">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="'区位类型'"
                              prop="areaType">
                    <el-select clearable
                               size="small"
                               @change="forceUpdateSel"
                               v-model="AddMainlist.areaType"
                               :placeholder="$t('table.select')">
                        <el-option v-for="item in dt_whpartition_type"
                                   :key="item.dictItemKey"
                                   :label="item.dictItemValue"
                                   :value="item.dictItemKey">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item :label="'质检收货'"
                              prop="qcReceive">
                    <el-select clearable
                               size="small"
                               @change="forceUpdateSel"
                               filterable
                               v-model="AddMainlist.qcReceive">
                        <el-option v-for="item in obList"
                                   :key="item.wareRuleCode"
                                   :label="item.wareRuleCode+'-'+item.wareRuleName"
                                   :value="item.wareRuleCode">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="'免检收货'"
                              prop="unCheckReceive">
                    <el-select clearable
                               size="small"
                               @change="forceUpdateSel"
                               filterable
                               v-model="AddMainlist.unCheckReceive">
                        <el-option v-for="item in obList"
                                   :key="item.wareRuleCode"
                                   :label="item.wareRuleCode+'-'+item.wareRuleName"
                                   :value="item.wareRuleCode">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="'免费收货'"
                              prop="freeReceive">
                    <el-select clearable
                               size="small"
                               @change="forceUpdateSel"
                               filterable
                               v-model="AddMainlist.freeReceive">
                        <el-option v-for="item in obList"
                                   :key="item.wareRuleCode"
                                   :label="item.wareRuleCode+'-'+item.wareRuleName"
                                   :value="item.wareRuleCode">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="'完工关联'"
                              prop="completedLink">
                    <el-select clearable
                               size="small"
                               @change="forceUpdateSel"
                               filterable
                               v-model="AddMainlist.completedLink">
                        <el-option v-for="item in obList"
                                   :key="item.wareRuleCode"
                                   :label="item.wareRuleCode+'-'+item.wareRuleName"
                                   :value="item.wareRuleCode">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="'接口编号'"
                              prop="interfaceNumber">
                    <el-input size="small"
                              v-model="AddMainlist.interfaceNumber"></el-input>
                </el-form-item>
                <el-form-item :label="'外系统业务类型'"
                              prop="exoSystemBizType">
                    <el-input size="small"
                              v-model="AddMainlist.exoSystemBizType"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer"
                 class="dialog-footer">
                <el-button @click="dialogFormVisible=!dialogFormVisible">{{$t('table.cancel')}}</el-button>
                <el-button type="primary"
                           @click="dialogStatus==0?addMainConfirm():updateMainConfirm()">{{$t('table.confirm')}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

import { createRecords, updateRules, queryRecords } from "@/api/data-base/material_transfer_type";
import { mapState } from 'vuex';

export default {
    name: 'addMain',
    data () {
        return {
            booleanValue: [[{
                value: 1,
                label: '是'
            }, {
                value: 0,
                label: '否'
            }], [{
                value: 1,
                label: '+'
            }, {
                value: 0,
                label: '-'
            }]],
            obList: [],//移动类型列表
            referDataSourceList: [],//参照数据来源
            AddMainlist: {
                wareRuleCode: '',
                wareRuleName: '',
                statsClassify: '',
                screenGroupNum: '',
                isProdBatch: '',
                isQcNotice: '',
                refSources: '',
                isSuperIndicaChk: '',
                refUpdate: '',
                isNegativeStockChk: '',
                fetchStockStatArr: [],
                fetchStockStat: '',
                fetchStockTypeArr: [],
                fetchStockType: '',
                storeStockStat: '',
                storeStockType: '',
                isAccount: '',
                accountField: '',
                accountDirection: '',
                bizTypeFlag: '',
                isTrigProdInd: '',
                isTrigAutoProof: '',
                reversalBizType: '',
                completedLink: '',
                stockTypeValueMode: '',
                wareLocationMode: '',
                areaType: '',
                isSingle: '',
                isIntegration: '',
                qcReceive: '',
                unCheckReceive: '',
                freeReceive: '',
                interfaceNumber: '',
                isReversal: '',
                exoSystemBizType: '',
            },
            dialogStatus: 0,
            dialogFormVisible: false,
            rules: {
                wareRuleCode: [
                    { required: true, message: this.$t('validate.required'), trigger: 'blur' }
                ],
                wareRuleName: [
                    { required: true, message: this.$t('validate.required'), trigger: 'blur' }
                ]
            }
        }
    },
    created () {
        this.referDataSourceList = [];
    },
    computed: {
        ...mapState({
            dt_statistic_type: state => state.dict.dt_statistic_type,
            dt_referdata_resource: state => state.dict.dt_referdata_resource,
            dt_stock_type: state => state.dict.dt_stock_type,
            dt_stock_status: state => state.dict.dt_stock_status,
            dt_businesstype_identity: state => state.dict.dt_businesstype_identity,
            dt_account_field: state => state.dict.dt_account_field,
            dt_stockType_valueMode: state => state.dict.dt_stockType_valueMode,
            dt_location_match: state => state.dict.dt_location_match,
            dt_whpartition_type: state => state.dict.dt_whpartition_type
        })
    },
    mounted () {
        this.$store.dispatch('dict/getDicData', ['dt_statistic_type', 'dt_referdata_resource', 'dt_stock_type', 'dt_stock_status', 'dt_businesstype_identity', 'dt_account_field', 'dt_stockType_valueMode', 'dt_location_match', 'dt_whpartition_type']);
    },
    methods: {
        forceUpdateSel () {
            this.$forceUpdate();
        },
        getAttrRule () {
            queryRecords().then(res => {
                this.obList = res.data;
            })
        },
        addMainConfirm () {
            this.$refs.AddMainlist.validate((valid) => {
                if (valid) {
                    this.$confirm('确认保存吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        if (this.AddMainlist.fetchStockStatArr.length) {
                            this.AddMainlist.fetchStockStat = this.AddMainlist.fetchStockStatArr.join(',');
                        } else {
                            this.AddMainlist.fetchStockStat = '';
                        }
                        if (this.AddMainlist.fetchStockTypeArr.length) {
                            this.AddMainlist.fetchStockType = this.AddMainlist.fetchStockTypeArr.join(',');
                        } else {
                            this.AddMainlist.fetchStockType = '';
                        }
                        let conData = Object.assign({}, this.AddMainlist);
                        delete conData.fetchStockStatArr;
                        delete conData.fetchStockTypeArr;
                        createRecords(conData).then(() => {
                            this.$message({
                                type: 'success',
                                message: '保存成功'
                            });
                            this.$emit('refreshTable')
                            this.dialogFormVisible = false;
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    });
                } else {
                    return false;
                }
            })
        },
        updateMainConfirm () {
            this.$refs.AddMainlist.validate((valid) => {
                if (valid) {

                    this.$confirm('确认保存吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        if (this.AddMainlist.fetchStockStatArr.length) {
                            this.AddMainlist.fetchStockStat = this.AddMainlist.fetchStockStatArr.join(',');
                        } else {
                            this.AddMainlist.fetchStockStat = '';
                        }
                        if (this.AddMainlist.fetchStockTypeArr.length) {
                            this.AddMainlist.fetchStockType = this.AddMainlist.fetchStockTypeArr.join(',');
                        } else {
                            this.AddMainlist.fetchStockType = '';
                        }
                        let conData = Object.assign({}, this.AddMainlist);
                        delete conData.fetchStockStatArr;
                        delete conData.fetchStockTypeArr;
                        updateRules(this.AddMainlist.wareRuleCode, this.AddMainlist).then(() => {
                            this.$message({
                                type: 'success',
                                message: '保存成功'
                            });
                            this.$emit('refreshTable')
                            this.dialogFormVisible = false;
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    });
                } else {
                    return false
                }
            })
        },
        resetForm () {
            setTimeout(() => {
                console.log('11111', this.AddMainlist);
                this.$refs.AddMainlist.resetFields();
            }, 0)
        },
        // changeCompletedLink(){
        //     console.log(this.AddMainlist);
        // }
    }
}
</script>