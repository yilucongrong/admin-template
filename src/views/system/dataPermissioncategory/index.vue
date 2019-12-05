<template>
    <div>
        <div class="app-container">
            <div class="filter-container">
                <div class="filter-item">
                    <el-select size="small"
                               v-model="listQuery.accessType"
                               :placeholder="$t('dataPermissioncategory.accessType')"
                               clearable
                               @keyup.enter.native="handleFilter">
                        <el-option v-for="item in dt_datarights_type"
                                   :key="item.dictItemKey"
                                   :label="item.dictItemValue"
                                   :value="item.dictItemKey"></el-option>
                    </el-select>
                    <el-button type="primary"
                               size="small"
                               icon="el-icon-search"
                               @click="handleFilter">{{ $t('table.search') }}</el-button>
                </div>
            </div>
            <div class="table-container">
                <div class="oprate_btn">
                    <el-button size="small"
                               class="filter-item"
                               type="primary"
                               icon="el-icon-plus"
                               @click="handleCreate">{{ $t('table.add') }}</el-button>
                    <el-button size="small"
                               class="filter-item"
                               type="primary"
                               icon="el-icon-edit"
                               @click="handleUpdate">{{ $t('table.edit') }}</el-button>
                    <el-button size="small"
                               class="filter-item"
                               type="primary"
                               icon="el-icon-delete"
                               @click="handleDelete">{{ $t('table.delete') }}</el-button>
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
                                     width="30"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="120"
                                     align="left"
                                     :label="$t('dataPermissioncategory.rowId')"
                                     prop="rowId"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="200"
                                     align="left"
                                     :label="$t('dataPermissioncategory.accessType')"
                                     prop="accessType"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="100"
                                     align="left"
                                     :label="$t('dataPermissioncategory.metaDataName')"
                                     prop="metaDataName"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="100"
                                     align="left"
                                     :label="$t('dataPermissioncategory.endpointCode')"
                                     prop="endpointCode"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="100"
                                     align="left"
                                     :label="$t('dataPermissioncategory.endpointGroup')"
                                     prop="endpointGroup"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="100"
                                     align="left"
                                     :label="$t('dataPermissioncategory.conditions')"
                                     prop="conditions"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="100"
                                     align="left"
                                     :label="$t('dataPermissioncategory.disFields')"
                                     prop="disFields"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="100"
                                     align="left"
                                     :label="$t('dataPermissioncategory.disFieldsChn')"
                                     prop="disFieldsChn"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="100"
                                     align="left"
                                     :label="$t('dataPermissioncategory.disFieldsEng')"
                                     prop="disFieldsEng"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     min-width="200"
                                     align="left"
                                     :label="$t('dataPermissioncategory.accessField')"
                                     prop="accessField"></el-table-column>
                </el-table>
                <pagination v-show="total>0"
                            :total="total"
                            :page.sync="listQuery.currentPage"
                            :limit.sync="listQuery.pageSize"
                            @pagination="getList" />
            </div>
            <!-- 新增，修改弹窗 -->
            <el-dialog custom-class="dialog-custom"
                       :title="dialogStatus=='create'?$t('table.add'):$t('table.edit')"
                       :visible.sync="dialogFormVisible">
                <el-form class="small-space"
                         size="mini"
                         ref="dataForm"
                         :inline="true"
                         :rules="rules"
                         :model="temp"
                         label-width="120px">
                    <el-form-item :label="$t('dataPermissioncategory.accessType')"
                                  prop="accessType"
                                  :readonly="readonly">
                        <el-select size="small"
                                   v-model="temp.accessType"
                                   :placeholder="$t('dataPermissioncategory.accessType')"
                                   clearable
                                   @keyup.enter.native="handleFilter">
                            <el-option v-for="item in dt_datarights_type"
                                       :key="item.dictItemKey"
                                       :label="item.dictItemValue"
                                       :value="item.dictItemKey"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('dataPermissioncategory.metaDataCode')"
                                  prop="metaDataCode">
                        <el-input v-model="temp.metaDataCode" />
                    </el-form-item>
                    <el-form-item :label="$t('dataPermissioncategory.metaDataName')"
                                  prop="metaDataName">
                        <el-input v-model="temp.metaDataName" />
                    </el-form-item>
                    <el-form-item :label="$t('dataPermissioncategory.endpointGroup')"
                                  prop="endpointGroup">
                        <el-input v-model="temp.endpointGroup" />
                    </el-form-item>
                    <el-form-item :label="$t('dataPermissioncategory.endpointCode')"
                                  prop="endpointCode">
                        <el-input v-model="temp.endpointCode" />
                    </el-form-item>
                    <el-form-item :label="$t('dataPermissioncategory.conditions')"
                                  prop="conditions">
                        <el-input v-model="temp.conditions" />
                    </el-form-item>
                    <el-form-item :label="$t('dataPermissioncategory.accessField')"
                                  prop="accessField">
                        <el-input v-model="temp.accessField" />
                    </el-form-item>
                    <el-form-item :label="$t('dataPermissioncategory.disFieldsChn')"
                                  prop="disFieldsChn">
                        <el-input v-model="temp.disFieldsChn" />
                    </el-form-item>
                    <el-form-item :label="$t('dataPermissioncategory.disFieldsEng')"
                                  prop="disFieldsEng">
                        <el-input v-model="temp.disFieldsEng" />
                    </el-form-item>
                    <el-form-item :label="$t('dataPermissioncategory.disFields')"
                                  prop="disFields">
                        <el-input v-model="temp.disFields" />
                    </el-form-item>
                    <el-form-item :label="$t('dataPermissioncategory.state')"
                                  prop="state">
                        <el-radio-group v-model="temp.state">
                            <el-radio :label="1">启用</el-radio>
                            <el-radio :label="0">禁用</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
                <div slot="footer"
                     class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
                    <el-button type="primary"
                               @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button>
                </div>
            </el-dialog>
        </div>
    </div>

