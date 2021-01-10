/*
 * @Descripttion:
 * @version:
 * @Author: jwj
 * @Date: 2020-10-13 19:29:04
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-10 22:11:55
 */
import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken, setToken } from '@/utils/auth'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/auth-redirect', '/bind', '/register']
router.beforeEach((to, from, next) => {
  if (to.query.token) {
    setToken(to.query.token)
  }
  NProgress.start()
  if (to.query.logOut === 'Y') {
    console.log(to.query.logOut, 'logout')
    store.dispatch('FedLogOut').then(() => {
      console.log('实例化')
      // location.reload() // 为了重新实例化vue-router对象 避免bug
      next('/')
    }).catch(() => {
      next('/')
    })
  } else {
    next()
  }
  // next()
})

router.afterEach(() => {
  NProgress.done()
})
