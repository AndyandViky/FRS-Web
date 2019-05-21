<script>
import { User } from '@/api';
import userHelp from '@/help/userHelp';
import {mapState, mapActions} from 'vuex';
const TIME_COUNT = 60;
export default {
    name: '',
    components: {
    },
    directives: {
    },
    data() {
        return {
            show: false,
            loginForm: {
                username: '',
                password: ''
            },
            registerForm: {
                email: undefined,
                vCode: undefined,
                password: undefined,
                house_number: undefined,
                types: 2,
                confirmPassword: undefined,
                name: undefined,
            },
            reChangePwd: {
                email: undefined,
                vCode: undefined,
                password: undefined,
            },
            l_message: '',
            r_message: '',
            operation: 0,
            codeBtnShow: true,
            count: '',
            timer: null,
        };
    },
    created() {
    },
    mounted() {
        // console.log(this.validatePhone('15068546116'));
    },
    computed: {
        ...mapState([
            'user'
        ]),
        CodeBtnDisabled() {
            return !(((typeof this.registerForm.email !== 'undefined') && this.registerForm.email.length !== 0) && (this.codeBtnShow));
        },
        RePwdBtnDisabled() {
            return !(((typeof this.reChangePwd.email !== 'undefined') && this.reChangePwd.email.length !== 0) && (this.codeBtnShow));
        }
    },
    methods: {
        ...mapActions([
            'GetInfo',
            'LogOut'
        ]),
        validatePhone(value) {
            var reg = /^1[3|4|5|7|8][0-9]{9}$/;
            if (!reg.test(value)) {
                console.log('phone false');
                return false;
            } else {
                return true;
            }
        },
        sendVCode(email) {
            User.sendRegisterEmail({
                email
            }).then(result => {
                this.$message.info('发送成功');
            });
        },
        async Login_click() {
            if (typeof this.loginForm.username === 'undefined' || this.loginForm.username.length === 0) {
                return this.$message({
                    type: 'warning',
                    message: '用户名不能为空!'
                });
            }
            if (typeof this.loginForm.password === 'undefined' || this.loginForm.password.length === 0) {
                return this.$message({
                    type: 'warning',
                    message: '密码不能为空!'
                });
            }
            User.login({
                username: this.loginForm.username,
                password: this.loginForm.password
            }).then(async result => {
                await this.$store.dispatch('SetToken', result.token);
                result.user.is_verify = result.isVerify;
                await this.$store.dispatch('SetUser', result.user);
                this.$message({
                    type: 'success',
                    message: '登录成功!'
                });
            });
            this.show = false;
        },
        async Register_click() {
            if (typeof this.registerForm.email === 'undefined' || this.registerForm.email.length === 0) {
                return this.$message({
                    type: 'warning',
                    message: '邮箱不能为空!'
                });
            }
            if (typeof this.registerForm.password === 'undefined' || this.registerForm.password.length === 0) {
                return this.$message({
                    type: 'warning',
                    message: '密码不能为空!'
                });
            }
            if (typeof this.registerForm.confirmPassword === 'undefined' || this.registerForm.confirmPassword.length === 0) {
                return this.$message({
                    type: 'warning',
                    message: '密码不能为空!'
                });
            }
            if (this.registerForm.confirmPassword !== this.registerForm.password) {
                return this.$message({
                    type: 'warning',
                    message: '两次密码输入不一致!'
                });
            }
            if (typeof this.registerForm.vCode === 'undefined' || this.registerForm.vCode.length === 0) {
                return this.$message({
                    type: 'warning',
                    message: '验证码不能为空!'
                });
            }
            try {
                await User.register(this.registerForm);
                this.operation = 0;
                this.$message({
                    type: 'success',
                    message: '注册成功，请登录'
                });
            } catch (err) {
                // console.log(err);
                this.r_message = err.data.error;
            }
        },
        async rechange_pwd_click() {
            if (typeof this.reChangePwd.email === 'undefined' || this.reChangePwd.email.length === 0) {
                return this.$message({
                    type: 'warning',
                    message: '邮箱不能为空!'
                });
            }
            if (typeof this.reChangePwd.password === 'undefined' || this.reChangePwd.password.length === 0) {
                return this.$message({
                    type: 'warning',
                    message: '密码不能为空!'
                });
            }
            if (typeof this.reChangePwd.vCode === 'undefined' || this.reChangePwd.vCode.length === 0) {
                return this.$message({
                    type: 'warning',
                    message: '验证码不能为空!'
                });
            }
            try {
                await User.rechangePwd(this.reChangePwd);
                this.operation = 0;
                this.$message({
                    type: 'success',
                    message: '修改成功，请登录'
                });
            } catch (err) {
                this.r_message = err.data.error;
            }
        },
        close() {
            this.clear();
            this.show = false;
            this.operation = 0;
        },
        clear() {
            this.loginForm.username = undefined;
            this.loginForm.password = undefined;
            this.registerForm.email = undefined;
            this.registerForm.name = undefined;
            this.registerForm.confirmPassword = undefined;
            this.registerForm.vCode = undefined;
            this.registerForm.password = undefined;
            this.registerForm.house_number = undefined;
            this.registerForm.types = 2;
            this.l_message = '';
            this.r_message = '';
            this.reChangePwd.password = undefined;
            this.reChangePwd.email = undefined;
            this.reChangePwd.vCode = undefined;
        }
    },
    watch: {
        show(val) {
            if (val) {
                document.body.style.overflow = 'hidden';
                document.body.style.height = '100%';
            } else {
                document.body.removeAttribute("style");
            }
        }
    }
};
</script>
<template>
    <div class="wrapper">
        <div class="button" @click="show=true;">登录 / 注册</div>
        <div class="login_box" v-if="show">
            <div class="login_wrapper">
                <ul class="title">
                    <li :class="[operation === 0 ?'active':'']" @click="operation=0; clear();">登录</li>
                    <li :class="[operation === 1 ?'active':'']" @click="operation=1; clear();">注册</li>
                    <li :class="[operation === 2 ?'active':'']" @click="operation=2; clear();">忘记密码</li>
                    <li class="close_icon" @click="close">
                        <img src="/static/images/close_2.png">
                    </li>
                </ul>
                <div class="login_body" v-if="operation === 0">
                    <div class="input_box">
                        <img src="/static/images/user_icon.png">
                        <input type="" name="user" placeholder="输入邮箱 / 手机号" v-model="loginForm.username">
                    </div>
                    <div class="input_box">
                        <img src="/static/images/password_icon.png">
                        <input type="password" name="password" placeholder="输入密码" v-model="loginForm.password">
                    </div>
                    <div @click="operation=2; clear();" style="float:right;color: #999;font-size: 14px;margin-top:3px;cursor: pointer;">忘记密码？</div>
                    <div class="button" @click="Login_click">登 录</div>
                    <div class="message" v-if="l_message">{{l_message}} !</div>
                </div>

                <div class="rechange_pwd_body" v-if="operation === 2">
                    <div class="input_box">
                        <img src="/static/images/user_icon.png">
                        <input type="" name="user" placeholder="输入邮箱" v-model="reChangePwd.email">
                    </div>
                    <div class="input_box">
                        <img src="/static/images/vcode.png">
                        <input type="text" name="vcode" placeholder="请输入验证码" v-model="reChangePwd.vCode">
                        <button @click="sendVCode(reChangePwd.email)" :disabled="RePwdBtnDisabled">
                            <span title="输入邮箱获取验证码" v-show="codeBtnShow">获取验证码</span>
                            <span v-show="!codeBtnShow">{{count}} s</span>
                        </button>
                    </div>
                    <div class="input_box">
                        <img src="/static/images/password_icon.png">
                        <input type="password" name="password" placeholder="输入新密码" v-model="reChangePwd.password">
                    </div>
                    <div class="button" @click="rechange_pwd_click">修 改</div>
                    <div class="message" v-if="l_message">{{l_message}} !</div>
                </div>

                <div class="register_body" v-if="operation === 1">
                    <div class="typeswitch">
                        <label class="m-radiobox" @click="registerForm.types = 2">
                            <input type="radio" name="customer_registration_type" required="required" class="radio" value="2" checked="">
                            <span class="ico"></span> <em>业主</em> 
                        </label>
                        <label class="m-radiobox" @click="registerForm.types = 1">
                            <input type="radio" name="customer_registration_type" required="required" class="radio" value="3">
                            <span class="ico"></span> <em>访客</em> 
                        </label>
                    </div>
                    <div class="input_box" :class="[registerForm.types == 1?'hide':'']">
                        <img src="/static/images/company_icon.png">
                        <input type="text" name="company" placeholder="请输入业主地址" v-model="registerForm.house_number">
                    </div>
                    <div class="input_box">
                        <img src="/static/images/login_phone.png">
                        <input type="text" name="name" placeholder="请输入姓名" v-model="registerForm.name">
                    </div>
                    <div class="input_box">
                        <img src="/static/images/login_phone.png">
                        <input type="" name="phone" placeholder="请输入邮箱" v-model="registerForm.email">
                    </div>
                    <div class="input_box">
                        <img src="/static/images/vcode.png">
                        <input type="text" name="vcode" placeholder="请输入验证码" v-model="registerForm.vCode">
                        <button @click="sendVCode(registerForm.email)" :disabled="CodeBtnDisabled">
                            <span title="输入邮箱获取验证码" v-show="codeBtnShow">获取验证码</span>
                            <span v-show="!codeBtnShow">{{count}} s</span>
                        </button>
                    </div>
                    <div class="input_box">
                        <img src="/static/images/password_icon.png">
                        <input type="password" name="password" placeholder="设置密码" v-model="registerForm.password">
                    </div>
                     <div class="input_box">
                        <img src="/static/images/password_icon.png">
                        <input type="password" name="confirmPassword" placeholder="再次输入密码" v-model="registerForm.confirmPassword">
                    </div>
                    <div class="button" @click="Register_click">注 册</div>
                    <div class="message" v-if="r_message">{{r_message}} !</div>
                    <div class=""></div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
