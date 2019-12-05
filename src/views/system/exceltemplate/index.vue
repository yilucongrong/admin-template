//查+上下表
<template>
    <div class="app-container">
        <div class="filter-container">
            <div class="filter-items">
                <el-input size="small"
                          placeholder="模板编号"
                          v-model="listQuery.excelCode"
                          class="filter-item"
                          @keyup.enter.native="handleQuery" />
                <el-input size="small"
                          placeholder="模板名称"
                          v-model="listQuery.excelName"
                          class="filter-item"
                          @keyup.enter.native="handleQuery" />
                <el-button class="filter-item"
                           type="primary"
                           size="small"
                           icon="el-icon-search"
                           @click="handleQuery">{{$t('table.query')}}</el-button>
            </div>
        </div>
        <div class="table-container">
            <el-col :span="17"
                    class="border_r_1">
                <div class="oprate_btn">
                    <el-button size="small"
                               class="filter-item"
                               type="primary"
                               icon="el-icon-plus"
                               @click="handleCreate">{{$t('table.add')}}</el-button>
                    <el-button size="small"
                               class="filter-item"
                               type="primary"
                               icon="el-icon-delete"
                               @click="handleDelete">{{$t('table.delete')}}</el-button>
                    <el-button size="small"
                               class="filter-item"
                               type="primary"
                               icon="el-icon-edit"
                               @click="handleUpdate">{{$t('table.edit')}}</el-button>
                </div>
                <el-table :key="tableKey[0]"
                          :data="list"
                          border
                          fit
                          :height="theight"
                          highlight-current-row
                          style="width: 100%;"
                          @selection-change="selectRow"
                          size="mini"
                          cell-class-name="table-cell"
                          header-cell-class-name="header-cell"
                          @row-click="selectRow2"
                          ref="dd">
                    <el-table-column type="selection"
                                     fixed
                                     width="30"
                                     align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="50"
                                     align="left"
                                     label="序号"
                                     prop="pushMaterialStateName"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="110"
                                     align="left"
                                     label="模板编号"
                                     prop="excelCode"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="110"
                                     align="left"
                                     label="模板名称"
                                     prop="excelName"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="110"
                                     align="left"
                                     label="模板路径"
                                     prop="orgCode"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="110"
                                     align="left"
                                     label="映射对象"
                                     prop="objectClass"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="110"
                                     align="left"
                                     label="服务"
                                     prop="service"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="110"
                                     align="left"
                                     label="校验方法"
                                     prop="warehouseName"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="110"
                                     align="left"
                                     label="保存方法"
                                     prop="goodsReadyTime"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     min-width="50"
                                     align="left"
                                     label="最大行"
                                     prop="pushTime"></el-table-column>
                </el-table>
                <pagination :total="total"
                            :page.sync="listQuery.currentPage"
                            :limit.sync="listQuery.pageSize"
                            @pagination="getList"
                            class="pagination-container border_b_1" />
                <div class="oprate_btn">
                    <el-button size="small"
                               class="filter-item"
                               type="primary"
                               icon="el-icon-delete"
                               @click="handleDeleteitems">{{$t('table.delete')}}</el-button>
                    <el-button size="small"
                               class="filter-item"
                               type="primary"
                               icon="el-icon-edit"
                               @click="handleUpdateitems">{{$t('table.edit')}}</el-button>
                </div>
                <el-table :key="tableKey[1]"
                          :data="list1"
                          border
                          fit
                          :height="theight"
                          highlight-current-row
                          style="width: 100%;"
                          @selection-change="selectRow1"
                          size="mini"
                          cell-class-name="table-cell"
                          header-cell-class-name="header-cell"
                          @row-click="selectRow3"
                          ref="tb">
                    <el-table-column type="selection"
                                     width="30"
                                     align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="50"
                                     align="left"
                                     label="序号"
                                     prop="columnNo"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="50"
                                     align="left"
                                     label="顺序"
                                     prop="columnNo"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="110"
                                     align="left"
                                     label="字段编码"
                                     prop="fieldCode"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="110"
                                     align="left"
                                     label="字段描述"
                                     prop="fieldName"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="110"
                                     align="left"
                                     label="字段类型"
                                     prop="fieldType"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="50"
                                     align="left"
                                     label="长度"
                                     prop="validation"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="50"
                                     align="left"
                                     label="是否为空"
                                     prop="notNull">
                        <template slot-scope="scope">
                            {{ scope.row.notNull | notNullFilter }}
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="120"
                                     align="left"
                                     label="映射属性"
                                     prop="field"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     min-width="120"
                                     align="left"
                                     label="样例"
                                     prop="fieldDemo"></el-table-column>
                </el-table>
                <pagination :total="total1"
                            :page.sync="listQueryItems.currentPage"
                            :limit.sync="listQueryItems.pageSize"
                            @pagination="getItemsList"
                            class="pagination-container" />
            </el-col>
            <el-col :span="7">
                <el-form style="padding:50px 20px;"
                         title="新增明细"
                         class="small-space"
                         size="mini"
                         ref="dataForm"
                         :inline="true"
                         :model="temp"
                         label-width="75px">
                    <el-form-item label="顺序">
                        <el-input v-model="tempb.columnNo" />
                    </el-form-item>
                    <el-form-item label="模板编码"
                                  prop="excelCode">
                        <el-input width="120px"
                                  v-model="tempb.excelCode" />
                    </el-form-item>
                    <el-form-item label="字段编码"
                                  prop="fieldCode">
                        <el-input v-model="tempb.fieldCode" />
                    </el-form-item>
                    <el-form-item label="字段描述"
                                  prop="fieldName">
                        <el-input v-model="tempb.fieldName" />
                    </el-form-item>
                    <el-form-item label="字段类型"
                                  prop="fieldType">
                        <el-select size="small"
                                   style="width: 120px;"
                                   v-model="tempb.fieldType"
                                   @keyup.enter.native="handleQuery"
                                   placeholder="字段类型"
                                   clearable>
                            <el-option v-for="item in dt_field_type"
                                       :key="item.dictItemKey"
                                       :label="item.dictItemValue"
                                       :value="item.dictItemKey"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="字段长度"
                                  prop="validation">
                        <el-input v-model="tempb.validation" />
                    </el-form-item>
                    <el-form-item label="是否为空"
                                  prop="notNull">
                        <el-radio-group v-model="tempb.notNull">
                            <el-radio :label="true">是</el-radio>
                            <el-radio :label="false">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="映射属性">
                        <el-input v-model="tempb.field" />
                    </el-form-item>
                    <el-form-item label="样例"
                                  prop="fieldDemo">
                        <el-input v-model="tempb.fieldDemo" />
                    </el-form-item>
                    <br>
                    <div style="margin-left:100px">
                        <el-button size="small"
                                   v-if="dialogStatus == 'updateitems'"
                                   @click="Updateitems"
                                   class="filter-item"
                                   type="primary"
                                   icon="el-icon-circle-check">{{$t('table.confirm')}}</el-button>
                        <el-button v-else
                                   type="primary"
                                   @click="handlecreateB">{{$t("table.confirm")}}</el-button>
                    </div>
                </el-form>
            </el-col>
            <div class="clear"></div>
        </div>

        <!-- 弹框 -->
        <el-dialog class="spacing"
                   custom-class="dialog-custom"
                   width="60%"
                   :title="dialogStatus=='create'?$t('table.add'):$t('table.edit')"
                   :visible.sync="dialogFormVisible"
                   v-dialogDrag
                   :close-on-click-modal="false">
            <el-form class="small-space"
                     size="mini"
                     ref="dataForm"
                     :inline="true"
                     :model="temp"
                     label-width="120px">
                <el-form-item label="模板编号">
                    <el-input v-model="temp.excelCode" />
                </el-form-item>
                <el-form-item label="模板描述">
                    <el-input v-model="temp.excelName" />
                </el-form-item>
                <el-form-item label="模板路径">
                    <el-input v-model="temp.pushOrderCode3" />
                </el-form-item>
                <el-form-item label="处理数据服务">
                    <el-input v-model="temp.processService" />
                </el-form-item>
                <el-form-item label="查询数据服务">
                    <el-input v-model="temp.queryService" />
                </el-form-item>
                <el-form-item label="校验方法">
                    <el-input v-model="temp.pushOrderCode5" />
                </el-form-item>
                <el-form-item label="保存方式">
                    <el-input v-model="temp.pushOrderCode6" />
                </el-form-item>
                <el-form-item label="映射对象">
                    <el-input v-model="temp.objectClass" />
                </el-form-item>
                <el-form-item label="最大行">
                    <el-input v-model="temp.pushOrderCode8" />
                </el-form-item>
            </el-form>
            <div slot="footer"
                 class="dialog-footer">
                <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
                <el-button type="primary"
                           @click="dialogStatus==='create'?create():update()">{{ $t('table.confirm') }}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { DICT_CODE, DT_ORG_TYPE, THE_STATE_OPTIONS } from "@/utils/constant";
