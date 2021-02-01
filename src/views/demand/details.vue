<!--
 * @Descripttion:
 * @Author: jwj
 * @Date: 2021-01-26 20:28:25
-->
<template>
  <div class="main demand-details-main">
    <div class="main-content">
      <mus-header></mus-header>
      <div class="content">
        <!-- 左侧详情 -->
        <div class="left-content">
          <div class="data-info">
            <div class="info-head-img">
              <img src="@/assets/images/test.jpg" />
            </div>
            <div class="info-content">
              <div class="title pt10 pb20">标题需求标题需求标题需求标题需求</div>
              <div class="content">
                这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字
                这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字
                这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字这句话一共有十个汉字
              </div>
            </div>
          </div>
          <div class="tou-gao">
            <el-popover
              placement="bottom"
              title="标题"
              width="200"
              trigger="click"
              content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
            >
              <el-button slot="reference" type="primary" round class="w14"> 投 稿 </el-button>
            </el-popover>
          </div>
          <div class="message-list">
            <div class="list">
              <div class="left">
                <img src="@/assets/images/test.jpg" />
              </div>
              <div class="right">
                <div class="comment">
                  <div class="title">音乐人姓名</div>
                  <div class="right-date">
                    <div class="ft14 c-999 mr40">2020-12-12 12:12:00</div>
                    <el-button size="mini">回复</el-button>
                  </div>
                </div>
                <div class="comment-content">这句话一共有十个汉字</div>
                <div class="reply-list">
                  <div class="reply">
                    <div class="left">
                      <img src="@/assets/images/test.jpg" />
                    </div>
                    <div class="right">
                      <div class="title">音乐人姓名</div>
                      <div class="reply-content">
                        <div class="text">作品很赞作品很赞作品很赞作品很赞作品很赞作品很赞作品很赞作品很赞作品很赞作品很赞</div>
                        <el-button size="mini" class="ml20">回复</el-button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="reply-input">
                  <el-input v-model="value" type="textarea" :rows="2" :resize="'none'" placeholder="请输入内容"></el-input>
                  <div class="pt12">
                    <el-button size="mini">提交</el-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="new-reply">
            <div class="ft16 c-999 pt20 pb20">发表回复</div>
            <el-input v-model="value" type="textarea" :rows="6" :resize="'none'" placeholder="请输入内容"></el-input>
            <el-button type="primary" round class="w14 mt40 mb40"> 发 表 </el-button>
          </div>
        </div>
        <!-- 右侧列表 -->
        <div class="right-list">
          <div class="head">投稿作品</div>
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
      <mus-footer></mus-footer>
    </div>
  </div>
</template>
<script>
import { getList } from '@/api/demand'
export default {
  name: 'Demand',
  components: {
  },
  data() {
    return {
      value: '',
      loading: false,
      total: 0,
      dataList: [],
      queryForm: {
        page: 1,
        limit: 999
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      getList(this.queryForm).then(res => {
        this.dataList = res.data || []
        this.total = res.count || 0
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .main{
    height:100%;
    .main-content{
      display:flex;
      flex-direction: column;
      min-height:100%;
      >.content{
        width:1320px;
        margin:0 auto;
        padding:26px;
        flex:1;
        overflow-y:auto;
        display:flex;
        justify-content: space-between;
        >.left-content{
          width:1000px;
          >.data-info{
            display:flex;
            .info-head-img{
              width:100px;
              height:100px;
              margin-right:20px;
              margin-left:20px;
              >img{
                width:100%;
                height:100%;
              }
            }
            .info-content{
              flex:1;
              >.title{
                font-size: 18px;
                color: #333333;
              }
              >.content{
                color: #333333;
                font-size:16px;
              }
            }
          }
          >.tou-gao{
            padding:20px;
            text-align: center;
            border-bottom:1px solid #eee;
          }
          >.message-list{
            color:#333;
            >.list{
              padding: 20px 20px 40px 20px;
              display:flex;
              justify-content: space-between;
              border-bottom:1px solid #eee;
              >.left{
                width:60px;
                height:60px;
                margin-right:20px;
                >img{
                  width:100%;
                  height:100%;
                }
              }
              >.right{
                flex:1;
                overflow: hidden;
                >.comment{
                  display:flex;
                  justify-content: space-between;
                  align-items:center;
                  >.title{
                    font-size:16px;

                  }
                  >.right-date{
                    display:flex;
                    align-items: center;
                  }
                }
                .comment-content{
                  margin-top:10px;
                  margin-bottom:20px;
                }
                >.reply-list{
                  width:100%;
                  >.reply{
                    display:flex;
                    padding:10px 20px;
                    background-color: #f6f6f6;
                    margin-bottom:1px;
                    >.left{
                      width:30px;
                      height:30px;
                      margin-right:20px;
                      >img{
                        width:100%;
                        height:100%;
                      }
                    }
                    >.right{
                      flex:1;
                      overflow: hidden;
                      >.title{
                        font-size: 13px;
                        line-height: 20px;
                        color: #ff9000;
                      }
                      >.reply-content{
                        font-size:14px;
                        color:#333;
                        display:flex;
                        flex-wrap:wrap;
                        >.text{
                          line-height:28px;
                        }
                      }
                    }
                  }
                }
                >.reply-input{
                  display:flex;
                  flex-direction: column;
                  padding:10px 20px;
                  background-color: #f6f6f6;
                  margin-bottom:1px;
                }
              }
            }
          }
          >.new-reply{
            text-align: center;
          }
        }
        >.right-list{
          width:300px;
          max-height:800px;
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
</style>

<style lang="scss">
.demand-details-main{
  .el-textarea .el-textarea__inner{
    border-radius: 5px;
  }
}
</style>
