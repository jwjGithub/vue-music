/*
 * @Date: 2020-11-16 09:39:05
 * @Description: 榜单接口
 * @LastEditors: JWJ
 * @LastEditTime: 2020-11-16 09:40:07
 * @FilePath: \vue-music\src\api\ranking.js
 */
import request from '@/utils/request'

// 排行榜音乐清单查询接口 榜单类别 1：QQ热歌榜 2: 网易云飙升榜 3: 酷狗top500 4: 抖音热歌榜
export function getList(type) {
  return request({
    url: `/music/ranklist/getList/${type}`,
    method: 'post'
  })
}
