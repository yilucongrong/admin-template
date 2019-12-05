// 物料主数据物料选择,查询设置的物料选择，基础数据设置物料的选择

<template>
    <div class="tab_container">
        <el-tabs v-model="activeName2" type="card">
            <el-tab-pane :label="$t('table.tbSelected')"
                         name="first">
                <div class="filter-container border_b_1">
                    <el-select style="width:120px" size="small" v-model="listQuery.materielType" placeholder="物料类型" clearable @keyup.enter.native="handleQuery" >
                        <el-option v-for="item in dt_materiel_type" :key="item.dictItemKey" :label="item.dictItemValue"
                                    :value="item.dictItemKey">
                        </el-option>
                    </el-select>
                    <el-select style="width:120px" size="small" v-model="listQuery.materielClassify" placeholder="物料分类" clearable @keyup.enter.native="handleQuery" >
                        <el-option v-for="item in dt_materiel_classify" :key="item.dictItemKey" :label="item.dictItemValue"
                                    :value="item.dictItemKey">
                        </el-option>
                    </el-select>
                    <el-select style="width:120px" size="small" v-model="listQuery.materielGroup" placeholder="物料组" clearable @keyup.enter.native="handleQuery" >
                        <el-option v-for="item in dt_materiel_group" :key="item.dictItemKey" :label="item.dictItemValue"
                                    :value="item.dictItemKey">
                        </el-option>
                    </el-select>
                    <el-input style="width:120px" size="small" :placeholder="$t('poFormulation.materielCode')" v-model="listQuery.materielCode" class="filter-item"  @keyup.enter.native="handleQuery"/>
                    <el-input style="width:120px" size="small" :placeholder="$t('poFormulation.materielName')" v-model="listQuery.materielName" class="filter-item"  @keyup.enter.native="handleQuery"/>

                    <el-button class="filter-item" type="primary" size="small" icon="el-icon-search" @click="handleQuery">{{$t('btn.query')}}</el-button>
                </div>
                <div class="table-container">
                    <el-table ref="tbselect"
                            :key="tableKey"
                            :data="list"
                            border
                            fit
                            height="305px"
                            highlight-current-row
                            style="width: 100%;"
                            @select='selectMain'
                            size="mini"
                            cell-class-name="table-cell"
                            header-cell-class-name="header-cell">
                        <el-table-column type="selection" fixed width="30" align="center"></el-table-column>
                        <el-table-column show-overflow-tooltip width="120" align="center" label="物料编码" prop="materielCode"></el-table-column>
                        <el-table-column show-overflow-tooltip width="120" align="center" label="物料名称(中文)" prop="materielName"></el-table-column>
                        <el-table-column show-overflow-tooltip width="120" align="center" label="物料名称(英文)" prop="materielEngName"></el-table-column>
                        <el-table-column show-overflow-tooltip width="120" align="center" label="物料类型" prop="materielTypeName"></el-table-column>
                        <el-table-column show-overflow-tooltip width="120" align="center" label="物料分类" prop="materielClassifyName"></el-table-column>
                        <el-table-column show-overflow-tooltip width="120" align="center" label="物料组" prop="materielGroupName"></el-table-column>
                        <el-table-column show-overflow-tooltip width="120" align="center" label="规格" prop="specification"></el-table-column>
                        <el-table-column show-overflow-tooltip width="120" align="center" label="材质" prop="materialQuality"></el-table-column>
                        <el-table-column show-overflow-tooltip width="80" align="center" label="计量单位" prop="measuringUnitName"></el-table-column>
                        <el-table-column show-overflow-tooltip width="120" align="center" label="外部物料编码" prop="externalMaterielCode"></el-table-column>
                        <el-table-column show-overflow-tooltip width="80" align="center" label="重量(KG）" prop="weight"></el-table-column>
                        <el-table-column show-overflow-tooltip width="80" align="center" label="体积(CM³)" prop="volume"></el-table-column>
                        <el-table-column show-overflow-tooltip width="80" align="center" label="长(CM)" prop="length"></el-table-column>
                        <el-table-column show-overflow-tooltip width="80" align="center" label="宽(CM)" prop="width"></el-table-column>
                        <el-table-column show-overflow-tooltip width="80" align="center" label="高(CM)" prop="height"></el-table-column>
                        <el-table-column show-overflow-tooltip width="80" align="center" label="保质期(天)" prop="shelfLife"></el-table-column>
                        <el-table-column show-overflow-tooltip width="80" align="center" label="产品等级" prop="classStandard"></el-table-column>
                        <el-table-column show-overflow-tooltip width="120" align="center" label="产品标准" prop="productStandard"></el-table-column>
                        <el-table-column show-overflow-tooltip width="80" align="center" label="生产状态" prop="productionStateName"></el-table-column>
                        <el-table-column show-overflow-tooltip width="80" align="center" label="重保标记">
                        <template slot-scope="scope">
                            {{ [scope.row.importantMaterielMark, TWO_STATE_OPTIONS] | optionsFilter }}
                        </template>
                        </el-table-column>
                        <el-table-column show-overflow-tooltip width="200" align="center" label="备注" prop="remark"></el-table-column>
                    </el-table>
                    <pagination :total="total"
                                :page.sync="listQuery.currentPage"
                                :limit.sync="listQuery.pageSize"
                                @pagination="getList" />
                </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('table.selected')"
                         name="second">
                <div class="table-container">
                    <el-table :key="'2'"
                            :data="listSelected"
                            border
                            fit
                            height="305px"
                            highlight-current-row
                            style="width: 100%;"
                            size="mini"
                            cell-class-name="table-cell"
                            header-cell-class-name="header-cell">
                        <el-table-column type="selection" fixed width="30" align="center"></el-table-column>
                        <el-table-column show-overflow-tooltip width="120" align="center" label="物料编码" prop="materielCode"></el-table-column>
                        <el-table-column show-overflow-tooltip width="120" align="center" label="物料名称(中文)" prop="materielName"></el-table-column>
                        <el-table-column show-overflow-tooltip width="120" align="center" label="物料名称(英文)" prop="materielEngName"></el-table-column>
                        <el-table-column show-overflow-tooltip width="120" align="center" label="物料类型" prop="materielTypeName"></el-table-column>
                        <el-table-column show-overflow-tooltip width="120" align="center" label="物料分类" prop="materielClassifyName"></el-table-column>
                        <el-table-column show-overflow-tooltip width="120" align="center" label="物料组" prop="materielGroupName"></el-table-column>
                        <el-table-column show-overflow-tooltip width="120" align="center" label="规格" prop="specification"></el-table-column>
                        <el-table-column show-overflow-tooltip width="120" align="center" label="材质" prop="materialQuality"></el-table-column>
                        <el-table-column show-overflow-tooltip width="80" align="center" label="计量单位" prop="measuringUnitName"></el-table-column>
                        <el-table-column show-overflow-tooltip width="120" align="center" label="外部物料编码" prop="externalMaterielCode"></el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import { queryRecords } from '@/api/data-base/materiel'
