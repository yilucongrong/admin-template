<template>
    <div>
        <div class="app-container">
            <div class="filter-container">
                <div class="filter-items">
                    <el-input size="small"
                              :placeholder="$t('customer.customerCode')"
                              v-model="listQuery.customerCode"
                              class="filter-item"
                              @keyup.enter.native="handleQuery" />
                    <el-input size="small"
                              :placeholder="$t('customer.customerName')"
                              v-model="listQuery.customerName"
                              class="filter-item"
                              @keyup.enter.native="handleQuery" />
                    <!-- <span class="filter-item-name">客户类型</span> -->
                    <el-select size="small"
                               v-model="listQuery.customerType"
                               :placeholder="$t('customer.customerType')"
                               clearable>
                        <el-option v-for="item in dt_customer_type"
                                   :key="item.dictItemKey"
                                   :label="item.dictItemValue"
                                   :value="item.dictItemKey"></el-option>
                    </el-select>
                    <el-button class="filter-item"
                               type="primary"
                               size="small"
                               icon="el-icon-search"
                               @click="handleQuery">{{ $t('table.search') }}</el-button>
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
                    <el-button size="small"
                               class="filter-item"
                               type="primary"
                               icon="el-icon-upload2">{{ $t('table.export') }}</el-button>
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
                          @selection-change='selectRow'
                          size="mini"
                          cell-class-name="table-cell"
                          header-cell-class-name="header-cell">
                    <el-table-column type="selection"
                                     fixed
                                     width="30"
                                     align="center">
                    </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="120"
                                     align="left"
                                     :label="$t('customer.customerCode')"
                                     prop="customerCode"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="120"
                                     align="left"
                                     :label="$t('customer.customerName')"
                                     prop="customerName"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="120"
                                     align="left"
                                     :label="$t('customer.customerType')"
                                     prop="customerTypeName"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="120"
                                     align="left"
                                     :label="$t('customer.customerPropertyName')"
                                     prop="customerPropertyName"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="120"
                                     align="left"
                                     :label="$t('customer.isRetailer')">
                        <template slot-scope="scope">
                            {{ [scope.row.isRetailer, isRetailerOptions] | optionsFilter }}
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="100"
                                     align="left"
                                     :label="$t('customer.contact')"
                                     prop="contact"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="100"
                                     align="left"
                                     :label="$t('customer.contactNumber')"
                                     prop="contactNumber"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="160"
                                     align="left"
                                     :label="$t('customer.email')"
                                     prop="email"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="260"
                                     align="left"
                                     :label="$t('customer.address')"
                                     prop="address"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     min-width="480"
                                     align="left"
                                     :label="$t('customer.remark')"
                                     prop="remark"></el-table-column>
                </el-table>
                <pagination :total="total"
                            :page.sync="listQuery.currentPage"
                            :limit.sync="listQuery.pageSize"
                            @pagination="getList" />
            </div>
            <el-dialog custom-class="dialog-custom"
                       :close-on-click-modal="false"
                       :close-on-press-escape="false"
                       :title="dialogStatus=='create'?$t('table.add'):$t('table.edit')"
                       :visible.sync="dialogFormVisible"
                       @close="handleClose">
                <el-form class="small-space"
                         :model="temp"
                         :rules="rules"
                         ref="temp"
                         label-width="100px"
                         :inline="true"
                         size="mini"
                         style='max-width: 600px; '>
                    <el-form-item :label="$t('customer.customerCode')"
                                  prop="customerCode">
                        <el-input v-model="temp.customerCode"
                                  :disabled="dialogStatus!='create'"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('customer.customerName')"
                                  prop="customerName">
                        <el-input v-model="temp.customerName"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('customer.customerType')">
                        <el-select size="small"
                                   v-model="temp.customerType"
                                   :placeholder="$t('table.select')">
                            <el-option v-for="item in dt_customer_type"
                                       :key="item.dictItemKey"
                                       :label="item.dictItemValue"
                                       :value="item.dictItemKey"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('customer.customerPropertyName')">
                        <el-select size="small"
                                   v-model="temp.customerProperty"
                                   :placeholder="$t('table.select')">
                            <el-option v-for="item in dt_customer_property"
                                       :key="item.dictItemKey"
                                       :label="item.dictItemValue"
                                       :value="item.dictItemKey"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('customer.isRetailer')">
                        <el-select v-model="temp.isRetailer">
                            <el-option v-for="item in isRetailerOptions"
                                       :key="item.value"
                                       :label="item.label"
                                       :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('customer.contact')"
                                  prop="contact">
                        <el-input v-model="temp.contact"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('customer.contactNumber')"
                                  prop="contactNumber">
                        <el-input v-model="temp.contactNumber"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('customer.email')"
                                  prop="email">
                        <el-input v-model="temp.email"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('customer.address')"
                                  prop="address">
                        <el-input v-model="temp.address"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('customer.remark')"
                                  prop="remark">
                        <el-input v-model="temp.remark"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer"
                     class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
                    <el-button v-if="dialogStatus=='create'"
                               type="primary"
                               @click="create">{{ $t('table.confirm') }}</el-button>
                    <el-button v-else
                               type="primary"
                               @click="update">{{ $t('table.confirm') }}</el-button>
                </div>
            </el-dialog>
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
</template>


<script>
import * as api from '@/api/data-base/customer'
import Pagination from '@/components/Pagination'
import { TWO_STATE_OPTIONS } from '@/utils/constant'
import { validatorContactNumber, validatorEmail } from '@/utils/validate'
import { mapState } from 'vuex';
import ImportFile from "@/components/ImportFile";


