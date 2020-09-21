import request from '@/utils/request'

// 登录
export function login(data) {
  return request({
    url: '/company/signup/do_mobile_username_verification',
    method: 'post',
    data: data
  })
}
