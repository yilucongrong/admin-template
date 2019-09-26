// set function parseTime,formatTime to filter
export { parseTime, formatTime } from '@/utils'


function pluralize (time, label) {
    if (time === 1) {
        return time + label
    }
    return time + label + 's'
}

export function timeAgo (time) {
    const between = Date.now() / 1000 - Number(time)
    if (between < 3600) {
        return pluralize(~~(between / 60), ' minute')
    } else if (between < 86400) {
        return pluralize(~~(between / 3600), ' hour')
    } else {
        return pluralize(~~(between / 86400), ' day')
    }
}

/* 数字 格式化*/
export function numberFormatter (num, digits) {
    const si = [
        { value: 1E18, symbol: 'E' },
        { value: 1E15, symbol: 'P' },
        { value: 1E12, symbol: 'T' },
        { value: 1E9, symbol: 'G' },
        { value: 1E6, symbol: 'M' },
        { value: 1E3, symbol: 'k' }
    ]
    for (let i = 0; i < si.length; i++) {
        if (num >= si[i].value) {
            return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
        }
    }
    return num.toString()
}

export function toThousandFilter (num) {
    return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}


export function stateFilter (value) {
    if (value === 0) {
        return '停止'
    } else if (value === 1) {
        return '启用'
    } else {
        return '未知'
    }
}

export function optionsFilter ([val, options]) {
    const item = options.filter(v => v.value === val)
        .find((value, index, arr) => arr)
    if (!item) {
        return ''
    }
    return item.label
}

export function sexFilter (value) {
    if (value === 0) {
        return '女'
    } else if (value === 1) {
        return '男'
    } else {
        return '未知'
    }
}

export function isEnabledFilter (value) {
    if (value === 0) {
        return '无效'
    } else if (value === 1) {
        return '有效'
    } else {
        return '未知'
    }
}
//节点类型
export function nodeFilter (value) {
    if (value === 0) {
        return '无效'
    } else if (value === 1) {
        return '有效'
    } else {
        return '未知'
    }
}
//上级组织
export function organizationFilter (value, list) {
    return list.parentName
}
// 组织类型
// export function organizationTypes(value,list) {
//   if(list[value]['dictItemValue'] && list[value] && list.length>0){
//     return list[value]['dictItemValue']
//   }else{
//     return ""
//   }
// }

//父目录
// export function pidFilter(value){
//   if (value === 0) {
//     return '111111'
//   } else if (value === 1) {
//     return '222222'
//   } else {
//     return '未知'
//   }
// }