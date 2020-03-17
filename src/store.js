import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: localStorage.getItem('token') || '',

        expires: localStorage.getItem('expires') || '',

        userInfo: JSON.parse(localStorage.getItem('userInfo')) || {
            "id": '',
            "user_type": '',
            'consultant': ''
        },

        inputUser: {},

        user: {},

        api: 'http://37.152.182.253:8000',

        authApi: 'http://37.152.182.253:8000',

        stash: [],

        mobileMenuShow : true,

        timezoneSafe : ((Intl.DateTimeFormat().resolvedOptions().timeZone).replace('/', '-')),

        timezone : Intl.DateTimeFormat().resolvedOptions().timeZone,
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
            state.expires = '';
            state.user = {};
            state.inputUser = {};
            state.userInfo = {"id": '', "user_type": '', 'consultant': ''};
        },

        setUser(state, newUser) {
            state.user = newUser;
        },

        setInputUser(state, inputUser) {
            state.inputUser = inputUser;
        },

        setToken(state, newToken) {
            localStorage.setItem('token', newToken);
            state.token = newToken;
        },

        setExpires(state, newExpires) {
            state.expires = newExpires;
            localStorage.setItem('expires', newExpires);
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

        removeItemFromStash(state, itemToRemoved) {
            state.stash = state.stash.filter( val => val.datestart != itemToRemoved.datestart && val.dateend != itemToRemoved.dateend );
        }
    },
    actions: {
        async getUserMeta({commit}) {
            console.log("Getting user key");

            let result = await axios.get(`${this.getters.getApi}/auth/my-account/`, this.getters.httpConfig);
            console.log(result);
            commit('setUserId', result.data.id);
            commit('setUserType', result.data.user_type);
            commit('setUserConsultant', result.data.consultant);
        },

        async getUserWithId({commit}, userId) {
            console.log("Getting user with key", userId);
            let result = await axios.get(`${this.getters.getApi}/auth/accounts/${userId}/`, this.getters.httpConfig);
            console.log(result);
            commit('setUser', result.data);
            commit('setInputUser', JSON.parse(JSON.stringify(result.data)));
        },

        async login({commit}, user) {
            console.log("login payload :", user);
            let loginResult = await axios.post(`${this.getters.getApi}/auth/jwt/token/`,user , this.getters.httpConfig);
            console.log(loginResult);
            commit('setToken', loginResult.data.token);
            commit('setExpires', loginResult.data.expires);
            commit('setLoggedInStatus', true);
        },

        async register({commit}, user) {
            console.log("register payload", user);
            let registerResult = await axios.post(`${this.getters.getApi}/auth/accounts/`, user, this.getters.httpConfig);
            commit('setToken', registerResult.data.token_response.token);
            commit('setExpires', registerResult.data.token_response.expires);
            commit('setLoggedInStatus', true);
        },

        async edit({commit}, user) {
            console.log('update user with ', user);
            let editResult = await axios.put(`${this.getters.getApi}/auth/accounts/${this.getters.getUserInfo.id}`, user, this.getters.httpConfig);
            console.log(editResult);
        },

        logout({commit}) {
            commit('logout');
        },
    },
    getters: {
        isLoggedIn: state => !!state.token,

        getToken: state => state.token,

        getExpires: state => state.expires,

        getUser: state => state.user,

        getUserInfo: state => state.userInfo,

        getInputUser: state => state.inputUser,

        getApi: state => state.api,

        getAuthApi: state => state.authApi,

        getStash: state => state.stash,

        getMobileMenuShow : state => state.mobileMenuShow,

        httpConfig : state => {
            if(state.token) {
                return {
                    headers : {
                        "Authorization" : `JWT ${state.token}`,
                        "Content-Type" : "application/json",
                        "CLIENT-TIMEZONE" : state.timezone,
                        "origin" : "http://37.152.182.253"
                    },
                    timeout: 10000,
                }
            } else {
                return {
                    headers : {
                        "Content-Type" : "application/json",
                        "CLIENT-TIMEZONE" : state.timezone,
                        "origin" : "http://37.152.182.253"
                    },
                    timeout: 10000,
                }

            }
        },

        timezone : state => state.timezone,

        timezoneSafe: state => state.timezoneSafe,

        isiran : state => state.timezoneSafe === 'Asia-Tehran',

        locale : state => {
            if (state.timezoneSafe === 'Asia-Tehran') {
                return 'fa';
            } else {
                return 'en'
            }
        }
    }
})
