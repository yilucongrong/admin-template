<template>
    <div>
        <el-dialog class="form_dialog"
                   width="50%"
                   top="10vh"
                   custom-class="dialog-custom"
                   :title="dialogStatus == 0 ? $t('table.add') : $t('table.edit')"
                   :close-on-click-modal="false"
                   :visible.sync="dialogFormVisible">
            <el-form :rules="rules"
                     :model="AddMainlist"
                     ref="AddMainlist"
                     label-width="130px"
                     :inline="true"
                     class="demo-form-inline dialog_form">
                <el-form-item :label="$t('barCodeRules.ruleDescribe')"
                              prop="ruleDescribe">
                    <el-input size="small"
                              v-model="AddMainlist.ruleDescribe"></el-input>
                </el-form-item>
                <el-form-item :label="$t('barCodeRules.ruleType')"
                              prop="ruleType">
                    <el-select @change="ruleTypeChange"
                               size="small"
                               v-model="AddMainlist.ruleType"
                               :placeholder="'请选择'"
                               clearable>
                        <el-option v-for="item in dt_rules_type"
                                   :key="item.dictItemKey"
                                   :label="item.dictItemValue"
                                   :value="item.dictItemKey">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('barCodeRules.arrivalCompany')"
                              prop="arrivalCompany">
                    <AuthoType :selectType="1"
                               v-model="AddMainlist.arrivalCompany"></AuthoType>
                </el-form-item>
            </el-form>
            <div class="oprate_btn">
                <el-button class="filter-item"
                           size="small"
                           type="primary"
                           @click="addSub"
                           icon="el-icon-plus">{{ $t('table.add') }}</el-button>
                <el-button class="filter-item"
                           size="small"
                           type="primary"
                           @click="deleteContent"
                           icon="el-icon-delete">{{ $t('table.delete') }}</el-button>
            </div>
            <div class="table-container">
                <el-table :data="barcodeRuleDetails"
                          border
                          fit
                          height="320px"
                          highlight-current-row
                          style="width: 100%;"
                          ref="detailtable"
                          @row-click="mainRowClick"
                          @selection-change="addSelectChange"
                          size="mini"
                          cell-class-name="table-cell"
                          header-cell-class-name="header-cell">
                    <el-table-column type="selection"
                                     fixed
                                     width="30"
                                     align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     :label="$t('barCodeRules.seq')"
                                     prop="seq">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.seq"
                                      type="text"
                                      required></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     align="left"
                                     :label="$t('barCodeRules.rulePrepName')"
                                     prop="rulePrepName"></el-table-column>
                </el-table>
            </div>

            <div slot="footer"
                 class="dialog-footer">
                <el-button @click="dialogFormVisible = !dialogFormVisible">{{
                    $t('table.cancel')
                }}</el-button>
                <el-button type="primary"
                           @click="
                        dialogStatus == 0
                            ? addMainConfirm()
                            : updateMainConfirm()
                    ">{{ $t('table.confirm') }}</el-button>
            </div>
        </el-dialog>
        <dialogAddSub @setRulesContent="setRulesContent"
                      ref="addSubDialog"
                      :contentList="AddMainlist"></dialogAddSub>
    </div>
</template>

<script>
import * as api from '@/api/data-base/bar_code_rules'
import dialogAddSub from './dialogAddSub.vue'
import AuthoType from '@/components/Select/AuthoType.vue' //权限类型下拉组件
import { mapState } from 'vuex'

