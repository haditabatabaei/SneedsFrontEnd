import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Vuelidate from 'vuelidate'
import Notifications from 'vue-notification'
import VueLoading from 'vuejs-loading-plugin';
import VueWindowSize from 'vue-window-size';
import VueRecord from '@codekraft-studio/vue-record'


Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(Notifications);
Vue.use(VueWindowSize);
Vue.use(VueRecord);
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
