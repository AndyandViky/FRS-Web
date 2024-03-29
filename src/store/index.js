import Vue from 'vue';
import Vuex from 'vuex';
import { getToken, setToken, removeToken } from '@/help/auth.js';
import { User } from '../api';
import { baseUrl } from '@/help/env';

Vue.use(Vuex);

const state = {
    user: {},
    token: getToken(),
    area: []
};

const getters = {
    token: state => state.token,
    residentAuth: state => state.user.is_verify,
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
        });
    },
    SetUser({ commit }, user) {
        return new Promise((resolve, reject) => {
            user.avatar = user.avatar ? baseUrl + user.avatar.substring(6) : "";
            commit('SET_USER', user);
            resolve();
        });
    },
    // 获取用户信息
    GetInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            User.userInfo().then(result => {
                result.user.is_verify = result.isVerify;
                result.user.avatar = result.user.avatar ? baseUrl + result.user.avatar.substring(6) : "";
                commit('SET_USER', result.user);
                resolve(result.user);
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
