import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api'
import certificate from "./certificate";
import destination from "./destination";
import education from "./education";
import paper from "./paper"
import simpleValidations from "./simpleValidations"
import analysisform from "./analysisform";
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        analysisform,
        certificate,
        destination,
        education,
        paper,
        simpleValidations
    },
    state: {
        token: localStorage.getItem('token') || '',

        refreshToken: localStorage.getItem('refresh_token') || '',

        userInfo: JSON.parse(localStorage.getItem('userInfo')) || {
            "id": '',
            "user_type": '',
            'consultant': ''
        },

        inputUser: {},

        user: JSON.parse(localStorage.getItem('user')) || {
            "email": '',
            "first_name": '',
            "last_name": '',
            "phone_number": ''
        },

        api: process.env.VUE_APP_ROOT_API,

        authApi: process.env.VUE_APP_ROOT_API,

        stash: [],

        mobileMenuShow: true,

        timezoneSafe: ((Intl.DateTimeFormat().resolvedOptions().timeZone).replace('/', '-')),

        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
    mutations: {
        setLoggedInStatus(state, loggedInStatus) {
            state.userIsLoggedIn = loggedInStatus;
        },

        setMobileMenuShow(state, mobileMenuShowStatus) {
            state.mobileMenuShow = mobileMenuShowStatus;
        },

        toggleMobileMenuShow(state) {
            state.mobileMenuShow = !state.mobileMenuShow;
        },

        logout(state) {
            localStorage.clear();
            state.token = '';
            state.refreshToken = '';
            state.user = {};
            state.inputUser = {};
            state.stash = [];
            state.userInfo = {"id": '', "user_type": '', 'consultant': ''};
        },

        setUser(state, newUser) {
            localStorage.setItem('user', JSON.stringify(newUser));
            state.user = newUser;
        },

        setInputUser(state, inputUser) {
            state.inputUser = inputUser;
        },

        setToken(state, newToken) {
            localStorage.setItem('token', newToken);
            state.token = newToken;
        },

        setRefreshToken(state, newRefreshToken) {
            localStorage.setItem('refresh_token', newRefreshToken);
            state.refreshToken = newRefreshToken;
        },

        setUserId(state, id) {
            state.userInfo.id = id;
            localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
        },

        setUserType(state, userType) {
            state.userInfo.user_type = userType;
            localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
        },

        setUserConsultant(state, consultant) {
            state.userInfo.consultant = consultant;
            localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
        },

        setStash(state, newStash) {
            state.stash = newStash;
        },

        addItemToStash(state, newItem) {
            state.stash.push(newItem);
        },

        removeSlotFromStashById(state, slotIdToRemove) {
            state.stash = state.stash.filter(slot => slotIdToRemove != slot.id);
        },

        removeItemFromStash(state, {itemToRemove, type}) {
            console.log('remove item fired by', {itemToRemove, type});
            switch (type) {
                case 'time-slot':
                    state.stash = state.stash.filter(slot => slot.id != itemToRemove.id);
                    itemToRemove.selected = false;
                    break;
            }
        }
    },
    actions: {
        async getUserMeta({commit}) {
            console.log("Getting user key");
            console.log("http config:", this.getters.httpConfig);
            let result = await api.get(`${this.getters.getApi}/auth/my-account/`, this.getters.httpConfig);
            console.log(result);
            commit('setUserId', result.data.id);
            commit('setUserType', result.data.user_type);
            commit('setUserConsultant', result.data.consultant);
        },

        async getUserWithId({commit}, userId) {
            console.log("Getting user with key", userId);
            let result = await api.get(`${this.getters.getApi}/auth/accounts/${userId}/`, this.getters.httpConfig);
            console.log(result);
            commit('setUser', result.data);
            commit('setInputUser', JSON.parse(JSON.stringify(result.data)));
        },

        async login({commit, dispatch}, user) {
            console.log("login payload :", user);
            console.log('http config', this.getters.httpConfig);
            let loginResult = await api.post(`${this.getters.getApi}/auth/jwt/token/`, user, this.getters.httpConfig);
            console.log(loginResult);
            commit('setToken', loginResult.data.access);
            commit('setRefreshToken', loginResult.data.refresh);
            commit('setLoggedInStatus', true);
            await dispatch('getUserMeta')
            await dispatch('getUserWithId', this.getters.getUserInfo.id);
        },

        async register({commit, dispatch}, user) {
            console.log("register payload", user);
            let registerResult = await api.post(`${this.getters.getApi}/auth/accounts/`, user, this.getters.httpConfig);
            commit('setToken', registerResult.data.token_response.access);
            commit('setRefreshToken', registerResult.data.token_response.refresh);
            commit('setLoggedInStatus', true);
            await dispatch('getUserMeta');
            await dispatch('getUserWithId', this.getters.getUserInfo.id);
        },

        async edit({commit}, user) {
            console.log('update user with ', user);
            let editResult = await api.put(`${this.getters.getApi}/auth/accounts/${this.getters.getUserInfo.id}/`, user, this.getters.httpConfig);
            console.log(editResult);
        },

        logout({commit}) {
            commit('logout');
            commit('setDetailedForm', null)
        },
    },
    getters: {
        isLoggedIn: state => !!state.token && !!state.refreshToken,

        isConsultant: state => state.userInfo.user_type === 'consultant',

        getToken: state => state.token,

        getRefreshToken: state => state.refreshToken,

        getUser: state => state.user,

        getUserInfo: state => state.userInfo,

        getInputUser: state => state.inputUser,

        getApi: state => state.api,

        getAuthApi: state => state.authApi,

        getStash: state => state.stash,

        getMobileMenuShow: state => state.mobileMenuShow,

        multipartHttpConfig: state => {
            if (state.token && state.refreshToken) {
                return {
                    headers: {
                        "Authorization": `Bearer ${state.token}`,
                        "Content-Type": "multipart/form-data",
                        "CLIENT-TIMEZONE": state.timezone,
                    },
                }
            } else {
                return {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "CLIENT-TIMEZONE": state.timezone,
                    },
                }
            }
        },

        httpConfig: state => {
            if (state.token && state.refreshToken) {
                return {
                    headers: {
                        "Authorization": `Bearer ${state.token}`,
                        "Content-Type": "application/json",
                        "CLIENT-TIMEZONE": state.timezone,
                    },
                    timeout: 10000,
                }
            } else {
                return {
                    headers: {
                        "Content-Type": "application/json",
                        "CLIENT-TIMEZONE": state.timezone,
                    },
                    timeout: 10000,
                }
            }
        },

        timezone: state => state.timezone,

        timezoneSafe: state => state.timezoneSafe,

        isiran: state => state.timezoneSafe === 'Asia-Tehran',

        locale: state => {
            if (state.timezoneSafe === 'Asia-Tehran') {
                return 'fa';
            } else {
                return 'en'
            }
        },
    }
})
