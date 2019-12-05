<template>
    <div :class="{'hidden':hidden}"
         class="pagination-container">
        <el-pagination :current-page.sync="currentPage"
                       :page-size.sync="pageSize"
                       :layout="layout"
                       :page-sizes="pageSizes"
                       :hide-on-single-page="hideone"
                       :total="total"
                       v-bind="$attrs"
                       :pager-count="pageCount"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange" />
    </div>
</template>

<script>
export default {
    name: 'Pagination',
    props: {
        hideone: {
            type: Boolean,
            default: false
        },
        pageCount: {
            type: Number,
            default: 5
        },
        //总数
        total: {
            required: true,
            type: Number
        },
        //当前页
        page: {
            type: Number,
            default: 1
        },
        //可选每页数量,不同页面配置不同的可选项，通过size属性来设置
        layout: {
            type: String,
            default: 'total, sizes, prev, pager, next, jumper'
        },
        background: {
            type: Boolean,
            default: true
        },
        autoScroll: {
            type: Boolean,
            default: true
        },
        hidden: {
            type: Boolean,
            default: false
        },
        limit: {
            type: Number,
            default: 15
        }
    },
    data () {
        return {
            pageSizes: [15, 20, 30, 50]
        }
    },
    computed: {
        currentPage: {
            get () {
                return this.page
            },
            set (val) {
                this.$emit('update:page', val)
            }
        },
        pageSize: {
            get () {
                return this.limit
            },
            set (val) {
                this.$emit('update:limit', val)
            }
        }
    },
    mounted () {
        this.setPagesizes();
    },
    methods: {
        handleSizeChange (val) {
            this.$emit('pagination', { page: this.currentPage, size: val })
        },
        handleCurrentChange (val) {
            this.$emit("pagination", { page: val, size: this.pageSize });
        },
        setPagesizes () {
            if (this.limit === 10) {
                this.pageSizes = [10, 15, 20, 30, 50];
            } else {
                this.pageSizes = [15, 20, 30, 50];
            }
        }
    }
}
</script>
