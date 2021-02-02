<template>
  <div class="page-im">
    <div class="page-im-btn" @click="imShow=true">
      <i class="el-icon-chat-dot-round"></i>
      <span>在线咨询</span>
    </div>
    <el-dialog
      :visible.sync="imShow"
      width="1200px"
    >
      <div>
        <div slot="header" class="im-header">
          <span class="im-header-left">联系人</span>
          <span class="im-header-right">{{ (userSessionAvtiveIndex === -1 ? '系统消息' : userSessionList[userSessionAvtiveIndex].objUserName) }}</span>
          <i class="el-icon-close" @click="imShow=false"></i>
        </div>
        <div class="im-content">
          <div class="im-content-left">
            <ul>
              <li :class="{ 'active' : userSessionAvtiveIndex === -1 }" @click="clickItemSession(1, 1, true)">
                <el-avatar size="large" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
                <div class="im-content-left-name">
                  <div class="im-name-date">
                    <span class="im-left-name">系统消息</span>
                    <span class="im-left-date">02月20号</span>
                  </div>
                  <p>{{ sysMessage.finalContent }}</p>
                </div>
              </li>
              <li v-for="(item, index) in userSessionList" :key="String(index)" :class="{ 'active' : item.objUserId === (userSessionAvtiveIndex === -1 ? '' : userSessionList[userSessionAvtiveIndex].objUserId) }" @click="clickItemSession(item, index, false)">
                <el-avatar size="large" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
                <div class="im-content-left-name">
                  <div class="im-name-date">
                    <span class="im-left-name">{{ item.objUserName }}</span>
                    <span class="im-left-date">{{ item.lastCommTime }}</span>
                  </div>
                  <p>{{ item.lastMessage ? item.lastMessage.content : '暂无消息' }}</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="im-content-right">
            <div ref="imContentModule" class="im-content-module">
              <!-- 系统消息处理 -->
              <div v-if="sysMessage.issysMessage">
                <template v-for="(item, index) in sysMessage.list">
                  <div :key="String(index)" class="news-item">
                    <div class="news-avatar">
                      <el-avatar size="large" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
                    </div>
                    <div class="news-item-content">
                      <div class="nic-content">
                        <h3 class="nic-content-title">{{ item.title }}</h3>
                        <p class="nic-content-text">{{ item.content }}</p>
                        <div class="nic-content-btns">
                          <el-button size="small">朴素按钮</el-button>
                          <el-button size="small">朴素按钮</el-button>
                          <el-button size="small">朴素按钮</el-button>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
              <!-- 聊天消息处理 -->
              <div v-else>
                <template v-for="(item, index) in userAvtiveSessionList">
                  <div v-if="item.sender === $store.getters.userInfo.userId" :key="String(index)" class="news-item selfItem">
                    <div class="news-item-content">
                      <div class="nic-content">
                        <p class="nic-content-text">{{ item.content }}</p>
                      </div>
                    </div>
                    <div class="news-avatar">
                      <el-avatar size="large" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
                    </div>
                  </div>
                  <div v-else :key="String(index)" class="news-item">
                    <div class="news-avatar">
                      <el-avatar size="large" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
                    </div>
                    <div class="news-item-content">
                      <div class="nic-content">
                        <p class="nic-content-text">{{ item.content }}</p>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
              <!-- <div class="news-item">
                <div class="news-avatar">
                  <el-avatar size="large" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
                </div>
                <div class="news-item-content">
                  <div class="nic-content">
                    <h3 class="nic-content-title">标题标题</h3>
                    <p class="nic-content-text">阿觉得很舒服哈萨克记得发哈看手机坏了的发声方法看见我看见被我啃就去玩了发的是你放开手放开阿福拉萨疯狂微机课啊发布卡上班地方撒发回去我发誓减肥的是抠脚大汉发送到饭卡上的是阿觉得很舒服哈萨克记得发哈看手机坏了的发声方法看见我看见被我啃就去玩了发的是你放开手放开阿福拉萨疯狂微机课啊发布卡上班地方撒发回去我发誓减肥的是抠脚大汉发送到饭卡上的是</p>
                    <div class="nic-content-btns">
                      <el-button size="small">朴素按钮</el-button>
                      <el-button size="small">朴素按钮</el-button>
                      <el-button size="small">朴素按钮</el-button>
                    </div>
                  </div>
                </div>
              </div> -->
            </div>
            <div class="im-send-content">
              <div class="im-send-tool">
                <img src="@/assets/images/im/ic-expression.png" />
                <img src="@/assets/images/im/ic-file.png" />
                <img src="@/assets/images/im/ic-history.png" />
              </div>
              <div ref="sendTextarea" class="im-send-edit" contenteditable="true" @keydown="keydownText($event)"></div>
              <p class="im-send-footer">
                <span>按Enter键发送，按Ctrl+Enter键换行</span>
                <el-button class="im-send-btn" :disabled="userSessionAvtiveIndex===-1" size="small" round>发送</el-button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getUserSessionList, addSpeUserSession, sendImMessage, getUserUnreadMessageList, getUserMessageListPage } from '@/api/im'
