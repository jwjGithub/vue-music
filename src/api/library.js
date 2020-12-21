/*
 * @Descripttion:
 * @version:
 * @Author: jwj
 * @Date: 2020-12-21 21:16:26
 * @LastEditors: jwj
 * @LastEditTime: 2020-12-21 21:17:38
 */
import request from '@/utils/request'

// 获取风格标签列表
export function getTagsByType(data) {
  return request({
    url: '/sys/dictionary/getTagsByType',
    method: 'post',
    data: data
  })
}
// 获取歌曲列表
export function getMusicList(data) {
  return request({
    url: '/music/base/searchWorks',
    method: 'post',
    data: data
  })
}
