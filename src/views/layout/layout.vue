<script>
import {baseUrl} from '@/help/env';
import login from '@/views/layout/login';
import {mapState, mapActions} from 'vuex';
export default {
    name: 'layout',
    data () {
        return {
            baseUrl,
            newsCategory: null,
            loginShow: false,
            loginState: false
        };
    },
    async mounted() {
        // 获取用户信息
        await this.GetInfo();
    },
    components: {
        login
    },
    computed: {
        ...mapState([
            'user'
        ]),
    },
    methods: {
        ...mapActions([
            'GetInfo',
            'LogOut'
        ]),

        login(data) {
            this.loginShow = false;
            this.GetInfo();
        },
        logout() {
            this.$confirm('此操作将退出登录', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.LogOut();
                this.$message({
                    type: 'success',
                    message: '登出!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消登出'
                });
            });
        }
    }
};

</script>
<template>
    <div id="app">
        <!-- <login :show="loginShow" @close="loginShow=false;" @login="login"></login> -->
        <div class="site-head">
            <div class="row">
                <div class="container ">
                    <div class="left head-left">
                        <router-link :style="{backgroundImage:'url(/static/images/logo2-3.png)'}" to="index">.</router-link>
                    </div>
                    <div class="clear"></div>
                </div>
            </div>
            <div class="row" data-am-sticky>
                <div class="container">
                    <div class="right head-right">

                        <login v-if="!Object.keys(this.user).length"></login>

                        <el-dropdown v-if="Object.keys(this.user).length">
                            <el-button>
                                <img v-if="!user.avatar" src="/static/images/user_avatar.png">
                                <img v-else :src="user.avatar">
                                <span>{{user.name}}</span>
                                <i class="el-icon-caret-bottom"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <router-link to="/user"><el-dropdown-item>个人中心</el-dropdown-item></router-link>
                                <el-dropdown-item><span @click="logout">安全退出</span></el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                    <ul class="head-menu">
                        <dl class="left ">
                            <a :style="{backgroundImage:'url(/static/images/logo2-2.jpeg)'}" href="/"></a>
                        </dl>
                        <li class="left"  v-bind:class="{active:$route.path.indexOf('index') !== -1 }"><router-link to="/index">首页</router-link></li>
                        <li class="left" v-bind:class="{active:$route.path.indexOf('communications') !== -1 }">
                            <router-link to="/communications">互动交流</router-link>
                        </li>
                        <li class="left" v-bind:class="{active:$route.path.indexOf('about') !== -1 }">
                            <router-link to="/about">关于我们</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <router-view></router-view>
        <div class="layout_footer">
            design by andy
        </div>
    </div>
</template>

<style lang="less">

@keyframes slideLeft {
    from {
        width: 0;
        transform: scale(0.2);
    }
    to {
        transform: scale(1);
    }
}

.site-head {
    .am-sticky {

        position: fixed!important;
        dl {
            height: 100%;
        }
        dl a {
            display: block; 
            background-size: auto 40%;
            background-repeat: no-repeat;
            background-position: center left;
            height: 100%;
            width: 80px;
            background-color: #fff;
            animation: slideLeft .3s ease-in-out both;
        }
        .head-right {
            height: 40px;
            top: 11px;
            animation: am-scale-up .3s;
        }
    }
    .row:first-child {
        background-color: @first-bg;
        border-bottom: 1px solid @line-color;
        height: 80px;
        z-index: 9999;
    }
    .row:last-child {
        height: 64px;
        background-color: @first-bg;
        alpha: .98;
        z-index: 2000;
        border-bottom: 1px solid @line-color;
    }
    .head-left {
        line-height: 80px;
        a {
            display: block;
            background-size: auto 45%;
            background-position: center left;
            background-repeat: no-repeat;
            padding-left: 190px;
            font-size: 18px;
            color: @primary-color;
        }
    }
    .phone{
        position: absolute;
        left: -170px;
        display: inline-flex;
        align-items: center;
        margin-right: 20px;
        >img{
            height: 35px;
            width: 35px;
            margin-right: 10px;
        }
        >div{
            >div:first-child{
                font-size: 10px;
                color: #888;
            }
        }
    }
    .head-right {
        position: absolute;
        top: -60px;
        height: 40px;
        right: 10px;
        .el-dropdown{
            >button{
                padding: 0;
                border:0;
                display: flex;
                align-items: center;
                >span{
                    display: flex;
                    align-items: center;
                   >img{
                        height: 40px;
                        width: 40px;
                        margin-right: 8px;
                        border-radius: 100%;
                    }
                    >span{
                        margin-right: 5px;
                    }
                    >i{
                        height: 10px;
                        color: #aaa;
                    } 
                }
            }   
        }
        .user_info{
            position: relative;
            display: flex;
            width: 100%;
            height: 100%;
            align-items: center;
            >img{
                height: 40px;
                width: 40px;
                margin-right: 8px;
            }
            >span{
                margin-right: 5px;
            }
            >i{
                height: 10px;
                color: #aaa;
            }
        }
    }
    .head-menu {
        height: 64px;

        li {
            margin-right: 34px;
            line-height: 64px;
            text-align: center;
            position: relative;
            a {
                color: @second-color;
                font-size: @sixth-size;
                display: block;
            }
        }
        li:after {
            position: absolute;
            left: 0;
            bottom: -1px;
            height: 4px;
            width: 100%;
            content: ' ';
            background-color: @primary-color;
            background-color: transparent\9;
            transform: scaleX(0);
            transition: all .6s cubic-bezier(.19, 1, .22, 1);
        }
        li:hover:after {
            transform: scaleX(1);
            background-color: @primary-color;
        }
        li:hover .head-menu-pop {
            display: block !important;
            opacity: 1;
            animation: am-slide-top .4s;
        }
        li.active:after {
            transform: scaleX(1);
            background-color: @primary-color;
        }
        li.active > a {
            color: @primary-color;
        }
    }
    .head-menu-pop {
        position: absolute;
        overflow: hidden;
        left: 50%;
        opacity: 0;
        display: none;
        margin-left: -57px;
        top: 65px;
        width: 114px;
        border: 1px solid #d4d4d4;
        background-color: #fff;
        line-height: 35px;
        padding: 18px 0;
        box-shadow: 2px 2px 8px rgba(0, 0, 0, .08);
        border-radius: 2px;
        z-index: 999;
        transition: all .2s;
        .block {
            display: block;
            color: @second-color;
            text-decoration: none;
            overflow: hidden;
        }
    }
}


// footer
.site-footer {
    background-color: @second-bg;
    .row {
        text-align: center;
        margin-bottom: 40px;
        color: @thrid-color;
        font-size: @fourth-size;
        line-height: @first-size;
    }
    .index-row-title{
        div:first-child{
            color: @thrid-color;
        }
        div:first-child:after{
            // display: none;
            color: @thrid-color;
        }
    }
}

.index-row {
    padding: 50px 0;
    text-align: center;
}

.index-row-title {
    text-align: center;
    margin-bottom: 50px;
    div:first-child {
        color: @second-color;
        font-size: @first-size;
        position: relative;
        margin-bottom: 20px;
    }
    // div:first-child:after {
    //     position: absolute;
    //     left: 50%;
    //     margin-left: -25px;
    //     bottom: -10px;
    //     height: 2px;
    //     width: 50px;
    //     content: ' ';
    //     background-color: @fourth-color;
    // }
    div:last-child {
        color: @fourth-color;
        font-size: @fifth-size;
    }
}

.layout_footer{
    height: 100px;
    background-color: @third-bg;
    color: @fourth-color;
    text-align: center;
    line-height: 100px;
}

</style>
