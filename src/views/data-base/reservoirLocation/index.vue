<template>
    <div>
        <div class="app-container">
            <el-row>
                <el-col class="left_col" :span="12">
                    <div class="filter-container">
                        <div class="filter-items">
                            <div class="select-element">
                                <orgSelect class="filter-item"
                                        :orgType="DT_ORG_TYPE.factory" v-model="listQuery.orgCode" :placeholder="$t('reserviorLocation.orgCode')">
                                </orgSelect>
                                <el-input @keyup.enter.native="handleQuery" class="filter-item"
                                        :placeholder="$t('reserviorLocation.warehouseCode')"
                                        size="small" v-model="listQuery.warehouseCode">
                                </el-input>
                                <el-button class="" size="small" type="primary" icon="el-icon-search" @click="handleQuery">{{ $t('table.search') }}</el-button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="table-container no_t_margin no_t_border">
                        <el-table :key="tableKey[0]" :data="list" border fit highlight-current-row
                                style="width: 100%" size="mini"
                                cell-class-name="table-cell"
                                :height="theight" header-cell-class-name="header-cell" @row-click="clickWarehouse">
                            <el-table-column show-overflow-tooltip align="center" :label="$t('reserviorLocation.orgName')" prop="orgName"></el-table-column>
                            <el-table-column show-overflow-tooltip align="center" :label="$t('reserviorLocation.warehouseCode')" prop="warehouseCode"></el-table-column>
                            <el-table-column show-overflow-tooltip align="center" :label="$t('reserviorLocation.warehouseName')" prop="warehouseName"></el-table-column>
                    </el-table>
                    <pagination :total="total" :page.sync="listQuery.currentPage"
                                :limit.sync="listQuery.pageSize" @pagination="getList"/>
                    </div>
                </el-col>
                <el-col class="right_col" :span="12">
                    <div class="table-container  no_t_margin">
                        <div class="oprate_btn no_b_border">
                            <el-button size="small" class="filter-item" type="primary" @click="handleCreateArea" icon="el-icon-plus">
                                {{$t('table.addArea')}}
                            </el-button>
                            <el-button class="filter-item" size="small" type="primary" @click="handleUpdateArea" icon="el-icon-edit">
                                {{$t('table.edit')}}
                            </el-button>
                            <el-button class="filter-item" size="small" type="primary" @click="handleDeleteArea"  icon="el-icon-delete">
                                {{$t('table.delete')}}
                            </el-button>
                        </div>
                        <hr class="hrLineStyle">
                        <el-table :key="tableKey[1]" :data="areaList" border fit highlight-current-row
                                    style="width: 100%" size="mini"
                                    cell-class-name="table-cell"
                                    @row-click="clickArea"
                                    @selection-change='selectArea'
                                    :height="stheight" header-cell-class-name="header-cell" ref="tb">
                            <el-table-column type="selection" fixed width="30" align="center"></el-table-column>
                            <el-table-column show-overflow-tooltip width="120" align="center" :label="$t('reserviorLocation.areaCode')" prop="areaCode"></el-table-column>
                            <el-table-column show-overflow-tooltip width="120" align="center" :label="$t('reserviorLocation.areaName')" prop="areaName"></el-table-column>
                            <el-table-column show-overflow-tooltip width="100" align="center" :label="$t('reserviorLocation.areaType')" prop="areaTypeName"></el-table-column>
                            <el-table-column show-overflow-tooltip width="80" align="center" :label="$t('reserviorLocation.isEnabled')">
                            <template slot-scope="scope">
                                {{scope.row.isEnabled | stateFilter}}
                            </template>
                            </el-table-column>
                            <el-table-column show-overflow-tooltip width="100" align="center" :label="$t('reserviorLocation.creator')" prop="creator"></el-table-column>
                            <el-table-column show-overflow-tooltip width="160" align="center" :label="$t('reserviorLocation.createTime')" prop="createTime"></el-table-column>
                            <el-table-column show-overflow-tooltip width="100" align="center" :label="$t('reserviorLocation.updator')" prop="updator"></el-table-column>
                            <el-table-column show-overflow-tooltip width="160" align="center" :label="$t('reserviorLocation.updateTime')" prop="updateTime"></el-table-column>
                        </el-table>
                        <hr class="hrtLineStyle">
                        <div class="oprate_btn border_t_1">
                            <el-button size="small" type="primary" @click="handleCreateLocation" icon="el-icon-plus">
                                {{$t('table.addRepository')}}
                            </el-button>
                            <el-button class="filter-item" size="small" type="primary" @click="handleUpdateLocation" icon="el-icon-edit">
                                {{$t('table.edit')}}
                            </el-button>
                            <el-button class="filter-item" size="small" type="primary" @click="handleDeleteLocation"  icon="el-icon-delete">
                                {{$t('table.delete')}}
                            </el-button>
                            <el-button class="filter-item" size="small" type="primary" @click="handleBulkPrint" icon="el-icon-price-tag">库位标签</el-button>
                        </div>
                        <el-table :key="tableKey[2]" :data="locationList" border fit highlight-current-row
                                    style="width: 100%" size="mini"
                                    cell-class-name="table-cell"
                                    @selection-change='selectLocation'
                                    :height="stheight" header-cell-class-name="header-cell">
                            <el-table-column type="selection" fixed width="30" align="center"></el-table-column>
                            <el-table-column show-overflow-tooltip width="120" align="center" :label="$t('reserviorLocation.locationCode')" prop="locationCode"></el-table-column>
                            <el-table-column show-overflow-tooltip width="120" align="center" :label="$t('reserviorLocation.locationName')" prop="locationName"></el-table-column>
                            <el-table-column show-overflow-tooltip width="100" align="center" :label="$t('reserviorLocation.locationTypeName')" prop="locationTypeName"></el-table-column>
                            <el-table-column show-overflow-tooltip width="100" align="center" :label="$t('reserviorLocation.locationClassName')" prop="locationClassName"></el-table-column>
                            <el-table-column show-overflow-tooltip width="100" align="center" :label="$t('reserviorLocation.longth')" prop="longth"></el-table-column>
                            <el-table-column show-overflow-tooltip width="100" align="center" :label="$t('reserviorLocation.width')" prop="width"></el-table-column>
                            <el-table-column show-overflow-tooltip width="100" align="center" :label="$t('reserviorLocation.height')" prop="height"></el-table-column>
                            <el-table-column show-overflow-tooltip width="100" align="center" :label="$t('reserviorLocation.wtb')" prop="wtb"></el-table-column>
                            <el-table-column show-overflow-tooltip width="100" align="center" :label="$t('reserviorLocation.row')" prop="row"></el-table-column>
                            <el-table-column show-overflow-tooltip width="100" align="center" :label="$t('reserviorLocation.layer')" prop="layer"></el-table-column>
                            <el-table-column show-overflow-tooltip width="100" align="center" :label="$t('reserviorLocation.column')" prop="column"></el-table-column>
                            <el-table-column show-overflow-tooltip min-width="480" align="center" :label="$t('reserviorLocation.remark')" prop="remark"></el-table-column>
                            <el-table-column show-overflow-tooltip width="80" align="center" :label="$t('reserviorLocation.isEnabled')">
                            <template slot-scope="scope">
                                {{ scope.row.isEnabled | stateFilter }}
                            </template>
                            </el-table-column>
                            <el-table-column show-overflow-tooltip width="100" align="center" :label="$t('reserviorLocation.creator')" prop="creator"></el-table-column>
                            <el-table-column show-overflow-tooltip width="160" align="center" :label="$t('reserviorLocation.createTime')" prop="createTime"></el-table-column>
                            <el-table-column show-overflow-tooltip width="100" align="center" :label="$t('reserviorLocation.updator')" prop="updator"></el-table-column>
                            <el-table-column show-overflow-tooltip width="160" align="center" :label="$t('reserviorLocation.updateTime')" prop="updateTime"></el-table-column>
                        </el-table>
                    </div>
                 
                    <el-row>
                        
                       
                    </el-row>
                    <el-dialog custom-class="dialog-custom" :title="dialogStatus=='create'?$t('table.add'):$t('table.edit')" :visible.sync="areaDialogVisible"
                        :close-on-click-modal="false" :close-on-press-escape="false"
                        @close="handleCloseArea">
                        <el-form :inline="false" class='small-space' :model="areaTemp" :rules="rules" ref="areaTemp" label-position="rigth"
                                label-width="120px" size="mini" style="width:auto;">
                            <el-form-item :label="$t('reserviorLocation.orgCode')" prop="orgCode">
                                <el-input v-model="areaTemp.orgCode" disabled></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('reserviorLocation.warehouseCode')" prop="warehouseCode">
                                <el-input v-model="areaTemp.warehouseCode" disabled></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('reserviorLocation.warehouseName')" prop="warehouseName">
                                <el-input v-model="areaTemp.warehouseName" disabled></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('reserviorLocation.areaCode')" prop="areaCode">
                                <el-input v-model="areaTemp.areaCode" :disabled="dialogStatus!='create'"></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('reserviorLocation.areaName')" prop="areaName">
                                <el-input v-model="areaTemp.areaName"></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('reserviorLocation.areaType')" prop="areaType">
                                <el-select size="small" v-model="areaTemp.areaType" :placeholder="$t('table.select')">
                                    <el-option v-for="item in dt_whpartition_type" :key="item.dictItemKey" :label="item.dictItemValue" :value="item.dictItemKey"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item :label="$t('reserviorLocation.isEnabled')" prop="isEnabled">
                                <el-radio-group v-model="areaTemp.isEnabled">
                                    <el-radio :label="1">{{ $t('table.enable') }}</el-radio>
                                    <el-radio :label="0">停止</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button v-if="dialogStatus=='create'" type="primary" @click="createArea">{{ $t('table.confirm') }}</el-button>
                            <el-button v-else type="primary" @click="updateArea">{{ $t('table.confirm') }}</el-button>
                        </div>
                    </el-dialog>
                    <el-dialog custom-class="dialog-custom" :title="dialogStatus=='create'?$t('table.add'):$t('table.edit')" :visible.sync="locationDialogVisible"
                            :close-on-click-modal="false" :close-on-press-escape="false"
                            @close="handleCloseLocation">
                        <el-form :inline="true" class='demo-form-inline' :model="locationTemp" :rules="rules" ref="locationTemp" label-position="rirhg"
                                label-width="120px" size="mini" style="width:auto;">
                            <el-form-item :label="$t('reserviorLocation.orgCode')" >
                                <el-input v-model="locationTemp.orgCode" disabled></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('reserviorLocation.orgName')">
                                <el-input v-model="locationTemp.orgName" disabled></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('reserviorLocation.warehouseCode')" prop="warehouseCode">
                                <el-input v-model="locationTemp.warehouseCode" disabled></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('reserviorLocation.warehouseName')">
                                <el-input v-model="locationTemp.warehouseName" disabled></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('reserviorLocation.areaCode')">
                                <el-input v-model="locationTemp.areaCode" disabled></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('reserviorLocation.areaName')" prop="areaCode">
                                <el-input v-model="locationTemp.areaName" disabled></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('reserviorLocation.locationCode')" prop="locationCode">
                                <el-input v-model="locationTemp.locationCode"></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('reserviorLocation.locationName')" prop="locationName">
                                <el-input v-model="locationTemp.locationName"></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('reserviorLocation.locationTypeName')" prop="locationType">
                                <el-select size="small" v-model="locationTemp.locationType" :placeholder="$t('table.select')">
                                    <el-option v-for="item in dt_soragecell_type" :key="item.dictItemKey" :label="item.dictItemValue" :value="item.dictItemKey"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item :label="$t('reserviorLocation.locationClassName')" prop="locationClass">
                                <el-select size="small" v-model="locationTemp.locationClass" :placeholder="$t('table.select')">
                                    <el-option v-for="item in dt_soragecell_class" :key="item.dictItemKey" :label="item.dictItemValue" :value="item.dictItemKey"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item :label="$t('reserviorLocation.longth')" prop="longth">
                                <el-input v-model="locationTemp.longth"></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('reserviorLocation.width')" prop="width">
                                <el-input v-model="locationTemp.width"></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('reserviorLocation.height')" prop="height">
                                <el-input v-model="locationTemp.height"></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('reserviorLocation.wtb')" prop="wtb">
                                <el-input v-model="locationTemp.wtb"></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('reserviorLocation.layer')" prop="layer">
                                <el-input v-model="locationTemp.layer"></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('reserviorLocation.column')" prop="column">
                                <el-input v-model="locationTemp.column"></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('reserviorLocation.row')" prop="row">
                                <el-input v-model="locationTemp.row"></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('reserviorLocation.isEnabled')">
                                <el-radio-group v-model="locationTemp.isEnabled">
                                    <el-radio :label="1">{{ $t('table.enable') }}</el-radio>
                                    <el-radio :label="0">停止</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item :label="$t('reserviorLocation.remark')" prop="remark">
                                <el-input type="textarea" :rows="2" style="width: 460px" v-model="locationTemp.remark"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button v-if="dialogStatus=='create'" type="primary" @click="createLocation">{{ $t('table.confirm') }}</el-button>
                            <el-button v-else type="primary" @click="updateLocation">{{ $t('table.confirm') }}</el-button>
                        </div>
                    </el-dialog>
                    <!-- 包装标签打印弹框 -->
                    <el-dialog :model="printData" custom-class="dialog-custom" :visible.sync="dialogPackPrintVisible" :show-close=false>
                        <div slot="title" class="dialog-footer">
                            <el-button type="primary" @click="doPackPrint">{{$t('table.print')}}</el-button>
                            <el-button @click="dialogPackPrintVisible = false" style="float:right;">{{$t('table.close')}}</el-button>
                        </div>
                        <div id="packprint" style="padding: 0px 20px">
                            <div :key="item.locationCode" v-for="(item) in packPrintList">
                                <table  border="1" cellspacing="0" cellpadding="0" style="border-collapse: collapse;width:100%;">
                                    <tr>
                                        <td style="text-align:left;padding:5px 10px;" colspan="2">仓库编码</td>
                                        <td style="text-align:center;padding:5px 10px;" colspan="2">{{item.warehouseCode}}</td>
                                        <td style="text-align:left;padding:5px 10px;" colspan="2">仓库名称</td>
                                        <td style="text-align:center;padding:5px 10px;" colspan="2">{{item.warehouseCode}}</td>
                                        <!-- <td style="text-align:center;padding:5px 10px;" colspan="4" rowspan="6">
                                        <qrcode :imgindex="index" :ref="'childQRcode'+item.locationCode"></qrcode>
                                        </td> -->
                                    </tr>
                                    <tr>
                                        <td style="text-align:left;padding:5px 10px;" colspan="2">区位编码</td>
                                        <td style="text-align:center;padding:5px 10px;" colspan="2">{{item.areaCode}}</td>
                                        <td style="text-align:left;padding:5px 10px;" colspan="2">区位名称</td>
                                        <td style="text-align:center;padding:5px 10px;" colspan="2">{{item.areaName}}</td>
                                    </tr>
                                    <tr>
                                        <td style="text-align:left;padding:5px 10px;" colspan="2">库位编码</td>
                                        <td style="text-align:center;padding:5px 10px;" colspan="2">{{item.locationCode}}</td>
                                        <td style="text-align:left;padding:5px 10px;" colspan="2">库位名称</td>
                                        <td style="text-align:center;padding:5px 10px;" colspan="2">{{item.locationName}}</td>
                                    </tr>
                                    <tr>
                                        <td style="text-align:center;padding:5px 10px;height:60px;" colspan="24">
                                        <svg :id="'barcode'+item.locationCode"></svg>
                                        </td>
                                    </tr>
                                </table>
                                <div style="page-break-after: always;"></div>
                            </div>
                        </div>
                    </el-dialog>    
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import * as api from '@/api/data-base/warehouse'
import { selectlists as listOrg } from '@/api/system/organization'
import Pagination from '@/components/Pagination'
import orgSelect from '@/components/Select/orgSelect.vue'
import {DT_ORG_TYPE, TWO_STATE_OPTIONS } from '@/utils/constant'
import {mapState} from 'vuex';
import JsBarcode from 'jsbarcode';

