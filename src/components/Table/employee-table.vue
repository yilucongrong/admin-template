<template>
    <div class="app-container calendar-list-container popup">
        <div class="filter-container">
            <div class="filter-items">
                <el-input :placeholder="'员工编码'"
                          @keyup.enter.native="handleQuery"
                          style="width: 120px;"
                          class="filter-item"
                          size="mini"
                          v-model="listQuery.employeeCode">
                </el-input>
                <el-input :placeholder="'员工名称'"
                          @keyup.enter.native="handleQuery"
                          style="width: 120px;"
                          class="filter-item"
                          size="mini"
                          v-model="listQuery.employeeName">
                </el-input>

                <el-button class="filter-item"
                           size="mini"
                           type="primary"
                           icon="el-icon-search"
                           @click="handleQuery">{{$t('table.search')}}</el-button>
            </div>
        </div>
        <div class="table-container">
            <el-table :key='tableKey'
                      :data="list"
                      border
                      fit
                      highlight-current-row
                      style="width: 100%"
                      size="mini"
                      cell-class-name="table-cell"
                      @row-click="handleDblclick"
                      height="315"
                      header-cell-class-name="header-cell">
                <el-table-column show-overflow-tooltip
                                 width="120"
                                 align="center"
                                 label="员工编码"
                                 prop="employeeCode"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="120"
                                 align="center"
                                 label="员工名称"
                                 prop="employeeName"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="120"
                                 align="center"
                                 label="所属组织"
                                 prop="organizationId"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="120"
                                 align="center"
                                 label="性别">
                    <template slot-scope="scope">
                        {{ scope.row.sex | sexFilter }}
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="120"
                                 align="center"
                                 label="联系电话"
                                 prop="mobile"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="120"
                                 align="center"
                                 label="办公电话"
                                 prop="officePhone"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="200"
                                 align="center"
                                 label="邮件地址"
                                 prop="email"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="80"
                                 align="center"
                                 label="生日"
                                 prop="birthday"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="200"
                                 align="center"
                                 label="入职时间"
                                 prop="hireDate"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="200"
                                 align="center"
                                 label="身份证号"
                                 prop="idNumber"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="200"
                                 align="center"
                                 label="居住地址"
                                 prop="address"></el-table-column>
                <el-table-column show-overflow-tooltip
                                 width="200"
                                 align="center"
                                 label="备注"
                                 prop="remark"></el-table-column>
            </el-table>

            <pagination :total="total"
                        :page.sync="listQuery.currentPage"
                        :limit.sync="listQuery.pageSize"
                        @pagination="getList" />
        </div>
    </div>
</template>
<script>
import { selectlists as queryRecords } from '@/api/system/employees'
import Pagination from '@/components/Pagination'


export default {
    name: 'employee-table',
    components: { Pagination },
    data () {
        return {
            list: null,
            total: 0,
            listQuery: {
                currentPage: 1,
                pageSize: 10,
                employeeCode: undefined,
                employeeName: undefined,
                state: 1
            },
            temp: {
                employeeCode: undefined,
                employeeName: undefined,
                sex: 1,
                organizationId: undefined,
                state: undefined,
                mobile: undefined,
                email: undefined,
                officePhone: undefined,
                birthday: undefined,
                hireDate: undefined,
                idNumber: undefined,
                address: undefined,
                remark: undefined
            },
            materielCode: undefined,
            selectCode: [],
            dialogFormVisible: false,
            dialogFormVisible2: false,
            dialogStatus: '',
            tableKey: 0
        }
    },
    created () {
        this.getList()
    },
    methods: {
        getList () {
            queryRecords(this.listQuery).then(res => {
                this.list = res.data.list
                this.total = res.data.pages.count
            })
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
        handleDblclick (row) {
            this.$emit('dblclick', row)
        }
    }
}
</script>
