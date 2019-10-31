// 全局变量及函数
export default {
    single_table_height: 254, //单表高度计算
    tree_height: 105, //左边树高度计算
    getTreehHeight() {
        return document.body.offsetHeight - this.tree_height + 'px'
    },
    getSingleTbHeight() {
        let wh = document.body.offsetHeight
        let fch = document.getElementsByClassName('filter-container')[0]
            .offsetHeight
        let th = wh - this.single_table_height - fch + 48
        console.log(th)
        return th
    }
}
