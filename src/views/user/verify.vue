<script>
import { User } from '@/api';
import { uploadAttachment } from '@/help/env';

export default {
    name: 'verify',
    data() {
        return {
            verifyForm: {
                phone: '',
                card_id: '',
                identity_pic: '',
                card_front: '',
                card_opposite: '',
            },
            auth: {
                authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWxmSWQiOjIsImlhdCI6MTUyMzM1MzA5OSwiZXhwIjoxNTI0MjE3MDk5fQ.TtmIHDbSfLoRXeA88u7mZBV6--4q8T9ml-O58q6TEjE'
            },
            idUrl: '',
            cardFUrl: '',
            cardOUrl: '',
            uploadUrl: '',
            rules: {
                phone: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                ],
                card_id: [
                    { required: true, message: '请输入身份证号码', trigger: 'blur' },
                ],
                identity_pic: [
                    { required: true, message: '请上传房地产证明' },
                ],
                card_front: [
                    { required: true, message: '请上传身份证正面' },
                ],
                card_opposite: [
                    { required: true, message: '请上传身份证反面' },
                ]
            }
        };
    },
    created() {
        this.uploadUrl = uploadAttachment;
    },
    mounted() {
        if (this.$store.getters.residentAuth !== 0) {
            this.$router.push({path: "/user"});
        }
    },
    methods: {
        beforeUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB!');
            }
            return isLt2M;
        },
        handleSuccess1(res, file) {
            this.verifyForm.identity_pic = res.data.path;
            this.idUrl = URL.createObjectURL(file.raw);
        },
        handleSuccess2(res, file) {
            this.verifyForm.card_front = res.data.path;
            this.cardFUrl = URL.createObjectURL(file.raw);
        },
        handleSuccess3(res, file) {
            this.verifyForm.card_opposite = res.data.path;
            this.cardOUrl = URL.createObjectURL(file.raw);
        },
        postVerify() {
            // 提交审核信息
            this.$refs["verify_form"].validate(async (valid) => {
                if (valid) {
                    const result = await User.verify(this.verifyForm);
                    this.$message.success('提交成功!');
                    this.$router.push({path: "/user"});
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
};
</script>
<template>
	<div class="verify_box">
        <h1>业主提交详细信息</h1>
        <el-form :rules="rules" ref="verify_form" :model="verifyForm" label-width="100px">
            <el-form-item label="手机号码: " prop="phone">
                <el-input v-model="verifyForm.phone" placeholder="请输入手机号码"></el-input>
            </el-form-item>
            <el-form-item label="身份证号: " prop="card_id">
                <el-input v-model="verifyForm.card_id" placeholder="请输入身份证号码"></el-input>
            </el-form-item>
            <el-form-item label="房地产证明" prop="identity_pic">
                <el-upload
                    class="avatar-uploader"
                    :action="uploadUrl"
                    :headers="auth"
                    :show-file-list="false"
                    :on-success="handleSuccess1"
                    :before-upload="beforeUpload">
                    <img v-if="idUrl" :src="idUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="身份证正面: " prop="card_front">
                <el-upload
                    class="avatar-uploader"
                    :action="uploadUrl"
                    :headers="auth"
                    :show-file-list="false"
                    :on-success="handleSuccess2"
                    :before-upload="beforeUpload">
                    <img v-if="cardFUrl" :src="cardFUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="身份证反面: " prop="card_opposite">
                <el-upload
                    class="avatar-uploader"
                    :action="uploadUrl"
                    :headers="auth"
                    :show-file-list="false"
                    :on-success="handleSuccess3"
                    :before-upload="beforeUpload">
                    <img v-if="cardOUrl" :src="cardOUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="postVerify">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<style lang="less">
.verify_box{
    width: 500px;
    margin:50px auto 100px auto;
    >h1{
        text-align: center;
        padding-bottom: 50px;
        font-size: 20px;
    }
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
</style>