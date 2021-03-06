import request from '@/utils/request'

const state = {
    dt_materiel_transfer_type_screenGroupNum: {
        //移动业务类型
        url: '/iwms/warehouses/rules',
        arg: { key: 'screenGroupNum', value: '52' },
        options: []
    },
    dt_llrk_transfer_screenGroupNum: {
        url: '/iwms/warehouses/rules',
        arg: { key: 'screenGroupNum', value: 'llrk001' },
        options: []
    },
    dt_busi_type_screenGroupNum: {
        //销售出库业务类型
        url: '/iwms/warehouses/rules',
        arg: { key: 'screenGroupNum', value: 'SaleOut' },
        options: []
    },
    dt_return_type_screenGroupNum: {
        //生产退料指示业务类型
        url: '/iwms/warehouses/rules',
        arg: { key: 'screenGroupNum', value: 'sctl' },
        options: []
    },
    dt_push_type_screenGroupNum: {
        //投料出库业务类型
        url: '/iwms/warehouses/rules',
        arg: { key: 'screenGroupNum', value: 'Delivery' },
        options: []
    },
    dt_work_center_workshop: {
        //车间
        url: '/iwms/work-centers',
        arg: { key: 'workCenterClass', value: 'dt_workcenter_class_shop' },
        options: []
    },
    dt_business_type_screenGroupNum: {
        //入库业务类型
        url: '/iwms/warehouses/rules',
        arg: { key: 'screenGroupNum', value: 'SH4' },
        options: []
    },
    dt_business_type_screenGroupNum_yk: {
        //移库
        url: '/iwms/warehouses/rules',
        arg: { key: 'screenGroupNum', value: 'yk' },
        options: []
    },
    dt_cx_type_screenGroupNum_wzsdb: {
        //冲销
        url: '/iwms/warehouses/rules/group/Reversal',
        arg: { key: '', value: 'Reversal' },
        options: []
    },
    dt_business_type_screenGroupNum_db: {
        //调拨
        url: '/iwms/warehouses/rules',
        arg: { key: 'screenGroupNum', value: 'out' },
        options: []
    },
    dt_business_type_screenGroupNum_wzsdb: {
        //无指示调拨
        url: '/iwms/warehouses/rules',
        arg: { key: 'screenGroupNum', value: 'wzsdb' },
        options: []
    },
    dt_materiel_transfer_type_screenGroupNum_SH2: {
        //移动业务类型
        url: '/iwms/warehouses/rules',
        arg: { key: 'screenGroupNum', value: 'SH2' },
        options: []
    },
    dt_materiel_transfer_type: {
        //所有业务类型
        url: '/iwms/warehouses/rules',
        arg: { key: '', value: '' },
        options: []
    },
    dt_purchase_return_type: {
        //采购订单退货
        url: '/iwms/warehouses/rules',
        arg: { key: 'screenGroupNum', value: 'procurereturnbypo' },
        options: []
    },
    dt_uninstructed_return: {
        //无指示退货
        url: '/iwms/warehouses/rules',
        arg: { key: 'screenGroupNum', value: 'wzsth' },
        options: []
    },
    dt_wzs_type_screenGroupNum: {
        //无指示生产退料指示业务类型
        url: '/iwms/warehouses/rules',
        arg: { key: 'screenGroupNum', value: 'wzs' },
        options: []
    },
    dt_org_code_factory: {
        //获取组织类型为工厂的信息组织信息
        url: '/keyguard/organizations',
        arg: { key: 'type', value: 'dt_org_type_factory' },
        options: []
    },
    dt_org_data: {
        //获取组织所有组织编码和组织名称
        url: '/keyguard/organizations',
        arg: { key: '', value: '' },
        options: []
    },
    dt_materiel_transfer_type_bf: {
        //移动业务类型0550，报废功能
        url: '/iwms/warehouses/rules/group/bf',
        api: 'fetch',
        arg: { key: '', value: '' },
        options: []
    },
    dt_business_type_screenGroupNum_wwsh: {
        //委外收货
        url: '/iwms/warehouses/rules/group/wwsh',
        arg: { key: 'screenGroupNum', value: 'wwsh' },
        options: []
    },
    dt_business_type_screenGroupNum_ww: {
        //委外加工
        url: '/iwms/warehouses/rules/group/outsourcing',
        api: 'request',
        arg: { key: 'screenGroupNum', value: 'outsourcing' },
        options: []
    },
    dt_business_type_screenGroupNum_zsknjg: {
        //指示库内加工
        url: '/iwms/warehouses/rules/group/ZSKNJG',
        arg: { key: '', value: '' },
        options: []
    },
    dt_business_type_screenGroupNum_knjg: {
        //库内加工
        url: '/iwms/warehouses/rules/group/KNJG',
        arg: { key: '', value: '' },
        options: []
    },
    dt_cx_type_screenGroupNum_rkpz: {
        //冲销
        url: '/iwms/warehouses/rules/group/rkpz',
        arg: { key: 'screenGroupNum', value: 'rkpz' },
        options: []
    }
}
//一条重要的原则就是要记住 mutation 必须是同步函数
const mutations = {
    getBusinessComponentData(state, data) {
        if (state[data.filterParameters].arg.key) {
            state[data.filterParameters].options = data.res.filter(v => {
                //多显示组处理
                if (v[state[data.filterParameters].arg.key]) {
                    let par = v[state[data.filterParameters].arg.key].split(',')
                    let isEqual = false
                    par.forEach(item => {
                        if (item === state[data.filterParameters].arg.value) {
                            isEqual = true
                        }
                    })
                    if (isEqual) {
                        return v
                    }
                } else {
                    if (
                        v[state[data.filterParameters].arg.key] ==
                        state[data.filterParameters].arg.value
                    ) {
                        return v
                    }
                }
            })
        } else {
            state[data.filterParameters].options = data.res
        }
    }
}
const actions = {
    getBusinessComponentData(context, filterParameters) {
        let query = {
            currentPage: 1,
            pageSize: 1000
        }
        for (let i = 0; i < filterParameters.length; i++) {
            if (state[filterParameters[i]].options.length == 0) {
                request({
                    url: state[filterParameters[i]].url,
                    method: 'get',
                    params: query
                }).then(res => {
                    // console.log(res.data)
                    res = Array.isArray(res)
                        ? res
                        : Array.isArray(res.data.list)
                        ? res.data.list
                        : Array.isArray(res.data)
                        ? res.data
                        : ''
                    // commit参数不能继续在后面加,我们可以将参数以对象的方式传进去，多个属性就是多个参数了。
                    context.commit('getBusinessComponentData', {
                        filterParameters: filterParameters[i],
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
