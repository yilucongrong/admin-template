//table dialog
<template>
    <div>
        <el-dialog class="table_dialog"
                   custom-class="dialog-custom"
                   :title="title"
                   :visible.sync="dialogVisible"
                   v-dialogDrag
                   :close-on-click-modal="false">
            <div class="tab_container">
                <el-tabs v-model="activeName"
                         type="card">
                    <el-tab-pane :label="'备选项'"
                                 name="first">
                        <div class="filter-container border_b_1">
                            <div class="filter-items">
                                <el-input size="small"
                                          :placeholder="'物料编码'"
                                          v-model="listQueryAll.materielCode"
                                          class="filter-item"
                                          @keyup.enter.native="handleQuery" />
                                <el-button type="primary"
                                           size="small"
                                           icon="el-icon-search"
                                           @click="handleFilter1">{{ $t('btn.search') }}</el-button>
                            </div>
                        </div>
                        <div class="table-container">
                            <el-table :key="tableKey[0]"
                                      :data="listAll"
                                      ref="tbselect"
                                      border
                                      fit
                                      highlight-current-row
                                      style="width: 100%;"
                                      @selection-change="selectChange"
                                      size="mini"
                                      cell-class-name="table-cell"
                                      header-cell-class-name="header-cell">
                                <el-table-column type="selection"></el-table-column>
                                <el-table-column v-for="item in mainTitle"
                                                 :key="item.supplierCode"
                                                 show-overflow-tooltip
                                                 :fixed="item.fixed"
                                                 :type="item.type"
                                                 :width="item.width"
                                                 :align="item.left"
                                                 :label="item.label"
                                                 :prop="item.prop"></el-table-column>
                            </el-table>
                            <pagination class="border_b_1"
                                        v-show="totalAll>0"
                                        :total="totalAll"
                                        :page.sync="listQueryAll.currentPage"
                                        :limit.sync="listQueryAll.pageSize"
                                        @pagination="getList1" />

                        </div>
                    </el-tab-pane>
                    <el-tab-pane v-if="!unMutiple"
                                 :label="'已选项'"
                                 name="second">
                        <div class="table-container">
                            <el-table :key="tableKey[2]"
                                      :data="listSelected"
                                      border
                                      fit
                                      height="250px"
                                      highlight-current-row
                                      style="width: 100%;"
                                      size="mini"
                                      cell-class-name="table-cell"
                                      header-cell-class-name="header-cell">
                                <el-table-column v-for="item in mainTitle"
                                                 :key="item.supplierCode"
                                                 show-overflow-tooltip
                                                 :fixed="item.fixed"
                                                 :type="item.type"
                                                 :width="item.width"
                                                 :align="item.left"
                                                 :label="item.label"
                                                 :prop="item.prop"></el-table-column>
                            </el-table>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div slot="footer"
                 class="dialog-footer">
                <el-button type="primary"
                           size="small"
                           @click="dialogConfirm">{{$t('btn.confirm')}}</el-button>
            </div>
        </el-dialog>
    </div>

</template>
<script>
import Pagination from '@/components/Pagination' // 分页组件
import * as api from '@/api/data-base/supplier'
export default {
    components: { Pagination },
    //是否多选，名称，是否必须选择
    props: ['unMutiple', 'isRequired', 'title'],
    data () {
        return {
            initSelected: null,//初始选中值
            listAll: null,//备选项
            listSelected: [],//已选项
            listSub: null,//备选项子表
            dialogVisible: false,
            totalAll: 0,//总条数
            totalSelected: 0,//选中的条数 暂未使用
            activeName: 'first',//tab激活内容
            tableKey: [0, 1, 2],//表格索引
            selectRowData: null,
            listQueryAll: {
                page: true,
                currentPage: 1,
                pageSize: 10
            },//备选项查询条件
            mainTitle: [
                { width: null, align: 'left', label: this.$t('poFormulation.supplierCode'), prop: 'supplierCode' },
                { width: null, align: 'left', label: this.$t('poFormulation.supplierName'), prop: 'supplierName' },
                { width: null, align: 'left', label: this.$t('poFormulation.supplierTypeName'), prop: 'supplierTypeName' },
                { width: null, align: 'left', label: this.$t('poFormulation.supplyClassifyName'), prop: 'supplyClassifyName' },
                { width: null, align: 'left', label: this.$t('poFormulation.supplierGradeName'), prop: 'supplierGradeName' },
                { width: null, align: 'left', label: this.$t('poFormulation.contact'), prop: 'contact' },
                { width: null, align: 'left', label: this.$t('poFormulation.contactNumber'), prop: 'contactNumber' },
                { width: null, align: 'left', label: this.$t('poFormulation.email'), prop: 'email' },
                { width: null, align: 'left', label: this.$t('poFormulation.address'), prop: 'address' },
                { width: null, align: 'left', label: this.$t('poFormulation.des'), prop: 'remark' },
            ]//备选项主表头数据

        }
    },
    mounted () {//创建时加载备选项
        this.getList1();
    },
    methods: {
        //初始化选中内容
        initSelect (val) {
            this.listAll = null;
            this.listSelected = null;
            this.listSelected = val;
            this.getList1();
        },
        //选中某一行
        checked (i) {
            this.$refs.tbselect.toggleRowSelection(this.listAll[i], true);
        },
        handleFilter1 () {//查询备选项
            this.getList1()
        },
        getList1 () {//备选项查询
            api.queryRecords(this.listQueryAll).then(res => {
                this.listAll = res.data.list
                this.totalAll = res.data.pages.count
            })


            if (this.listSelected) {
                this.listSelected.forEach(items => {
                    this.listAll.forEach((item, index) => {
                        if (item.supplierCode === items.supplierCode) {
                            this.$nextTick(function () {
                                this.checked(index)
                            })
                        }
                    })
                })
            }
        },
        getList2 () {//已选项查询
            this.listSelected = this.selectRowData
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
        },
        selectOneRow (val) {
            let arr = [];
            arr.push(val[val.length - 1])
            this.selectRowData = arr;

            if (val.length > 1) {
                this.$refs.tbselect.clearSelection()
                this.$refs.tbselect.toggleRowSelection(val[val.length - 1], 'selected')
            }
            this.listSelected = this.selectRowData;

        },
        //供应商选择确定
        dialogConfirm () {
            if (this.isGysRequired) {
                if (!this.listSelected) {
                    this.$message({
                        title: this.$t('message.warning'),
                        message: this.$t('message.checkedoneplease'),
                        type: "warning"
                    });
                } else if (!this.unMutiple && this.listSelected.length > 1) {
                    this.$message({
                        title: this.$t('message.warning'),
                        message: this.$t('message.checkedoneplease'),
                        type: "warning"
                    });
                }
                else {
                    this.$emit('handleGysClick', this.listSelected);
                    this.dialogVisible = false;
                }
            } else {
                this.$emit('handleGysClick', this.listSelected);
                this.dialogVisible = false;
            }
        }


    }
}
</script>
