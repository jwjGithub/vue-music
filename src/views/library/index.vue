<template>
  <div class="main library-main">
    <div class="main-content">
      <mus-header :select-nav="'library'"></mus-header>
      <div class="library-content">
        <div class="content">
          <div class="text-center mt48 mb30">
            <el-input v-model="queryForm.searchStr" placeholder="歌曲/歌单/音乐人等" class="w40 input-with-select" @keyup.enter.native="getList">
              <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
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
                  @click="queryForm.speed = queryForm.speed === item.code ? '' : item.code;getList()"
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
                <el-input v-model="queryForm.priceMin" type="number" size="mini" maxlength="8" class="w8"></el-input>
                <span class="ml5 mr5">-</span>
                <el-input v-model="queryForm.priceMax" type="number" size="mini" maxlength="8" class="w8"></el-input>
                <el-button size="mini" class="ml20" @click="getList">确定</el-button>
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
              <el-button v-if="queryForm.type === 1" :type="queryForm.boutique ? 'warning' : 'info'" class="mr30" size="small" @click="setBoutique">只看精品</el-button>
              <el-button v-if="queryForm.type !== 4" type="warning" class="mr30" :disabled="selectCheckedList.length <= 0" size="small" @click="addPalyList">批量播放</el-button>
              <!-- <div class="search-sort-btn" @click="sortChange('price',queryForm.sortType)">
                <div>默认</div>
                <div class="up-down">
                  <i class="icon" :class="queryForm.sortBy == 'price' && queryForm.sortType == 'asc' ? 'icon-up-active' : 'icon-up'"></i>
                  <i class="icon" :class="queryForm.sortBy == 'price' && queryForm.sortType == 'desc' ? 'icon-down-active' : 'icon-down'"></i>
                </div>
              </div>
              <div class="search-sort-btn" @click="sortChange('createTime',queryForm.sortType)">
                <div>上传时间</div>
                <div class="up-down">
                  <i class="icon" :class="queryForm.sortBy == 'createTime' && queryForm.sortType == 'asc' ? 'icon-up-active' : 'icon-up'"></i>
                  <i class="icon" :class="queryForm.sortBy == 'createTime' && queryForm.sortType == 'desc' ? 'icon-down-active' : 'icon-down'"></i>
                </div>
              </div> -->
            </div>
          </div>
          <!--
              最新上传及词曲库不同类型作品作者栏表头
              词曲：曲作者 词作者
              作曲：曲作者
              作词：词作者
              beat/BGM：制作者
             -->
          <div class="library-list">
            <div class="list">
              <div class="table-head">
                <div class="w3 c-999">
                  <div class="checkbox-label" :class="checkArr ? 'active' : ''" @click="checkSelectAll"><div></div></div>
                </div>
                <div class="flex-1 c-999">作品名</div>
                <div v-if="queryForm.type === 1 || queryForm.type === 3" class="w12 c-999">曲作者</div>
                <div v-if="queryForm.type === 1 || queryForm.type === 4" class="w12 c-999">词作者</div>
                <div v-if="queryForm.type === 2" class="w12 c-999">制作者</div>
                <div class="w14 c-999">标签</div>
                <div class="w14 c-999">上传时间</div>
              </div>
              <div v-loading="loading" class="table-body">
                <div
                  v-for="(item,index) in dataList"
                  :key="index"
                  class="table-row"
                  @click="dataClick(item)"
                >
                  <div class="table-col w3 c-999">
                    <div class="checkbox-label" :class="item.checked === true ? 'active' : ''" @click="checkSelectAllOne(item)"><div></div></div>
                  </div>
                  <div class="table-col flex-1">
                    <div class="align-center hover-icon">
                      <i v-if="item.isBoutique === 1" class="el-icon-trophy ft14 mr5" style="color:#ffbe33;"></i>
                      <span class="flex-1 ellipsis">{{ item.title }}</span>
                      <i v-if="queryForm.type !== 4" class="icon icon-play mr10 ml10" @click="GoOpen('/startPlay?type=play&id=' + item.id,'startPlay')"></i>
                    </div>
                  </div>
                  <div v-if="queryForm.type === 1 || queryForm.type === 3" class="table-col w12 ellipsis c-333">
                    <div class="align-center hover-icon">
                      <span class="flex-1 ellipsis">{{ setAutorName(item.composers) }}</span>
                      <i class="icon icon-message mr10 ml10" @click="openIm(item)"></i>
                    </div>
                  </div>
                  <div v-if="queryForm.type === 1 || queryForm.type === 4" class="table-col w12 ellipsis c-333">
                    <div class="align-center hover-icon">
                      <span class="flex-1 ellipsis">{{ setAutorName(item.lyricists) }}</span>
                      <i class="icon icon-message mr10 ml10" @click="openIm(item)"></i>
                    </div>
                  </div>
                  <div v-if="queryForm.type === 2" class="table-col w12 ellipsis c-333">
                    <div class="align-center hover-icon">
                      <span class="flex-1 ellipsis">{{ setAutorName(item.producers) }}</span>
                      <i class="icon icon-message mr10 ml10" @click="openIm(item)"></i>
                    </div>
                  </div>
                  <div class="table-col w14 ellipsis c-999">
                    <span v-if="item.styleTagsDes">{{ item.styleTagsDes }},</span>
                    <span>{{ item.emotionTagsDes }}</span>
                  </div>
                  <div class="table-col w14 ellipsis c-333">{{ item.createdTime }}</div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="queryForm.page * queryForm.limit < total" class="page-num" :loading="loading" @click="getMoreData">点击查看更多</div>
        </div>
      </div>
      <mus-footer></mus-footer>
    </div>
    <im ref="im" />
  </div>
