import resource from '@/utils/resource'
const myFun = {
    single_table_height: 254, //单表高度计算
    tree_height: 105, //左边树高度计算
    //编码转化成名称
    codeToName: (res, options, key) => {
        for (let i = 0; i < key.length; i++) {
            res.list.forEach((item, index) => {
                options[i].forEach(option => {
                    if (option.dictItemKey == item[key[i]]) {
                        res.list[index][key[i] + 'CN'] = option.dictItemValue
                    }
                })
            })
        }
        return res
    },
    getTreehHeight: () => {
        return document.body.offsetHeight - myFun.tree_height + 'px'
    },
    getSingleTbHeight: () => {
        let wh = document.body.offsetHeight
        let fch = 0
        if (document.getElementsByClassName('filter-container')[0]) {
            fch = document.getElementsByClassName('filter-container')[0]
                .offsetHeight
        }
        let th = wh - myFun.single_table_height - fch + 48
        return th
    },

    // 关系型数据转化为树结构数据
    reDataToTree: data => {
        let userResource = data.filter(v => {
            return resource[v.url]
        })
        userResource = userResource.length > 0 ? userResource : data
        let map = {}
        let val = []
        //生成数据对象集合
        userResource.forEach(it => {
            map[it.rowId] = it
        })
        //生成结果集
        userResource.forEach(it => {
            const parent = map[it.parentId]
            if (parent) {
                if (!Array.isArray(parent.children)) parent.children = []
                parent.children.push(it)
            } else {
                val.push(it)
            }
        })
        return val
    },

    // 树结构数据添加根目录
    addTreeRoot: data => {
        let datatrees = [
            {
                catalogName: '根目录',
                organizationName: '根目录',
                rowId: 0,
                children: myFun.reDataToTree(data)
            }
        ]
        return datatrees
    },
    //取出两个数组的相同元素
    getArrEqual: (arr1, arr2) => {
        let newArr = []
        for (let i = 0; i < arr2.length; i++) {
            for (let j = 0; j < arr1.length; j++) {
                if (arr1[j] === arr2[i]) {
                    newArr.push(arr1[j])
                }
            }
        }
        return newArr
    },
    //取出两个数组的不同元素
    getArrDifference: (arr1, arr2) => {
        return arr1.concat(arr2).filter(function(v, i, arr) {
            return arr.indexOf(v) === arr.lastIndexOf(v)
        })
    },

    parseTime(time, cFormat) {
        if (arguments.length === 0) {
            return null
        }
        const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
        let date
        if (typeof time === 'object') {
            date = time
        } else {
            if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
                time = parseInt(time)
            }
            if (typeof time === 'number' && time.toString().length === 10) {
                time = time * 1000
            }
            date = new Date(time)
        }
        const formatObj = {
            y: date.getFullYear(),
            m: date.getMonth() + 1,
            d: date.getDate(),
            h: date.getHours(),
            i: date.getMinutes(),
            s: date.getSeconds(),
            a: date.getDay()
        }
        // eslint-disable-next-line
        const time_str = format.replace(
            /{(y|m|d|h|i|s|a)+}/g,
            (result, key) => {
                let value = formatObj[key]
                // Note: getDay() returns 0 on Sunday
                if (key === 'a') {
                    return ['日', '一', '二', '三', '四', '五', '六'][value]
                }
                if (result.length > 0 && value < 10) {
                    value = '0' + value
                }
                return value || 0
            }
        )
        // eslint-disable-next-line
        return time_str
    },
    // 打印
    json2excel(tableJson, filenames, autowidth, bookTypes) {
        import('@/vendor/Export2ExcelS').then(excel => {
            var tHeader = []
            var dataArr = []
            var sheetnames = []
            for (var i in tableJson) {
                tHeader.push(tableJson[i].tHeader)
                dataArr.push(
                    myFun.formatJson(
                        tableJson[i].filterVal,
                        tableJson[i].tableDatas
                    )
                )
                sheetnames.push(tableJson[i].sheetName)
            }
            excel.export_json_to_excel({
                header: tHeader,
                data: dataArr,
                sheetname: sheetnames,
                filename: filenames,
                autoWidth: autowidth,
                bookType: bookTypes
            })
        })
    },
    // 数据过滤，时间过滤
    formatJson: (filterVal, jsonData) => {
        return jsonData.map(v =>
            filterVal.map(j => {
                if (j === 'timestamp') {
                    return myFun.parseTime(v[j])
                } else {
                    return v[j]
                }
            })
        )
    }
}
export default myFun
