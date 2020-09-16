<template>
  <div class="main index-main">
    <div class="main-content">
      <header class="head">
        <div class="head-main">
          <div class="left">
            <div class="img mrx27 ml48">
              <img src="@/assets/images/index/logo.png" />
            </div>
          </div>
          <div class="center">
            <el-button class="text-btn active" type="text">首页</el-button>
            <el-button class="text-btn" type="text">词曲库</el-button>
            <el-button class="text-btn" type="text">Beat/BGM</el-button>
            <el-button class="text-btn" type="text">合作</el-button>
            <el-button class="text-btn" type="text">榜单</el-button>
          </div>
          <div class="right">
            <div class="search-input-row mr11">
              <el-input class="search-input" placeholder="歌曲/歌单/音乐人"></el-input>
              <div class="search-icon">
                <i class="icon icon-search"></i>
              </div>
            </div>
            <!-- <div class="musician">
              <i class="icon icon-musician"></i>
              <span>音乐人</span>
            </div> -->
            <el-popover
              placement="bottom"
              width="116"
              trigger="hover"
            >
              <div class="popover-list">
                <div class="list">
                  <el-button class="text-btn" type="text">上传原创</el-button>
                </div>
                <div class="list">
                  <el-button class="text-btn" type="text">上传翻唱</el-button>
                </div>
                <div class="list">
                  <el-button class="text-btn" type="text">上传伴奏</el-button>
                </div>
                <div class="list">
                  <el-button class="text-btn" type="text">上传视频</el-button>
                </div>
                <div class="list">
                  <el-button class="text-btn" type="text">歌曲管理</el-button>
                </div>
              </div>
              <div slot="reference" class="upload">
                <i class="icon icon-upload"></i>
              </div>
            </el-popover>
            <i class="icon icon-user pointer"></i>
          </div>
          <div class="right"></div>
        </div>
      </header>
      <!-- banner轮播图 -->
      <div class="banner">
        <el-row>
          <el-col :span="24">
            <el-carousel height="460px">
              <el-carousel-item v-for="item in 4" :key="item">
                <div class="carousel">
                  {{ item }}
                </div>
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </div>
      <!-- 公司需求 -->
      <div class="demand">
        <div class="demand-main">
          <div class="title">
            <div class="left">
              <i class="icon gsxq mr15"></i>
              <i class="icon icon-gsxq"></i>
            </div>
            <div class="right">
              <span class="more">查看更多 ></span>
            </div>
          </div>
          <div class="demand-list">
            <div class="list-head">
              <div class="left"></div>
              <div class="right">
                <div class="list-title">
                  帖子标题帖子标题帖子标题帖子标题帖子标题
                  帖子标题帖子标题帖子标题
                </div>
                <div class="list-text ellipsis2">
                  开头四十字内容预览开头四十字内容预览四十开头四
                  十字内容预览开头四十字内容预览四十
                  开头四十字内容预览开头四十字内容预览四十开头四
                  十字内容预览开头四十字内容预览四十
                </div>
              </div>
            </div>
            <div class="list-head">
              <div class="left"></div>
              <div class="right">
                <div class="list-title">
                  帖子标题帖子标题帖子标题帖子标题帖子标题
                  帖子标题帖子标题帖子标题
                </div>
                <div class="list-text ellipsis2">
                  开头四十字内容预览开头四十字内容预览四十开头四
                  十字内容预览开头四十字内容预览四十
                  开头四十字内容预览开头四十字内容预览四十开头四
                  十字内容预览开头四十字内容预览四十
                </div>
              </div>
            </div>
            <div v-for="item in 4" :key="item" class="lists">
              <div class="list">
                <i class="icon list-icon"></i>
                <span class="text ellipsis1">帖子标题帖子标题帖子标题帖子标题帖子</span>
              </div>
              <div class="list">
                <i class="icon list-icon"></i>
                <span class="text ellipsis1">帖子标题帖子标题帖子标题帖子标题帖子</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
  .main{
    .main-content{
      .head{
        height:80px;
        box-shadow:0 2px 8px 0 rgba(0, 0, 0, 0.04);
        .head-main{
          width:auto;
          height:100%;
          max-width:1440px;
          margin:0 auto;
          display:flex;
          justify-content: space-between;
          .left{
            display:flex;
            align-items:center;
            .img{
              width:176px;
              height:45px;
              >img{
                width:100%;
                height:100%;
              }
            }
          }
          .center{
            display:flex;
            align-items:center;
            .text-btn{
              padding:12px 10px;
              color:inherit;
              margin: 0 10px;
              border-bottom:4px solid #FFF;
              &:hover,&.active{
                border-bottom:4px solid #ffae00;
                color:#ffae00;
              }
            }
          }
          .right{
            display:flex;
            align-items:center;
            .search-input-row{
              display:flex;
              align-items:center;
              width: 240px;
              height: 40px;
              padding: 0;
              border-radius: 20px;
              background-color: #f8f8f8;
              .search-icon{
                height:24px;
                padding-left:12px;
                padding-right:23px;
                .icon-search{
                  cursor: pointer;
                  width: 24px;
                  height: 24px;
                  background-size: contain;
                  background-position: center center;
                  background-image:url('~@/assets/images/index/icon-search.png');
                }
              }
            }
            .upload{
              width: 80px;
              height: 80px;
              margin-right: 23px;
              background-color: #ffae00;
              border-radius: 3px;
              text-align: center;
              justify-content: center;;
              align-items:center;
              color:#FFF;
              font-size:16px;
              cursor: pointer;
              .icon-upload{
                width: 32px;
                height: 28px;
                margin-top:24px;
                background-size: contain;
                background-position: center center;
                background-image:url('~@/assets/images/index/icon-upload.png');
              }
            }
            .icon-user{
              width: 26px;
              height: 28px;
              margin-right: 6px;
              background-size: contain;
              background-position: center center;
              background-image:url('~@/assets/images/index/login-user.png');
            }
          }
        }
      }
      .banner{
        .carousel{
          width:100%;
          height:100%;
          background-size: cover;
          background-position: center center;
          background-image:url('~@/assets/images/index/banner.png');
        }
      }
      .demand{
        width:100%;
        min-height:568px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center 146px;
        background-image:url('~@/assets/images/index/index-bg-3.png');
        .demand-main{
          width:1080px;
          margin: 0 auto;
          .title{
            height:84px;
            display:flex;
            align-items:flex-end;
            justify-content:space-between;
            padding-bottom:10px;
            border-bottom:1px solid #EEE;
            .left{
              display:flex;
              align-items:flex-end;
              .gsxq{
                width:120px;
                height:29px;
                background-size: cover;
                background-position: center center;
                background-image:url('~@/assets/images/index/gsxq.png');
              }
              .icon-gsxq{
                width:40px;
                height:40px;
                background-size: cover;
                background-position: center center;
                background-image:url('~@/assets/images/index/icon-gsxq.png');
              }
            }
            .right{
              .more{
                padding-right: 10px;
                cursor: pointer;
                font-size: 14px;
                color: #999999;
                &:hover{
                  text-decoration:underline;
                }
              }
            }
          }
          .demand-list{
            padding:10px;
            margin-top:18px;
            display:flex;
            flex-wrap:wrap;
            justify-content: space-between;
            .list-head{
              width:460px;
              padding:20px;
              height:100px;
              background-color: #f8f8f8;
              border-radius: 6px;
              display:flex;
              .left{
                width:100px;
                height:100px;
                margin-right:32px;
                border-radius: 6px;
                background-size: cover;
                background-repeat: no-repeat;
                background-image:url('~@/assets/images/index/qr-code.png');
              }
              .right{
                flex:1;
                display:flex;
                flex-direction: column;
                .list-title{
                  font-family: PingFangSC-Regular;
                  font-size: 16px;
                  line-height: 24px;
                  letter-spacing: 0px;
                  color: #333333;
                  margin-bottom:16px;
                }
                .list-text{
                  flex:1;
                  font-family: PingFangSC-Regular;
                  font-size: 14px;
                  color: #999999;
                  overflow: hidden;
                }
              }
            }
            >.lists{
              >.list{
                width: 500px;
                height: 60px;
                border-radius: 6px;
                display:flex;
                align-items:center;
                // &.active{
                //   background-color: #f8f8f8;
                // }
                .list-icon{
                  margin-left:20px;
                  margin-right:10px;
                  width: 30px;
                  height: 30px;
                  border-radius: 2px;
                  background-size: cover;
                  background-repeat: no-repeat;
                  background-image:url('~@/assets/images/index/icon-wechat.png');
                }
                >.text{
                  flex:1;
                  font-size: 16px;
                  line-height: 24px;
                  color: #333333;
                }
              }
            }
            .lists:nth-child(even){
              >.list{
                background-color: #f8f8f8;
              }
            }
          }
        }
      }
    }
  }
</style>

<style lang="scss">
.index-main{
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
          color:#ffae00;
        }
      }
    }
  }
</style>
