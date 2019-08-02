//对于/1001/1002/1005，/1001，/1007/1008 数据形式tree加载
export function loadtreeDate(data) {
    return tree(data)
}
export function loadtreeDates(data) {
    let datatrees=[{
      catalogName:'根目录',
      organizationName:'根目录',
      rowId:0,
      children:tree(data)
    }]
    return datatrees
}
//关系数据转化成树结构数据
export function tree(data) {
    let map = {};
    let val = [];
    //生成数据对象集合
    data.forEach(it=>{
        map[it.rowId] = it;
    })
    //生成结果集
    data.forEach(it=>{
        const parent = map[it.parentId];
        if(parent){
            if(!Array.isArray(parent.children)) parent.children = [];
            parent.children.push(it);
        }else{
            val.push(it);
        }
    })
    return val;
}

