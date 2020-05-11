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
    console.log(error.response.status);
    const originalRequest = error.config;
    const originalStatus = error.response.status;
    if (originalStatus != 401) {
        console.log('api interceptor catch error other than 401');
        return Promise.reject(error);
    } else if (originalRequest.url != `${store.getters.getApi}/auth/jwt/token/`) {
        console.log('api error interceptor catch error 401 with url other than login, launching refresh token process');
        axios.post(`${store.getters.getApi}/auth/jwt/token/refresh/`, {'refresh': store.getters.getRefreshToken}).then(response => {
            console.log('post fired to get new refresh token:', response);
            store.commit('setToken', response.data.access);
            store.commit('setRefreshToken', response.data.refresh);
            store.commit('setLoggedInStatus', true);
            console.log('token refreshing confirmed good.');
            if (originalRequest.headers.hasOwnProperty("Authorization")) {
                originalRequest.headers.Authorization = `Bearer ${store.getters.getToken}`;
            }
            //if failed request was a payment request, then we should retry that and then we should redirect user to zarinpal payment gateway
            if (originalRequest.url.startsWith(`${store.getters.getApi}/payment/request/`)) {
                //retry this failed request and redirect user to zarinpal gateway
                console.log('encountering /payment/request/ failed. launching redirect again');
                axios.request(originalRequest).then(response => {
                    if (response.data.redirect) {
                        window.location.replace(response.data.redirect);
                    } else {
                        router.push('/user/payment/accept?refld=00000000');
                    }
                }).catch(error => {
                    if (error.response.status === 401) {
                        store.dispatch('logout');
                        router.push('/auth/login');
                        window.alert('ظاهرا نشست شما منقضی شده است. دوباره وارد حساب کاربری خود شوید...')
                    }
                });
            }
            //else if failed request was a payment accept request, we shouldn't retry that and we have to refresh the page so that it can fire that request and data update the same time
            else if (originalRequest.url.startsWith(`${store.getters.getApi}/payment/verify/`)) {
                //keep in mind that when this is happening, we are at the user-payment-confirm route
                //just refresh the page
                console.log('encountering /payment/verify situation, refreshing the page.');
                router.go(0);
            } else if (originalRequest.url.startsWith(`${store.getters.getApi}/cart/carts/`)) {
                axios.request(originalRequest).then(response => {
                    router.push(`/carts/${response.data.id}`);
                }).catch(error => {
                    store.dispatch('logout');
                    window.alert('ظاهرا نشست شما منقضی شده است. دوباره وارد حساب کاربری خود شوید...')
                    router.push('/auth/login');
                });
            } else {
                console.log('encountering normal retry mode, do')
                axios.request(originalRequest).then(response => {
                    console.log('previous request done', response);
                    router.go(0);
                    return Promise.resolve(response);
                }).catch(error => {
                    console.log('previous request failed', error);
                    return Promise.reject(error);
                })
            }
        }).catch(error => {
            console.log('Refreshing token error!', error.response);
            store.dispatch('logout');
            router.push('/auth/login');
            window.alert('ظاهرا نشست شما منقضی شده است. دوباره وارد حساب کاربری خود شوید...')
        })
    } else {
        return Promise.reject(error);
    }
});

export default api;