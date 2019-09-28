<template>
    <el-row>
        <el-col :span="3"
                class="left-trees">
            <div class="left-tree">
                <el-tree :data="treeData"
                         :props="defaultProps"
                         @node-click="handleNodeClick"
                         :style="contentStyleObj"></el-tree>
            </div>
        </el-col>
        <el-col :span="21">
            <div class="app-container">
                <div class="filter-container">
                    <div class="main-header">
                        <div class="select-content">
                            <el-input size="small"
                                      :placeholder="$t('employeesManagement.employeeCode')"
                                      v-model="listQuery.employeeCode"
                                      class="filter-item"
                                      @keyup.enter.native="handleFilter" />
                            <el-input size="small"
                                      :placeholder="
                                    $t('employeesManagement.employeeName')
                                "
                                      v-model="listQuery.employeeName"
                                      class="filter-item"
                                      @keyup.enter.native="handleFilter" />
                            <el-checkbox v-model="listQuery.scope">全部</el-checkbox>
                            &nbsp;&nbsp;&nbsp;
                            <el-button type="primary"
                                       size="small"
                                       icon="el-icon-search"
                                       @click="handleFilter">{{ $t("table.search") }}</el-button>
                        </div>
                    </div>
                    <div class="main-body">
                        <div class="btn">
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
                                       icon="el-icon-edit-outline"
                                       @click="handleUser">{{$t("employeesManagement.userMaintain")}}</el-button>
                        </div>
                        <el-table v-loading="listLoading"
                                  :key="tableKey"
                                  :data="list"
                                  border
                                  fit
                                  height="315"
                                  highlight-current-row
                                  style="width: 100%;"
                                  cell-class-name="table-cell"
                                  header-cell-class-name="header-cell"
                                  @selection-change="selectRow"
                                  @row-click="rowClick"
                                  ref="tb_a">
                            <el-table-column type="selection"
                                             width="30">
                            </el-table-column>
                            <el-table-column show-overflow-tooltip
                                             :label="$t('employeesManagement.employeeCode')"
                                             prop="employeeCode"
                                             align="center"
                                             width="120">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.employeeCode }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column show-overflow-tooltip
                                             :label="$t('employeesManagement.employeeName')"
                                             width="80"
                                             align="center">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.employeeName }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column show-overflow-tooltip
                                             :label="$t('employeesManagement.organizationId')"
                                             min-width="80">
                                <template slot-scope="scope">
                                    <!-- <span>{{ scope.row.organizationId }}</span> -->
                                    <span>{{filertOrgName(scope.row.organizationId)}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column show-overflow-tooltip
                                             :label="$t('employeesManagement.sex')"
                                             width="60"
                                             align="center">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.sex?"男":"女"}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column show-overflow-tooltip
                                             :label="$t('employeesManagement.mobile')"
                                             width="120"
                                             align="center">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.mobile }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column show-overflow-tooltip
                                             :label="$t('employeesManagement.officePhone')"
                                             width="120">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.officePhone }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column show-overflow-tooltip
                                             :label="$t('employeesManagement.email')"
                                             align="center"
                                             width="180">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.email }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column show-overflow-tooltip
                                             :label="$t('employeesManagement.state')"
                                             width="80">
                                <template slot-scope="scope">
                                    <span>{{scope.row.state?'启用':'停止'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column show-overflow-tooltip
                                             :label="$t('employeesManagement.birthday')"
                                             class-name="status-col"
                                             width="120">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.birthday }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column show-overflow-tooltip
                                             :label="$t('employeesManagement.hireDate')"
                                             class-name="status-col"
                                             width="180">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.hireDate }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column show-overflow-tooltip
                                             :label="$t('employeesManagement.idNumber')"
                                             class-name="status-col"
                                             width="180">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.idNumber }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column show-overflow-tooltip
                                             :label="$t('employeesManagement.address')"
                                             class-name="status-col"
                                             width="120">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.address }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column show-overflow-tooltip
                                             :label="$t('employeesManagement.remark')"
                                             class-name="status-col"
                                             width="120">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.remark }}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                        <pagination v-show="total > 0"
                                    :total="total"
                                    :page.sync="listQuery.currentPage"
                                    :limit.sync="listQuery.pageSize"
                                    @pagination="getList" />
                    </div>
                </div>
                <!-- 新增，修改弹窗 -->
                <el-dialog custom-class="dialog-custom"
                           :title="
                        dialogStatus == 'create'
                            ? $t('table.add')
                            : $t('table.edit')
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
                        <el-form-item :label="$t('employeesManagement.employeeCode')"
                                      prop="employeeCode">
                            <el-input v-if="dialogStatus == 'update'"
                                      v-model="temp.employeeCode"
                                      disabled="disabled" />
                            <el-input v-else
                                      v-model="temp.employeeCode" />
                        </el-form-item>
                        <el-form-item :label="$t('employeesManagement.employeeName')"
                                      prop="employeeName">
                            <el-input v-model="temp.employeeName" />
                        </el-form-item>
                        <el-form-item :label="$t('employeesManagement.organizationId')"
                                      prop="organizationId">
                            <el-input v-model="temp.organizationId"
                                      disabled="disabled" />
                        </el-form-item>
                        <el-form-item :label="$t('employeesManagement.sex')"
                                      prop="sex">
                            <el-radio-group v-model="temp.sex">
                                <el-radio :label="1">{{
                                    $t("table.male")
                                }}</el-radio>
                                <el-radio :label="0">{{
                                    $t("table.female")
                                }}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item :label="$t('employeesManagement.mobile')"
                                      prop="mobile">
                            <el-input v-model="temp.mobile" />
                        </el-form-item>
                        <el-form-item :label="$t('employeesManagement.state')"
                                      prop="state">
                            <el-radio-group v-model="temp.state">
                                <el-radio :label="1">{{
                                    $t("table.enable")
                                }}</el-radio>
                                <el-radio :label="0">{{
                                    $t("table.stop")
                                }}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item :label="$t('employeesManagement.email')"
                                      prop="email">
                            <el-input v-model="temp.email" />
                        </el-form-item>
                        <el-form-item :label="$t('employeesManagement.officePhone')"
                                      prop="officePhone">
                            <el-input v-model="temp.officePhone" />
                        </el-form-item>
                        <el-form-item :label="$t('employeesManagement.birthday')"
                                      prop="birthday">
                            <el-date-picker style="width:165px"
                                            v-model="temp.birthday"
                                            value-format="yyyy-MM-dd"
                                            type="date"
                                            :placeholder="
                                    $t('employeesManagement.birthday')
                                "></el-date-picker>
                        </el-form-item>
                        <el-form-item :label="$t('employeesManagement.hireDate')"
                                      prop="hireDate">
                            <el-date-picker style="width:165px"
                                            v-model="temp.hireDate"
                                            value-format="yyyy-MM-dd"
                                            type="date"
                                            :placeholder="
                                    $t('employeesManagement.hireDate')
                                "></el-date-picker>
                        </el-form-item>
                        <el-form-item :label="$t('employeesManagement.idNumber')"
                                      prop="idNumber">
                            <el-input v-model="temp.idNumber" />
                        </el-form-item>
                        <el-form-item :label="$t('employeesManagement.address')"
                                      prop="address"
                                      width="470px">
                            <el-input type="textarea"
                                      v-model="temp.address"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('employeesManagement.remark')"
                                      prop="remark">
                            <el-input type="textarea"
                                      v-model="temp.remark"
                                      width="470px"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer"
                         class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">{{
                            $t("table.cancel")
                        }}</el-button>
                        <el-button type="primary"
                                   @click="
                                dialogStatus === 'create'
                                    ? createData()
                                    : updateData()
                            ">{{ $t("table.confirm") }}</el-button>
                    </div>
                </el-dialog>
                <!-- 用户维护弹窗 -->
                <el-dialog :title="$t('employeesManagement.userMaintain')"
                           :visible.sync="dialogFormUser"
                           v-dialogDrag
                           :close-on-click-modal="false">
                    <el-form class="small-space"
                             ref="dataForm"
                             :inline="true"
                             :rules="rules"
                             :model="temp"
                             label-width="120px">
                        <el-form-item :label="$t('employeesManagement.userName')"
                                      prop="userName">
                            <el-input v-model="temp.userName" />
                        </el-form-item>
                        <el-form-item :label="$t('employeesManagement.realName')"
                                      prop="realName">
                            <el-input v-model="temp.realName" />
                        </el-form-item>
                        <el-form-item :label="$t('employeesManagement.password')"
                                      prop="password">
                            <el-input v-model="temp.password" />
                        </el-form-item>
                        <el-form-item :label="$t('employeesManagement.employeeCode')"
                                      prop="employeeCode">
                            <el-input v-model="temp.employeeCode"
                                      disabled="disabled" />
                        </el-form-item>
                        <el-form-item :label="$t('employeesManagement.employeeName')"
                                      prop="employeeName">
                            <el-input v-model="temp.employeeName"
                                      disabled="disabled" />
                        </el-form-item>
                        <el-form-item :label="$t('employeesManagement.isLog')"
                                      prop="isLog">
                            <el-radio v-model="temp.isLog"
                                      :label="0">{{
                                $t("table.close")
                            }}</el-radio>
                            <el-radio v-model="temp.isLog"
                                      :label="1">{{
                                $t("table.open")
                            }}</el-radio>
                        </el-form-item>
                        <el-form-item :label="$t('employeesManagement.state')"
                                      prop="state">
                            <el-radio v-model="temp.state"
                                      :label="0">{{
                                $t("table.close")
                            }}</el-radio>
                            <el-radio v-model="temp.state"
                                      :label="1">{{
                                $t("table.open")
                            }}</el-radio>
                        </el-form-item>
                        <el-button type="primary"
                                   @click="handadduser">{{
                            $t("table.add")
                        }}</el-button>
                    </el-form>
                    <div class="btn">
                        <el-button size="small"
                                   class="filter-item"
                                   type="primary"
                                   icon="el-icon-delete"
                                   @click="handdeleltuser">{{ $t("table.delete") }}</el-button>
                    </div>
                    <div>
                        <el-table v-loading="listLoading"
                                  :key="tableKey"
                                  :data="listuser"
                                  border
                                  fit
                                  highlight-current-row
                                  style="width: 100%;"
                                  @selection-change="selectRowUser">
                            <el-table-column type="selection"
                                             width="30">
                            </el-table-column>
                            <el-table-column show-overflow-tooltip
                                             :label="$t('employeesManagement.realName')"
                                             width="120"
                                             align="center">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.realName }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column show-overflow-tooltip
                                             :label="$t('employeesManagement.userName')"
                                             width="120">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.userName }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column show-overflow-tooltip
                                             :label="$t('employeesManagement.isLog')"
                                             width="120"
                                             align="center">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.isLog }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column show-overflow-tooltip
                                             :label="$t('employeesManagement.state')"
                                             width="120"
                                             align="center">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.state }}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                        <pagination v-show="total > 0"
                                    :total="total"
                                    :page.sync="listQuery.currentPage"
                                    :limit.sync="listQuery.pageSize"
                                    @pagination="getUserList" />
                    </div>
                </el-dialog>
                <el-dialog :visible.sync="dialogPvVisible"
                           title="Reading statistics"
                           :close-on-click-modal="false">
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
                                   @click="dialogPvVisible = false">{{ $t("table.confirm") }}</el-button>
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
    adduser,
    selectuser,
    deleteuser
} from "@/api/system/employees";

