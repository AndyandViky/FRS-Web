<template>
    <div class="user_box">
        <ul class="left left_menu">
            <li class="menu_item" v-if="item.rank === 0" 
            @click="getMenu(index)" v-for="(item, index) in menuData" :key="index" 
            :class="{item_bg: index===currentIndex}">{{item.title}}</li>
            <li class="menu_item" v-if="(userForm.types === item.rank || userForm.types >= 3) && item.rank !== 0" 
            @click="getMenu(index)" v-for="(item, index) in menuData" :key="index" 
            :class="{item_bg: index===currentIndex}">{{item.title}}</li>
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
                            <el-radio :label="0">男</el-radio>
                            <el-radio :label="1">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="年龄" prop="age"
                    :rules="[
                        { required: true, message: '年龄不能为空', trigger: 'blur'},
                    ]"
                    >
                        <el-input v-model="userForm.age"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email"
                    :rules="[
                        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    ]">
                        <el-input v-model="userForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="phone"
                    :rules="[
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                    ]"
                    >
                        <el-input v-model="userForm.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="头像">
                        <el-upload
                            class="avatar-uploader"
                            action="http://localhost:8000/avatar"
                            :headers="getToekn()"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="userForm.avatar" :src="userForm.avatar" class="avatar">
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
                <ul v-if="visitorData.length > 0">
                    <li class="visitor_list" v-for="(item, index) in visitorData" :key="index">
                        <img src="/static/images/user_avatar.png" alt="" class="left" width="60px" height="60px">
                        <!-- <span class="visitor_name">{{item.name}}</span>
                        <span v-if="item.gender === 0">男</span>
                        <span v-if="item.gender === 1">女</span> -->
                        <span class="visitor_name">杨林</span>
                        <span v-if="item.gender === 0">男</span>
                        <span>年龄: 20</span>
                        <span>天数: <span style="font-size: 15px; color: #999;margin-left:10px;">{{item.deadline}}</span></span>
                        <span>申请时间: <span style="font-size: 15px; color: #999;margin-left:10px;">{{item.created_at.substring(0,10)}}</span></span>
                        <el-button class="list_button" type="primary" size="small" v-if="item.status === 0" @click="passApply(index)">通过</el-button>
                        <el-button class="list_button" type="danger" size="small" v-if="item.status > 0" @click="deleteApply(index)">删除</el-button>
                    </li>
                </ul>
                <span v-if="visitorData.length === 0" class="no_data">暂无数据</span>
                <v-pagination :total="visitorTotal" v-if="visitorData.length>0"></v-pagination>
            </div>
            <div class="bug_apply" v-if="currentIndex===menuEnum.bug.value">
                <el-form class="bug_form" ref="bug_form" :model="bugForm" label-width="80px">
                    <el-form-item label="故障标题" prop="title"
                    :rules="{
                        required: true, message: '标题不能为空', trigger: 'blur'
                    }"
                    >
                        <el-input placeholder="请输入故障标题" v-model="bugForm.title"></el-input>
                    </el-form-item>
                     <el-form-item label="故障内容" prop="content" 
                    :rules="{
                        required: true, message: '内容不能为空', trigger: 'blur'
                    }"
                    >
                        <el-input placeholder="请输入故障内容" type="textarea" v-model="bugForm.content"></el-input>
                    </el-form-item>
                    <el-form-item label="故障图片">
                        <el-upload
                            :headers="auth"
                            class="avatar-uploader"
                            action="http://localhost:8000/image"
                            :data="bugType"
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
                <el-button type="danger" plain class="image_button" @click="editImage">{{editImageText}}</el-button>
                <ul>
                    <el-checkbox-group v-model="imageCheckBox">
                        <li class="image_item left" v-for="(item, index) in faceData" :key="index">
                            <div class="image_mark" v-show="showImageMark"></div>
                            <i class="el-icon-close delete_image" v-show="showImageMark" @click="deleteImage(index)"></i>
                            <el-checkbox :label="item.id" v-show="showImageMark" class="image_check" name="imageCheckBox"></el-checkbox>
                            <img :src="item.model_image" alt="">
                        </li>
                    </el-checkbox-group>
                    <el-upload
                        :headers="auth"
                        class="avatar-uploader face_image"
                        action="http://localhost:8000/face"
                        :show-file-list="false"
                        :on-success="handleFaceSuccess"
                        :before-upload="beforeFaceUpload">
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </ul>
                <div class="clear"></div>
                <v-pagination :total="10" v-if="faceData.length>0"></v-pagination>
            </div>
            <div class="face_record" v-if="currentIndex===menuEnum.faceRecord.value">
                <ul>
                    <li @click="filterRecordData(index)" :class="{record_menu_bg: recordCurrentIndex===index}" class="visitor_menu" v-for="(item, index) in recordMenu" :key="index">
                        {{item.title}}
                    </li>
                </ul>
                <div class="clear"></div>
                <ul v-if="recordData.length > 0">
                    <li class="record_list" v-for="(item, index) in recordData" :key="index">
                        <span v-if="item.type === 0">进入方式: camera</span>
                        <span v-if="item.type === 1">进入方式: app</span>
                        <span>人数: {{item.count}}</span>
                        <span>进入时间: <span style="font-size: 15px; color: #999;margin-left:10px;">{{item.created_at}}</span></span>
                        <el-button class="list_button" type="danger" size="small" @click="deleteRecord(index)">删除</el-button>
                    </li>
                </ul>
                <span v-if="recordData.length === 0" class="no_data">暂无数据</span>
                <v-pagination :total="10" v-if="recordData.length>0"></v-pagination>
            </div>
            <div class="change_pwd" v-if="currentIndex===menuEnum.password.value">
                <el-form class="pwd_form" ref="pwd_form" :model="pwdForm" label-width="120px">
                    <el-form-item label="旧密码" prop="oldPwd"
                    :rules="[
                        { required: true, message: '旧密码不能为空'},
                    ]"
                    >
                        <el-input required placeholder="请输入旧密码" type="password" v-model="pwdForm.oldPwd"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="newPwd"
                    :rules="[
                        { required: true, message: '新密码不能为空'},
                    ]"
                    >
                        <el-input required placeholder="请输入新密码" type="password" v-model="pwdForm.newPwd"></el-input>
                    </el-form-item>
                    <el-form-item label="再次输入新密码" prop="confirmPwd"
                    :rules="[
                        { required: true, message: '新密码不能为空'},
                    ]"
                    >
                        <el-input required placeholder="请再次输入新密码" type="password" v-model="pwdForm.confirmPwd"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="changePwd">修改</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="visite_apply" v-if="currentIndex===menuEnum.visiteApply.value">
                <el-form class="apply_form" ref="apply_form" :model="applyForm" label-width="80px">
                    <el-form-item label="访问地址" prop="adress"
                    :rules="{
                        required: true, message: '访问地址不能为空', trigger: 'blur'
                    }"
                    >
                         <el-cascader
                            :options="adress"
                            v-model="applyForm.adress">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label="访问天数" prop="deadline"
                    :rules="{
                        required: true, message: '访问天数不能为空', trigger: 'blur'
                    }"
                    >
                        <el-input-number style="width: 200px" v-model="applyForm.deadline" :min="1" :max="30" label="描述文字"></el-input-number>
                    </el-form-item>
                    <el-form-item label="访问原因" prop="reason"
                    :rules="{
                        required: true, message: '访问原因不能为空', trigger: 'blur'
                    }"
                    >
                        <el-input v-model="applyForm.reason" type="textarea" :rows="4" placeholder="请输入访问原因..."></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="postApply">提交申请</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="clear"></div>
    </div>
