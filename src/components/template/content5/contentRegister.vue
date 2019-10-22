<template>
    <div>
        <el-col :span="24">
            <div class="filter-container no_b_padding">
                <div class="filter-items">
                    <el-form :rules="rules"
                             :model="mainFormList"
                             ref="mainForm"
                             label-position="left"
                             label-width="85px"
                             :inline="true"
                             class="demo-form-inline">
                        <el-row>
                            <el-form-item class="el_form_item5"
                                          :label="''"
                                          prop="accountDate">
                                <el-date-picker :disabled="isSaveEdit"
                                                :placeholder="'记账日期'"
                                                size="small"
                                                v-model="mainFormList.accountDate"
                                                value-format="yyyy-MM-dd"></el-date-picker>
                            </el-form-item>

                            <el-form-item class="el_form_item5"
                                          :label="''"
                                          prop="materielCode">
                                <el-input size="small"
                                          v-model="mainFormList.materielCode"
                                          :placeholder="'物料编码'"
                                          disabled>
                                    <el-button :disabled="isEdit"
                                               slot="append"
                                               icon="el-icon-search"></el-button>
                                </el-input>
                            </el-form-item>

                            <el-form-item label=""
                                          prop="materielName">
                                <el-input :placeholder="'物料名称'"
                                          size="small"
                                          v-model="mainFormList.materielName"
                                          class="filter-item"
                                          disabled />
                            </el-form-item>
                            <el-form-item label=""
                                          prop="quantity">
                                <el-input :disabled="isSaveEdit"
                                          :placeholder="'加工数量'"
                                          size="small"
                                          v-model="mainFormList.quantity"
                                          class="filter-item" />
                            </el-form-item>
                            <el-form-item label=""
                                          prop="remark">
                                <el-input :disabled="isSaveEdit"
                                          :placeholder="'备注'"
                                          size="small"
                                          v-model="mainFormList.remark"
                                          class="filter-item" />
                            </el-form-item>
                            <el-form-item class="el_form_item5"
                                          label=""
                                          prop="dicType">
                                <changeModuleSelect @changeMoudle="changeMoudle"></changeModuleSelect>
                            </el-form-item>
                        </el-row>
                    </el-form>
                </div>
            </div>
            <div class="table-container">
                <div class="oprate_btn">
                    <el-button :disabled="isSaveEdit"
                               v-if="mainFormList.dicType === configBusiness.db"
                               size="small"
                               class="filter-item"
                               type="primary"
                               icon="el-icon-plus"
                               @click="handleAdd">{{$t('table.add')}}</el-button>
                    <el-button :disabled="isSaveEdit"
                               v-if="mainFormList.dicType === configBusiness.db"
                               size="small"
                               class="filter-item"
                               type="primary"
                               icon="el-icon-delete"
                               @click="handleDelete">{{$t('table.delete')}}</el-button>
                    <el-button :disabled="isSaveEdit"
                               size="small"
                               class="filter-item"
                               type="primary"
                               icon="el-icon-check "
                               @click="handleSave">保存</el-button>
                    <el-button size="small"
                               class="filter-item"
                               type="primary"
                               icon="el-icon-refresh-right"
                               @click="handleRefresh">刷新</el-button>
                </div>
                <el-table :data="list"
                          border
                          fit
                          :height="theight"
                          highlight-current-row
                          style="width: 100%;"
                          ref="tbmain"
                          @selection-change="selectChange"
                          @row-click="rowClick"
                          size="mini"
                          cell-class-name="table-cell"
                          header-cell-class-name="header-cell">
                    <el-table-column :disabled="isSaveEdit"
                                     type="selection"
                                     fixed
                                     width="30"
                                     align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     width="130"
                                     align="left"
                                     :label="'物料编码'"
                                     prop="materielCode"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     align="left"
                                     :label="'物料名称'"
                                     prop="materielName"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     align="left"
                                     :label="'数量'"
                                     prop="quantity">
                        <template slot-scope="scope">
                            <el-input :disabled="isSaveEdit"
                                      v-model="scope.row.quantity"></el-input>
                        </template>
                    </el-table-column>

                    <el-table-column :key="'0'"
                                     v-if="mainFormList.dicType === configBusiness.cz"
                                     show-overflow-tooltip
                                     align="left"
                                     :label="'库存类型'"
                                     prop="stockType">
                        <template slot-scope="scope">
                            <el-select :disabled="isSaveEdit"
                                       multiple
                                       size="small"
                                       v-model="scope.row.stockTypeArr"
                                       :placeholder="$t('table.select')">
                                <el-option v-for="item in dt_stock_type"
                                           :key="item.dictItemKey"
                                           :label="item.dictItemValue"
                                           :value="item.dictItemKey">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column v-else
                                     show-overflow-tooltip
                                     align="left"
                                     :label="'库存类型'"
                                     prop="stockType">
                        <template slot-scope="scope">
                            <el-select :disabled="isSaveEdit"
                                       size="small"
                                       v-model="scope.row.stockType"
                                       :placeholder="$t('table.select')">
                                <el-option v-for="item in dt_stock_type"
                                           :key="item.dictItemKey"
                                           :label="item.dictItemValue"
                                           :value="item.dictItemKey">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>

                    <el-table-column :key="'1'"
                                     v-if="mainFormList.dicType === configBusiness.cz"
                                     show-overflow-tooltip
                                     align="left"
                                     :label="'库存状态'"
                                     prop="stockState">
                        <template slot-scope="scope">
                            <el-select :disabled="isSaveEdit"
                                       multiple
                                       size="small"
                                       v-model="scope.row.stockStateArr"
                                       :placeholder="$t('table.select')">
                                <el-option v-for="item in dt_stock_status"
                                           :key="item.dictItemKey"
                                           :label="item.dictItemValue"
                                           :value="item.dictItemKey">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column v-else
                                     show-overflow-tooltip
                                     align="left"
                                     :label="'库存状态'"
                                     prop="stockState">
                        <template slot-scope="scope">
                            <el-select :disabled="isSaveEdit"
                                       size="small"
                                       v-model="scope.row.stockState"
                                       :placeholder="$t('table.select')">
                                <el-option v-for="item in dt_stock_status"
                                           :key="item.dictItemKey"
                                           :label="item.dictItemValue"
                                           :value="item.dictItemKey">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>

                    <el-table-column show-overflow-tooltip
                                     align="left"
                                     :label="'仓库'"
                                     prop="warehouseCode"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     align="left"
                                     :label="'库区'"
                                     prop="wareAreaCode">
                        <template slot-scope="scope">
                            <el-select :disabled="isSaveEdit"
                                       size="small"
                                       v-model="scope.row.wareAreaCode"
                                       @change="changeAreaSel(scope.row.wareAreaCode,scope.$index)">
                                <el-option v-for="item in areaList"
                                           :key="item.areaCode"
                                           :label="item.areaName"
                                           :value="item.areaCode">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     align="left"
                                     :label="'库位'"
                                     prop="wareLocationCode">
                        <template slot-scope="scope">
                            <el-select :disabled="isSaveEdit"
                                       size="small"
                                       v-model="scope.row.wareLocationCode">
                                <el-option v-for="item in locatorList[scope.$index]"
                                           :key="item.locationCode"
                                           :label="item.locationName"
                                           :value="item.locationCode">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip
                                     align="left"
                                     :label="'定额'"
                                     prop="quota"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     align="left"
                                     :label="'计量单位'"
                                     prop="measuringUnit"></el-table-column>
                    <el-table-column show-overflow-tooltip
                                     align="left"
                                     :label="'规格型号'"
                                     prop="specification"></el-table-column>
                </el-table>
                <pagination :total="total"
                            :size="15"
                            :page.sync="listQuery.currentPage"
                            :limit.sync="listQuery.pageSize"
                            @pagination="getList" />
            </div>
        </el-col>
    </div>
