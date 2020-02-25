import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Vuelidate from 'vuelidate'
import Notifications from 'vue-notification'
import VueLoading from 'vuejs-loading-plugin'

Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(Notifications);
Vue.use(VueLoading, {
    text: 'صبر کنید...',
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
