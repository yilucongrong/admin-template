<template>
    <div>
        <el-dialog width="70%"
                   :close-on-click-modal="false"
                   top="10vh"
                   custom-class="dialog-custom"
                   :title="dialogStatus == 0 ? $t('table.add') : $t('table.edit')"
                   :visible.sync="dialogFormVisible">
            <el-form ref="subform"
                     :rules="rules"
                     :model="AddSublist"
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
                    <el-form-item :label="$t('materielTransferType.updateObject')"
                                  prop="updateObject">
                        <template slot-scope="{ row }">
                            <el-select clearable
                                       v-if="dialogStatus == 0"
                                       @change="changeObject(row)"
                                       size="small"
                                       filterable
                                       v-model="AddSublist.updateObject"
                                       :placeholder="
                                    $t('materielTransferType.updateObject')
                                ">
                                <el-option v-for="item in obList"
                                           :key="item.rowId"
                                           :label="item.remark"
                                           :value="item.referentObject">
                                </el-option>
                            </el-select>
                            <el-select clearable
                                       v-else
                                       disabled
                                       @change="changeObject(row)"
                                       size="small"
                                       filterable
                                       v-model="AddSublist.updateObject"
                                       :placeholder="
                                    $t('materielTransferType.updateObject')
                                ">
                                <el-option v-for="item in obList"
                                           :key="item.rowId"
                                           :label="item.remark"
                                           :value="item.referentObject">
                                </el-option>
                            </el-select>
                        </template>
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
                    <el-form-item :label="$t('materielTransferType.serviceName')"
                                  prop="serviceName">
                        <el-input size="small"
                                  v-model="AddSublist.serviceName"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('materielTransferType.updatePrimaryKeyOne')"
                                  prop="updatePrimaryKeyOne">
                        <el-input size="small"
                                  v-model="AddSublist.updatePrimaryKeyOne"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('materielTransferType.updatePrimaryKeyTwo')"
                                  prop="updatePrimaryKeyTwo">
                        <el-input size="small"
                                  v-model="AddSublist.updatePrimaryKeyTwo"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('materielTransferType.linkPrimaryKeyOne')"
                                  prop="linkPrimaryKeyOne">
                        <el-input size="small"
                                  v-model="AddSublist.linkPrimaryKeyOne"></el-input>
                    </el-form-item>

                    <el-form-item :label="$t('materielTransferType.linkPrimaryKeyTwo')"
                                  prop="linkPrimaryKeyTwo">
                        <el-input size="small"
                                  v-model="AddSublist.linkPrimaryKeyTwo"></el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item :label="$t('materielTransferType.Introduction')"
                                  prop="description"
                                  style="width:100%;">
                        <el-input type="textarea"
                                  :rows="2"
                                  style="width:900px;"
                                  v-model="AddSublist.description"></el-input>
                    </el-form-item>
                </el-row>
            </el-form>
            <div class="oprate_btn">
                <el-button class="filter-item"
                           size="small"
                           type="primary"
                           @click="addTableRow"
                           icon="el-icon-plus">{{ $t('table.add') }}</el-button>
                <el-button class="filter-item"
                           size="small"
                           type="primary"
                           @click="deleteTableRow"
                           icon="el-icon-delete">{{ $t('table.delete') }}</el-button>
            </div>
            <div class="table-container">
                <el-table :data="AddSublist.wareRuleTriggerDetails"
                          border
                          fit
                          highlight-current-row
                          @selection-change="selectRow"
                          size="mini"
                          cell-class-name="table-cell"
                          header-cell-class-name="header-cell">
                    <el-table-column type="selection"
                                     fixed
                                     width="30"
                                     align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     align="left"
                                     :label="$t('materielTransferType.updateField')"
                                     prop="refItemRowId">
                        <template slot-scope="{ row }">
                            <el-select clearable
                                       size="small"
                                       @change="setUpdateConfig(row)"
                                       v-model="row.refItemRowId"
                                       :placeholder="$t('materielTransferType.select')">
                                <el-option v-for="item in referData"
                                           :key="item.rowId"
                                           :label="
                                        item.attributeCode +
                                            '-' +
                                            item.attributeName
                                    "
                                           :value="item.rowId">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     align="left"
                                     :label="$t('materielTransferType.updateDir')"
                                     prop="updateDirection">
                        <template slot-scope="{ row }">
                            <el-select clearable
                                       size="small"
                                       v-model="row.updateDirection"
                                       :placeholder="$t('materielTransferType.select')">
                                <el-option v-for="item in booleanValue[2]"
                                           :key="item.value"
                                           :label="item.label"
                                           :value="item.value">
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
    createSub1,
    updateSub1,
    getAttrRules,
    getAttrRulesDetail
} from '@/api/data-base/material_transfer_type'
import { mapState } from 'vuex'
export default {
    name: 'addSub1',
    components: {},
    data () {
        return {
            referData: [],
            booleanValue: [
                [
                    {
                        value: '1',
                        label: '是'
                    },
                    {
                        value: '0',
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
            selectRows: [],
            obList: [],
            obListDefault: [],
            AddSublist: {
                wareRuleCode: '',
                wareRuleName: '',
                refRowId: '', //更新对象id
                objectType: '', //主体或明细
                updateObject: '', //更新对象code
                status: '',
                description: '',
                refSources: '',
                linkPrimaryKeyOne: '',
                linkPrimaryKeyTwo: '',
                updatePrimaryKeyOne: '',
                serviceName: '',
                updatePrimaryKeyTwo: '',
                wareRuleTriggerDetails: []
            },
            dialogStatus: 0,
            dialogFormVisible: false,
            rules: {
                refSources: [
                    {
                        required: true,
                        message: this.$t('validate.required'),
                        trigger: 'blur'
                    }
                ],
                updateObject: [
                    {
                        required: true,
                        message: this.$t('validate.required'),
                        trigger: 'blur'
                    }
                ],
                status: [
                    {
                        required: true,
                        message: this.$t('validate.required'),
                        trigger: 'blur'
                    }
                ],
                updatePrimaryKeyTwo: [
                    {
                        required: true,
                        message: this.$t('validate.required'),
                        trigger: 'blur'
                    }
                ],
                serviceName: [
                    {
                        required: true,
                        message: this.$t('validate.required'),
                        trigger: 'blur'
                    }
                ],
                updatePrimaryKeyOne: [
                    {
                        required: true,
                        message: this.$t('validate.required'),
                        trigger: 'blur'
                    }
                ],
                linkPrimaryKeyOne: [
                    {
                        required: true,
                        message: this.$t('validate.required'),
                        trigger: 'blur'
                    }
                ],
                linkPrimaryKeyTwo: [
                    {
                        required: true,
                        message: this.$t('validate.required'),
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
        getAttrRule (val) {
            let queryRules = {
                referentType: val
            }
            getAttrRules(queryRules).then(res => {
                this.obListDefault = res.data
                this.obList = res.data
            })
        },
        changeObject () {
            this.AddSublist.wareRuleTriggerDetails = []
            this.setObject()
        },
        setObject () {
            this.obList.forEach(item => {
                if (item.referentObject === this.AddSublist.updateObject) {
                    this.AddSublist.refRowId = item.rowId
                    this.AddSublist.objectType = item.objectType
                }
            })
        },
        addSubConfirm () {
            this.$refs.subform.validate(valid => {
                if (valid) {
                    createSub1(
                        this.AddSublist.wareRuleCode,
                        this.AddSublist
                    ).then(() => {
                        this.$message.success(this.$t('message.successed'))
                        this.$emit('refresh')
                        this.dialogFormVisible = false
                    })
                }
            })
        },
        updateSubConfirm () {
            this.$refs.subform.validate(valid => {
                if (valid) {
                    updateSub1(
                        this.AddSublist.wareRuleCode,
                        this.AddSublist.updateObject,
                        this.AddSublist
                    ).then(() => {
                        this.$message.success(this.$t('message.successed'))
                        this.$emit('refresh')
                        this.dialogFormVisible = false
                    })
                }
            })
        },
        //编辑时加载行
        setTableRow (id) {
            if (this.referData.length === 0) {
                getAttrRulesDetail(id).then(res => {
                    this.referData = res.data
                })
            }
        },
        addTableRow () {
            if (this.AddSublist.updateObject) {
                if (
                    this.AddSublist.wareRuleTriggerDetails.length === 0 ||
                    this.referData.length === 0
                ) {
                    getAttrRulesDetail(this.AddSublist.refRowId).then(res => {
                        this.referData = res.data
                        let newValue = {
                            refItemRowId: null,
                            updateConfig: '',
                            updateConfigName: '',
                            updateDirection: '',
                            updateObject: this.AddSublist.updateObject,
                            wareRuleCode: this.AddSublist.wareRuleCode
                        }
                        this.AddSublist.wareRuleTriggerDetails.push(newValue)
                    })
                } else {
                    let newValue = {
                        refItemRowId: null,
                        updateConfig: '',
                        updateConfigName: '',
                        updateDirection: '',
                        updateObject: this.AddSublist.updateObject,
                        wareRuleCode: this.AddSublist.wareRuleCode
                    }
                    this.AddSublist.wareRuleTriggerDetails.push(newValue)
                }
            } else {
                this.$message.warning('请先选择更新对象')
            }
        },
        deleteTableRow () {
            this.AddSublist.wareRuleTriggerDetails = this.AddSublist.wareRuleTriggerDetails.filter(
                item => {
                    if (item.updateConfig === this.selectRows[0].updateConfig) {
                        return false
                    } else {
                        return true
                    }
                }
            )
        },
        //表格勾选框选中
        selectRow (val) {
            this.selectRows = val
        },
        setUpdateConfig (row) {
            this.AddSublist.wareRuleTriggerDetails.forEach((item, index) => {
                if (item.refItemRowId === row.refItemRowId) {
                    this.referData.forEach(itemr => {
                        if (itemr.rowId === item.refItemRowId) {
                            this.AddSublist.wareRuleTriggerDetails[
                                index
                            ].updateConfig = itemr.attributeCode
                            this.AddSublist.wareRuleTriggerDetails[
                                index
                            ].updateConfigName = itemr.attributeName
                        }
                    })
                }
            })
        },
        //change事件
        getAttrRuleChange (val) {
            let queryRules = {
                referentType: val
            }
            getAttrRules(queryRules).then(res => {
                this.obList = res.data
            })
        },
        //选择参照数据来源变化时状态变化
        changeReferData (val) {
            if (val) {
                this.getAttrRuleChange(val)
            } else {
                this.obList = this.obListDefault
            }
        }
    }
}
</script>