</template>
<script>
import { getList } from '@/api/ranking'
import { getTagsByType, getMusicList } from '@/api/library'
import Im from '../../components/page/Im.vue'
export default {
  name: 'Ranking',
  components: {
    Im
  },
  data() {
    return {
      total: 0,
      loading: false,
      tabActive: 1,
      searchValue: '',
      tagListFG: [], // 风格标签列表
      tagListQG: [], // 情感标签列表
      tagListSD: [], // 速度标签列表
      queryForm: {
        boutique: false, // 是否只看精品
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
      dataList: []
    }
  },
  computed: {
    checkArr() {
      let bl = this.dataList.length > 0
      for (let i = 0, len = this.dataList.length; i < len; i++) {
        let item = this.dataList[i]
        if (item.checked !== true) {
          bl = false
          break
        }
      }
      return bl
    },
    // 选择的列表
    selectCheckedList() {
      let arr = []
      for (let i = 0, len = this.dataList.length; i < len; i++) {
        let item = this.dataList[i]
        if (item.checked === true) {
          arr.push(item.id)
        }
      }
      return arr
    }

  },
  watch: {
    $route(route) {
      console.log('路由')
      let searchValue = route.query.searchValue
      if (searchValue) {
        this.$set(this.queryForm, 'searchStr', searchValue)
      }
      if (route.query.boutique) {
        this.$set(this.queryForm, 'boutique', route.query.boutique === 'Y')
      }
      this.getList()
    }
  },
  created() {
    if (this.$route.query.searchValue) {
      this.$set(this.queryForm, 'searchStr', this.$route.query.searchValue)
    }
    if (this.$route.query.boutique) {
      this.$set(this.queryForm, 'boutique', this.$route.query.boutique === 'Y')
    }
    this.getList()
    this.getTagListFG()
    this.getTagListQG()
    this.getTagListSD()
  },
  methods: {
    // 查询列表
    getList() {
      this.loading = true
      this.$set(this.queryForm, 'page', 1)
      let json = JSON.parse(JSON.stringify(this.queryForm))
      json.styleTags = this.getSelectTag(json.styleTags)
      json.emotionTags = this.getSelectTag(json.emotionTags)
      if (json.page === 1) {
        json.limit = 20
      }
      getMusicList(json).then((res) => {
        this.dataList = res.data
        this.total = res.count || 0
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    // 查询更多
    getMoreData() {
      this.loading = true
      this.$set(this.queryForm, 'page', this.queryForm.page + 1)
      let json = JSON.parse(JSON.stringify(this.queryForm))
      json.styleTags = this.getSelectTag(json.styleTags)
      json.emotionTags = this.getSelectTag(json.emotionTags)
      getMusicList(json).then((res) => {
        this.dataList = this.dataList.concat(res.data)
        this.total = res.count || 0
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    // 是否只看精品change事件
    setBoutique() {
      this.$set(this.queryForm, 'boutique', !this.queryForm.boutique)
      this.getList()
    },
    // 歌曲类型切换事件
    typeSelect(type) {
      this.$set(this.queryForm, 'type', type)
      this.getList()
    },
    // 排序change事件
    sortChange(type, sort) {
      this.$set(this.queryForm, 'sortBy', type)
      if (sort === 'desc') {
        this.$set(this.queryForm, 'sortType', 'asc')
      } else {
        this.$set(this.queryForm, 'sortType', 'desc')
      }
      this.getList()
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
      this.getList()
    },
    // 获取选中的标签
    getSelectTag(list, code = 'code') {
      let arr = []
      list.forEach(item => {
        arr.push(item[code])
      })
      return arr
    },
    // 设置作者名称
    setAutorName(list) {
      let arr = list.map(item => {
        return item.authorName
      })
      return arr.join(',')
    },
    // 全选
    checkSelectAll() {
      if (this.dataList.length <= 0) return
      let bl = this.checkArr
      this.dataList.forEach(item => {
        this.$set(item, 'checked', !bl)
      })
    },
    // 选中/取消
    checkSelectAllOne(row) {
      this.$set(row, 'checked', !row.checked)
    },
    // 歌曲列表点击事件
    dataClick(row) {
      if (this.clickData.name === row.name && this.clickData.singer === row.singer) {
        this.clickData = {}
      } else {
        this.clickData = row
      }
    },
    // 添加到播放列表
    addPalyList() {
      this.GoOpen(`/startPlay?type=play&id=${this.selectCheckedList?.join(',')}&time=${new Date().getTime()}`, 'startPlay')
    },
    // 打开聊天界面
    openIm(res) {
      console.log(res)
      if (res && res.createUserId) {
        this.$refs.im.openUserSession(res.createUserId)
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
            justify-content: flex-end;
            .search-sort-btn{
              display:flex;
              align-items:center;
              color:#777777;
              font-size:14px;
              cursor: pointer;
              margin:0 30px;
              .up-down{
                margin-left:3px;
                display:flex;
                flex-direction: column;
                justify-content: center;
                >i:nth-child(1){
                  margin-top:2px;
                }
                >i:nth-child(2){
                  margin-top:-4px;
                }
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
            margin-bottom:20px;
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
                display:flex;
                align-items:center;
                padding: 0 10px;
                font-size:14px;
                color:#999;
                text-align: center;
              }
            }
            .table-body{
              flex:1;
              overflow: hidden;
              .table-row{
                cursor: pointer;
                display:flex;
                font-size:12px;
                color:#333;
                border-bottom:1px solid #EEE;
                .table-col{
                  height:40px;
                  display:flex;
                  align-items:center;
                  padding: 0 10px;
                  text-align: center;
                  .hover-icon{
                    >.icon{
                      display:none;
                    }
                  }
                }
                &:hover{
                  box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.20);
                  .hover-icon{
                    >.icon{
                      display:block;
                    }
                  }
                }
              }
              & .table-row:last-child{
                border-bottom:none;
              }
            }
            .checkbox-label{
              cursor: pointer;
              width:10px;
              height:10px;
              padding:7px;
              border-radius: 4px;
              border:1px solid #eee;
              >div{
                width:100%;
                height:100%;
                background-color:#F8F8F8;
              }
              &.active{
                border:1px solid #FFAE00;
                >div{
                  background-color:#FFAE00;
                }
              }
            }
          }
        }
        .page-num{
          width:100%;
          height:40px;
          display:flex;
          justify-content: center;
          align-items: center;
          background-color:#f8f8f8;
          font-size: 14px;
          color: #999999;
          cursor: pointer;
          margin-bottom:20px;
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
}
</style>
