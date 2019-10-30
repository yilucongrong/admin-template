//table dialog
<template>
    <div>
        <el-dialog class="table_dialog"
                   custom-class="dialog-custom"
                   :title="title"
                   :visible.sync="dialogVisible"
                   v-dialogDrag
                   :close-on-click-modal="false">
            <div class="tab_container">
                <el-tabs v-model="activeName"
                         type="card">
                    <el-tab-pane :label="'备选项'"
                                 name="first">
                        <div class="filter-container border_b_1">
                            <div class="filter-items">
                                <el-input size="small"
                                          :placeholder="'物料编码'"
                                          v-model="listQueryAll.materielCode"
                                          class="filter-item"
                                          @keyup.enter.native="handleQuery" />
                                <el-button type="primary"
                                           size="small"
                                           icon="el-icon-search"
                                           @click="handleFilter1">{{ $t('table.search') }}</el-button>
                            </div>
                        </div>

                        <div class="table-container">
                            <el-table :key="tableKey[0]"
                                      :data="listAll"
                                      ref="tbselect"
                                      border
                                      fit
                                      highlight-current-row
                                      style="width: 100%;"
                                      @selection-change="selectChange"
                                      size="mini"
                                      cell-class-name="table-cell"
                                      header-cell-class-name="header-cell">
                                <el-table-column type="selection"></el-table-column>
                                <el-table-column v-for="item in mainTitle"
                                                 :key="item.id"
                                                 show-overflow-tooltip
                                                 :fixed="item.fixed"
                                                 :type="item.type"
                                                 :width="item.width"
                                                 :align="item.left"
                                                 :label="item.label"
                                                 :prop="item.prop"></el-table-column>
                            </el-table>
                            <pagination class="border_b_1"
                                        v-show="totalAll>0"
                                        :total="totalAll"
                                        :page.sync="listQueryAll.currentPage"
                                        :limit.sync="listQueryAll.pageSize"
                                        @pagination="getList1" />

                            <!--传子表数据时使用 <el-table :key="tableKey[1]"
                                      :data="listSub"
                                      border
                                      fit
                                      highlight-current-row
                                      style="width: 100%;"
                                      size="mini"
                                      cell-class-name="table-cell"
                                      header-cell-class-name="header-cell">
                                <el-table-column v-for="item in subTitle"
                                                 :key="item.id"
                                                 show-overflow-tooltip
                                                 :fixed="item.fixed"
                                                 :type="item.type"
                                                 :width="item.width"
                                                 :align="item.left"
                                                 :label="item.label"
                                                 :prop="item.prop"></el-table-column>
                            </el-table> -->
                        </div>
                    </el-tab-pane>
                    <el-tab-pane v-if="!unMutiple"
                                 :label="'已选项'"
                                 name="second">
                        <div class="table-container">
                            <el-table :key="tableKey[2]"
                                      :data="listSelected"
                                      border
                                      fit
                                      height="250px"
                                      highlight-current-row
                                      style="width: 100%;"
                                      size="mini"
                                      cell-class-name="table-cell"
                                      header-cell-class-name="header-cell">
                                <el-table-column v-for="item in mainTitle"
                                                 :key="item.id"
                                                 show-overflow-tooltip
                                                 :fixed="item.fixed"
                                                 :type="item.type"
                                                 :width="item.width"
                                                 :align="item.left"
                                                 :label="item.label"
                                                 :prop="item.prop"></el-table-column>
                            </el-table>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div slot="footer"
                 class="dialog-footer">
                <el-button type="primary"
                           size="small"
                           @click="dialogConfirm">{{$t('table.confirm')}}</el-button>
            </div>
        </el-dialog>
    </div>

