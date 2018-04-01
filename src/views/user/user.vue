<template>
    <div class="user_box">
        <ul class="left">
            <li class="menu_item" @click="currentIndex=index" v-for="(item, index) in menuData" :key="index" :class="{item_bg: index===currentIndex}">{{item.title}}</li>
        </ul>
        <div class="right menu_desc">
            <div class="user_info" v-if="currentIndex===menuEnum.info.value">
                <el-form class="user_form" ref="user_form" :model="userForm" label-width="80px">
                    <el-form-item label="姓名" prop="name"
                    :rules="{
                        required: true, message: '姓名不能为空', trigger: 'blur'
                    }"
                    >
                        <el-input v-model="userForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="gender"
                    :rules="[
                        { required: true, message: '性别不能为空'},
                    ]"
                    >
                        <el-radio-group v-model="userForm.gender">
                            <el-radio label="男"></el-radio>
                            <el-radio label="女"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="年龄" prop="age"
                    :rules="[
                        { required: true, message: '年龄不能为空'},
                    ]"
                    >
                        <el-input v-model="userForm.age"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email"
                    :rules="[
                        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
                    ]">
                        <el-input v-model="userForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="phone"
                    :rules="[
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                        { type: 'phone', message: '请输入正确的手机号', trigger: 'blur,change' }
                    ]"
                    >
                        <el-input v-model="userForm.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="头像">
                        <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">修改</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="visitor_manage" v-if="currentIndex===menuEnum.visitor.value">
                <ul>
                    <li @click="filterVisitorData(index)" :class="{visitor_menu_bg: visitorCurrentIndex===index}" class="visitor_menu" v-for="(item, index) in visitorMenu" :key="index">
                        {{item.title}}
                    </li>
                </ul>
                <div class="clear"></div>
                <ul v-if="visitorData1.length > 0">
                    <li class="visitor_list" v-for="(item, index) in visitorData1" :key="index">
                        <img src="/static/images/user_avatar.png" alt="" class="left" width="60px" height="60px">
                        <span class="visitor_name">{{item.name}}</span>
                        <span v-if="item.gender === 0">男</span>
                        <span v-if="item.gender === 1">女</span>
                        <span>年龄: {{item.age}}</span>
                        <span>申请时间: <span style="font-size: 15px; color: #999;margin-left:10px;">{{item.apply_time}}</span></span>
                        <el-button class="list_button" type="primary" size="small" v-if="item.status === 0" @click="passApply(index)">通过</el-button>
                        <el-button class="list_button" type="danger" size="small" v-if="item.status > 0" @click="deleteApply(index)">删除</el-button>
                    </li>
                </ul>
                <v-pagination :total="10" v-if="visitorData.length>0"></v-pagination>
            </div>
            <div class="bug_apply" v-if="currentIndex===menuEnum.bug.value">
                <el-form class="bug_form" ref="bug_form" :model="bugForm" label-width="80px">
                    <el-form-item label="故障标题" prop="title"
                    :rules="{
                        required: true, message: '标题不能为空', trigger: 'blur'
                    }"
                    >
                        <el-input v-model="bugForm.title"></el-input>
                    </el-form-item>
                     <el-form-item label="故障内容" prop="content" 
                    :rules="{
                        required: true, message: '内容不能为空', trigger: 'blur'
                    }"
                    >
                        <el-input type="textarea" v-model="bugForm.content"></el-input>
                    </el-form-item>
                    <el-form-item label="故障图片">
                        <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleBugSuccess"
                            :before-upload="beforeBugUpload">
                            <img v-if="bugImageUrl" :src="bugImageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="postBug">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="face_manage" v-if="currentIndex===menuEnum.faceImage.value">
                <v-pagination :total="10" v-if="visitorData.length>0"></v-pagination>
            </div>
            <div class="face_record" v-if="currentIndex===menuEnum.faceRecord.value">
                <ul>
                    <li @click="filterRecordData(index)" :class="{record_menu_bg: recordCurrentIndex===index}" class="visitor_menu" v-for="(item, index) in recordMenu" :key="index">
                        {{item.title}}
                    </li>
                </ul>
                <div class="clear"></div>
                <ul v-if="visitorData1.length > 0">
                    <li class="visitor_list" v-for="(item, index) in visitorData1" :key="index">
                        <img src="/static/images/user_avatar.png" alt="" class="left" width="60px" height="60px">
                        <span class="visitor_name">{{item.name}}</span>
                        <span v-if="item.gender === 0">男</span>
                        <span v-if="item.gender === 1">女</span>
                        <span>年龄: {{item.age}}</span>
                        <span>申请时间: <span style="font-size: 15px; color: #999;margin-left:10px;">{{item.apply_time}}</span></span>
                        <el-button class="list_button" type="danger" size="small" @click="deleteApply(index)">删除</el-button>
                    </li>
                </ul>
                <v-pagination :total="10" v-if="visitorData.length>0"></v-pagination>
            </div>
            <div class="change_pwd" v-if="currentIndex===menuEnum.password.value">
                <el-form class="pwd_form" ref="pwd_form" :model="pwdForm" label-width="120px">
                    <el-form-item label="旧密码" prop="oldPassword"
                    :rules="[
                        { required: true, message: '旧密码不能为空'},
                    ]"
                    >
                        <el-input required placeholder="请输入旧密码" type="password" v-model="pwdForm.oldPassword"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="newPassword"
                    :rules="[
                        { required: true, message: '新密码不能为空'},
                    ]"
                    >
                        <el-input required placeholder="请输入新密码" type="password" v-model="pwdForm.newPassword"></el-input>
                    </el-form-item>
                    <el-form-item label="再次输入新密码" prop="newPassword1"
                    :rules="[
                        { required: true, message: '新密码不能为空'},
                    ]"
                    >
                        <el-input required placeholder="请再次输入新密码" type="password" v-model="pwdForm.newPassword1"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="changePwd">修改</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="clear"></div>
    </div>
