<template>
    <div>
        <el-dialog class="form_dialog"
                   width="50%"
                   top="10vh"
                   custom-class="dialog-custom"
                   title="规则字段"
                   :close-on-click-modal="false"
                   :visible.sync="dialogFormVisible">
            <el-form label-width="130px"
                     :inline="true"
                     class="demo-form-inline dialog_form">
                <el-form-item :label="$t('barCodeRules.ruleType')"
                              prop="ruleType">
                    <el-select size="small"
                               disabled
                               v-model="listQuery.ruleType"
                               :placeholder="'请选择'"
                               clearable>
                        <el-option v-for="item in dt_rules_type"
                                   :key="item.dictItemKey"
                                   :label="item.dictItemValue"
                                   :value="item.dictItemKey">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-button class="filter-item"
                           type="primary"
                           size="small"
                           icon="el-icon-search"
                           @click="handleQuery">{{ $t('table.search') }}</el-button>
            </el-form>
            <div class="tab_container">
                <el-tabs type="border-card"
                         class="border_t_1">
                    <el-tab-pane :label="$t('table.tbSelected')">
                        <div class="table-container">
                            <el-table :data="alternativeList"
                                      border
                                      fit
                                      highlight-current-row
                                      @selection-change="alterSelectChange"
                                      size="mini"
                                      cell-class-name="table-cell"
                                      header-cell-class-name="header-cell">
                                <el-table-column type="selection"
                                                 fixed
                                                 width="30"
                                                 align="center"></el-table-column>
                                <el-table-column show-overflow-tooltip
                                                 align="left"
                                                 :label="$t('barCodeRules.rulePrepCode')"
                                                 prop="rulePrepCode"></el-table-column>
                                <el-table-column show-overflow-tooltip
                                                 align="left"
                                                 :label="$t('barCodeRules.contentDesc')"
                                                 prop="rulePrepName"></el-table-column>
                            </el-table>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane :label="$t('table.selected')">
                        <div class="table-container">
                            <el-table :data="checkedList"
                                      border
                                      fit
                                      highlight-current-row
                                      size="mini"
                                      cell-class-name="table-cell"
                                      header-cell-class-name="header-cell">
                                <el-table-column show-overflow-tooltip
                                                 align="left"
                                                 :label="$t('barCodeRules.rulePrepCode')"
                                                 prop="rulePrepCode"></el-table-column>
                                <el-table-column show-overflow-tooltip
                                                 align="left"
                                                 :label="$t('barCodeRules.contentDesc')"
                                                 prop="rulePrepName"></el-table-column>
                            </el-table>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div slot="footer"
                 class="dialog-footer">
                <el-button @click="dialogFormVisible = !dialogFormVisible">{{
                    $t('table.cancel')
                }}</el-button>
                <el-button type="primary"
                           @click="addSubConfirm">{{
                    $t('table.confirm')
                }}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import * as api from '@/api/data-base/bar_code_rules'
import { mapState } from 'vuex'

export default {
    name: 'addContent',
    data () {
        return {
            total: 0,
            AddContentlist: [],
            alternativeList: [],
            selectedList: [],
            checkedList: [],
            dialogFormVisible: false,
            listQuery: {
                ruleType: ''
            }
        }
    },
    created () { },
    computed: {
        ...mapState({
            dt_rules_type: state => state.dict.dt_rules_type
        })
    },
    mounted () {
        this.$store.dispatch('dict/getDicData', ['dt_rules_type'])
    },
    methods: {
        getAlternativeList () {
            api.getRulesPreps(this.listQuery.ruleType).then(res => {
                res = res.data.filter(item => {
                    for (let i = 0; i < this.selectedList.length; i++) {
                        if (
                            this.selectedList[i].rulePrepCode ===
                            item.rulePrepCode
                        ) {
                            return false
                        }
                    }
                    return true
                })
                this.alternativeList = res
            })
        },
        //确认添加内容
        addSubConfirm () {
            this.$emit('setRulesContent', this.checkedList)
        },
        handleQuery () { },
        alterSelectChange (val) {
            this.checkedList = val
        }
    }
}
</script>
