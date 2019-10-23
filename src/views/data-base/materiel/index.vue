<template>
    <div>
        <div class="app-container">
            <div class="filter-container">
                <div class="filter-items">
                    <dictItemSelect class="filter-item"
                                    :placeholder="$t('materiel.materielType')"
                                    :dictCode="DICT_CODE.materielType"
                                    v-model="listQuery.materielType"></dictItemSelect>
                    <dictItemSelect class="filter-item"
                                    :placeholder="$t('materiel.materielClassify')"
                                    :dictCode="DICT_CODE.materielClassify"
                                    v-model="listQuery.materielClassify"></dictItemSelect>
                    <dictItemSelect class="filter-item"
                                    :placeholder="$t('materiel.materielGroup')"
                                    :dictCode="DICT_CODE.materielGroup"
                                    v-model="listQuery.materielGroup"></dictItemSelect>
                    <el-input size="small"
                              :placeholder="$t('materiel.specification')"
                              v-model="listQuery.specification"
                              class="filter-item"
                              @keyup.enter.native="handleQuery" />
                    <el-input size="small"
                              :placeholder="$t('materiel.materielCode')"
                              v-model="listQuery.materielCode"
                              class="filter-item"
                              @keyup.enter.native="handleQuery" />
                    <el-input size="small"
                              :placeholder="$t('materiel.materielName')"
                              v-model="listQuery.materielName"
                              class="filter-item"
                              @keyup.enter.native="handleQuery" />
                    <el-input size="small"
                              :placeholder="$t('materiel.materialQuality')"
                              v-model="listQuery.materialQuality"
                              class="filter-item"
                              @keyup.enter.native="handleQuery" />
                    <dictItemSelect class="filter-item"
                                    :placeholder="$t('materiel.productionState')"
                                    :dictCode="DICT_CODE.productionState"
                                    v-model="listQuery.productionState"></dictItemSelect>
                    <el-button class="filter-item"
                               size="small"
                               type="primary"
                               icon="el-icon-search"
                               @click="handleQuery">{{ $t("table.search") }}</el-button>
                </div>
            </div>
            <div class="table-container">
                <div class="oprate_btn">
                    <el-button class="filter-item"
                               size="small"
                               type="primary"
                               @click="handleCreate"
                               icon="el-icon-plus">{{ $t("table.add") }}</el-button>
                    <el-button class="filter-item"
                               size="small"
                               type="primary"
                               @click="handleUpdate"
                               icon="el-icon-edit">{{ $t("table.edit") }}</el-button>
                    <el-button class="filter-item"
                               size="small"
                               type="primary"
                               @click="handleDelete"
                               icon="el-icon-delete">{{ $t("table.delete") }}</el-button>
                    <el-button size="small"
                               class="filter-item"
                               type="primary"
                               icon="el-icon-download"
                               @click="handleDownload">{{ $t("table.export") }}</el-button>
                    <el-button class="filter-item"
                               size="small"
                               type="primary"
                               @click="handleImport"
                               icon="el-icon-edit">{{$t('table.import')}}</el-button>
                </div>
                <el-table :key="tableKey"
                          :data="list"
                          border
                          fit
                          :height="theight"
                          highlight-current-row
                          style="width: 100%;"
                          @selection-change="selectRow"
                          size="mini"
                          cell-class-name="table-cell"
                          header-cell-class-name="header-cell">
                    <el-table-column type="selection"
                                     width="30"> </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="120"
                                     align="left"
                                     :label="$t('materiel.materielCode')"
                                     prop="materielCode"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="120"
                                     align="left"
                                     :label="$t('materiel.materielName')"
                                     prop="materielName"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="120"
                                     align="left"
                                     :label="$t('materiel.materielEngName')"
                                     prop="materielEngName"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="120"
                                     align="left"
                                     :label="$t('materiel.materielTypeName')"
                                     prop="materielTypeName"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="120"
                                     align="left"
                                     :label="$t('materiel.materielClassifyName')"
                                     prop="materielClassifyName"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="120"
                                     align="left"
                                     :label="$t('materiel.materielGroupName')"
                                     prop="materielGroupName"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="120"
                                     align="left"
                                     :label="$t('materiel.specification')"
                                     prop="specification"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="120"
                                     align="left"
                                     :label="$t('materiel.materialQuality')"
                                     prop="materialQuality"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="80"
                                     align="left"
                                     :label="$t('materiel.measuringUnitName')"
                                     prop="measuringUnitName"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="120"
                                     align="left"
                                     :label="$t('materiel.externalMaterielCode')"
                                     prop="externalMaterielCode"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="80"
                                     align="left"
                                     :label="$t('materiel.weight')"
                                     prop="weight"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="80"
                                     align="left"
                                     :label="$t('materiel.volume')"
                                     prop="volume"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="80"
                                     align="left"
                                     :label="$t('materiel.length')"
                                     prop="length"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="80"
                                     align="left"
                                     :label="$t('materiel.width')"
                                     prop="width"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="80"
                                     align="left"
                                     :label="$t('materiel.height')"
                                     prop="height"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="80"
                                     align="left"
                                     :label="$t('materiel.shelfLife')"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="80"
                                     align="left"
                                     :label="$t('materiel.classStandard')"
                                     prop="classStandard"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="120"
                                     align="left"
                                     :label="$t('materiel.productStandard')"
                                     prop="productStandard"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="80"
                                     align="left"
                                     :label="$t('materiel.productionStateName')"
                                     prop="productionStateName"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="80"
                                     align="left"
                                     :label="$t('materiel.importantMaterielMark')">
                        <template slot-scope="scope">
                            {{[scope.row.importantMaterielMark,TWO_STATE_OPTIONS] | optionsFilter}}
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="200"
                                     align="left"
                                     :label="$t('materiel.remark')"
                                     prop="remark"></el-table-column>
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
                    <el-form class="mini-space"
                             :model="temp"
                             :rules="rules"
                             ref="temp"
                             label-position="left"
                             label-width="120px"
                             :inline="true"
                             size="mini"
                             style="max-width: 700px; margin-left:10px;">
                        <el-form-item :label="$t('materiel.materielCode')"
                                      prop="materielCode">
                            <el-input v-model="temp.materielCode"
                                      :disabled="dialogStatus != 'create'"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('materiel.materielName')"
                                      prop="materielName">
                            <el-input v-model="temp.materielName"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('materiel.materielEngName')"
                                      prop="materielEngName">
                            <el-input v-model="temp.materielEngName"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('materiel.materielType')"
                                      prop="materielType">
                            <dictItemSelect :dictCode="DICT_CODE.materielType"
                                            v-model="temp.materielType"></dictItemSelect>
                        </el-form-item>
                        <el-form-item :label="$t('materiel.materielClassify')"
                                      prop="materielClassify">
                            <dictItemSelect :dictCode="DICT_CODE.materielClassify"
                                            v-model="temp.materielClassify"> </dictItemSelect>
                        </el-form-item>
                        <el-form-item :label="$t('materiel.materielGroup')">
                            <dictItemSelect :dictCode="DICT_CODE.materielGroup"
                                            v-model="temp.materielGroup"></dictItemSelect>
                        </el-form-item>
                        <el-form-item :label="$t('materiel.specification')"
                                      prop="specification">
                            <el-input v-model="temp.specification"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('materiel.materialQuality')"
                                      prop="materialQuality">
                            <el-input v-model="temp.materialQuality"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('materiel.measuringUnitName')">
                            <el-input style="width: 165px"
                                      v-model="temp.measuringUnitName"
                                      disabled>
                                <el-button slot="append"
                                           icon="el-icon-search"
                                           @click="handleMeasuringUnit"></el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item :label="$t('materiel.externalMaterielCode')"
                                      prop="externalMaterielCode">
                            <el-input v-model="temp.externalMaterielCode"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('materiel.weight')"
                                      prop="weight">
                            <el-input v-model="temp.weight"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('materiel.volume')"
                                      prop="volume">
                            <el-input v-model="temp.volume"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('materiel.length')"
                                      prop="length">
                            <el-input v-model="temp.length"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('materiel.width')"
                                      prop="width">
                            <el-input v-model="temp.width"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('materiel.height')"
                                      prop="height">
                            <el-input v-model="temp.height"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('materiel.shelfLife')"
                                      prop="shelfLife">
                            <el-input v-model="temp.shelfLife"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('materiel.classStandard')"
                                      prop="classStandard">
                            <el-input v-model="temp.classStandard"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('materiel.productStandard')"
                                      prop="productStandard">
                            <el-input v-model="temp.productStandard"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('materiel.productionState')">
                            <dictItemSelect :dictCode="DICT_CODE.productionState"
                                            v-model="temp.productionState"></dictItemSelect>
                        </el-form-item>
                        <el-form-item :label="$t('materiel.importantMaterielMark')"
                                      prop="importantMaterielMark">
                            <el-radio-group v-model="temp.importantMaterielMark">
                                <el-radio v-for="item in TWO_STATE_OPTIONS"
                                          :label="item.value"
                                          :key="item.value">{{ item.label }}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item :label="$t('materiel.remark')"
                                      prop="remark">
                            <el-input type="textarea"
                                      :rows="2"
                                      style="width: 460px"
                                      v-model="temp.remark"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer"
                         class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">{{$t("table.cancel")}}</el-button>
                        <el-button type="primary"
                                   @click="dialogStatus === 'create' ? create() : update()">{{ $t("table.confirm") }}</el-button>
                    </div>
                </el-dialog>

                <el-dialog class="table-container"
                           :title="$t('materiel.measuringUnitName')"
                           :visible.sync="dialogFormVisible2"
                           v-dialogDrag
                           @close="handleClose2">
                    <measureUnitTable v-on:dblclick="handleDblclick"></measureUnitTable>
                </el-dialog>

                <!-- 导入弹框 -->
                <el-dialog custom-class="dialog-custom"
                           class="table-container"
                           :title="'储位物料导入'"
                           :visible.sync="importDialogVisible"
                           v-dialogDrag
                           :close-on-click-modal="false">
                    <ImportFile ref="importDialog"
                                :modalNo="modalNo"></ImportFile>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
