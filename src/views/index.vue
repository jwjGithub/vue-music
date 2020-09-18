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
      <!-- 精品推荐 -->
      <div class="recommend">
        <div class="recommend-main">
          <div class="title">
            <div class="left">
              <i class="icon jptj mr15"></i>
              <i class="icon icon-jptj"></i>
            </div>
            <div class="right">
              <span class="more">查看更多 ></span>
            </div>
          </div>
          <div class="recommend-list">
            <div v-for="(item,index) in 8" :key="index" class="list">
              <div class="img">
                <img src="@/assets/images/test.jpg" />
              </div>
              <div class="content">
                <div class="name">歌曲名称歌曲名称</div>
                <div class="author">
                  <div class="w15">
                    <span class="title">词作者：</span>
                    <span class="text">李珍珍</span>
                  </div>
                  <div class="flex-1">
                    <span class="title">曲作者：</span>
                    <span class="text">Lydia</span>
                  </div>
                </div>
                <div class="style">
                  <div class="style-list">风格1</div>
                  <div class="style-list">风格2</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 最新上传 -->
      <div class="new-upload pb50">
        <div class="new-upload-main">
          <div class="title">
            <div class="left">
              <i class="icon zxsc mr15"></i>
              <i class="icon icon-zxsc"></i>
            </div>
            <div class="right">
              <span class="more">查看更多 ></span>
            </div>
          </div>
          <div class="new-upload-list">
            <table cellspacing="0" cellpadding="0" class="table-list">
              <thead>
                <tr>
                  <th class="text-center w10">序号</th>
                  <th class="text-left" style="min-width:100px;">歌曲名</th>
                  <th class="text-left" style="min-width:100px;">词作者</th>
                  <th class="text-left" style="min-width:100px;">曲作者</th>
                  <th class="text-center" style="min-width:100px;">试听</th>
                  <th class="text-center" style="min-width:100px;">购买</th>
                  <th class="text-center" style="min-width:100px;">添加到自有库</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in 9" :key="index">
                  <td class="text-center">{{ index + 1 }}</td>
                  <td class="text-left">稻香《原声》</td>
                  <td class="text-left">周杰伦</td>
                  <td class="text-left">周杰伦</td>
                  <td class="text-center">
                    <i class="icon icon-hear"></i>
                  </td>
                  <td class="text-center">
                    <i class="icon icon-cart"></i>
                  </td>
                  <td class="text-center">
                    <i class="icon icon-add"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <footer class="footer">
        <div class="footer-content">
          <div class="links">
            <div class="w12">
              <div class="link-title">词曲库</div>
              <div class="link-btn">词作者</div>
              <div class="link-btn">曲作者</div>
            </div>
            <div class="w16">
              <div class="link-title">Beat/BGM</div>
              <div class="link-btn">成品伴奏</div>
              <div class="link-btn">背景音乐</div>
              <div class="link-btn">配乐</div>
            </div>
            <div class="w14">
              <div class="link-title">榜单</div>
              <div class="link-btn">酷狗top500</div>
              <div class="link-btn">QQ音乐热歌榜</div>
              <div class="link-btn">抖音热歌榜</div>
            </div>
            <div class="w14">
              <div class="link-title">帮助中心</div>
              <div class="link-btn">联系我们</div>
              <div class="link-btn">常见问题</div>
              <div class="link-btn">隐私政策</div>
            </div>
          </div>
          <div class="contacts">
            <div class="contacts-list">
              <i class="icon icon-phone mr11"></i>
              <span class="phone mr31">400-123-3333</span>
              <i class="icon icon-wechat ml24"></i>
              <i class="icon icon-micro-blog ml24"></i>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <div class="footer-bottom-text">
            <span class="ml20">©2020~2022 曲库版权所有</span>
            <span class="ml20">(京)-经营性-2017-0020</span>
            <span class="ml20">京公网安备1000002000001号</span>
            <span class="ml20">京ICP证030173号</span>
          </div>
        </div>
      </footer>
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
                background-image:url('~@/assets/images/test.jpg');
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
              width:100%;
              display:flex;
              flex-wrap:wrap;
              justify-content: space-between;
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
                  background-image:url('~@/assets/images/test.jpg');
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
      .recommend{
        width:100%;
        min-height:568px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
        background-image:url('~@/assets/images/index/index-bg-2.png');
        .recommend-main{
          width:1080px;
          margin: 0 auto;
          >.title{
            height:84px;
            display:flex;
            align-items:flex-end;
            justify-content:space-between;
            padding-bottom:10px;
            border-bottom:1px solid #EEE;
            .left{
              display:flex;
              align-items:flex-end;
              .jptj{
                width:120px;
                height:29px;
                background-size: cover;
                background-position: center center;
                background-image:url('~@/assets/images/index/jptj.png');
              }
              .icon-jptj{
                width:44px;
                height:45px;
                background-size: cover;
                background-position: center center;
                background-image:url('~@/assets/images/index/icon-jptj.png');
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
          .recommend-list{
            margin-top:18px;
            display:flex;
            flex-wrap:wrap;
            justify-content: space-between;
            .list{
              width:500px;
              height: 136px;
              // box-shadow: 0px 5px 15px 0px  rgba(255, 174, 0, 0.6);
              border-radius: 10px;
              display:flex;
              // background-color: #FFF;
              align-items:center;
              >.img{
                margin-left:26px;
                margin-right:30px;
                width: 100px;
                height: 100px;
                background-color: #eeeeee;
                border-radius: 6px;
                >img{
                  width:100%;
                  height:100%;
                  border-radius: 6px;
                }
              }
              >.content{
                padding:18px 0;
                height:calc(100% - 36px);
                display:flex;
                flex-direction:column;
                justify-content: space-between;
                >.name{
                  font-size: 18px;
                  color: #333333;
                }
                >.author{
                  display:flex;
                  .title{
                    font-size: 12px;
                    color: #999999;
                  }
                  .text{
                    font-size: 14px;
                    color: #333333;
                  }
                }
                >.style{
                  display:flex;
                  .style-list{
                    padding:7px 16px;
                    margin-right:10px;
                    border: solid 1px #cccccc;
                    border-radius: 26px;
                    font-size: 12px;
                    color: #999999;
                  }
                }
              }
              &:hover{
                cursor: pointer;
                box-shadow: 0px 5px 15px 0px  rgba(255, 174, 0, 0.6);
                background-color: #FFF;
                >.content{
                  >.style{
                    .style-list{
                      background-color:#fff9e2;
                      border: 1px solid #fff9e2;
                    }
                  }
                }
              }
            }
          }
        }
      }
      // 最新上传
      .new-upload{
        width:100%;
        min-height:568px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
        background-image:url('~@/assets/images/index/index-bg-1.png');
        .new-upload-main{
          width:1080px;
          margin: 0 auto;
          >.title{
            height:84px;
            display:flex;
            align-items:flex-end;
            justify-content:space-between;
            padding-bottom:10px;
            border-bottom:1px solid #EEE;
            .left{
              display:flex;
              align-items:flex-end;
              .zxsc{
                width:120px;
                height:29px;
                background-size: cover;
                background-position: center center;
                background-image:url('~@/assets/images/index/zxsc.png');
              }
              .icon-zxsc{
                width:49px;
                height:35px;
                background-size: cover;
                background-position: center center;
                background-image:url('~@/assets/images/index/icon-zxsc.png');
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
          >.new-upload-list{
            >.table-list{
              width:100%;
              th,td{
                height:60px;
                line-height:60px;
                // display:flex;
                // align-items:center;
                font-size: 14px;
              }
              >thead{
                th{
                  color: #999999;
                }
              }
              >tbody{
                td{
                  color: #333333;
                }
                tr:nth-child(odd){
                  background-color: #f8f8f8;
                }
              }
            }
            .icon-hear{
              width:24px;
              height:16px;
              background-size: cover;
              background-position: center center;
              background-image:url('~@/assets/images/index/icon-hear.png');
            }
            .icon-add{
              width:19px;
              height:18px;
              background-size: cover;
              background-position: center center;
              background-image:url('~@/assets/images/index/icon-add.png');
            }
            .icon-cart{
              width:23px;
              height:20px;
              background-size: cover;
              background-position: center center;
              background-image:url('~@/assets/images/index/icon-cart.png');
            }
          }
        }
      }
      .footer{
        width:100%;
        background-color: #777777;
        .footer-content{
          width:1080px;
          min-height:212px;
          margin: 0 auto;
          display:flex;
          justify-content: space-between;
          .links{
            padding-top:40px;
            display:flex;
            .link-title{
              font-family: PingFangSC-Regular;
              font-size: 18px;
              color: #ffffff;
              margin-bottom:30px;
            }
            .link-btn{
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #ffffff;
              margin-bottom:16px;
              &:hover{
                cursor: pointer;
                text-decoration: underline;
              }
            }
          }
          .contacts{
            padding-top:40px;
            .contacts-list{
              display:flex;
              align-items:center;
              .phone{
                font-family: ArialMT;
                font-size: 24px;
                color: #FFF;
              }
              .icon-phone{
                width:24px;
                height:24px;
                background-size: cover;
                background-position: center center;
                background-image:url('~@/assets/images/index/icon-phone.png');
              }
              .icon-micro-blog{
                width:30px;
                height:24px;
                background-size: cover;
                background-position: center center;
                background-image:url('~@/assets/images/index/icon-micro-blog.png');
              }
              .icon-wechat{
                width:29px;
                height:22px;
                background-size: cover;
                background-position: center center;
                background-image:url('~@/assets/images/index/icon-wechat.png');
              }
            }
          }
        }
        .footer-bottom{
          width:100%;
          height: 60px;
          border-top:1px solid #AAA;
          .footer-bottom-text{
            width:1080px;
            line-height:60px;
            margin: 0 auto;
            font-size: 14px;
            color: #cccccc;
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
