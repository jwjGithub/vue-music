<template>
  <div class="main index-main">
    <div class="main-content">
      <mus-header :select-nav="'home'"></mus-header>
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
              <span class="more" @click="Go('/demand')">查看更多 ></span>
            </div>
          </div>
          <div class="demand-list">
            <template v-if="GSXQList && GSXQList.length >= 1">
              <div v-for="item in GSXQList.slice(0,2)" :key="item.id" class="list-head">
                <div class="left"></div>
                <div class="right">
                  <div class="list-title">
                    {{ item.title }}
                  </div>
                  <div class="list-text ellipsis2" v-html="item.content">
                  </div>
                </div>
              </div>
            </template>
            <!-- <div class="list-head">
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
            </div> -->
            <template v-if="GSXQChildrenList && GSXQChildrenList.length > 0">
              <div v-for="(GSLBitem,GSLBindex) in GSXQChildrenList" :key="GSLBindex" class="lists">
                <div v-for="(childItem,childindex) in GSLBitem" :key="childindex" class="list">
                  <i class="icon list-icon"></i>
                  <span class="text ellipsis1">{{ childItem.title }}</span>
                </div>
              </div>
            </template>
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
            <div v-for="(item,index) in JPTJList" :key="index" class="list" @click="goMusicDetails(item)">
              <div class="img">
                <img src="@/assets/images/test.jpg" />
              </div>
              <div class="content">
                <div class="name">{{ item.title }}</div>
                <div class="author">
                  <span class="title">词作者：</span>
                  <span class="text">{{ setAuthorName(item.lyricists) }}</span>
                </div>
                <div class="author">
                  <span class="title">曲作者：</span>
                  <span class="text">{{ setAuthorName(item.producers) }}</span>
                </div>
                <div class="style">
                  <div v-for="(st,stIndex) in setStyleList(item.styleTagsDescArray,item.emotionTagsDescArray)" :key="stIndex" class="style-list">{{ st }}</div>
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
                <tr v-for="(item,index) in ZXSCList" :key="index">
                  <td class="text-center">{{ index + 1 }}</td>
                  <td class="text-left">{{ item.title }}</td>
                  <td class="text-left">{{ setAuthorName(item.lyricAuthorArray) }}</td>
                  <td class="text-left">{{ setAuthorName(item.authorArray) }}</td>
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
      <mus-footer></mus-footer>
    </div>
  </div>
</template>
<script>
import { getList } from '@/api/ranking'
import {
  getBoutiqueMusicListPage,
  getUploadMusicListPage,
  getQueryNeedsAnon
} from '@/api/index'
export default {
  name: 'Index',
  components: {
  },
  data() {
    return {
      loading: false,
      form: {
      },
      clickData: {}, // 点击歌曲
      typeList: [
        { name: '抖音热歌榜', type: 4, loading: false, list: [] },
        { name: '酷狗top500', type: 3, loading: false, list: [] },
        { name: 'QQ音乐热歌榜', type: 1, loading: false, list: [] },
        { name: '网易云飙升榜', type: 2, loading: false, list: [] }
      ],
      dataList: [],
      GSXQList: [], // 公司需求列表
      GSXQChildrenList: [], // 公司需求列表
      JPTJList: [], // 精品推荐列表
      ZXSCList: [] // 最新上传列表
    }
  },
  watch: {
  },
  created() {
    this.getBoutiqueMusicListPage()
    this.getUploadMusicListPage()
    this.getQueryNeedsAnon()
  },
  methods: {
    // 查询精品推荐列表
    getBoutiqueMusicListPage() {
      let json = {
        fineNum: 9,
        autoNum: 6
      }
      getBoutiqueMusicListPage(json).then(res => {
        this.JPTJList = res.data || []
        // let json = JSON.parse(JSON.stringify(res.data[0]))
        // for (let i = 0; i < 14; i++) {
        //   this.JPTJList.push(json)
        // }
      })
    },
    // 最新上传接口
    getUploadMusicListPage() {
      let json = {
        type: '',
        page: 1,
        limit: 10
      }
      getUploadMusicListPage(json).then(res => {
        this.ZXSCList = res.data || []
      })
    },
    // 查询公司需求
    getQueryNeedsAnon() {
      let json = {
        limit: 10
      }
      getQueryNeedsAnon(json).then(res => {
        this.GSXQList = res.data || []
        this.setGSXQList()
      })
    },
    // 设置公司需求列表
    setGSXQList() {
      let arr = []
      if (this.GSXQList.length > 2) {
        let list = this.GSXQList.slice(2)
        let arr2 = []
        list.forEach((item, index) => {
          let item2 = JSON.parse(JSON.stringify(item))
          if ((index + 1) % 2 === 1) {
            arr2[0] = item2
          } else {
            arr2[1] = item2
            arr.push(JSON.parse(JSON.stringify(arr2)))
          }
          if ((index + 1) === list.length && (index + 1) % 2 === 1) {
            arr.push(item)
          }
        })
      }
      console.log(arr, 'arr')
      this.GSXQChildrenList = arr
    },
    // 作者转换
    setAuthorName(list) {
      let arr = []
      list && list.forEach(item => {
        arr.push(item.authorName || item.name)
      })
      return arr.join(',')
    },
    // 转换风格数据
    setStyleList(val, val2) {
      // let arr = val && val.split(',') || []
      // let arr2 = val2 && val2.split(',') || []
      // return arr.concat(arr2)
      let arr = val || []
      let arr2 = val2 || []
      return arr.concat(arr2)
    },
    // 跳转音乐详情
    goMusicDetails(row) {
      this.Go('/musicDetails', { id: row.id })
    }
  }
}
</script>
<style lang="scss" scoped>
  .main{
    .main-content{
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
              width:360px;
              height: 130px;
              // box-shadow: 0px 5px 15px 0px  rgba(255, 174, 0, 0.6);
              border-radius: 10px;
              display:flex;
              // background-color: #FFF;
              align-items:center;
              >.img{
                margin-left:20px;
                margin-right:20px;
                width: 80px;
                height: 80px;
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
                flex:1;
                overflow: hidden;
                display:flex;
                flex-direction:column;
                justify-content: space-between;
                >.name{
                  font-size: 18px;
                  color: #333333;
                }
                >.author{
                  display:flex;
                  align-items:center;
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
                  flex-wrap: wrap;
                  .style-list{
                    padding:1px 11px;
                    margin-right:10px;
                    border: solid 1px #cccccc;
                    border-radius: 20px;
                    font-size: 12px;
                    color: #999999;
                    margin-bottom:2px;
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
    }
  }
</style>

