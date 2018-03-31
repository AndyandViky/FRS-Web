import {request} from './axios';

// 首页数据
export const indexData = (data) => request('/config/index', data, 'get');

// 传输方式
export const deviceType = (data) => request('/device/website/list', data, 'get');

// 登录
export const login = (data) => request('/user/login', data, 'post');

// 获取用户信息
export const userInfo = (data) => request('/user/info', data, 'get');

// 获取验证码
export const getVCode = (data) => request('/VCode/send', data, 'post');

// 注册
export const registerForTourist = (data) => request('/user/registerForTourist', data, 'post');

// 注册
export const registerForAdvertiser = (data) => request('/user/registerForAdvertiser', data, 'post');
