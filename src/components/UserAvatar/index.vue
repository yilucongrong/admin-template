<template>
    <div>
        <el-upload class="avatar-uploader"
                   :headers="myHeader"
                   action=""
                   :http-request="upLoad"
                   :show-file-list="false"
                   :on-success="handleAvatarSuccess"
                   :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl"
                 :src="imageUrl"
                 class="userpic" />
            <i v-else
               class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </div>
</template>

<script>
import { getUserAvatar, userAvatar } from "@/api/system/user";
export default {
    computed: {
        myHeader () {
            return {
                authToken: window.sessionStorage.getItem("authToken")
            };
        }
    },
    created () {
        this.handleAvatarSuccess();
    },
    data () {
        return {
            imageUrl: null
        };
    },
    methods: {
        upLoad (file) {
            const formData = new FormData();
            formData.append("file", file.file);
            userAvatar(formData)
                .then(() => {
                    // console.log("上传图片接口-数据", res);
                    this.handleAvatarSuccess();
                })
                .catch(err => {
                    this.$message.error("上传失败，请重新上传");
                    console.log("报错", err);
                });
        },
        handleAvatarSuccess () {
            getUserAvatar()
                .then(res => {
                    //获取用户头像信息
                    return (
                        "data:image/png;base64," +
                        btoa(
                            new Uint8Array(res.data).reduce(
                                (data, byte) =>
                                    data + String.fromCharCode(byte),
                                ""
                            )
                        )
                    );
                })
                .then(data => {
                    this.imageUrl = data || "";
                });
        },
        beforeAvatarUpload (file) {
            console.log(file.type);
            const isJPG = file.type === "image/jpeg";
            const isPNG = file.type === "image/png";
            const isGIF = file.type === "image/gif";
            const isLt2M = file.size / 1024 < 200; //图片大小不能超过65k

            if (!isJPG && !isPNG && !isGIF) {
                this.$message.error("上传头像图片只能是 JPG/PNG/GIF 格式!");
            }
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 200k!");
            }
            // return isJPG && isLt2M;
            return isLt2M && (isJPG || isPNG || isGIF);
        }
    }
};
</script>

<style scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
.userpic {
    width: 100px;
    height: 100px;
    margin-left: 25px;
    border-radius: 50px;
    background-color: #474747;
}
</style>