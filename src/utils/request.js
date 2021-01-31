/*
 * @Date: 2020-09-22 10:48:18
 * @Description:
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-27 21:23:41
 * @FilePath: \vue-music\src\utils\request.js
 */
import axios from 'axios'
import router from '@/router'
import { Notification, MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken, removeToken } from '@/utils/auth'
let messageObj
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: process.env.VUE_APP_BASE_API,
  // 超时
  timeout: 10000
})
// request拦截器
service.interceptors.request.use(
  config => {
    // config.headers['token'] = '1b253bb6e8efcbf8cdfc3404c3f8562a' // 让每个请求携带自定义token 请根据实际情况自行修改
    config.headers['token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    return config
    // if (getToken()) {
    //   config.headers['token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    //   return config
    // } else {
    //   let url = window.location.href
    //   if (url.indexOf('/index') !== -1) {
    //     return config
    //   } else {
    //     if (messageObj === undefined) {
    //       messageObj = MessageBox.alert('您处于未登录状态，请登陆后使用该功能。', '系统提示', {
    //         confirmButtonText: '确认',
    //         type: 'warning'
    //       }
    //       ).then(() => {
    //         router.push({
    //           path: '/'
    //         }).catch(() => {

    //         })
    //         messageObj = undefined
    //         // store.dispatch('user/resetToken').then(() => {
    //         //   location.reload() // 为了重新实例化vue-router对象 避免bug
    //         // })
    //       }).catch(() => {
    //         router.push({
    //           path: '/'
    //         }).catch(() => {

    //         })
    //         messageObj = undefined
    //       })
    //     }
    //     return Promise.reject(new Error('登录已过期'))
    //   }
    // }
  },
  error => {
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(res => {
  const code = res.data.code
  if (code === 401 || code === 9104) {
    removeToken() // 删除token
    if (messageObj === undefined) {
      if (code === 401) {
        store.dispatch('FedLogOut')
      }
      messageObj = MessageBox.alert(
        (code === 401 ? '您处于未登录状态，请登陆后使用该功能。' : '没有权限访问'),
        '系统提示',
        {
          confirmButtonText: '确认',
          type: 'warning'
        }
      ).then(() => {
        router.push({
          path: '/'
        }).catch(() => {

        })
        messageObj = undefined
        // store.dispatch('user/resetToken').then(() => {
        //   location.reload() // 为了重新实例化vue-router对象 避免bug
        // })
      }).catch(() => {
        router.push({
          path: '/'
        }).catch(() => {

        })
        messageObj = undefined
      })
    }
    return Promise.reject('error')
  } else if (code !== 0) {
    Notification.error({
      title: res.data.msg
    })
    return Promise.reject('error')
  } else {
    return res.data
  }
},
error => {
  // console.log(error.response)
  Message({
    message: error.response.status === 404 ? '网络异常 404' : error.message,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
}
)

export default service
