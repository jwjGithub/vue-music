<template>
  <div class="main library-main">
    <div class="main-content">
      <mus-header :select-nav="'library'"></mus-header>
      <div class="library-content">
        <div class="content">
          <div class="text-center mt48 mb30">
            <el-input placeholder="歌曲/歌单/音乐人等" class="w40 input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
          <div class="library-row mb1">
            <div class="left">风格</div>
            <div class="right">
              <div class="label-list">
                <el-tag
                  v-for="item in tagListFG"
                  :key="item.code"
                  type=""
                  :effect="queryForm.styleTags.indexOf(item) !== -1 ? 'dark' : 'plain'"
                  @click="tagSelect(queryForm.styleTags,item)"
                >
                  {{ item.des }}
                </el-tag>
                <!-- <div v-for="(item,index) in 40" :key="index" class="label">流行{{ index }}</div> -->
              </div>
            </div>
          </div>
          <div class="library-row mb1">
            <div class="left">情感</div>
            <div class="right">
              <div class="label-list">
                <el-tag
                  v-for="item in tagListQG"
                  :key="item.code"
                  type=""
                  :effect="queryForm.emotionTags.indexOf(item) !== -1 ? 'dark' : 'plain'"
                  @click="tagSelect(queryForm.emotionTags,item)"
                >
                  {{ item.des }}
                </el-tag>
                <!-- <div v-for="(item,index) in 5" :key="index" class="label">流行{{ index }}</div> -->
              </div>
            </div>
          </div>
          <div class="library-row mb1">
            <div class="left">速度</div>
            <div class="right">
              <div class="label-list">
                <el-tag
                  v-for="item in tagListSD"
                  :key="item.code"
                  type=""
                  :effect="queryForm.speed == item.code ? 'dark' : 'plain'"
                  @click="queryForm.speed = item.code"
                >
                  {{ item.des }}
                </el-tag>
                <!-- <div v-for="(item,index) in 5" :key="index" class="label">流行{{ index }}</div> -->
              </div>
            </div>
          </div>
          <div class="library-row mb1">
            <div class="left">价格</div>
            <div class="right">
              <div class="pt15">
                <el-input type="number" size="mini" class="w8"></el-input>
                <span class="ml5 mr5">-</span>
                <el-input type="number" size="mini" class="w8"></el-input>
                <el-button size="mini" class="ml20">确定</el-button>
              </div>
            </div>
          </div>
          <div class="nav-tabs mt20">
            <div class="left-tabs">
              <div class="tab" :class="queryForm.type === 1 ? 'active' : ''" @click="typeSelect(1)">词曲</div>
              <div class="tab" :class="queryForm.type === 3 ? 'active' : ''" @click="typeSelect(3)">作曲</div>
              <div class="tab" :class="queryForm.type === 4 ? 'active' : ''" @click="typeSelect(4)">作词</div>
              <div class="tab" :class="queryForm.type === 2 ? 'active' : ''" @click="typeSelect(2)">Beat/BGM</div>
            </div>
            <div class="right-btn">
              <div class="search-sort-btn">
                <div>上传时间</div>
                <div class="up-down">
                  <i class="icon icon-up"></i>
                  <i class="icon icon-down"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="library-list">
            <div v-for="(item,index) in typeList" :key="index" class="list">
              <div class="table-head">
                <div class="w3 c-999"></div>
                <div class="w17 c-999">作品名</div>
                <div class="w9 c-999">词作者</div>
                <div class="w9 c-999">曲作者</div>
                <div class="w9 c-999">标签</div>
                <div class="w9 c-999">用户</div>
                <div class="w9 c-999">上传时间</div>
              </div>
              <div v-loading="item.loading" class="table-body">
                <el-scrollbar class="custom-scrollbar">
                  <div
                    v-for="(itemChildren,indexChildren) in item.list"
                    :key="indexChildren"
                    class="table-row"
                    :class="clickData.name == itemChildren.name && clickData.singer == itemChildren.singer ? 'active' : ''"
                    @click="dataClick(itemChildren)"
                  >
                    <div class="table-col w3 c-999">{{ (indexChildren + 1) }}</div>
                    <div class="table-col w17 ellipsis music-name">{{ itemChildren.name }}</div>
                    <div class="table-col w9 ellipsis c-999">{{ itemChildren.singer }}</div>
                    <div class="table-col w9 ellipsis c-999">{{ itemChildren.album }}</div>
                    <div class="table-col w9 ellipsis c-999">{{ itemChildren.album }}</div>
                    <div class="table-col w9 ellipsis c-999">{{ itemChildren.album }}</div>
                    <div class="table-col w9 ellipsis c-999">{{ itemChildren.album }}</div>
                    <div class="table-col w9 ellipsis c-999">{{ itemChildren.album }}</div>
                  </div>
                </el-scrollbar>
              </div>
            </div>
          </div>
        </div>
      </div>
      <mus-footer></mus-footer>
    </div>
  </div>
