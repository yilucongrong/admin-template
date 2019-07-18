const myFun={
    //表格select 单选
    rowSelectOne(a){
        that.$refs[a].clearSelection()//清除其他行的选中
        that.$refs[a].toggleRowSelection(val[val.length-1],'selected')//单击行绑定点击事件 
    },
    b(){
        alert('a')
    },
    rowClickOne:(a)=>{
        this.$refs[a].clearSelection()//清除其他行的选中
        this.$refs[a].toggleRowSelection(val)//单击行绑定点击事件
    },

}

export default myFun