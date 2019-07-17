<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <div class="filter-items">
                <el-input @keyup.enter.native="handleQuery" :placeholder="$t('roleManagement.roleCode')" class="filter-item" size="small"
                    v-model="listQuery.roleCode"
                ></el-input>
                <el-input  @keyup.enter.native="handleQuery" :placeholder="$t('roleManagement.roleName')" class="filter-item" size="small"
                    v-model="listQuery.roleName"
                ></el-input>
                <el-select size="small" v-model="listQuery.roleType" :placeholder="$t('roleManagement.roleType')" clearable>
                    <el-option
                        v-for="item in dt_role_type"
                        :key="item.dictItemKey"
                        :label="item.dictItemValue"
                        :value="item.dictItemKey"
                    ></el-option>
                </el-select>
                <el-button class="filter-item" size="small" type="primary" icon="search" @click="handleQuery">{{$t('table.search')}}</el-button>
            </div>
        </div>
        <div class="table-container">
            <div class="btn">
                <el-button size="small" class="filter-item" type="primary" icon="el-icon-plus" @click="handleCreate">{{ $t('table.add') }}</el-button>
                <el-button size="small" class="filter-item" type="primary" icon="el-icon-edit" @click="handleUpdate">{{ $t('table.edit') }}</el-button>
                <el-button size="small" class="filter-item" type="primary" icon="el-icon-delete" @click="handleDelete">{{ $t('table.delete') }}</el-button>
                <el-button size="small" class="filter-item" type="primary" icon="el-icon-edit-outline" @click="handleCreate1">{{ $t('userManagement.functionAuthorization') }}</el-button>
                <el-button size="small" class="filter-item" type="primary" icon="el-icon-edit-outline" @click="handleCreate2">{{ $t('userManagement.userAuthorization') }}</el-button>
            </div>
            <el-table
                :key="tableKey"
                :data="list"
                border
                fit
                highlight-current-row
                style="width: 100%"
                cell-class-name="table-cell"
                height="315"
                header-cell-class-name="header-cell"
                @selection-change="selected"
            >
                <!-- <el-table-column type="selection" align="center" width="40" fixed></el-table-column> -->
                <el-table-column type="selection" width="30"></el-table-column>
                <el-table-column show-overflow-tooltip width="120" align="center" :label="$t('roleManagement.roleCode')" prop="roleCode"></el-table-column>
                <el-table-column show-overflow-tooltip width="200" align="center" :label="$t('roleManagement.roleName')" prop="roleName"></el-table-column>
                <el-table-column show-overflow-tooltip width="200" align="center" :label="$t('roleManagement.roleType')" prop="roleType">
                    <template slot-scope="scope">
                        <span>{{ scope.row.roleTypeCN}}</span>
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip width="120" align="center" label="角色域" prop="domainScope"></el-table-column>
                <el-table-column show-overflow-tooltip min-width="100" align="center" :label="$t('roleManagement.remark')" prop="remark"></el-table-column>
            </el-table>
            <pagination :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize" @pagination="getList"/>
        </div>

        <!--新增编辑弹窗 -->
        <el-dialog :close-on-click-modal="false" custom-class="dialog-custom" :title="dialogStatus=='create'?$t('table.add'):$t('table.edit')" :visible.sync="dialogFormVisible"
            @close="handleClose">
            <el-form
                class="small-space"
                :model="temp"
                :rules="rules"
                ref="temp"
                label-position="left"
                label-width="100px"
                style="max-width: 400px; "
            >
                <el-form-item :label="$t('roleManagement.roleCode')" prop="roleCode">
                    <el-input v-if="dialogStatus=='update'" v-model="temp.roleCode" disabled="disabled"/>
                    <el-input v-else v-model="temp.roleCode"/>
                </el-form-item>
                <el-form-item :label="$t('roleManagement.roleName')" prop="roleName">
                    <el-input v-model="temp.roleName"></el-input>
                </el-form-item>
                <el-form-item :label="$t('roleManagement.roleType')" prop="roleType">
                    <el-select size="small" v-model="temp.roleType" :placeholder="$t('roleManagement.roleType')" clearable>
                        <el-option
                            v-for="item in dt_role_type"
                            :key="item.dictItemKey"
                            :label="item.dictItemValue"
                            :value="item.dictItemKey"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="角色域" prop="domainScope">
                    <el-select size="small" v-model="temp.domainScope" laceholder="请选择">
                        <el-option label="供应商" value="SUPPLIER"></el-option>
                        <el-option label="员工" value="EMPLOYEE"></el-option>
                        <el-option label="客户" value="CUSTOMER"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('roleManagement.remark')" prop="remark">
                    <el-input type="textarea" :rows="2" v-model="temp.remark"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel()">{{$t('table.cancel')}}</el-button>
                <el-button v-if="dialogStatus=='create'" type="primary" @click="create">{{$t('table.confirm')}}</el-button>
                <el-button v-else type="primary" @click="update">{{$t('table.confirm')}}</el-button>
            </div>
        </el-dialog>

        <!--功能授权弹窗 -->
        <el-dialog :close-on-click-modal="false" custom-class="dialog-custom" :title="$t('userManagement.functionAuthorization')" :visible.sync="dialogFormVisible1"
            @close="handleClose">
            <el-tree
                :data="data1"
                default-expand-all
                :props="defaultProps"
                :default-checked-keys="checkeddatas"
                show-checkbox
                node-key="rowId"
                ref="tree"
                @check-change="handleCheckChange"
            ></el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel()">{{$t('table.cancel')}}</el-button>
                <el-button type="primary" @click="create1">{{$t('table.confirm')}}</el-button>
            </div>
        </el-dialog>

        <!--授权用户弹窗 -->
        <el-dialog :close-on-click-modal="false" custom-class="dialog-custom" :title="$t('userManagement.userAuthorization')" :visible.sync="dialogFormVisible2" @close="handleClose">
            <div class="btn">
                <el-button size="small" class="filter-item" type="primary" icon="el-icon-delete" @click="handleDelete1">{{ $t('table.delete') }}</el-button>
            </div>
            <el-table
                :key="tableKey"
                :data="list2"
                border
                fit
                highlight-current-row
                style="width: 100%"
                cell-class-name="table-cell"
                height="200"
                header-cell-class-name="header-cell"
                @selection-change="selected1"
            >
                <!-- <el-table-column type="selection" align="center" width="40" fixed></el-table-column> -->
                <el-table-column type="selection" width="30"></el-table-column>
                <el-table-column show-overflow-tooltip align="center" :label="'所属组织'" prop="orgName"></el-table-column>
                <el-table-column show-overflow-tooltip align="center" :label="$t('roleManagement.userName')" prop="userName"></el-table-column>
                <el-table-column show-overflow-tooltip align="center" :label="$t('roleManagement.realName')" prop="realName"></el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
