import {request} from '../../help/axios.js';

// 获取用户信息
export const userInfo = (data) => request('/user', data, 'get');

// 登录
export const login = (data) => request('/login', data, 'post');

// 注册
export const register = (data) => request('/register', data, 'post');

// 业主申请提交验证
export const verify = (data) => request('/verify', data, 'put');

// 业主获取访客记录
export const getVisitors = (data) => request('/visitors', data, 'get');

// 业主通过访问
export const approveVisitor = (data) => request('/visitors', data, 'put');

// 获取门禁记录
export const getCameraRecords = (data) => request('/camera/records', data, 'get');

// 获取用户人脸模型
export const getFaceModel = (data) => request('/face', data, 'get');

// 用户激活人脸模型
export const activeFace = (data) => request('/face/active', data, 'put');

// 访客申请访问
export const applyVisite = (data) => request('/visite', data, 'post');

