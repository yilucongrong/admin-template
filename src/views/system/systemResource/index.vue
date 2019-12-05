<template>
    <div>
        <div class="app-container">
            <div class="filter-container">
                <div class="filter-items">
                    <el-input size="small"
                              :placeholder="$t('systemResource.endpointCode')"
                              v-model="listQuery.endpointCode"
                              class="filter-item"
                              @keyup.enter.native="handleFilter" />
                    <el-input size="small"
                              :placeholder="$t('systemResource.endpointName')"
                              v-model="listQuery.endpointName"
                              class="filter-item"
                              @keyup.enter.native="handleFilter" />
                    <el-input size="small"
                              :placeholder="$t('systemResource.url')"
                              v-model="listQuery.url"
                              class="filter-item"
                              @keyup.enter.native="handleFilter" />
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
                <el-table v-loading="listLoading"
                          :key="tableKey"
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
                                     :label="$t('systemResource.endpointCode')"
                                     prop="endpointCode"
                                     align="center"
                                     width="120">
                        <template slot-scope="scope">
                            <span>{{ scope.row.endpointCode }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     :label="$t('systemResource.endpointName')"
                                     min-width="120"
                                     align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.endpointName }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     :label="$t('systemResource.url')"
                                     min-width="160">
                        <template slot-scope="scope">
                            <span>{{ scope.row.url }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     :label="$t('systemResource.method')"
                                     width="100"
                                     align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.method }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     :label="$t('systemResource.remark')"
                                     width="120"
                                     align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.remark }}</span>
                        </template>
                    </el-table-column>
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
                    <el-form-item :label="$t('systemResource.endpointCode')"
                                  prop="endpointCode"
                                  :readonly="readonly">
                        <el-input v-if="dialogStatus=='update'"
                                  v-model="temp.endpointCode"
                                  disabled="disabled" />
                        <el-input v-else
                                  v-model="temp.endpointCode" />
                    </el-form-item>
                    <el-form-item :label="$t('systemResource.endpointName')"
                                  prop="endpointName">
                        <el-input v-model="temp.endpointName" />
                    </el-form-item>
                    <el-form-item :label="$t('systemResource.url')"
                                  prop="url">
                        <el-input v-model="temp.url" />
                    </el-form-item>
                    <el-form-item :label="$t('systemResource.method')"
                                  prop="method">
                        <el-select v-model="temp.method">
                            <el-option value="GET"
                                       label="GET"></el-option>
                            <el-option value="POST"
                                       label="POST"></el-option>
                            <el-option value="DELETE"
                                       label="DELETE"></el-option>
                            <el-option value="PATCH"
                                       label="PATCH"></el-option>
                            <el-option value="GET"
                                       label="GET"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('systemResource.remark')"
                                  prop="remark">
                        <el-input v-model="temp.remark" />
                    </el-form-item>
                </el-form>
                <div slot="footer"
                     class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
                    <el-button type="primary"
                               @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button>
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
                               @click="dialogPvVisible = false">{{ $t('table.confirm') }}</el-button>
                </span>
            </el-dialog>
        </div>
    </div>

</template>
<script>
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
import { selectlists, creat, deletelist, updatalist } from "@/api/system/resource";

// import waves from "@/directive/waves"; // Waves directive
// import { parseTime } from "@/utils";
// import { selecttree } from "@/api/system/organization";
export default {
    name: "systemResource",
    components: { Pagination },
    // directives: { waves },
    data () {
        return {
            tableKey: 0,
            list: [],
            total: 0,
            listLoading: true,
            theight: 0,//表格高度
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
                remark: undefined
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
        getList () {//查询数据
            this.listLoading = true;
            selectlists(this.listQuery).then(response => {
                this.list = response.data.list;
                this.total = response.data.pages.count;

                // Just to simulate the time of the request
                setTimeout(() => {
                    this.listLoading = false;
                }, 1.5 * 100);
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
                remark: undefined
            };
        },
        handleCreate () {
            this.resetTemp();
            this.dialogStatus = "create";
            this.dialogFormVisible = true;
            this.readonly = false; //可以编写
            this.$nextTick(() => {
                this.$refs["dataForm"].clearValidate();
            });
        },
        createData () {
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
                this.readonly = true; //不可以编写
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
                    updatalist(this.temp.endpointCode, this.temp).then(() => {
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
        // 获取表格选中时的数据
        selectRow (val) {
            this.selectlistRow = val;
        },
        handleDelete () {//删除列表
            if (this.selectlistRow && this.selectlistRow.length == 1) {
                let ids = [];
                this.selectlistRow.forEach((val, index) => {
                    ids[index] = val.endpointCode;
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