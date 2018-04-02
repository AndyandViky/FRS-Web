<script>
export default {
    name: 'verify',
    data() {
        return {
            verifyForm: {},
            identityUrl: '',
            cardFrontUrl: '',
            cardOppositeUrl: '',
            rules: {
                phone: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                ],
                card_id: [
                    { required: true, message: '请输入身份证号码', trigger: 'blur' },
                ]
            }
        };
    },
    created() {
    },
    mounted() {
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
            this.identityUrl = URL.createObjectURL(file.raw);
        },
        handleSuccess2(res, file) {
            this.cardFrontUrl = URL.createObjectURL(file.raw);
        },
        handleSuccess3(res, file) {
            this.cardOppositeUrl = URL.createObjectURL(file.raw);
        },
        postVerify() {
            // 提交审核信息
            this.$refs["verify_form"].validate((valid) => {
                if (valid) {
                    if (!this.identityUrl || !this.cardFrontUrl || !this.cardOppositeUrl) {
                        this.$message.warning('请上传证明信息!');
                        return false;
                    }
                    this.$message.success('提交成功!');
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
            <el-form-item label="房地产证明" prop="identity_url">
                <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleSuccess1"
                    :before-upload="beforeUpload">
                    <img v-if="identityUrl" :src="identityUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="身份证正面: ">
                <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleSuccess2"
                    :before-upload="beforeUpload">
                    <img v-if="cardFrontUrl" :src="cardFrontUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="身份证反面: ">
                <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleSuccess3"
                    :before-upload="beforeUpload">
                    <img v-if="cardOppositeUrl" :src="cardOppositeUrl" class="avatar">
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