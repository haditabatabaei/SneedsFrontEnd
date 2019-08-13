import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false
Vue.use(Vuelidate);

new Vue({
    router,
    store,
    Vuelidate,
    render: function (h) {
        return h(App)
    }
}).$mount('#app')

