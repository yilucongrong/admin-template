<template>
    <div :class="{'hidden':hidden}"
         class="pagination-container">
        <el-pagination small
                       :current-page.sync="currentPage"
                       :page-size.sync="pageSize"
                       :layout="layout"
                       :page-sizes="pageSizes"
                       :total="total"
                       v-bind="$attrs"
                       :pager-count="5"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange" />
    </div>
</template>

<script>
export default {
    name: "Pagination",
    props: {
        total: {
            required: true,
            type: Number
        },
        page: {
            type: Number,
            default: 1
        },
        size: {
            type: Number,
            default: 10
        },
        pageSizes: {
            type: Array,
            default() {
                return [10, 20, 30, 50];
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
        }
    },
    computed: {
        currentPage: {
            get() {
                return this.page;
            },
            set(val) {
                this.$emit("update:page", val);
            }
        },
        pageSize: {
            get() {
                return this.size;
            },
            set(val) {
                this.$emit("update:limit", val);
            }
        }
    },
    methods: {
        handleSizeChange(val) {
            this.$emit("pagination", { page: this.currentPage, size: val });
        },
        handleCurrentChange(val) {
            this.$emit("pagination", { page: val, size: this.pageSize });
        }
    }
};
</script>

<style scoped>
.pagination-container {
    background: #fff;
    padding: 10px 10px;
}
.pagination-container.hidden {
    display: none;
}
.el-pagination {
    text-align: right;
}
</style>
