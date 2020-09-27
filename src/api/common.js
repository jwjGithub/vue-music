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
