//form dialog
<template>
    <div>
        <el-dialog class="form_dialog"
                   width="75%"
                   top="10vh"
                   custom-class="dialog-custom"
                   :title="curdialogStatus==0?$t('table.add'):$t('table.edit')"
                   :close-on-click-modal="false"
                   :visible.sync="dialogVisible">
            <el-form :rules="rules"
                     :model="mainList"
                     ref="mainList"
                     label-position="left"
                     label-width="130px"
                     :inline="true"
                     class="demo-form-inline dialog_form">
                <el-form-item label="拉料单号"
                              prop="pullOrderCode">
                    <el-input style="width: 165px"
                              size="small"
                              v-model="mainList.pullOrderCode"></el-input>
                </el-form-item>

                <el-form-item :label="'供应商'"
                              prop="supplierName">
                    <el-input v-if="mainList.supplierName"
                              size="small"
                              style="width: 165px"
                              v-model="mainList.supplierName">
                        <el-button slot="append"
                                   icon="el-icon-search"
                                   @click="showGys"></el-button>
                    </el-input>
                    <el-input v-else
                              size="small"
                              style="width: 165px"
                              v-model="mainList.supplierCode">
                        <el-button slot="append"
                                   icon="el-icon-search"
                                   @click="showGys"></el-button>
                    </el-input>
                </el-form-item>

                <el-form-item label="三方仓库"
                              prop="thirdPartyWarehouse">
                    <el-input style="width: 165px"
                              size="small"
                              v-model="mainList.thirdPartyWarehouse"></el-input>
                </el-form-item>
                <el-form-item label="备货时间"
                              prop="stockTime">
                    <el-date-picker size="small"
                                    style="width: 165px"
                                    v-model="mainList.stockTime"
                                    type="datetime"
                                    value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                </el-form-item>
                <el-form-item label="送达时间"
                              prop="arrivalTime">
                    <el-date-picker size="small"
                                    style="width: 165px"
                                    v-model="mainList.arrivalTime"
                                    type="datetime"
                                    value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                </el-form-item>

                <el-form-item label="备注"
                              prop="note">
                    <el-input type="textarea"
                              style="width:780px;"
                              v-model="mainList.note"></el-input>
                </el-form-item>
            </el-form>
            <div class="oprate_btn">
                <el-button class="filter-item"
                           size="small"
                           type="primary"
                           @click="addSub"
                           icon="el-icon-plus">{{ $t('table.add') }}</el-button>
                <el-button class="filter-item"
                           size="small"
                           type="primary"
                           @click="deleteContent"
                           icon="el-icon-delete">{{ $t('table.delete') }}</el-button>
            </div>
            <div class="table-container">
                <el-table :data="mainList.tableDetails"
                          border
                          fit
                          highlight-current-row
                          style="width: 100%;"
                          @selection-change="selectChange"
                          size="mini"
                          cell-class-name="table-cell"
                          header-cell-class-name="header-cell">
                    <el-table-column type="selection"
                                     fixed
                                     width="30"
                                     align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     :label="'输入'"
                                     prop="inputValue">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.inputValue"
                                      placeholder=""></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column v-for="item in mainTitle"
                                     :key="item.id"
                                     show-overflow-tooltip
                                     :fixed="item.fixed"
                                     :type="item.type"
                                     :width="item.width"
                                     :align="item.left"
                                     :label="item.label"
                                     :prop="item.prop"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     :label="'snp'"
                                     prop="snp">
                        <template slot-scope="scope">
                            {{scope.row.snp?scope.row.snp:1}}
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <div slot="footer"
                 class="dialog-footer">
                <el-button @click="dialogVisible=!dialogVisible">{{$t('table.cancel')}}</el-button>
                <el-button type="primary"
                           @click="curdialogStatus==0?addMainConfirm():updateMainConfirm()">{{$t('table.confirm')}}</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
// import { createRecords, updateRecords } from "@/api/productionMaterial/hand_pull_material";

