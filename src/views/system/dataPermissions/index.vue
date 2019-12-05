<template>
    <div>
        <div class="app-container">
            <el-row>
                <el-col class="left_col"
                        :span="12">
                    <div class="filter-container">
                        <div class="filter-items">
                            <orgSelect :placeholder="$t('data_Permissions.orgId')"
                                       class="filter-item"
                                       :orgType="DT_ORG_TYPE.factory"
                                       v-model="listQuery.orgCode">
                            </orgSelect>
                            <dictItemSelect :placeholder="$t('data_Permissions.domainScope')"
                                            :dictCode="DICT_CODE.userArea"
                                            v-model="listQuery.domainScope "
                                            class="filter-item"></dictItemSelect>
                            <el-input @keyup.enter.native="handleQuery"
                                      class="filter-item"
                                      :placeholder="$t('data_Permissions.userName')"
                                      size="small"
                                      v-model="listQuery.userName">
                            </el-input>
                            <el-input @keyup.enter.native="handleQuery"
                                      class="filter-item"
                                      :placeholder="$t('data_Permissions.realName')"
                                      size="small"
                                      v-model="listQuery.realName">
                            </el-input>
                            <el-button class="filter-item"
                                       size="small"
                                       type="primary"
                                       icon="el-icon-search"
                                       @click="handleQuery">{{ $t('table.search') }}</el-button>
                        </div>
                    </div>
                    <div class="table-container no_t_margin no_t_border">
                        <el-table :key="tableKey[0]"
                                  :data="list"
                                  :height="theight"
                                  border
                                  fit
                                  highlight-current-row
                                  style="width: 100%;"
                                  size="mini"
                                  cell-class-name="table-cell"
                                  header-cell-class-name="header-cell"
                                  @row-click='selectRow2'
                                  ref='tb'
                                  @selection-change='selectRow1'>
                            <el-table-column type="selection"
                                             fixed
                                             width="30"
                                             align="center"></el-table-column>
                            <el-table-column show-overflow-tooltip
                                             width="130"
                                             align="left"
                                             :label="$t('data_Permissions.userName')"
                                             prop="userName"></el-table-column>
                            <el-table-column show-overflow-tooltip
                                             min-width="130"
                                             align="left"
                                             :label="$t('data_Permissions.realName')"
                                             prop="realName"></el-table-column>
                            <!-- <el-table-column show-overflow-tooltip min-width="130" align="left" label="所属组织" prop="orgId"></el-table-column> -->
                        </el-table>
                        <pagination :total="total"
                                    :page.sync="listQuery.currentPage"
                                    :layout="'total, prev, pager, next'"
                                    :limit.sync="listQuery.pageSize"
                                    @pagination="getList"
                                    class="pagination-container" />
                    </div>
                </el-col>

                <el-col class="right_col"
                        :span="12">
                    <div class="filter-container">
                        <dictItemSelect :placeholder="$t('data_Permissions.accessTypeCode')"
                                        :dictCode="DICT_CODE.powerType"
                                        v-model="listQuery1.accessTypeCode"
                                        class="filter-item"
                                        @change="handleFilterqxlb">
                        </dictItemSelect>
                        <el-select v-if="!listQuery1.accessTypeCode"
                                   :placeholder="$t('data_Permissions.metaDataCode')"
                                   size="small"
                                   v-model="listQuery1.metaDataCode"
                                   clearable
                                   @keyup.enter.native="handleFilter">
                        </el-select>
                        <el-select v-else
                                   size="small"
                                   @change="getEndpointCode"
                                   v-model="listQuery1.metaDataCode"
                                   clearable
                                   @keyup.enter.native="handleFilter">
                            <el-option v-for="item in qxlb"
                                       :key="item.metaDataCode"
                                       :label="item.metaDataName"
                                       :value="item.metaDataCode">
                            </el-option>
                        </el-select>
                        <el-button class="filter-item"
                                   size="small"
                                   type="primary"
                                   icon="el-icon-search"
                                   @click="handleQuerylb">{{ $t('table.search') }}</el-button>
                    </div>
                    <div class="table-container no_t_margin no_t_border">
                        <div class="oprate_btn">
                            <el-button class="filter-item"
                                       size="small"
                                       type="primary"
                                       @click="handleConfirm"
                                       icon="el-icon-circle-check">
                                {{ $t('table.confirm') }}
                            </el-button>
                        </div>
                        <el-table :data="list1"
                                  :key="tableKey[1]"
                                  border
                                  fit
                                  :height="stheight"
                                  highlight-current-row
                                  style="width: 100%;"
                                  size="mini"
                                  cell-class-name="table-cell"
                                  header-cell-class-name="header-cell"
                                  @selection-change='selectRow3'
                                  ref="dd">
                            <template v-for="(col,index) in cols">
                                <el-table-column :key="index"
                                                 v-if="col.prop==='selection'"
                                                 type="selection"
                                                 fixed
                                                 width="30"
                                                 align="center"></el-table-column>
                                <el-table-column v-else
                                                 :key="index"
                                                 :prop="col.prop"
                                                 :label="col.label"
                                                 fixed
                                                 align="center"></el-table-column>
                            </template>
                        </el-table>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

