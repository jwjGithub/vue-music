import request from '@/utils/request'

// 获取说明页菜单
export function getNotExpireList(data) {
  return request({
    url: '/sys/introduction/getNotExpireList',
    method: 'post',
    data: data
  })
}

// 获取说明页详情
export function getIntroductionInfo(id) {
  return request({
    url: '/sys/introduction/getIntroductionInfo/' + id,
    method: 'get',
    data: {}
  })
}
