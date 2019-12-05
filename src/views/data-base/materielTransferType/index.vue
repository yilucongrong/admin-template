<template>
    <div class="app-container">
        <div class="filter-container">
            <div class="filter-items">
                <el-input size="small" :placeholder="$t('materielTransferType.transferTypeCode')" v-model="listMainQuery.wareRuleCode" class="filter-item" @keyup.enter.native="handleQuery"/>
                <el-input size="small" :placeholder="$t('materielTransferType.transferTypeName')" v-model="listMainQuery.wareRuleName" class="filter-item" @keyup.enter.native="handleQuery"/>
                <el-select size="small" v-model="listMainQuery.statsClassify" :placeholder="$t('materielTransferType.statisticType')" clearable >
                    <el-option v-for="item in dt_statistic_type" :key="item.dictItemKey" :label="item.dictItemValue"
                                :value="item.dictItemKey">
                    </el-option>
                </el-select>
                <el-button class="filter-item" type="primary" size="small" icon="el-icon-search" @click="handleQuery" >{{$t('table.search')}}</el-button>
            </div>
        </div>
        <div class="table-container">
            <!--主表-->
            <div class="oprate_btn">
                <el-button class="filter-item" size="small" type="primary" @click="addMain" icon="el-icon-plus">{{$t('table.add')}}</el-button>
                <el-button class="filter-item" size="small" type="primary" @click="updateMain" icon="el-icon-edit">{{$t('table.edit')}}</el-button>
                <el-button class="filter-item" size="small" type="primary" @click="deleteMain" icon="el-icon-delete">{{$t('table.delete')}}</el-button>
                <el-button size="small" class="filter-item" type="primary" icon="el-icon-document-copy"  @click="handleCopy">拷贝</el-button>
            </div>
            <el-table
                :data="listMain"
                border
                fit
                height="320px"
                highlight-current-row
                style="width: 100%;"
                ref="tbmain"
                @selection-change='mainSelectChange' size="mini" cell-class-name="table-cell" header-cell-class-name="header-cell"
                @row-click='showTabTable'>
                <el-table-column type="selection" fixed width="30" align="center"></el-table-column>
                <el-table-column show-overflow-tooltip width="120" fixed align="left" :label="$t('materielTransferType.transferTypeCode')" prop="wareRuleCode"></el-table-column>
                <el-table-column show-overflow-tooltip width="120" fixed align="left" :label="$t('materielTransferType.transferTypeName')" prop="wareRuleName"></el-table-column>
                <el-table-column show-overflow-tooltip width="120" align="left" :label="$t('materielTransferType.statisticType')" prop="statsClassifyName"></el-table-column>
                <el-table-column show-overflow-tooltip width="120" align="left" :label="$t('materielTransferType.isProBatch')" prop="isProdBatch">
                    <template slot-scope="scope" >
                        {{scope.row.isProdBatch=='1'?'是':'否'}}
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip width="120" align="left"  :label="$t('materielTransferType.isProQC')" prop="isQcNotice">
                    <template slot-scope="scope" >
                        {{scope.row.isQcNotice=='1'?'是':'否'}}
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip width="120" align="left" :label="$t('materielTransferType.referDataSource')" prop="refSourcesName"></el-table-column>
                <el-table-column show-overflow-tooltip width="120" align="left"  :label="$t('materielTransferType.isOverCheck')" prop="isSuperIndicaChk">
                    <template slot-scope="scope" >
                        {{scope.row.isSuperIndicaChk=='1'?'是':'否'}}
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip width="120" align="left"  :label="$t('materielTransferType.isNegativeCheck')" prop="isNegativeStockChk">
                    <template slot-scope="scope" >
                        {{scope.row.isNegativeStockChk=='1'?'是':'否'}}
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip width="120" align="left"  :label="$t('materielTransferType.isDataUpdate')" prop="refUpdate">
                    <template slot-scope="scope" >
                        {{scope.row.refUpdate=='1'?'是':'否'}}
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip width="120" align="left" :label="$t('materielTransferType.getStockState')" prop="fetchStockStatName"></el-table-column>
                <el-table-column show-overflow-tooltip width="120" align="left" :label="$t('materielTransferType.getStockType')" prop="fetchStockTypeName"></el-table-column>
                <el-table-column show-overflow-tooltip width="120" align="left" :label="$t('materielTransferType.setStockState')" prop="storeStockStatName"></el-table-column>
                <el-table-column show-overflow-tooltip width="120" align="left" :label="$t('materielTransferType.setStockType')" prop="storeStockTypeName"></el-table-column>
                <el-table-column show-overflow-tooltip width="120" align="left" :label="$t('materielTransferType.isAccount')" prop="isAccount">
                    <template slot-scope="scope" >
                        {{scope.row.isAccount=='1'?'是':'否'}}
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip width="120" align="left" :label="$t('materielTransferType.accountField')" prop="accountFieldName"></el-table-column>
                <el-table-column show-overflow-tooltip width="120" align="left" :label="$t('materielTransferType.accountSide')" prop="accountDirection">
                    <template slot-scope="scope" >
                        {{scope.row.accountDirection==1?'+':'-'}}
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip width="120" align="left" :label="$t('materielTransferType.activityIdentification')" prop="bizTypeFlagName"></el-table-column>
                <el-table-column show-overflow-tooltip width="120" align="left" :label="$t('materielTransferType.displayGroup')" prop="screenGroupNum"></el-table-column>
                <el-table-column show-overflow-tooltip width="120" align="left" :label="$t('materielTransferType.isAutoIndicate')" prop="isTrigProdInd">
                    <template slot-scope="scope" >
                        {{scope.row.isTrigProdInd=='1'?'是':'否'}}
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip width="120" align="left" :label="$t('materielTransferType.isAutoProof')" prop="isTrigAutoProof">
                    <template slot-scope="scope" >
                        {{scope.row.isTrigAutoProof=='1'?'是':'否'}}
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip width="120" align="left" :label="$t('materielTransferType.reverseBusinessType')" prop="reversalBizType"></el-table-column>
            </el-table>
            <pagination :total="total" :page.sync="listMainQuery.currentPage"
                :limit.sync="listMainQuery.pageSize" @pagination="getMainList"  class="pagination-container border_b_1"/>
        
        <!--tab+3个从表-->
        <div class="tab_container ">
            <el-tabs class="transform  no_t_border" type="card">
                <el-tab-pane class="no_b_margin" :label="$t('materielTransferType.referenceDataUpdate')">
                    <!-- <hr class="hrLineStyle"> -->
                    <div class="oprate_btn">
                        <el-button class="filter-item" size="small" type="primary" @click="addSub(1)" icon="el-icon-plus">{{$t('table.add')}}</el-button>
                        <el-button class="filter-item" size="small" type="primary" @click="updateSub(1)" icon="el-icon-edit">{{$t('table.edit')}}</el-button>
                        <el-button class="filter-item" size="small" type="primary" @click="deleteSub(1)" icon="el-icon-delete">{{$t('table.delete')}}</el-button>
                    </div>
                    <el-table 
                        :data="tabList1"
                        border
                        fit
                        highlight-current-row
                        style="width: 100%;"
                        ref = "tabsub1"
                        @selection-change='subSelectChange1' size="mini" cell-class-name="table-cell" header-cell-class-name="header-cell"
                        @row-click='showSubDetail1'>
                        <el-table-column type="selection" fixed width="30" align="center"></el-table-column>
                        <el-table-column show-overflow-tooltip  align="left" :label="$t('materielTransferType.transferTypeName')" prop="wareRuleCode"></el-table-column>
                        <el-table-column show-overflow-tooltip  align="left" :label="$t('materielTransferType.updateReferDes')" prop="description"></el-table-column>
                        <el-table-column show-overflow-tooltip  align="left" :label="$t('materielTransferType.updateObject')" prop="updateObject"></el-table-column>
                        <el-table-column show-overflow-tooltip  align="left" :label="$t('materielTransferType.state')" prop="status">
                            <template slot-scope="scope" >
                                {{scope.row.status=='1'?'有效':'无效'}}
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="table_tag">
                        {{$t('materielTransferType.updateFieldInfo')}}
                    </div>
                    <hr class="hrLineStyle">
                    <el-table 
                        :data="tabDetail1"
                        border
                        fit
                        highlight-current-row
                        style="width: 100%;"
                        size="mini" cell-class-name="table-cell" header-cell-class-name="header-cell">
                        <!-- <el-table-column show-overflow-tooltip  align="left" :label="$t('materielTransferType.rowNo')" prop="rowId">
                        </el-table-column> -->
                        <el-table-column show-overflow-tooltip  align="left" :label="$t('materielTransferType.transferTypeName')" prop="wareRuleCode"></el-table-column>
                        <el-table-column show-overflow-tooltip  align="left" :label="$t('materielTransferType.updateTable')" prop="updateConfigName"></el-table-column>
                        <el-table-column show-overflow-tooltip  align="left" :label="$t('materielTransferType.updateField')" prop="updateConfig"></el-table-column>
                        <el-table-column show-overflow-tooltip  align="left" :label="$t('materielTransferType.updateDir')" prop="updateDirection">
                            <template slot-scope="scope" >
                                {{scope.row.updateDirection=='1'?'+':'-'}}
                            </template>
                        </el-table-column>
                    </el-table>
                
                </el-tab-pane>
                <el-tab-pane :label="$t('materielTransferType.automaticGenOfIndDataCate')">
                    <div class="oprate_btn">
                        <el-button class="filter-item" size="small" type="primary" @click="addSub(2)" icon="el-icon-plus">{{$t('table.add')}}</el-button>
                        <el-button class="filter-item" size="small" type="primary" @click="updateSub(2)" icon="el-icon-edit">{{$t('table.edit')}}</el-button>
                        <el-button class="filter-item" size="small" type="primary" @click="deleteSub(2)" icon="el-icon-delete">{{$t('table.delete')}}</el-button>
                    </div>
                    <el-table 
                        :data="tabList2"
                        border
                        fit
                        highlight-current-row
                        style="width: 100%;"
                        ref = "tabsub2"
                        @selection-change='subSelectChange2' size="mini" cell-class-name="table-cell" header-cell-class-name="header-cell"
                        @row-click='showSubDetail2'>
                        <el-table-column type="selection" fixed width="30" align="center"></el-table-column>
                        <el-table-column show-overflow-tooltip  align="left" :label="$t('materielTransferType.transferTypeCode')" prop="wareRuleCode"></el-table-column>
                        <el-table-column show-overflow-tooltip  align="left" :label="$t('materielTransferType.Introduction')" prop="description"></el-table-column>
                        <el-table-column show-overflow-tooltip  align="left" :label="$t('materielTransferType.indicateType')" prop="targetWareRuleCode"></el-table-column>
                        <el-table-column show-overflow-tooltip  align="left" :label="$t('materielTransferType.state')" prop="status">
                            <template slot-scope="scope" >
                                {{scope.row.isTrigProdInd=='1'?'有效':'无效'}}
                            </template>
                        </el-table-column>
                        <el-table-column show-overflow-tooltip  align="left" label="主体更新对象" prop="mainUpdateObject"></el-table-column>
                        <el-table-column show-overflow-tooltip  align="left" label="明细更新对象" prop="detailUpdateObject"></el-table-column>
                        <el-table-column show-overflow-tooltip  align="left" label="service服务名称" prop="serviceName"></el-table-column>
                    </el-table>
                    <div class="table_tag">
                        {{$t('materielTransferType.updateFieldInfo')}}
                    </div>
                    <hr class="hrLineStyle">
                    <el-table 
                        :data="tabDetail2"
                        border
                        fit
                        highlight-current-row
                        style="width: 100%;"
                        size="mini" cell-class-name="table-cell" header-cell-class-name="header-cell">
                        <el-table-column show-overflow-tooltip  align="left" :label="$t('materielTransferType.rowNo')" prop="rowId">
                        </el-table-column>
                        <el-table-column show-overflow-tooltip  align="left" :label="$t('materielTransferType.transferTypeName')" prop="sourceConfigName"></el-table-column>
                        <el-table-column show-overflow-tooltip  align="left" :label="$t('materielTransferType.inputField')" prop="sourceConfigCode"></el-table-column>
                        <el-table-column show-overflow-tooltip  align="left" :label="$t('materielTransferType.autoIndicateType')" prop="targetConfigName"></el-table-column>
                        <el-table-column show-overflow-tooltip  align="left" :label="$t('materielTransferType.indicateField')" prop="targetConfigCode"></el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane :label="$t('materielTransferType.automaticGenOfCerBuCate')">
                    <div class="oprate_btn">
                        <el-button class="filter-item" size="small" type="primary" @click="addSub(3)" icon="el-icon-plus">{{$t('table.add')}}</el-button>
                        <el-button class="filter-item" size="small" type="primary" @click="updateSub(3)" icon="el-icon-edit">{{$t('table.edit')}}</el-button>
                        <el-button class="filter-item" size="small" type="primary" @click="deleteSub(3)" icon="el-icon-delete">{{$t('table.delete')}}</el-button>
                    </div>
                    <el-table 
                        :data="tabList3"
                        border
                        fit
                        highlight-current-row
                        style="width: 100%;"
                        ref = "tabsub3"
                        @selection-change='subSelectChange3' size="mini" cell-class-name="table-cell" header-cell-class-name="header-cell"
                        @row-click='showSubDetail3'>
                        <el-table-column type="selection" fixed width="30" align="center"></el-table-column>
                        <el-table-column show-overflow-tooltip  align="left" :label="$t('materielTransferType.transferTypeCode')" prop="wareRuleCode"></el-table-column>
                        <el-table-column show-overflow-tooltip  align="left" :label="$t('materielTransferType.Introduction')" prop="description"></el-table-column>
                        <el-table-column show-overflow-tooltip  align="left" :label="$t('materielTransferType.autoTransferType')" prop="targetWareRuleCode"></el-table-column>
                        <el-table-column show-overflow-tooltip  align="left" :label="$t('materielTransferType.state')" prop="status">
                            <template slot-scope="scope" >
                                {{scope.row.status=='1'?'有效':'无效'}}
                            </template>
                        </el-table-column>
                        <el-table-column show-overflow-tooltip  align="left" label="主体更新对象" prop="mainUpdateObject"></el-table-column>
                        <el-table-column show-overflow-tooltip  align="left" label="明细更新对象" prop="detailUpdateObject"></el-table-column>
                        <el-table-column show-overflow-tooltip  align="left" label="service服务名称" prop="serviceName"></el-table-column>
                    </el-table>
                    <div class="table_tag">
                        {{$t('materielTransferType.updateFieldInfo')}}
                    </div>
                    <hr class="hrLineStyle">
                    <el-table 
                        :data="tabDetail3"
                        border
                        fit
                        highlight-current-row
                        style="width: 100%;"
                        size="mini" cell-class-name="table-cell" header-cell-class-name="header-cell">
                        <el-table-column show-overflow-tooltip  align="left" :label="$t('materielTransferType.rowNo')" prop="rowId">
                        </el-table-column>
                        <el-table-column show-overflow-tooltip  align="left" :label="$t('materielTransferType.transferTypeName')" prop="sourceConfigName"></el-table-column>
                        <el-table-column show-overflow-tooltip  align="left" :label="$t('materielTransferType.inputField')" prop="sourceConfigCode"></el-table-column>
                        <el-table-column show-overflow-tooltip  align="left" :label="$t('materielTransferType.autoBusinessType')" prop="targetConfigName"></el-table-column>
                        <el-table-column show-overflow-tooltip  align="left" :label="$t('materielTransferType.indicateField')" prop="targetConfigCode"></el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </div>
        </div>
        <!-- 弹框 -->
        <div>
            <!-- 主表新增弹框 -->
            <dialogAddMain @refreshTable="getMainList" ref="addMain"></dialogAddMain>
            <!-- tab新增弹框 -->
            <dialogAddSub1 @refresh="showTab(1)" ref="addSub1"></dialogAddSub1>
            <dialogAddSub2 @refresh="showTab(2)" ref="addSub2"></dialogAddSub2>
            <dialogAddSub3 @refresh="showTab(3)" ref="addSub3"></dialogAddSub3>
            <!-- 复制弹框 -->
            <el-dialog width="50%" top="10vh" custom-class="dialog-custom" :title="'拷贝移动类型'" :close-on-click-modal="false" :visible.sync="copyDialogFormVisible">
                <el-form :rules="copyrules"  :model="copyList" ref="copyForm" label-position="left" label-width="130px" :inline="true" class="demo-form-inline">
                    <el-form-item :label="'原业务类型编码'" prop="oldWareRuleCode">
                        <el-input disabled  size="small" v-model="copyList.oldWareRuleCode"></el-input>
                    </el-form-item>
                    <el-form-item :label="'原业务类型名称'" prop="oldWareRuleName">
                        <el-input disabled  size="small" v-model="copyList.oldWareRuleName"></el-input>
                    </el-form-item>
                    <el-form-item :label="'新业务类型编码'" prop="wareRuleCode">
                        <el-input size="small" v-model="copyList.wareRuleCode"></el-input>
                    </el-form-item>
                    <el-form-item :label="'新业务类型名称'" prop="wareRuleName">
                        <el-input size="small" v-model="copyList.wareRuleName"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="copyDialogFormVisible=!copyDialogFormVisible">{{$t('table.cancel')}}</el-button>
                    <el-button type="primary" @click="confirmCopy">{{$t('table.confirm')}}</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import * as api from "@/api/data-base/material_transfer_type";
