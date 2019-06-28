<template>
    <div>
        <el-button size="mini" @click="name">测试</el-button>
        <el-button size="small" @click="name">测试</el-button>
        <el-button @click="name">测试</el-button>
        <el-table :data="list" ref="tb"
            border fit height="315" highlight-current-row style="width: 100%;"
            cell-class-name="table-cell" header-cell-class-name="header-cell">
            <el-table-column type="selection" width="30"></el-table-column>
            <el-table-column show-overflow-tooltip width="200" align="left" :label="$t('dict.dictCode')" prop="dictCode"></el-table-column>
            <el-table-column show-overflow-tooltip width="140" align="left" :label="$t('dict.dictName')" prop="dictName"></el-table-column>
        </el-table>
    </div>
</template>

<script>
import * as api from '@/api/data-base/dict.js';
    export default {
        data() {
            return {
                listquery: {
                    currentPage: 1,
                    pageSize: 10,
                },
                list: null,
            }
        },
        created () {
            this.getList();
        },
        methods: {
            getList() {
                api.queryRecords(this.listquery).then(res =>{
                    console.log(res)
                    this.list = res.data.list
                    
                })
            },
            name(){

            }
        },
    }
</script>

<style lang="scss" scoped>

</style>