import {
    baseUrl
} from './env';
import axios from 'axios';
import qs from 'qs';
import { getToken } from '@/help/auth';
import store from '@/store';
import { Message } from 'element-ui';

// axios 配置
axios.defaults.timeout = 5000;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = baseUrl;

// POST传参序列化
axios.interceptors.request.use((config) => {
    config.headers['Content-Type'] = 'application/json';
    if (store.getters.token) {
        config.headers['authorization'] = 'Bearer ' + getToken();
    }
    return config;
}, (error) => {
    Message.error('网络异常');
    return Promise.reject(error);
});

// 返回状态判断
axios.interceptors.response.use((res) => {
    if (res.data.code !== 1) {
        Message.error(res.data.msg);
        return Promise.reject(res);
    }
    return res;
}, (error) => {
    Message.error('网络异常');
    return Promise.reject(error);
});

export function request(api, datas, method = 'get') {
    let params, data;
    if (method === 'get') {
        params = datas;
    } else {
        data = datas;
    }
    return new Promise((resolve, reject) => {
        axios.request({
            url: api,
            method: method,
            params: params,
            data: data
        }).then(response => {
            const res = response.data;
            resolve(res.data);
        })
        .catch((error) => {
            reject(error);
        });
    });
}
