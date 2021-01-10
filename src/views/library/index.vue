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
              <el-button type="warning" class="mr30" size="small">添加到在线播放列表</el-button>
              <div class="search-sort-btn" @click="sortChange('price',queryForm.sortType)">
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
              </div>
            </div>
          </div>
          <div class="library-list">
            <div class="list">
              <div class="table-head">
                <div class="w3 c-999">
                  <div class="checkbox-label" :class="checkArr ? 'active' : ''" @click="checkSelectAll"><div></div></div>
                </div>
                <div class="flex-1 c-999">作品名</div>
                <div class="w12 c-999">词作者</div>
                <div class="w12 c-999">曲作者</div>
                <div class="w14 c-999">标签</div>
                <div class="w12 c-999">制作者</div>
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
                      <span class="flex-1 ellipsis">{{ item.title }}</span>
                      <i class="icon icon-play mr10 ml10"></i>
                    </div>
                  </div>
                  <div class="table-col w12 ellipsis c-333">
                    <div class="align-center hover-icon">
                      <span class="flex-1 ellipsis">{{ setAutorName(item.lyricists) }}</span>
                      <i class="icon icon-message mr10 ml10"></i>
                    </div>
                  </div>
                  <div class="table-col w12 ellipsis c-333">
                    <div class="align-center hover-icon">
                      <span class="flex-1 ellipsis">{{ setAutorName(item.composers) }}</span>
                      <i class="icon icon-message mr10 ml10"></i>
                    </div>
                  </div>
                  <div class="table-col w14 ellipsis c-999">
                    <span v-if="item.styleTagsDes">{{ item.styleTagsDes }},</span>
                    <span>{{ item.emotionTagsDes }}</span>
                  </div>
                  <div class="table-col w12 ellipsis c-333">
                    <div class="align-center hover-icon">
                      <span class="flex-1 ellipsis">{{ setAutorName(item.producers) }}</span>
                      <i class="icon icon-message mr10 ml10"></i>
                    </div>
                  </div>
                  <div class="table-col w14 ellipsis c-333">{{ item.createdTime }}</div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="queryForm.page * queryForm.limit < total" class="page-num" :loading="loading" @click="getMoreData">点击查看更多</div>
          <!-- <el-table
            :data="trList"
            style="width: 100%"
          >
            <el-table-column prop="name" label="标题" width="180"></el-table-column>
            <el-table-column v-for="(item,index) in thList" :key="index" :label="item" width="180">
              <template slot-scope="scope">
                <span v-for="(data,dataIndex) in tableList" :key="dataIndex">
                  <template v-if="scope.row.name === data.colour && item === data.size">
                    {{ data.stock }}
                  </template>
                </span>
              </template>
            </el-table-column>
          </el-table> -->
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
      total: 0,
      loading: false,
      tabActive: 1,
      searchValue: '',
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
      dataList: [],
      thList: [],
      trList: [],
      tableList: []
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
    }
  },
  watch: {
    $route(route) {
      let searchValue = route.query.searchValue
      if (searchValue) {
        this.$set(this.queryForm, 'searchStr', searchValue)
        this.getList()
      }
    }
  },
  created() {
    if (this.$route.query.searchValue) {
      this.$set(this.queryForm, 'searchStr', this.$route.query.searchValue)
    }
    this.getList()
    this.getTagListFG()
    this.getTagListQG()
    this.getTagListSD()

    let arr = [
      {
        'skuId': '587530c3-eb5a-4a72-a81f-6fa6708b8b83',
        'productCode': 'D6460768501600',
        'colour': '米白',
        'size': 'M',
        'stock': 13
      },
      {
        'skuId': 'e3f5859b-f778-49cd-bdba-7c2284c8a2a3',
        'productCode': 'D6460768501090',
        'colour': '米白',
        'size': '均码',
        'stock': 3
      },
      {
        'skuId': 'e5490570-23a1-4efa-b332-b0b4df2a8ddf',
        'productCode': 'D6460768202479',
        'colour': '兰花',
        'size': 'M',
        'stock': 2
      },
      {
        'skuId': '793760d8-2575-403f-ac4d-6cdffb0e368c',
        'productCode': 'D6460768201059',
        'colour': '兰花',
        'size': '均码',
        'stock': 1
      }
    ]
    let th = []
    let tr = []
    // 解析原始数据 获取X,Y轴列表长度
    arr.forEach(item => {
      if (th.indexOf(item.size) === -1) {
        th.push(item.size)
      }
      if (tr.indexOf(item.colour) === -1) {
        tr.push(item.colour)
      }
    })
    tr.forEach(item => {
      this.trList.push({
        name: item
      })
    })
    this.thList = th
    this.tableList = arr
  },
  methods: {
    // 获取tr th
    getThAndTrList(list) {
      let th = []
      let tr = []
      let trList = []
      // 解析原始数据 获取X,Y轴列表长度
      list.forEach(item => {
        if (th.indexOf(item.size) === -1) {
          th.push(item.size)
        }
        if (tr.indexOf(item.colour) === -1) {
          tr.push(item.colour)
        }
      })
      tr.forEach(item => {
        trList.push({
          name: item
        })
      })
      return { thList: th, tr: trList }
    },
    // /** 货品列表选中详情 **/
    // getGoodsInfo(id) {
    //   this.loading = true
    //   choseGoodsInfo(id).then(res => {
    //     let list = res.data
    //     this.loading = false
    //     let { trList, thList } = this.getThAndTrList(list)
    //     let json = {
    //       id: id,
    //       th: thList,
    //       tr: trList,
    //       list: list
    //     }
    //     this.rightList.push(json)
    //   })
    // },
    /** 选中商品 **/
    // handle(row, column, event) {
    //   let index = this.rightList.findIndex(item => {
    //     return item.id === row.itemId
    //   })
    //   if (index >= 0) {
    //     this.rightList.splice(index, 1)
    //   } else {
    //     this.getGoodsInfo(row.itemId)
    //   }
    // },
    // 查询列表
    getList() {
      this.loading = true
      this.$set(this.queryForm, 'page', 1)
      let json = JSON.parse(JSON.stringify(this.queryForm))
      json.styleTags = this.getSelectTag(json.styleTags)
      json.emotionTags = this.getSelectTag(json.emotionTags)
      getMusicList(json).then((res) => {
        this.dataList = res.data
        this.total = res.count || 0
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
      // this.typeList.forEach(item => {
      //   this.$set(item, 'loading', true)
      //   getList(item.type).then(res => {
      //     this.$set(item, 'list', res.data || [])
      //     this.$set(item, 'loading', false)
      //   }).catch(() => {
      //     this.$set(item, 'loading', false)
      //   })
      // })
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
                    >i{
                      display:none;
                    }
                  }
                }
                &:hover{
                  box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.20);
                  .hover-icon{
                    >i{
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