</template>
<script>
import Pagination from '@/components/pagination';
export default {
    name: 'user',
    components: {
        'v-pagination': Pagination
    },
    data() {
        return {
            currentIndex: 0,
            visitorCurrentIndex: 0,
            recordCurrentIndex: 0,
            imageUrl: '',
            bugImageUrl: '',
            menuData: [
                {
                    id: 0,
                    title: "用户信息",
                },
                {
                    id: 1,
                    title: "访客管理",
                },
                {
                    id: 2,
                    title: '故障上报',
                },
                {
                    id: 3,
                    title: '图像管理',
                },
                {
                    id: 4,
                    title: '门禁记录',
                },
                {
                    id: 5,
                    title: "密码修改",
                }
            ],
            menuEnum: {
                info: {
                    value: 0,
                    title: '用户信息',
                },
                visitor: {
                    value: 1,
                    title: '访客管理',
                },
                bug: {
                    value: 2,
                    title: '故障上报',
                },
                faceImage: {
                    value: 3,
                    title: '图像管理',
                },
                faceRecord: {
                    value: 4,
                    title: '门禁记录',
                },
                password: {
                    value: 5,
                    title: '密码修改',
                }
            },
            userForm: {
                name: '杨霖',
                gender: '男',
                age: 22,
                phone: '17805850721',
            },
            pwdForm: {
                oldPassword: '',
                newPassword: '',
                newPassword1: '',
            },
            bugForm: {
                title: '门禁准确率',
                content: '门禁准确率'
            },
            visitorMenu: [
                {
                    id: 0,
                    title: '全部'
                },
                {
                    id: 1,
                    title: '已审核'
                },
                {
                    id: 2,
                    title: '未审核'
                },
                {
                    id: 3,
                    title: '已失效'
                }
            ],
            visitorData: [
                {
                    id: 1,
                    status: 0,
                    name: '王万金',
                    age: 30,
                    gender: 1,
                    apply_time: '2017-10-22 12:22',
                },
                {
                    id: 2,
                    status: 1,
                    name: '陈李娜',
                    age: 20,
                    gender: 1,
                    apply_time: '2017-10-22 12:22',
                },
                {
                    id: 3,
                    status: 2,
                    name: '黄雯婕',
                    age: 18,
                    gender: 1,
                    apply_time: '2017-10-22 12:22',
                }
            ],
            visitorData1: [],
            recordMenu: [
                {
                    id: 0,
                    title: '全部'
                },
                {
                    id: 1,
                    title: '识别进入'
                },
                {
                    id: 2,
                    title: 'app进入'
                },
            ],
            recordData: [
                {
                    id: 0,
                    count: 2,
                    created_at: '2017-10-22 12:22',
                },
            ],
            recordData1: [],
        };
    },
    created() {
        this.visitorData1 = this.visitorData;
    },
    methods: {
        handleOpen() {

        },
        handleClose() {
        },
        onSubmit() {
            this.$refs["user_form"].validate((valid) => {
                if (valid) {
                    this.$message.success('修改成功!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        postBug() {
            this.$refs["bug_form"].validate((valid) => {
                if (valid) {
                    this.$message.success('提交成功!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        changePwd() {
            this.$refs["pwd_form"].validate((valid) => {
                if (valid) {
                    this.$message.success('修改成功!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        filterVisitorData(index) {
            this.visitorCurrentIndex = index;
            switch (index) {
            case 0:
                this.visitorData1 = [];
                this.visitorData1 = this.visitorData;
                break;
            case 1:
                this.getVisitorByStatus(1);
                break;
            case 2:
                this.getVisitorByStatus(0);
                break;
            case 3:
                this.getVisitorByStatus(2);
                break;
            }
        },
        getVisitorByStatus(status) {
            this.visitorData1 = [];
            for (let item of this.visitorData) {
                if (item.status === status) {
                    this.visitorData1.push(item);
                }
            }
        },
        passApply(index) {
            this.visitorData1[index].status = 1;
            this.$message.success('审核成功!');
        },
        deleteApply(index) {
            this.visitorData1.splice(index, 1);
            this.$message.success('删除成功!');
        }
    }
};

</script>
<style lang="less">
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
.user_box{
    width: 980px;
    margin: 50px auto;
    .menu_item{
        width: 200px;
        text-align: center;
        height: 50px;
        line-height: 50px;
        color: @primary-color;
        border-radius: 3px;
        cursor: pointer;
        transition: all ease .3s;
        &:hover{
            background: @primary-color;
            color: #fff;
        }
    }
    .item_bg{
        background: @primary-color;
        color: #fff;
    }
    .menu_desc{
        width: 760px;
        height: 600px;
        .el-input__inner{
            width: 200px;
        }
        .el-textarea__inner{
            width: 300px;
        }
        .el-upload__input{
            display: none;
        }
        .user_form, .pwd_form{
            margin-left: 40px;
        }
        >.visitor_manage{
            margin-left: 50px;
            .visitor_menu{
                float: left;
                transition: all ease .3s;
                &:hover{
                    color: @primary-color;
                }
                cursor: pointer;
                padding-right: 30px;
            }
            .visitor_list{
                margin-top: 10px;
                height: 100px;
                border-bottom: 1px solid #ccc;
                >img{
                    margin-top: 20px;
                }
                >span{
                    margin-left: 40px;
                    line-height: 100px;
                }
                .list_button{
                    float: right;
                    margin-top: 34px;
                }
            }
            .visitor_menu_bg{
                color: @primary-color;
            }
        }
        >.face_record{
            margin-left: 50px;
            .visitor_menu{
                float: left;
                transition: all ease .3s;
                &:hover{
                    color: @primary-color;
                }
                cursor: pointer;
                padding-right: 30px;
            }
            .visitor_list{
                margin-top: 10px;
                height: 100px;
                border-bottom: 1px solid #ccc;
                >img{
                    margin-top: 20px;
                }
                >span{
                    margin-left: 40px;
                    line-height: 100px;
                }
                .list_button{
                    float: right;
                    margin-top: 34px;
                }
            }
            .record_menu_bg{
                color: @primary-color;
            }
        }
    }
}
</style>
