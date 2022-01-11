import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import axios from 'axios'
import http from './util/http'
import beforeEach from './router/beforeEach'

Vue.config.productionTip = false
// Vue.prototype.$axios = axios
Vue.prototype.$http = http
Vue.use(ElementUI)
beforeEach(router)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