import * as api from "@/api/data-base/materiel";
import Pagination from "@/components/Pagination";
import ImportFile from "@/components/ImportFile";
import dictItemSelect from "@/components/Select/dictItemSelect.vue";
import measureUnitTable from "@/components/Table/measureUnitTable.vue";
import { DICT_CODE, TWO_STATE_OPTIONS } from "@/utils/constant";
import { parseTime } from "@/utils";
import global_valfn from '@/utils/global_valfn'

export default {
    name: "materiel",
    components: { Pagination, dictItemSelect, measureUnitTable, ImportFile },
    data () {
        return {
            list: null,
            total: 0,
            theight: 0,//表格高度
            listQuery: {
                page: true,
                currentPage: 1,
                pageSize: 10,
                materielCode: undefined,
                materielName: undefined,
                materielType: undefined,
                materielClassify: undefined,
                materielGroup: undefined,
                specification: undefined,
                materialQuality: undefined,
                productionState: undefined
            },
            temp: {
                classStandard: undefined,
                externalMaterielCode: undefined,
                height: undefined,
                importantMaterielMark: 0,
                length: undefined,
                materialQuality: undefined,
                materielClassify: undefined,
                materielCode: undefined,
                materielEngName: undefined,
                materielGroup: undefined,
                materielName: undefined,
                materielType: undefined,
                measuringUnit: undefined,
                productStandard: undefined,
                productionState: undefined,
                remark: undefined,
                shelfLife: undefined,
                specification: undefined,
                volume: undefined,
                weight: undefined,
                width: undefined
            },
            materielCode: undefined,
            selectCode: [],
            dialogFormVisible: false,
            dialogFormVisible2: false,
            importDialogVisible: false,//导入弹框
            modalNo: 'EXTP-BAS-0001',//导入模板编号
            dialogStatus: "",
            tableKey: 0,
            DICT_CODE: DICT_CODE,
            TWO_STATE_OPTIONS: TWO_STATE_OPTIONS,
            rules: {
                materielCode: [
                    { required: true, message: "物料编码不能为空", trigger: "blur" },
                    { pattern: /^[A-Z-_0-9]{1,50}$/, message: "由大写字母，数字，—和_组成，长度不能超过50", trigger: "blur" }
                ],
                materielName: [
                    { required: true, message: "物料名称不能为空", trigger: "blur" },
                    { max: 100, message: this.$t("validate.max32"), trigger: "blur" }
                ],
                materielEngName: [
                    { required: true, message: "物料名称不能为空", trigger: "blur" },
                    { max: 100, message: this.$t("validate.max32"), trigger: "blur" }
                ],
                materielType: [
                    { required: true, message: "物料类型不能空", trigger: "blur" }
                ],
                materielClassify: [
                    { required: true, message: "物料分类不能空", trigger: "blur" }
                ],
                specification: [
                    { max: 50, message: "长度不能超过50", trigger: "blur" }
                ],
                materialQuality: [
                    { max: 50, message: "长度不能超过50", trigger: "blur" }
                ],
                externalMaterielCode: [
                    { pattern: /^[A-Z-_0-9]{1,50}$/, message: "由大写字母，数字，—和_组成，长度不能超过50", trigger: "blur" }
                ],
                weight: [
                    { pattern: /^[0-9]{0,12}(\.[0-9]{2})?$/, message: "由正数组成，保留两位有效数，长度不能超过14", trigger: "blur" }
                ],
                volume: [
                    { pattern: /^[0-9]{0,12}(\.[0-9]{2})?$/, message: "由正数组成，保留两位有效数，长度不能超过14", trigger: "blur" }
                ],
                length: [
                    { pattern: /^[0-9]{0,12}(\.[0-9]{2})?$/, message: "由正数组成，保留两位有效数，长度不能超过14", trigger: "blur" }
                ],
                width: [
                    { pattern: /^[0-9]{0,12}(\.[0-9]{2})?$/, message: "由正数组成，保留两位有效数，长度不能超过14", trigger: "blur" }
                ],
                height: [
                    { pattern: /^[0-9]{0,12}(\.[0-9]{2})?$/, message: "由正数组成，保留两位有效数，长度不能超过14", trigger: "blur" }
                ],
                shelfLife: [
                    { pattern: /^[1-9]\d{0,11}$/, message: "由正数组成，长度不能超过12", trigger: "blur" }
                ],
                classStandard: [
                    { max: 100, message: this.$t("validate.max32"), trigger: "blur" }
                ],
                productStandard: [
                    { max: 50, message: "长度不能超过50", trigger: "blur" }
                ],
                remark: [
                    { max: 512, message: "描述长度为512内", trigger: "blur" }
                ]
            }
        };
    },
    created () {
        this.getList();
    },
    mounted () {
        this.setTableHeight();
        //表格高度自适应
        window.onresize = () => {
            this.setTableHeight()
        };
        this.getList();
    },
    methods: {
        getList () {
            api.queryRecords(this.listQuery).then(res => {
                this.list = res.data.list;
                this.total = res.data.pages.count;
            });
        },
        //表格高度计算
        setTableHeight () {
            this.theight = global_valfn.getSingleTbHeight();
        },
        handleQuery () {
            this.listQuery.currentPage = 1;
            this.getList();
        },
        handleSizeChange (val) {
            this.listQuery.pageSize = val;
            this.getList();
        },
        handleCurrentChange (val) {
            this.listQuery.currentPage = val;
            this.getList();
        },
        handleCreate () {
            this.resetTemp();
            this.dialogStatus = "create";
            this.dialogFormVisible = true;
        },
        // 获取表格选中时的数据
        selectRow (val) {
            this.selectlistRow = val;
        },
        handleUpdate () {
            //编辑弹窗
            if (this.selectlistRow && this.selectlistRow.length == 1) {
                this.readonly = true; //员工编码不可以编写
                this.temp = this.selectlistRow[0]; // copy obj
                api.getRecord(this.temp.materielCode).then(res => {
                    this.temp = res.data;
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
        update () {
            //编辑
            this.$refs["temp"].validate(valid => {
                if (valid) {
                    // const tempData = Object.assign({}, this.temp)
                    // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
                    api.updateRecord(this.temp.materielCode, this.temp).then(
                        () => {
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
                }
            });
        },
        handleDelete () {
            //删除列表
            if (this.selectlistRow && this.selectlistRow.length == 1) {
                this.$confirm("此操作将删除所选中数据, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        let ids = [];
                        this.selectlistRow.forEach((val, index) => {
                            ids[index] = val.materielCode;
                        });
                        api.deleteRecord(ids).then(() => {
                            this.getList(),
                                this.$message({
                                    title: "成功",
                                    message: "删除成功",
                                    type: "success",
                                    duration: 2000
                                });
                        });
                    })
                    .catch(() => {
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
        create () {
            this.$refs.temp.validate(valid => {
                if (valid) {
                    api.addRecord(this.temp).then(() => {
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
        resetTemp () {
            this.temp = {
                classStandard: undefined,
                externalMaterielCode: undefined,
                height: undefined,
                importantMaterielMark: 0,
                length: undefined,
                materialQuality: undefined,
                materielClassify: undefined,
                materielCode: undefined,
                materielEngName: undefined,
                materielGroup: undefined,
                materielName: undefined,
                materielType: undefined,
                measuringUnit: undefined,
                productStandard: undefined,
                productionState: undefined,
                remark: undefined,
                shelfLife: undefined,
                specification: undefined,
                volume: undefined,
                weight: undefined,
                width: undefined
            };
        },
        handleClose () {
            this.resetTemp();
            this.$refs.temp.resetFields();
        },
        handleClose2 () { },
        handleMeasuringUnit () {
            this.dialogFormVisible2 = true;
        },
        handleDblclick (row) {
            this.temp.measuringUnit = row.measureCode;
            this.temp.measuringUnitName = row.measureName;
            this.dialogFormVisible2 = false;
        },
        handleDownload () {
            this.downloadLoading = true;
            import("@/vendor/Export2Excel").then(excel => {
                const tHeader = [
                    "物料编码", "物料名称", "物料名称（英文）",
                    "物料类型", "物料分类", "物料组",
                    "规格", "材质", "计量单位",
                    "外部物料编码", "重量", "体积",
                    "长", "宽", "高",
                    "保质期", "产品等级", "产品标准",
                    "生产状态", "重保标记", "备注"
                ];
                const filterVal = [
                    "materielCode", "materielName", "materielEngName",
                    "materielType", "materielClassify", "materielGroup",
                    "specification", "materialQuality", "measuringUnitName",
                    "externalMaterielCode", "weight", "volume",
                    "length", "width", "height",
                    "shelfLife", "classStandard", "productStandard",
                    "productionState", "importantMaterielMark", "remark"
                ];
                const data = this.formatJson(filterVal, this.list);
                excel.export_json_to_excel({
                    header: tHeader,
                    data,
                    filename: "table-list"
                });
                this.downloadLoading = false;
            });
        },
        formatJson (filterVal, jsonData) {
            return jsonData.map(v =>
                filterVal.map(j => {
                    if (j === "timestamp") {
                        return parseTime(v[j]);
                    } else {
                        return v[j];
                    }
                })
            );
        },
        handleImport () {
            this.importDialogVisible = true;
            this.$nextTick(() => {
                this.$refs.importDialog.getList();
            })
        }
    }
};
</script>
