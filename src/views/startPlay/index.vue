<template>
  <div class="main start-play">
    <div class="main-contnet">
      <header class="head">
        <div class="head-main">
          <div class="left">
            <div class="img mrx27 ml48">
              <img src="@/assets/images/logo.png" />
            </div>
            <div class="search-input-row">
              <el-input class="search-input" placeholder="歌曲/歌单/音乐人"></el-input>
              <div class="search-icon">
                <i class="el-icon-search"></i>
              </div>
            </div>
          </div>
          <div class="right">
            <el-button class="text-btn" type="text">登录</el-button>
            <el-button class="text-btn" type="text">注册</el-button>
            <div class="musician">
              <i class="icon icon-musician"></i>
              <span>音乐人</span>
            </div>
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
                <div class="">上传</div>
              </div>
            </el-popover>

          </div>
          <div class="right"></div>
        </div>
      </header>
      <div class="content">
        <div class="content-main">
          <div class="left">
            <div class="tap-list">
              <div class="list active">
                <i class="icon icon-playlist mr15"></i>
                <span>播放列表</span>
              </div>
              <div class="list">
                <i class="icon icon-history mr15"></i>
                <span>播放历史</span>
              </div>
              <div class="list">
                <i class="icon icon-collect_b mr15"></i>
                <span>收藏的歌曲</span>
              </div>
            </div>
          </div>
          <div class="center"></div>
          <div class="right"></div>
        </div>
      </div>
      <footer class="footer">
        3
      </footer>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .main{
    height:100%;
    .main-contnet{
      height:100%;
      display:flex;
      flex-direction: column;
      justify-content:space-between;
      .head{
        height:72px;
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
              width:124px;
              height:44px;
              >img{
                width:100%;
                height:100%;
              }
            }
            .search-input-row{
              display:flex;
              align-items:center;
              width: 315px;
              height: 40px;
              padding: 0;
              border-radius: 20px;
              background-color: #f8f8f8;
              .search-icon{
                height:20px;
                padding-left:12px;
                border-left:1px solid #e5e5e5;
                .el-icon-search{
                  color:#B8B8B8;
                  cursor: pointer;
                  &:hover{
                    color:#000;
                  }
                }
              }
            }
          }
          .right{
            padding-right:48px;
            display:flex;
            align-items:center;
            .text-btn{
              padding:0 10px;
              color:inherit;
              &:hover{
                color:#00B0A8;
              }
            }
            .musician{
              display: flex;
              align-items: center;
              padding-right: 12px;
              margin-right: 12px;
              padding-left: 8px;
              cursor: pointer;
              height: 72px;
              font-size:14px;
              .icon-musician{
                width: 32px;
                height: 32px;
                margin-right: 6px;
                background-size: contain;
                background-position: center center;
                background-image:url('~@/assets/images/musician.png');
              }
              &:hover{
                background:#f8f8f8;
              }
            }
            .upload{
              width: 92px;
              height: 80px;
              margin-right: 48px;
              border-radius: 0px 0px 4px 4px;
              background-color: #00B0A8;
              text-align: center;
              color:#FFF;
              font-size:16px;
              cursor: pointer;
              .icon-upload{
                width: 28px;
                height: 28px;
                margin-top:10px;
                background-size: contain;
                background-position: center center;
                background-image:url('~@/assets/images/upload.png');
              }
            }
          }
        }
      }
      .content{
        flex:1;
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
            flex:1;
          }
          .right{
            width:350px;
            border-left:1px solid #ebebeb;
          }
        }
      }
      .footer{
        height:60px;
        box-shadow: 0 0 1px 1px rgba(0,0,0,.05);
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
</style>
