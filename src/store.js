import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: localStorage.getItem('token') || '',

        expires: localStorage.getItem('expires') || '',

        userIsLoggedIn: false,

        userInfo: JSON.parse(localStorage.getItem('userInfo')) || {
            "id": '',
            "user_type": '',
            'consultant': ''
        },

        inputUser: {},

        user: {},

        api: 'http://37.152.182.253:8000',

        authApi: 'http://37.152.182.253:8000',

        cart: null,

        stash: [],

        mobileMenuShow : true,
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
            state.token = '';
            state.expires = '';
            state.userIsLoggedIn = false;
            state.user = {};
            state.inputUser = {};
            state.userInfo = {"id": '', "user_type": '', 'consultant': ''};

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

        setCart(state, cart) {
            state.cart = cart;
        },

        setStash(state, newStash) {
            state.stash = newStash;
        },

        addItemToStash(state, newItem) {
            state.stash.push(newItem);
        },

        removeItemFromStash(state, itemToRemoved) {
            state.stash = state.stash.filter(function (val) {
                return val.datestart != itemToRemoved.datestart && val.dateend != itemToRemoved.dateend;
            })
        }
    },
    actions: {
        async getUserMeta({commit}) {
            console.log("Getting user key");

            let result = await axios.get(`${this.getters.getApi}/auth/my-account/`, {
                headers : {
                    "Authorization" : `JWT ${this.getters.getToken}`
                },
                timeout : 5000
            });
            console.log(result);
            commit('setUserId', result.data.id);
            commit('setUserType', result.data.user_type);
            commit('setUserConsultant', result.data.consultant);
        },

        async getUserWithId({commit}, userId) {
            console.log("Getting user with key", userId);
            let result = await axios.get(`${this.getters.getApi}/auth/accounts/${userId}/`, {
                headers : {
                    "Authorization" : `JWT ${this.getters.getToken}`
                },
                timeout: 5000
            });
            console.log(result);
            commit('setUser', result.data);
            commit('setInputUser', JSON.parse(JSON.stringify(result.data)));
        },

        async login({commit}, user) {
            console.log("login payload :", user);
            let loginResult = await axios.post(`${this.getters.getApi}/auth/jwt/token/`, user, {timeout: 5000});
            console.log(loginResult);
            commit('setToken', loginResult.data.token);
            commit('setExpires', loginResult.data.expires);
            commit('setLoggedInStatus', true);
        },

        async register({commit}, user) {
            console.log("register payload", user);
            let registerResult = await axios.post(`${this.getters.getApi}/auth/accounts/`, user, {timeout : 5000});
            commit('setToken', registerResult.data.token_response.token);
            commit('setExpires', registerResult.data.token_response.expires);
            commit('setLoggedInStatus', true);
        },

        async edit({commit}, user) {
            console.log('update user with ', user);
            let editResult = await axios.put(
                `${this.getters.getApi}/auth/accounts/${this.getters.getUserInfo.id}`,
                user,
                {
                    headers : {
                        "Authorization" : `JWT ${this.getters.getToken}`
                    },timeout: 5000
                }
            );
            console.log(editResult);
        },

        putCartRequest({commit}, config) {
            return new Promise((resolve, reject) => {
                axios({
                    url: this.getters.getApi + 'cart/carts/' + config.cartId + '/',
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'JWT ' + this.getters.getToken,
                    },
                    data: config.payload,
                }).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            })
        },

        getCart({commit}) {
            return new Promise((resolve, reject) => {
                axios({
                    url: this.getters.getApi + 'cart/carts/',
                    method: 'GET',
                    headers: {
                        'Authorization': 'JWT ' + this.getters.getToken,
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    commit('setCart', response.data[0]);
                    console.log('response from getCart in :', response);
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            })
        },

        postCart({commit}, payload) {
            return new Promise((resolve, reject) => {
                axios({
                    url: this.getters.getApi + 'cart/carts/',
                    method: 'POST',
                    headers: {
                        'Authorization': 'JWT ' + this.getters.getToken,
                        'Content-Type': 'application/json',
                    },
                    data: payload,
                }).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            })
        },

        deleteCart({commit}, cartId) {
            return new Promise((resolve, reject) => {
                axios({
                    url: this.getters.getApi + 'cart/carts/' + cartId + '/',
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'JWT ' + this.getters.getToken,
                        'Content-Type': 'application/json',
                    },
                }).then(response => {
                    commit('setCart', {});
                    resolve(response);
                }).catch(error => {
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

        getCart: state => state.cart,

        getApi: state => state.api,

        getAuthApi: state => state.authApi,

        getStash: state => state.stash,

        getMobileMenuShow : state => state.mobileMenuShow
    }
})