import Pagination from "@/components/Pagination";
import { DICT_CODE, TWO_STATE_OPTIONS} from "@/utils/constant";
import {mapState} from 'vuex';


export default {
    name: "wlxz",
    components: { Pagination},
    props:['unMutiple'],
    data () {
        return {
            list: null,
            listSelected:[],
            total: 0,
            parentsRows:null,
            listQuery: {
                currentPage: 1,
                pageSize: 10,
                materielCode: undefined,//物料编码
                materielName: undefined,//物料名称
                materielType: undefined,//类型
                materielClassify: undefined,//分类
                materielGroup: undefined//物料组
            },
            selectCode: [],
            tableKey: 0,
            activeName2:'first',
            DICT_CODE: DICT_CODE,
            TWO_STATE_OPTIONS: TWO_STATE_OPTIONS,
        };
    },
    computed:{
        ...mapState({
            dt_materiel_classify:state=>state.dict.dt_materiel_classify,
            dt_materiel_group:state=>state.dict.dt_materiel_group,
            dt_materiel_type:state=>state.dict.dt_materiel_type,
        })
    },
    mounted(){
        this.$store.dispatch('dict/getDicData',['dt_materiel_classify','dt_materiel_group','dt_materiel_type']);
    },
    methods: {
        checked(i){
            this.$refs.tbselect.toggleRowSelection(this.list[i],true);
        },
        getList() {
            queryRecords(this.listQuery).then(res => {
                res = res.data;
                this.list = res.list;
                this.total = res.pages.count;
                if(this.listSelected){
                    this.listSelected.forEach(items=>{
                        this.list.forEach((item,index)=>{
                            if(item.materielCode===items.materielCode){
                                this.$nextTick(function(){
                                    this.checked(index)
                                })
                            }
                        })
                    })
                }
            });
        },
        handleQuery() {
            this.listQuery.currentPage = 1;
            this.getList();
        },
        handleSizeChange(val) {
            this.listQuery.pageSize = val;
            this.getList();
        },
        handleCurrentChange(val) {
            this.listQuery.currentPage = val;
            this.getList();
        },
        //检查是否取消勾选
        checkUnsel(val, row){
            let isuncheck = true;
            val.forEach(item=>{
                if(item.materielCode===row.materielCode){
                isuncheck = false;
                }
            });
            return isuncheck;
        },
        selectMain(val, row){
            if(this.unMutiple){
                let isuncheck = this.checkUnsel(val, row);
                if(!isuncheck){
                    let arr = [];
                    arr.push(val[val.length-1])
                    this.listSelected=arr;
                    if (val.length > 1) {
                        this.$refs.tbselect.clearSelection()
                        this.$refs.tbselect.toggleRowSelection(val[val.length-1],'selected')
                    }
                }else{
                    this.listSelected=[];
                }
            }else{
                let isuncheck = this.checkUnsel(val, row);
                if(!isuncheck){
                    if(this.listSelected){
                        val.forEach((items,indexv)=>{
                            let isSelected = false;
                            this.listSelected.forEach((item)=>{
                                if(item.materielCode===items.materielCode){
                                    isSelected=true
                                }
                            })
                            if(!isSelected){
                                this.listSelected.push(val[indexv]);
                            }
                        })
                    }else{
                        this.listSelected=val;
                    }
                }else{
                    this.listSelected = this.listSelected.filter(item=>{
                        return item.materielCode!==row.materielCode;
                    })
                }
            }
        }
    }
};
</script>