export default {
  name: 'reservoirLocation',
  components: { Pagination, orgSelect },
  data() {
    return {
      list: null,
      total: 0,
      listQuery: {
        currentPage: 1,
        pageSize: 10,
        orgCode: undefined,
        warehouseCode: undefined
      },
      printData:{},//打印数据
      orgCode: undefined,
      orgName: undefined,
      warehouseCode: undefined,
      warehouseName: undefined,
      areaCode: undefined,
      areaName: undefined,
      areaList: null,
      areaTemp: {
        warehouseCode: undefined,
        areaCode: undefined,
        areaName: undefined,
        isEnabled: 1,
        areaType: undefined
      },
      packDataList:null,
      packPrintList:[],
      updatePacklist:{
        barCode: [],
        method: '',
        supplierBatch: '',
        supplierRemark: ''
      },
      areaDialogVisible: false,
      locationList: null,
      locationTemp: {
        areaCode: undefined,
        column: undefined,
        height: undefined,
        isEnabled: 1,
        layer: undefined,
        locationClass: undefined,
        locationCode: undefined,
        locationName: undefined,
        locationType: undefined,
        longth: undefined,
        remark: undefined,
        row: undefined,
        warehouseCode: undefined,
        width: undefined,
        wtb: undefined
      },
      locationDialogVisible: false,
      dialogPackPrintVisible:false,//打印弹框显示
      dialogStatus: '',
      tableKey: [0, 1,2],//表格索引，虚拟dom渲染表格时使用
      theight: 0,
      stheight: 0,//右子表高度
      DT_ORG_TYPE: DT_ORG_TYPE,
      TWO_STATE_OPTIONS: TWO_STATE_OPTIONS,
      rules: {
        warehouseCode: [
          { required: true, message: '仓库编码不能为空', trigger: 'blur' }
        ],
        areaCode: [
          { required: true, message: '编码不能为空', trigger: 'blur' },
          { pattern: /^[A-Z0-9]{0,8}$/, message: '由大写字母和数字组成，长度为8', trigger: 'blur' }
        ],
        areaName: [
          { required: true, message: '名称不能为空', trigger: 'blur' },
          { max: 60, message: '长度不能超过60', trigger: 'blur' }
        ],
        areaType: [
          { required: true, message: '请选择区位类型', trigger: 'blur' }
        ],
        locationCode: [
          { required: true, message: '编码不能为空', trigger: 'blur' },
          { pattern: /^[A-Z0-9]{0,8}$/, message: '由大写字母和数字组成，长度为8', trigger: 'blur' }
        ],
        locationName: [
          { required: true, message: '名称不能为空', trigger: 'blur' },
          { max: 60, message: '长度不能超过60', trigger: 'blur' }
        ],
        locationType: [
          { required: true, message: '请选择储位类型', trigger: 'blur' }
        ],
        locationClass: [
          { required: true, message: '请选择储位类别', trigger: 'blur' }
        ],
        longth: [
          { pattern: /^[0-9]{0,12}(\.[0-9]{2})?$/, message: '由正数组成，保留两位有效数，长度不能超过14', trigger: 'blur' }
        ],
        width: [
          { pattern: /^[0-9]{0,12}(\.[0-9]{2})?$/, message: '由正数组成，保留两位有效数，长度不能超过14', trigger: 'blur' }
        ],
        height: [
          { pattern: /^[0-9]{0,12}(\.[0-9]{2})?$/, message: '由正数组成，保留两位有效数，长度不能超过14', trigger: 'blur' }
        ],
        wtb: [
          { pattern: /^[0-9]{0,12}(\.[0-9]{2})?$/, message: '由正数组成，保留两位有效数，长度不能超过14', trigger: 'blur' }
        ],
        row: [
          { pattern: /^[A-Z-_0-9]{0,8}$/, message: '由大写字母、数字、-和_组成，长度为8', trigger: 'blur' }
        ],
        column: [
          { pattern: /^[A-Z-_0-9]{0,8}$/, message: '由大写字母、数字、-和_组成，长度为8', trigger: 'blur' }
        ],
        layer: [
          { pattern: /^[A-Z-_0-9]{0,8}$/, message: '由大写字母、数字、-和_组成，长度为8', trigger: 'blur' }
        ],
        remark: [
          { size: 512, message: '长度不能超过512', trigger: 'blur' }
        ]
      }
    }
  },
  computed:{
      ...mapState({
          dt_soragecell_type:state=>state.dict.dt_soragecell_type,
          dt_soragecell_class:state=>state.dict.dt_soragecell_class,
          dt_whpartition_type:state=>state.dict.dt_whpartition_type
      })
  },
  mounted(){
      this.$store.dispatch('dict/getDicData',['dt_soragecell_type','dt_soragecell_class','dt_whpartition_type']);
      this.setTableHeight();
      //表格高度自适应
        window.onresize = () => {
            this.setTableHeight()
        };
      this.getList();
  },
  methods: {
    getList() {
        this.orgCode = undefined
        this.orgName = undefined
        this.warehouseCode = undefined
        this.warehouseName = undefined
        this.areaCode = undefined
        this.areaName = undefined
        this.areaList = []
        this.locationList = []
        const orgs = listOrg({
            type: DT_ORG_TYPE.factory,
            organizationCode: this.orgCode,
            state: 1
        })
        const list = api.queryRecords(this.listQuery)
        Promise.all([orgs, list]).then(([o, l]) => {
            this.list =  l.data.list.map(v => {
            const org = o.data.find(value => value.organizationCode == v.orgCode);
            if(org) {
                v.orgName = org.organizationName
            } else {
                v.orgName = ''
            }
            return v
            })
            // this.total = res.pages.count
        })
    },
    //表格高度计算
    setTableHeight () {
        this.theight = this.$myFun.getSingleTbHeight() +50;
        this.stheight = this.theight/2;
    },
    handleQuery() {
        this.listQuery.currentPage = 1
        this.getList()
    },
    handleSizeChange(val) {
        this.listQuery.pageSize = val
        this.getList()
    },
    handleCurrentChange(val) {
        this.listQuery.currentPage = val
        this.getList()
    },
    handleCreateArea() {
        if (!this.orgCode) {
            this.$message.warning('请选择对应仓库！')
            return
        }
        this.resetAreaTemp()
        this.areaTemp.orgCode = this.orgCode
        this.areaTemp.warehouseCode = this.warehouseCode
        this.areaTemp.warehouseName = this.warehouseName
        this.dialogStatus = 'create'
        this.areaDialogVisible = true
    },
    handleUpdateArea() {
        if(this.selectListArea){
            api.getArea(this.selectListArea.warehouseCode, this.selectListArea.areaCode).then(res => {
            this.areaTemp = res.data
            this.areaTemp.orgCode = this.orgCode
            this.areaTemp.warehouseCode = this.warehouseCode
            this.areaTemp.warehouseName = this.warehouseName
            this.dialogStatus = 'update'
            this.areaDialogVisible = true
            })   
        }else{
            this.$message({
                title: '警告',
                message: '请选择一条信息',
                type: 'warning'
                })
        }
      
    },
    handleDeleteArea() {
        if(this.selectListArea){
            this.$confirm('此操作将永久删除记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    api.deleteArea(this.selectListArea.warehouseCode, this.selectListArea.areaCode).then(() => {
                    this.listArea()
                    this.$notify({
                        title: '成功',
                        message: '删除成功',
                        type: 'success',
                        duration: 2000
                    })
                    })
                }).catch(() => {
                        this.$message({
                        type: 'info',
                        message: '已取消删除'
                        });
                });
        }else{
            this.$message({
                title:'警告',
                message:'请选择一条信息',
                type:'warning'
            })
        }
      
    },
    createArea() {
      this.$refs.areaTemp.validate((valid) => {
        if (valid) {
            api.addArea(this.warehouseCode, this.areaTemp).then(() => {
                this.listArea()
                this.areaDialogVisible = false
                this.$notify({
                title: '成功',
                message: '新增成功',
                type: 'success',
                duration: 2000
                })
            })
        }else {
            return false
        }
      })
    },
    updateArea() {
        this.$refs.areaTemp.validate((valid) => {
            if (valid) {
            api.updateArea(this.warehouseCode, this.areaTemp.areaCode, this.areaTemp).then(() => {
                this.listArea()
                this.areaDialogVisible = false
                this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
                })
                this.$refs.areaTemp.resetFields()
            })
            } else {
            return false
            }
        })
    },
    resetAreaTemp() {
        this.areaTemp = {
            warehouseCode: undefined,
            areaCode: undefined,
            areaName: undefined,
            isEnabled: 1,
            areaType: undefined
        }
    },
    handleCloseArea() {
        this.resetAreaTemp()
        this.$refs.areaTemp.resetFields()
    },
    clickWarehouse(row){
        this.orgCode = row.orgCode
        this.orgName = row.orgName
        this.warehouseCode = row.warehouseCode
        this.warehouseName = row.warehouseName
        this.areaCode = undefined
        this.areaName = undefined
        this.listArea()
        this.locationList = []
    },
    listArea(){
        api.listArea(this.warehouseCode).then(res => {
            this.areaList = res.data
        })
    },
    handleCreateLocation() {
        if (!this.orgCode || !this.areaCode) {
            this.$message.warning('请选择对应仓库库区！')
            return
        }
        this.resetLocationTemp()
        this.locationTemp.orgCode = this.orgCode
        this.locationTemp.orgName = this.orgName
        this.locationTemp.warehouseCode = this.warehouseCode
        this.locationTemp.warehouseName = this.warehouseName
        this.locationTemp.areaCode = this.areaCode
        this.locationTemp.areaName = this.areaName
        this.dialogStatus = 'create'
        this.locationDialogVisible = true
    },
    handleUpdateLocation() {
        if(this.selectListLocation&&this.selectListLocation.length==1){
            api.getLocation(this.selectListLocation[0].warehouseCode, this.selectListLocation[0].areaCode, this.selectListLocation[0].locationCode).then(res => {
                    this.locationTemp = res.data
                    this.locationTemp.orgCode = this.orgCode
                    this.locationTemp.orgName = this.orgName
                    this.locationTemp.warehouseCode = this.warehouseCode
                    this.locationTemp.warehouseName = this.warehouseName
                    this.locationTemp.areaCode = this.areaCode
                    this.locationTemp.areaName = this.areaName
                    this.dialogStatus = 'update'
                    this.locationDialogVisible = true
                })
        }else{
            this.$message({
                title: '警告',
                message: '请选择一条信息',
                type: 'warning'
                })
        }
      
    },
    handleDeleteLocation() {
        if(this.selectListLocation&&this.selectListLocation.length==1){
            this.$confirm('此操作将永久删除记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    api.deleteLocation(this.selectListLocation[0].warehouseCode, this.selectListLocation[0].areaCode, this.selectListLocation[0].locationCode).then(() => {
                    this.listLocation()
                    this.$notify({
                        title: '成功',
                        message: '删除成功',
                        type: 'success',
                        duration: 2000
                    })
                    })
                }).catch(() => {
                    this.$message({
                    type: 'info',
                    message: '已取消删除'
                    });
                });
        }else{
            this.$message({
                    title: '警告',
                    message: '请选择一条信息',
                    type: 'warning'
                    }) 
        }
     
    },
    handleBulkPrint(){
        if(this.selectListLocation==undefined){
        this.$message({
          title: this.$t('message.warning'),
          message: '请选择要打印的标签',
          type: "warning"
        });
      }else{
        let printable = true;
        try{
          this.selectListLocation.forEach(item=>{
            if(item.printSign===1){
              printable = false;
              this.$message({
                title: this.$t('message.warning'),
                message: '所选项包含已打印过的标签，不能进行批量打印',
                type: "warning"
              });
              throw ''
            }
          });
          if(printable){
            this.updateMethod = 'batchPrint';
            this.createPrintPack();
         
          }
        }catch(e){
          console.log(e);
        }
      }
    },
    //生成打印内容
    createPrintPack(){
        this.dialogPackPrintVisible = true;
        this.packPrintList = this.selectListLocation;
        this.$nextTick(()=>{
          this.packPrintList.forEach((item)=>{
            // this.$refs['childQRcode'+item.locationCode][index].qrCreate(item.locationCode);
            JsBarcode("#barcode"+item.locationCode, item.locationCode);
          })
        })
    },
        //执行包装标签打印
    doPackPrint(){
      this.$confirm('是否进行打印操作？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
      }).then(() => {
          this.dialogPackPrintVisible = false;
          this.initUpdatePacklist();
          api.updatePackTag(this.updatePacklist).then(()=>{
            api.queryPackTag(this.listQueryPack).then(resq=>{
              this.packDataList = resq.data;
            });
            this.$message.success('设置成功');
          });
          let newWin = window.open("");
          var newstr = document.getElementById('packprint').innerHTML;
          newWin.document.write(newstr);
          newWin.document.close();//IE添加

          setTimeout(function(){
            newWin.print();
            newWin.close();
          },100);
      })
      
    },
    initUpdatePacklist(){
      let barcodes = new Array();
      this.selectListLocation.forEach(item=>{
        barcodes.push(item.locationCode);
      });
      this.updatePacklist.barCode = barcodes;
      this.updatePacklist.method = this.updateMethod;
      if(this.updateMethod!=='setUp'){
        this.updatePacklist.supplierBatch = '';
        this.updatePacklist.supplierRemark = '';
      }
    },
    createLocation() {
        this.$refs.locationTemp.validate((valid) => {
            if (valid) {
            api.addLocation(this.warehouseCode, this.areaCode, this.locationTemp).then(() => {
                this.listLocation()
                this.locationDialogVisible = false
                this.$notify({
                title: '成功',
                message: '新增成功',
                type: 'success',
                duration: 2000
                })
            })
            } else {
            return false
            }
        })
    },
    updateLocation() {
        this.$refs.locationTemp.validate((valid) => {
            if (valid) {
            api.updateLocation(this.warehouseCode, this.areaCode, this.locationTemp.locationCode, this.locationTemp).then(() => {
                this.listLocation()
                this.locationDialogVisible = false
                this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
                })
                this.$refs.locationTemp.resetFields()
            })
            } else {
            return false
            }
        })
    },
    resetLocationTemp() {
        this.locationTemp = {
            warehouseCode: undefined,
            locationCode: undefined,
            locationName: undefined,
            isEnabled: 1,
            locationType: undefined
        }
    },
    handleCloseLocation() {
        this.resetLocationTemp()
        this.$refs.locationTemp.resetFields()
    },
    listLocation(){ //查询库位
        this.warehouseCode = this.selectListArea.warehouseCode 
        this.areaCode = this.selectListArea.areaCode   
            api.listLocation(this.warehouseCode, this.areaCode).then(res => {
                this.locationList = res.data
            })
    },
    clickArea(val) {
    //   this.areaCode = row.areaCode
    //   this.areaName = row.areaName
    //   this.listLocation()
        this.selectlistRow2 = val
                this.$refs.tb.clearSelection()
                this.$refs.tb.toggleRowSelection(val)//单击行绑定点击事件
    },
    selectArea(val){ //区位复选框选中
        this.selectListArea=val[val.length-1]
            if (val.length > 1) {
                this.$refs.tb.clearSelection()
                this.$refs.tb.toggleRowSelection(val.pop())
                } 
                this.$refs.tb.setCurrentRow(this.selectListArea);
                if(this.selectListArea){
                    this.listLocation()
                }
    },
    selectLocation(val){
        this.selectListLocation=val
    }
  }
}
</script>


