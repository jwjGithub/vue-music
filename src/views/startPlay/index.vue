<template>
  <div class="main start-play">
    <div class="main-contnet">
      <mus-header></mus-header>
      <div class="content">
        <div class="content-main">
          <div class="left">
            <div class="tap-list">
              <div class="list" :class="listActive == 1 ? 'active' : ''" @click="listActive = 1">
                <i class="icon icon-playlist mr15"></i>
                <span>播放列表</span>
              </div>
              <div class="list" :class="listActive == 2 ? 'active' : ''" @click="listActive = 2">
                <i class="icon icon-history mr15"></i>
                <span>播放历史</span>
              </div>
              <div class="list" :class="listActive == 3 ? 'active' : ''" @click="listActive = 3">
                <i class="icon icon-collect_b mr15"></i>
                <span>收藏的歌曲</span>
              </div>
            </div>
          </div>
          <div class="center">
            <div class="table-head">
              <div class="w4"></div>
              <div class="w4"></div>
              <div class="songname">歌曲名称</div>
              <div class="btns"></div>
              <div class="singer">歌手名</div>
              <div class="duration">播放数</div>
            </div>
            <div v-loading="loading" class="table-body">
              <el-scrollbar class="custom-scrollbar">
                <div v-for="(item,index) in dataList" :key="index" class="table-row">
                  <div class="table-col w4 text-center">
                    <el-checkbox v-model="item.checkbox"></el-checkbox>
                  </div>
                  <div class="table-col w4">{{ index + 1 }}</div>
                  <div class="table-col songname ellipsis">{{ item.title }}</div>
                  <div class="table-col btns">
                    <i class="icon icon-audition" @click="startPlay(item)"></i>
                    <!-- <i class="icon icon-pause_s"></i> -->
                    <i class="icon icon-more"></i>
                    <i class="icon icon-collect"></i>
                    <i class="icon icon-delete"></i>
                  </div>
                  <div class="table-col singer ellipsis">{{ item.authorName }}</div>
                  <div class="table-col duration">{{ item.auditionCounts }}</div>
                </div>
              </el-scrollbar>
            </div>
            <div class="table-footer">底部</div>
          </div>
          <div class="right">
            <div class="position-icon"></div>
            <iframe :src="lrcTxt"></iframe>
            <div v-html="lrcTxt"></div>
          </div>
        </div>
      </div>
      <footer class="footer">
        <aplayer
          class="main-aplayer"
          :music="videoOptions.music"
          :show-lrc="false"
          :autoplay="true"
        ></aplayer>
      </footer>
    </div>
  </div>
