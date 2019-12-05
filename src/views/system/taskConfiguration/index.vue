<template>
    <div>
        <div class="app-container">
            <div class="filter-container">
                <div class="filter-items">
                    <el-input size="small"
                              :placeholder="$t('task_configuration.jobName')"
                              v-model="listQuery.jobName"
                              class="filter-item"
                              @keyup.enter.native="handleQuery" />
                    <el-button class="filter-item"
                               type="primary"
                               size="small"
                               icon="el-icon-search"
                               @click="handleQuery">{{ $t("table.search") }}</el-button>
                </div>
            </div>
            <div class="table-container">
                <div class="oprate_btn">
                    <el-button size="small"
                               class="filter-item"
                               type="primary"
                               icon="el-icon-plus"
                               @click="handleCreate">{{ $t("table.add") }}</el-button>
                    <el-button size="small"
                               class="filter-item"
                               type="primary"
                               icon="el-icon-edit"
                               @click="handleUpdate">{{ $t("table.edit") }}</el-button>
                    <el-button size="small"
                               class="filter-item"
                               type="primary"
                               icon="el-icon-delete"
                               @click="handleDelete">{{ $t("table.delete") }}</el-button>
                    <el-button size="small"
                               class="filter-item"
                               type="primary"
                               @click="handleEnforcement">
                        <svg-icon icon-class="qzzx" />
                        强制执行</el-button>
                    <el-button size="small"
                               class="filter-item"
                               type="primary"
                               icon="el-icon-loading"
                               @click="handleSuspend">挂起/激活</el-button>
                    <el-button size="small"
                               class="filter-item"
                               type="primary"
                               icon="el-icon-view"
                               @click="handleLog">
                        <!-- <svg-icon icon-class="rzck"/> -->
                        日志查看</el-button>
                    <el-button size="small"
                               class="filter-item"
                               type="primary"
                               icon="el-icon-document"
                               @click="handleExplain">Cron说明</el-button>
                </div>
                <el-table :key="tableKey"
                          :data="list"
                          border
                          fit
                          :height="theight"
                          highlight-current-row
                          style="width: 100%;"
                          @selection-change="selectRow"
                          ref="tb"
                          size="mini"
                          cell-class-name="table-cell"
                          header-cell-class-name="header-cell">
                    <el-table-column type="selection"
                                     fixed
                                     width="30"
                                     align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="120"
                                     align="left"
                                     :label="$t('task_configuration.jobCoding')"
                                     prop="jobCoding"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="200"
                                     align="left"
                                     :label="$t('task_configuration.jobName')"
                                     prop="jobName"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="100"
                                     align="left"
                                     :label="$t('task_configuration.jobGroup')"
                                     prop="jobGroup"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="100"
                                     align="left"
                                     :label="$t('task_configuration.status')"
                                     prop="status">
                        <template slot-scope="scope">
                            {{ scope.row.status | statusFilter }}
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="200"
                                     align="left"
                                     :label="$t('task_configuration.cronExpression')"
                                     prop="cronExpression"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="200"
                                     align="left"
                                     :label="$t('task_configuration.isAsync')"
                                     prop="isAsync">
                        <template slot-scope="scope">
                            {{ scope.row.isAsync | isAsyncFilter }}
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="200"
                                     align="left"
                                     :label="$t('task_configuration.executionType')"
                                     prop="executionType">
                        <template slot-scope="scope">
                            {{ scope.row.executionType | typeFilter }}
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="200"
                                     align="left"
                                     :label="$t('task_configuration.jobClass')"
                                     prop="jobClass"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="200"
                                     align="left"
                                     :label="$t('task_configuration.jobMethod')"
                                     prop="jobMethod"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="200"
                                     align="left"
                                     :label="$t('task_configuration.repeatCount')"
                                     prop="repeatCount"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     min-width="200"
                                     align="left"
                                     :label="$t('task_configuration.jobDescription')"
                                     prop="jobDescription"></el-table-column>
                </el-table>
                <pagination :total="total"
                            :page.sync="listQuery.currentPage"
                            :limit.sync="listQuery.pageSize"
                            @pagination="getList" />
            </div>
            <!-- cron说明 -->
            <el-dialog width="70%"
                       custom-class="dialog-custom"
                       :close-on-click-modal="false"
                       title="说明"
                       :visible.sync="explainDialogFormVisible">
                <explain></explain>
            </el-dialog>
            <!-- 日志查看 -->
            <el-dialog width="50%"
                       class="table_dialog"
                       custom-class="dialog-custom"
                       :close-on-click-modal="false"
                       :close-on-press-escape="false"
                       title="日志说明"
                       :visible.sync="logDialogFormVisible">
                <logView ref="log"></logView>
            </el-dialog>
            <el-dialog v-dialogDrag
                       custom-class="dialog-custom"
                       :close-on-click-modal="false"
                       :close-on-press-escape="false"
                       :title="dialogStatus=='create'?$t('table.add'):$t('table.edit')"
                       :visible.sync="dialogFormVisible"
                       @close="handleClose">
                <el-form class="small-space"
                         :model="temp"
                         ref="temp"
                         :rules="rules"
                         label-position="left"
                         label-width="100px"
                         :inline="true"
                         size="mini"
                         style="max-width: 600px; ">
                    <el-form-item :label="$t('task_configuration.jobCoding')"
                                  prop="jobCoding">
                        <el-input v-model="temp.jobCoding"
                                  :disabled="flag"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('task_configuration.jobName')"
                                  prop="jobName">
                        <el-input v-model="temp.jobName"
                                  :disabled="flag"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('task_configuration.jobGroup')"
                                  prop="jobGroup">
                        <el-input v-model="temp.jobGroup"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('task_configuration.cronExpression')"
                                  prop="cronExpression">
                        <el-input v-model="temp.cronExpression"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('task_configuration.executionType')"
                                  prop="executionType">
                        <el-select size="small"
                                   v-model="temp.executionType"
                                   :placeholder="$t('task_configuration.executionType')"
                                   clearable>
                            <el-option v-for="item in dt_implement_type"
                                       :key="item.dictItemKey"
                                       :label="item.dictItemValue"
                                       :value="item.dictItemKey">
                            </el-option>
                            <!-- <el-option label="同步" value="1"></el-option> -->
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('task_configuration.jobClass')"
                                  prop="jobClass">
                        <el-input v-model="temp.jobClass"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('task_configuration.jobMethod')"
                                  prop="jobMethod">
                        <el-input v-model="temp.jobMethod"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('task_configuration.isAsync')"
                                  prop="isAsync">
                        <el-select v-model="temp.isAsync">
                            <!-- <el-option label="同步" value="1"></el-option>
                       <el-option label="异步" value="2"></el-option> -->
                            <el-option v-for="item in TWO_isAsync_OPTIONS"
                                       :key="item.value"
                                       :label="item.label"
                                       :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('task_configuration.repeatCount')"
                                  prop="repeatCount">
                        <el-input v-model="temp.repeatCount"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('task_configuration.administrator')"
                                  prop="administrator">
                        <el-input v-model="temp.administrator"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('task_configuration.email')"
                                  prop="email">
                        <el-input v-model="temp.email"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('task_configuration.telephone')"
                                  prop="telephone">
                        <el-input v-model="temp.telephone"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('task_configuration.status')"
                                  prop="status">
                        <el-radio-group v-model="temp.status">
                            <el-radio :label="0">无效</el-radio>
                            <el-radio :label="1">有效</el-radio>
                        </el-radio-group>
                    </el-form-item> <br>
                    <el-form-item :label="$t('task_configuration.jobDescription')"
                                  prop="jobDescription">
                        <el-input style="width:440px"
                                  type="textarea"
                                  :rows="2"
                                  v-model="temp.jobDescription"></el-input>
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
        </div>
    </div>

