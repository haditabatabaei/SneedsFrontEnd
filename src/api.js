import axios from 'axios';
import store from './store';
import router from './router';

const api = axios.create({
    baseURL: '/',
});

api.interceptors.response.use(response => {
    return response;
}, error => {
    const originalRequest = error.config;
    if (error.response.status != 401) {
        return error;
    } else if(originalRequest.url != `${store.getters.getApi}/auth/jwt/token/`) {
        axios.post(`${store.getters.getApi}/auth/jwt/token/refresh/`, {'token': originalRequest.headers.Authorization.replace("JWT ", "")}).then(response => {
            store.commit('setToken', response.data.token);
            store.commit('setExpires', response.data.expires);
            store.commit('setLoggedInStatus', true);
            axios.request(originalRequest).then(response => {
                return new Promise((resolve, reject) => {
                    resolve(response);
                })
            }).catch(error => {
                return new Promise((resolve, reject) => {
                    reject(error);
                })
            })
        }).catch(error => {
            store.dispatch('/logout');
            router.push('/login');
        })
    }
});

export default api;