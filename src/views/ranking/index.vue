<template>
  <div class="main ranking-main">
    <div class="main-content">
      <mus-header :select-nav="'ranking'"></mus-header>
      <div class="ranking-content">
        <div class="content">
          <div class="ranking-list">
            <div v-for="(item,index) in typeList" :key="index" class="list">
              <div class="title">{{ item.name }}</div>
              <div class="table-head">
                <div class="w3 c-999"></div>
                <div class="w17 c-999">歌名</div>
                <div class="w9 c-999">歌手</div>
                <div class="w9 c-999">专辑</div>
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
                  </div>
                </el-scrollbar>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <mus-footer></mus-footer> -->
    </div>
  </div>
</template>
<script>
import { getList } from '@/api/ranking'
export default {
  name: 'Ranking',
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
      dataList: []
    }
  },
  watch: {
  },
  created() {
    this.getList()
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
    // 歌曲列表点击事件
    dataClick(row) {
      if (row === this.clickData) {
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
    .ranking-content{
      flex:1;
      overflow:hidden;
      margin:0 auto;
      // display:flex;
      // justify-content: center;
      >.content{
        width:100%;
        height:100%;
        .ranking-list{
          display:flex;
          width:100%;
          height:100%;
          .list{
            display:flex;
            flex-direction: column;
            padding:30px 0 0 0;
            margin:0 10px 40px 10px;
            width:360px;
            border-bottom:1px solid #eee;
            >.title{
              text-align: center;
              margin-bottom:20px;
            }
            .table-head{
              height:36px;
              display:flex;
              align-items:center;
              background-color:#F8F8F8;
              border-bottom: 4px solid #FFAE00;
              padding-right:10px;
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
.ranking-main{
  .el-input{
    .el-input__inner{
      border-radius: 20px;
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
