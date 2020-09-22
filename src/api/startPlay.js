import request from '@/utils/request'

// 获取当前登录人默认播放列表
export function getUserDefaultMusicList(data) {
  return request({
    url: '/music/base/getUserDefaultMusicList',
    method: 'post',
    data: data
  })
}
// 获取当前登录人历史播放列表
export function getUserHisMusicList(data) {
  return request({
    url: '/music/base/getUserHisMusicList',
    method: 'post',
    data: data
  })
}
// 获取当前登录人（音乐人）收藏播放列表
export function getUserCollectMusicList(data) {
  return request({
    url: '/music/base/getUserCollectMusicList',
    method: 'post',
    data: data
  })
}
// 获取当前登录人所在公司自选库列表
export function getCompanyOptionalBaseList(data) {
  return request({
    url: '/music/base/getCompanyOptionalBaseList',
    method: 'post',
    data: data
  })
}
// 获取获取自选库音乐播放列表
export function getCompanyOptionalMusicList(data) {
  return request({
    url: '/music/base/getCompanyOptionalMusicList',
    method: 'post',
    data: data
  })
}
// 获取音乐信息
export function getMusicInfo(data) {
  return request({
    url: '/music/base/getMusicInfo',
    method: 'post',
    data: data
  })
}
