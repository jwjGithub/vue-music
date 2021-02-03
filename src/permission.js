/*
 * @Descripttion:
 * @version:
 * @Author: jwj
 * @Date: 2020-10-13 19:29:04
 * @LastEditors: JWJ
 * @LastEditTime: 2021-02-03 17:46:27
 */
import router from './router'
import store from './store'
import NProgress from 'nprogress'
import { MessageBox } from 'element-ui'
import 'nprogress/nprogress.css'
import { getToken, setToken } from '@/utils/auth'

NProgress.configure({ showSpinner: false })

const whiteList = ['/index', '/auth-redirect', '/bind', '/register', '/register/musician', '/register/company', '/feedback', '/resetPass']
router.beforeEach((to, from, next) => {
  if (to.query.token) {
    setToken(to.query.token)
  }
  NProgress.start()
  if (to.query.logOut === 'Y') {
    store.dispatch('FedLogOut').then(() => {
      next('/')
    }).catch(() => {
      next('/')
    })
  } else {
    if (getToken()) {
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
          store.dispatch('FedLogOut')
          next('/')
          NProgress.done()
        }).catch(() => {
          store.dispatch('FedLogOut')
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
