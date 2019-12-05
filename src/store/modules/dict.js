import { getRecord } from '@/api/data-base/dict'
//系统数据字典

const state = {
    dt_stock_type: [], //库存类型
    dt_batch_rule_diff: [], //批次规则区分
    dt_account_field: [], //记账字段
    dt_rules_type: [], //规则类型
    dt_businesstype_identity: [], //业务类型标识
    dt_stock_status: [], //库存状态
    dt_referdata_resource: [], //参照数据来源
    dt_statistic_type: [], //统计分类
    dt_purchase_class: [], //采购分类
    dt_workcenter_group: [], //工作中心组
    dt_ckyw_tpye: [], //业务类别
    dt_dd_state: [], //订单状态
    dt_org_function: [], //组织业务职能
    dt_org_code: [], //组织编码
    dt_arrival_unit: [], //到货单位
    dt_syetemnode_type: [], //节点类型
    dt_timeunit: [], //时间单位
    dt_supplier_level: [], //供应商等级
    dt_customer_property: [], //客户属性
    dt_customer_type: [], //客户类型
    dt_role_type: [], //角色类型
    dt_dimension: [], //量纲
    dt_supplier_type: [], //供应商类型
    dt_administrative_type: [], //行政区域类型
    dt_batch_enabled: [], //批次启用
    dt_datarights_class: [], //数据权限分类
    dt_datarights_type: [], //数据权限类型
    dt_manufacture_diff: [], //制造区分
    dt_materialpull_type: [], //拉料分类
    dt_materialput_type: [], //投料分类
    dt_materiel_classify: [], //物料分类
    dt_materiel_group: [], //物料组
    dt_materiel_type: [], //物料类型
    dt_negativestock_en: [], //负库存启用
    dt_org_type: [], //组织类型
    dt_prod_state: [], //生产状态
    dt_soragecell_class: [], //储位类别
    dt_soragecell_type: [], //储位类型
    dt_supply_mode: [], //供货方式
    dt_warehouse_class: [], //仓库类别
    dt_warehouse_group: [], //仓库组
    dt_warehouse_type: [], //仓库类型
    dt_whpartition_type: [], //区位类型
    dt_workcenter_class: [], //工作中心类别
    dt_workcenter_model: [], //工作中心作业模式
    dt_workcenter_type: [], //工作中心类型
    dt_delivery_state: [], //交货单状态
    dt_domainScope_type: [], //所属域
    dt_pullmaterial_type: [], //拉料类型
    dt_pullmaterial_state: [], //拉料状态
    dt_station_type: [], //工位类型
    dt_ReceivingBusiness_type: [], //收货业务类型
    dt_pull_businessType: [], //拉料业务类型
    dt_inventory_type: [], //盘点方式
    dd_receivin_state: [], //收货登记状态
    dt_pushmaterial_state: [], //投料状态
    dt_band_type: [], //待判定类型
    dt_pushmaterial_type: [], //投料类型
    dt_sales_out_instruct_state: [], //销售出库指示状态
    dt_quality_inspection_type: [], //质检类型
    dt_quality_nspection_category: [], //质检类别
    dt_time_type: [], //时间类别
    dt_iqc_type: [], //质检方式
    dt_iqc_state: [], //入库质检状态
    dt_Interface_mode: [], //接口方式
    dt_data_type: [], //数据类型
    dt_Interface_type: [], //接口类型
    dt_Interface_direction: [], //接口方向
    dt_separator_symbol: [], //分隔符
    dt_implement_type: [], //执行类型
    dt_field_type: [], //字段类型
    dt_monitor_state: [], //状态
    dt_stores_bom_type: [], //bom类型
    dt_material_relation: [], //储位物料关系
    dt_stockType_valueMode: [], //库存类型取值方式
    dt_location_match: [], //库位匹配方式
    dt_process_step_type: [], //工序类型
    dt_device_type: [], //设备类型
    dt_hours_unit: [], //工时单位
    dt_scrap_order_state: [], //报废申请状态
    dt_instruction_state: [] //指示类型
}

const mutations = {
    getDicData(state, data) {
        state[data.dicCodes] = data.res
    }
}
const actions = {
    getDicData(context, dicCodes) {
        for (let i = 0; i < dicCodes.length; i++) {
            if (state[dicCodes[i]].length == 0) {
                getRecord(dicCodes[i]).then(res => {
                    res = res.data.dictItemDTOs
                    context.commit('getDicData', {
                        dicCodes: dicCodes[i],
                        res: res
                    })
                })
            }
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