.wrapper{
    display: inline;
}
.login_box{
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-color: rgba(0,0,0,.8);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .login_wrapper{
        // height: 400px;
        width: 400px;
        background-color: #fff;
        border-radius: 5px;
        animation: show .1s ease-out backwards;
        padding: 0 20px;
        position: relative;
        padding-bottom: 30px;
        .title{
            height: 60px;
            line-height: 60px;
            display: flex;
            border-bottom: 1px solid #ddd;
            margin-bottom: 30px;
            >li{
                width: 80px;
                text-align: center;
                cursor: pointer;
            }
            .active{
                border-bottom: 1px solid @primary-color;
                color: @primary-color;
            }
            .close_icon{
                position: absolute;
                right: 20px;
                top: 15px;
                height: 30px;
                width: 30px;
                line-height: 0;
                cursor: pointer;
                >img{
                    height: 100%;
                    width: 100%;
                    transition: all 0.5s ease-in-out;
                    &:hover{
                        transform: rotate(180deg);
                    }
                }
            }
        }
        .typeswitch{
            display: flex;
            align-items: center;
            justify-content: space-around;
            .m-radiobox {
                position: relative;
                border: none;
                // padding-right: 30px;
                margin-bottom: 0;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                .radio {
                    position: absolute;
                    clip: rect(0,0,0,0);
                    pointer-events: none;
                }
                .ico {
                    width: 18px;
                    height: 18px;
                    display: inline-block;
                    vertical-align: middle;
                    border: 2px solid #dcdee5;
                    border-radius: 50%;
                    transition: border-color .4s,border-width .1s cubic-bezier(.54,1.85,.5,1);
                    margin-right: 5px;
                }
                .radio:checked+.ico, .checked .ico {
                    border-width: 5px;
                    border-color: @primary-color;
                }
            }
        }
        .input_box{
            width: 100%;
            height: 50px;
            position: relative;
            margin-top: 20px;
            transition: all .4s;
            >img{
                height: 30px;
                width: 30px;
                position: absolute;
                left: 10px;
                top: 10px;
            }
            >input{
                height: 100%;
                width: 100%;
                padding-left: 50px;
                border-style: none;
                border-radius: 4px;
                border: 1px solid #ddd;
                font-size: 14px;
            }
            >button{
                width: 121px;
                border: none;
                background-color: rgba(255, 255, 255, 0);
                position: absolute;
                right: 0;
                top: 0;
                height: 34px;
                line-height: 34px;
                padding: 0 20px;
                border-left: 1px solid #ddd;
                margin: 8px 0;
            }
        }
        .hide{
            height: 0;
            margin-bottom: 0!important;
            margin-top: 0!important;
            border-color: #fff!important;
            overflow: hidden;
        }
        .a_box{
            margin-top: 20px;
        }
        .button{
            margin-top: 20px;
            width: 100%;
            text-align: center;
            height: 50px;
            line-height: 50px;
            font-size: 15px;
        }
        .message{
            color: red;
            margin-top: 20px;
            text-align: center;
        }
    }
}
@keyframes show{
    0%{
        transform: scale(0);
    }
    100%{
        transform: scale(1);
    }
}
</style>