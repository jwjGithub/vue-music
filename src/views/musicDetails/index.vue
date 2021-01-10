<!--
 * @Descripttion: 音乐详情
 * @Author: jwj
 * @Date: 2021-01-10 10:58:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-10 13:54:24
-->
<template>
  <div class="main">
    <div class="main-content">
      <mus-header></mus-header>
      <div class="music-details-content">
        <div class="content">
          <div class="left">
            <div class="music-head mt20 mb20"></div>
            <el-button type="success" icon="el-icon-caret-right">播放</el-button>
          </div>
          <div class="center">
            <div class="music-info">
              <div class="ft30 mt40 mb10">作品名称</div>
              <div class="lh32">
                <p class="ft20">作词：张三</p>
                <p class="ft20">作曲：李四  </p>
                <p class="ft20">上传者：张三 </p>
                <p class="ft20">风格：流行／R&B／抖音</p>
                <p class="ft20">情感：欢快／甜蜜</p>
                <p class="ft20">速度：快速</p>
                <p class="ft20">报价：5000 </p>
              </div>
            </div>
            <div class="music-btns mt26 mb20">
              <el-button>添加到自选库</el-button>
              <el-button class="ml20">下载</el-button>
              <el-button class="ml20">预留</el-button>
              <el-button class="ml20">购买</el-button>
              <el-button class="ml20">联系我</el-button>
              <!-- <div class="btn" title="添加到自选库">添加到自选库</div> -->
              <!-- <div class="btn" title="下载">下载</div>
              <div class="btn" title="预留">预留</div>
              <div class="btn" title="购买">购买</div>
              <div class="btn" title="联系我">联系我</div> -->
            </div>
            <div class="music-lyric">
              <div class="ft18 fw6 mb18">歌词</div>
              <div class="lyric">
                It's a long road. When you face the world alone, no one reaches out a hand for you to hold.
                It's a long road. When you face the world alone, no one reaches out a hand for you to hold.
                It's a long road. When you face the world alone, no one reaches out a hand for you to hold.
                It's a long road. When you face the world alone, no one reaches out a hand for you to hold.
                It's a long road. When you face the world alone, no one reaches out a hand for you to hold.
              </div>
            </div>
          </div>
          <div class="right">
            <div class="head">推荐作品</div>
            <div class="list">
              <el-scrollbar class="custom-scrollbar">
                <div class="music-list">
                  <div v-for="(item,index) in 40" :key="index" class="music">
                    <div class="left">
                      <div class="title pb8">作品名称</div>
                      <div class="author">作词：xxx  作曲：xxx</div>
                    </div>
                    <div class="right">
                      <i class="el-icon-caret-right ft20 pointer" title="播放"></i>
                      <i class="el-icon-circle-plus ml20 ft20 pointer" title="添加到自选库"></i>
                      <!-- <el-button icon="el-icon-caret-right" type="text"></el-button>
                      <el-button icon="el-icon-circle-plus" type="text"></el-button> -->
                    </div>
                  </div>
                </div>
              </el-scrollbar>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  hasIdCard,
  getVerificationCode,
  saveUpdatePass
} from '@/api/resetPass'
export default {
  name: 'ResetPass',
  components: {
  },
  data() {
    return {
      loading: false
    }
  },
  watch: {
  },
  created() {
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.main{
  height:100%;
  .main-content{
    height:100%;
    display:flex;
    justify-content: space-between;
    flex-direction:column;
    .music-details-content{
      flex:1;
      overflow-y: auto;
      >.content{
        width: 1400px;
        height:100%;
				margin:0 auto;
        display:flex;
        justify-content: space-between;
        position: relative;
        >.left{
          width:300px;
          text-align: center;
          >.music-head{
            width:300px;
            height:300px;
            background-color: #e5e5e5;
          }
        }
        >.center{
          width:680px;
          display:flex;
          flex-direction: column;
          >.music-info{
            color:#333;
            font-weight: 600;
          }
          >.music-btns{

          }
          >.music-lyric{
            flex:1;
            overflow-y:auto;
          }
        }
        >.right{
          width:300px;
          height:100%;
          background-color: #f5f5f5;
          display:flex;
          flex-direction: column;
          >.head{
            padding:60px 0 18px 0;
            margin:0 20px;
            font-size:20px;
            font-weight: 600;
            border-bottom: 2px solid #d2d2d2;
          }
          >.list{
            flex:1;
            overflow: hidden;
            .music-list{
              padding:0 20px;
              >.music{
                display:flex;
                justify-content: space-between;
                align-items:center;
                padding:18px 0;
                border-bottom: 1px solid #d2d2d2;
                >.left{
                  >.title{
                    font-size: 18px;
                    color: #333333;
                  }
                  >.author{
                    font-size: 14px;
                    color: #999999;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
</style>
