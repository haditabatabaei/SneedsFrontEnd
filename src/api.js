import axios from 'axios';
import store from './store';
import router from './router';

const api = axios.create({
    baseURL: '/',
});

console.log('response interceptor added.');
api.interceptors.response.use(response => {
    return response;
}, error => {
    console.log('api interceptor catch error, printing input');
    console.dir(error);
    console.dir(error.config);
    console.log(error.response.status);
    const originalRequest = error.config;
    const originalStatus = error.response.status;
    if (originalStatus != 401) {
        console.log('api interceptor catch error other than 401');
        return error;
    } else if (originalRequest.url != `${store.getters.getApi}/auth/jwt/token/`) {
        console.log('api error interceptor catch error 401 with url other than login, launching refresh token process');
        axios.post(`${store.getters.getApi}/auth/jwt/token/refresh/`, {'refresh': store.getters.getRefreshToken}).then(response => {
            console.log('post fired to get new refresh token:', response);
            store.commit('setToken', response.data.access);
            store.commit('setRefreshToken', response.data.refresh);
            store.commit('setLoggedInStatus', true);
            console.log('firing previous failed request');
            if (originalRequest.headers.hasOwnProperty("Authorization")) {
                originalRequest.headers.Authorization = `Bearer ${store.getters.getToken}`;
            }
            axios.request(originalRequest).then(response => {
                console.log('previous request done', response);
                return new Promise((resolve,reject) => {
                    resolve(response);
                })
            }).catch(error => {
                console.log('previous request failed', error);
                return new Promise((resolve,reject) => {
                    reject(error);
                })
            }).finally(() => {
                if(router.currentRoute.name != "user-payment-accept") {
                    console.log('refreshing the page');
                    router.go(0);
                }
            })
        }).catch(error => {
            console.log('Refreshing token error!', error.response)
            store.dispatch('logout');
            router.push('/auth/login');
            window.alert('ظاهرا نشست شما منقضی شده است. دوباره وارد حساب کاربری خود شوید...')
        })
    } else {
        return error;
    }
});

export default api;