export default {
  name: 'Im',
  data() {
    return {
      // 聊天弹框 是否显示
      imShow: false,
      // 是否首次打开弹框
      isFirstShow: true,
      // 会话列表状态 0正常 1黑名单
      imStatus: 0,
      // 消息会话列表
      userSessionList: [],
      // 当前选中用户Id
      userSessionAvtiveIndex: -1,
      // 发送状态
      userSessionAvtiveSend: false,
      // 当前选中消息列表
      userAvtiveSessionList: [],
      // 发送内容
      content: '',
      // 系统消息
      sysMessage: {
        issysMessage: true,
        page: 1,
        limit: 10,
        business: 0,
        // 系统消息列表
        list: [],
        // 最后一条消息
        finalContent: ''
      }
    }
  },
  watch: {
    imShow: function(val) {
      if (val && this.isFirstShow) {
        if (this.$store.getters.userInfo.userId) {
          this.addPasteFun()
        } else {
          this.imShow = false
          this.$notify({
            title: '提示',
            message: '您还未登录，请登录...',
            type: 'warning'
          })
        }
      }
    }
  },
  created() {
    if (this.$store.getters.userInfo.userId) {
      this.init()
    }
  },
  methods: {
    // 初始化
    init() {
      this.getUserSessionList()
      this.initWebSocket()
      this.getUserMessageListPage()
    },
    // 获取会话列表 status 0正常 1黑名单
    async getUserSessionList() {
      await getUserSessionList({ status: this.imStatus }).then((res) => {
        this.userSessionList = res.data
      })
    },
    // 打开会话
    openUserSession(id) {
      if (!this.$store.getters.userInfo.userId) {
        this.$notify({
          title: '提示',
          message: '您还未登录，请登录...',
          type: 'warning'
        })
        return
      }
      this.imShow = true
      // 是否存在会话列表
      let isSession = false
      this.userSessionList.map((res, index) => {
        if (res.objUserId === id) {
          isSession = true
          this.clickItemSession(res, index, false)
        }
      })
      // 不存在添加到会话列表
      if (!isSession) {
        this.addUserSession(id)
      }
    },
    // 添加会话
    addUserSession(id) {
      addSpeUserSession({ objUserId: id }).then(() => {
        this.getUserSessionList().then(() => {
          this.userSessionList.map((res, index) => {
            if (res.objUserId === id) {
              this.clickItemSession(res, index, false)
            }
          })
        })
      })
    },
    // 点击用户打开会话
    clickItemSession(res, index, issysMessage) {
      this.sysMessage.issysMessage = issysMessage
      // 是否是系统消息
      if (issysMessage) {
        // 当前点击是否已选中系统消息
        if (this.userSessionAvtiveIndex === -1) {
          return
        }
        this.userSessionAvtiveIndex = -1
        this.getUserMessageListPage()
      } else {
        // 当前点击消息是否已选中消息
        if (res.objUserId === (this.userSessionAvtiveIndex === -1 ? '' : this.userSessionList[this.userSessionAvtiveIndex].objUserId)) {
          return
        }
        this.userSessionAvtiveIndex = index
        this.userSessionAvtiveSend = false
        getUserUnreadMessageList({ recipient: res.objUserId }).then((res2) => {
          this.userAvtiveSessionList = res2.data.reverse()
          setTimeout(() => {
            this.$refs.imContentModule.scrollTop = this.$refs.imContentModule.scrollHeight
          }, 0)
        })
      }
    },
    // 发送消息
    imSend() {
      if (this.userSessionAvtiveIndex === -1 || this.$refs.sendTextarea.innerHTML === '' || this.userSessionAvtiveSend) {
        return
      }
      this.userSessionAvtiveSend = true
      sendImMessage({ recipient: this.userSessionList[this.userSessionAvtiveIndex].objUserId, content: this.$refs.sendTextarea.innerHTML }).then((res) => {
        this.userSessionAvtiveSend = false
        this.userAvtiveSessionList.push(res.data)
        this.userSessionList[this.userSessionAvtiveIndex].lastMessage = { content: this.$refs.sendTextarea.innerHTML }
        this.$refs.sendTextarea.innerHTML = ''
        setTimeout(() => {
          this.$refs.imContentModule.scrollTop = this.$refs.imContentModule.scrollHeight
        }, 10)
      }).catch(() => {
        this.userSessionAvtiveSend = false
      })
    },
    // 回车监听
    keydownText(event) {
      if (event.ctrlKey && event.keyCode === 13) {
        // ctrl+enter
        this.sendTextareaRange()
      } else if (event.keyCode === 13) {
        // enter
        this.imSend()
        event.preventDefault() // 阻止浏览器默认换行操作
        return false
      }
    },
    // 换行并重新定位光标位置
    sendTextareaRange() {
      var el = this.$refs.sendTextarea
      var range = document.createRange()
      // 返回用户当前的选区
      var sel = document.getSelection()
      // 获取当前光标位置
      var offset = sel.focusOffset
      // div当前内容
      var content = el.innerHTML
      // 添加换行符\n
      el.innerHTML = content.slice(0, offset) + '\n ' + content.slice(offset)
      // 设置光标为当前位置
      range.setStart(el.childNodes[0], offset + 1)
      // 使得选区(光标)开始与结束位置重叠
      range.collapse(true)
      // 移除现有其他的选区
      sel.removeAllRanges()
      // 加入光标的选区
      sel.addRange(range)
    },
    initWebSocket() { // 初始化weosocket
      const wsuri = process.env.VUE_APP_BASE_API_IM_WS + 'websocket/' + this.$store.getters.userInfo.userId
      this.websock = new WebSocket(wsuri)
      this.websock.onmessage = this.websocketonmessage
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      this.websock.onclose = this.websocketclose
    },
    websocketonopen() { // 连接建立之后执行send方法发送数据
      let actions = {}
      this.websocketsend(JSON.stringify(actions))
    },
    websocketonerror() { // 连接建立失败重连
      this.initWebSocket()
    },
    websocketonmessage(e) { // 数据接收
      const redata = JSON.parse(e.data)
      // 当消息为普通消息时
      if (redata.type === 1) {
        // 是否存在会话列表
        let isSession = false
        this.userSessionList.map((res, index) => {
          // 对话列表如果已存在 更新最后一条消息内容和状态
          if (res.objUserId === redata.sender) {
            isSession = true
            this.userSessionList[index].lastMessage = { content: redata.content }
            if (this.userSessionList[this.userSessionAvtiveIndex].objUserId === redata.sender) {
              this.userAvtiveSessionList.push({
                content: redata.content,
                id: redata.id,
                isHandle: redata.isHandle,
                isRead: redata.isRead,
                recipient: redata.recipient,
                recipientName: redata.recipientName,
                sendTime: redata.sendTime,
                sender: redata.sender,
                senderName: redata.senderName,
                type: redata.type
              })
              setTimeout(() => {
                this.$refs.imContentModule.scrollTop = this.$refs.imContentModule.scrollHeight
              }, 10)
            }
          }
        })
        // 不存在会话列表 添加到会话列表
        if (!isSession) {
          this.userSessionList.push({
            id: redata.id,
            lastCommTime: redata.sendTime,
            objUserId: redata.sender,
            objUserName: redata.sender,
            content: redata.content,
            userId: redata.recipient
          })
        }
      }
    },
    websocketsend(Data) { // 数据发送
      this.websock.send(Data)
    },
    websocketclose(e) { // 关闭
      console.log('断开连接', e)
    },
    // 获取系统消息
    getUserMessageListPage() {
      getUserMessageListPage({
        userId: this.$store.getters.userInfo.userId,
        page: this.sysMessage.page,
        limit: this.sysMessage.limit,
        business: this.sysMessage.business
      }).then((res) => {
        if (res.data && res.data.length > 0) {
          this.sysMessage.finalContent = res.data[0].content
          // this.sysMessage.list = res.data.reverse()
          if (!this.isFirstShow) {
            setTimeout(() => {
              this.$refs.imContentModule.scrollTop = this.$refs.imContentModule.scrollHeight
            }, 0)
          }
        }
      })
    },
    // 添加复制到文本框内容处理
    addPasteFun() {
      if (this.isFirstShow) {
        this.isFirstShow = false
        setTimeout(() => {
          this.$refs.sendTextarea.addEventListener('paste', function(e) {
            e.stopPropagation()
            e.preventDefault()
            var text = ''; var event = (e.originalEvent || e)
            if (event.clipboardData && event.clipboardData.getData) {
              text = event.clipboardData.getData('text/plain')
            } else if (window.clipboardData && window.clipboardData.getData) {
              text = window.clipboardData.getData('Text')
            }
            if (document.queryCommandSupported('insertText')) {
              document.execCommand('insertText', false, text)
            } else {
              document.execCommand('paste', false, text)
            }
          })
        }, 100)
      }
    }
  }
}
</script>
<style lang="scss">
.page-im{
  .el-dialog{
    border-radius: 0px;
  }
  .el-dialog__header{
    display: none;
  }
  .el-dialog__body{
    padding: 0px;
  }
}
</style>
<style lang="scss" scoped>
.page-im{
  .page-im-btn {
    position: fixed;
    padding: 10px 20px 10px 20px;
    bottom: 0px;
    right: 10px;
    cursor: pointer;
    background-color: #fff;
    box-shadow: 0 0 20px 0 rgba(0,0,0,0.3);
    i {
      color: #666;
      font-size: 18px;
      vertical-align: middle;
    }
    span {
      color: #666;
      margin-left: 10px;
      font-size: 12px;
      vertical-align: middle;
    }
  }
  .im-header{
    height: 45px;
    line-height: 45px;
    color: #fff;
    position: relative;
    display: flex;
    background: -webkit-gradient(linear, 0 0, 0 100%, from(#bc436b), to(#af483a));
    background: -moz-linear-gradient(top, #bc436b, #af483a);
    background-image: linear-gradient(#bc436b, #af483a);
    .im-header-left{
      padding-left: 20px;
      width: 340px;
    }
    .im-header-right{
      flex: 1;
    }
    .el-icon-close{
      right: 15px;
      top: 13px;
      font-size: 18px;
      cursor: pointer;
      position: absolute;
    }
  }
  .im-content{
    display: flex;
    background-color: #f8f8f8;
    .im-content-left{
      width: 340px;
      height: 600px;
      overflow-y: auto;
      box-sizing: border-box;
      background-color: #fff;
      li{
        &:hover{
          background-color: #f2f2f2;
        }
        &.active{
          background-color: #f2f2f2;
        }
        padding: 20px;
        cursor: default;
        .im-content-left-name{
          width: 235px;
          color: #999;
          font-size: 14px;
          padding-left: 10px;
          box-sizing: border-box;
          display: inline-block;
          .im-name-date{
            .im-left-name{
              font-size: 16px;
              color: #333;
            }
            .im-left-date{
              float: right;
              margin-top: 2px;
            }
          }
          p{
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            height: 20px;
            width: 100%;
          }
        }
        .im-content-left-date{
          float: right;
          font-size: 14px;
          color: #999;
        }
      }
    }
    .im-content-right{
      flex: 1;
      margin-left: 10px;
      .im-content-module{
        width: 100%;
        height: 350px;
        padding: 20px 30px;
        box-sizing: border-box;
        background-color: #fff;
        overflow-y: auto;
        border-bottom: 2px solid #e4e4e4;
        .news-item{
          display: flex;
          padding-right: 180px;
          margin-bottom: 20px;
          clear: both;
          &.selfItem{
            float: right;
            padding-right: 0px;
            padding-left: 180px;
            .news-avatar{
              text-align: right;
            }
          }
          .news-avatar{
            width: 50px;
          }
          .news-item-content{
            flex: 1;
            margin-left: 10px;
            .nic-content{
              padding: 12px 15px;
              border-radius: 5px;
              display: inline-block;
              white-space: pre-wrap;
              border: 1px solid #f2f2f2;
              .nic-content-title{
                color: #333;
                font-size: 16px;
                margin-bottom: 10px;
              }
              .nic-content-text{
                font-size: 14px;
                color: #333;
              }
              .nic-content-btns{
                padding: 10px 135px 0px 135px;
                .el-button{
                  margin: 5px 18px;
                }
              }
            }
          }
        }
      }
      .im-send-content{
        width: 100%;
        height: 250px;
        background-color: #fff;
        .im-send-tool{
          padding-top: 10px;
          box-sizing: border-box;
          height: 30px;
          padding-left: 20px;
          &>img{
            vertical-align: middle;
            margin-right: 15px;
            height: 20px;
          }
        }
        .im-send-edit{
          height: 170px;
          padding: 10px;
          overflow-y: auto;
          white-space: pre-wrap;
          box-sizing: border-box;
        }
        .im-send-footer{
          padding-top: 3px;
          text-align: right;
          span{
            font-size: 14px;
            color: #c9c9c9;
          }
          .im-send-btn{
            margin: 0px 10px;
            &:hover,&:focus,&:active{
              outline: none;
              color: #333;
              border-color:  #999;
              background-color: #f6f6f6;
            }
          }
        }
      }
    }
  }
}
</style>
