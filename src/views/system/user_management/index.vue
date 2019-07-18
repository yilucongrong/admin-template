<template>
  <el-row>
      <el-col :span="3" class="left-trees" >
        <div class="left-tree">
            <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick" :style="contentStyleObj"></el-tree>
        </div>
      </el-col>
      <el-col :span="21">
        <div class="app-container">
          <div class="filter-container">
            <div class="main-header">
                
                <div class="select-content">
                  <el-input size="small" :placeholder="$t('userManagement.userName')" v-model="listQuery.userName" class="filter-item" @keyup.enter.native="handleFilter"/>
                  <el-input size="small" :placeholder="$t('userManagement.realName')" v-model="listQuery.realName" class="filter-item" @keyup.enter.native="handleFilter"/>
                  <el-button type="primary" size="small" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
                </div>
            </div>
            <div class="main-body">
              <div class="btn">
                <el-button size="small" class="filter-item" type="primary" icon="el-icon-edit-outline" @click="handleUser">{{$t('userManagement.roleAuthorization')}}</el-button>
                <!-- <el-button size="small" class="filter-item" type="primary" icon="el-icon-edit-outline" @click="handleFun">{{ $t('userManagement.functionAuthorization') }}</el-button> -->
              </div>
              <el-table
                v-loading="listLoading"
                :key="tableKey"
                :data="list"
                border
                fit
                height="315"
                highlight-current-row
                style="width: 100%;" cell-class-name="table-cell" header-cell-class-name="header-cell"
                @selection-change='selectRow' @row-click="rowClick"  ref="tb_a">
                <el-table-column type="selection" width="30" align="center">
                </el-table-column>
                <el-table-column show-overflow-tooltip :label="$t('userManagement.userName')" prop="userName"  align="center" min-width="120">
                  <template slot-scope="scope">
                    <span>{{ scope.row.userName }}</span>
                  </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip :label="$t('userManagement.realName')" min-width="80" align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.row.realName }}</span>
                  </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip :label="$t('userManagement.lastIp')" min-width="120">
                  <template slot-scope="scope">
                    <span>{{ scope.row.lastIp }}</span>
                  </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip :label="$t('userManagement.state')" min-width="60" align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.row.state }}</span>
                  </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip :label="$t('userManagement.isLog')" min-width="120" align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.row.isLog }}</span>
                  </template>
                </el-table-column>
              </el-table>
              <pagination v-show="total>0" :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.size" @pagination="getList" />
            </div>
          </div>
           <!-- 用户维护弹窗 -->
          <el-dialog custom-class="dialog-custom" :title="$t('userManagement.roleAuthorization')" :visible.sync="dialogFormUser" :close-on-click-modal="false">
            <el-tabs v-model="activeName2" type="card"  @tab-click="handleTabClick">
              <el-tab-pane :label="$t('userManagement.unrelatedRoles')" name="first">
                  <div>
                      <div class="main-header">
                        <div class="select-content">
                          <el-input size="small" :placeholder="$t('userManagement.roleName')" v-model="listQuery1.roleName" class="filter-item" @keyup.enter.native="handsearchsole"/>
                          <el-select v-if="listQuery1.domainScope" size="small" v-model="listQuery1.domainScope" @keyup.enter.native="handleFilter" :placeholder="$t('userManagement.domainScope')" clearable disabled>
                            <el-option v-for="item in dt_domainScope_type" :key="item.dictItemKey" :label="item.dictItemValue"
                                        :value="item.dictItemKey">
                            </el-option>
                          </el-select>
                          <el-select v-else size="small" v-model="listQuery1.domainScope" @keyup.enter.native="handleFilter" :placeholder="$t('userManagement.domainScope')" clearable>
                            <el-option v-for="item in dt_domainScope_type" :key="item.dictItemKey" :label="item.dictItemValue"
                                        :value="item.dictItemKey">
                            </el-option>
                          </el-select>
                          <el-button size="small" class="filter-item" type="primary" icon="el-icon-search" @click="handsearchsole">{{ $t('table.search') }}</el-button>
                          <el-button size="small" class="filter-item" type="primary" icon="el-icon-select" @click="addrole">{{ $t('table.empower') }}</el-button> 
                        </div>
                      </div>
                      <el-table v-loading="listLoading" :key="tableKey" :data="listunrole" border fit height="350px" highlight-current-row
                          style="width: 100%;"
                          @selection-change='selectRowUser'>
                        <el-table-column type="selection" width="30" align="center">
                        </el-table-column>
                        <el-table-column show-overflow-tooltip :label="$t('userManagement.roleCode')" width="120" align="center">
                          <template slot-scope="scope">
                            <span>{{ scope.row.roleCode }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column show-overflow-tooltip :label="$t('userManagement.roleName')" width="120" >
                          <template slot-scope="scope">
                            <span>{{ scope.row.roleName }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column show-overflow-tooltip :label="$t('userManagement.roleType')" width="120" align="center">
                          <template slot-scope="scope">
                            <span>{{ scope.row.roleType }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column show-overflow-tooltip :label="$t('userManagement.domainScope')" width="120" align="center">
                          <template slot-scope="scope">
                            <span>{{ scope.row.domainScope }}</span>
                          </template>
                        </el-table-column>
                      </el-table>
                      <pagination v-show="total1>0" :total="total1" :page.sync="listQuery1.currentPage" :limit.sync="listQuery1.pageSize" @pagination="getListUnelation" />
                  </div>
              </el-tab-pane>
              <el-tab-pane :label="$t('userManagement.associatedRoles')" name="second">
                  <div>
                      <div class="main-header">
                        <div class="select-content">
                          <el-button size="small" class="filter-item" type="primary" icon="el-icon-select" @click="deleRole">{{ $t('table.delete') }}</el-button> 
                        </div>
                      </div>
                      <el-table v-loading="listLoading" :key="tableKey" :data="listrole" border fit height="350px" highlight-current-row
                          style="width: 100%;"
                          @selection-change='selectRowUser1'>
                        <el-table-column type="selection" width="30">
                        </el-table-column>
                        <el-table-column show-overflow-tooltip :label="$t('userManagement.roleCode')" width="120" align="center">
                          <template slot-scope="scope">
                            <span>{{ scope.row.roleCode }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column show-overflow-tooltip :label="$t('userManagement.roleName')" width="120" >
                          <template slot-scope="scope">
                            <span>{{ scope.row.roleName }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column show-overflow-tooltip :label="$t('userManagement.roleType')" width="120" align="center">
                          <template slot-scope="scope">
                            <span>{{ scope.row.roleType }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column show-overflow-tooltip :label="$t('userManagement.domainScope')" width="120" align="center">
                          <template slot-scope="scope">
                            <span>{{ scope.row.domainScope }}</span>
                          </template>
                        </el-table-column>
                      </el-table>
                      <pagination v-show="total2>0" :total="total2" :page.sync="listQuery2.currentPage" :limit.sync="listQuery2.pageSize" @pagination="getListRelation" />
                  </div>
              </el-tab-pane>
              
            </el-tabs>
            
          </el-dialog>
          <el-dialog :close-on-click-modal="false" custom-class="dialog-custom" :visible.sync="dialogPvVisible" title="Reading statistics">
            <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
              <el-table-column show-overflow-tooltip prop="key" label="Channel"/>
              <el-table-column show-overflow-tooltip prop="pv" label="Pv"/>
            </el-table>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="dialogPvVisible = false">{{ $t('table.confirm') }}</el-button>
            </span>
          </el-dialog>
              <!--功能授权弹窗 -->
          <el-dialog :close-on-click-modal="false" custom-class="dialog-custom"  :title="$t('userManagement.functionAuthorization')" :visible.sync="dialogFormVisible1" @close="handleClose">
            <el-tree :data="data1" :props="defaultProps1" show-checkbox node-key="rowId" ref="tree" @check-change="handleCheckChange"></el-tree>
            <div slot="footer" class="dialog-footer">
              <el-button @click="cancel()">{{$t('table.cancel')}}</el-button>
              <el-button type="primary" @click="create1">{{$t('table.confirm')}}</el-button>
            </div>
          </el-dialog>
        </div>
      </el-col>
  </el-row>
  
</template>
<script>
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { selectlists,authorizationfun,authorizationrole,selectuser,relation,unrelation } from '@/api/system/user'
import { parseTime } from '@/utils'
import { selecttree} from '@/api/system/organization'
import { selectrole,addMenu,selectRecord} from '@/api/system/role'
import { loadtreeDates} from '@/utils/treeDate'
import {getDomainName} from '@/utils/auth'
import {mapState} from 'vuex'

export default {
  name: 'ComplexTable',
  components: { Pagination },
    data() {
      return {
        data1: [],
        tableKey: 0,
        list: [
        ],
        listunrole:[],
        listrole:[],
        treeData:[],
        total: 0,
        total1: 0,
        total2: 0,
        activeName2: 'first',
        listLoading: true,
        listQuery: {
          orgId:'',
          currentPage: 1,
          pageSize: 10,
          page: 1
        },
        listQuery1: {
          currentPage: 1,
          pageSize: 10,
          page: 1,
          domainScope:getDomainName().toUpperCase()
        },
        listQuery2: {
          currentPage: 1,
          pageSize: 10,
          page: 1,
        },
        readonly:false,
        temp: {
          
        },
        dialogFormVisible: false,
        dialogFormVisible1: false,
        dialogFormUser: false,
        dialogStatus: '',
        rules: {
          realName: [
            { required: true, message: '真实姓名不能为空', trigger: 'blur' },
            { max: 100, message: this.$t('validate.max32'), trigger: 'blur' },
            { type:'string', message:'请输入字符串 "张三" ',trigger: 'blur'}
          ],
          userName: [
            { required: true, message: '用户名称不能为空', trigger: 'blur' },
            { max: 100, message: this.$t('validate.max32'), trigger: 'blur' }
          ],
        },
        dialogPvVisible: false,
        pvData: [],
        defaultProps: {
          children: 'children',
          label: 'organizationName'
        },
        defaultProps1: {
          children: 'children',
          label: 'catalogName'
        },
        contentStyleObj:{
　　　　　　height:''
　　　　}
      };
    },
    computed:{
        ...mapState({
            dt_domainScope_type:state=>state.dict.dt_domainScope_type,
        })
    },
    mounted(){
        this.$store.dispatch('dict/getDicData',['dt_domainScope_type']);
        this.getList();
    },
    created(){
        window.addEventListener('resize', this.getHeight);
        this.getHeight();
        
    },
    methods: {
        handleClose() {
          this.resetTemp()
        },
        cancel() {//弹窗取消按钮
          this.dialogFormVisible = false
          this.dialogFormVisible1 = false
        },
        getHeight(){
            this.contentStyleObj.height=document.body.scrollHeight-110+'px';
        },
        destroyed(){
            window.removeEventListener('resize', this.getHeight)
        },
        treeGetList() {//获取树数据
          this.listLoading = true
          selectlists(this.listQuery).then(response => {
            this.list = response.data.list
            this.total = response.data.pages.count
            setTimeout(() => {
              this.listLoading = false
            }, 1.5 * 100)
          })
        },
        getList() {//查询数据
          this.listLoading = true
          selectlists(this.listQuery).then(response => {
            this.list = response.data.list
            this.total = response.data.pages.count
            setTimeout(() => {
              this.listLoading = false
            }, 1.5 * 100)
          }),
          selecttree().then(response => {//获取树数据
            this.treeData=loadtreeDates(response.data)
              setTimeout(() => {
                this.listLoading = false
              }, 1.5 * 100)
          })
        },
        getListRelation(){//查询关联的数据
          this.listQuery2.type=1
          relation(this.selectlistRow[0].userName,this.listQuery2).then(response =>{
              this.listrole = response.data.list
              this.total2 = response.data.pages.count
              })
        },
        getListUnelation(){//查询未关联的数据
          this.listQuery1.type=2
          console.log(this.selectlistRow[0])
          this.listQuery1.userName=this.selectlistRow[0].realName
          
          relation(this.selectlistRow[0].userName,this.listQuery1).then(response =>{
              this.listunrole = response.data.list
              this.total1 = response.data.pages.count
            })
        },
        handleTabClick(tab, event){//选项卡切换
          if(tab.name=="first"){
            this.getListUnelation()
          }else{
            this.getListRelation()
          }
         
        },
        handleFilter() {
          this.listQuery.page = 1
          this.listLoading = true
          //查询组织列表
          selectlists(this.listQuery).then(response => {
            this.list = response.data.list
            this.total = response.data.pages.count
            setTimeout(() => {
              this.listLoading = false
            }, 1.5 * 100)
          })
        },
        resetTemp() {
          this.temp = {
            employeeCode: undefined,
            employeeName:undefined,
            sex:1,
            organizationId:undefined,
            state:'启用',
            mobile:undefined,
            email:undefined,
            officePhone:undefined,
            birthday:undefined,
            hireDate:undefined,
            idNumber:undefined,
            address:undefined,
            remarks:undefined,
            isLog:'是'
          }
        },
         //角色维护
        handleUser() {
            if(this.selectlistRow && this.selectlistRow.length==1){
                  this.getListUnelation()
                  this.dialogFormUser = true
              }else{
                this.$message({
                      title: '警告',
                      message: '请选择一条用户信息',
                      type: 'warning'
                    })
            }
          
        },
        deleRole(){//删除关联角色
          let fun='REMOVE'
          if(this.selectlistRowUser1 && this.selectlistRowUser1.length>0){
              let roleCodes=[]
            for(let i=0;i<this.selectlistRowUser1.length;i++){
                roleCodes[i]=this.selectlistRowUser1[i].roleCode
            }
            authorizationrole(this.selectlistRow[0].userName,roleCodes,fun).then(response =>{
                  this.getListRelation()
            })
            this.dialogFormUser = true
          }else{
              this.$message({
                    title: '警告',
                    message: '请选择一条角色信息',
                    type: 'warning'
                  })
          }
        },
        // handleFun() {//功能授权按钮单击事件方法
        //   // if(this.selectlistRow && this.selectlistRow.length==1){
        //   //   selectRecord(this.listQuery).then(res => {
        //   //   this.dialogStatus = 'create'
        //   //   this.dialogFormVisible1 = true
        //   //   this.data1=loadtreeDate(res.data.list)
        //   // })
        //   // }else{
        //   //   this.$message({
        //   //     title: '警告',
        //   //     message: '请选择一条信息',
        //   //     type: 'warning'
        //   //   })
        //   // }
        // },
        handleCheckChange() {
          return this.$refs.tree.getCheckedNodes().concat(this.$refs.tree.getHalfCheckedNodes())//获取选中和半选中状态下的数据
        },
        create1() {//功能授权弹窗确定按钮单击事件方法
          // let catalogs=this.handleCheckChange().map(function(item,index,array){ 
          //   return item.catalogCode
          // })
          // console.log(catalogs)
          // console.log(this.selectlistRow[0])
          // addMenu(this.selectlistRow[0].roleCode,{catalogCodes:catalogs}).then(res =>{
          //   this.$notify({
          //         title: '成功',
          //         message: '授权成功',
          //         type: 'success',
          //         duration: 2000
          //       })
          // })
                  
          this.dialogFormVisible1 = false
        },
        handsearchsole(){
          selectrole(this.listQuery1).then(response => {
            if(this.activeName2=="first"){
              this.listunrole = response.data.list
              this.total = response.data.pages.count
            }else{
              this.listrole = response.data.list
              this.total = response.data.pages.count
            }
           
              
          })
          // this.handleUser()
        },
        addrole(){//角色授权
          let fun='SAVE'
          if(this.selectlistRowUser && this.selectlistRowUser.length>0){
            let roleCodes=[]
            for(let i=0;i<this.selectlistRowUser.length;i++){
                roleCodes[i]=this.selectlistRowUser[i].roleCode
            }
     
            authorizationrole(this.selectlistRow[0].userName,roleCodes,fun).then(response =>{
                  this.handleUser()
            })
            this.dialogFormUser = true
          }else{
            this.$message({
              title: '警告',
              message: '请选择一条角色信息',
              type: 'warning'
            })
          }
           
        },
        // 获取表格选中时的数据
        selectRow (val) {
            if (val.length > 1) {
                this.$refs.tb_a.clearSelection()//清除其他行的选中
                this.$refs.tb_a.toggleRowSelection(val[val.length-1],'selected')//单击行绑定点击事件
            }else if(val.length===1){
                this.selectlistRow =val
            }
        },
        rowClick(val){
            this.$refs.tb_a.clearSelection()//清除其他行的选中
            this.$refs.tb_a.toggleRowSelection(val)//单击行绑定点击事件
        },
        selectRowUser (val) {
            this.selectlistRowUser = val
        },
        selectRowUser1 (val) {
            this.selectlistRowUser1 = val
        },
        handleNodeClick(data) {//点击树查询
            this.listQuery.orgId=data.rowId;
            this.treeGetList();
        },
        handleDelete() {
            //删除列表
            if(this.selectlistRow && this.selectlistRow.length==1){
              let ids=[]
              this.selectlistRow.forEach((val,index) => {
                ids[index]=val.employeeCode
              })
              deletelist(ids).then(response => {
                this.getList(),
                this.$message({
                    title: '成功',
                    message: '删除成功',
                    type: 'success',
                    duration: 2000
                  })
              })
            }else{
              this.$message({
                  title: '警告',
                  message: '请选择一条信息',
                  type: 'warning'
                })
            }
            
        }
    },
    
  };
</script>
<style scoped>
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
      padding: 8px 10px;
    }
    .el-tree{
      margin-top: 20px;
      background-color: #e2e9ef
    }
</style>