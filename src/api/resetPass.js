import request from '@/utils/request'

// 获取公司注册手机验证码
export function getCompanyPhoneVerificationCode(data) {
  return request({
    url: '/company/signup/do_mobile_username_verification',
    method: 'post',
    data: data
  })
}
