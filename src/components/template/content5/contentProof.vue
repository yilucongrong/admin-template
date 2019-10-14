<template>
    <div>
        <el-col :span="5" class="left_content">
            <div class="table-container">
                <el-table
                    :key="tableKey"
                    :data="list"
                    border
                    fit
                    :height="theight"
                    highlight-current-row
                    style="width: 100%;"
                    ref="tbmain"
                    @selection-change='selectRow' size="mini" cell-class-name="table-cell" header-cell-class-name="header-cell"
                    @row-click='showSubTable'>
                    <el-table-column type="selection" fixed width="30" align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip width="50" align="left" :label="'单号'" prop="proofNo"></el-table-column>
                    <el-table-column show-overflow-tooltip align="left" :label="'创建时间'" prop="createTime"></el-table-column>
                </el-table>

                <pagination :total="total" :page.sync="listQuery.currentPage" :layout="'total, prev, pager, next'"
                                :limit.sync="listQuery.pageSize" @pagination="getList"  class="pagination-container"/>       
            </div>
        </el-col>
        <el-col :span="19"  class="right_content">
            <div class="">
                <div class="filter-container">
                      <div class="filter-items">
                        <el-select :placeholder="'业务类型'" size="small" filterable v-model="listQuery.dicType">
                          <el-option
                          v-for="item in businessTypeList.options"
                          :label="item.wareRuleCode+'--'+item.wareRuleName"
                          :key="item.wareRuleCode"
                          :value="item.wareRuleCode">
                          </el-option>
                        </el-select>
                        <el-date-picker class="range_date" size="small" v-model="accountRangeTime" type="daterange" :start-placeholder="'记账日期'" :end-placeholder="'结束日期'" value-format="yyyy-MM-dd"></el-date-picker>
                        <el-button size="small" class="filter-item" type="primary" icon="el-icon-search" @click="handleQuery">查询</el-button>
                        <el-button size="small" class="filter-item" type="primary" icon="el-icon-printer " @click="handlePrint">打印</el-button>
                        <el-button size="small" class="filter-item" type="primary" icon="el-icon-upload2" @click="handleExport">{{$t('table.export')}}</el-button>
                    </div>
                </div>
                <div class="table-container  border_t_1">
                    <!-- <div class="oprate_btn">
                        <el-button size="small" class="filter-item" type="primary" icon="el-icon-search" @click="handleQuery">{{$t('table.query')}}</el-button>
                        <el-button size="small" class="filter-item" type="primary" icon="el-icon-printer " @click="handlePrint">{{$t('table.print')}}</el-button>
                        <el-button size="small" class="filter-item" type="primary" icon="el-icon-upload2" @click="handleExport">{{$t('table.export')}}</el-button>
                    </div> -->
                    <el-table
                        key="0"
                        :data="listDetail"
                        :height="sheight"
                        border
                        fit
                        highlight-current-row
                        style="width: 100%;"
                        size="mini" cell-class-name="table-cell" header-cell-class-name="header-cell"
                        >
                        <el-table-column type="selection" fixed width="30" align="center"></el-table-column>
                        <el-table-column show-overflow-tooltip width="130" align="left" :label="'凭证号'" prop="proofNo"></el-table-column>
                        <el-table-column show-overflow-tooltip width="130" align="left" :label="'业务类型'" prop="dicTypeName"></el-table-column>
                        <el-table-column show-overflow-tooltip width="130" align="left" :label="'物料编码'" prop="materielCode"></el-table-column>
                        <el-table-column show-overflow-tooltip width="130" align="left" :label="'物料名称'" prop="materielName"></el-table-column>
                        <el-table-column show-overflow-tooltip width="130" align="left" :label="'数量'" prop="quantity"></el-table-column>
                        <el-table-column show-overflow-tooltip width="130" align="left" :label="'组织编码'" prop="orgCode"></el-table-column>
                        <el-table-column show-overflow-tooltip width="130" align="left" :label="'组织名称'" prop="orgName"></el-table-column>
                        <el-table-column show-overflow-tooltip width="130" align="left" :label="'仓库编码'" prop="warehouseCode"></el-table-column>
                        <el-table-column show-overflow-tooltip width="130" align="left" :label="'记账日期'" prop="createTime"></el-table-column>
                        <el-table-column show-overflow-tooltip align="left" :label="'创建日期'" prop="createTime"></el-table-column>
                        <el-table-column show-overflow-tooltip align="left" :label="'记账人'" prop="accountor"></el-table-column>
                        <el-table-column show-overflow-tooltip width="130" align="left" :label="'库存类型'" prop="stockTypeName"></el-table-column>
                        <el-table-column show-overflow-tooltip width="130" align="left" :label="'库存状态'" prop="stockStateName"></el-table-column>
                    </el-table>
                    <pagination :total="totals" :page.sync="listQuery.currentPage"
                            :limit.sync="listQuery.pageSize" @pagination="getList"  class="pagination-container border_b_1"/>
                    <el-table
                        key="1"
                        :data="listDetailSub"
                        border
                        fit
                        :height="sheight"
                        highlight-current-row
                        style="width: 100%;"
                        size="mini" cell-class-name="table-cell" header-cell-class-name="header-cell"
                        >
                        <el-table-column show-overflow-tooltip width="130" align="left" :label="'凭证号'" prop="proofNo"></el-table-column>
                        <el-table-column show-overflow-tooltip width="130" align="left" :label="'业务类型'" prop="dicTypeName"></el-table-column>
                        <el-table-column show-overflow-tooltip width="130" align="left" :label="'物料编码'" prop="materielCode"></el-table-column>
                        <el-table-column show-overflow-tooltip width="130" align="left" :label="'物料名称'" prop="materielName"></el-table-column>
                        <el-table-column show-overflow-tooltip width="130" align="left" :label="'数量'" prop="quantity"></el-table-column>
                        <el-table-column show-overflow-tooltip width="130" align="left" :label="'记账日期'" prop="createTime"></el-table-column>
                        <el-table-column show-overflow-tooltip width="130" align="left" :label="'库区'" prop="wareAreaCode"></el-table-column>
                        <el-table-column show-overflow-tooltip width="130" align="left" :label="'库位'" prop="wareLocationCode"></el-table-column>
                        <el-table-column show-overflow-tooltip width="130" align="left" :label="'库存类型'" prop="stockTypeName"></el-table-column>
                        <el-table-column show-overflow-tooltip width="130" align="left" :label="'库存状态'" prop="stockStateName"></el-table-column>
                    </el-table>
                    <pagination :total="totals" :page.sync="listQuery.currentPage"
                            :limit.sync="listQuery.pageSize" @pagination="getList"  class="pagination-container"/>
                </div>
            </div>
        </el-col>


        <!-- 打印 -->
      <el-dialog :model="printData" custom-class="dialog-custom" :visible.sync="dialogPrintVisible" :show-close=false>
        <div slot="title" class="dialog-footer">
          <el-button type="primary" @click="doPrint">{{$t('table.print')}}</el-button>
          <el-button @click="dialogPackPrintVisible = false" style="float:right;">{{$t('table.close')}}</el-button>
        </div>

        <!-- <div id="packprint" style="padding: 0px 20px">
          <div :key="item.rowId" v-for="item in printList">
            <table  border="1" cellspacing="0" cellpadding="0" style="border-collapse: collapse;width:100%;">
              <tr>
                <th style="text-align:left;padding:5px 10px;" colspan="8">物料编码</th>
                <td style="text-align:center;padding:5px 10px;" colspan="4" rowspan="6">
                  <qrcode :imgindex="item.rowId" :ref="'childQRcode'+item.rowId"></qrcode>
                </td>
              </tr>
              <tr>
                <td style="text-align:center;padding:5px 10px;" colspan="8">{{item.materielCode}}</td>
              </tr>
              <tr>
                <th style="text-align:left;padding:5px 10px;" colspan="3">数量</th>
                <th style="text-align:left;padding:5px 10px;" colspan="5">物料名称</th>
              </tr>
              <tr>
                <td style="text-align:center;padding:5px 10px;font-size:20px;" colspan="3" rowspan="3">{{item.num}}</td>
                <td style="text-align:center;padding:5px 10px;" colspan="5">{{item.materielName}}</td>
              </tr>

              <tr>
                <th style="text-align:left;padding:5px 10px;" colspan="5">批次</th>
              </tr>
              <tr>
                <td style="text-align:center;padding:5px 10px;" colspan="5">{{item.batch}}</td>
              </tr>

              <tr>
                <th style="text-align:left;padding:5px 10px;" colspan="3">需求单位</th>
                <th style="text-align:left;padding:5px 10px;" colspan="5">到货地点</th>
                <th style="text-align:left;padding:5px 10px;" colspan="4">卸货站台</th>
              </tr>
              <tr>
                <td style="text-align:center;padding:5px 10px;" colspan="3">{{item.arrivalCompany}}</td>
                <td style="text-align:center;padding:5px 10px;" colspan="5">{{item.arrivalWarehouse}}</td>
                <td style="text-align:center;padding:5px 10px;" colspan="4">{{item.unloadAddress}}</td>
              </tr>

              <tr>
                <th style="text-align:left;padding:5px 10px;" colspan="3">供应商编码</th>
                <th style="text-align:left;padding:5px 10px;" colspan="9">供应商名称</th>
              </tr>

              <tr>
                <td style="text-align:center;padding:5px 10px;font-size:20px;" colspan="3" rowspan="3">{{item.supplierCode}}</td>
                <td style="text-align:center;padding:5px 10px;" colspan="9">{{item.supplierName}}</td>
              </tr>
              <tr>
                <th style="text-align:left;padding:5px 10px;" colspan="5">订单号</th>
                <th style="text-align:left;padding:5px 10px;" colspan="4">交货单号</th>
              </tr>
              <tr>
                <td style="text-align:center;padding:5px 10px;" colspan="5">{{item.purchaseOrderNumber}}</td>
                <td style="text-align:center;padding:5px 10px;" colspan="4">{{item.orderNumber}}</td>
              </tr>
              <tr>
                <td style="text-align:center;padding:5px 10px;height:80px;" colspan="12">
                  <svg :id="'barcode'+item.rowId"></svg>
                </td>
              </tr>
            </table>
            <div style="page-break-after: always;"></div>
          </div>
        </div> -->
      </el-dialog>
    </div>
