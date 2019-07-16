<template>
    <div class="app-container calendar-list-container">
        <el-row>
            <el-col :span="12" class="left-table">
                <div class="filter-container">
                    <div class="main-header">
                        <div class="select-content">
                            <el-input size="small" :placeholder="$t('dict.dictCode')" v-model="listQuery.dictCode" class="filter-item" @keyup.enter.native="handleQuery"/>
                            <el-input size="small" :placeholder="$t('dict.dictName')" v-model="listQuery.dictName" class="filter-item" @keyup.enter.native="handleQuery"/>
                            <el-button class="filter-item" size="small" type="primary" icon="el-icon-search" @click="handleQuery">{{$t('table.search')}}</el-button>
                        </div>
                    </div>
                    <div class="main-body">
                        <div class="btn">
                            <el-button class="filter-item" size="small" type="primary" @click="handleCreate" icon="el-icon-plus">{{$t('table.add')}}</el-button>
                            <el-button class="filter-item" size="small" type="primary" @click="handleUpdate" icon="el-icon-edit">{{$t('table.edit')}}</el-button>
                            <el-button class="filter-item" size="small" type="primary" @click="handleDelete" icon="el-icon-delete">{{$t('table.delete')}}</el-button>
                        </div>
                        <el-table
                            :key="tableKey"
                            :data="list"
                            border
                            fit
                            
                            highlight-current-row
                            style="width: 100%;"
                            @selection-change="selectRow"
                            cell-class-name="table-cell"
                            header-cell-class-name="header-cell"
                            @row-click="selectRow2"
                            ref="tb">
                            <el-table-column type="selection" width="30"></el-table-column>
                            <el-table-column show-overflow-tooltip width="200" align="left" :label="$t('dict.dictCode')" prop="dictCode"></el-table-column>
                            <el-table-column show-overflow-tooltip width="140" align="left" :label="$t('dict.dictName')" prop="dictName"></el-table-column>
                            <el-table-column show-overflow-tooltip min-width="120" align="left" :label="$t('dict.dictType')">
                                <template slot-scope="scope">
                                    {{ [scope.row.dictType, dictTypeOptions] | optionsFilter }}
                                </template>
                            </el-table-column>
                        </el-table>
                        <pagination :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize" @pagination="getList"/>
                    </div>
                </div>
                
            </el-col>

            <!-- 数据字典新增编辑弹窗 -->
            <el-dialog custom-class="dialog-custom" :close-on-click-modal="false" :close-on-press-escape="false" :title="dialogStatus=='create'?$t('table.add'):$t('table.edit')"
                :visible.sync="dialogFormVisible"
                @close="handleClose">
                <el-form class="small-space" :model="temp" :rules="rules" ref="temp" label-position="left" label-width="100px" :inline="false"
                    size="mini"
                    style="max-width: 500px; " >
                    <el-form-item :label="$t('dict.dictCode')" prop="dictCode">
                        <el-input v-model="temp.dictCode" :disabled="dialogStatus!='create'"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('dict.dictName')" prop="dictName">
                        <el-input v-model="temp.dictName"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('dict.dictType')">
                        <el-select v-model="temp.dictType">
                            <el-option
                                v-for="item in dictTypeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
                    <el-button type="primary" @click="dialogStatus==='create'?create():update()">{{ $t('table.confirm') }}</el-button>
                </div>
            </el-dialog>

            <!-- 新增明细弹窗 -->
            <el-dialog custom-class="dialog-custom" :close-on-click-modal="false" :close-on-press-escape="false" :title="dialogStatus=='create1'?$t('table.add'):$t('table.edit')"
                :visible.sync="dialogFormVisible1"
                @close="handleClose">
                <el-form class="small-space" :model="temp" :rules="rules" ref="temp" label-position="left" label-width="100px" :inline="false"
                    style="max-width: 500px; ">
                    <el-form-item :label="$t('dict.dictCode')" prop="dictCode">
                        <el-input v-model="temp.dictCode" :disabled="dialogStatus!='create'"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('dict.dictName')" prop="dictName">
                        <el-input v-model="temp.dictName" disabled></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('dict.dictType')">
                        <el-select v-model="temp.dictType" disabled>
                            <el-option
                                v-for="item in dictTypeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('dict.dictItemDTOs')">
                        <div style="max-height: 100px; overflow-y: scroll">
                            <div style="padding-bottom: 5px" v-for="item in temp.dictItemDTOs" :key="item.key">
                                <el-input v-model="item.dictItemKey" style="width: 150px" :placeholder="$t('dict.dictItemKey')"></el-input>
                                <el-input v-model="item.dictItemValue" style="width: 150px" :placeholder="$t('dict.dictItemValue')"></el-input>
                                <el-button type="danger" @click="deleteDictItem(item)">{{$t('table.delete')}}</el-button>
                            </div>
                        </div>
                        <el-button type="primary" @click="addDictItem">{{$t('table.addDictItem')}}</el-button>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible1 = false">{{ $t('table.cancel') }}</el-button>
                <el-button
                    type="primary"
                    @click="dialogStatus==='create1'?create1():update1()"
                >{{ $t('table.confirm') }}</el-button>
                </div>
            </el-dialog>

            <!-- 明细编辑弹窗 -->
            <el-dialog custom-class="dialog-custom" :close-on-click-modal="false" :close-on-press-escape="false" :title="dialogStatus=='update1'?$t('table.edit'):$t('table.add')"
                :visible.sync="dialogFormVisible2"
                @close="handleClose">
                <el-form class="small-space" :model="temp" :rules="rules" ref="temp" label-position="left" label-width="100px" :inline="false"
                    size="mini"
                    style="max-width: 500px; ">
                    <el-form-item :label="$t('dict.dictItemDTOs')">
                        <div style="padding-bottom: 5px" v-for="item in temp.dictItemDTOs" :key="item.key">
                            <el-input v-model="item.dictItemKey" style="width: 150px" :placeholder="$t('dict.dictItemKey')"></el-input>
                            <el-input v-model="item.dictItemValue" style="width: 150px" :placeholder="$t('dict.dictItemValue')"></el-input>
                        </div>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible2 = false">{{ $t('table.cancel') }}</el-button>
                    <el-button type="primary" @click="dialogStatus==='update1'?update1():create1()">{{ $t('table.confirm') }}</el-button>
                </div>
            </el-dialog>

            <el-col :span="12" class="right-table">
                <div class="table-container">
                    <div class="table-items table-items-top">
                        <el-button class="filter-item" size="small" type="primary" @click="handleCreate1" icon="el-icon-plus">{{$t('table.add')}}</el-button>
                        <el-button class="filter-item" size="small" type="primary" @click="handleUpdate1" icon="el-icon-edit">{{$t('table.edit')}}</el-button>
                        <el-button class="filter-item" size="small" type="primary" @click="handleDelete1()" icon="el-icon-delete">{{$t('table.delete')}}</el-button>
                    </div>
                    <el-table
                        :key="tableKey"
                        :data="list1"
                        border
                        fit
                        height="285px"
                        highlight-current-row
                        style="width: 100%;"
                        @selection-change="selectRow1"
                        size="mini"
                        cell-class-name="table-cell"
                        header-cell-class-name="header-cell"
                        v-bind:parentdictCode="dictCode"
                    >
                        <el-table-column type="selection" width="30"></el-table-column>
                        <el-table-column show-overflow-tooltip width="200" align="left" :label="$t('dict.dictItemKey')" prop="dictItemKey"></el-table-column>
                        <el-table-column show-overflow-tooltip min-width="140" align="left" :label="$t('dict.dictItemValue')" prop="dictItemValue"></el-table-column>
                    </el-table>
                    <pagination :total="total1" :page.sync="listQuery1.currentPage" :limit.sync="listQuery1.pageSize" @pagination="getList"/>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import * as api from "@/api/system/dict";
