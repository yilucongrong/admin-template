<template>
    <div id="app">
        <router-view v-if="isRouterAlive" />
    </div>
</template>
<script>
export default {
    name: "App",
    // 原理：允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效
    // 在App.vue,声明reload方法，控制router-view的显示或隐藏，从而控制页面的再次加载。
    provide () {
        return {
            reload: this.reload
        };
    },
    data () {
        return {
            isRouterAlive: true
        };
    },
    methods: {
        reload () {
            this.isRouterAlive = false;
            this.$nextTick(function () {
                this.isRouterAlive = true;
            });
        }
    }
};
</script>
<style lang="scss">
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
body .el-table th.gutter {
    display: table-cell !important;
}
</style>
