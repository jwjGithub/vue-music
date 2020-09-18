import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import './assets/styles/element-variables.scss'
import './assets/styles/index.scss' // global css

// 全局组件引入
import MusHeader from '@/components/page/MusHeader'
import MusFooter from '@/components/page/MusFooter'

Vue.prototype.baseURL = process.env.VUE_APP_BASE_API
Vue.config.productionTip = false

// 全局组件挂载
Vue.component('MusHeader', MusHeader)
Vue.component('MusFooter', MusFooter)
Vue.use(Element)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
