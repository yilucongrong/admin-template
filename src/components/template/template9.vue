// 表格单元格合并
<template>
    <div>
        <div class="app-container">
            <div class="filter-container">
                <div class="filter-items">
                    <el-input @keyup.enter.native="handleQuery"
                              :placeholder="$t('roleManagement.roleCode')"
                              class="filter-item"
                              size="small"
                              v-model="listQuery.roleCode"></el-input>
                    <el-input @keyup.enter.native="handleQuery"
                              :placeholder="$t('roleManagement.roleName')"
                              class="filter-item"
                              size="small"
                              v-model="listQuery.roleName"></el-input>
                    <changeModuleSelect @changeMoudle="changeMoudle"></changeModuleSelect>
                    <el-button class="filter-item-btn"
                               type="primary"
                               size="small"
                               icon="el-icon-search"
                               @click="handleQuery">{{ $t('btn.search') }}</el-button>
                </div>
            </div>
            <div class="table-container">
                <div class="oprate_btn">
                    <el-button size="small"
                               class="filter-item"
                               type="primary"
                               icon="el-icon-plus"
                               @click="handleCreate">{{ $t('btn.add') }}</el-button>
                    <el-button size="small"
                               class="filter-item"
                               type="primary"
                               icon="el-icon-edit"
                               @click="handleUpdate">{{ $t('btn.edit') }}</el-button>
                    <el-button size="small"
                               class="filter-item"
                               type="primary"
                               icon="el-icon-delete"
                               @click="handleDelete">{{ $t('btn.delete') }}</el-button>
                    <el-button size="small"
                               class="filter-item"
                               type="primary"
                               icon="el-icon-edit-outline"
                               @click="handleCreate">{{ $t('userManagement.functionAuthorization') }}</el-button>
                    <el-button size="small"
                               class="filter-item"
                               type="primary"
                               icon="el-icon-edit-outline"
                               @click="handleCreate">{{ $t('userManagement.userAuthorization') }}</el-button>
                </div>
                <el-table :data="tableData"
                          :height="theight"
                          border
                          fit
                          highlight-current-row
                          cell-class-name="table-cell"
                          header-cell-class-name="header-cell"
                          @selection-change="selectChange"
                          :span-method="objectSpanMethod"
                          ref="tb">

                    <el-table-column type="selection"></el-table-column>
                    <el-table-column label="个数"
                                     prop="num">
                    </el-table-column>

                    <el-table-column label="商品 ID"
                                     prop="id">
                    </el-table-column>
                    <el-table-column label="商品名称"
                                     prop="name">
                    </el-table-column>
                    <el-table-column label="描述"
                                     prop="desc">
                    </el-table-column>
                </el-table>
                <pagination :total="total"
                            :size="15"
                            :page.sync="listQuery.currentPage"
                            :limit.sync="listQuery.pageSize"
                            @pagination="getList" />
            </div>
        </div>
    </div>

</template>

