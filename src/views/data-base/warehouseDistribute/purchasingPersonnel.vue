<template>
  <el-row>
      <el-col :span="24">
        <div class="app-container  popup">
          <div class="filter-container">
            <div class="main-header">
                
                <div class="select-content">
                  <el-input size="small" :placeholder="$t('warehouseDistribute.employeeCode')" v-model="listQuery.employeeCode" class="filter-item" @keyup.enter.native="handleFilter"/>
                  <el-input size="small" :placeholder="$t('warehouseDistribute.employeeName')" v-model="listQuery.employeeName" class="filter-item" @keyup.enter.native="handleFilter"/>
                  <el-button type="primary" size="small" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
                </div>
            </div>
            <div class="main-body">
              <el-table
                v-loading="listLoading"
                :key="tableKey"
                :data="list"
                border
                fit
                height="300px"
                highlight-current-row
                style="width: 100%;"
                @selection-change='selectRow' ref='dd' size="mini" cell-class-name="table-cell" header-cell-class-name="header-cell">
                <el-table-column type="selection" width="30">
                </el-table-column>
                <el-table-column show-overflow-tooltip :label="$t('warehouseDistribute.employeeCode')" prop="employeeCode" align="center" width="120">
                  <template slot-scope="scope">
                    <span>{{ scope.row.employeeCode }}</span>
                  </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip :label="$t('warehouseDistribute.employeeName')" width="80" align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.row.employeeName }}</span>
                  </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip :label="$t('warehouseDistribute.organizationId')" min-width="80">
                  <template slot-scope="scope">
                    <span>{{ scope.row.organizationId }}</span>
                  </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip :label="$t('warehouseDistribute.sexFilter')" width="60" align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.row.sex|sexFilter }}</span>
                  </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip :label="$t('warehouseDistribute.mobile')" width="120" align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.row.mobile }}</span>
                  </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip :label="$t('warehouseDistribute.officePhone')" width="120">
                  <template slot-scope="scope">
                    <span>{{ scope.row.officePhone }}</span>
                  </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip :label="$t('warehouseDistribute.email')" align="center" width="180">
                  <template slot-scope="scope">
                    <span>{{ scope.row.email }}</span>
                  </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip :label="$t('warehouseDistribute.stateFilter')" width="80">
                  <template slot-scope="scope">
                    <span>{{ scope.row.state|stateFilter }}</span>
                  </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip :label="$t('warehouseDistribute.birthday')" class-name="status-col" width="120">
                  <template slot-scope="scope">
                    <span>{{ scope.row.birthday }}</span>
                  </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip :label="$t('warehouseDistribute.hireDate')" class-name="status-col" width="180">
                  <template slot-scope="scope">
                    <span>{{ scope.row.hireDate }}</span>
                  </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip :label="$t('warehouseDistribute.idNumber')" class-name="status-col" width="180">
                  <template slot-scope="scope">
                    <span>{{ scope.row.idNumber }}</span>
                  </template>
                </el-table-column>
                <!-- <el-table-column show-overflow-tooltip label="签名图片" class-name="status-col" width="80">
                  <template slot-scope="scope">
                    <span>{{ scope.row.business }}</span>
                  </template>
                </el-table-column> -->
                <el-table-column show-overflow-tooltip :label="$t('warehouseDistribute.address')" class-name="status-col" width="120">
                  <template slot-scope="scope">
                    <span>{{ scope.row.address }}</span>
                  </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip :label="$t('warehouseDistribute.remark')" class-name="status-col" width="120">
                  <template slot-scope="scope">
                    <span>{{ scope.row.remark }}</span>
                  </template>
                </el-table-column>
              </el-table>
              <pagination v-show="total>0" :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize" @pagination="handleFilter" />
            </div>
          </div>
        </div>
      </el-col>
  </el-row>
  
</template>
<script>
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { selectlists } from '@/api/system/employees'
// import waves from '@/directive/waves' // Waves directive
// import { stateFilter,sexFilter,organizationTypes} from '@/filters'
// import { validatePhone,validateTelphone,validateIdNo,validateEMail} from '@/utils/validate'
export default {
  name: 'ComplexTable',
  components: { Pagination },
//   directives: { waves },
    data() {
      return {
        tableKey: 0,
        list: [
        ],
        listuser:[],
        total: 0,
        listLoading: true,
        listQuery: {
          currentPage: 1,
          pageSize: 10,
          page: 1,
         
        }
      };
    },
    created(){
        this.handleFilter();
    },
    computed: {
      organizationId: {
          get: function () {
            return this.organizationId; //获取的时候直接获取值
          },
          set: function (listQuery) {
            this.organizationId = listQuery.organizationName; //设置的时候变为大写
          }
        }
    },

    methods: {
        handleFilter() {//查询组织列表
          this.listQuery.page = 1
          this.listLoading = true
          selectlists(this.listQuery).then(response => {
            this.list = response.data.list
            this.total = response.data.pages.count
            // Just to simulate the time of the request
            setTimeout(() => {
              this.listLoading = false
            }, 1.5 * 100)
          })
        },
        selectRow(val){//备选项选中行
            this.$emit('handSelectPersonnelsRows' ,val)
        },
        qx1(){
          this.$refs.dd.clearSelection()
        }
    } 
        
        
        
       
        
        
        
  }
</script>
<style scoped>
    .el-table{
      max-height: 350px;
    }
    .btn,.select-title{
      border: solid 1px #ded8e1;
      border-bottom: 0px;
      border-top: solid 5px #ded8e1;
      padding:8px 10px;
    }
    .left-trees{
      background-color: #e2e9ef;
    }
    .main-content{
      margin: 20px;
    }
    .select-content{
      border: solid 1px #ded8e1;
      padding: 9px 10px;
    }
    .el-tree{
      margin-top: 20px;
      background-color: #e2e9ef
    }
</style>