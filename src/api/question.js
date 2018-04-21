import {request} from '../help/axios.js';

// 获取问答列表
export const getQuestions = (data) => request('/questions', data, 'get');

// 获取问答详情
export const getQuestion = (data) => request('/question', data, 'get');