</template>
<script>
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
// import waves from "@/directive/waves"; // Waves directive
import { DICT_CODE } from "@/utils/constant";
import * as api from "@/api/system/dataPermissioncategory";
import { mapState } from "vuex";

export default {
    name: "dataPermissioncategory",
    components: { Pagination },
    // directives: { waves },
    data () {
        return {
            tableKey: 0,
            DICT_CODE: DICT_CODE,
            list: [],
            theight: 0,//表格高度
            total: 0,
            listQuery: {
                currentPage: 1,
                pageSize: 15,
                page: 1
            },
            readonly: false,
            temp: {
                endpointCode: undefined,
                endpointName: undefined,
                url: undefined,
                method: undefined,
                remark: undefined,
                state: 1
            },
            dialogFormVisible: false,
            dialogFormUser: false,
            dialogStatus: "",
            rules: {
                endpointCode: [
                    { required: true, message: "资源编码不能为空", trigger: "blur" },
                    { max: 100, message: "组织编码长度不能超过100", trigger: "blur" }
                ],
                endpointName: [
                    { required: true, message: "资源名称不能为空", trigger: "blur" },
                    { max: 100, message: "编码名称长度不能超过100", trigger: "blur" }
                ],
                method: [
                    { required: true, message: this.$t("validate.required"), trigger: "blur" }
                ],
                url: [
                    { required: true, message: this.$t("validate.required"), trigger: "blur" }
                ]
            },
            dialogPvVisible: false,
            pvData: []
        };
    },
    computed: {
        ...mapState({
            dt_datarights_type: state => state.dict.dt_datarights_type
        })
    },
    mounted () {
        this.$store.dispatch("dict/getDicData", ["dt_datarights_type"]);
        this.setTableHeight();
        //表格高度自适应
        window.onresize = () => {
            this.setTableHeight()
        };
        this.getList();
    },
    created () {
        this.getList();
    },
    methods: {
        getList () {//查询数据
            api.selectlists(this.listQuery).then(res => {
                this.list = res.data.list;
                this.total = res.data.pages.count;
            });
        },
        //表格高度计算
        setTableHeight () {
            this.theight = this.$myFun.getSingleTbHeight();
        },
        handleFilter () {//查询按钮
            this.getList();
        },
        resetTemp () {//重置
            this.temp = {
                endpointCode: undefined,
                endpointName: undefined,
                url: undefined,
                method: undefined,
                remark: undefined,
                state: 1
            };
        },
        handleCreate () {//新增
            this.resetTemp();
            this.dialogStatus = "create";
            this.dialogFormVisible = true;
        },
        createData () {//新增
            api.addRecord(this.temp).then(() => {
                this.dialogFormVisible = false;
                this.getList();
                this.$message({
                    title: "成功",
                    message: "新增成功",
                    type: "success",
                    duration: 2000
                });
            });
        },
        handleUpdate () {//编辑
            if (this.selectlistRow && this.selectlistRow.length == 1) {
                this.temp = this.selectlistRow[0]; // copy obj
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
        updateData () {//编辑
            api.updateRecord(this.temp).then(() => {
                this.dialogFormVisible = false;
                this.getList();
                this.$message({
                    title: "成功",
                    message: "更新成功",
                    type: "success",
                    duration: 2000
                });
            });
        },
        // 获取表格选中时的数据
        selectRow (val) {
            this.selectlistRow = val;
        },
        handleDelete () {//删除列表
            if (this.selectlistRow && this.selectlistRow.length == 1) {
                let ids = [];
                this.selectlistRow.forEach((val, index) => {
                    ids[index] = val.rowId;
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
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条信息",
                    type: "warning"
                });
            }
        }
    }
};
</script>
<style scoped>
.btn,
.select-title {
    border: solid 1px #ded8e1;
    border-bottom: 0px;
    border-top: solid 5px #ded8e1;
    padding: 8px 10px;
}
.left-trees {
    background-color: #e2e9ef;
}
.main-content {
    margin: 20px;
}
.select-content {
    border: solid 1px #ded8e1;
    padding: 9px 10px;
}
.el-tree {
    margin-top: 20px;
    background-color: #e2e9ef;
}
</style>