import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import currencyFilter from './filters/currency.js';

import 'bootstrap'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(Loading);
Vue.component('Loading', Loading);
// 全域註冊
Vue.filter('currency', currencyFilter);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  // console.log(to);
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
    axios.post(api).then((response) => {
      console.log(response.data.message)
      if (response.data.success) {
        next()
      } else {
        next({
          path: '/'
        })
      }
    })
  } else {
    next()
  }
})
