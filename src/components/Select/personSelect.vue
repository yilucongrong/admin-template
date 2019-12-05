// 选择采购人员
<template>
    <el-row>
        <el-col :span="24">
            <div class="filter-container no_t_border">
                <div class="filter-items">
                    <el-input size="small"
                              :placeholder="$t('poFormulation.employeeCode')"
                              v-model="listQuery.employeeCode"
                              class="filter-item"
                              @keyup.enter.native="handleFilter" />
                    <el-input size="small"
                              :placeholder="$t('poFormulation.employeeName')"
                              v-model="listQuery.employeeName"
                              class="filter-item"
                              @keyup.enter.native="handleFilter" />
                    <el-button type="primary"
                               size="small"
                               icon="el-icon-search"
                               @click="handleFilter">{{ $t('table.search') }}</el-button>
                </div>
            </div>
            <div class="table-container no_t_border no_t_margin">

                <el-table :key="tableKey"
                          :data="list"
                          border
                          fit
                          height="300px"
                          highlight-current-row
                          style="width: 100%;"
                          @selection-change='selectRow'
                          size="mini"
                          cell-class-name="table-cell"
                          header-cell-class-name="header-cell">
                    <el-table-column type="selection"
                                     width="30">
                    </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     :label="$t('poFormulation.employeeCode')"
                                     prop="employeeCode"
                                     align="center"
                                     width="120">
                        <template slot-scope="scope">
                            <span>{{ scope.row.employeeCode }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     :label="$t('poFormulation.employeeName')"
                                     width="80"
                                     align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.employeeName }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     :label="$t('poFormulation.organizationId')"
                                     min-width="80">
                        <template slot-scope="scope">
                            <span>{{ scope.row.organizationId }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     :label="$t('poFormulation.sex')"
                                     width="60"
                                     align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.sex|sexFilter }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     :label="$t('poFormulation.mobile')"
                                     width="120"
                                     align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.mobile }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     :label="$t('poFormulation.officePhone')"
                                     width="120">
                        <template slot-scope="scope">
                            <span>{{ scope.row.officePhone }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     :label="$t('poFormulation.email')"
                                     align="center"
                                     width="180">
                        <template slot-scope="scope">
                            <span>{{ scope.row.email }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     :label="$t('poFormulation.employState')"
                                     width="80">
                        <template slot-scope="scope">
                            <span>{{ scope.row.state|stateFilter }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     :label="$t('poFormulation.birthday')"
                                     class-name="status-col"
                                     width="120">
                        <template slot-scope="scope">
                            <span>{{ scope.row.birthday }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     :label="$t('poFormulation.hireDate')"
                                     class-name="status-col"
                                     width="180">
                        <template slot-scope="scope">
                            <span>{{ scope.row.hireDate }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     :label="$t('poFormulation.idNumber')"
                                     class-name="status-col"
                                     width="180">
                        <template slot-scope="scope">
                            <span>{{ scope.row.idNumber }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     :label="$t('poFormulation.siteAddress')"
                                     class-name="status-col"
                                     width="120">
                        <template slot-scope="scope">
                            <span>{{ scope.row.address }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     :label="$t('poFormulation.remark')"
                                     class-name="status-col"
                                     width="120">
                        <template slot-scope="scope">
                            <span>{{ scope.row.remark }}</span>
                        </template>
                    </el-table-column>
                </el-table>
                <pagination v-show="total>0"
                            :total="total"
                            :page.sync="listQuery.currentPage"
                            :limit.sync="listQuery.pageSize"
                            @pagination="handleFilter" />
            </div>
        </el-col>
    </el-row>

</template>
<script>
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { selectlists } from '@/api/system/employees'
// import waves from '@/directive/waves' // Waves directive
export default {
    name: 'personSelect',
    components: { Pagination },
    // directives: { waves },
    data () {
        return {
            tableKey: 0,
            list: [
            ],
            listuser: [],
            total: 0,
            listLoading: true,
            listQuery: {
                currentPage: 1,
                pageSize: 10,
                page: 1,

            }
        };
    },
    created () {
        this.handleFilter();
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
        handleFilter () {//查询组织列表
            this.listQuery.page = 1
            selectlists(this.listQuery).then(response => {
                this.list = response.data.list
                this.total = response.data.pages.count
                // Just to simulate the time of the request
            })
        },
        selectRow (val) {//备选项选中行
            this.$emit('handSelectPersonnelsRows', val)
        },
    }







}
</script>