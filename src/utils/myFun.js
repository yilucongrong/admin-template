const myFun = {
    single_table_height: 252, //单表高度计算
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
        let th = wh - myFun.single_table_height
        return th
    },

    // 关系型数据转化为树结构数据
    reDataToTree: data => {
        let map = {}
        let val = []
        //生成数据对象集合
        data.forEach(it => {
            map[it.rowId] = it
        })
        //生成结果集
        data.forEach(it => {
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
    addRoot: data => {
        let datatrees = [
            {
                catalogName: '根目录',
                organizationName: '根目录',
                rowId: 0,
                children: myFun.reDataToTree(data)
            }
        ]
        return datatrees
    }
}

export default myFun
