/*
 * @Descripttion:
 * @Author: jwj
 * @Date: 2020-09-28 22:21:02
 */
import request from '@/utils/request'

// 验证邮箱和短信验证码
export function doVerCode(data) {
  return request({
    url: '/sys/sms/doVerCode',
    method: 'post',
    data: data
  })
}
// 发送手机验证码
export function sendShortMess(data) {
  return request({
    url: '/sys/sms/sendShortMess',
    method: 'post',
    data: data
  })
}
// 发送邮件验证码
export function sendMailVercode(data) {
  return request({
    url: '/sys/sms/sendMailVercode',
    method: 'post',
    data: data
  })
}
// 发送一个HTML格式邮件-带类型 Mail_Send_Musician_Ver 音乐人注册邮件验证码
export function sendHtmlMail(data) {
  return request({
    url: '/sys/sms/sendHtmlMail',
    method: 'post',
    data: data
  })
}
// 歌曲基础信息查询接口 根据作品id 查询作品详情
export function getWorkDetail(data) {
  return request({
    url: '/music/base/getWorkDetail',
    method: 'post',
    data: data
  })
}
