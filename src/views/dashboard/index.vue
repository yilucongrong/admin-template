<template>
    <div>
        <div>{{getTime}}</div>
        <div>{{getTime}}</div>
        <!-- <el-button size="mini" @click="name">测试</el-button>
        <el-button size="small" @click="name">测试</el-button>
        <el-link href="http://localhost:9528">wms</el-link>
        <el-button @click="name">wms</el-button>
        <el-select v-model="a" clearable>
            <el-option label="1" value="dt_org_function_group" key="dt_org_function_group"></el-option>
            <el-option label="2" value="dt_org_function_rd" key="dt_org_function_rd"></el-option>
            <el-option label="3" value=dt_org_function_produce key="dt_org_function_produce"></el-option>
        </el-select>
        <businessSelect v-model="b" selectType='dt_org_data' filterKey="businessFunction" :filterValue="a" :showField="['organizationCode','organizationName']"></businessSelect>
        <businessSelect v-model="f" selectType='dt_org_data' filterKey="businessFunction" filterValue="dt_org_function_produce" :showField="['organizationCode','organizationName']"></businessSelect>
        <businessSelect v-model="c" selectType='dt_org_code_factory' :showField="['organizationCode','organizationName']"></businessSelect>

        <dictSelect v-model="d" selectType='dt_datarights_type'></dictSelect>
        <dictSelect v-model="e" selectType='dt_dimension'></dictSelect>
        <el-table :data="list" ref="tb"
            border fit  highlight-current-row style="width: 100%;"
            cell-class-name="table-cell" header-cell-class-name="header-cell">
            <el-table-column type="selection" width="30"></el-table-column>
            <el-table-column show-overflow-tooltip width="200" align="left" :label="$t('dict.dictCode')" prop="dictCode"></el-table-column>
            <el-table-column show-overflow-tooltip width="140" align="left" :label="$t('dict.dictName')" prop="dictName"></el-table-column>
        </el-table> -->
    </div>
</template>

<script/>

<style lang="scss" scoped>

</style>