import * as api from "@/api/system/role";
import Pagination from "@/components/Pagination";
import { loadtreeDates, loadtreeDate } from "@/utils/treeDate";
import { getRecord as getGict } from "@/api/data-base/dict";
import { mapState } from "vuex";
import { selectDatas } from "@/api/system/menu";
import { codeToName } from "@/utils/codeToName";
import { debuglog } from 'util';

export default {
    name: "Role",
    components: { Pagination },
    data() {
        return {
            data1: [],
            defaultProps: {
                children: "children",
                label: "catalogName"
            },
            list: [],
            list2: [],
            total: 0,
            listQuery: {
                //查询
                page: true,
                currentPage: 1,
                pageSize: 10
            },
            listQuery2: {
                //查询
                page: true,
                currentPage: 1,
                pageSize: 10
            },
            listQuery3: {
                //查询
                page: true,
                currentPage: 1,
                pageSize: 10
            },
            temp: {
                //新增创建
                roleCode: undefined,
                roleName: undefined,
                roleType: undefined,
                domainScope: undefined,
                remark: undefined
            },
            checkeddatas: [],
            roleCode: undefined,
            selectCode: [],
            dialogFormVisible: false,
            dialogFormVisible1: false,
            dialogFormVisible2: false,
            dialogStatus: "",
            selectedrow: {},
            selectedrow1: {},
            tableKey: 0,
            rules: {
                roleCode: [
                {required: true,message: this.$t("validate.required"),trigger: "blur"},
                { max: 30, message: this.$t("validate.max32"), trigger: "blur" }
                ],
                roleName: [
                {required: true,message: this.$t("validate.required"),trigger: "blur"},
                { max: 100, message: this.$t("validate.max32"), trigger: "blur" }
                ],
                roleType: [
                { max: 100, message: this.$t("validate.max32"), trigger: "blur" }
                ],
                remark: [
                { max: 200, message: this.$t("validate.max200"), trigger: "blur" }
                ]
            }
        };
    },
    created() {},
    computed: {
        ...mapState({
            dt_role_type: state => state.dict.dt_role_type
        })
    },
    mounted() {
        this.$store.dispatch("dict/getDicData", ["dt_role_type"]);
        this.getList();
    },
    methods: {
        getList() {
            api.selectrole(this.listQuery).then(response => {
                let options = [this.dt_role_type];
                response.data = codeToName(response.data, options, ["dt_role_type"]);
                this.list = response.data.list;
                this.total = response.data.pages.count;
                // Just to simulate the time of the request
                setTimeout(() => {
                this.listLoading = false;
                }, 1.5 * 100);
            });
        },
        handleCheckChange() {
            return this.$refs.tree
                .getCheckedNodes()
                .concat(this.$refs.tree.getHalfCheckedNodes()); //获取选中和半选中状态下的数据
        },
        getList1() {
            api.authorizationRecord(this.selectedrow.roleCode).then(res => {
                console.log(res);
                this.list2 = res.data;
                this.total = res.data.pages.count;
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
        handleCreate() {//新增按钮单击事件方法
            this.resetTemp();
            this.dialogStatus = "create";
            this.dialogFormVisible = true;
        },
        handleCreate1() {//功能授权按钮单击事件方法
            if (this.selectedrow && this.selectedrow.length == 1) {
                this.listQuery2.roleCodes = this.selectedrow[0].roleCode;
                let dd = [];
                selectDatas(this.listQuery2).then(res => {
                    debugger
                    this.checkeddatas = loadtreeDate(res.data).filter(function(items) {
                        //默认选中项
                        if (items.children) {
                        items.children.filter(function(em) {
                            dd.push(em.rowId);
                        });
                        }
                        return dd;
                    });
                    this.checkeddatas = dd;
                });
                api.selectRecord().then(res => {
                this.dialogStatus = "create";
                this.dialogFormVisible1 = true;
                this.data1 = loadtreeDates(res.data);
                });
            } else {
                this.$message({
                title: "警告",
                message: "请选择一条信息",
                type: "warning"
                });
            }
        },
        selected(val) {
            this.selectedrow = val;
        },
        selected1(val) {
            this.selectedrow1 = val;
        },
        handleCreate2() {//授权用户按钮单击事件方法
            if (this.selectedrow && this.selectedrow.length == 1) {
                this.dialogFormVisible2 = true;
                this.dialogStatus = "create";
                this.listQuery3.roleCode = this.selectedrow[0].roleCode;
                api.roleToUser(this.listQuery3).then(res => {
                console.log(res);
                this.list2 = res.data.list;
                this.total = res.data.pages.count;
                });
            } else {
                this.$message({
                title: "警告",
                message: "请选择一条信息",
                type: "warning"
                });
            }
        },
        handleUpdate() {//编辑按钮单击事件方法
            if (this.selectedrow && this.selectedrow.length == 1) {
                this.roleCode = this.selectedrow[0].roleCode;
                api.getRecord(this.selectedrow[0].roleCode).then(res => {
                this.temp = res.data;
                this.dialogStatus = "update";
                this.dialogFormVisible = true;
                });
            } else {
                this.$message({
                title: "警告",
                message: "请选择一条信息",
                type: "warning"
                });
            }
        },
        handleDelete() {//表格删除按钮单击事件方法
            if (this.selectedrow && this.selectedrow.length == 1) {
                let codes = [];
                codes.push(this.selectedrow[0].roleCode);
                this.delete(codes);
            } else {
                this.$message({
                title: "警告",
                message: "请选择一条信息",
                type: "warning"
                });
            }
        },
        //删除用户授权
        handleDelete1() {
            let userNames = [];
            this.selectedrow1.forEach(item=>{
                userNames.push(item.userName);
            });
            let data = {
                methods: "USER",
                userNames:userNames
            }
            api.addMenu(this.selectedrow[0].roleCode,data).then(response =>{
                this.handleCreate2();
                this.$notify({
                    title: "成功",
                    message: "删除成功",
                    type: "success",
                    duration: 2000
                });
            });
        },
        deleteUsers(codes) {
            this.$confirm("此操作将永久删除记录, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                api.deleteUser(codes).then(res => {
                    this.handleCreate2();
                    this.$notify({
                        title: "成功",
                        message: "删除成功",
                        type: "success",
                        duration: 2000
                    });
                });
            });
        },
        delete(codes) {
            this.$confirm("此操作将永久删除记录, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                api.deleteRecord(codes).then(res => {
                this.getList();
                this.$notify({
                    title: "成功",
                    message: "删除成功",
                    type: "success",
                    duration: 2000
                });
                });
            });
        },
        create() {//新增弹窗确定按钮单击事件方法
            this.$refs.temp.validate(valid => {
                if (valid) {
                api.addRecord(this.temp).then(res => {
                    console.log(res);
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
        create1() {//功能授权弹窗确定按钮单击事件方法
            let catalogs = this.handleCheckChange().map(function(item, index, array) {
                return item.catalogCode;
            });
            api.addMenu(this.selectedrow[0].roleCode, { catalogCodes: catalogs }).then(res => {
                this.$notify({
                    title: "成功",
                    message: "授权成功",
                    type: "success",
                    duration: 2000
                });
            });

            this.dialogFormVisible1 = false;
            },
        create2() {//授权用户弹窗确定按钮单击事件方法
            this.dialogFormVisible2 = false;
        },
        update() {//编辑弹窗确定按钮单击事件方法
            this.$refs.temp.validate(valid => {
                if (valid) {
                api.updateRecord(this.roleCode, this.temp).then(res => {
                    this.getList();
                    this.dialogFormVisible = false;
                    this.$notify({
                    title: "成功",
                    message: "更新成功",
                    type: "success",
                    duration: 2000
                    });
                    this.$refs.temp.resetFields();
                });
                } else {
                return false;
                }
            });
        },
        cancel() {
            this.dialogFormVisible = false;
            this.dialogFormVisible1 = false;
            this.dialogFormVisible2 = false;
        },
        resetTemp() {
            this.temp = {
                roleCode: undefined,
                roleName: undefined,
                roleType: undefined,
                remark: undefined
            };
        },
        handleClose() {
            this.resetTemp();
            // this.$refs.temp.resetFields()
        },
        handleSelectionChange(selection) {
            this.selectCode = selection.map(v => v.roleCode);
        }
    }
};
</script>


    