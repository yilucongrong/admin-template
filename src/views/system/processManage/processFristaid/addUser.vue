<template>
    <el-row>
        <el-col :span="5"
                class="left-trees">
            <div class="left-tree">
                <el-tree :data="treeData"
                         :props="defaultProps"
                         @node-click="handleNodeClick"
                         :style="contentStyleObj">
                </el-tree>
            </div>
        </el-col>
        <el-col :span="19">
            <div class="app-container">
                <div class="table_container">
                    <el-tabs v-model="activeName"
                             type="card">
                        <el-tab-pane :label="'备选项'"
                                     name="first">
                            <div class="table-container">

                                <el-table :key="tableKey"
                                          :data="list"
                                          border
                                          fit
                                          :height="theight"
                                          highlight-current-row
                                          style="width: 100%;"
                                          cell-class-name="table-cell"
                                          header-cell-class-name="header-cell"
                                          @selection-change="selectRow"
                                          @row-click="rowClick"
                                          ref="tb_a">
                                    <el-table-column type="selection"
                                                     fixed
                                                     width="30"
                                                     align="center">
                                    </el-table-column>
                                    <el-table-column show-overflow-tooltip
                                                     :label="$t('table.organizationNum')"
                                                     fixed
                                                     prop="organizationCode"
                                                     align="center"
                                                     width="120">
                                        <template slot-scope="scope">
                                            <span>{{
                                        scope.row.organizationCode
                                    }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column show-overflow-tooltip
                                                     :label="$t('table.organizationName')"
                                                     fixed
                                                     width="120px"
                                                     align="center">
                                        <template slot-scope="scope">
                                            <span>{{
                                        scope.row.organizationName
                                    }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column show-overflow-tooltip
                                                     :label="$t('table.organizationType')"
                                                     fixed
                                                     min-width="140px">
                                        <template slot-scope="scope">
                                            <span>{{ scope.row.typeCN }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column show-overflow-tooltip
                                                     :label="$t('table.parentId')"
                                                     width="120px"
                                                     align="center">
                                        <template slot-scope="scope">
                                            <span>{{
                                        scope.row.parentId
                                            | organizationFilter(scope.row)
                                    }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column show-overflow-tooltip
                                                     :label="$t('table.contacts')"
                                                     align="center"
                                                     width="120px">
                                        <template slot-scope="scope">
                                            <span>{{ scope.row.contact }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column show-overflow-tooltip
                                                     :label="$t('table.address')"
                                                     width="120px"
                                                     align="center">
                                        <template slot-scope="scope">
                                            <span>{{ scope.row.adress }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column show-overflow-tooltip
                                                     :label="$t('table.email')"
                                                     width="150px">
                                        <template slot-scope="scope">
                                            <span>{{ scope.row.email }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column show-overflow-tooltip
                                                     :label="$t('table.businessFunction')"
                                                     width="150px">
                                        <template slot-scope="scope">
                                            <span>{{
                                        scope.row.businessFunctionCN
                                    }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column show-overflow-tooltip
                                                     :label="$t('table.mobile')"
                                                     width="150px">
                                        <template slot-scope="scope">
                                            <span>{{ scope.row.mobile }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column show-overflow-tooltip
                                                     :label="$t('table.remarks')"
                                                     width="150px">
                                        <template slot-scope="scope">
                                            <span>{{ scope.row.remark }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column show-overflow-tooltip
                                                     :label="$t('table.state')"
                                                     width="80px">
                                        <template slot-scope="scope">
                                            <span>{{
                                        scope.row.state | stateFilter
                                    }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column show-overflow-tooltip
                                                     :label="$t('table.postalCode')"
                                                     class-name="status-col"
                                                     width="120px">
                                        <template slot-scope="scope">
                                            <span>{{ scope.row.postalCode }}</span>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <pagination v-show="total > 0"
                                            :total="total"
                                            :page.sync="listQuery.currentPage"
                                            :limit.sync="listQuery.pageSize"
                                            @pagination="getList" />
                            </div>
                        </el-tab-pane>
                        <el-tab-pane :label="'已选项'"
                                     name="second">
                            <div class="table-container">
                                <el-table :key="tableKey"
                                          :data="list"
                                          border
                                          fit
                                          :height="theight"
                                          highlight-current-row
                                          style="width: 100%;"
                                          cell-class-name="table-cell"
                                          header-cell-class-name="header-cell"
                                          @selection-change="selectRow"
                                          @row-click="rowClick"
                                          ref="tb_a">
                                    <el-table-column type="selection"
                                                     fixed
                                                     width="30"
                                                     align="center">
                                    </el-table-column>
                                    <el-table-column show-overflow-tooltip
                                                     :label="$t('table.organizationNum')"
                                                     fixed
                                                     prop="organizationCode"
                                                     align="center"
                                                     width="120">
                                        <template slot-scope="scope">
                                            <span>{{
                                        scope.row.organizationCode
                                    }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column show-overflow-tooltip
                                                     :label="$t('table.organizationName')"
                                                     fixed
                                                     width="120px"
                                                     align="center">
                                        <template slot-scope="scope">
                                            <span>{{
                                        scope.row.organizationName
                                    }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column show-overflow-tooltip
                                                     :label="$t('table.organizationType')"
                                                     fixed
                                                     min-width="140px">
                                        <template slot-scope="scope">
                                            <span>{{ scope.row.typeCN }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column show-overflow-tooltip
                                                     :label="$t('table.parentId')"
                                                     width="120px"
                                                     align="center">
                                        <template slot-scope="scope">
                                            <span>{{
                                        scope.row.parentId
                                            | organizationFilter(scope.row)
                                    }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column show-overflow-tooltip
                                                     :label="$t('table.contacts')"
                                                     align="center"
                                                     width="120px">
                                        <template slot-scope="scope">
                                            <span>{{ scope.row.contact }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column show-overflow-tooltip
                                                     :label="$t('table.address')"
                                                     width="120px"
                                                     align="center">
                                        <template slot-scope="scope">
                                            <span>{{ scope.row.adress }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column show-overflow-tooltip
                                                     :label="$t('table.email')"
                                                     width="150px">
                                        <template slot-scope="scope">
                                            <span>{{ scope.row.email }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column show-overflow-tooltip
                                                     :label="$t('table.businessFunction')"
                                                     width="150px">
                                        <template slot-scope="scope">
                                            <span>{{
                                        scope.row.businessFunctionCN
                                    }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column show-overflow-tooltip
                                                     :label="$t('table.mobile')"
                                                     width="150px">
                                        <template slot-scope="scope">
                                            <span>{{ scope.row.mobile }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column show-overflow-tooltip
                                                     :label="$t('table.remarks')"
                                                     width="150px">
                                        <template slot-scope="scope">
                                            <span>{{ scope.row.remark }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column show-overflow-tooltip
                                                     :label="$t('table.state')"
                                                     width="80px">
                                        <template slot-scope="scope">
                                            <span>{{
                                        scope.row.state | stateFilter
                                    }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column show-overflow-tooltip
                                                     :label="$t('table.postalCode')"
                                                     class-name="status-col"
                                                     width="120px">
                                        <template slot-scope="scope">
                                            <span>{{ scope.row.postalCode }}</span>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-tab-pane>
                    </el-tabs>

                </div>

                <el-dialog custom-class="dialog-custom"
                           size="small"
                           :title="
                        dialogStatus == 'create'
                            ? $t('btn.add')
                            : $t('btn.edit')
                    "
                           :visible.sync="dialogFormVisible"
                           v-dialogDrag
                           :close-on-click-modal="false">
                    <el-form class="small-space"
                             ref="dataForm"
                             :inline="true"
                             :rules="rules"
                             :model="temp"
                             label-width="120px">
                        <el-form-item :label="$t('table.organizationNum')"
                                      prop="organizationCode">
                            <el-input v-if="dialogStatus == 'update'"
                                      v-model="temp.organizationCode"
                                      disabled="disabled" />
                            <el-input v-else
                                      v-model="temp.organizationCode" />
                        </el-form-item>
                        <el-form-item :label="$t('table.organizationName')"
                                      prop="organizationName">
                            <el-input v-model="temp.organizationName" />
                        </el-form-item>
                        <el-form-item :label="$t('table.parentId')"
                                      prop="parentId">
                            <el-input v-model="temp.parentId"
                                      disabled="disabled" />
                        </el-form-item>
                        <el-form-item :label="$t('table.organizationType')"
                                      prop="type">
                            <el-select size="small"
                                       v-model="temp.type"
                                       :placeholder="$t('table.select')">
                                <el-option v-for="item in dt_org_type"
                                           :key="item.dictItemKey"
                                           :label="item.dictItemValue"
                                           :value="item.dictItemKey">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="$t('table.contacts')">
                            <el-input v-model="temp.contact" />
                        </el-form-item>
                        <el-form-item :label="$t('table.email')"
                                      prop="email">
                            <el-input v-model="temp.email" />
                        </el-form-item>
                        <el-form-item :label="$t('table.postalCode')"
                                      prop="postalCode">
                            <el-input v-model="temp.postalCode" />
                        </el-form-item>
                        <el-form-item :label="$t('table.businessFunction')"
                                      prop="businessFunction">
                            <el-select size="small"
                                       v-model="temp.businessFunction"
                                       :placeholder="$t('table.select')">
                                <el-option v-for="item in dt_org_function"
                                           :key="item.dictItemKey"
                                           :label="item.dictItemValue"
                                           :value="item.dictItemKey">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="$t('table.mobile')"
                                      prop="mobile">
                            <el-input v-model="temp.mobile" />
                        </el-form-item>
                        <el-form-item :label="$t('table.state')"
                                      prop="state">
                            <el-radio-group v-model="temp.state">
                                <el-radio :label="1">{{
                                    $t("from.open")
                                }}</el-radio>
                                <el-radio :label="0">{{
                                    $t("from.stop")
                                }}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item :label="$t('table.address')">
                            <el-input type="textarea"
                                      :rows="2"
                                      v-model="temp.adress"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('table.remarks')"
                                      prop="remark">
                            <el-input type="textarea"
                                      :rows="2"
                                      v-model="temp.remark"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer"
                         class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">{{
                            $t("btn.cancel")
                        }}</el-button>
                        <el-button type="primary"
                                   @click="
                                dialogStatus === 'create'
                                    ? createData()
                                    : updateData()
                            ">{{ $t("btn.confirm") }}</el-button>
                    </div>
                </el-dialog>

                <el-dialog :visible.sync="dialogPvVisible"
                           title="Reading statistics">
                    <el-table :data="pvData"
                              border
                              fit
                              highlight-current-row
                              style="width: 100%">
                        <el-table-column show-overflow-tooltip
                                         prop="key"
                                         label="Channel" />
                        <el-table-column show-overflow-tooltip
                                         prop="pv"
                                         label="Pv" />
                    </el-table>
                    <span slot="footer"
                          class="dialog-footer">
                        <el-button type="primary"
                                   @click="dialogPvVisible = false">{{ $t("btn.confirm") }}</el-button>
                    </span>
                </el-dialog>
            </div>
        </el-col>
    </el-row>
</template>
<script>
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
import {
    selectlists,
    creat,
    deletelist,
    updatalist,
    selecttree
} from "@/api/system/organization";
import { parseTime } from "@/utils";
import { mapState } from "vuex";
export default {
    name: "organizationStructure",
    components: { Pagination },
    data () {
        return {
            treeData: [],
            defaultProps: {
                children: "children",
                label: "organizationName"
            },
            tableKey: 0,
            theight: 0,//表格高度
            list: [],
            total: 0,
            orgType: [],
            activeName: "",
            orgFun: [],
            orgName: [],
            listLoading: true,
            listQuery: {
                parentOrgCode: undefined,
                currentPage: 1,
                pageSize: 15,
                organizationCode: undefined,
                organizationName: undefined
            },
            showReviewer: false,
            temp: {
                state: 1,
                email: undefined,
                postalCode: undefined
            },
            dialogFormVisible: false,
            dialogStatus: "",
            dialogPvVisible: false,
            pvData: [],
            rules: {
                organizationCode: [
                    {
                        required: true,
                        message: this.$t("validate.required"),
                        trigger: "blur"
                    },
                    {
                        max: 32,
                        message: this.$t("validate.max32"),
                        trigger: "blur"
                    }
                ],
                organizationName: [
                    {
                        required: true,
                        message: this.$t("validate.required"),
                        trigger: "blur"
                    },
                    {
                        max: 32,
                        message: this.$t("validate.max32"),
                        trigger: "blur"
                    }
                ],
                parentId: [
                    {
                        required: true,
                        message: this.$t("validate.required"),
                        trigger: "blur"
                    }
                ],
                type: [
                    {
                        required: true,
                        message: this.$t("validate.required"),
                        trigger: "blur"
                    }
                ],
                businessFunction: [
                    {
                        required: true,
                        message: this.$t("validate.required"),
                        trigger: "blur"
                    }
                ],
                mobile: [
                    {
                        max: 32,
                        message: this.$t("validate.max32"),
                        trigger: "blur"
                    }
                ]
            },
            contentStyleObj: {
                height: ""
            },
            downloadLoading: false
        };
    },
    computed: {
        ...mapState({
            dt_org_type: state => state.dict.dt_org_type,
            dt_org_function: state => state.dict.dt_org_function
        })
    },
    mounted () {
        this.$store.dispatch("dict/getDicData", [
            "dt_org_type",
            "dt_org_function"
        ]);
        this.getList();
        this.getHeight();
        this.setTableHeight();
        //表格高度自适应
        window.onresize = () => {
            this.setTableHeight();
            this.setTreeHeight();
        };
        this.setTreeHeight();
    },
    methods: {
        treeGetList () {
            //点击树查询
            selectlists(this.listQuery).then(response => {
                this.list = response.data.list;
                this.total = response.data.pages.count;
            });
        },
        getList () {
            //查询组织列表
            setTimeout(() => {
                selectlists(this.listQuery).then(response => {
                    let options = [this.dt_org_type, this.dt_org_function];
                    response.data = this.$myFun.codeToName(response.data, options, [
                        "type",
                        "businessFunction"
                    ]);
                    this.list = response.data.list;
                    this.total = response.data.pages.count;
                }),
                    selecttree().then(response => {
                        //获取树数据
                        this.treeData = this.$myFun.addTreeRoot(response.data);
                        this.orgName = response.data.map(function (itmes) {
                            return [itmes.rowId, itmes.organizationName];
                        });
                    });
            }, 1.5 * 100);
        },
        handleFilter () {
            //查询
            this.listQuery.page = 1;

            selectlists(this.listQuery).then(response => {
                let options = [this.dt_org_type, this.dt_org_function];
                response.data = this.$myFun.codeToName(response.data, options, [
                    "type",
                    "businessFunction"
                ]);
                this.list = response.data.list;
            });
        },
        resetTemp () {
            //重置temp
            this.temp = {
                state: 1,
                parentId: this.temp.parentId
            };
        },
        //表格高度计算
        setTableHeight () {
            this.theight = this.$myFun.getSingleTbHeight();
        },
        //树高度设置
        setTreeHeight () {
            this.contentStyleObj.height = this.$myFun.getTreehHeight();
        },
        filertOrgName (val) {
            for (let i = 0; i < this.orgName.length; i++) {
                if (this.orgName[i][0] == val) {
                    return this.orgName[i][1];
                }
                if (val == 0) {
                    return "根目录";
                }
            }
        },
        handleCreate () {
            //新增弹窗调用
            if (this.temp.parentId || this.temp.parentId == 0) {
                this.resetTemp();
                this.dialogStatus = "create";
                this.dialogFormVisible = true;
                this.$nextTick(() => {
                    this.$refs["dataForm"].clearValidate();
                });
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择上级菜单",
                    type: "warning"
                });
            }
        },
        createData () {
            //新增
            this.$refs["dataForm"].validate(valid => {
                if (valid) {
                    creat(this.temp).then(() => {
                        this.getList();
                        this.dialogFormVisible = false;
                        this.$message({
                            title: "成功",
                            message: "创建成功",
                            type: "success",
                            duration: 2000
                        });
                    });
                }
            });
        },
        handleUpdate () {
            if (this.selectlistRow && this.selectlistRow.length == 1) {
                this.temp = this.selectlistRow[0]; // copy obj
                this.dialogStatus = "update";
                this.dialogFormVisible = true;
                this.$nextTick(() => {
                    this.$refs["dataForm"].clearValidate();
                });
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条信息",
                    type: "warning"
                });
            }
        },
        updateData () {
            this.$refs["dataForm"].validate(valid => {
                if (valid) {
                    updatalist(this.temp.organizationCode, this.temp).then(
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
        // 获取表格选中时的数据
        selectRow (val) {
            if (val.length > 1) {
                this.$refs.tb_a.clearSelection(); //清除其他行的选中
                this.$refs.tb_a.toggleRowSelection(
                    val[val.length - 1],
                    "selected"
                ); //单击行绑定点击事件
            } else if (val.length === 1) {
                this.selectlistRow = val;
            }
        },
        rowClick (val) {
            this.$refs.tb_a.clearSelection(); //清除其他行的选中
            this.$refs.tb_a.toggleRowSelection(val); //单击行绑定点击事件
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
                        this.listLoading = true;
                        let ids = [];
                        this.selectlistRow.forEach((val, index) => {
                            ids[index] = val.organizationCode;
                        });
                        deletelist(ids).then(() => {
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
        handleDownload () {
            this.downloadLoading = true;
            import("@/vendor/Export2Excel").then(excel => {
                const tHeader = [
                    "编码",
                    "名称",
                    "类型",
                    "父级ID",
                    "联系人",
                    "地址",
                    "邮箱",
                    "业务类型",
                    "电话",
                    "备注",
                    "状态",
                    "邮编"
                ];
                const filterVal = [
                    "organizationCode",
                    "organizationName",
                    "typeCN",
                    "parentId",
                    "contact",
                    "adress",
                    "email",
                    "businessFunctionCN",
                    "mobile",
                    "remark",
                    "state",
                    "postalCode"
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
        getHeight () {
            this.contentStyleObj.height =
                document.body.scrollHeight - 110 + "px";
        },
        handleNodeClick (data) {
            //点击树查询
            this.temp.parentId = data.rowId;
            this.listQuery.parentOrgCode = data.rowId;
            this.treeGetList();
        }
    }
};
</script>


