<template>
  <div class="main ranking-main">
    <div class="main-content">
      <mus-header></mus-header>
      <div class="ranking-content">
        <div class="content">
          <!-- <el-scrollbar class="custom-scrollbar"> -->
          <div class="ranking-list">
            <div v-for="(item,index) in 4" :key="index" class="list">
              <div class="title">酷狗Top500</div>
              <div class="table-head">
                <div class="w5 c-999"></div>
                <div class="w13 c-999">歌名</div>
                <div class="w6 c-999">歌手</div>
                <div class="w6 c-999">作词</div>
                <div class="w6 c-999">作曲</div>
              </div>
              <div v-loading="loading" class="table-body">
                <!-- <el-scrollbar class="custom-scrollbar"> -->
                <div v-for="(itemChildren,indexChildren) in 20" :key="indexChildren" class="table-row" :class="indexChildren == 2 ? 'active' : ''">
                  <div class="table-col w5 c-999">{{ (indexChildren + 1) }}</div>
                  <div class="table-col w13 ellipsis music-name">天数有个月亮</div>
                  <div class="table-col w6 ellipsis c-999">周杰伦</div>
                  <div class="table-col w6 ellipsis c-999">轮轮</div>
                  <div class="table-col w6 ellipsis c-999">周转</div>
                </div>
                <!-- </el-scrollbar> -->
              </div>
            </div>
          </div>
          <!-- </el-scrollbar> -->
        </div>
      </div>
      <mus-footer></mus-footer>
    </div>
  </div>
</template>
<script>
import { saveQuestion } from '@/api/feedback'
export default {
  name: 'Ranking',
  components: {
  },
  data() {
    return {
      loading: false,
      form: {
      },
      dataList: []
    }
  },
  watch: {
  },
  created() {
  },
  methods: {
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
      // overflow-y:auto;
      margin:0 auto;
      // display:flex;
      // justify-content: center;
      >.content{
        .ranking-list{
          display:flex;
          .list{
            padding:80px 10px;
            width:360px;
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
              >div{
                font-size:14px;
                color:#999;
                text-align: center;
              }
            }
            .table-body{
              .table-row{
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
                &:hover,&.active{
                  background-color:#fff1d2;
                  .music-name{
                    color:#FF9000;
                  }
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
