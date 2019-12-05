<template>
    <div>
        <div class="app-container">
            <div class="filter-container">
                <div class="filter-items">
                    <el-input @keyup.enter.native="handleQuery"
                              placeholder="设备编码"
                              class="filter-item"
                              size="small"
                              v-model="listQuery.equipmentCode"></el-input>
                    <el-input @keyup.enter.native="handleQuery"
                              placeholder="设备名称"
                              class="filter-item"
                              size="small"
                              v-model="listQuery.equipmentName"></el-input>
                    <el-button class="filter-item-btn"
                               type="primary"
                               size="small"
                               icon="el-icon-search"
                               @click="handleQuery">{{ $t('btn.search') }}</el-button>
                </div>
            </div>
            <div class="table-container">
                <div class="oprate_btn">
                    <el-button size="small"
                               class="filter-item"
                               type="primary"
                               icon="el-icon-plus"
                               @click="handleCreate">{{ $t('btn.add') }}</el-button>
                    <el-button size="small"
                               class="filter-item"
                               type="primary"
                               icon="el-icon-edit"
                               @click="handleUpdate">{{ $t('btn.edit') }}</el-button>
                    <el-button size="small"
                               class="filter-item"
                               type="primary"
                               icon="el-icon-delete"
                               @click="handleDelete">{{ $t('btn.delete') }}</el-button>
                </div>
                <el-table :key="tableKey"
                          :data="list"
                          :height="theight"
                          border
                          fit
                          highlight-current-row
                          cell-class-name="table-cell"
                          header-cell-class-name="header-cell"
                          @selection-change="selectChange"
                          @row-click="rowClick"
                          ref="tb">
                    <el-table-column type="selection"
                                     width="30"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="120"
                                     align="center"
                                     label="设备编码"
                                     prop="equipmentCode"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="200"
                                     align="center"
                                     label="设备型号"
                                     prop="equipmentMode"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="120"
                                     align="center"
                                     label="设备名称"
                                     prop="equipmentName"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     min-width="100"
                                     align="center"
                                     label="设备分类"
                                     prop="equipmentType"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     min-width="100"
                                     align="center"
                                     label="出厂编号"
                                     prop="factoryCode"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     min-width="100"
                                     align="center"
                                     label="产线编码"
                                     prop="lineId"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     min-width="100"
                                     align="center"
                                     label="设备产商"
                                     prop="manufacturer"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     min-width="100"
                                     align="center"
                                     label="责任人编号"
                                     prop="staffId"></el-table-column>
                </el-table>
                <pagination :total="total"
                            :page.sync="listQuery.currentPage"
                            :limit.sync="listQuery.pageSize"
                            @pagination="getList" />

                <el-dialog custom-class="dialog-custom"
                           :close-on-click-modal="false"
                           :close-on-press-escape="false"
                           :title="dialogStatus == 'create' ? $t('table.add') : $t('table.edit')"
                           :visible.sync="dialogFormVisible"
                           v-dialogDrag
                           @close="handleClose">
                    <el-form class="small-space"
                             :model="temp"
                             ref="temp"
                             label-position="left"
                             label-width="100px"
                             size="mini"
                             style="max-width: 400px; ">
                        <el-form-item label="设备编码"
                                      prop="equipmentCode">
                            <el-input v-model="temp.equipmentCode"
                                      :disabled="dialogStatus != 'create'"></el-input>
                        </el-form-item>
                        <el-form-item label="设备型号"
                                      prop="equipmentMode">
                            <el-input v-model="temp.equipmentMode"></el-input>
                        </el-form-item>
                        <el-form-item label="设备名称"
                                      prop="equipmentName">
                            <el-input v-model="temp.equipmentName"></el-input>
                        </el-form-item>
                        <el-form-item label="设备分类"
                                      prop="equipmentType">
                            <el-input v-model="temp.equipmentType">
                                <el-button icon="el-icon-search"
                                           slot="append"
                                           @click="handleClicksbfl"></el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="出厂编号"
                                      prop="factoryCode">
                            <el-input v-model="temp.factoryCode"></el-input>
                        </el-form-item>
                        <el-form-item label="产线编码"
                                      prop="lineId">
                            <el-select v-model="temp.lineId"
                                       placeholder="请选择"
                                       size="small"
                                       clearable>
                                <el-option v-for="(item,index) in line"
                                           :key="index"
                                           :label="item.workCenterClassName"
                                           :value="item.workCenterClass" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="设备厂商"
                                      prop="manufacturer">
                            <el-input v-model="temp.manufacturer">
                                <el-button icon="el-icon-search"
                                           slot="append"
                                           @click="handleClickSuppier"></el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="责任人编号"
                                      prop="staffId">
                            <el-input v-model="temp.staffId">
                                <el-button icon="el-icon-search"
                                           slot="append"
                                           @click="handleClickPerson"></el-button>
                            </el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer"
                         class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">{{$t("table.cancel")}}</el-button>
                        <el-button v-if="dialogStatus == 'create'"
                                   type="primary"
                                   @click="create">{{ $t("table.confirm") }}</el-button>
                        <el-button v-else
                                   type="primary"
                                   @click="update">{{$t("table.confirm")}}</el-button>
                    </div>
                </el-dialog>

                <!-- 设备分类弹窗 -->
                <el-dialog class="table_dialog"
                           custom-class="dialog-custom"
                           title="设备分类"
                           :visible.sync="sbflDialogFormVisible"
                           v-dialogDrag
                           :close-on-click-modal="false">
                    <sbflSelection @handSelectSbflRows="handleDblclickSbfl"></sbflSelection>
                    <div slot="footer"
                         class="dialog-footer">
                        <el-button type="primary"
                                   @click="sbflUpdate">{{$t('table.confirm')}}</el-button>
                    </div>
                </el-dialog>

                <!-- 设备厂商弹窗 -->
                <el-dialog class="table_dialog"
                           custom-class="dialog-custom"
                           title="设备厂商"
                           :visible.sync="supplierDialogFormVisible"
                           v-dialogDrag
                           :close-on-click-modal="false">
                    <suppierSelection @handSelectSupplierRows="handleDblclickSupplier"></suppierSelection>
                    <div slot="footer"
                         class="dialog-footer">
                        <el-button type="primary"
                                   @click="supplierUpdate">{{$t('table.confirm')}}</el-button>
                    </div>
                </el-dialog>

                <!-- 责任人弹窗 -->
                <el-dialog class="table_dialog"
                           custom-class="dialog-custom"
                           title="责任人"
                           :visible.sync="personDialogFormVisible"
                           v-dialogDrag
                           :close-on-click-modal="false">
                    <personSelection @handSelectPersonRows="handleDblclickPerson"></personSelection>
                    <div slot="footer"
                         class="dialog-footer">
                        <el-button type="primary"
                                   @click="personUpdate">{{$t('table.confirm')}}</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>

