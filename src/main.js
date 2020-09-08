import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import './assets/styles/element-variables.scss'
import './assets/styles/index.scss' // global css

Vue.prototype.baseURL = process.env.VUE_APP_BASE_API
Vue.config.productionTip = false

Vue.use(Element)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
