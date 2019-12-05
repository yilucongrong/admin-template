<template>
    <el-upload class="upload-demo"
               action=""
               :on-preview="handlePreview"
               :on-remove="handleRemove"
               :before-remove="beforeRemove"
               multiple
               :limit="3"
               :on-exceed="handleExceed"
               :file-list="fileList">
        <div>
            流程定义文件:
            <el-button size="small"
                       type="primary">点击上传</el-button><br>
            <div slot="tip"
                 style="margin-left:42px">说明：可上传bpmn、xml格式文件。</div>
        </div>

    </el-upload>
</template>
<script>
export default {
    data () {
        return {
            fileList: []
        }
    },
    methods: {
        handleRemove (file, fileList) {
            console.log(file, fileList);
        },
        handlePreview (file) {
            console.log(file);
        },
        handleExceed (files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove (file) {
            return this.$confirm(`确定移除 ${file.name}？`);
        }
    }
}
</script>