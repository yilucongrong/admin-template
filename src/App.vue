<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
    export default {
    name: 'App'
    }
</script>
<style lang="scss">
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
body .el-table th.gutter{
    display: table-cell!important;
}
body .el-table th,body .el-table td{
    border: 1px solid #d5d8da
}
body .el-table .header-cell{
    border: solid 1px #d5d8da;
    background: #eef2f8;
    color: #474747;
}
.el-pagination--small button, .el-pagination--small span:not([class*=suffix]){
    height: 28px;
    line-height: 28px;
}

</style>
