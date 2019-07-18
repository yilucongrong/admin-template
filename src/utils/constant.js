import { organizationFilter } from "../filters";

const DICT_CODE = {
  supplierType: 'dt_supplier_type',
  supplyClassify: 'dt_materiel_classify',
  supplierGrade: 'dt_supplier_level',
  customerType: 'dt_customer_type',
  customerProperty: 'dt_customer_property',
  materielType: 'dt_materiel_type',
  materielClassify: 'dt_materiel_classify',
  materielGroup: 'dt_materiel_group',
  productionState: 'dt_prod_state',
  workCenterType:'dt_workcenter_type',
  workCenterClass:'dt_workcenter_class',
  workCenterGroup:'dt_workcenter_group',
  workCenterModel:'dt_workcenter_model',
  dimension: 'dt_dimension',
  madeType: 'dt_manufacture_diff',
  supplyMode: 'dt_supply_mode',
  materialpullType: 'dt_materialpull_type',
  dtTimeunit: 'dt_timeunit',
  materialputType: 'dt_materialput_type',
  roletype: 'dt_role_type',
  warehouseType: 'dt_warehouse_type',
  warehouseClass: 'dt_warehouse_class',
  warehouseGroup: 'dt_warehouse_group',
  batchEnabled: 'dt_batch_enabled',
  minusEnabled: 'dt_negativestock_en',
  locationType:'dt_soragecell_type',
  locationClass:'dt_soragecell_class',
  areaTypeName:'dt_whpartition_type',
  areaType:'dt_whpartition_type',
  locationType:'dt_soragecell_type',
  locationClass:'dt_soragecell_class',
  batchRuleDiff:'dt_batch_rule_diff',
  materialRelation:'dt_material_relation',

  arrivalCompany:'dt_arrival_unit',
  state:'dt_dd_state',
  orgCode:'dt_org_code',

  arrivalUnit:'dt_arrival_unit',
  orgCode:'dt_org_code',
  ckywTpye:'dt_ckyw_tpye',//业务类别
  ddzt:'dt_dd_state',//订单状态
  orgPurchas:'dt_org_function_purchas',//采购组织
  orgGroup:'dt_org_function_group',//采购组
  purchaseGroup:'dt_purchase_class',//采购分类
  businessFunction:'dt-business-function',
  statisticType:'dt_statistic_type',//统计分类
  referDataResource:'dt_referdata_resource',//参照数据来源
  stockStatus:'dt_stock_status',//库存状态
  stockType:'dt_stock_type',//库存类型
  accountField:'dt_account_field',//记账字段
  businessTypeIdentity:'dt_businesstype_identity',//业务类型标识

  businessFunction:'dt-business-function',
  powerType:'dt_datarights_type',
  powerCategroy:'dt_datarights_class',
  rulesType:'dt_rules_Type',
  materialType:'dt_materialput_type',
  userArea:'dt_domainScope_type',

  stationType:'dt_station_Type',
  stocktype:'dt_stock_type',
  stockstate:'dt_stock_status',
  area:'dt_whpartition_type',
  storage:'dt_soragecell_type',
  pushMaterialType:'dt_pushmaterial_type',
  insstate:'dt_sales_out_instruct_state'
}

const TWO_STATE_OPTIONS = [{
  value: 0,
  label: '否'
}, {
  value: 1,
  label: '是'
}
]
const TWO_isAsync_OPTIONS = [{
  value: 1,
  label: '同步'
}, {
  value: 2,
  label: '异步'
}
]
const THE_STATE_OPTIONS = [
{
  value: 'RELEASE',
  label: '已发布'
},
{
  value: 'CONFIRM',
  label: '已确认'
},
{
  value: 'FEEDBACK',
  label: '已反馈'
},
{
  value: 'CREATE',
  label: '已创建'
},
{
  value: 'CANCEL',
  label: '已作废'
},
{
  value: 'CLOSE',
  label: '已关闭'
},
{
  value: 'COMPLETE',
  label: '已完成'
},
]

const DICT_TYPE_OPTIONS = [{
  value: 1,
  label: '系统字典'
}, {
  value: 2,
  label: '业务字典'
}]

const DT_ORG_TYPE = {
  group: 'dt_org_type_group',
  company: 'dt_org_type_company',
  factory: 'dt_org_type_factory',
  division: 'dt_org_type_division',
  department: 'dt_org_type_department',
  workcenter:'dt_workcenter_class_line'
}

const DT_ORG_FUNCTION = {
  produce:'dt_org_function_produce',
  purchas:'dt_org_function_purchas'
}

const AUTHO_SELECT_LIST = [
  {
    accessTypeCode:'IM01',
    metaDataCode:'IN01',
    authoName:'公司权限'
  },
  {
    accessTypeCode:'IM01',
    metaDataCode:'IN02',
    authoName:'工厂权限'
  },
  {
    accessTypeCode:'IM01',
    metaDataCode:'IN03',
    authoName:'采购组织权限'
  },{
    accessTypeCode:'IM02',
    metaDataCode:'IN10',
    authoName:'仓库权限'
  },{
    accessTypeCode:'IM02',
    metaDataCode:'IN11',
    authoName:'往来仓库权限'
  },{
    accessTypeCode:'IM03',
    metaDataCode:'IN20',
    authoName:'车间'
  },{
    accessTypeCode:'IM03',
    metaDataCode:'IN21',
    authoName:'生产线'  //工作中心权限
  },{
    accessTypeCode:'IM03',
    metaDataCode:'IN22',
    authoName:'工位'
  },{
    accessTypeCode:'IM04',
    metaDataCode:'IN30',
    authoName:'仓储业务' //业务类型权限
  },
];

export {
  DICT_CODE,
  TWO_STATE_OPTIONS,
  DICT_TYPE_OPTIONS,
  DT_ORG_TYPE,
  THE_STATE_OPTIONS,
  DT_ORG_FUNCTION,
  AUTHO_SELECT_LIST,
  TWO_isAsync_OPTIONS
}


