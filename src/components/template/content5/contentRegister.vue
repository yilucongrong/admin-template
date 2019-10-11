<template>
    <div>
        <el-col :span="24">
          <div class="filter-container no_b_padding">
              <div class="filter-items">
                  <el-form  :rules="rules" :model="mainFormList" ref="mainForm" label-position="left" label-width="85px" :inline="true" class="demo-form-inline">
                    <el-row>
                      <el-form-item class="el_form_item5" :label="''" prop="accountDate">
                        <el-date-picker :disabled="isSaveEdit" :placeholder="'记账日期'" size="small" v-model="mainFormList.accountDate" value-format="yyyy-MM-dd"></el-date-picker>
                      </el-form-item>
                                            
                      <el-form-item class="el_form_item5" :label="''" prop="materielCode">
                          <el-input  size="small" v-model="mainFormList.materielCode" :placeholder="'物料编码'" disabled>
                            <el-button :disabled="isEdit" slot="append" icon="el-icon-search" @click="showWlxz"></el-button>
                          </el-input>
                      </el-form-item>
                   
                      <el-form-item label="" prop="materielName">
                          <el-input :placeholder="'物料名称'" size="small" v-model="mainFormList.materielName" class="filter-item" disabled/>
                      </el-form-item>
                      <el-form-item label="" prop="quantity">
                          <el-input :disabled="isSaveEdit" :placeholder="'加工数量'" @blur="calQuantity" size="small" v-model="mainFormList.quantity" class="filter-item" />
                      </el-form-item>
                      <!-- <el-form-item label="批次号" prop="batchNo">
                          <el-input size="small" v-model="mainFormList.batchNo" class="filter-item" />
                      </el-form-item> -->
                      <el-form-item label="" prop="remark">
                          <el-input :disabled="isSaveEdit" :placeholder="'备注'" size="small" v-model="mainFormList.remark" class="filter-item" />
                      </el-form-item>
                      <el-form-item class="el_form_item5" label="" prop="dicType">
                          <changeModuleSelect @changeMoudle="changeMoudle"></changeModuleSelect>
                      </el-form-item>
                    </el-row>
                </el-form>
              </div>
          </div>
          <div class="table-container">
              <div class="oprate_btn">
                  <el-button :disabled="isSaveEdit" v-if="mainFormList.dicType === configBusiness.db" size="small" class="filter-item" type="primary" icon="el-icon-plus" @click="handleAdd">{{$t('table.add')}}</el-button>
                  <el-button :disabled="isSaveEdit" v-if="mainFormList.dicType === configBusiness.db" size="small" class="filter-item" type="primary" icon="el-icon-delete" @click="handleDelete">{{$t('table.delete')}}</el-button>
                  <el-button :disabled="isSaveEdit" size="small" class="filter-item" type="primary" icon="el-icon-check " @click="handleSave">保存</el-button>
                  <el-button size="small" class="filter-item" type="primary" icon="el-icon-refresh-right" @click="handleRefresh">刷新</el-button>
              </div>
              <el-table
                  :data="list"
                  border
                  fit
                  :height="theight"
                  highlight-current-row
                  style="width: 100%;"
                  ref="tbmain"
                  @selection-change='selectRow' size="mini" cell-class-name="table-cell" header-cell-class-name="header-cell"
                  >
                  <el-table-column :disabled="isSaveEdit" type="selection" fixed width="30" align="center"></el-table-column>
                  <el-table-column show-overflow-tooltip width="130" align="left" :label="'物料编码'" prop="materielCode"></el-table-column>
                  <el-table-column show-overflow-tooltip  align="left" :label="'物料名称'" prop="materielName"></el-table-column>
                  <el-table-column show-overflow-tooltip  align="left" :label="'数量'" prop="quantity">
                    <template slot-scope="scope">
                      <el-input :disabled="isSaveEdit" v-model="scope.row.quantity"></el-input>
                    </template>
                  </el-table-column>

                  <el-table-column :key="'0'" v-if="mainFormList.dicType === configBusiness.cz" show-overflow-tooltip  align="left" :label="'库存类型'" prop="stockType">
                    <template slot-scope="scope">
                      <el-select :disabled="isSaveEdit" multiple size="small" v-model="scope.row.stockTypeArr" :placeholder="$t('table.select')">
                        <el-option v-for="item in dt_stock_type" :key="item.dictItemKey" :label="item.dictItemValue"
                              :value="item.dictItemKey">
                        </el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column v-else show-overflow-tooltip  align="left" :label="'库存类型'" prop="stockType">
                    <template slot-scope="scope">
                      <el-select :disabled="isSaveEdit" size="small" v-model="scope.row.stockType" :placeholder="$t('table.select')">
                        <el-option v-for="item in dt_stock_type" :key="item.dictItemKey" :label="item.dictItemValue"
                              :value="item.dictItemKey">
                        </el-option>
                      </el-select>
                    </template>
                  </el-table-column>

                  <el-table-column :key="'1'" v-if="mainFormList.dicType === configBusiness.cz"  show-overflow-tooltip  align="left" :label="'库存状态'" prop="stockState">
                    <template slot-scope="scope">
                      <el-select :disabled="isSaveEdit" multiple size="small" v-model="scope.row.stockStateArr" :placeholder="$t('table.select')">
                        <el-option v-for="item in dt_stock_status" :key="item.dictItemKey" :label="item.dictItemValue"
                              :value="item.dictItemKey">
                        </el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column v-else  show-overflow-tooltip  align="left" :label="'库存状态'" prop="stockState">
                    <template slot-scope="scope">
                      <el-select :disabled="isSaveEdit" size="small" v-model="scope.row.stockState" :placeholder="$t('table.select')">
                        <el-option v-for="item in dt_stock_status" :key="item.dictItemKey" :label="item.dictItemValue"
                              :value="item.dictItemKey">
                        </el-option>
                      </el-select>
                    </template>
                  </el-table-column>

                  <el-table-column show-overflow-tooltip  align="left" :label="'仓库'" prop="warehouseCode"></el-table-column>
                  <el-table-column show-overflow-tooltip  align="left" :label="'库区'" prop="wareAreaCode">
                    <template slot-scope="scope">
                      <el-select :disabled="isSaveEdit" size="small" v-model="scope.row.wareAreaCode" @change="changeAreaSel(scope.row.wareAreaCode,scope.$index)">
                        <el-option v-for="item in areaList" :key="item.areaCode" :label="item.areaName"
                                    :value="item.areaCode">
                        </el-option>
                      </el-select> 
                    </template>
                  </el-table-column>
                  <el-table-column show-overflow-tooltip  align="left" :label="'库位'" prop="wareLocationCode">
                    <template slot-scope="scope">
                      <el-select :disabled="isSaveEdit" size="small" v-model="scope.row.wareLocationCode" >
                        <el-option v-for="item in locatorList[scope.$index]" :key="item.locationCode" :label="item.locationName"
                                    :value="item.locationCode">
                        </el-option>
                      </el-select>     
                    </template>
                  </el-table-column>
                  <!-- <el-table-column show-overflow-tooltip  align="left" :label="'批次'" prop="batchNo">
                    <template slot-scope="scope">
                      <el-input v-model="scope.batchNo"></el-input>
                    </template>
                  </el-table-column> -->
                  <el-table-column show-overflow-tooltip  align="left" :label="'定额'" prop="quota"></el-table-column>
                  <el-table-column show-overflow-tooltip  align="left" :label="'计量单位'" prop="measuringUnit"></el-table-column>
                  <el-table-column show-overflow-tooltip  align="left" :label="'规格型号'" prop="specification"></el-table-column>
              </el-table>
              <pagination :total="total"
                            :size="15"
                            :page.sync="listQuery.currentPage"
                            :limit.sync="listQuery.pageSize"
                            @pagination="getList" />
          </div>
        </el-col>
    </div>
