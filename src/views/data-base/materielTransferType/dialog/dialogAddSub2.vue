<template>
    <div>
        <el-dialog class="form_dialog"
                   width="75%"
                   top="10vh"
                   custom-class="dialog-custom"
                   :title="dialogStatus == 0 ? $t('table.add') : $t('table.edit')"
                   :close-on-click-modal="false"
                   :visible.sync="dialogFormVisible">
            <el-form :rules="rules"
                     :model="AddSublist"
                     ref="AddSublist"
                     label-width="130px"
                     :inline="true"
                     class="demo-form-inline dialog_form">
                <el-row>
                    <el-form-item :label="$t('materielTransferType.transferTypeCode')"
                                  prop="wareRuleCode">
                        <el-input size="small"
                                  v-model="AddSublist.wareRuleCode"
                                  disabled></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('materielTransferType.transferTypeName')"
                                  prop="wareRuleName">
                        <el-input size="small"
                                  v-model="AddSublist.wareRuleName"
                                  disabled></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('materielTransferType.indicateBizType')"
                                  prop="targetWareRuleCode">
                        <el-select clearable
                                   v-if="dialogStatus == 0"
                                   @change="changeItype"
                                   size="small"
                                   filterable
                                   v-model="AddSublist.targetWareRuleCode"
                                   :placeholder="$t('materielTransferType.select')">
                            <el-option v-for="item in indicateBizTypeList"
                                       :label="
                                    item.wareRuleCode + '--' + item.wareRuleName
                                "
                                       :key="item.wareRuleCode"
                                       :value="item.wareRuleCode">
                            </el-option>
                        </el-select>
                        <el-select clearable
                                   v-else
                                   @change="changeItype"
                                   size="small"
                                   filterable
                                   v-model="AddSublist.targetWareRuleCode"
                                   :placeholder="$t('materielTransferType.select')">
                            <el-option v-for="item in indicateBizTypeList"
                                       :label="
                                    item.wareRuleCode + '--' + item.wareRuleName
                                "
                                       :key="item.wareRuleCode"
                                       :value="item.wareRuleCode">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('materielTransferType.referDataSource')"
                                  prop="refSources">
                        <el-select clearable
                                   @change="changeReferData"
                                   size="small"
                                   v-model="AddSublist.refSources"
                                   :placeholder="$t('table.select')">
                            <el-option v-for="item in dt_referdata_resource"
                                       :key="item.dictItemKey"
                                       :label="item.dictItemValue"
                                       :value="item.dictItemKey">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('materielTransferType.state')"
                                  prop="status">
                        <el-select clearable
                                   size="small"
                                   v-model="AddSublist.status"
                                   :placeholder="$t('materielTransferType.select')">
                            <el-option v-for="item in booleanValue[1]"
                                       :key="item.value"
                                       :label="item.label"
                                       :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('materielTransferType.mainUpdateObject')"
                                  prop="mainUpdateObject">
                        <el-input :disabled="isEditO"
                                  size="small"
                                  v-model="AddSublist.mainUpdateObject"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('materielTransferType.detailUpdateObject')"
                                  prop="detailUpdateObject">
                        <el-input :disabled="isEditO"
                                  size="small"
                                  v-model="AddSublist.detailUpdateObject"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('materielTransferType.serviceNamefw')"
                                  prop="serviceName">
                        <el-input size="small"
                                  v-model="AddSublist.serviceName"></el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item :label="$t('materielTransferType.Introduction')"
                                  prop="description"
                                  style="width:100%;">
                        <el-input type="textarea"
                                  :rows="2"
                                  style="width:800px;"
                                  v-model="AddSublist.description"></el-input>
                    </el-form-item>
                </el-row>
            </el-form>

            <div class="table-container">
                <el-table :data="AddSublist.wareRuleHandleDetails"
                          border
                          fit
                          highlight-current-row
                          size="mini"
                          cell-class-name="table-cell"
                          header-cell-class-name="header-cell">
                    <el-table-column show-overflow-tooltip
                                     align="left"
                                     :label="$t('materielTransferType.rowNo')"
                                     prop="targetRefItemRowId">
                    </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     align="left"
                                     :label="$t('materielTransferType.indicateHead')"
                                     prop="objectType">
                        <template slot-scope="{ row }">
                            {{ row.objectType == 1 ? '主体' : '明细' }}
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     align="left"
                                     :label="$t('materielTransferType.indicateCode')"
                                     prop="targetConfigCode">
                    </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     align="left"
                                     :label="$t('materielTransferType.indicateName')"
                                     prop="targetConfigName">
                    </el-table-column>
                    {{ proofList }}
                    <el-table-column show-overflow-tooltip
                                     align="left"
                                     :label="$t('materielTransferType.corAttrName')"
                                     prop="sourceConfigCode">
                        <template slot-scope="{ row }">
                            <el-select clearable
                                       size="small"
                                       @change="setCorAttrName(row)"
                                       filterable
                                       v-model="row.sourceConfigCode"
                                       :placeholder="$t('materielTransferType.select')">
                                <el-option v-for="item in proofList"
                                           :label="
                                        item.objectType +
                                            '-' +
                                            item.attributeName
                                    "
                                           :key="item.attributeCode"
                                           :value="item.attributeCode">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <div slot="footer"
                 class="dialog-footer">
                <el-button @click="dialogFormVisible = !dialogFormVisible">{{
                    $t('table.cancel')
                }}</el-button>
                <el-button type="primary"
                           @click="
                        dialogStatus == 0 ? addSubConfirm() : updateSubConfirm()
                    ">{{ $t('table.confirm') }}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
    createSubLeft,
    updateSubLeft,
    getAttrRules,
    getPIList
} from '@/api/data-base/material_transfer_type'
import { mapState } from 'vuex'
export default {
    name: 'addSub2',
    components: {},
    props: ['statisticTypeList'],
    data () {
        return {
            isEditO: false,
            booleanValue: [
                [
                    {
                        value: 1,
                        label: '是'
                    },
                    {
                        value: 0,
                        label: '否'
                    }
                ],
                [
                    {
                        value: 1,
                        label: '有效'
                    },
                    {
                        value: 0,
                        label: '无效'
                    }
                ],
                [
                    {
                        value: 1,
                        label: '+'
                    },
                    {
                        value: 0,
                        label: '-'
                    }
                ]
            ],
            proofList: [],
            AddSublist: {
                wareRuleCode: '',
                wareRuleName: '',
                targetWareRuleCode: '',
                status: '',
                description: '',
                wareRuleHandleDetails: []
            },
            indicateBizTypeList: [],
            dialogStatus: 0,
            dialogFormVisible: false,
            rules: {
                mainUpdateObject: [
                    {
                        required: true,
                        message: '主体更新对象不能为空',
                        trigger: 'blur'
                    }
                ],
                detailUpdateObject: [
                    {
                        required: true,
                        message: '明细更新对象不能为空',
                        trigger: 'blur'
                    }
                ],
                serviceName: [
                    {
                        required: true,
                        message: 'service服务名称不能为空',
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    mounted () {
        this.$store.dispatch('dict/getDicData', ['dt_referdata_resource'])
    },
    computed: {
        ...mapState({
            dt_referdata_resource: state => state.dict.dt_referdata_resource
        })
    },
    methods: {
        addSubConfirm () {
            console.log(33333, this.AddSublist)
            createSubLeft(
                this.AddSublist.wareRuleCode,
                this.AddSublist,
                'i'
            ).then(() => {
                this.$message({
                    type: 'success',
                    message: '添加成功'
                })
                this.$emit('refresh')
                this.dialogFormVisible = false
            })
        },
        updateSubConfirm () {
            console.log(44444, this.AddSublist)
            updateSubLeft(
                this.AddSublist.wareRuleCode,
                this.AddSublist.rowId,
                this.AddSublist,
                'i'
            ).then(() => {
                this.$message({
                    type: 'success',
                    message: '编辑成功'
                })
                this.$emit('refresh')
                this.dialogFormVisible = false
            })
        },
        setCorAttrName (row) {
            let attributeName = ''
            let rowId = ''
            this.proofList.forEach(item => {
                if (item.attributeCode === row.sourceConfigCode) {
                    attributeName = item.attributeName
                    rowId = item.rowId
                }
            })

            this.AddSublist.wareRuleHandleDetails.forEach((item, index) => {
                if (item.targetRefItemRowId === row.targetRefItemRowId) {
                    this.AddSublist.wareRuleHandleDetails[
                        index
                    ].sourceConfigName = attributeName
                    this.AddSublist.wareRuleHandleDetails[
                        index
                    ].sourceRefItemRowId = rowId
                }
            })
        },
        //指示凭证变化
        changeItype () {
            // this.AddSublist.wareRuleHandleDetails=[];
            // let refSources = '';
            // console.log(this.indicateBizTypeList);
            // this.indicateBizTypeList.forEach((item,index)=>{
            //     if(item.wareRuleCode===this.AddSublist.targetWareRuleCode){
            //         refSources = item.refSources;
            //     }
            // });
            // let queryRules = {
            //     referentType:refSources
            // }
            // getAttrRules(queryRules).then(res=>{
            //     res.forEach(item=>{
            //         this.setDetail(item.rowId,item.objectType);
            //     })
            // })
        },
        checkVal () {
            if (!this.AddSublist.targetWareRuleCode) {
                return { state: false, info: '请选择指示类型' }
            }
            if (!this.AddSublist.wareRuleHandleDetails) {
                return { state: false, info: '请选择对应指示名称' }
            } else if (this.AddSublist.wareRuleHandleDetails.length) {
                for (
                    let i = 0;
                    i < this.AddSublist.wareRuleHandleDetails.length;
                    i++
                ) {
                    if (
                        !this.AddSublist.wareRuleHandleDetails[i]
                            .sourceConfigCode
                    ) {
                        return { state: false, info: '请选择对应指示名称' }
                    }
                }
            }
            return { state: true, info: '检验通过' }
        },
        setDetail (rowId, objectType) {
            console.log(11111, rowId, objectType)
            getPIList(rowId).then(resi => {
                for (let j = 0; j < resi.data.length; j++) {
                    this.AddSublist.wareRuleHandleDetails.push({
                        targetRefRowId: rowId,
                        targetRefItemRowId: resi.data[j].rowId,
                        objectType: objectType,
                        targetConfigCode: resi.data[j].attributeCode,
                        targetConfigName: resi.data[j].attributeName
                    })
                }
            })
        },
        //选择参照数据来源变化时状态变化
        changeReferData (val) {
            let queryRules = {
                referentType: val
            }
            getAttrRules(queryRules).then(res => {
                this.AddSublist.wareRuleHandleDetails = []
                this.isEditO = false
                res.data.forEach(item => {
                    if (item.objectType === 1) {
                        this.AddSublist.mainUpdateObject = item.referentObject
                    } else if (item.objectType === 2) {
                        this.AddSublist.detailUpdateObject = item.referentObject
                    }
                    this.setDetail(item.rowId, item.objectType)
                })
                this.isEditO = true
            })
        }
    }
}
</script>