export default {
    name: 'addMain',
    props: ['unMutiple', 'title', 'curdialogStatus'],
    data () {
        let compareDate = (rule, value, callback) => {
            if (value < this.mainList.stockTime) {
                return callback(new Error('送达时间不能小于备货时间'));
            } else {
                callback();
            }
        };
        return {
            mainList: {
                method: null,
                pullOrderCode: null,
                purchaseOrgCode: null,
                supplierCode: null,
                supplierName: null,
                pullMaterialType: null,
                thirdPartyWarehouse: null,
                stockTime: null,
                arrivalTime: null,
                arrivalOrgCode: null,
                warehouseCode: null,
                note: null,
                tableDetails: []
            },
            listSelected: null,//已选项
            selectRowData: null,
            mainTitle: [
                { width: null, align: 'left', label: 'id', prop: 'id' },
                { width: null, align: 'left', label: '专辑', prop: 'name' },
                { width: null, align: 'left', label: '类型', prop: 'category' },
                { width: null, align: 'left', label: '名称', prop: 'desc' },
                { width: null, align: 'left', label: '地址', prop: 'address' },
                { width: null, align: 'left', label: '店铺', prop: 'shop' }
            ],
            dialogVisible: false,
            rules: {
                stockTime: [
                    { required: true, message: '请选择', trigger: 'blur' }
                ],
                arrivalTime: [
                    { required: true, message: '请选择', trigger: 'blur' },
                    { validator: compareDate, trigger: 'blur' }
                ]
            },
        }
    },
    created () {

    },
    computed: {

    },
    mounted () {

    },
    methods: {
        //初始化选中内容
        initSelect (val) {
            this.listAll = null;
            this.listSelected = null;
            this.listSelected = val;
        },
        resetForm () {
            this.mainList = {
                method: null,
                pullOrderCode: null,
                purchaseOrgCode: null,
                supplierCode: null,
                supplierName: null,
                pullMaterialType: null,
                thirdPartyWarehouse: null,
                stockTime: null,
                arrivalTime: null,
                arrivalOrgCode: null,
                warehouseCode: null,
                note: null,
                tableDetails: [],
                purchaseOrgName: null,
            }
        },
        addMainConfirm () {
            this.$refs.mainList.validate((valid) => {
                if (valid) {
                    this.$confirm('确认保存吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.dialogConfirm();
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    });
                }
            });
        },
        updateMainConfirm () {
            this.$refs.mainList.validate((valid) => {
                if (valid) {
                    this.$confirm('确认保存吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.dialogConfirm();
                    });
                }
            });

        },
        //添加项
        addSub () {
            this.mainList.tableDetails = [
                { id: '0', name: '第一张专辑', category: '专辑', desc: '第一张创作专辑', address: '相信音乐', shop: '相信音乐国际股份有限公司', inputValue: '1' },
                { id: '1', name: '第二张专辑', category: '专辑', desc: '爱情万岁', address: '相信音乐', shop: '相信音乐国际股份有限公司', inputValue: '1' },
                { id: '2', name: '第三张专辑', category: '专辑', desc: '人生海海', address: '相信音乐', shop: '相信音乐国际股份有限公司', inputValue: '1' },
                { id: '3', name: '第四张专辑', category: '专辑', desc: '时光机', address: '相信音乐', shop: '相信音乐国际股份有限公司', inputValue: '1' },
                { id: '4', name: '第五张专辑', category: '专辑', desc: '神的孩子都在跳舞', address: '相信音乐', shop: '相信音乐国际股份有限公司', inputValue: '1' }
            ];

        },
        showGys () {

        },
        //删除内容某一行,点了保存才删除成功
        deleteContent () {
            if (this.listSelected.length !== 0) {
                this.$confirm('确认要删除该数据项吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.mainList.tableDetails = this.mainList.tableDetails.filter(item => {
                        let isD = true;
                        this.listSelected.forEach((itemr) => {
                            if (itemr.id === item.id) {
                                isD = false;
                            }
                        });
                        return isD;
                    })

                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            } else {
                this.$message.warning("请勾选记录！");
                return;
            }
        },
        selectChange (val) {
            if (this.unMutiple) {
                this.selectOneRow(val);
            } else {
                this.selectRows(val);
            }
        },
        selectRows (val) {//备选项选中行
            this.selectRowData = val
            this.listSelected = this.selectRowData;
            // this.getDetail(val[val.length - 1]);
            // this.$emit('clickRows' ,val,this.listSub);
        },
        selectOneRow (val) {
            let arr = [];
            arr.push(val[val.length - 1])
            this.selectRowData = arr;
            // if (arr[0]) {
            //     this.getDetail(arr[0]);
            // }
            if (val.length > 1) {
                this.$refs.tbselect.clearSelection()
                this.$refs.tbselect.toggleRowSelection(val[val.length - 1], 'selected')
            }
            this.listSelected = this.selectRowData;

        },
        //弹框3点击确定
        dialogConfirm () {
            this.$emit('handleDialogClick', this.mainList, 3);
            this.dialogVisible = false;
        }
    }
}
</script>