</template>

<script>
import * as api from "@/api/system/task_configuration";
import Pagination from "@/components/Pagination";
import explain from "./explain"; //cron说明
import logView from "./logView"; //日志查看
import { mapState } from 'vuex';
import { getDomainId } from "@/utils/auth";
import { TWO_isAsync_OPTIONS } from "@/utils/constant";


export default {
    name: "taskConfiguration",
    components: { Pagination, explain, logView },
    data () {
        let validatePhoneTwo = (rule, value, callback) => {
            const reg = /^(|(1[34578]\d{9}))$/;
            if (value == '' || value == undefined || value == null) {
                callback();
            } else {
                if ((!reg.test(value)) && value != '') {
                    callback(new Error('请输入正确的电话号码'));
                } else {
                    callback();
                }
            }
        };
        return {
            list: null,
            total: 0,
            flag: false,
            theight: 0,//表格高度
            listQuery: {
                currentPage: 1,
                pageSize: 15,
            },
            taskUpdateStatusDTO: {
                jobGroup: undefined,
                jobName: undefined,
                rowId: undefined,
                status: undefined
            },
            TWO_isAsync_OPTIONS: TWO_isAsync_OPTIONS,
            temp: {
                status: 1,
                remark: undefined,
                creator: getDomainId()
            },
            colorCode: undefined,
            selectCode: [],
            dialogFormVisible: false,
            explainDialogFormVisible: false,
            logDialogFormVisible: false,
            dialogStatus: "",
            tableKey: 0,
            rules: {
                email: [
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ],
                telephone: [
                    { required: true, message: "电话不能为空", trigger: "blur" },
                    { validator: validatePhoneTwo, trigger: "blur" }
                ]
            }
        };
    },
    computed: {
        ...mapState({
            dt_implement_type: state => state.dict.dt_implement_type
        })

    },
    mounted () {
        this.$store.dispatch("dict/getDicData", [
            "dt_implement_type"
        ]);
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
    filters: {
        statusFilter: function (a) {
            if (a === 1) {
                return "有效"
            } else {
                return "无效"
            }
        },
        isAsyncFilter: function (b) {
            if (b === 1) {
                return "同步"
            } else {
                return "异步"
            }
        },
        typeFilter: function (c) {
            if (c === "it1") {
                return "Spring服务"
            }
        }
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
            this.theight = this.$myFun.getSingleTbHeight();
        },
        handleExplain () {
            this.explainDialogFormVisible = true
        },
        handleQuery () {//查询
            this.listQuery.currentPage = 1;
            this.getList();
        },
        handleCreate () {//新增
            this.resetTemp();
            this.flag = false
            this.dialogStatus = "create";
            this.dialogFormVisible = true;
        },
        create () {//新增确认按钮
            this.$refs.temp.validate(valid => {
                if (valid) {
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
                } else {
                    return false;
                }
            });
        },
        // 获取表格选中时的数据
        selectRow (val) {
            this.selectlistRow = val[val.length - 1];
            if (val.length > 1) {
                this.$refs.tb.clearSelection();
                this.$refs.tb.toggleRowSelection(val.pop());
            }

        },

        handleUpdate () {//编辑弹窗
            if (this.selectlistRow) {
                this.temp = this.selectlistRow
                this.flag = true
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
        update () {//编辑提交
            this.$refs["temp"].validate(valid => {
                if (valid) {
                    this.temp.updator = getDomainId()
                    api.updateRecord(this.temp).then(
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

        handleDelete () {//删除列表
            if (this.selectlistRow) {
                this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    api.deleteRecord(this.selectlistRow.rowId, this.selectlistRow.jobGroup, this.selectlistRow.jobName).then(() => {
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
        handleEnforcement () { //强制执行
            if (this.selectlistRow) {
                this.taskUpdateStatusDTO.jobGroup = this.selectlistRow.jobGroup
                this.taskUpdateStatusDTO.jobName = this.selectlistRow.jobName
                this.taskUpdateStatusDTO.rowId = this.selectlistRow.rowId
                this.taskUpdateStatusDTO.status = this.selectlistRow.status
                api.suspendRecord(this.taskUpdateStatusDTO).then(() => {
                    this.getList()
                    this.$message({
                        title: "成功",
                        message: "强制执行成功",
                        type: "success",
                        duration: 2000
                    });
                })
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条信息",
                    type: "warning"
                });
            }
        },
        handleSuspend () { //挂起激活
            if (this.selectlistRow) {
                this.taskUpdateStatusDTO.jobGroup = this.selectlistRow.jobGroup
                this.taskUpdateStatusDTO.jobName = this.selectlistRow.jobName
                this.taskUpdateStatusDTO.rowId = this.selectlistRow.rowId
                this.taskUpdateStatusDTO.status = this.selectlistRow.status
                api.suspendRecord(this.taskUpdateStatusDTO).then(() => {
                    this.getList()
                    this.$message({
                        title: "成功",
                        message: "挂起/激活成功",
                        type: "success",
                        duration: 2000
                    });
                })
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条信息",
                    type: "warning"
                });
            }
        },
        handleLog () { //日志查看
            // this.$refs.log.listQuery.jobCoding='',
            // this.$refs.log.listQuery.jobName='',
            // this.$refs.log.value3='',
            // this.$refs.log.list=[],
            this.logDialogFormVisible = true
        },
        cancel () {//取消弹窗按钮
            this.dialogFormVisible = false;
        },
        resetTemp () {
            this.temp = {
                status: 1,
                remark: undefined,
                flag: false,
                creator: getDomainId()
            };
        },
        handleClose () {
            this.resetTemp();
            this.$refs.temp.resetFields();
        },

    }
};
</script>

<style scoped>
.btn {
    height: 57px;
}
</style>
