import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: localStorage.getItem('token') || '',

        expires: localStorage.getItem('expires') || '',

        userIsLoggedIn: false,

        userInfo: {
            "user_pk": localStorage.getItem('user_pk') || '',
            "is_consultant": localStorage.getItem('is_consultant') || ''
        },

        inputUser: {},

        user: {},

        api: 'http://193.176.241.131:8000/',

        authApi: 'http://193.176.241.131:8000/',
    },
    mutations: {
        setLoggedInStatus(state, loggedInStatus) {
            state.userIsLoggedIn = loggedInStatus;
        },

        logout(state) {
            state.token = '';
            state.expires = '';
            state.userIsLoggedIn = false;
            state.user = {};
            state.inputUser = {};
            state.userInfo = {"user_pk": '', "is_consultant": ''};

            localStorage.clear();
        },

        setUser(state, newUser) {
            state.user = newUser;
        },

        setInputUser(state, inputUser) {
            state.inputUser = inputUser;
        },

        setToken(state, newToken) {
            state.token = newToken;
            localStorage.setItem('token', newToken);
        },

        setExpires(state, newExpires) {
            state.expires = newExpires;
            localStorage.setItem('expires', newExpires);
        },

        setUserPk(state, pk) {
            state.userInfo.user_pk = pk;
            localStorage.setItem('user_pk', pk);
        },

        setUserConsultantStatus(state, cs) {
            state.userInfo.is_consultant = cs;
            localStorage.setItem('is_consultant', cs);
        }
    },
    actions: {
        getUserKey({commit}) {
            console.log("Getting user key");
            return new Promise((resolve, reject) => {
                //performing get request
                axios({
                    url: this.getters.getApi + 'account/my-account/',
                    method: 'GET',
                    headers: {
                        "Authorization": "JWT " + this.getters.getToken,
                        "Content-Type": "application/json",
                    }
                })
                    .then((response) => {
                        console.log(response);
                        commit('setUserPk', response.data.user_pk);
                        commit('setUserConsultantStatus', response.data.is_consultant)
                        resolve(response);
                    }).catch((error) => {
                    reject(error);
                })
            })
        },

        getUserWithKey({commit}, userKey) {
            console.log("Getting user with key", userKey);
            return new Promise((resolve, reject) => {
                //performing get request
                axios({
                    url: this.getters.getApi + 'auth/accounts/' + userKey + '/',
                    method: 'GET',
                    headers: {
                        "Authorization": "JWT " + this.getters.getToken,
                        "Content-Type": "application/json",
                    }
                })
                    .then((response) => {
                        console.log(response);
                        commit('setUser', response.data);
                        commit('setInputUser', JSON.parse(JSON.stringify(response.data)));
                        resolve(response);
                    }).catch((error) => {
                    reject(error);
                })
            })
        },

        login({commit}, user) {
            return new Promise((resolve, reject) => {
                //setting payload
                window.console.log("login payload :", user);

                //performing post register request
                axios({url: this.getters.getApi + 'auth/jwt/token/', data: user, method: 'POST'})
                    .then((response) => {
                        commit('setToken', response.data.token);
                        commit('setExpires', response.data.expires);
                        commit('setLoggedInStatus', true);
                        resolve(response);
                    }).catch((error) => {
                    reject(error);
                })
            })
        },

        register({commit}, user) {
            return new Promise((resolve, reject) => {
                //setting payload
                window.console.log("register payload :", user);

                //performing post register request
                axios({url: this.getters.getApi + 'auth/accounts/', data: user, method: 'POST'})
                    .then((response) => {
                        commit('setToken', response.data.token_response.token);
                        commit('setExpires', response.data.token_response.expires);
                        commit('setLoggedInStatus', true);
                        resolve(response);
                    }).catch((error) => {
                    reject(error);
                })
            })
        },

        edit({commit}, user) {
            return new Promise((resolve, reject) => {
                //setting payload
                window.console.log("edit payload :", user);

                //performing post register request
                axios({
                    url: this.getters.getApi + 'auth/accounts/' + this.getters.getUserInfo.user_pk + '/',
                    data: user,
                    method: 'PUT',
                    headers: {
                        'Authorization': 'JWT ' + this.getters.getToken,
                        'Content-Type': 'application/json',
                    }
                })
                    .then((response) => {

                        // commit('setToken', response.data.token_response.token);
                        // commit('setExpires', response.data.token_response.expires);
                        // commit('setLoggedInStatus', true);
                        resolve(response);
                    }).catch((error) => {
                    reject(error);
                })
            })
        },

        logout({commit}) {
            //reset states
            commit('logout');
        },
    }, getters: {
        isLoggedIn: state => state.userIsLoggedIn || (state.token !== ''),

        getToken: state => state.token,

        getExpires: state => state.token,

        getUser: state => state.user,

        getUserInfo: state => state.userInfo,

        getInputUser: state => state.inputUser,

        getApi:
            state => state.api,
        getAuthApi:
            state => state.authApi,
        downloadedBooklets:
            state => state.downloadedBooklets,
        likedPosts:
            state => state.likedPosts,
    }
})