import { mapState } from "vuex";
import * as api from "@/api/system/exceltemplate";
import { TWO_STATE_OPTIONS } from "@/utils/constant";

export default {
    name: "exceltemplate",
    components: {
        Pagination,
    },
    data () {
        return {
            list: null,
            list1: null,
            list2: null,
            total: 0,
            theight: 0,
            total1: 0,
            total2: 0,
            value1: "",
            tkq: "",
            value2: "",
            value3: "",
            listQuery: {
                page: true,
                currentPage: 1,
                pageSize: 10,
                orgCode: undefined,
                productionline: undefined,
                station: undefined,
                feedType: undefined,
                state: undefined,
                batchNumber: undefined,
                leadTime: undefined,
                feedTime: undefined,
                feedwarehouse: undefined,
                workShop: undefined,
                pushTimeStart: undefined,
                pushTimeEnd: undefined,
                pushMaterialState: undefined
            },
            listQuery1: {
                page: true,
                currentPage: 1,
                pageSize: 10,
                supplierCode: undefined,
                orderNumber: undefined
            },
            listQuery2: {
                page: true,
                currentPage: 1,
                pageSize: 10
            },
            listQueryItems: {
                currentPage: 1,
                pageSize: 10,
                excelCode: undefined
            },
            dto: {
                excelCode: undefined,
                excelName: undefined,
                objectClass: undefined,
                processService: undefined,
                queryService: undefined,


            },
            TWO_STATE_OPTIONS: TWO_STATE_OPTIONS,
            listLoading: true,
            isEaid: false,
            isEdit: true,
            parentsRows1: undefined,
            gw: undefined,
            feedArea: undefined,
            tableKey: [0, 1],//表格索引，虚拟dom渲染表格时使用
            temp: {
                state: undefined,
                remark: undefined,
                rowNo: undefined,
                materielCode: undefined,
                materielName: undefined,
                orgCode: undefined,
                productionline: undefined,
                station: undefined,
                feedType: undefined,
                batchNumber: undefined,
                leadTime: undefined,
                feedTime: undefined,
                feedwarehouse: undefined,
                workShop: undefined,
                goodsReadyEmpName: undefined,
                materialputEmpName: undefined
            },
            tempb: {

            },
            xzwlDialogFormVisible: undefined,
            blPersonnelDialogFormVisible1: undefined,
            tlPersonnelDialogFormVisible2: undefined,
            rules: {
                factory: [{ required: true, message: "请选择", trigger: "blur" }],
                pushMaterialType: [
                    { required: true, message: "请选择", trigger: "blur" }
                ],
                lineCode: [{ required: true, message: "请选择", trigger: "blur" }],
                workshopCode: [{ required: true, message: "请选择", trigger: "blur" }],
                warehouseCode: [{ required: true, message: "请选择", trigger: "blur" }],
                goodsReadyTime: [
                    { required: true, message: "请选择", trigger: "blur" }
                ],
            },
            // measureCode: undefined,
            selectCode: [],
            dialogFormVisible: false,
            dialogFormVisible1: false,
            employeeDialogFormVisible: false,
            dialogStatus: "",
            DICT_CODE: DICT_CODE,
            DT_ORG_TYPE: DT_ORG_TYPE,
            // dimensionOptions: DICT_CODE,
            THE_STATE_OPTIONS: THE_STATE_OPTIONS
        };
    },
    computed: {
        ...mapState({
            dt_field_type: state => state.dict.dt_field_type,
            dt_pushmaterial_state: state => state.dict.dt_pushmaterial_state
        })
    },
    mounted () {
        this.$store.dispatch("dict/getDicData", [
            "dt_field_type",
            "dt_pushmaterial_state",
            "dt_station_type"
        ]);
        this.setTableHeight();
        //表格高度自适应
        window.onresize = () => {
            this.setTableHeight()
        };
        this.getList();
    },
    filters: {
        notNullFilter: function (a) {
            if (a === false) {
                return "否"
            } else {
                return "是"
            }
        }
    },
    methods: {

        getList () { //查询主表
            api.queryRecords(this.listQuery).then(response => {
                this.list = response.data.list;
                this.total = response.data.pages.count;
                this.$nextTick(function () {
                    this.checked()
                })
            });
        },
        //表格高度计算
        setTableHeight () {
            this.theight = this.$myFun.getSingleTbHeight() - 185;
        },
        checked () {
            this.$refs.dd.toggleRowSelection(this.list[0], true);//官网方法，重点
        },
        getItemsList () {  //查询订单明细
            this.listQueryItems.excelCode = this.selectlistRow.excelCode;
            api.getRecorditems(this.listQueryItems).then(response => {
                this.list1 = response.data.list;
                this.total1 = response.data.pages.count;
            });
        },

        handleQuery () {
            this.listQuery.currentPage = 1;
            this.getList();
        },
        handleCreate () { //新增
            this.resetTemp();
            this.dialogStatus = "create";
            // this.temp.pushOrderCode=this.selectlistRow.pushOrderCode
            this.dialogFormVisible = true;

        },
        create () { //新增
            this.dto = this.temp
            api.addRecord(this.dto).then(() => {
                this.dialogFormVisible = false;
                this.getList()
                this.$message({
                    title: "成功",
                    message: "新增成功",
                    type: "success",
                    duration: 2000
                });
            })
        },
        handlecreateB () { //新增明细
            api.addRecorditems(this.selectlistRow.excelCode, this.tempb).then(() => {
                this.getItemsList()
                this.$message({
                    title: "成功",
                    message: "新增成功",
                    type: "success",
                    duration: 2000
                });
                this.resetTemp();
            })

        },
        handleDelete () { //删除
            if (this.selectlistRow) {
                this.$confirm("此操作将永久删除该文件,是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    api.deleteRecord(this.selectlistRow.excelCode).then(() => {
                        this.getList();
                        this.$message({
                            title: "成功",
                            message: "删除成功",
                            type: "success",
                            duration: 2000
                        });
                    });
                }).catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    })
                })

            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条信息",
                    type: "warning",
                    duration: 2000
                });
            }
        },
        handleDeleteitems () {
            if (this.selectlistRow1.length) {
                this.$confirm("此操作将永久删除该文件,是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    api.deleteRecorditems(this.selectlistRow1[0].excelCode, this.selectlistRow1[0].fieldCode).then(() => {
                        this.getItemsList();
                        this.$message({
                            title: "成功",
                            message: "删除成功",
                            type: "success",
                            duration: 2000
                        });
                    });
                }).catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    })
                })

            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条信息",
                    type: "warning",
                    duration: 2000
                });
            }
        },
        handleUpdate () {//编辑 
            this.resetTemp();
            if (this.selectlistRow) {
                this.dialogFormVisible = true;
                this.temp = this.selectlistRow
                this.dialogStatus = "update";
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条信息",
                    type: "warning",
                    duration: 2000
                });
            }
        },

        update () {//编辑
            api.updateRecord(this.selectlistRow.excelCode, this.temp).then(() => {
                this.dialogFormVisible = false;
                this.$message({
                    title: "成功",
                    message: "编辑成功",
                    type: "success",
                    duration: 2000
                });
                this.getList();
            });
        },
        handleUpdateitems () {
            if (this.selectlistRow1.length == 1) {
                this.tempb = this.selectlistRow1[0]
                this.dialogStatus = 'updateitems'
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条信息",
                    type: "warning",
                    duration: 2000
                });
            }
        },
        Updateitems () {
            api.updateRecorditems(this.selectlistRow1[0].excelCode, this.selectlistRow1[0].fieldCode, this.tempb).then(() => {
                this.getItemsList()
                this.$message({
                    title: "成功",
                    message: "编辑成功",
                    type: "success",
                    duration: 2000
                });
                this.resetTemp();
            })
        },
        selectRow (val) {//表一复选框选中方法
            this.selectlistRow = val[val.length - 1];
            if (val.length > 1) {
                this.$refs.tb.clearSelection();
                this.$refs.tb.toggleRowSelection(val.pop());
            }
            this.$refs.tb.setCurrentRow(this.selectlistRow);
            if (this.selectlistRow) {
                this.getItemsList();
            }
        },
        selectRow1 (val) { //表二复选框选中方法
            this.selectlistRow1 = val;
        },
        selectRow2 (val) {//表一单击行选中方法
            this.selectlistRow2 = val;
            this.$refs.tb.clearSelection();
            this.$refs.tb.toggleRowSelection(val);
        },

        selectRow3 (val) {//表二单击行选中方法
            this.selectlistRow3 = val;
            // this.$refs.tb.clearSelection()
            // this.$refs.tb.toggleRowSelection(val)//单击行绑定点击事件
        },
        selectRow4 (val) {
            this.selectlistRow4 = val;
        },
        cancel () {
            this.dialogFormVisible = false;
        },
        resetTemp () {
            this.tempb = {
                columnNo: undefined,
                excelCode: undefined,
                lineCode: undefined,
                field: undefined,
                fieldCode: undefined,
                fieldDemo: undefined,
                fieldName: undefined,
                fieldType: undefined,
                notNull: undefined,
                validation: undefined,
            };
            this.temp = {
                excelCode: undefined,
                excelName: undefined,
                objectClass: undefined,
                processService: undefined,
                queryService: undefined,
            };
        },
        handleClose () {
            this.resetTemp();
            this.$refs.temp.resetFields();
        },
        handleSelectionChange (selection) {
            this.selectCode = selection.map(v => v.measureCode);
        }
    }
};
</script>
<style >
/* .el-input {
  width: 200px;
}
.el-textarea{
  width: 200px;
}
.el-form-item__label{
  width: 120px !important
}
.el-dialog{
  width: 470px;
}
.el-dialog__footer{
  padding:  10px 76px 30px ;
}
.el-dialog__body{
  padding:30px 20px 0px 20px;
} */
.el-range-editor--small.el-input__inner {
    height: 32px;
    /* margin-left: 5px; */
}
.el-input.is-disabled .el-input__inner {
    background-color: #f5f7fa;
    border-color: #e4e7ed;
    color: #c0c4cc;
    cursor: not-allowed;
    height: 32px;
    /* margin-left: 5px; */
}
thead .el-table-column--selection .cell {
    display: none;
}
</style>