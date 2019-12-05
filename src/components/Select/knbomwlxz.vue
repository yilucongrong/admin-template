// bom物料选择
<template>
    <el-tabs class="tab_container"
             v-model="activeName2"
             type="card">
        <el-tab-pane :label="$t('table.tbSelected')"
                     name="first">
            <div class="filter-container">
                <div class="filter-items">
                    <el-input size="small"
                              :placeholder="'物料编码'"
                              v-model="listQueryAll.materielCode"
                              class="filter-item"
                              @keyup.enter.native="handleQuery" />
                    <el-input size="small"
                              :placeholder="'物料名称'"
                              v-model="listQueryAll.materielName"
                              class="filter-item"
                              @keyup.enter.native="handleQuery" />
                    <el-button class="filter-item"
                               type="primary"
                               size="small"
                               icon="el-icon-search"
                               @click="getList1">{{ $t('table.search') }}</el-button>
                </div>
            </div>
            <div class="table-container border_t_1">
                <el-table :data="listAll"
                          ref="tbselect"
                          border
                          fit
                          height="250px"
                          highlight-current-row
                          style="width: 100%;"
                          @selection-change="selectChange"
                          size="mini"
                          cell-class-name="table-cell"
                          header-cell-class-name="header-cell">
                    <el-table-column type="selection"
                                     fixed
                                     width="30"
                                     align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="130"
                                     align="left"
                                     label="序号"
                                     prop="rowId"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="130"
                                     align="left"
                                     label="版本号"
                                     prop="versions"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="130"
                                     align="left"
                                     label="物料编码"
                                     prop="materielCode"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="130"
                                     align="left"
                                     label="物料名称"
                                     prop="materielName"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="130"
                                     align="left"
                                     label="基准数量"
                                     prop="standardNum"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="130"
                                     align="left"
                                     label="有效开始时间"
                                     prop="effDateBegin"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="130"
                                     align="left"
                                     label="有效结束时间"
                                     prop="effDateEnd"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     min-width="130"
                                     align="left"
                                     label="状态"
                                     prop="state">
                        <template slot-scope="scope">{{scope.row.state===0 ? "编制":"生效"}}</template>
                    </el-table-column>
                </el-table>
                <hr class="hrtLineStyle">

                <pagination :total="totalAll"
                            :page.sync="listQueryAll.currentPage"
                            :limit.sync="listQueryAll.pageSize"
                            @pagination="getList1"
                            class="page-container border_b_1" />
                <el-table :key="tableKey"
                          :data="listSub"
                          border
                          fit
                          height="315"
                          highlight-current-row
                          style="width: 100%;"
                          size="mini"
                          cell-class-name="table-cell"
                          header-cell-class-name="header-cell">
                    <el-table-column show-overflow-tooltip
                                     width="100"
                                     align="left"
                                     label="序号"
                                     prop="rowId"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="150"
                                     align="left"
                                     label="物料编码"
                                     prop="materielCode"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="150"
                                     align="left"
                                     label="物料名称"
                                     prop="materielName"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="150"
                                     align="left"
                                     label="标准定额"
                                     prop="assemblingNum"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="150"
                                     align="left"
                                     label="拆装定额"
                                     prop="dismantlingNum"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     min-width="150"
                                     align="left"
                                     label="计量单位"
                                     prop="measuringUnit"></el-table-column>
                </el-table>

            </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('table.selected')"
                     name="second">
            <hr class="hrtLineStyle">
            <div class="table-container">
                <el-table :data="listSelected"
                          border
                          fit
                          highlight-current-row
                          style="width: 100%;"
                          size="mini"
                          cell-class-name="table-cell"
                          header-cell-class-name="header-cell">
                    <el-table-column show-overflow-tooltip
                                     width="130"
                                     align="left"
                                     label="序号"
                                     prop="rowId"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="130"
                                     align="left"
                                     label="版本号"
                                     prop="versions"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="130"
                                     align="left"
                                     label="物料编码"
                                     prop="materielCode"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="130"
                                     align="left"
                                     label="物料名称"
                                     prop="materielName"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="130"
                                     align="left"
                                     label="基准数量"
                                     prop="standardNum"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="130"
                                     align="left"
                                     label="有效开始时间"
                                     prop="effDateBegin"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="130"
                                     align="left"
                                     label="有效结束时间"
                                     prop="effDateEnd"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     min-width="130"
                                     align="left"
                                     label="状态"
                                     prop="state">
                        <template slot-scope="scope">{{scope.row.state===0 ? "编制":"生效"}}</template>
                    </el-table-column>
                </el-table>
            </div>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
import Pagination from '@/components/Pagination' // 分页组件
import * as api from "@/api/data-base/instorageProcess"
export default {
    components: { Pagination },
    props: ['unMutiple', 'bomType', 'orgCode'],
    data () {
        return {
            listAll: null,
            listSelected: null,
            listSub: null,
            totalAll: 0,
            totalSelected: 0,
            activeName2: 'first',
            tableKey: 0,
            listQueryAll: {
                page: true,
                currentPage: 1,
                pageSize: 10,
                bomType: '',
                orgCode: '',
                materielCode: '',
                materielName: ''
            },
            isEdit: true,
            detailList: []
        }
    },
    mounted () {//创建时加载备选项
        this.getList1()
    },
    methods: {
        handleFilter1 () {//查询备选项
            this.getList1()
        },
        handleFilter2 () {//查询已选项
            this.getList2()
        },
        getList1 () {//备选项查询
            this.listQueryAll.orgCode = this.orgCode;
            this.listQueryAll.bomType = this.bomType;
            api.queryRecords(this.listQueryAll.orgCode, this.listQueryAll.bomType, this.listQueryAll).then(res => {
                this.listAll = res.data.list
                this.totalAll = res.data.pages.count
            });
        },
        getList2 () {//已选项查询
            this.listSelected = this.selectRowData1
        },
        getDetail (val) {
            api.queryRecordsDetail(val.versions, {}).then(res => {
                res = res.data;
                this.listSub = res;
                if (this.unMutiple) {
                    this.$emit('clickRows', {
                        v1: val,
                        v2: this.listSub
                    });
                } else {
                    this.$emit('clickRows', this.listSelected);
                }

            })
        },
        selectChange (val) {
            if (this.unMutiple) {
                this.selectOneRow(val);
            } else {
                this.selectRow1(val);
            }
        },
        selectRow1 (val) {//备选项选中行
            this.selectRowData1 = val
            this.listSelected = this.selectRowData1;
            this.getDetail(val[val.length - 1]);
            // this.$emit('clickRows' ,val,this.listSub);
        },
        selectOneRow (val) {
            let arr = [];
            arr.push(val[val.length - 1])
            this.selectRowData1 = arr;
            if (arr[0]) {
                this.getDetail(arr[0]);
            }
            if (val.length > 1) {
                this.$refs.tbselect.clearSelection()
                this.$refs.tbselect.toggleRowSelection(val[val.length - 1], 'selected')
            }
            this.listSelected = this.selectRowData1;

        }
    }
}
</script>