</template>
<script>
import { getList } from '@/api/ranking'
import { getTagsByType, getMusicList } from '@/api/library'
export default {
  name: 'Ranking',
  components: {
  },
  data() {
    return {
      loading: false,
      tabActive: 1,
      tagListFG: [], // 风格标签列表
      tagListQG: [], // 情感标签列表
      tagListSD: [], // 速度标签列表
      queryForm: {
        searchStr: '', // 检索文本
        styleTags: [], // 风格标签
        emotionTags: [], // 情感标签
        speed: '', // 速度
        type: 1, // 作品类型(1：词曲，2：BEATBGM，3：作曲，4：作词)
        priceMax: '', // 价格上限
        priceMin: '', // 价格下限
        sortBy: '', // 排序(默认排序为空，price 价格,createTime 上传时间)
        sortType: '', // 排序类型(desc,asc)
        page: 1, // 当前页码
        limit: 10 // 每页条数
      },
      form: {
      },
      clickData: {}, // 点击歌曲
      typeList: [
        { name: '抖音热歌榜', type: 4, loading: false, list: [] }
      ],
      dataList: []
    }
  },
  watch: {
  },
  created() {
    // this.getList()
    this.getTagListFG()
    this.getTagListQG()
    this.getTagListSD()
  },
  methods: {
    // 查询列表
    getList() {
      this.typeList.forEach(item => {
        this.$set(item, 'loading', true)
        getList(item.type).then(res => {
          this.$set(item, 'list', res.data || [])
          this.$set(item, 'loading', false)
        }).catch(() => {
          this.$set(item, 'loading', false)
        })
      })
    },
    // 歌曲类型切换事件
    typeSelect(type) {
      this.$set(this.queryForm, 'type', type)
      // this.getList()
    },
    // 获取风格标签列表
    getTagListFG() {
      getTagsByType({ type: 1 }).then(res => {
        let list = res.data || []
        list.forEach(item => {
          item.type = 1
        })
        this.tagListFG = list
      })
    },
    // 获取情感标签列表
    getTagListQG() {
      getTagsByType({ type: 2 }).then(res => {
        let list = res.data || []
        list.forEach(item => {
          item.type = 2
        })
        this.tagListQG = list
      })
    },
    // 获取速度标签列表
    getTagListSD() {
      getTagsByType({ type: 3 }).then(res => {
        this.tagListSD = res.data || []
      })
    },
    // 标签选择
    tagSelect(row, item) {
      // 添加
      if (row.indexOf(item) === -1) {
        row.push(item)
      } else { // 删除
        row.splice(row.indexOf(item), 1)
      }
      this.$forceUpdate()
    },
    // 歌曲列表点击事件
    dataClick(row) {
      if (this.clickData.name === row.name && this.clickData.singer === row.singer) {
        this.clickData = {}
      } else {
        this.clickData = row
      }
    }
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
    .library-content{
      flex:1;
      >.content{
        width: 1080px;
        margin: 0 auto;
        height: auto;
        .library-row{
          display:flex;
          background-color:#f8f8f8;
          >.left{
            width:130px;
            text-align: center;
            min-height:54px;
            line-height:54px;
          }
          >.right{
            flex:1;
            >.label-list{
              padding-top:15px;
              display:flex;
              flex-wrap: wrap;
              line-height:24px;
              .el-tag{
                cursor: pointer;
                margin-right:10px;
                margin-bottom:10px;
              }
              >.label{
                padding:0 6px;
                margin-right:20px;
                margin-bottom:10px;
                background-color:#ffae00;
              }
            }
          }
        }
        .nav-tabs{
          width:100%;
          height:46px;
          background-color: #f8f8f8;
          border-top: 4px solid #ffae00;
          display:flex;
          justify-content:space-between;
          >.left-tabs{
            padding:0 24px;
            display:flex;
            >.tab{
              width:100px;
              display:flex;
              font-size: 18px;
              align-items:center;
              justify-content: center;
              cursor: pointer;
              &.active{
                background-color:#ffae00;
                color:#FFF;
              }
            }
          }
          >.right-btn{
            flex:1;
            display:flex;
            align-items:center;
            .search-sort-btn{
              display:flex;
              align-items:center;
              color:#777777;
              cursor: pointer;
              .up-down{
                margin-left:3px;
                display:flex;
                flex-direction: column;
              }
            }
          }
        }
        .library-list{
          display:flex;
          width:100%;
          height:100%;
          .list{
            display:flex;
            flex-direction: column;
            padding:30px 0 0 0;
            margin-top:10px;
            width:100%;
            border-bottom:1px solid #eee;
            >.title{
              text-align: center;
              margin-bottom:20px;
            }
            .table-head{
              height:40px;
              display:flex;
              align-items:center;
              background-color:#F8F8F8;
              >div{
                font-size:14px;
                color:#999;
                text-align: center;
              }
            }
            .table-body{
              flex:1;
              overflow: hidden;
              .table-row{
                padding-right:10px;
                cursor: pointer;
                display:flex;
                font-size:12px;
                color:#333;
                border-bottom:1px solid #EEE;
                .table-col{
                  height:40px;
                  line-height:40px;
                  text-align: center;
                }
                // &:hover,
                &.active{
                  background-color:#fff1d2;
                  .music-name{
                    color:#FF9000;
                  }
                }
              }
              & .table-row:last-child{
                border-bottom:none;
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
.library-main{
  .el-input{
    .el-input__inner{
      // border-radius: 20px;
    }
  }
  .btn-success{
    border-radius: 20px;
  }
  .el-button--warning{
    border-radius: 20px;
  }
  .el-loading-mask{
    border-radius: 20px;
  }
}
</style>
