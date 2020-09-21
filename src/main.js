import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './state/store'
import './registerServiceWorker'
import Vuelidate from 'vuelidate'
import Notifications from 'vue-notification'
import VueWindowSize from 'vue-window-size';
import VModal from 'vue-js-modal'
import { VueSpinners } from '@saeris/vue-spinners'
import * as Sentry from '@sentry/browser';
import api from './api';
import vueSmoothScroll from 'vue2-smooth-scroll'
import { Vue as VueIntegration } from '@sentry/integrations';
// Sentry.init({
//     dsn: 'https://cf45074bfa2d4151acd120f061285fbe@o379552.ingest.sentry.io/5204566',
//     integrations: [new VueIntegration({Vue, attachProps: true})],
// });
Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(Notifications);
Vue.use(VueWindowSize);
Vue.use(VueSpinners);
Vue.use(VModal);
Vue.use(vueSmoothScroll)
Vue.prototype.$api = api;

new Vue({
    router,
    store,
    Vuelidate,
    render: function (h) {
        return h(App)
    }
}).$mount('#app');
