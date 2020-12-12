/*
 * @Descripttion:
 * @version:
 * @Author: jwj
 * @Date: 2020-10-13 19:29:04
 * @LastEditors: jwj
 * @LastEditTime: 2020-12-12 14:49:12
 */
import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/auth-redirect', '/bind', '/register']
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.query.logOut === 'Y') {
    store.dispatch('FedLogOut').then(() => {
      location.reload() // 为了重新实例化vue-router对象 避免bug
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
