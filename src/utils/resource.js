//本地资源，可以随意配置
const resource = {}
const resourceBase = {
    //系统管理模块
    system: {
        '/system': '系统管理',
        //明细
        '/system/employeesManagement': '员工管理',
        '/system/userManagement': '用户管理',
        '/system/systemMenu': '系统菜单',
        '/system/roleManagement': '角色管理',
        '/system/dataPermissions': '数据权限',
        '/system/systemResource': '系统资源',
        '/system/organizationStructure': '组织结构',
        '/system/dataPermissioncategory': '数据权限类别定义',
        '/system/taskConfiguration': '任务配置',
        '/system/interfaceDefinition': '接口定义',
        '/system/exceltemplate': 'excel模板配置',
        '/system/Interfacemonitor': '接口监控',
        '/data-base/dict': '数据字典',
        '/system/processManage/processDesign': '流程设计',
        '/system/processManage': '流程管理',
        '/system/processManage/processConfiguration': '流程配置',
        '/system/processManage/processMonitor': '流程监控',
        '/system/processManage/processFristaid': '流程急救箱'
    },
    // 基础数据模块
    dataBase: {
        '/data-base': '基础数据',
        //物料参数
        '/data-base/MaterialParameters': '物料参数',
        //明细
        '/data-base/color': '颜色清单',
        '/data-base/orgMateriel': '组织物料参数',
        '/data-base/materiel': '物料主数据',
        '/data-base/measureUnit': '计量单位',
        '/data-base/instorageProcess': '库内加工BOM',
        //往来单位
        '/data-base/2': '往来单位',
        //明细
        '/data-base/supplier': '供应商主数据',
        '/data-base/customer': '客户主数据',
        '/data-base/sourceList': '货源清单',
        //仓库模型
        '/data-base/3': '仓库模型',
        //明细
        '/data-base/reservoirLocation': '库区/库位',
        '/data-base/warehouse': '仓库信息',
        '/data-base/warehouseDistribute': '仓库物料',
        '/data-base/storageMaterialDistribution': '储位物料',
        '/data-base/accountingCycle': '会计周期',
        '/data-base/storageMaterialClassification': '储位物料分类',
        //仓储规则
        '/data-base/4': ' 仓储规则',
        //明细
        '/data-base/materielTransferType': '移动类型',
        '/data-base/enableRules': '批次规则',
        '/data-base/barCodeRules': '条码规则',
        '/data-base/ruleAttrDefine': '规则属性定义',
        '/data-base/exemptionList': '免检清单',
        '/data-base/purchaseWarehousingTable': '质检入库配置表',
        //工作中心
        '/data-base/5': '工作中心',
        //明细
        '/data-base/workCenter': '工作中心',
        '/factory-modeling/workstation': '工位定义',

        //设备台账
        '/data-base/equipment-ledger': '设备台账',
        //工序管理
        '/data-base/process-step': '工序管理',
        //设备类型
        '/data-base/equipment-type': '设备类型',
        //工艺管理
        '/data-base/process-management': '工艺管理'
        //bom
        // '/data-base/bom': 'bom'
    }
    //协同平台
    // OA: {
    //     '/OA': '协同平台',
    //     //明细
    //     '/project/OA/purchase/purchasing_Order_Formulation': '采购订单编制',
    //     '/project/OA/purchase/purchased-confirmation': '采购订单确认',
    //     '/project/OA/purchase/deliveryOrder': '交货单编制',
    //     '/project/OA/purchase/delivery_Publish': '交货单发布',
    //     '/project/OA/purchase/purchasingOrderQuery': '采购订单查询',
    //     '/project/OA/purchase/outuser_management': '外部用户管理'
    // },
    //WMS
    // WMS: {
    //     '/WMS': '仓库管理',
    //     //采购入库
    //     '/project/WMS/purchaseStorage': '采购入库',
    //     //明细
    //     '/project/WMS/purchaseStorage/purchaseReceiving': '采购收货',
    //     '/project/WMS/purchaseStorage/storageCheck': '入库质检',
    //     '/project/WMS/purchaseStorage/storageConfirm': '质检入库确认',
    //     '/project/WMS/purchaseStorage/qaJudge': '质检判定',
    //     '/project/WMS/purchaseStorage/qaJudgeStorage': '质检判定入库',
    //     '/project/WMS/purchaseStorage/noIndicatorStorage': '无指示采购入库',
    //     //生产拉料
    //     '/project/WMS/productionMaterial': '生产拉料',
    //     //明细
    //     '/project/WMS/productionMaterial/pullerFormation': '拉料单编制',
    //     '/project/WMS/productionMaterial/pullerStorage': '拉料入库',
    //     //凭证冲销
    //     '/project/WMS/writeOff': '凭证冲销',
    //     //明细
    //     '/project/WMS/writeOff/certificatecancel': '凭证冲销',
    //     '/project/WMS/writeOff/proofQuery': '入库凭证查询',
    //     //库存查询
    //     '/project/WMS/stock': '库存查询',
    //     //明细
    //     '/project/WMS/stock/accounting': '会计账',
    //     '/project/WMS/stock/stocksearch': '库存查询',
    //     //生产发料
    //     '/project/WMS/productIssue': '生产发料',
    //     //明细
    //     '/project/WMS/productIssue/issueFormation': '投料单编制',
    //     '/project/WMS/productIssue/issueOut': '投料出库',
    //     //生产入库
    //     '/project/WMS/productStocking': '生产入库',
    //     //明细
    //     '/project/WMS/productStocking/finishedStocking': '成品入库',
    //     //销售出库
    //     '/project/WMS/saleOut': '销售出库',
    //     //明细
    //     '/project/WMS/saleOut/saleOutIndicate': '销售出库指示',
    //     '/project/WMS/saleOut/saleOutFunc': '销售出库',
    //     '/project/WMS/saleOut/saleOutQuery': '销售出库指示查询',
    //     //库存盘点
    //     '/project/WMS/inventory': '库存盘点',
    //     //明细
    //     '/project/WMS/inventory/inventoryFormation': '盘点单编制',
    //     '/project/WMS/inventory/inventoryRegister': '盘点登记',
    //     '/project/WMS/inventory/inventoryAudit': '盘点审核',
    //     //物质报废
    //     '/project/WMS/materialScrap': '物资报废',
    //     //明细
    //     '/project/WMS/materialScrap/scrap': '报废',
    //     '/project/WMS/materialScrap/scrapApplication': '报废申请',
    //     //库存移动
    //     '/project/WMS/stokMove': ' 库存移动',
    //     //明细
    //     '/project/WMS/stokMove/stokMoveFunc': '库内转移',
    //     '/project/WMS/stokMove/allocationIndicate': '调拨指示',
    //     '/project/WMS/stokMove/indicateAllocation': '按指示调拨',
    //     '/project/WMS/stokMove/undirectedAllocation': '无指示调拨',
    //     //采购退货
    //     '/project/WMS/purchaseReturn': '采购退货',
    //     //明细
    //     '/project/WMS/purchaseReturn/purchaseReturnOrder': '采购订单退货',
    //     '/project/WMS/purchaseReturn/undirectedReturn': '无指示退货',
    //     //委外管理
    //     '/project/WMS/outSourcing': '委外管理',
    //     //明细
    //     '/project/WMS/outSourcing/outSourcingDirectives': '委外出库指示',
    //     '/project/WMS/outSourcing/outSourcingInstruct': '按指示委外出库',
    //     '/project/WMS/outSourcing/outSourcingReceipt': '委外订单收货',
    //     //生产退料
    //     '/project/WMS/productReturn': '生产退料',
    //     //明细
    //     '/project/WMS/productReturn/returnInstruction': '生产退料指示',
    //     '/project/WMS/productReturn/productReturnFunc': '生产退料',
    //     '/project/WMS/productReturn/uninstructedReturn': '无指示退料',

    //     //库内加工
    //     '/project/WMS/knProcessing': '库内加工',
    //     //明细
    //     '/project/WMS/knProcessing/wzsknProcessing': '无指示库内加工',
    //     '/project/WMS/knProcessing/knjgPlan': '库内加工计划',
    //     '/project/WMS/knProcessing/jhknProcessing': '按计划库内加工'
    // }
}
for (const key in resourceBase) {
    if (resourceBase.hasOwnProperty(key)) {
        for (const val in resourceBase[key]) {
            if (resourceBase[key].hasOwnProperty(val)) {
                resource[val] = resourceBase[key][val]
            }
        }
    }
}
export default resource
