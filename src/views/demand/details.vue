<!--
 * @Descripttion:
 * @Author: jwj
 * @Date: 2021-01-26 20:28:25
-->
<template>
  <div class="main demand-main">
    <div class="main-content">
      <mus-header></mus-header>
      <div class="content">
        <!-- 左侧详情 -->
        <div class="left-content">
          <div class="data-info">
            <div class="info-head-img">
              <img src="@/assets/images/test.jpg" />
            </div>
            <div class="info-content"></div>
          </div>
        </div>
        <!-- 右侧列表 -->
        <div class="right-list"></div>
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
      height:100%;
      .content{
        width:1320px;
        margin:0 auto;
        padding:26px;
        flex:1;
        overflow-y:auto;
        border:1px solid red;
        display:flex;
        justify-content: space-between;
        >.left-content{
          width:1000px;
          border:1px solid red;
          >.data-info{
            display:flex;
            .info-head-img{
              width:100px;
              height:100px;
              margin-right:20px;
              >img{
                width:100%;
                height:100%;
              }
            }
          }
        }
        >.right-list{
          width:300px;
          border:1px solid red;
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