</template>
<script>
import Pagination from '@/components/pagination';
import { mapState, mapActions } from 'vuex';
import { baseUrl } from '@/help/env';
import store from '@/store';
import { User, Resident, Visitor } from '@/api';
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
            visitorTotal: 0,
            recordTotal: 0,
            bugType: {
                type: 'bug'
            },
            auth: {
                authorization: 'Bearer ' + store.getters.token
            },
            // 所有的地址
            adress: [
                {
                    value: '浙江',
                    label: '浙江',
                    children: [{
                        value: '绍兴',
                        label: '绍兴',
                        children: [{
                            value: '幸福花园小区1',
                            label: '幸福花园小区1'
                        }, {
                            value: '幸福花园小区2',
                            label: '幸福花园小区2'
                        }, {
                            value: '幸福花园小区3',
                            label: '幸福花园小区3'
                        }, {
                            value: '幸福花园小区4',
                            label: '幸福花园小区4'
                        }]
                    }]
                }
            ],
            // -----
            imageUrl: '',
            bugImageUrl: '',
            menuData: [
                {
                    id: 0,
                    title: "用户信息",
                    rank: 0,
                },
                {
                    id: 1,
                    title: "访客管理",
                    rank: 2,
                },
                {
                    id: 2,
                    title: '故障上报',
                    rank: 2,
                },
                {
                    id: 3,
                    title: '图像管理',
                    rank: 0,
                },
                {
                    id: 4,
                    title: '门禁记录',
                    rank: 0,
                },
                {
                    id: 5,
                    title: "密码修改",
                    rank: 0,
                },
                // {
                //     id: 6,
                //     title: "访问申请",
                //     rank: 1,
                // },
                // {
                //     id: 7,
                //     title: "提问中心",
                //     rank: 2,
                // }
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
                },
                visiteApply: {
                    value: 6,
                    title: '访问申请',
                }
            },
            userForm: {
            },
            pwdForm: {
                oldPwd: '',
                newPwd: '',
                confirmPwd: '',
            },
            bugForm: {
                title: '',
                content: '',
                paths: '',
            },
            applyForm: {
                belong: -2,
                reason: '',
                deadline: 1,
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
            ],
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
            ],
            faceData: [
            ],
            // ------
            editImageText: '编辑',
            showImageMark: false,
            imageCheckBox: [],
        };
    },
    watch: {
        imageCheckBox(old, newValue) {
            const box = old;
            let length = box.length;
            if (length > 1) {
                const last = length - 1;
                const lastId = box[last];
                this.imageCheckBox = [];
                this.imageCheckBox.push(lastId);
            }
        }
    },
    async mounted() {
        if (this.$store.getters.residentAuth === 0) {
            this.$router.push({path: "/verify"});
        }
        this.userForm = await this.GetInfo();
    },
    methods: {
        ...mapActions([
            'GetInfo',
        ]),
        getToekn() {
            return {
                authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWxmSWQiOjU5NSwidHlwZSI6MiwiaWF0IjoxNTI0MjM4MTcwLCJleHAiOjE1MjUxMDIxNzB9.MmdrSIRtdXgVL3SzJ-w3U-Jg2UWMtU4OBOQkVlmwQOQ'
            };
        },
        async getMenu(index) {
            this.currentIndex = index;
            switch (index) {
            case 0:
                this.userForm = this.$store.getters.user;
                break;
            case 1: // 获取访客
                this.getVisitorByStatus();
                break;
            case 3: // 图像管理
                this.faceData = await User.getFaceModel();
                for (const face of this.faceData) {
                    face.model_image = baseUrl + face.model_image.substring(6);
                    if (face.is_active === 1) {
                        this.imageCheckBox.push(face.id);
                    }
                }
                break;
            case 4: // 门禁记录
                this.getRecordByStatus();
                break;
            }
        },
        onSubmit() {
            this.$refs["user_form"].validate((valid) => {
                if (valid) {
                    User.changeInfo({
                        name: this.userForm.name,
                        age: this.userForm.age,
                        gender: this.userForm.gender,
                        email: this.userForm.email,
                        phone: this.userForm.phone
                    }).then(data => {
                        this.$message.success('修改成功!');
                    });
                } else {
                    return false;
                }
            });
        },
        postBug() {
            this.$refs["bug_form"].validate(async (valid) => {
                if (valid) {
                    await Resident.addBug(this.bugForm);
                    this.bugForm = {};
                    this.bugImageUrl = "";
                    this.$message.success('提交成功!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        handleAvatarSuccess(res, file) {
            if (res.code === 1) {
                this.userForm.avatar = URL.createObjectURL(file.raw);
            } else this.$message.error('上传失败');
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
        handleBugSuccess(res, file) {
            this.bugForm.path = res.data.path;
            this.bugImageUrl = URL.createObjectURL(file.raw);
        },
        beforeBugUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isLt2M;
        },
        async handleFaceSuccess(res, file) {
            if (res.code === -1) {
                return this.$message.error(res.data);
            }
            this.faceData = await User.getFaceModel();
            for (const face of this.faceData) {
                face.model_image = baseUrl + face.model_image.substring(6);
            }
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
        },
        changePwd() {
            this.$refs["pwd_form"].validate((valid) => {
                if (valid) {
                    if (this.pwdForm.newPwd !== this.pwdForm.confirmPwd) {
                        return this.$message.warning('两次密码输入不一致!');
                    }
                    User.changePwd(this.pwdForm).then(result => {
                        this.$message.success('修改成功!');
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        async filterVisitorData(index) {
            this.visitorCurrentIndex = index;
            switch (index) {
            case 0:
                this.getVisitorByStatus();
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
        filterRecordData(index) {
            this.recordCurrentIndex = index;
            switch (index) {
            case 0:
                this.getRecordByStatus();
                break;
            case 1:
                this.getRecordByStatus(0);
                break;
            case 2:
                this.getRecordByStatus(1);
                break;
            }
        },
        async getVisitorByStatus(status) {
            const data = {
                pageNo: 1,
                pageSize: 10,
            };
            if (status !== undefined) data.status = status;
            const visitors = await Resident.getVisitors(data);
            this.visitorData = [];
            this.visitorData = visitors.datas;
            this.visitorTotal = visitors.total;
        },
        async getRecordByStatus(status) {
            const data = {
                pageNo: 1,
                pageSize: 10,
            };
            if (status >= 0) data.type = status;
            const result = await User.getCameraRecords(data);
            this.recordData = result.datas;
            this.recordTotal = result.total;
        },
        deleteRecord(index) {
            this.$alert('是否删除门禁记录?', '删除数据', {
                confirmButtonText: '确定',
                callback: action => {
                    if (action === 'confirm') {
                        this.recordData.splice(index, 1);
                        this.$message.success("删除成功");
                    }
                }
            });
        },
        passApply(index) {
            this.$alert('是否通过此次申请?', '取消', {
                confirmButtonText: '确定',
                callback: async action => {
                    console.log(action);
                    if (action === 'confirm') {
                        await Resident.approveVisitor({
                            visitorId: this.visitorData[index].visitor_id
                        });
                        this.visitorData[index].status = 1;
                        this.$message.success('审核成功!');
                    }
                }
            });
        },
        deleteApply(index) {
            this.$alert('是否删除访问记录?', '删除数据', {
                confirmButtonText: '确定',
                callback: action => {
                    if (action === 'confirm') {
                        this.recordData.splice(index, 1);
                        this.$message.success("删除成功");
                    }
                }
            });
        },
        editImage() {
            if (this.editImageText === "编辑") {
                this.showImageMark = true;
                this.editImageText = "完成";
            } else {
                // 提交
                if (this.imageCheckBox.length === 0) {
                    this.$alert('当前暂未选中激活模型?', '是否确认', {
                        confirmButtonText: '确认',
                        callback: action => {
                            if (action === 'confirm') {
                                User.activeFace({ modelId: 0 }).then(result => {
                                    this.$message.success("编辑成功");
                                });
                            }
                        }
                    });
                } else {
                    User.activeFace({ modelId: this.imageCheckBox[0] }).then(result => {
                        this.$message.success("编辑成功");
                    });
                }
                this.showImageMark = false;
                this.editImageText = "编辑";
            }
        },
        deleteImage(index) {
            this.$alert('是否删所选人脸图片?', '删除图片', {
                confirmButtonText: '确定',
                callback: action => {
                    if (action === 'confirm') {
                        this.faceData.splice(index, 1);
                        this.$message.success("删除成功");
                    }
                }
            });
        },
        postApply() {
            // 提交申请信息
            this.$refs["apply_form"].validate(async (valid) => {
                if (valid) {
                    await Visitor.applyVisite(this.applyForm);
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
.no_data{
    display: block;
    font-size: 30px;
    color: #ccc;
    text-align: center;
    padding-top: 100px;
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
    .left_menu, .menu_desc{
      min-height: 500px;
      border-radius: 5px;
      box-shadow: -1px -1px 1px #ccc;
      background-color: rgba(247, 243, 243, 0.699);
      >div {
        margin: 30px;
      }
    }
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
            .record_list{
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
        >.face_manage{
            margin-left: 30px;
            margin-top: 20px;
            .image_button{
                margin-bottom: 10px;
            }
            .face_image{
                width: 220px;
                height: 300px;
                margin-left: 20px;
                float: left;
                .avatar-uploader-icon{
                    width: 220px;
                    height: 300px;
                    line-height: 300px;
                }
            }
            .image_item{
                width: 218px;
                height: 300px;
                margin-right: 22px;
                margin-bottom: 20px;
                position: relative;
                box-shadow: 2px 2px 1px #ccc;
                cursor: pointer;
                &:last-child{
                    margin-right: 0px;
                }
                >img{
                    width: 220px;
                    height: 300px;
                }
                .image_mark{
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,.5);
                }
                .image_check{
                    position: absolute;
                    left: 5px;
                    top: 5px;
                }
                .delete_image{
                    position: absolute;
                    right: 5px;
                    z-index: 200;
                    cursor: pointer;
                    top: 5px;
                    color: #ffffff;
                    font-size: 20px;
                }
            }
        }
        >.visite_apply, >.bug_apply{
            margin-left: 50px;
        }
    }
}
</style>