</template>
<script>
import Pagination from '@/components/Pagination' // 分页组件
export default {
    components: { Pagination },
    props: ['unMutiple', 'title'],
    data () {
        return {
            initSelected: null,//初始选中值
            listAll: null,//备选项
            listSelected: null,//已选项
            listSub: null,//备选项子表
            dialogVisible: false,
            totalAll: 0,//总条数
            totalSelected: 0,//选中的条数 暂未使用
            activeName: 'first',//tab激活内容
            tableKey: [0, 1, 2],//表格索引
            selectRowData: null,
            listQueryAll: {
                page: true,
                currentPage: 1,
                pageSize: 10
            },//备选项查询条件
            mainTitle: [
                { width: null, align: 'left', label: 'id', prop: 'id' },
                { width: null, align: 'left', label: '专辑', prop: 'name' },
                { width: null, align: 'left', label: '类型', prop: 'category' },
                { width: null, align: 'left', label: '名称', prop: 'desc' },
                { width: null, align: 'left', label: '地址', prop: 'address' },
                { width: null, align: 'left', label: '店铺', prop: 'shop' }
            ],//备选项主表投数据
            subTitle: [
                { width: null, align: 'left', label: 'id', prop: 'id' },
                { width: null, align: 'left', label: '名字', prop: 'name' },
                { width: null, align: 'left', label: '组合', prop: 'category' },
                { width: null, align: 'left', label: 'talk', prop: 'desc' },
                { width: null, align: 'left', label: '地址', prop: 'address' },
                { width: null, align: 'left', label: '公司', prop: 'shop' },
            ]//备选项从表投数据
        }
    },
    mounted () {//创建时加载备选项
        this.getList1();
        console.log('子 mounted');

    },
    methods: {
        //初始化选中内容
        initSelect (val) {
            console.log('initSelect');
            this.listAll = null;
            this.listSelected = null;
            this.listSelected = val;
            this.getList1();
        },
        //选中某一行
        checked (i) {
            this.$refs.tbselect.toggleRowSelection(this.listAll[i], true);
        },
        handleFilter1 () {//查询备选项
            this.getList1()
        },
        getList1 () {//备选项查询
            this.listAll = [
                { id: '0', name: '第一张专辑', category: '专辑', desc: '第一张创作专辑', address: '相信音乐', shop: '相信音乐国际股份有限公司' },
                { id: '1', name: '第二张专辑', category: '专辑', desc: '爱情万岁', address: '相信音乐', shop: '相信音乐国际股份有限公司' },
                { id: '2', name: '第三张专辑', category: '专辑', desc: '人生海海', address: '相信音乐', shop: '相信音乐国际股份有限公司' },
                { id: '3', name: '第四张专辑', category: '专辑', desc: '时光机', address: '相信音乐', shop: '相信音乐国际股份有限公司' },
                { id: '4', name: '第五张专辑', category: '专辑', desc: '神的孩子都在跳舞', address: '相信音乐', shop: '相信音乐国际股份有限公司' },
                { id: '5', name: '第一张专辑', category: '专辑', desc: '第一张创作专辑', address: '相信音乐', shop: '相信音乐国际股份有限公司' },
                { id: '6', name: '第二张专辑', category: '专辑', desc: '爱情万岁', address: '相信音乐', shop: '相信音乐国际股份有限公司' },
                { id: '7', name: '第三张专辑', category: '专辑', desc: '人生海海', address: '相信音乐', shop: '相信音乐国际股份有限公司' },
                { id: '8', name: '第四张专辑', category: '专辑', desc: '时光机', address: '相信音乐', shop: '相信音乐国际股份有限公司' },
                { id: '9', name: '第五张专辑', category: '专辑', desc: '神的孩子都在跳舞', address: '相信音乐', shop: '相信音乐国际股份有限公司' }
            ];
            this.totalAll = this.listAll.length;

            if (this.listSelected) {
                this.listSelected.forEach(items => {
                    this.listAll.forEach((item, index) => {
                        if (item.id === items.id) {
                            this.$nextTick(function () {
                                this.checked(index)
                            })
                        }
                    })
                })
            }
        },
        getList2 () {//已选项查询
            this.listSelected = this.selectRowData
        },
        //传递子表数据时赋值使用
        getDetail (row) {
            this.listSub = [
                { id: '1', name: '陈信宏', category: 'mayday', desc: '到前面来' + row.id, address: '福建省泉州市', shop: '相信音乐' + row.id, shopId: '1' },
                { id: '2', name: '温尚翊', category: 'mayday', desc: '到前面来' + row.id, address: '台湾省台北市', shop: '相信音乐' + row.id, shopId: '2' }
            ];
        },
        selectChange (val) {
            if (this.unMutiple) {
                this.selectOneRow(val);
            } else {
                this.selectRows(val);
            }
        },
        selectRows (val) {//备选项选中行
            console.log(33333, val);
            this.selectRowData = val
            this.listSelected = this.selectRowData;
            // this.getDetail(val[val.length - 1]);
            // this.$emit('clickRows' ,val,this.listSub);
        },
        selectOneRow (val) {
            let arr = [];
            arr.push(val[val.length - 1])
            this.selectRowData = arr;
            // if (arr[0]) {
            //     this.getDetail(arr[0]);
            // }
            if (val.length > 1) {
                this.$refs.tbselect.clearSelection()
                this.$refs.tbselect.toggleRowSelection(val[val.length - 1], 'selected')
            }
            this.listSelected = this.selectRowData;

        },
        //弹框1点击确定
        dialogConfirm () {
            this.$emit('handleDialogClick', this.listSelected, 1);
            this.dialogVisible = false;
        }
    }
}
</script>
