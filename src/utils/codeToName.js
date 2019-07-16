export function codeToName(res,options,key){
    for(let i=0;i<key.length;i++){
        res.list.forEach((item,index)=>{
            options[i].forEach((option)=>{
                if(option.dictItemKey==item[key[i]]){
                    res.list[index][key[i]+'CN'] = option.dictItemValue;
                }
            });
        });
    }
    return res;
}