import { DICT_CODE } from '@/utils/constant'
import Pagination from "@/components/Pagination";
import dialogAddMain from "./dialog/dialogAddMain";
import dialogAddSub1 from "./dialog/dialogAddSub1";
import dialogAddSub2 from "./dialog/dialogAddSub2";
import dialogAddSub3 from "./dialog/dialogAddSub3";
import {mapState} from 'vuex';


export default {
  name: "materiel_transfer_type",
  components: { Pagination,dialogAddMain,dialogAddSub1,dialogAddSub2,dialogAddSub3},
  data() {
    return {
        total:0,
        DICT_CODE:DICT_CODE,
        listMain:[],
        copyDialogFormVisible:false,//复制弹框
        listMainQuery:{
            wareRuleCode:'',
            wareRuleName:'',
            statsClassify:'',
            currentPage:0,
            pageSize:10
        },
        copyList:{
            wareRuleCode: '',
            wareRuleName:'',
            oldWareRuleCode: '',
            oldWareRuleName:'',
        },
        selectMainRow:[],
        selectTabRow1:null,
        selectTabRow2:null,
        selectTabRow3:null,
        tabIndex:1,//从表索引
        tabList1:[],
        tabList2:[],
        tabList3:[],
        tabDetail1:[],
        tabDetail2:[],
        tabDetail3:[],
        isMainClear:false, //主表是否清空选择
        copyrules:{
                wareRuleCode: [
                    { required: true, message: this.$t('validate.required'), trigger: 'blur' }
                ],
                wareRuleName: [
                    { required: true, message: this.$t('validate.required'), trigger: 'blur' }
                ]
            }
    };
  },
  computed:{
        ...mapState({
            dt_statistic_type:state=>state.dict.dt_statistic_type,
            dt_stock_type:state=>state.dict.dt_stock_type,
            dt_stock_status:state=>state.dict.dt_stock_status,
        })
    },
    mounted(){
        this.$store.dispatch('dict/getDicData',['dt_statistic_type','dt_stock_type','dt_stock_status']);
        this.getMainList();
        this.getProofList();
    },
  methods: {
    //查询
    handleQuery(){
        this.getMainList();
    },
    //获取凭证id和类型
    getProofList(){
        api.getRowId().then(res=>{
            for(let i=0;i<res.data.list.length;i++){
                if(res.data.list[i].referentType==='LC06'){
                    let rowProodId = res.data.list[i].rowId;
                    this.setProofList(rowProodId,res.data.list[i].objectType)
                }
            }
        });
    },
    //处理凭证数据
    setProofList(rowProodId,objectType){
        api.getPIList(rowProodId).then(resp=>{
            // for(let j=0;j<resp.length;j++){
            //     this.$refs.addSub3.AddSublist.wareRuleHandleDetails.push(
            //         {
            //             targetRefRowId:rowProodId,
            //             targetRefItemRowId:resp[j].rowId,
            //             objectType:objectType,
            //             targetConfigCode:resp[j].attributeCode,
            //             targetConfigName:resp[j].attributeName
            //         }
            //     );
            // }
            resp.data.forEach((item)=>{
                item.objectType = objectType;
                this.$refs.addSub2.proofList.push(item);
                this.$refs.addSub3.proofList.push(item);
            })
        })
    },
    //获取主表数据
    getMainList(){
        api.queryRecords(this.listMainQuery).then(res => {
            res.data.list.forEach((item,index)=>{
                res.data.list[index].fetchStockStatArr = res.data.list[index].fetchStockStat.split(',');
                res.data.list[index].fetchStockTypeArr = res.data.list[index].fetchStockType.split(',');
                res.data.list[index].fetchStockStatName = [];
                res.data.list[index].fetchStockTypeName = [];
                res.data.list[index].fetchStockStatArr.forEach(val=>{
                    this.dt_stock_status.forEach(st=>{
                        if(st.dictItemKey===val){
                            res.data.list[index].fetchStockStatName.push(st.dictItemValue);
                        }
                    })
                })

                res.data.list[index].fetchStockTypeArr.forEach(val=>{
                    this.dt_stock_type.forEach(st=>{
                        if(st.dictItemKey===val){
                            res.data.list[index].fetchStockTypeName.push(st.dictItemValue);
                        }
                    })
                })

                res.data.list[index].fetchStockTypeName = res.data.list[index].fetchStockTypeName.join(',');
                res.data.list[index].fetchStockStatName = res.data.list[index].fetchStockStatName.join(',');
            })
            this.listMain = res.data.list;
            this.total = res.data.pages.count;
            // this.showTab();
        });
    },
    //主表行选择变化，显示从表
    mainSelectChange(val){
        if (val.length > 1) {
            this.selectMainRow = val[val.length-1]
            this.$refs.tbmain.clearSelection();
            this.isMainClear = true;
            this.$refs.tbmain.toggleRowSelection(val[val.length-1],'selected');
            this.showTab();
        }else if(val.length!==0 && this.isMainClear){
            this.isMainClear = false;
            this.selectMainRow = val;
            this.showTab();
        }else if(!this.isMainClear&&val.length!==0){
            this.selectMainRow = val;
            this.showTab();
        }else if(!this.isMainClear&&val.length===0){
            this.selectMainRow = val;
            this.tabList1 = [];
            this.tabDetail1 = [];
        }
    },
    //点击行显示从(tab)表
    showTabTable(val){
        this.selectMainRow = val;
        this.$refs.tbmain.clearSelection()
        this.$refs.tbmain.toggleRowSelection(val,'selected')
        this.showTab();
    },
    showTab(i){
        let wareRuleCode = '';
        if(this.selectMainRow){
            if(this.selectMainRow.length){
                wareRuleCode = this.selectMainRow[0].wareRuleCode;
            }
        }else{
            if(this.listMain[0].wareRuleCode)
            wareRuleCode = this.listMain[0].wareRuleCode;
        }
        if(wareRuleCode)
        switch (i){
            case 1:{
                api.querySub1(wareRuleCode).then(res=>{
                    this.tabList1 = res.data;
                    this.tabDetail1=[];
                });
                break;
            }
            case 2:{
                api.querySubLeft(wareRuleCode,'i').then(res=>{
                    this.tabList2 = res.data;
                    this.tabDetail2=[];
                });
                break;
            }
            case 3:{
                api.querySubLeft(wareRuleCode,'p').then(res=>{
                    this.tabList3 = res.data;
                    this.tabDetail3=[];
                });
                break;
            }
            default:{
                api.querySub1(wareRuleCode).then(res=>{
                    this.tabList1 = res.data;
                });
                api.querySubLeft(wareRuleCode,'i').then(res=>{
                    this.tabList2 = res.data;
                });
                api.querySubLeft(wareRuleCode,'p').then(res=>{
                    this.tabList3 = res.data;
                });
            }
        }
    },
    //tab表行选择变化
    subSelectChange1(val){
        this.tabIndex = 1;
        if (val.length > 1) {
            this.selectTabRow1 = val[val.length-1]
            this.$refs.tabsub1.clearSelection()
            this.$refs.tabsub1.toggleRowSelection(val[val.length-1],'selected');
            this.showSub(this.tabIndex);
        }else if(val.length!==0){
            this.selectTabRow1 = val;
            this.showSub(this.tabIndex);
        }
    },
    subSelectChange2(val){
        this.tabIndex = 2;
        if (val.length > 1) {
            this.selectTabRow2 = val[val.length-1]
            this.$refs.tabsub2.clearSelection()
            this.$refs.tabsub2.toggleRowSelection(val[val.length-1],'selected');
            this.showSub(this.tabIndex);
        }else if(val.length!==0){
            this.selectTabRow2 = val;
            this.showSub(this.tabIndex);
        }
    },
    subSelectChange3(val){
        this.tabIndex = 3;
        if (val.length > 1) {
            this.selectTabRow3 = val[val.length-1]
            this.$refs.tabsub3.clearSelection()
            this.$refs.tabsub3.toggleRowSelection(val[val.length-1],'selected');
            this.showSub(this.tabIndex);
        }else if(val.length!==0){
            this.selectTabRow3 = val;
            this.showSub(this.tabIndex);
        }
    },
    //tab从表选择详情
    showSubDetail1(val){
        this.tabIndex = 1;
        this.selectTabRow1 = val;
        this.$refs.tabsub1.clearSelection()
        this.$refs.tabsub1.toggleRowSelection(val,'selected')
        this.showSub(this.tabIndex);
    },
    showSubDetail2(val){
        this.tabIndex = 2;
        this.selectTabRow2 = val;
        this.$refs.tabsub2.clearSelection()
        this.$refs.tabsub2.toggleRowSelection(val,'selected')
        this.showSub(this.tabIndex);
    },
    showSubDetail3(val){
        this.tabIndex = 3;
        this.selectTabRow3 = val;
        this.$refs.tabsub3.clearSelection()
        this.$refs.tabsub3.toggleRowSelection(val,'selected')
        this.showSub(this.tabIndex);
    },
    showSub(i){
        switch (i){
            case 1:{
                let wareRuleCode = '';
                let updateObject = '';
                if(this.selectTabRow1){
                    wareRuleCode = this.selectTabRow1[0].wareRuleCode;
                    updateObject = this.selectTabRow1[0].updateObject;
                }else{
                    wareRuleCode = this.tabList1[0].wareRuleCode;
                    updateObject = this.tabList1[0].updateObject;
                }
                if(wareRuleCode&&updateObject){
                    api.querySub1Row(wareRuleCode,updateObject).then(res=>{
                        this.tabDetail1 = res.data.wareRuleTriggerDetails;
                    })
                }
                break;
            }
            case 2:{
                let wareRuleCode = this.selectTabRow2[0].wareRuleCode;
                let rowId = this.selectTabRow2[0].rowId;
                if(wareRuleCode&&rowId){
                    api.querySubLeftRow(wareRuleCode,rowId).then(res=>{
                        this.tabDetail2 = res.data.wareRuleHandleDetails;
                    })
                }
                break;
            }
            case 3:{
                let wareRuleCode = this.selectTabRow3[0].wareRuleCode;
                let rowId = this.selectTabRow3[0].rowId;
                if(wareRuleCode&&rowId){
                    api.querySubLeftRow(wareRuleCode,rowId).then(res=>{
                        this.tabDetail3 = res.data.wareRuleHandleDetails;
                    })
                }
                break;
            }
        }
    },
    //主表新增（移动类型）
    addMain(){
        this.$refs.addMain.AddMainlist = {
                wareRuleCode:'',
                wareRuleName:'',
                statsClassify:'',
                screenGroupNum:'',
                isProdBatch:'',
                isQcNotice:'',
                refSources:'',
                isSuperIndicaChk:'',
                refUpdate:'',
                isNegativeStockChk:'',
                fetchStockStatArr:[],
                fetchStockStat:'',
                fetchStockTypeArr:[],
                fetchStockType:'',
                storeStockStat:'',
                storeStockType:'',
                isAccount:'',
                accountField:'',
                accountDirection:'',
                bizTypeFlag:'',
                isTrigProdInd:'',
                isTrigAutoProof:'',
                reversalBizType:''
            };
        this.$refs.addMain.resetForm();
        this.$refs.addMain.getAttrRule();
        this.$refs.addMain.dialogFormVisible=true;
        this.$refs.addMain.dialogStatus=0;
    },
    //主表修改（移动类型）
    updateMain(){
        if(this.selectMainRow && this.selectMainRow.length==1){
            this.$refs.addMain.dialogStatus=1;
            this.$refs.addMain.AddMainlist=this.selectMainRow[0];
            this.$refs.addMain.getAttrRule();
            this.$refs.addMain.dialogFormVisible=true;
            this.getMainList();
        }else{
            this.$message({
            title: "警告",
            message: "请选择一条信息",
            type: "warning"
            });
        }
    },
    //主表删除（移动类型）
    deleteMain(){
        if(this.selectMainRow.length===1){
            this.$confirm('确认要删除该条记录吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                api.deleteRules(this.selectMainRow[0].wareRuleCode).then(() => {
                    this.getMainList();
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    });
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });          
            });
        }else{
            this.$message.warning("请勾选一条记录！");
            return;
        }
    },
    //添加从表
    addSub(i){
        switch(i){
            case 1:{
                if(this.selectMainRow && this.selectMainRow.length==1){
                    this.$refs.addSub1.AddSublist.wareRuleCode = this.selectMainRow[0].wareRuleCode;
                    this.$refs.addSub1.AddSublist.wareRuleName = this.selectMainRow[0].wareRuleName;
                    this.$refs.addSub1.AddSublist.wareRuleTriggerDetails = [];
                    this.$refs.addSub1.AddSublist.description = '';
                    this.$refs.addSub1.AddSublist.status = '';
                    this.$refs.addSub1.AddSublist.updateObject = '';
                    this.$refs.addSub1.getAttrRule(this.selectMainRow[0].refSources);
                    this.$refs.addSub1.dialogStatus=0;
                    this.$refs.addSub1.dialogFormVisible=true;
                }else{
                    this.$message({
                        title: this.$t('message.warning'),
                        message: this.$t('message.checkedoneplease'),
                        type: "warning"
                    });
                }
                break;
            }
            case 2:{
                if(this.selectMainRow && this.selectMainRow.length==1){
                    this.$refs.addSub2.AddSublist={
                        wareRuleCode:'',
                        wareRuleName:'',
                        targetWareRuleCode:'',
                        status:'',
                        description:'',
                        wareRuleHandleDetails:[]
                    };
                    this.$refs.addSub2.AddSublist.wareRuleCode = this.selectMainRow[0].wareRuleCode;
                    this.$refs.addSub2.AddSublist.wareRuleName = this.selectMainRow[0].wareRuleName;
                    this.$refs.addSub2.indicateBizTypeList = this.listMain;
                    this.$refs.addSub2.dialogFormVisible=true;
                    this.$refs.addSub2.dialogStatus=0;
                }else{
                    this.$message({
                        title: this.$t('message.warning'),
                        message: this.$t('message.checkedoneplease'),
                        type: "warning"
                    });
                }
                break;
            }
            case 3:{
                if(this.selectMainRow && this.selectMainRow.length==1){
                    this.$refs.addSub3.AddSublist.wareRuleCode = this.selectMainRow[0].wareRuleCode;
                    this.$refs.addSub3.AddSublist.wareRuleName = this.selectMainRow[0].wareRuleName;
                    this.$refs.addSub3.indicateBizTypeList = this.listMain;
                    this.$refs.addSub3.dialogFormVisible=true;
                    this.$refs.addSub3.dialogStatus=0;
                }else{
                    this.$message({
                        title: this.$t('message.warning'),
                        message: this.$t('message.checkedoneplease'),
                        type: "warning"
                    });
                }
               
                break;
            }
        }
    },
    //更新从表
    updateSub(i){
        switch(i){
            case 1:{
                if(this.selectTabRow1 && this.selectTabRow1.length==1){
                    let wareRuleCode = this.selectTabRow1[0].wareRuleCode;
                    let updateObject = this.selectTabRow1[0].updateObject;
                    if(wareRuleCode&&updateObject){
                        api.querySub1Row(wareRuleCode,updateObject).then(res=>{
                            this.$refs.addSub1.AddSublist = res.data;
                            this.$refs.addSub1.setTableRow(res.data.refRowId);
                            this.$refs.addSub1.AddSublist.wareRuleName = this.selectMainRow[0].wareRuleName;
                            this.$refs.addSub1.dialogStatus=1;
                            this.$refs.addSub1.dialogFormVisible=true;
                            this.$refs.addSub1.getAttrRule(this.selectMainRow[0].refSources);
                        })
                    }
                }else{
                    this.$message({
                        title: this.$t('message.warning'),
                        message: this.$t('message.checkedoneplease'),
                        type: "warning"
                    });
                }
                break;
            }
            case 2:{
                if(this.selectTabRow2 && this.selectTabRow2.length==1){
                    let wareRuleCode = this.selectTabRow2[0].wareRuleCode;
                    let rowId = this.selectTabRow2[0].rowId;
                    if(wareRuleCode&&rowId){
                        api.querySubLeftRow(wareRuleCode,rowId).then(res=>{
                            this.$refs.addSub2.AddSublist = res.data;
                            this.$refs.addSub2.indicateBizTypeList = this.listMain;
                            this.$refs.addSub2.dialogStatus=1;
                            this.$refs.addSub2.dialogFormVisible=true;
                        })
                    }
                }else{
                    this.$message({
                        title: this.$t('message.warning'),
                        message: this.$t('message.checkedoneplease'),
                        type: "warning"
                    });
                }
                break;
            }
            case 3:{
                if(this.selectTabRow3 && this.selectTabRow3.length==1){
                    let wareRuleCode = this.selectTabRow3[0].wareRuleCode;
                    let rowId = this.selectTabRow3[0].rowId;
                    if(wareRuleCode&&rowId){
                        api.querySubLeftRow(wareRuleCode,rowId).then(res=>{
                            this.$refs.addSub3.AddSublist = res.data;
                            this.$refs.addSub3.indicateBizTypeList = this.listMain;
                            this.$refs.addSub3.dialogStatus=1;
                            this.$refs.addSub3.dialogFormVisible=true;
                        })
                    }
                }else{
                    this.$message({
                        title: this.$t('message.warning'),
                        message: this.$t('message.checkedoneplease'),
                        type: "warning"
                    });
                }
                break;
            }
        }
    },
    //删除从表
    deleteSub(i){
        switch(i){
            case 1:{
                if(this.selectTabRow1 && this.selectTabRow1.length==1){
                    this.$confirm(this.$t('message.isDeleteContinue'), this.$t('message.prompt'), {
                        confirmButtonText: this.$t('message.confirm'),
                        cancelButtonText: this.$t('message.cancel'),
                        type: 'warning'
                    }).then(() => {
                        let wareRuleCode = this.selectTabRow1[0].wareRuleCode;
                        let updateObject = this.selectTabRow1[0].updateObject;
                        if(wareRuleCode&&updateObject){
                            api.deleteSub1(wareRuleCode,updateObject).then(()=>{
                                this.showTab(1);
                            })
                        }
                    }).catch(() => {
                        this.$message({
                        type: 'info',
                        message: this.$t('message.deleteCanceled')
                        });          
                    });
                }else{
                    this.$message({
                        title: this.$t('message.warning'),
                        message: this.$t('message.checkedoneplease'),
                        type: "warning"
                    });
                }
                break;
            }
            case 2:{
                if(this.selectTabRow2 && this.selectTabRow2.length==1){
                    this.$confirm(this.$t('message.isDeleteContinue'), this.$t('message.prompt'), {
                        confirmButtonText: this.$t('message.confirm'),
                        cancelButtonText: this.$t('message.cancel'),
                        type: 'warning'
                    }).then(() => {
                        let wareRuleCode = this.selectTabRow2[0].wareRuleCode;
                        let rowId = this.selectTabRow2[0].rowId;
                        if(wareRuleCode&&rowId){
                            api.deleteSubLeft(wareRuleCode,rowId).then(()=>{
                                this.$message({
                                    type: 'success',
                                    message: '删除成功'
                                });
                                this.showTab(2);
                            })
                        }
                    }).catch(() => {
                        this.$message({
                        type: 'info',
                        message: this.$t('message.deleteCanceled')
                        });          
                    });
                }else{
                    this.$message({
                        title: this.$t('message.warning'),
                        message: this.$t('message.checkedoneplease'),
                        type: "warning"
                    });
                }
                break;
            }
            case 3:{
                if(this.selectTabRow3 && this.selectTabRow3.length==1){
                    this.$confirm(this.$t('message.isDeleteContinue'), this.$t('message.prompt'), {
                        confirmButtonText: this.$t('message.confirm'),
                        cancelButtonText: this.$t('message.cancel'),
                        type: 'warning'
                    }).then(() => {
                        let wareRuleCode = this.selectTabRow3[0].wareRuleCode;
                        let rowId = this.selectTabRow3[0].rowId;
                        if(wareRuleCode&&rowId){
                            api.deleteSubLeft(wareRuleCode,rowId).then(()=>{
                                this.$message({
                                    type: 'success',
                                    message: '删除成功'
                                });
                                this.showTab(3);
                            })
                        }
                    }).catch(() => {
                        this.$message({
                        type: 'info',
                        message: this.$t('message.deleteCanceled')
                        });          
                    });
                }else{
                    this.$message({
                        title: this.$t('message.warning'),
                        message: this.$t('message.checkedoneplease'),
                        type: "warning"
                    });
                }
                break;
            }
        }
    },
    //拷贝
    handleCopy(){
        if(this.selectMainRow && this.selectMainRow.length==1){
            this.copyDialogFormVisible = true;
            this.copyList.oldWareRuleCode = this.selectMainRow[0].wareRuleCode;
            this.copyList.oldWareRuleName = this.selectMainRow[0].wareRuleName;
        }else{
            this.$message({
                title: this.$t('message.warning'),
                message: this.$t('message.checkedoneplease'),
                type: "warning"
            });
        }
    },
    //拷贝确认
    confirmCopy(){
        this.$refs.copyForm.validate((valid) => {
            if (valid) {
                api.copyType(this.copyList).then(()=>{
                    this.$message({
                        type: 'success',
                        message: '拷贝成功'
                    });
                    this.copyList.wareRuleCode = '';
                    this.copyList.wareRuleName = '';
                    this.copyDialogFormVisible = false;
                    this.getMainList();
                });
            }
        });
    }
  }
};
</script>

<style scoped>
.table_tag{
    padding:5px;
}
</style>