</template>

<script>
import global_valfn from '@/utils/global_valfn'
import changeModuleSelect from '@/components/template/changeMoudleSelect'
import { mapState } from 'vuex';
import Pagination from "@/components/Pagination";

export default {
    name: "wzskncontentRegister",
    components: { changeModuleSelect, Pagination },
    data () {
        return {
            theight: 0,
            list: null,
            isSingle: true,//表格是否单选 点击各按钮根据流程逻辑控制单多选
            currentSelectedRow: null,//当前选中的行
            selectedRows: null,//多选时选中的所有行
            listQuery: {
                //查询
                page: true,
                currentPage: 1,
                pageSize: 15
            },
            total: 0,
            listTemp: null,
            mainFormList: {
                orgCode: '',
                accountDate: this.timeFormat()
            },
            configBusiness: {
                db: '0908',
                cz: '0907',
                zz: '0906'
            },
            isEdit: false,
            isSaveEdit: false,
            selectRows: [],
            rules: {
                orgCode: [
                    { required: true, message: ' ', trigger: 'blur' }
                ],
                warehouseCode: [
                    { required: true, message: ' ', trigger: 'blur' }
                ],
                wareAreaCode: [
                    { required: true, message: ' ', trigger: 'blur' }
                ],
                wareLocationCode: [
                    { required: true, message: ' ', trigger: 'blur' }
                ],
                dicType: [
                    { required: true, message: ' ', trigger: 'blur' }
                ],
                materielCode: [
                    { required: true, message: this.$t('validate.required'), trigger: 'blur' }
                ],
                materielName: [
                    { required: true, message: this.$t('validate.required'), trigger: 'blur' }
                ],
                quantity: [
                    { required: true, message: ' ', trigger: 'blur' }
                ]
            }
        };
    },
    computed: {
        ...mapState({
            dt_stock_type: state => state.dict.dt_stock_type,
            dt_stock_status: state => state.dict.dt_stock_status
        })
    },
    mounted () {
        this.setTableHeight();
        //表格高度自适应
        window.onresize = () => {
            this.setTableHeight()
        };
        //   this.$store.dispatch('getDicData',['dt_stock_type','dt_stock_status']);
    },
    methods: {
        //表格高度计算
        setTableHeight () {
            this.theight = global_valfn.getSingleTbHeight() - 25;
        },
        changeMoudle (val) {
            this.$emit('changeSelect', val)
        },
        getList () { },
        // 表格选择框选中 注:参数为选中的所有行的数组
        selectChange (val) {
            if (this.isSingle) {
                if (val.length > 1) {
                    this.$refs.tb.clearSelection(); //清除其他行的选中
                    this.$refs.tb.toggleRowSelection(val[val.length - 1], "selected"); //单击行绑定点击事件
                } else if (val.length === 1) {
                    this.selectedRows = val;
                    this.currentSelectedRow = val[val.length - 1]
                }
            } else {
                this.selectedRows = val;
                this.currentSelectedRow = val[val.length - 1]
            }
        },
        //点击表格某一行
        rowClick (val) {
            if (this.isSingle) {
                this.$refs.tb.clearSelection(); //清除其他行的选中
            }
            this.$refs.tb.toggleRowSelection(val, "selected"); //单击行绑定点击事件
            this.getSubList(val);
        },
        timeFormat () {
            var d = new Date();
            var year = d.getFullYear();       //年  
            var month = d.getMonth() + 1;     //月  
            var day = d.getDate();            //日  

            var clock = year + "-";
            if (month < 10)
                clock += "0";
            clock += month + "-";

            if (day < 10)
                clock += "0";
            clock += day + " ";
            return (clock);
        },
        //新增
        handleAdd () {

        },
        //删除
        handleDelete () {

        },
        //保存
        handleSave () {

        },
        //刷新
        handleRefresh () {
            this.isEdit = false;
            this.isSaveEdit = false;
            this.list = [];
        }
    }
}
</script>