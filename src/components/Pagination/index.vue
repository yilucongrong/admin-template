<template>
    <div :class="{'hidden':hidden}"
         class="pagination-container">
        <el-pagination :current-page.sync="currentPage"
                       :page-size.sync="pageSize"
                       :layout="layout"
                       :page-sizes="pageSizes"
                       :hide-on-single-page="hideone"
                       :size="size"
                       :total="total"
                       v-bind="$attrs"
                       :pager-count="pageCount"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange" />
    </div>
</template>

<script>
export default {
    name: "Pagination",
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
        //每页条数，默认为15条
        size: {
            type: Number,
            default: 15
        },
        //可选每页数量,不同页面配置不同的可选项，通过size属性来设置
        pageSizes: {
            type: Array,
            default () {
                if (this.size === 10) {
                    return [10, 15, 20, 30, 50];
                } else {
                    return [15, 20, 30, 50];
                }

            }
        },
        layout: {
            type: String,
            default: "total, sizes, prev, pager, next, jumper"
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
        // pageSize: {
        //     type: Number,
        //     default: 15
        // }
    },
    computed: {
        currentPage: {
            get () {
                return this.page;
            },
            set (val) {
                this.$emit("update:page", val);
            }
        },
        pageSize: {
            get () {
                return this.size;
            },
            set (val) {
                this.$emit("update:limit", val);
            }
        }
    },
    methods: {
        handleSizeChange (val) {
            console.log(`每页条数：${val}`, '每页数量');

            this.$emit("pagination", { page: this.currentPage, size: val });
        },
        handleCurrentChange (val) {
            console.log(`每页条数：${this.pageSize}`, '当前页');
            this.$emit("pagination", { page: val, size: this.pageSize });
        }
    }
};
</script>


