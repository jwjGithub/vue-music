/*
 * @Date: 2020-11-16 09:39:05
 * @Description: 首页接口
 * @LastEditors: JWJ
 * @LastEditTime: 2020-12-08 15:10:38
 * @FilePath: \vue-music\src\api\index.js
 */
import request from '@/utils/request'

// 精品推荐查询接口
export function getBoutiqueMusicListPage(data) {
  return request({
    url: `/music/base/getBoutiqueMusicListPage`,
    method: 'post',
    data: data
  })
}
// 上传清单数据查询接口 只查询四类数据 1 词曲 2 Beat/Bgm 3 作曲 4 作词
export function getUploadMusicListPage(data) {
  return request({
    url: `/music/base/getUploadMusicListPage`,
    method: 'post',
    data: data
  })
}
