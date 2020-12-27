/*
 * @Date: 2020-11-04 13:38:58
 * @Description:
 * @LastEditors: JWJ
 * @LastEditTime: 2020-12-27 11:26:59
 * @FilePath: \vue-music\src\api\demand.js
 */
import request from '@/utils/request'

// 查询需求列表
export function getList(data) {
  return request({
    url: '/company/homePage/queryNeeds',
    method: 'post',
    data: data
  })
}