</template>

<script>

import * as api from "@/api/data-base/equipment-ledger";
import Pagination from "@/components/Pagination";
import { mapState } from "vuex";
import sbflSelection from "./sbflSelection";
import suppierSelection from "./suppierSelection";
import personSelection from "./personSelection";
export default {
    name: "edger",
    components: { Pagination, sbflSelection, suppierSelection, personSelection },
    data () {
        return {
            theight: 0,//表格高度
            isSingle: true,//表格是否单选 点击各按钮根据流程逻辑控制单多选
            list: [],
            total: 0,
            listQuery: {
                //查询
                currentPage: 1,
                pageSize: 15
            },
            temp: {
                equipmentCode: undefined,
                equipmentMode: undefined,
                equipmentName: undefined,
                equipmentType: undefined,
                factoryCode: undefined,
                lineId: undefined,
                manufacturer: undefined,
                staffId: undefined,
            },
            line: null,
            equipmentCode: undefined,
            sbflDialogFormVisible: false,
            supplierDialogFormVisible: false,
            personDialogFormVisible: false,
            dialogFormVisible: false,
            dialogStatus: "",
            currentSelectedRow: null,//当前选中的行
            selectedRows: null,//多选时选中的所有行
            tableKey: 0 //表格索引
        };
    },
    created () { },
    computed: {
        ...mapState({
            dt_role_type: state => state.dict.dt_role_type
        })
    },
    mounted () {
        this.$store.dispatch("dict/getDicData", ["dt_role_type"]);
        this.setTableHeight();
        //表格高度自适应
        window.onresize = () => {
            this.setTableHeight()
        };
        this.getList()
    },
    methods: {
        //表格高度计算
        setTableHeight () {
            this.theight = this.$myFun.getSingleTbHeight();
        },
        //获取表格数据
        getList () {
            api.queryRecords(this.listQuery).then(res => {
                this.list = res.data.list
                this.total = res.data.pages.count
            })

        },
        //表格查询
        handleQuery () {
            this.listQuery.currentPage = 1;
            this.getList();
        },
        handleClose () {
            this.resetTemp();
            this.$refs.temp.resetFields();
        },
        //表格显示条数变化
        handleSizeChange (val) {
            this.listQuery.pageSize = val;
            this.getList();
        },
        //表格当前页变化
        handleCurrentChange (val) {
            this.listQuery.currentPage = val;
            this.getList();
        },

        resetTemp () {
            this.temp = {
                equipmentCode: undefined,
                equipmentMode: undefined,
                equipmentName: undefined,
                equipmentType: undefined,
                factoryCode: undefined,
                lineId: undefined,
                manufacturer: undefined,
                staffId: undefined,
            }
        },
        handleClicksbfl () {
            //设备分类弹窗
            this.sbflDialogFormVisible = true
        },
        handleDblclickSbfl (row) {
            //设备分类传值
            this.sbflClass = row
        },
        sbflUpdate () {
            //设备分类确定按钮
            if (this.sbflClass) {
                this.temp.equipmentType = this.sbflClass.equipTypeCode;
                this.sbflDialogFormVisible = false;
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条信息",
                    type: "warning"
                });
            }
        },
        handleClickSuppier () {
            //打开设备厂商窗口
            this.supplierDialogFormVisible = true

        },
        handleDblclickSupplier (row) {
            //设备厂商传值
            this.suppierRow = row

        },
        supplierUpdate () {
            //设备厂商确定按钮
            if (this.suppierRow) {
                this.temp.manufacturer = this.suppierRow.supplierCode;
                this.supplierDialogFormVisible = false;
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条信息",
                    type: "warning"
                });
            }

        },
        handleClickPerson () {
            //打开责任人窗口
            this.personDialogFormVisible = true

        },
        handleDblclickPerson (row) {
            //责任人传值
            this.personRow = row
        },
        personUpdate () {
            //责任人确认按钮
            if (this.personRow) {
                this.temp.staffId = this.personRow.userName;
                this.personDialogFormVisible = false;
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条信息",
                    type: "warning"
                });
            }


        },
        handleCreate () {
            //新增按钮单击事件方法
            this.resetTemp();
            this.dialogStatus = "create";
            this.dialogFormVisible = true;
            api.searchRecords().then(res => {
                this.line = res.data
            })
        },
        create () {
            //新增确认按钮
            api.addRecord(this.temp).then(() => {
                this.getList();
                this.dialogFormVisible = false;
                this.$message({
                    title: "成功",
                    message: "新增成功",
                    type: "success",
                    duration: 2000
                });
            });

        },
        handleUpdate () {
            //编辑按钮单击事件方法
            if (this.selectedRows && this.selectedRows.length == 1) {
                this.temp = this.selectedRows[0]
                this.dialogStatus = "update";
                this.dialogFormVisible = true;

            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条信息",
                    type: "warning"
                });
            }
        },
        update () {
            //编辑确认按钮
            api.updataRecord(this.temp.equipmentCode, this.temp).then(() => {
                this.getList();
                this.dialogFormVisible = false;
                this.$message({
                    title: "成功",
                    message: "更新成功",
                    type: "success",
                    duration: 2000
                });
            }
            );

        },
        handleDelete () {
            //删除按钮单击事件方法
            if (this.selectedRows) {
                this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    let equipmentCodes = [];
                    this.selectedRows.forEach((val, index) => {
                        equipmentCodes[index] = val.equipmentCode;
                    });
                    api.deleteRecord(equipmentCodes).then(() => {
                        this.getList(),
                            this.$message({
                                title: "成功",
                                message: "删除成功",
                                type: "success",
                                duration: 2000
                            });
                    })
                }).catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条信息",
                    type: "warning"
                });
            }
        },
        // 表格选择框选中 注:参数为选中的所有行的数组
        selectChange (val) {
            this.selectedRows = val;
        },
        //点击表格某一行
        rowClick (val) {
            this.$refs.tb.toggleRowSelection(val, "selected"); //单击行绑定点击事件
        }
    }
};
</script>


    