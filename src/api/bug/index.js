import {request} from '../../help/axios.js';

// 提交故障
export const addBug = (data) => request('/bug', data, 'post');