</template>
<script>
import aplayer from 'vue-aplayer'
import musicUrl from '@/assets/audio/test1.mp3'
import musicAuthor from '@/assets/images/logo.png'
import {
  getUserDefaultMusicList,
  getUserHisMusicList,
  getUserCollectMusicList,
  getCompanyOptionalBaseList,
  getCompanyOptionalMusicList,
  getMusicInfo
} from '@/api/startPlay'
import { getFileTxt } from '@/api/getFile'
export default {
  name: '',
  components: {
    aplayer
  },
  data() {
    return {
      loading: false,
      lrcTxt: '',
      listActive: 1, // 当前列表类型 1默认播放列表 2播放历史 3收藏的歌曲
      videoOptions: {
        progress: false,
        progressPercent: 0,
        successPercent: 0,
        music: {
          title: '测试标题',
          artist: 'jwj',
          pic: musicAuthor,
          src: musicUrl,
          lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'
        }
      },
      dataInfo: {}, // 当前播放详情
      dataList: [] // 播放列表
    }
  },
  watch: {
    listActive(val) {
      console.log(val)
      switch (val) {
        case 1:
          this.getUserDefaultMusicList()
          break
        case 2:
          this.getUserHisMusicList()
          break
        case 3:
          this.getUserCollectMusicList()
          break
        default:
          break
      }
    }
  },
  created() {
    this.getUserDefaultMusicList()
  },
  methods: {
    // 获取当前登录人默认播放列表
    getUserDefaultMusicList() {
      this.loading = true
      getUserDefaultMusicList().then(res => {
        this.dataList = res.data || []
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    // 获取当前登录人历史播放列表
    getUserHisMusicList() {
      this.loading = true
      getUserHisMusicList().then(res => {
        this.dataList = res.data || []
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    // 获取当前登录人（音乐人）收藏播放列表
    getUserCollectMusicList() {
      this.loading = true
      getUserCollectMusicList().then(res => {
        this.dataList = res.data || []
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    // 设置当前播放列表类型
    setListActive(type) {
      this.listActive = type
    },
    // 播放
    startPlay(row) {
      this.dataInfo = JSON.parse(JSON.stringify(row))
      this.getMusicInfo()
    },
    // 获取音乐详情
    getMusicInfo() {
      let json = {
        musicId: this.dataInfo.musicId, // 音乐id
        isPlay: true // 是否播放true/false
      }
      getMusicInfo(json).then(res => {
        console.log(res, '---bof')
        let data = res.data || {}
        this.videoOptions.music.title = data.title
        this.videoOptions.music.artist = data.author
        this.videoOptions.music.pic = data.imgTempUrl
        this.videoOptions.music.src = data.musicTempUrl
        this.lrcTxt = data.lrcTempUrl
        this.$forceUpdate()
        this.getFileTxt()
      })
    },
    getFileTxt() {
      getFileTxt(this.lrcTxt)
      // getFileTxt(this.lrcTxt).then(res => {
      //   console.log(res, '--')
      // })
    }
  }
}
</script>
<style lang="scss" scoped>
  .main{
    height:100%;
    .main-contnet{
      height:100%;
      display:flex;
      flex-direction: column;
      justify-content:space-between;
      .content{
        flex:1;
        overflow: hidden;
        .content-main{
          height:100%;
          display:flex;
          justify-content: space-between;
          .left{
            width:280px;
            height:100%;
            border-right:1px solid #ebebeb;
            .tap-list{
              padding: 14px 18px 0 22px;
              .list{
                height: 40px;
                line-height: 40px;
                font-size: 14px;
                color: #333;
                margin-bottom: 10px;
                padding: 0 10px;
                background-color: #FFF;
                border-radius: 5px;
                display:flex;
                align-items:center;
                transition: color,border,background-color .3s linear 0s;
                cursor: pointer;
                .icon-playlist{
                  width: 22px;
                  height: 22px;
                  background-image:url('~@/assets/images/icon/playlist.png');
                }
                .icon-history{
                  width: 22px;
                  height: 22px;
                  background-image:url('~@/assets/images/icon/history.png');
                }
                .icon-collect_b{
                  width: 22px;
                  height: 22px;
                  background-image:url('~@/assets/images/icon/collect_b.png');
                }
                &.active,&:hover{
                  background-color: #f3f3f3;
                }
              }
            }
          }
          .center{
            padding:25px 30px 0;
            flex:1;
            display:flex;
            flex-direction: column;
            justify-content: space-between;
            overflow: hidden;
            .table-head{
              height:38px;
              display:flex;
              align-items:center;
              border-bottom: 1px solid #f2f2f2;
              >div{
                font-size:12px;
                color:#333;
              }
            }
            .table-body{
              flex:1;
              overflow: hidden;
              .table-row{
                display:flex;
                font-size:12px;
                color:#333;
                .table-col{
                  height:50px;
                  line-height:50px;
                  &.btns{
                    display:flex;
                    align-items: center;
                    justify-content: center;
                    >.icon{
                      cursor: pointer;
                      width:16px;
                      height:16px;
                      margin:0 5px;
                      display: none;
                      &.icon-audition{
                        height:14px;
                        background-image:url('~@/assets/images/icon/audition.png');
                      }
                      &.icon-pause_s{
                        display:none;
                        background-image:url('~@/assets/images/icon/pause_s.png');
                      }
                      &.icon-more{
                        background-image:url('~@/assets/images/icon/more.png');
                      }
                      &.icon-collect{
                        background-image:url('~@/assets/images/icon/collect.png');
                      }
                      &.icon-delete{
                        background-image:url('~@/assets/images/icon/delete.png');
                      }
                    }
                  }
                }
                &:hover,&.active{
                  background-color:#f9f9f9;
                  .table-col{
                    &.btns{
                      >.icon{
                        display: block;
                      }
                    }
                  }
                }
              }
            }
            .table-footer{
              height: 60px;
              border-top: 1px solid #f2f2f2;
              display:flex;
              align-items:center;
              justify-content: space-between;
            }
            .table-head,.table-body{
              .songname{
                width:calc(63% - 240px);
                text-align: left;
              }
              .btns{
                width:16%;
                margin-left: 10px;
                min-width:170px;
                overflow:hidden;
              }
              .singer{
                width: 21%;
                margin-left: 10px;
                text-align: left;
              }
              .duration{
                width:60px;
                overflow:hidden;
                text-align: center;
                margin-right:25px;
              }
            }
          }
          .right{
            position: relative;
            width:350px;
            border-left:1px solid #ebebeb;
            .position-icon{
              position: absolute;
              left: -11px;
              top: 50%;
              margin-top: -64px;
              width: 18px;
              height: 129px;
              background: url('~@/assets/images/r_switch.png');
              z-index: 14;
            }
          }
        }
      }
      .footer{
        height:60px;
        box-shadow: 0 0 1px 1px rgba(0,0,0,.05);
        .main-aplayer{
          width:100%;
          height:100%;
          margin:0;
        }
      }
    }
  }
</style>
<style lang="scss">
.start-play{
  .search-input{
    width:270px;
    >.el-input__inner{
      border: 0;
      padding-left: 28px;
      color: #000;
      font-size: 14px;
      background: transparent;
    }
  }
}
.el-popover{
  min-width:116px;
}
.popover-list{
  .list{
    text-align: center;;
    .text-btn{
      color:inherit;
      &:hover{
        color:#00B0A8;
      }
    }
  }
}

.main-aplayer{

  .aplayer-body{
    .aplayer-pic{
      width:60px;
      height:60px;
    }
    .aplayer-info{
      height:55px !important;
      padding:5px 10px 0 10px !important;
    }
  }
}
</style>
