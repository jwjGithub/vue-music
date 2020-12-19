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
                <div v-for="(item,index) in 40" :key="index" class="label">流行{{ index }}</div>
              </div>
            </div>
          </div>
          <div class="library-row mb1">
            <div class="left">情感</div>
            <div class="right">
              <div class="label-list">
                <div v-for="(item,index) in 5" :key="index" class="label">流行{{ index }}</div>
              </div>
            </div>
          </div>
          <div class="library-row mb1">
            <div class="left">速度</div>
            <div class="right">
              <div class="label-list">
                <div v-for="(item,index) in 5" :key="index" class="label">流行{{ index }}</div>
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
          <div class="library-list">
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
      <mus-footer></mus-footer>
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
        { name: '抖音热歌榜', type: 4, loading: false, list: [] }
      ],
      dataList: []
    }
  },
  watch: {
  },
  created() {
    // this.getList()
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
              >.label{
                padding:0 6px;
                margin-right:20px;
                margin-bottom:10px;
                background-color:#ffae00;
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
            margin:0 10px 40px 10px;
            width:100%;
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
