<template>
    <div>
        <el-button size="mini" @click="name">测试</el-button>
        <el-button size="small" @click="name">测试</el-button>
        <el-button @click="name">测试</el-button>
        
        11111111111111111111111111111111111111111111111
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
                }
            }
        },
        methods: {
            name() {
                api.queryRecords(this.listquery).then(res =>{
                    console.log(res)
                })
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>