import { selecttree } from "@/api/system/organization";
import { loadtreeDates } from "@/utils/treeDate";

export default {
    name: "yggl",
    components: { Pagination },
    data () {
        return {
            tableKey: 0,
            list: [],
            orgName: [],
            listuser: [],
            treeData: [],
            total: 0,
            listLoading: true,
            listQuery: {
                currentPage: 1,
                pageSize: 10,
                page: 1,
                scope: false
            },
            readonly: false,
            temp: {},
            dialogFormVisible: false,
            dialogFormUser: false,
            dialogStatus: "",
            rules: {
                employeeCode: [
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
                employeeName: [
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
                state: [
                    {
                        required: true,
                        message: this.$t("validate.required"),
                        trigger: "blur"
                    }
                ],
                userName: [
                    {
                        required: true,
                        message: this.$t("validate.required"),
                        trigger: "blur"
                    }
                ],
                realName: [
                    {
                        required: true,
                        message: this.$t("validate.required"),
                        trigger: "blur"
                    }
                ],
                password: [
                    {
                        required: true,
                        message: this.$t("validate.required"),
                        trigger: "blur"
                    }
                ],
                officePhone: [
                    {
                        max: 32,
                        message: this.$t("validate.max32"),
                        trigger: "blur"
                    }
                ]
            },
            dialogPvVisible: false,
            pvData: [],
            defaultProps: {
                children: "children",
                label: "organizationName"
            },
            contentStyleObj: {
                height: ""
            }
        };
    },
    created () {
        window.addEventListener("resize", this.getHeight);
        this.getHeight();
        this.getList();
    },
    computed: {
        organizationId: {
            get: function () {
                return this.organizationId; //获取的时候直接获取值
            },
            set: function (listQuery) {
                this.organizationId = listQuery.organizationName; //设置的时候变为大写
            }
        }
    },

    methods: {
        getHeight () {
            //树高度
            this.contentStyleObj.height =
                document.body.scrollHeight - 110 + "px";
        },
        destroyed () {
            //树高度随窗口变化
            window.removeEventListener("resize", this.getHeight);
        },
        treeGetList () {
            //查询数据
            this.listLoading = true;
            selectlists(this.listQuery).then(response => {
                this.list = response.data.list;
                this.total = response.data.pages.count;
                setTimeout(() => {
                    this.listLoading = false;
                }, 1.5 * 100);
            });
        },
        getList () {
            //查询数据
            this.listLoading = true;
            selectlists(this.listQuery).then(response => {
                this.list = response.data.list;
                this.total = response.data.pages.count;
                setTimeout(() => {
                    this.listLoading = false;
                }, 1.5 * 100);
            }),
                selecttree().then(response => {
                    //获取树数据
                    this.treeData = loadtreeDates(response.data);

                    this.orgName = response.data.map(function (itmes) {
                        return [itmes.rowId, itmes.organizationName];
                    });
                    setTimeout(() => {
                        this.listLoading = false;
                    }, 1.5 * 100);
                });
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
        handleFilter () {
            //查询组织列表
            this.listQuery.page = 1;
            this.listLoading = true;
            selectlists(this.listQuery).then(response => {
                this.list = response.data.list;
                this.total = response.data.pages.count;
                setTimeout(() => {
                    this.listLoading = false;
                }, 1.5 * 100);
            });
        },
        resetTemp () {
            this.temp = {
                sex: 1,
                state: 1,
                isLog: 1
            };
        },
        handleCreate () {
            //新增弹窗
            if (this.listQuery.orgId || this.listQuery.orgId == 0) {
                this.resetTemp();
                this.dialogStatus = "create";
                this.dialogFormVisible = true;
                this.temp.organizationId = this.listQuery.orgId;
                this.readonly = true; //组织编码可以编写
                selecttree().then(response => {
                    //获取树数据
                    this.treeData = loadtreeDates(response.data);
                });
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
            //编辑弹窗
            if (this.selectlistRow && this.selectlistRow.length == 1) {
                this.readonly = true; //员工编码不可以编写
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
            //编辑
            this.$refs["dataForm"].validate(valid => {
                if (valid) {
                    // const tempData = Object.assign({}, this.temp)
                    // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
                    updatalist(this.temp.employeeCode, this.temp).then(() => {
                        this.getList();
                        this.dialogFormVisible = false;
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
        //查询关联的员工记录
        getUserList (code) {
            selectuser(code).then(response => {
                this.listuser = response.data;
                // this.total = response.data.pages.count
            });
        },
        handadduser () {
            //添加
            adduser(this.selectlistRow[0].employeeCode, this.temp).then(() => {
                this.handleUser();
                this.$message({
                    title: "成功",
                    message: "创建成功",
                    type: "success",
                    duration: 2000
                });
            });
        },
        handdeleltuser () {
            //删除
            if (this.selectlistRowUser && this.selectlistRowUser.length == 1) {
                this.$confirm("此操作将删除所选中数据, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        let name = [];
                        for (
                            let i = 0;
                            i < this.selectlistRowUser.length;
                            i++
                        ) {
                            name[i] = this.selectlistRowUser[i].userName;
                        }
                        deleteuser(
                            this.selectlistRow[0].employeeCode,
                            name
                        ).then(() => {
                            this.dialogFormUser = true;
                            this.handleUser();
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
                    message: "请选择一条员工信息",
                    type: "warning"
                });
            }
        },
        handleUser () {
            //用户维护
            if (this.selectlistRow && this.selectlistRow.length == 1) {
                this.getUserList(this.selectlistRow[0].employeeCode);
                this.resetTemp();
                this.temp.employeeCode = this.selectlistRow[0].employeeCode;
                this.temp.employeeName = this.selectlistRow[0].employeeName;
                this.dialogFormUser = true;
                this.$nextTick(() => {
                    this.$refs["dataForm"].clearValidate();
                });
            } else {
                this.$message({
                    title: "警告",
                    message: "请选择一条员工信息",
                    type: "warning"
                });
            }
        },
        handleAddUser () {
            adduser();
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
        selectRowUser (val) {
            this.selectlistRowUser = val;
        },
        handleNodeClick (data) {
            //点击树查询
            this.listQuery.orgCode = data.organizationCode;
            this.listQuery.orgId = data.rowId;
            this.treeGetList();
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
                            ids[index] = val.employeeCode;
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
        }
    }
};
</script>
<style scoped>
.btn,
.select-title {
    border: solid 1px #d3dae0;
    border-bottom: 0px;
    border-top: solid 5px #d3dae0;
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
    padding: 8px 10px;
}
.el-tree {
    margin-top: 20px;
    background-color: #e2e9ef;
}
.el-textarea,
.el-input--mini {
    width: 470px;
}
</style>