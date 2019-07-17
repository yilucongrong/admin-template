//对于/1001/1002/1005，/1001，/1007/1008 数据形式tree加载
export function loadtreeDate(data) {
    return tree(data)
    // let datatree=[]
    // for(let i=0;i<data.length;i++){//获取全部跟节点
    //     if(data[i].parentId==0){
    //        datatree.push(data[i])
    //      }
    //   }
    //   for(let i=0;i<data.length;i++){//获取全部跟节点的一级几点
    //     for(let j=0;j<datatree.length;j++){
    //       if(datatree[j].rowId==data[i].parentId){
    //         if(!datatree[j].children){
    //            datatree[j].children=[]
    //         }
    //         datatree[j].children[datatree[j].children.length]=data[i]
    //       }
    //     }
    //   }
    //   for(let i=0;i<data.length;i++){//获取全部一级节点的二级节点
    //     for(let j=0;j<datatree.length;j++){
    //       if(datatree[j].children){
    //         for(let n=0;n<datatree[j].children.length;n++){
    //           if(datatree[j].children[n].rowId==data[i].parentId){
    //              if(!datatree[j].children[n].children){
    //                  datatree[j].children[n].children=[]
    //              }
    //            datatree[j].children[n].children[datatree[j].children[n].children.length]=data[i]
    //          }
    //         }
    //       }
    //     }
    //   }
    //   for(let i=0;i<data.length;i++){//获取全部二级节点的三级节点
    //     for(let j=0;j<datatree.length;j++){
    //       if(datatree[j].children){
    //         for(let n=0;n<datatree[j].children.length;n++){
    //           if(datatree[j].children[n].children){
    //             for(let m=0;m<datatree[j].children[n].children.length;m++){
    //               if(datatree[j].children[n].children[m].rowId==data[i].parentId){
    //                  if(!datatree[j].children[n].children[m].children){
    //                    datatree[j].children[n].children[m].children=[]
    //                  }
    //                  datatree[j].children[n].children[m].children[datatree[j].children[n].children[m].children.length]=data[i]
    //               }
                 
    //            }
    //           }
    //         }
    //       }
    //     }
    //   }
    //   for(let i=0;i<data.length;i++){//获取全部三级节点的四级节点
    //     for(let j=0;j<datatree.length;j++){
    //       if(datatree[j].children){
    //         for(let n=0;n<datatree[j].children.length;n++){
    //           if(datatree[j].children[n].children){
    //             for(let m=0;m<datatree[j].children[n].children.length;m++){
    //               if(datatree[j].children[n].children[m].children){
    //                  for(let p=0;p<datatree[j].children[n].children[m].children.length;p++){
    //                    if(datatree[j].children[n].children[m].children[p].rowId==data[i].parentId){
    //                        if(!datatree[j].children[n].children[m].children[p].children){
    //                          datatree[j].children[n].children[m].children[p].children=[]
    //                        }
    //                        datatree[j].children[n].children[m].children[p].children[datatree[j].children[n].children[m].children[p].children.length]=data[i]
    //                    }
    //                  }
    //               }
    //            }
    //           }
    //         }
    //       }
    //     }
    //   }
    // return datatree
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