<script>
import changeModuleSelect from '@/components/template/changeMoudleSelect'
import global_valfn from '@/utils/global_valfn'
import Pagination from "@/components/Pagination";
export default {
    name: "zdmb",
    components: { changeModuleSelect, Pagination },
    data () {
        return {
            spanArr: [],
            modalnum: null,//模板编号，非模板页面可删
            theight: 0,//表格高度
            isSingle: false,//表格是否单选 点击各按钮根据流程逻辑控制单多选
            currentSelectedRow: null,//当前选中的行
            selectedRows: [],//多选时选中的所有行
            tableData: null,
            total: 0,
            listQuery: {
                currentPage: 0,
                pageSize: 15,
            }
        }
    },
    created () { },
    mounted () {
        this.setTableHeight();
        //表格高度自适应
        window.onresize = () => {
            this.setTableHeight()
        };
        this.getList();
        this.getSpanArr(this.tableData);
    },
    methods: {
        //模板切换事件，非模板页面可删
        changeMoudle (val) {
            this.$emit('changeSelect', val)
        },
        //表格高度计算
        setTableHeight () {
            this.theight = global_valfn.getSingleTbHeight();
        },
        //获取表格数据
        getList () {
            this.tableData = [{
                id: '0',
                name: '第一张专辑',
                category: '专辑',
                desc: '第一张创作专辑',
                address: '相信音乐',
                shop: '相信音乐国际股份有限公司',
                num: 5
            }, {
                id: '1',
                name: '第二张专辑',
                category: '专辑',
                desc: '爱情万岁',
                address: '相信音乐',
                shop: '相信音乐国际股份有限公司',
                num: 5
            }, {
                id: '2',
                name: '第三张专辑',
                category: '专辑',
                desc: '人生海海',
                address: '相信音乐',
                shop: '相信音乐国际股份有限公司',
                num: 55
            }, {
                id: '3',
                name: '第四张专辑',
                category: '专辑',
                desc: '时光机',
                address: '相信音乐',
                shop: '相信音乐国际股份有限公司',
                num: 55
            }, {
                id: '4',
                name: '第五张专辑',
                category: '专辑',
                desc: '神的孩子都在跳舞',
                address: '相信音乐',
                shop: '相信音乐国际股份有限公司',
                num: 55
            }, {
                id: '5',
                name: '第六张专辑',
                category: '专辑',
                desc: '为爱而生',
                address: '相信音乐',
                shop: '相信音乐国际股份有限公司',
                num: 555
            }, {
                id: '6',
                name: '第七张专辑',
                category: '专辑',
                desc: '后青春期的诗',
                address: '相信音乐',
                shop: '相信音乐国际股份有限公司',
                num: 556
            }, {
                id: '7',
                name: '第八张专辑',
                category: '专辑',
                desc: '第二人生',
                address: '相信音乐',
                shop: '相信音乐国际股份有限公司',
                num: 557
            }, {
                id: '8',
                name: '第九张专辑',
                category: '专辑',
                desc: '自传',
                address: '相信音乐',
                shop: '相信音乐国际股份有限公司',
                num: 55
            }
            ]
        },
        //表格查询
        handleQuery () {
            this.listQuery.currentPage = 1;
            this.getList();
        },
        //表格显示条数变化
        handleSizeChange (val) {
            this.listQuery.pageSize = val;
            this.getList();
        },
        //表格当前页变化
        handleCurrentChange (val) {
            this.listQuery.currentPage = val;
            this.getList();
        },
        handleCreate () {
            //新增按钮单击事件方法
        },
        handleUpdate () {
            //编辑按钮单击事件方法
        },
        handleDelete () {
            //删除按钮单击事件方法
        },
        // 表格选择框选中 注:参数为选中的所有行的数组
        selectChange (val) {
            console.log(val, 11111);
            if (this.isSingle) {
                if (val.length > 1) {
                    this.$refs.tb.clearSelection(); //清除其他行的选中
                    this.$refs.tb.toggleRowSelection(val[val.length - 1], "selected"); //单击行绑定点击事件
                } else if (val.length === 1) {
                    this.selectSameProp(this.tableData, "num", val);
                    this.currentSelectedRow = val[val.length - 1]
                }
            } else {
                // this.currentSelectedRow = val[val.length - 1]
                this.selectSameProp(this.tableData, "num", val)
            }
        },
        //选中num相同的
        selectSameProp (data, prop, val) {
            this.selectedRows = [];
            for (let j = 0; j < val.length; j++) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i][prop] === val[j][prop]) {
                        this.selectedRows.push(data[i]);
                    }
                }
            }
            console.log(this.selectedRows);
        },
        //点击表格某一行
        rowClick (val) {
            if (this.isSingle) {
                this.$refs.tb.clearSelection(); //清除其他行的选中
            }
            this.$refs.tb.toggleRowSelection(val, "selected"); //单击行绑定点击事件
        },
        getSpanArr (data) {
            data.sort(this.compareObj("num"));
            for (var i = 0; i < data.length; i++) {
                if (i === 0) {
                    this.spanArr.push(1);
                    this.pos = 0
                } else {
                    // 判断当前元素与上一个元素是否相同
                    if (data[i].num === data[i - 1].num) {
                        this.spanArr[this.pos] += 1;
                        this.spanArr.push(0);
                    } else {
                        this.spanArr.push(1);
                        this.pos = i;
                    }
                }
            }
        },
        compareObj (prop) {
            return function (obj1, obj2) {
                let val1 = obj1[prop];
                let val2 = obj2[prop]; if (val1 < val2) {
                    return -1;
                } else if (val1 > val2) {
                    return 1;
                } else {
                    return 0;
                }
            }
        },
        objectSpanMethod ({ rowIndex, columnIndex }) {
            if (columnIndex === 0) {
                const _row = this.spanArr[rowIndex];
                const _col = _row > 0 ? 1 : 0;
                // console.log(_row);
                // console.log(_col);
                return {
                    rowspan: _row,
                    colspan: _col
                }
            }
            if (columnIndex === 1) {
                const _row = this.spanArr[rowIndex];
                const _col = _row > 0 ? 1 : 0;
                return {
                    rowspan: _row,
                    colspan: _col
                }
            }
        }
    }


};
</script>


    