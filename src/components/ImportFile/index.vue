<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <div class="filter-items">
        <div class="select-element">
          <el-upload
            class="upload-demo"
            ref="upload"
            action=""
            :headers="myHeader"
            :http-request="uploadFile"
            :on-remove="handleRemove"
            :on-change="handleChangeFile"
            :before-upload="beforeUpload"
            :on-exceed="fileExceed"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
            :file-list="fileList"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>
            <el-button class="filter-item" type="primary" size="small"  @click="handleDownload">模板下载</el-button>
            <el-button class="filter-item" type="primary" size="small"  @click="handleExport">导出</el-button>
            <!-- <el-button class="filter-item" type="primary" size="small"  @click="handleClose">关闭</el-button> -->
          </el-upload>
        </div>
      </div>
    </div>
    <el-table :data="listData.data" border fit height="200px" highlight-current-row style="width: 100%;" size="mini" cell-class-name="table-cell" header-cell-class-name="header-cell">
        <el-table-column :key="item.id" v-for="item in listData.title" show-overflow-tooltip :label="item.name" :prop="item.prop" fixed></el-table-column>
    </el-table>
    <pagination :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize" @pagination="getList"/>
  </div>
</template>

<script>
import * as importApi from "@/api/import/index";
import Pagination from "@/components/Pagination";
import orgSelect from "@/components/Select/orgSelect.vue";

export default {
  name: "Customer",
  components: { Pagination, orgSelect},
  props:['modalNo'],//导入弹框名称,模板号
  data(){
    return {
      listData:{},
      listQuery:{
        currentPage:0,
        pageSize:20
      },
      total:0,
      fileList:[],
      files:null,
      uploadurl:''
    }
  },
  mounted(){

  },
  computed: {
    myHeader(){
        return {
            "authToken":window.sessionStorage.getItem('authToken')
        }
    }
  },
  methods: {
    getList(){
      this.listData={
        title:[
          {id:0,name:'行号',prop:'rowId'},
          {id:1,name:'错误信息',prop:'errInfo'},
          {id:2,name:'仓库编码',prop:'warehouseCode'},
          {id:3,name:'区位',prop:'areaCode'},
          {id:4,name:'储位',prop:'locateCode'},
          {id:5,name:'物料编码',prop:'materielCode'},
          {id:6,name:'物料名称',prop:'materielName'},
          {id:7,name:'保管员',prop:'keeper'},
        ],
        data:[
          // {rowId:1,errInfo:'错误信息1',warehouseCode:'仓库编码1',areaCode:'区位1',locateCode:'储位1',materielCode:'物料编码1',materielName:'物料名称1',keeper:'保管员1'},
          // {rowId:2,errInfo:'错误信息2',warehouseCode:'仓库编码2',areaCode:'区位2',locateCode:'储位2',materielCode:'物料编码2',materielName:'物料名称2',keeper:'保管员2'},
          // {rowId:3,errInfo:'错误信息3',warehouseCode:'仓库编码3',areaCode:'区位3',locateCode:'储位3',materielCode:'物料编码3',materielName:'物料名称3',keeper:'保管员3'},
          // {rowId:4,errInfo:'错误信息4',warehouseCode:'仓库编码4',areaCode:'区位4',locateCode:'储位4',materielCode:'物料编码4',materielName:'物料名称4',keeper:'保管员4'},
          // {rowId:5,errInfo:'错误信息5',warehouseCode:'仓库编码5',areaCode:'区位5',locateCode:'储位5',materielCode:'物料编码5',materielName:'物料名称5',keeper:'保管员5'},
        ]
      }
    },
    fileExceed (files, fileList) {
      console.log(files, fileList,'fileExceed');
      this.$message.error('一次只能上传一个文件');
    },
    beforeUpload(file){
      this.files = file;
      const extension = file.name.split('.')[1] === 'xls'
      const extension2 = file.name.split('.')[1] === 'xlsx'
      const isLt2M = file.size / 1024 / 1024 < 5
      if (!extension && !extension2) {
      this.$message.warning('上传模板只能是 xls、xlsx格式!')
      return
      }
      if (!isLt2M) {
      this.$message.warning('上传模板大小不能超过 5MB!')
      return
      }
      this.fileName = file.name;
      return false // 返回false不会自动上传
    },
    submitUpload() {
      // this.uploadurl = process.env.IWMS_BASE_API_V1+`/excels/${this.modalNo}/template`
      // this.$refs.upload.submit();
      console.log(this.fileList[0])
      if(!this.fileList){
        this.$message.warning('请选择要上传的文件！')
        return false
      }
      let fileFormData = new FormData();
      fileFormData.append('file', this.fileList[0]);//filename是键，file是值，就是要传的文件，test.zip是要传的文件名
      console.log(fileFormData,11111111)
      importApi.uploadExcel(this.modalNo,this.fileList[0]);
    },
    // 自定义上传
    uploadFile (item) {
      const form = new FormData()
      form.append('file', item.file);
      importApi.uploadExcel(this.modalNo,fileFormData).then(res=>{
        console.log(res);
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.fileList = fileList;
    },
    handleChangeFile(file, fileList){
      console.log(file, fileList);
      this.fileList = fileList;
    },
    //模板下载
    handleDownload(){
      importApi.downloadModal(this.modalNo).then(res=>{
        console.log(1111,res);
        this.download(res,'excel.xlsx');
      })
    },
    // 下载文件
    download (data,filename) {
        if (!data) {
            return
        }
        let url = window.URL.createObjectURL(new Blob([data]))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', filename)

        document.body.appendChild(link)
        link.click()
    },
    //excel文件导出
    handleExport(){
      importApi.downloadExcel(this.modalNo,{}).then(res=>{
        console.log(res);
        // let filename = decodeURI(res.headers['content-disposition'].split(';')[1].split('=')[1]) || 'excel.xlsx'
        let filename = 'excel.xlsx';
        // console.log(2222,res,res.headers['content-disposition'].split(';')[1].split('=')[1]);
        this.download(res,filename);
      })
    }
  }
};
</script>
