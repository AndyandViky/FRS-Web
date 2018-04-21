import {request} from '../help/axios.js';

const base = 'resident';
// 业主申请提交验证
export const verify = (data) => request(base + '/verify', data, 'put');

// 业主获取访客记录
export const getVisitors = (data) => request(base + '/visitors', data, 'get');

// 业主通过访问
export const approveVisitor = (data) => request(base + '/visitors', data, 'put');

// 提交故障
export const addBug = (data) => request(base + '/bug', data, 'post');

// 增加答案
export const addAnswer = (data) => request(base + '/answer', data, 'post');

// 提问
export const addQuestion = (data) => request(base + '/question', data, 'post');

// 点赞
export const addLike = (data) => request(base + '/like', data, 'post');

