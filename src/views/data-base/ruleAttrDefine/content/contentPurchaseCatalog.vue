<template>
    <div>

        <div class="table-container">
            <div class="oprate_btn no_t_border">
                <el-button class="filter-item"
                           size="small"
                           type="primary"
                           @click="handleAdd"
                           icon="el-icon-plus">{{ $t('table.add') }}</el-button>
                <el-button class="filter-item"
                           size="small"
                           type="primary"
                           @click="handleDelete"
                           icon="el-icon-delete">{{ $t('table.delete') }}</el-button>
                <el-button class="filter-item"
                           size="small"
                           type="primary"
                           @click="handleSave"
                           icon="el-icon-check">{{ $t('table.save') }}</el-button>
            </div>
            <el-table :data="addList"
                      :key="tableKey"
                      :height="theight"
                      border
                      fit
                      highlight-current-row
                      style="width: 100%;"
                      ref="tbmain"
                      @selection-change="selectRow"
                      size="mini"
                      cell-class-name="table-cell"
                      header-cell-class-name="header-cell">
                <el-table-column type="selection"
                                 fixed
                                 width="30"
                                 align="center"></el-table-column>
                <el-table-column type="index"
                                 width="50"
                                 :label="$t('ruleAttrDefine.rowId')"
                                 align="center"></el-table-column>
                <el-table-column :label="$t('ruleAttrDefine.purchaseClassKey')"
                                 align="center"
                                 prop="purchaseClassKey">
                    <template slot-scope="scope">
                        <el-select size="small"
                                   v-model="scope.row.purchaseClassKey"
                                   @change="
                                    changePurchase(
                                        scope.row.purchaseClassKey,
                                        scope.$index
                                    )
                                ">
                            <el-option v-for="item in purchaseList"
                                       :key="item.dictItemKey"
                                       :label="
                                        item.dictItemValue +
                                            '-' +
                                            item.dictItemKey
                                    "
                                       :value="item.dictItemKey">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>

                <!-- <el-table-column :label="'采购分类名称'" align="center" prop="purchaseCatalogName"></el-table-column> -->
                <el-table-column :label="$t('ruleAttrDefine.stockTypeKey')"
                                 align="center"
                                 prop="stockTypeKey">
                    <template slot-scope="scope">
                        <el-select size="small"
                                   v-model="scope.row.stockTypeKey"
                                   @change="
                                    changeStockType(
                                        scope.row.stockTypeKey,
                                        scope.$index
                                    )
                                ">
                            <el-option v-for="item in stockList"
                                       :key="item.dictItemKey"
                                       :label="
                                        item.dictItemValue +
                                            '-' +
                                            item.dictItemKey
                                    "
                                       :value="item.dictItemKey">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <!-- <el-table-column :label="'库存类型名称'" align="center" prop="stockTypeName"></el-table-column> -->
            </el-table>
        </div>
    </div>
</template>

<script>
import {
    getPurchaseDict,
    addPurchaseRecords,
    deletePurchaseRecords,
    queryPurchaseRecords
} from '@/api/data-base/ruleAttrDefine'

export default {
    name: 'contentPurchaseCatalog',
    components: {},
    data () {
        return {
            addList: [],
            theight: 0, //表格高度
            tableKey: 0, //表格索引
            purchaseList: null,
            stockList: null,
            selectRows: []
        }
    },
    mounted () {
        this.getSelectData()
        this.setTableHeight()
        //表格高度自适应
        window.onresize = () => {
            this.setTableHeight()
        }
        this.getList()
    },
    methods: {
        getSelectData () {
            getPurchaseDict('dt_purchase_class').then(res => {
                this.purchaseList = res.data.dictItemDTOs
            })
            getPurchaseDict('dt_stock_type').then(res => {
                this.stockList = res.data.dictItemDTOs
            })
        },
        //表格高度计算
        setTableHeight () {
            this.theight = this.$myFun.getSingleTbHeight() + 10
        },
        //显示主表
        getList () {
            queryPurchaseRecords().then(res => {
                console.log(res)
                this.addList = res.data
            })
        },
        //主表勾选框选中
        selectRow (val) {
            this.selectRows = val
        },
        //新增
        handleAdd () {
            let addRow = {
                purchaseClassKey: '',
                //   purchaseCatalogName:'',
                stockTypeKey: ''
                //   stockTypeName:''
            }
            this.addList.push(addRow)
        },
        //保存
        handleSave () {
            if (this.selectRows.length === 1) {
                addPurchaseRecords(this.selectRows[0]).then(() => {
                    this.$message.warning('新增成功')
                    this.getList()
                })
            } else {
                this.$message.warning('请选择一条信息')
            }
        },
        //删除
        handleDelete () {
            if (this.selectRows.length === 1) {
                deletePurchaseRecords(this.selectRows[0].purchaseClassKey)
                    .then(res => {
                        console.log('删除', res)
                        this.getList()
                    })
                    .catch(e => {
                        console.log(1111, e.message)
                        if (e.message === '采购分类对照库存类型不存在') {
                            this.addList.forEach((item, index) => {
                                this.selectRows.forEach(item1 => {
                                    if (
                                        item1.purchaseClassKey ===
                                        item.purchaseClassKey
                                    ) {
                                        this.addList.splice(index, 1)
                                    }
                                })
                            })
                        } else {
                            throw e
                        }
                    })
            } else {
                this.$message.warning('请选择一条信息')
            }
        },
        changePurchase () {
            // this.purchaseList.forEach((item,index)=>{
            //     console.log(item,index);
            //     if(item.dictItemKey===purchaseClassKey){
            //         this.addList[i].purchaseCatalogName = item.dictItemValue;
            //     }
            // })
        },
        changeStockType () {
            // this.stockList.forEach((item,index)=>{
            //     console.log(item,index);
            //     if(item.dictItemKey===stockTypeKey){
            //         this.addList[i].stockTypeName = item.dictItemValue;
            //     }
            // })
        }
    }
}
</script>

<style scoped>
.contentStyle {
    margin: 0 5px;
    height: 420px;
    background-color: #fff;
}
</style>
