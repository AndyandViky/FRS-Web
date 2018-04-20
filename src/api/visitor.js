import {request} from '../help/axios.js';

const base = 'resident';
// 访客申请访问
export const applyVisite = (data) => request(base + '/visite', data, 'post');

