import Vue from 'vue';
import Router from 'vue-router';
import Layout from '../views/layout/layout'; // 头尾
import Index from '../views/index/index'; // 主页
import About from '../views/about/about';
import Communications from '../views/communications/communications'; // 互动交流
import CommunicationDetail from '../views/communications/detail'; // 互动交流详情
import User from '../views/user/user'; // 用户详情
import Verify from '../views/user/verify'; // 业主验证身份
import AgeTest from '../views/user/ageTest'; // 业主验证身份

Vue.use(Router);

const vueRouter = new Router({
    routes: [{
        path: '/',
        component: Layout,
        children: [
            {path: '', redirect: '/index', meta: {keepAlive: true}},
            {path: '/index', component: Index, meta: {keepAlive: true, title: '人脸门禁联盟'}},
            {path: '/about', component: About, meta: {keepAlive: true, title: '人脸门禁联盟-关于我们'}},
            {path: '/communications', component: Communications, meta: {keepAlive: true, title: '人脸门禁联盟-互动交流'}},
            {path: '/communications/detail', component: CommunicationDetail, meta: {keepAlive: true, title: '人脸门禁联盟-互动交流-详情'}},
            {path: '/user', component: User, meta: {keepAlive: true, title: '人脸门禁联盟-用户信息'}},
            {path: '/verify', component: Verify, meta: {keepAlive: true, title: '人脸门禁联盟-业主校验'}},
            {path: '/age/test', component: AgeTest, meta: {keepAlive: true, title: '人脸门禁联盟-跨年领测试'}},
        ]
    }],
});

export default vueRouter;
