import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Vuelidate from 'vuelidate'
import Notifications from 'vue-notification'
// import Loading from 'vue-loading-overlay'
import VueLoading from 'vuejs-loading-plugin'

Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(Notifications);
// Vue.use(Loading);
Vue.use(VueLoading, {
    text: 'صبر کنید...', // default 'Loading',
    classes : ['isansFont']
});

new Vue({
    router,
    store,
    Vuelidate,
    render: function (h) {
        return h(App)
    }
}).$mount('#app');