import Pagination from "@/components/Pagination";
export default {
    name: "Dict",
    components: { Pagination },
    data() {
        return {
            list: null,
            list1: [],
            total: 0,
            total1: 0,
            listQuery: {
                page: true,
                currentPage: 1,
                pageSize: 10,
                dictCode: undefined,
                dictName: undefined,
                dictType: undefined,
                dictItemKey: undefined,
                dictItemValue: undefined
            },
            listQuery1: {
                page: true,
                currentPage: 1,
                pageSize: 10
            },
            temp: {
                dictCode: undefined,
                dictName: undefined,

                dictType: undefined,
                dictItemDTOs: []
            },
            dictCode: undefined,
            selectCode: [],
            dialogFormVisible: false,
            dialogFormVisible1: false,
            dialogFormVisible2: false,
            dialogStatus: "",
            textMap: {
                update: "编辑",
                create: "新增",
                update1: "编辑",
                create1: "新增"
            },

            tableKey: 0,
            dictTypeOptions: [
                {
                    value: 1,
                    label: '系统字典'
                }, {
                    value: 2,
                    label: '业务字典'
                }
            ],
            dictItems: [],
            rules: {
                dictCode: [
                { required: true, message: "字典编码不能为空", trigger: "blur" },
                { max: 32, message: "长度不能超过32", trigger: "blur" }
                ],
                dictName: [
                { required: true, message: "字典名称不能为空", trigger: "blur" },
                { max: 32, message: "长度不能超过32", trigger: "blur" }
                ]
            }
        };
    },
    created() {
        this.getList();
    },
    methods: {
        getList() {
            api.queryRecords(this.listQuery).then(res => {
                this.list = res.data.list;
                this.total = res.data.pages.count;
            });
        },
        getList1() {//查询明细
            api.getRecord(this.selectlistRow2.dictCode).then(res => {
                this.list1 = res.dictItemDTOs;
                this.total1 = res.dictItemDTOs.length;
            });
        },
        handleQuery() {
            this.listQuery.currentPage = 1;
            this.getList();
        },
        handleSizeChange(val) {
            this.listQuery.pageSize = val;
            this.getList();
        },
        handleCurrentChange(val) {
            this.listQuery.currentPage = val;
            this.getList();
        },
        handleCreate() {
            this.resetTemp();
            this.dialogStatus = "create";
            this.dialogFormVisible = true;
        },
        handleCreate1() {//新增明细弹窗
            if (this.selectlistRow && this.selectlistRow.length == 1) {
                this.readonly = true; //员工编码不可以编写
                this.temp = this.selectlistRow[0]; // copy obj
                api.getRecord(this.temp.dictCode).then(res => {
                this.temp = res;
                this.dialogStatus = "create1";
                this.dialogFormVisible1 = true;
                this.$nextTick(() => {
                    this.$refs["temp"].clearValidate();
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
        create1() {//新增明细弹窗方法
            this.$refs["temp"].validate(valid => {
                if (valid) {
                this.temp.dictItemDTOs = this.temp.dictItemDTOs.filter(
                    v => v.dictItemKey != "" && v.dictItemKey != ""
                );

                api.updateRecord(this.temp.dictCode, this.temp).then(() => {
                    this.getList1();

                    this.dialogFormVisible1 = false;
                    this.$message({
                    title: "成功",
                    message: "更新成功",
                    type: "success",
                    duration: 2000
                    });
                });
                }
            });
        },

        // 获取表格1选中时的数据
        selectRow(val) {
            this.selectlistRow = val;
        },
        // 获取表格2选中时的数据
        selectRow1(val) {
            this.selectlistRow1 = val;
        },
        selectRow2(val) {//表一单击行选中方法
            this.selectlistRow2 = val;
            this.$refs.tb.clearSelection();
            this.$refs.tb.toggleRowSelection(val); //单击行绑定点击事件
            this.getList1();
        },
        handleUpdate() { //编辑弹窗
            if (this.selectlistRow && this.selectlistRow.length == 1) {
                this.readonly = true; //员工编码不可以编写
                this.temp = this.selectlistRow[0]; // copy obj
                api.getRecord(this.temp.dictCode).then(res => {
                this.temp = res;
                this.list1 = res.dictItemDTOs;
                this.dialogStatus = "update";
                this.dialogFormVisible = true;
                this.$nextTick(() => {
                    this.$refs["temp"].clearValidate();
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
        update() { //编辑
            this.$refs["temp"].validate(valid => {
                if (valid) {
                this.temp.dictItemDTOs = this.temp.dictItemDTOs.filter(
                    v => v.dictItemKey != "" && v.dictItemKey != ""
                );

                api.updateRecord(this.temp.dictCode, this.temp).then(() => {
                    this.getList();
                    this.dialogFormVisible = false;
                    this.dialogFormVisible1 = false;
                    this.$message({
                    title: "成功",
                    message: "更新成功",
                    type: "success",
                    duration: 2000
                    });
                });
                }
            });
        },

        handleUpdate1() {//明细编辑弹窗
            // if (!this.selectlistRow2.dictCode) {
            //   this.$message.warning('请选择对应分类编码！')
            //   return
            // }
            if (this.selectlistRow1 && this.selectlistRow1.length == 1) {
                this.readonly = true; //员工编码不可以编写
                this.selectlistRow2.dictItemDTOs[0] = this.selectlistRow1[0]; //
                this.temp.dictItemDTOs[0] = this.selectlistRow1[0];
                this.dialogStatus = "update1";
                this.dialogFormVisible2 = true;
            } else {
                this.$message({
                title: "警告",
                message: "请选择一条信息",
                type: "warning"
                });
            }
        },
        update1() {//明细编辑弹窗
            this.$refs["temp"].validate(valid => {
                if (valid) {
                this.temp.dictItemDTOs = this.temp.dictItemDTOs.filter(
                    v => v.dictItemKey != "" && v.dictItemKey != ""
                );
                let index = this.list1.indexOf(this.selectlistRow1[0]);
                if (index !== -1) {
                    this.list1.splice(index, 1, this.selectlistRow1[0]);
                }
                this.selectlistRow2.dictItemDTOs = this.list1; //
                api.updateRecord(this.selectlistRow2.dictCode, this.selectlistRow2).then(() => {
                    this.getList1();
                    this.dialogFormVisible2 = false;
                    this.$message({
                        title: "成功",
                        message: "更新成功",
                        type: "success",
                        duration: 2000
                    });
                    });
                }
            });
        },

        handleDeleteBatch() {
            if (this.selectCode.length == 0) {
                this.$message.warning("请勾选记录！");
                return;
            }
            this.delete(this.selectCode);
        },
        handleDelete() {//删除字典列表
            if (this.selectlistRow && this.selectlistRow.length == 1) {
                this.$confirm("此操作将删除所选中数据, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
                }).then(() => {
                    let ids = [];
                    this.selectlistRow.forEach((val, index) => {
                    ids[index] = val.dictCode;
                    });
                    api.deleteRecord(ids).then(response => {
                    this.getList(),
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
        handleDelete1() {//删除明细列表
            if (this.selectlistRow1 && this.selectlistRow1.length == 1) {
                this.$confirm("此操作将删除所选中数据, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
                }).then(() => {
                    let index = this.list1.indexOf(this.selectlistRow1[0]);
                    if (index !== -1) {
                    this.list1.splice(index, 1);
                    }
                    this.selectlistRow2.dictItemDTOs = this.list1; //
                    api.updateRecord(this.selectlistRow2.dictCode, this.selectlistRow2).then(() => {
                        this.getList1(),
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
        create() {//新增数据字典
            this.$refs.temp.validate(valid => {
                if (valid) {
                this.temp.dictItemDTOs = this.temp.dictItemDTOs.filter(
                    v => v.dictItemKey != "" && v.dictItemKey != ""
                );
                api.addRecord(this.temp).then(res => {
                    this.getList();
                    this.dialogFormVisible = false;
                    this.$notify({
                    title: "成功",
                    message: "新增成功",
                    type: "success",
                    duration: 2000
                    });
                });
                } else {
                return false;
                }
            });
        },
        resetTemp() {
            this.temp = {
                dictCode: undefined,
                dictName: undefined,
                dictType: undefined,
                dictItemDTOs: []
            };
        },
        handleClose() {
            this.resetTemp();
            this.$refs.temp.resetFields();
        },
        handleSelectionChange(selection) {
            this.selectCode = selection.map(v => v.dictCode);
        },
        addDictItem() {
            this.temp.dictItemDTOs.push({
                dictItemKey: "",
                dictItemValue: "",
                key: Date.now()
            });
        },
        deleteDictItem(item) {
            
            var index = this.temp.dictItemDTOs.indexOf(item);
            if (index !== -1) {
                this.temp.dictItemDTOs.splice(index, 1);
            }
        }
    }
};
</script>