// import waves from '@/directive/waves' // Waves directive
import { DICT_CODE, DT_ORG_FUNCTION, DT_ORG_TYPE } from "@/utils/constant"
import dictItemSelect from '@/components/Select/dictItemSelect.vue'
import orgSelect from "@/components/Select/orgSelect.vue"
import * as api from '@/api/system/data_permissions'
export default {
    name: 'dataPermissions',
    components: { Pagination, dictItemSelect, orgSelect },
    // directives: { waves },
    data () {
        const sourceMap = {
            "kg": 1,
            "iwms": 2,
            "scc": 3
        }
        return {
            DICT_CODE: DICT_CODE,
            DT_ORG_FUNCTION: DT_ORG_FUNCTION,
            DT_ORG_TYPE: DT_ORG_TYPE,
            list: null,
            list1: null,
            theight: 0,
            stheight: 0,//右子表高度
            cols: [],
            objectCode: '',
            objectName: '',
            edlist: [],
            total: 0,
            total1: 0,
            qxlb: null,
            listLoading: true,
            url: undefined,
            tableKey: [0, 1],//表格索引，虚拟dom渲染表格时使用
            sourceMap: sourceMap,
            listQuery: {
                currentPage: 1,
                pageSize: 15,
                page: 1,
                employeeCode: undefined,
                employeeName: undefined,
                domainScope: undefined,
                orgCode: undefined
            },
            listQuery1: {
                // currentPage: 1,
                // pageSize: 10,
                // page: 1,
                accessTypeCode: undefined,
                metaDataCode: undefined,
                metaDataType: undefined
            },
            //根据权限类型获取数据
            getAuthoData: {
                url: undefined,
                endpointGroup: undefined,
                endpointCode: undefined,
                conditions: undefined
            },
            temp: {
                customerCode: undefined,
                customerName: undefined,
                orgCode: undefined,
                warehouseCode: undefined,
                purchaseName: undefined
            },
            dto: {
                accessType: undefined,
                metaDataCode: undefined,

                metaDataDTOList: undefined
            },
            lb: {
                conditionColumn: undefined,
                conditionValue: undefined

            },
            dialogFormVisible: false,
            dialogFormUser: false,
            dialogStatus: '',
            dialogPvVisible: false,
            pvData: [],
            defaultProps: {
                children: 'children',
                label: 'organizationName'
            },
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
        getList () {//查询
            api.selectlists(this.listQuery).then(response => {
                this.list = response.data.list
                this.total = response.data.pages.count
                setTimeout(() => {
                    this.listLoading = false
                }, 1.5 * 100)
            })
        },
        //表格高度计算
        setTableHeight () {
            this.theight = this.$myFun.getSingleTbHeight() + 55;
            this.stheight = this.theight + 40;
        },
        //模板变化
        changeMoudle (val) {
            this.$emit('changeSelect', val)
        },
        getEndpointCode () {
            let metaDataCode = this.listQuery1.metaDataCode;
            let accessTypeCode = this.listQuery1.accessTypeCode;
            this.listQuery1 = {
                currentPage: 1,
                pageSize: 10,
                page: 1,
                accessTypeCode: accessTypeCode,
                metaDataCode: metaDataCode,
                metaDataType: undefined
            }
            if (metaDataCode) {
                this.edlist = this.qxlb.filter(item => {
                    return item.metaDataCode === metaDataCode;
                });
                this.getAuthoData.endpointCode = this.edlist[0].endpointCode;
                this.getAuthoData.endpointGroup = this.edlist[0].endpointGroup;
                if (typeof (this.edlist[0].conditions) !== "undefined") {
                    this.getAuthoData.conditions = JSON.parse(this.edlist[0].conditions);
                }
                let labelList = JSON.parse(this.edlist[0].disFieldsChn);
                let filedList = JSON.parse(this.edlist[0].disFields);
                this.objectCode = filedList["object_code"];
                this.objectName = filedList["object_name"];
                let arrList = new Array();
                arrList.push({ label: "选择", prop: "selection" })
                Object.keys(labelList).forEach(function (key) {
                    let a = { label: labelList[key], prop: key, objectCode: key, objectName: labelList[key] }

                    arrList.push(a)
                });
                this.cols = arrList;
            }
            this.list1 = []
        },
        handleFilterqxlb () { //查询权限类别
            this.listQuery1.metaDataCode = ''
            api.queryqx(this.listQuery1.accessTypeCode).then(response => {
                this.qxlb = response.data
            })
        },
        handleQuerylb () {  //查询元数据列表查询
            let ysq = [];

            this.listQuery1.metaDataType = this.listQuery1.metaDataCode
            if (this.selectlistRow1 && this.listQuery1.accessTypeCode && this.listQuery1.metaDataCode) {
                //查询已授权的数据
                api.querylb(this.selectlistRow1.userName, this.listQuery1.accessTypeCode, this.listQuery1.metaDataType).then(response => {
                    ysq = response.data;
                    api.queryzy(this.getAuthoData.endpointCode).then(response => {  //查询路径        
                        this.getAuthoData.url = response.data.url.replace('/v1', '');
                        // console.log(this.sourceMap[this.getAuthoData.endpointGroup],this.getAuthoData)
                        switch (this.sourceMap[this.getAuthoData.endpointGroup]) {
                            case 1: {
                                api.queryurlkg(this.getAuthoData).then(res => {
                                    console.log(res, '000')
                                    this.list1 = res.data;
                                    this.total1 = res.length;
                                    this.$nextTick(function () { //在渲染之后执行toggleRowSelection方法
                                        this.list1.forEach((val, index) => {
                                            ysq.forEach((val1) => {
                                                if (val[this.objectCode] == val1.objectCode) {
                                                    this.$refs.dd.toggleRowSelection(this.list1[index])
                                                }
                                            })
                                        })
                                    })
                                });
                                break;
                            }
                            case 2: {
                                api.queryurliwms(this.getAuthoData).then(res => {
                                    console.log(res, '12345')
                                    this.list1 = res.data;
                                    this.total1 = res.length;
                                    this.$nextTick(function () { //在渲染之后执行toggleRowSelection方法
                                        this.list1.forEach((val, index) => {
                                            ysq.forEach((val1) => {
                                                if (val[this.objectCode] == val1.objectCode) {
                                                    this.$refs.dd.toggleRowSelection(this.list1[index])
                                                }
                                            })
                                        })
                                    })
                                });
                                break;
                            }
                            case 3: {
                                api.queryurlscc(this.getAuthoData).then(res => {
                                    this.list1 = res.data;
                                    this.total1 = res.length;
                                    this.$nextTick(function () { //在渲染之后执行toggleRowSelection方法
                                        this.list1.forEach((val, index) => {
                                            ysq.forEach((val1) => {
                                                if (val[this.objectCode] == val1.objectCode) {
                                                    this.$refs.dd.toggleRowSelection(this.list1[index])
                                                }
                                            })
                                        })
                                    })
                                });
                                break;
                            }
                            default: {
                                break;
                            }
                        }
                    })
                });

            } else {
                this.$message({
                    title: '警告',
                    message: '请选择权限类型和权限类别',
                    type: 'warning'
                })
            }
        },
        // cx(){  //确认之后复选框选上方法
        //     this.$nextTick(function(){ //在渲染之后执行toggleRowSelection方法
        //     this.list1.forEach((val,index) => {
        //     if(val.isAuthorization=='1'){
        //         this.$refs.dd.toggleRowSelection(this.list1[index]) //判断a的值是不是在b数组里并返回索引
        //     }
        //     })          
        // })              
        // },
        toggleSelection (rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.dd.toggleRowSelection(row);
                });
            } else {
                this.$refs.dd.clearSelection();
            }
        },
        handleConfirm () { //确认方法
            if (this.selectlistRow3) {
                this.dto.metaDataCode = this.listQuery1.metaDataCode
                this.dto.accessType = this.listQuery1.accessTypeCode
                // console.log('aaaaaaa',this.selectlistRow3);
                this.dto.metaDataDTOList = this.selectlistRow3.map(v => {
                    console.log('bbbbbbbb', v, this.objectCode, this.objectName);
                    let objectList = {}
                    objectList.objectName = v[this.objectName];
                    objectList.objectCode = v[this.objectCode]
                    return objectList
                })
                api.confirm(this.selectlistRow1.userName, this.dto).then(() => {
                    this.handleQuerylb()
                    // this.cx()
                    this.$notify({
                        title: '成功',
                        message: '确认成功',
                        type: 'success',
                        duration: 2000
                    })
                })
            } else {
                this.$message({
                    title: '警告',
                    message: '请选择信息',
                    type: 'warning'
                })
            }
        },
        handleFilter () {//搜索
            this.getList()
        },
        resetTemp () {//重置表单Temp
            this.temp = {
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
                remarks: undefined
            }
        },
        handleQuery () {
            this.listQuery.currentPage = 1
            this.getList()
        },

        selectRow1 (val) {// 获取表格1复选框选中
            this.selectlistRow1 = val[val.length - 1]
            if (val.length > 1) {
                this.$refs.tb.clearSelection()
                this.$refs.tb.toggleRowSelection(val.pop())
            }
            if (this.selectlistRow1) { //this.selectlistRow1有值的时候才调查询方法（切换的时候会有一个空值的过程）
                this.handleQuerylb()
            }
            // alert(this.selectlistRow1+'2')
            // console.log(this.selectlistRow1)
        },
        selectRow2 (val) {  //表一单击行选中方法
            this.selectlistRow2 = val
            this.$refs.tb.clearSelection()
            this.$refs.tb.toggleRowSelection(val)//单击行绑定点击事件
            // this.getList1()        
        },
        selectRow3 (val) {
            // console.log('row3',val);
            this.selectlistRow3 = val

        }
    }

};
</script>

<style scoped>
.left-table .filter-items {
    border: solid 1px #d5d8da;
    padding: 8px 10px;
    background-color: white;
    margin-bottom: 10px;
}
</style>
