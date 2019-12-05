<template>
    <div class="tab_container">
        <div class="filter-container border_b_1">
            <div class="filter-items">
                <el-input size="small"
                          :placeholder="$t('userManagement.userName')"
                          v-model="listQuery.userName"
                          class="filter-item"
                          @keyup.enter.native="handleFilter" />
                <el-input size="small"
                          :placeholder="$t('userManagement.realName')"
                          v-model="listQuery.realName"
                          class="filter-item"
                          @keyup.enter.native="handleFilter" />
                <el-button type="primary"
                           size="small"
                           icon="el-icon-search"
                           @click="handleFilter">{{ $t('btn.search') }}</el-button>
            </div>
            <div class="table-container">
                <el-table :data="list"
                          height="320px"
                          border
                          fit
                          highlight-current-row
                          cell-class-name="table-cell"
                          header-cell-class-name="header-cell"
                          @selection-change="selectRow"
                          ref="tb">
                    <el-table-column type="selection"
                                     width="30"
                                     align="center">
                    </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     :label="$t('userManagement.userName')"
                                     prop="userName"
                                     align="center"
                                     min-width="120">

                    </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     :label="$t('userManagement.realName')"
                                     min-width="80"
                                     align="center"
                                     prop="realName">
                    </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     :label="$t('userManagement.lastIp')"
                                     min-width="120"
                                     prop="lastIp"
                                     align="center">
                    </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     :label="$t('userManagement.state')"
                                     min-width="60"
                                     align="center"
                                     prop="state">
                    </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     :label="$t('userManagement.isLog')"
                                     min-width="120"
                                     align="center"
                                     prop="isLog">
                    </el-table-column>
                </el-table>
                <pagination :total="total"
                            :page.sync="listQuery.currentPage"
                            :limit.sync="listQuery.pageSize"
                            @pagination="getList" />
            </div>
        </div>

    </div>

</template>
<script>
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import * as api from "@/api/data-base/equipment-ledger"
import { mapState } from 'vuex'

export default {
    name: 'user_management',
    components: { Pagination },
    data () {
        return {
            tableKey: 0,
            list: [],
            total: 0,
            listQuery: {
                orgId: '',
                currentPage: 1,
                pageSize: 10,
                page: 1
            },

        };
    },
    computed: {
        ...mapState({
        })
    },
    mounted () {
        this.getList();
    },

    methods: {
        getList () {
            api.queryUserRecords(this.listQuery).then(res => {
                this.list = res.data.list
                this.total = res.data.pages.count
            })
        },
        handleFilter () {
            this.listQuery.page = 1
            this.getList()
        },
        selectRow (val) {
            this.selectlistRow = val[val.length - 1];
            if (val.length > 1) {
                this.$refs.tb.clearSelection();
                this.$refs.tb.toggleRowSelection(val.pop());
            }
            this.$emit("handSelectPersonRows", this.selectlistRow);
        }
    },

};
</script>
