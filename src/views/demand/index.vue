<template>
  <div class="main demand-main">
    <div class="main-content">
      <mus-header></mus-header>
      <div class="demand-list">
        <template>
          <div v-for="(item,index) in dataList" :key="index" class="list" @click="Go('/demandDetails/' + item.id)">
            <div class="left">
              <img src="@/assets/images/test.jpg" />
            </div>
            <div class="center">
              <div class="title">{{ item.title }}</div>
              <div class="text content-html" v-html="item.content"></div>
            </div>
            <div class="right">
              <div class="right-row">
                <i class="icon icon-company mr6"></i>
                <p class="ellipsis flex-1">{{ item.companyName }}</p>
              </div>
              <div class="right-row">
                <i class="icon icon-company mr6"></i>
                <p class="ellipsis flex-1">{{ item.createdTime }}</p>
              </div>
              <div class="right-row">
                <i class="icon icon-company mr6"></i>
                <p class="ellipsis flex-1">{{ item.contributionNum }}</p>
              </div>
            </div>
          </div>
        </template>
        <pagination
          v-show="total>0"
          :total="Number(total)"
          :page.sync="queryForm.page"
          :limit.sync="queryForm.limit"
          @pagination="getList"
        />
      </div>
      <mus-footer></mus-footer>
    </div>
  </div>
</template>
<script>
import { getList } from '@/api/demand'
import Pagination from '@/components/Pagination'
export default {
  name: 'Demand',
  components: {
    Pagination
  },
  data() {
    return {
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
      height:100%;
      display: flex;
      flex-direction: column;
      .demand-list{
        width:1000px;
        margin:0 auto;
        padding:26px;
        flex:1;
        overflow-y:auto;
        >.list{
          cursor: pointer;
          padding:20px;
          border-bottom:1px solid #EEE;
          display:flex;
          justify-content: space-between;
          >.left{
            width:100px;
            height:100px;
            border:1px solid #CCC;
            margin-right:20px;
            img{
              width:100%;
              height:100%;
            }
          }
          >.center{
            flex:1;
            overflow: hidden;
            padding-right:40px;
            border-right:1px solid #eee;
            >.title{
              font-size: 18px;
              color: #333333;
              line-height:36px;
            }
            >.text{
              font-size: 14px;
              color: #666666;
              line-height:28px;

            }
          }
          >.right{
            width:180px;
            margin-top:17px;
            height:80px;
            padding-left:20px;
            display:flex;
            flex-direction: column;
            justify-content: space-between;
            font-size: 14px;
            color: #999999;
            >.right-row{
              display:flex;
              align-items:center;
            }
          }
        }
      }
    }
  }
</style>

<style lang="scss">
.demand-main{
  .content-html{
    img{
      max-width:100%;
    }
  }
}
</style>
