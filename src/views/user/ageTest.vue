<template>
    <div class="age_test">
        <h1>跨年龄检测演示</h1>
        <center>
            <div class="age_test_box">
                <div class="face_manage">
                    <el-upload
                        :headers="auth"
                        class="avatar-uploader"
                        action="http://localhost:8000/age/test"
                        :show-file-list="false"
                        :on-success="handleFaceSuccess"
                        :before-upload="beforeFaceUpload">
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
            </div>
            <p>人脸相似度为: {{score}}</p>
        </center>
        <div class="clear"></div>
    </div>
</template>
<script>
import {baseUrl} from '@/help/env';
import { User } from '@/api';
export default {
    name: 'user',
    data() {
        return {
            auth: {
                authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWxmSWQiOjU5NSwiaWF0IjoxNTIzNTUzNDEzLCJleHAiOjE1MjQ0MTc0MTN9.DU1W-hagVJg7ts1GUNPSQREZiLFYZyq8ryLyNY9n0kA'
            },
            score: 0,
        };
    },
    methods: {
        async handleFaceSuccess(res, file) {
            if (res.code === -1) {
                return this.$message.error(res.data);
            }
            this.score = res.data;
        },
        beforeFaceUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }
    }
};

</script>
<style lang="less">
.age_test{
    height: 1000px;
    h1{
        text-align: center;
        font-size: 20px;
    }
    .age_test_box{
        margin-top:100px;
    }
    .face_manage{
        .el-upload__input{
            display: none;
        }
        .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
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
    }
}
</style>
