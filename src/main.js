// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import '@/assets/plugins/amazeui.min.js';
import '@/assets/plugins/normalize.css';
import '@/assets/plugins/animation.less';
import '@/assets/plugins/font-awesome.min.css';
import '@/assets/plugins/amazeui.min.css';
import '@/assets/plugins/amazeui.lazyload.min.js';
import '@/assets/styles/site.less';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next();
});

router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {
        App
    }
});
