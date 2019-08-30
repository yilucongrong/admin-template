<template>
  <el-row>
    <el-col :span="3" class="left-trees">
      <div class="left-tree">
        <orgSelect class="filter-item" @change="handleChange"
                   :orgType="DT_ORG_TYPE.factory" v-model="orgCode">
        </orgSelect>
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"
                 :expand-on-click-node="false" :highlight-current="true"
                 :default-expand-all="true"
                 :style="contentStyleObj">
        </el-tree>
      </div>
    </el-col>
    <el-col :span="21">
      <right-content @fresh="handleFresh" ref="uploadRef"></right-content>
    </el-col>
  </el-row>

</template>
<script>
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import RightContent from './rightcontent'
import { buildTree }from '@/utils'
import { selectlists as listOrg } from '@/api/system/organization'
import { queryRecords as listWorkCenter } from '@/api/data-base/work-center'
import orgSelect from '@/components/Select/orgSelect.vue'

export default {
  name: 'gzzxzsj',
  components: { RightContent,orgSelect },
  data() {
    return {
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      contentStyleObj: {
        height: ''
      },
      orgCode: '',
      DT_ORG_TYPE: 'dt_org_type_factory'
    }
  },
  created(){
    window.addEventListener('resize', this.getHeight);
    this.getHeight()
    this.initTree()
  },
  methods: {
    initTree() {
      const orgQuery = {
        type: this.DT_ORG_TYPE,
        organizationCode: this.orgCode,
        state: 1
      }
      const org = listOrg(orgQuery)
      const workCenter = listWorkCenter({ orgCode : this.orgCode })
      Promise.all([org, workCenter]).then(([org, workCenter]) => {
        const workCenters = workCenter.data.map(v => {
          return {
            orgCode: v.orgCode,
            parentCode: v.parentCode,
            workCenterCode: v.workCenterCode,
            label: v.workCenterName
          }
        })

        const wcsTree = buildTree(workCenters, 'workCenterCode', 'parentCode', 'children')

        this.data = org.data.map(v => {
          const children = wcsTree.filter(v1 => v1.orgCode == v.organizationCode)
          return {
            label: v.organizationName,
            orgCode: v.organizationCode,
            children: children
          }
        })
      })
    },
    handleFresh(val) {
      if(val) {
        this.initTree()
      }
    },
    handleChange(val) {
      this.orgCode = val
      this.initTree()
      this.$refs.uploadRef.list = []
    },
    handleNodeClick(data) {
      this.$refs.uploadRef.getList(data);
    },
    getHeight(){
      this.contentStyleObj.height = document.body.scrollHeight - 197 + 'px';
    }
  },
  destroyed(){
    window.removeEventListener('resize', this.getHeight)
  }
};
</script>
<style scoped>
  .el-table {
    max-height: 350px;
  }

  .btn, .select-title {
    border: solid 1px #ded8e1;
    border-bottom: 0px;
    border-top: solid 5px #ded8e1;
    padding: 8px 10px;
  }

  .left-trees {
    background-color: #e2e9ef;
  }

  .main-content {
    margin: 20px;
  }

  .select-content {
    border: solid 1px #ded8e1;
    padding: 8px 10px;
  }

  .el-tree {
    margin-top: 20px;
    background-color: #e2e9ef
  }

  .el-form-item {
    margin-bottom: 0px;
  }
</style>