</template>

<script>
import global_valfn from '@/utils/global_valfn'
import Pagination from "@/components/Pagination";

export default {
  name: "Hand_pulled_material",
  components: { Pagination},
  data() {
    return {
        theight: 0,
        sheight:0,
      list: null,
      listDetail:null,
      listDetailSub:null,
      total: 0,
      totals:0,
      rangeTime: "",
      accountRangeTime:"",
      selectRows:[],
      businessTypeList:[],
      dialogGys:false,
      supplierRows:[],
      listQuery: {
        page: true,
        currentPage: 1,
        pageSize: 10,
        orgCode:'',
        warehouseCode:'',
        dicType:''
      },
      sublistQueryf: {
        page: true,
        currentPage: 1,
        pageSize: 10,
        method:'proofDetai'
      },
      sublistQuerys: {
        page: true,
        currentPage: 1,
        pageSize: 10,
        method:'processingDetail'
      },
      tableKey: 0,
      rules: {
       
      },
      dialogPrintVisible:false,
      printData:{},//打印数据
      printList:[]
    };
  },
  filters: {
    
  },
  mounted(){
       this.setTableHeight();
        //表格高度自适应
        window.onresize = () => {
            this.setTableHeight()
        };
  },
  methods: {
      //表格高度计算
        setTableHeight () {
            this.theight = global_valfn.getSingleTbHeight()+60;
            this.sheight = (global_valfn.getSingleTbHeight()-27)/2;
        },
    //主表数据获取
    getListData(){
      if(!this.listQuery.orgCode||!this.listQuery.warehouseCode||!this.listQuery.dicType){
        this.$message({
          title: this.$t("message.warning"),
          message: '请先选择组织编码、仓库编码、业务类型',
          type: "warning"
        });
      }else{
        // queryRecords(this.listQuery.orgCode,this.listQuery.warehouseCode,this.listQuery.dicType,this.listQuery).then(res=>{
        //   console.log(res);
        //   this.list = res.list;
        //   this.total = res.pages.count;
        // })
      }
    },
    //显示主表
    getList() {
      if (this.rangeTime) {
        let d1 = this.rangeTime[0];
        let d2 = this.rangeTime[1];
        this.listQuery.createDateBegin = d1;
        this.listQuery.createDateEnd = d2;
      }else{
        this.listQuery.createDateStart = null;
        this.listQuery.createDateEnd = null;
      }
      if (this.accountRangeTime) {
        let d1 = this.accountRangeTime[0];
        let d2 = this.accountRangeTime[1];
        this.listQuery.accountDateBegin = d1;
        this.listQuery.accountDateEnd = d2;
      }else{
        this.listQuery.accountDateBegin = null;
        this.listQuery.accountDateEnd = null;
      }
      this.getListData();
    },
    //显示从表
    getSubList(row) {
      console.log(row);
    //   let proofNo = row.proofNo;
    //   queryRecordsDetail(proofNo,this.sublistQueryf).then(res => {
    //     this.listDetail = res.list;
    //       queryRecordsDetail(proofNo,this.sublistQuerys).then(resd => {
    //         this.listDetailSub = resd.list;
    //         this.totals = resd.pages.count;
    //         console.log(resd);
    //       });
    //     console.log(res);
    //   });
    },
    //查询
    handleQuery() {
      this.listRow=[];
      this.listQuery.currentPage = 1;
      this.getList();
    },
    //每页大小变化
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getList();
    },
    //当前页变化
    handleCurrentChange(val) {
      this.listQuery.currentPage = val;
      this.getList();
    },
    //主表勾选框选中
    selectRow(val) {
      this.selectRows = val[val.length-1];
      if (val.length > 1) {
          this.$refs.tbmain.clearSelection()
          this.$refs.tbmain.toggleRowSelection(val[val.length-1],'selected')
      }

      if(val.length!==0){
        this.getSubList(val[val.length-1]);
      }
    },
    //主表点击显示从表
    showSubTable(val) {
      this.selectRows = val;
      this.$refs.tbmain.clearSelection()
      this.$refs.tbmain.toggleRowSelection(val,'selected');
      this.getSubList(val);
    },
    setdefault(val,i){
      if(i===1){
        this.listQuery.orgCode = val;
      }else if(i===3){
        this.listQuery.warehouseCode = val;
      }
    },
    //打印
    handlePrint(){
      this.dialogPrintVisible = true;
      this.printData = this.selectRows;
      //处理打印数据
    },
    handleExport(){
      if(this.selectRows){
        // if(this.selectRows.length===1){
        //     var excelDatas = [
        //     {
        //       tHeader: ["凭证号", "业务类型", "物料编码", "物料名称", "数量", "组织编码", "组织名称", "仓库编码","仓库名称", "记账日期", "创建日期", "记账人", "库存类型", "库存状态"], // sheet表一头部
        //       filterVal: ["proofNo", "dicTypeName", "materielCode", "materielName", "quantity", "orgCode","orgName", "warehouseCode","warehouseName", "createTime", "createTime", "accountor", "stockTypeName", "stockStateName"], // 表一的数据字段
        //       tableDatas: this.listDetail, // 表一的整体json数据
        //       sheetName: "无指示凭证"// 表一的sheet名字
        //     },
        //     {
        //       tHeader: ["凭证号", "业务类型", "物料编码", "物料名称", "数量", "记账日期", "库区", "库位", "库存类型", "库存状态"],
        //       filterVal: ["proofNo", "dicTypeName", "materielCode", "materielName", "quantity", "createTime", "wareAreaCode", "wareLocationCode", "stockTypeName", "stockStateName"],
        //       tableDatas: this.listDetailSub,
        //       sheetName: "凭证详情"
        //     }
        //   ]
        //   //   引入的函数
        //   json2excel(excelDatas, "无指示库内凭证", true, "xlsx")
        // }else{
        //     this.$message.warning(this.$t('message.checkedoneplease'));
        // }
      }
    },
    //执行打印
    doPrint(){
      // this.$confirm('是否进行打印操作？', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning',
      // }).then(() => {
      //     this.dialogPrintVisible = false;
      //     api.updatePackTag(this.updatePacklist).then(res=>{
      //       console.log(res);
      //       api.queryPackTag(this.listQueryPack).then(resq=>{
      //         this.packDataList = resq;
      //       });
      //       this.$message.success('设置成功');
      //     });
      //     let newWin = window.open("");
      //     var newstr = document.getElementById('packprint').innerHTML;
      //     newWin.document.write(newstr);
      //     newWin.document.close();//IE添加

      //     setTimeout(function(){
      //       newWin.print();
      //       newWin.close();
      //     },100);
      // })
    }
  }
}
</script>