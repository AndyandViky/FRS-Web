import Vue from 'vue';
import Vuex from 'vuex';
import { getToken, setToken, removeToken } from '@/help/auth.js';
import { User } from '../api';

Vue.use(Vuex);

const state = {
    user: {},
    token: getToken(),
    area: []
};

const getters = {
    token: state => state.token,
    residentAuth: state => state.user.types,
    user: state => state.user
};

const mutations = {
    jump(state, status) {
        state.menuStatus = status;
    },
    SET_TOKEN: (state, token) => {
        state.token = token;
    },
    SET_USER: (state, user) => {
        state.user = user;
    },
};

const actions = {
    SetToken({ commit }, token) {
        return new Promise((resolve, reject) => {
            setToken(token);
            commit('SET_TOKEN', token);
            resolve();
        }).catch(error => {
            reject(error);
        });
    },
    // 获取用户信息
    GetInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            User.userInfo().then(result => {
                commit('SET_USER', result);
                console.log(result);
                resolve(result);
            }).catch(error => {
                reject(error);
            });
        });
    },

    // 登出
    LogOut({ commit, state }) {
        commit('SET_TOKEN', '');
        commit('SET_USER', {});
        removeToken();
    },
};

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
});
