/*
 * @Descripttion:
 * @version:
 * @Author: jwj
 * @Date: 2020-10-13 19:29:04
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-27 21:29:44
 */
import router from './router'
import store from './store'
import NProgress from 'nprogress'
import { MessageBox } from 'element-ui'
import 'nprogress/nprogress.css'
import { getToken, setToken } from '@/utils/auth'

NProgress.configure({ showSpinner: false })

const whiteList = ['/index', '/auth-redirect', '/bind', '/register', '/register/musician', '/register/company', '/feedback']
router.beforeEach((to, from, next) => {
  if (to.query.token) {
    setToken(to.query.token)
  }
  NProgress.start()
  if (to.query.logOut === 'Y') {
    console.log(to.query.logOut, 'logout')
    store.dispatch('FedLogOut').then(() => {
      // location.reload() // 为了重新实例化vue-router对象 避免bug
      next('/')
    }).catch(() => {
      next('/')
    })
  } else {
    console.log(getToken(), 'getToken')
    if (getToken()) {
      console.log(store.getters.userInfo.userId, '-store.getters.userInfo.userId')
      if (!store.getters.userInfo.userId) {
        store.dispatch('GetInfo').then(res => {
          next()
        })
      } else {
        next()
      }
    } else {
      // 没有token
      if (whiteList.indexOf(to.path) !== -1) {
        // 在免登录白名单，直接进入
        next()
      } else {
        MessageBox.alert('您处于未登录状态，请登陆后使用该功能。', '系统提示',
          {
            confirmButtonText: '确认',
            type: 'warning'
          }
        ).then(() => {
          next('/')
          NProgress.done()
        }).catch(() => {
          next('/')
          NProgress.done()
        })
        // next()
        // NProgress.done()
      }
    }
  }
  // next()
})

router.afterEach(() => {
  NProgress.done()
})
