/*
 * @Date: 2020-09-26 20:11:38
 * @Description: 登录接口
 * @LastEditors: JWJ
 * @LastEditTime: 2020-12-28 19:29:31
 * @FilePath: \vue-music\src\api\login.js
 */
import request from '@/utils/request'

// 音乐人登录
export function musicianLogin(data) {
  return request({
    url: '/musician/login',
    method: 'post',
    data: data
  })
}
// 公司用户登录
export function companyLogin(data) {
  return request({
    url: '/company/login',
    method: 'post',
    data: data
  })
}
// 获取用户信息
export function getUserInfo(data) {
  return request({
    url: '/sys/user/getUserDetailInfo',
    method: 'post',
    data: data
  })
}