</template>

<script>
import global_valfn from '@/utils/global_valfn'
import changeModuleSelect from '@/components/template/changeMoudleSelect'
import {mapState} from 'vuex';
import Pagination from "@/components/Pagination";

export default {
  name: "wzskncontentRegister",
  components: {changeModuleSelect,Pagination},
  data() {
    return {
        theight: 0,
      list: null,
      listQuery: {
                //查询
                page: true,
                currentPage: 1,
                pageSize: 15
            },
            total: 0,
      listTemp:null,
      mainFormList:{
        orgCode:'',
        accountDate:this.timeFormat()
      },
      configBusiness:{
        db:'0908',
        cz:'0907',
        zz:'0906'
      },
      isEdit:false,
      isSaveEdit:false,
      unMutiplebom:true,
      bomType:'stores_processing_bom',
      businessTypeList:[],
      selectRows:[],
      bomwlxzDialogFormVisible:false,
      bomwlxzRows:[],
      zsjwlxzDialogFormVisible:false,
      zsjwlxzRows:[],
      zsjwlxzAddDialogFormVisible:false,
      zsjwlxzAddRows:[],
      rules: {
        orgCode: [
            { required: true, message: ' ', trigger: 'blur' }
        ],
        warehouseCode: [
            { required: true, message: ' ', trigger: 'blur' }
        ],
        wareAreaCode:[
          { required: true, message: ' ', trigger: 'blur' }
        ],
        wareLocationCode:[
          { required: true, message: ' ', trigger: 'blur' }
        ],
        dicType:[
          { required: true, message: ' ', trigger: 'blur' }
        ],
        materielCode:[
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        materielName:[
          { required: true, message: this.$t('validate.required'), trigger: 'blur' }
        ],
        quantity:[
          { required: true, message: ' ', trigger: 'blur' }
        ]
      },
      slocatorList: [],
      areaList:[],
      locatorList:[],
      saveData:{}//保存的数据
    };
  },
  computed:{
      ...mapState({
          dt_stock_type:state=>state.dict.dt_stock_type,
          dt_stock_status:state=>state.dict.dt_stock_status
      })
  },
  mounted(){
      this.setTableHeight();
        //表格高度自适应
        window.onresize = () => {
            this.setTableHeight()
        };
    //   this.$store.dispatch('getDicData',['dt_stock_type','dt_stock_status']);
  },
  methods: {
      //表格高度计算
        setTableHeight () {
            this.theight = global_valfn.getSingleTbHeight()-25;
        },
    changeMoudle (val) {
        this.$emit('changeSelect', val)
    },
    getList(){},
    //主表勾选框选中
    selectRow(val) {
      this.selectRows = val[val.length-1];
      if (val.length > 1) {
          this.$refs.tbmain.clearSelection()
          this.$refs.tbmain.toggleRowSelection(val[val.length-1],'selected')
      }
      
    },
    setdefault(val,i){
      if(i===1){
        this.listQuery.orgCode = val;
      }else if(i===3){
        this.listQuery.warehouseCode = val;
        this.getList();
      }
    },
    timeFormat() {
        var d = new Date();
        var year = d.getFullYear();       //年  
        var month = d.getMonth() + 1;     //月  
        var day = d.getDate();            //日  
                
        var clock = year + "-";
        if (month < 10)
            clock += "0";
            clock += month + "-";
    
        if (day < 10)
            clock += "0";
            clock += day + " ";
        return (clock);
    },
    // getLocatorList(warehouseCode,areaCode,i){
    //   api.getLocator(warehouseCode,areaCode).then(res=>{
    //     this.$set(this.locatorList, i,res);
    //     this.$set(this.list[i],'wareLocationCode',res[0].locationCode);
    //     this.$set(this.list,i,this.list[i]);
    //   })
    // },
    // getsLocatorList(warehouseCode,areaCode){
    //   api.getLocator(warehouseCode,areaCode).then(res=>{
    //     this.slocatorList = res;
    //     this.$set(this.mainFormList,'wareLocationCode',this.slocatorList[0].locationCode)
    //   })
    // },
    // change(){
    //   api.getArea(this.mainFormList.warehouseCode).then(resa=>{
    //     this.areaList = resa;
    //   })
    // },
    // changeAreaSel(areaCode,i){
    //   this.getLocatorList(this.mainFormList.warehouseCode,areaCode,i)
    // },
    //搜索区位变化
    // changesAreaSel(areaCode){
    //   this.getsLocatorList(this.mainFormList.warehouseCode,areaCode)
    // },
    showWlxz(){
    //   if(!this.mainFormList.orgCode||!this.mainFormList.dicType||!this.mainFormList.warehouseCode||!this.mainFormList.wareAreaCode||!this.mainFormList.wareLocationCode){
    //     this.$message({
    //       title: this.$t("message.warning"),
    //       message: '请先选择组织编码、仓库编码、业务类型、库区及库位',
    //       type: "warning"
    //     });
    //   }else{
    //     if(this.mainFormList.dicType === this.configBusiness.db){
    //       this.zsjwlxzDialogFormVisible = true;
    //       this.$nextTick(()=>{
    //         // this.$refs.zsjwlxzRef.listSelected = this.mainFormList;
    //         this.$refs.zsjwlxzRef.getList();
    //       })
    //     }else{
    //       this.bomwlxzDialogFormVisible = true;
    //     }
    //   }
    },
    handlebomwlClick(val) {
      this.bomwlxzRows = {};
      this.listTemp = [];
      this.bomwlxzRows = val.v1;
      this.listTemp = val.v2;
    },
    bomwlConfirm() {
      //物料选中中弹窗确认按钮
      if (this.bomwlxzRows.materielCode) {
        this.list = [];
        this.mainFormList.materielCode = this.bomwlxzRows.materielCode;
        this.mainFormList.materielName = this.bomwlxzRows.materielName;
        
        this.listTemp.map(item=>{
          item.warehouseCode = this.mainFormList.warehouseCode;
          item.quota = this.mainFormList.dicType==='0906'?item.assemblingNum:item.dismantlingNum
        });
        this.list = this.listTemp;
        this.listTemp = [];
        this.isEdit = true;
        this.bomwlxzDialogFormVisible = false;
        // api.getArea(this.mainFormList.warehouseCode).then(resa=>{
        //   this.areaList = resa;
        //   this.isEdit = true;
        //   this.bomwlxzDialogFormVisible = false;
        // })
      } else {
        this.$message({
          title: this.$t("message.warning"),
          message: this.$t("message.checkedplease"),
          type: "warning"
        });
      }
    },
    zsjwlConfirm() {
      //库内换号物料选中中弹窗确认按钮
      if(this.$refs.zsjwlxzRef.listSelected.length>0){
        this.mainFormList.materielCode = this.$refs.zsjwlxzRef.listSelected[0].materielCode;
        this.mainFormList.materielName = this.$refs.zsjwlxzRef.listSelected[0].materielName;
        this.isEdit = true;
        this.zsjwlxzDialogFormVisible = false;
      }else{
        this.$message({
          title: this.$t("message.warning"),
          message: this.$t("message.checkedplease"),
          type: "warning"
        });
      }
    },
    zsjwlAddConfirm() {
      //库内换号新增物料选中中弹窗确认按钮
      if(this.$refs.zsjwlxzAddRef.listSelected.length>0){
        this.list = [];
        let selecteda = this.$refs.zsjwlxzAddRef.listSelected;
        selecteda.forEach((item)=>{
          item.warehouseCode = this.mainFormList.warehouseCode;
          item.quota = 1;
        });
        this.list = [...selecteda];
        this.isEdit = true;
        this.zsjwlxzAddDialogFormVisible = false;
        // api.getArea(this.mainFormList.warehouseCode).then(resa=>{
        //   this.areaList = resa;
        //   this.isEdit = true;
        //   this.zsjwlxzAddDialogFormVisible = false;
        // })
      }else{
        this.$message({
          title: this.$t("message.warning"),
          message: this.$t("message.checkedplease"),
          type: "warning"
        });
      }
    },
    //换号新增弹框显示
    handleAdd(){
      if(!this.mainFormList.orgCode||!this.mainFormList.dicType||!this.mainFormList.warehouseCode||!this.mainFormList.wareAreaCode||!this.mainFormList.wareLocationCode){
        this.$message({
          title: this.$t("message.warning"),
          message: '请先选择组织编码、仓库编码、业务类型、库区及库位',
          type: "warning"
        });
      }else{
        this.zsjwlxzAddDialogFormVisible = true;
        this.$nextTick(()=>{
          if(this.list){
            this.$refs.zsjwlxzAddRef.listSelected =[...this.list];
          }
          this.$refs.zsjwlxzAddRef.getList();
        })
      }
    },
    //删除
    handleDelete(){
      
    },
    //保存
    handleSave(){
      this.$refs.mainForm.validate((valid) => {
          if (valid) {
              let saveData = {
                orgCode:'',
                warehouseCode:'',
                dicType:'',
                relationDicType:'',
                accountDate:'',
                processingAssemblyDTO:{},
                assemblyDetailDTOSs:[]
              }
          
              for(let key in this.mainFormList){
                if(key==='orgCode'||key==='warehouseCode'||key==='dicType'||key==='relationDicType'||key==='accountDate'){
                  saveData[key] = this.mainFormList[key]
                }else if(key==='materielCode'||key==='materielName'||key==='measuringUnit'||key==='wareAreaCode'||key==='wareLocationCode'||key==='stockState'||key==='stockType'||key==='quantity'){
                  saveData.processingAssemblyDTO[key] = this.mainFormList[key];
                }
              }
              this.list.forEach((item,index)=>{
                saveData.assemblyDetailDTOSs.push({});
                for(let key in item){
                  if(key==='materielCode'||key==='materielName'||key==='measuringUnit'||key==='quantity'||key==='stockState'||key==='stockType'||key==='wareAreaCode'||key==='wareLocationCode'){
                    saveData.assemblyDetailDTOSs[index][key] = item[key];
                  }
                  if(key==='stockStateArr'){
                    saveData.assemblyDetailDTOSs[index]['stockState'] = item.stockStateArr.join(',');
                  }
                  if(key==='stockTypeArr'){
                    saveData.assemblyDetailDTOSs[index]['stockType'] = item.stockTypeArr.join(',');
                  }
                }
              });

              this.$confirm('确认保存吗?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(() => {
                //   api.createProof(saveData).then(()=>{
                //     this.isSaveEdit = true;
                //     this.$message({
                //         type: 'success',
                //         message: '保存成功'
                //     });   
                //   })
              });
          }else{
            this.$message({
              title: this.$t("message.warning"),
              message: '请先填写及选择必填项',
              type: "warning"
            });
          }
      })
    },
    //刷新
    handleRefresh(){
      this.isEdit = false;
      this.isSaveEdit = false;
      this.list = [];
    },
    //业务类型相关值操作
    setdicTypeRelated(val){
      this.businessTypeList.options.forEach((item)=>{
        if(item.wareRuleCode===val){
          this.mainFormList.relationDicType = item.completedLink;
          if(this.mainFormList.dicType === this.configBusiness.cz){
            this.mainFormList.stockState = item.fetchStockStat;
            this.mainFormList.stockType = item.fetchStockType;
          }else{
            this.mainFormList.stockState = item.storeStockStat;
            this.mainFormList.stockType = item.storeStockType;
          }
        }
      })
    },
    //计算物料数量定额*加工数量
    calQuantity(){
      if(this.mainFormList.quantity){
        this.list.forEach((item,index)=>{
          let num = this.mainFormList.quantity*item.quota;
          this.$set(this.list[index],'quantity',num);
          this.$set(this.list,index,this.list[index]);
        })
      }
    }
  }
}
</script>