export default {
    name: 'customer',
    components: { Pagination, ImportFile },
    data () {
        return {
            list: null,
            total: 0,
            theight: 0,//表格高度
            listQuery: {
                page: true,
                currentPage: 1,
                pageSize: 15,
                customerCode: undefined,
                customerName: undefined,
                customerType: undefined
            },
            temp: {
                customerCode: undefined,
                customerName: undefined,
                customerType: undefined,
                customerProperty: undefined,
                isRetailer: 0,
                address: undefined,
                contact: undefined,
                contactNumber: undefined,
                email: undefined,
                remark: undefined
            },
            customerCode: undefined,
            selectCode: [],
            dialogFormVisible: false,
            dialogFormVisible2: false,
            importDialogVisible: false,//导入弹框
            modalNo: 'EXTP-BAS-0001',//导入模板编号
            dialogStatus: '',
            tableKey: 0,
            isRetailerOptions: TWO_STATE_OPTIONS,
            rules: {
                customerCode: [
                    { required: true, message: '客户编码不能为空', trigger: 'blur' },
                    { pattern: /^[A-Z-_0-9]{1,50}$/, message: '由大写字母，数字，—和_组成，长度不能超过50', trigger: 'blur' }
                ],
                customerName: [
                    { required: true, message: '客户名称不能为空', trigger: 'blur' },
                    { max: 100, message: this.$t('validate.max32'), trigger: 'blur' }
                ],
                contact: [
                    { max: 50, message: '长度不能超过50', trigger: 'blur' }
                ],
                contactNumber: [
                    { validator: validatorContactNumber, trigger: 'blur' }
                ],
                email: [
                    { validator: validatorEmail, trigger: 'blur' }
                ],
                address: [
                    { max: 512, message: '长度不能超过512', trigger: 'blur' }
                ],
                remark: [
                    { max: 512, message: '描述长度为512内', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        ...mapState({
            dt_customer_type: state => state.dict.dt_customer_type,
            dt_customer_property: state => state.dict.dt_customer_property
        })
    },
    mounted () {
        this.$store.dispatch('dict/getDicData', ['dt_customer_type', 'dt_customer_property']);
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
                this.list = res.data.list
                this.total = res.data.pages.count
            })
        },
        //表格高度计算
        setTableHeight () {
            this.theight = this.$myFun.getSingleTbHeight();
        },
        handleQuery () {
            this.listQuery.currentPage = 1
            this.getList()
        },
        handleSizeChange (val) {
            this.listQuery.pageSize = val
            this.getList()
        },
        handleCurrentChange (val) {
            this.listQuery.currentPage = val
            this.getList()
        },
        handleCreate () {
            this.resetTemp()
            this.dialogStatus = 'create'
            this.dialogFormVisible = true
        },
        selectRow (val) {
            this.selectlistRow = val
        },
        handleImport () {
            this.importDialogVisible = true;
            this.$nextTick(() => {
                this.$refs.importDialog.getList();
            })
        },
        handleUpdate () {
            if (this.selectlistRow && this.selectlistRow.length == 1) {
                this.readonly = true//组织编码不可以编写
                this.temp = this.selectlistRow[0] // copy obj
                api.getRecord(this.temp.customerCode).then(res => {
                    this.temp = res.data
                    this.dialogStatus = 'update'
                    this.dialogFormVisible = true
                    this.$nextTick(() => {
                        this.$refs['temp'].clearValidate()
                    })
                })
            } else {
                this.$message({
                    title: '警告',
                    message: '请选择一条信息',
                    type: 'warning'
                })
            }
        },
        update () {
            this.$refs['temp'].validate((valid) => {
                if (valid) {
                    api.updateRecord(this.temp.customerCode, this.temp).then(() => {
                        this.getList();
                        this.dialogFormVisible = false
                        this.$message({
                            title: '成功',
                            message: '更新成功',
                            type: 'success',
                            duration: 2000
                        })
                    })
                }
            })
        },
        handleDelete () {//删除列表
            if (this.selectlistRow && this.selectlistRow.length == 1) {
                this.$confirm('此操作将删除所选中数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    let ids = []
                    this.selectlistRow.forEach((val, index) => {
                        ids[index] = val.customerCode
                    })
                    api.deleteRecord(ids).then(() => {
                        this.getList(),
                            this.$message({
                                title: '成功',
                                message: '删除成功',
                                type: 'success',
                                duration: 2000
                            })
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            } else {
                this.$message({
                    title: '警告',
                    message: '请选择一条信息',
                    type: 'warning'
                })
            }
        },
        create () {
            this.$refs.temp.validate((valid) => {
                if (valid) {
                    api.addRecord(this.temp).then(() => {
                        this.getList()
                        this.dialogFormVisible = false
                        this.$notify({
                            title: '成功',
                            message: '新增成功',
                            type: 'success',
                            duration: 2000
                        })
                    })
                } else {
                    return false
                }
            })
        },
        resetTemp () {
            this.temp = {
                customerCode: undefined,
                customerName: undefined,
                customerType: undefined,
                customerProperty: undefined,
                isRetailer: 0,
                address: undefined,
                contact: undefined,
                contactNumber: undefined,
                email: undefined,
                remark: undefined
            }
        },
        handleClose () {
            this.resetTemp()
            this.$refs.temp.resetFields()
        }
    }
}
</script>