export default {
    name: 'addMain',
    components: { dialogAddSub, AuthoType },
    data () {
        return {
            AddMainlist: {
                ruleDescribe: '',
                ruleType: '',
                arrivalCompany: '',
                barcodeRuleDetails: [] //所有的内容
            },
            barcodeRuleDetails: [], //所有的内容
            lastBarcodeRuleDetails: [], //打开时的内容
            selectedBarcodeRuleDetails: [], //选中添加的内容
            rowId: '',
            dialogStatus: 0,
            dialogFormVisible: false,
            selectRows: [],
            rules: {
                ruleDescribe: [
                    { required: true, message: '不能为空', trigger: 'blur' },
                    {
                        max: 100,
                        message: '颜色名称长度不能超过100',
                        trigger: 'blur'
                    }
                ],
                ruleType: [
                    { required: true, message: '请选择', trigger: 'blur' }
                ],
                arrivalCompany: [
                    { required: true, message: '请选择', trigger: 'blur' }
                ],
                seq: [{ required: true, message: '不能为空', trigger: 'blur' }]
            }
        }
    },
    computed: {
        ...mapState({
            dt_rules_type: state => state.dict.dt_rules_type
        })
    },
    mounted () {
        this.$store.dispatch('dict/getDicData', ['dt_rules_type'])
    },
    methods: {
        //新增
        addMainConfirm () {
            this.$refs.AddMainlist.validate(valid => {
                if (this.checkSeq()) {
                    if (valid) {
                        this.$confirm('确认保存吗?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        })
                            .then(() => {
                                this.AddMainlist.barcodeRuleDetails = this.barcodeRuleDetails
                                api.addRules(
                                    this.AddMainlist,
                                    this.AddMainlist.ruleType
                                ).then(() => {
                                    this.$message({
                                        type: 'success',
                                        message: '保存成功'
                                    })
                                })
                                this.$emit('refreshTable')
                                this.dialogFormVisible = false
                            })
                            .catch(() => {
                                this.$message({
                                    type: 'info',
                                    message: '已取消'
                                })
                            })
                    } else {
                        return false
                    }
                }
            })
        },
        //编辑
        updateMainConfirm () {
            this.$refs.AddMainlist.validate(valid => {
                if (this.checkSeq()) {
                    if (valid) {
                        this.$confirm('确认保存吗?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        })
                            .then(() => {
                                this.AddMainlist.barcodeRuleDetails = this.barcodeRuleDetails
                                api.updateRules(
                                    this.rowId,
                                    this.AddMainlist,
                                    this.AddMainlist.ruleType
                                ).then(() => {
                                    this.$message({
                                        type: 'success',
                                        message: '保存成功'
                                    })
                                    this.$emit('refreshTable')
                                    this.dialogFormVisible = false
                                })
                            })
                            .catch(() => {
                                this.$message({
                                    type: 'info',
                                    message: '已取消'
                                })
                            })
                    } else {
                        return false
                    }
                }
            })
        },
        //添加项
        addSub () {
            if (this.AddMainlist.ruleType) {
                this.$refs.addSubDialog.selectedList = this.barcodeRuleDetails
                this.$refs.addSubDialog.listQuery.ruleType = this.AddMainlist.ruleType
                this.$refs.addSubDialog.getAlternativeList()
                this.$refs.addSubDialog.dialogFormVisible = true
            } else {
                this.$message.warning('请先选择规则类型！')
            }
        },
        //删除内容某一行
        deleteContent () {
            if (this.selectRows) {
                this.$confirm('确认要删除该数据?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        if (this.selectRows.barcodeRuleId) {
                            this.lastBarcodeRuleDetails = this.lastBarcodeRuleDetails.filter(
                                item => {
                                    return (
                                        item.rulePrepCode !==
                                        this.selectRows.rulePrepCode
                                    )
                                }
                            )
                            this.combineBarcodeRuleDetails()
                            let rulePrepCode = this.selectRows.rulePrepCode
                            api.deleteDetail(
                                this.rowId,
                                rulePrepCode,
                                this.selectRows.ruleType
                            ).then(() => {
                                this.selectedBarcodeRuleDetails = this.selectedBarcodeRuleDetails.filter(
                                    item => {
                                        return (
                                            item.rulePrepCode !== rulePrepCode
                                        )
                                    }
                                )
                                this.$message({
                                    type: 'success',
                                    message: '删除成功'
                                })
                            })
                        } else {
                            this.selectedBarcodeRuleDetails = this.selectedBarcodeRuleDetails.filter(
                                item => {
                                    return (
                                        item.rulePrepCode !==
                                        this.selectRows.rulePrepCode
                                    )
                                }
                            )
                            this.combineBarcodeRuleDetails()
                        }
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        })
                    })
            } else {
                this.$message.warning('请勾选一条记录！')
                return
            }
        },
        setRulesContent (val) {
            this.selectedBarcodeRuleDetails = val
            this.combineBarcodeRuleDetails()
            this.$refs.addSubDialog.dialogFormVisible = false
        },
        addSelectChange (val) {
            this.selectRows = val[val.length - 1]
            if (val.length > 1) {
                this.$refs.detailtable.clearSelection()
                this.$refs.detailtable.toggleRowSelection(
                    val[val.length - 1],
                    'selected'
                )
            }
        },
        mainRowClick (val) {
            this.selectRows = val
            this.$refs.detailtable.clearSelection()
            this.$refs.detailtable.toggleRowSelection(val, 'selected')
        },
        //合并已有和已选
        combineBarcodeRuleDetails () {
            this.barcodeRuleDetails = []
            this.lastBarcodeRuleDetails.forEach(item => {
                this.barcodeRuleDetails.push(item)
            })
            this.selectedBarcodeRuleDetails.forEach(item => {
                this.barcodeRuleDetails.push(item)
            })
        },
        //规则类型变化重新赋值
        ruleTypeChange () {
            this.barcodeRuleDetails = []
        },
        //检查顺序
        checkSeq () {
            let detail = this.barcodeRuleDetails
            let seqArr = new Array()
            for (let i = 0; i < detail.length; i++) {
                if (!detail[i].seq) {
                    this.$message({
                        type: 'error',
                        message: '请填写顺序'
                    })
                    return false
                } else if (
                    !detail[i].seq.toString().match(/^(0|\+?[1-9][0-9]*)$/)
                ) {
                    this.$message({
                        type: 'error',
                        message: '请填写正整数'
                    })
                    return false
                } else {
                    seqArr.push(parseInt(detail[i].seq))
                }
            }
            let arrf = Array.from(new Set(seqArr))

            if (seqArr.length !== arrf.length) {
                this.$message({
                    type: 'error',
                    message: '顺序不能相同'
                })
                return false
            } else {
                return true
            }
        }
    }
}
</script>
