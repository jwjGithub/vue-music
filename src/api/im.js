import request from '@/utils/imRequest'

// 获取会话列表
export function getUserSessionList(data) {
  return request({
    url: 'im/session/getUserSessionList',
    method: 'post',
    data: data
  })
}

// 添加会话人
export function addSpeUserSession(data) {
  return request({
    url: 'im/session/addSpeUserSession',
    method: 'post',
    data: data
  })
}

// 发送消息
export function sendImMessage(data) {
  return request({
    url: 'im/message/sendImMessage',
    method: 'post',
    data: data
  })
}

// 获取单个会话消息记录
export function getUserUnreadMessageList(data) {
  return request({
    url: 'im/message/getUserUnreadMessageList',
    method: 'post',
    data: data
  })
}

// 获取系统消息
export function getUserMessageListPage(data) {
  return request({
    url: 'im/sysmessage/getUserMessageListPage',
    method: 'post',
    data: data
  })
}

// 系统消息 操作按钮处理
export function handleTemplateMessage(data) {
  return request({
    url: 'im/sysmessage/handleSysTemplateMessage',
    method: 'post',
    data: data
  })
}
