import {
    baseUrl
} from './env';
import axios from 'axios';
import qs from 'qs';
import { getToken } from '@/help/auth';
import store from '@/store';

// axios 配置
axios.defaults.timeout = 5000;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = baseUrl;

// POST传参序列化
axios.interceptors.request.use((config) => {
    config.headers['Content-Type'] = 'application/json';
    // if (config.method === 'post') {
    //     config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    //     config.data = qs.stringify(config.data);
    // }
    // console.log(store.getters.token);
    if (store.getters.token) {
        // console.log("1");
        config.headers['authorization'] = 'Bearer ' + getToken(); // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    }
    return config;
}, (error) => {
    console.log('错误的传参');
    return Promise.reject(error);
});

// 返回状态判断
axios.interceptors.response.use((res) => {
    if (!res.data.success) {
        return Promise.reject(res);
    }
    return res;
}, (error) => {
    // console.log('网络异常');
    return Promise.reject(error);
});

export function request(api, datas, method = 'get') {
    let params, data;
    if (method === 'get') {
        params = datas;
    } else {
        data = datas;
        // console.log(data);
    }
    return new Promise((resolve, reject) => {
        axios.request({
            url: api,
            method: method,
            // headers: {
            //     'Content-Type': 'application/json'
            // },
            params: params,
            data: data
        }).then(response => {
            const res = response.data;
            if (res.success) {
                resolve(res.data);
            } else {
                reject(res.error);
            }
        }, err => {
            reject(err);
        })
        .catch((error) => {
            reject(error);
        });
    });
}
