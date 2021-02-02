<template>
  <div class="main ranking-main">
    <im ref="im" />
    <div class="main-content">
      <mus-header :select-nav="'explain'"></mus-header>
      <div class="about-us">
        <el-menu
          ref="aboutMenu"
          :default-active="defaultActive"
          class="about-us-menu"
          :background-color="menuConfig.backgroundColor"
          :text-color="menuConfig.textColor"
          :active-text-color="menuConfig.activeTextColor"
          @select="selectMenu"
        >
          <template v-for="(item,index) in menuList">
            <el-submenu v-if="item.children" :key="index" :index="item.id+''">
              <template slot="title">{{ item.name }}</template>
              <template v-for="(subItem,subIndex) in item.children">
                <el-submenu v-if="subItem.children" :key="index+subIndex" :index="subItem.id+''">
                  <template slot="title">{{ subItem.name }}</template>
                  <template v-for="(subSubItem,subSubIndex) in subItem.children">
                    <el-menu-item :key="index+subIndex+subSubIndex" :index="subSubItem.id+''">
                      {{ subSubItem.name }}
                    </el-menu-item>
                  </template>
                </el-submenu>
                <el-menu-item v-else :key="index+subIndex" :index="subItem.id+''">{{ subItem.name }}</el-menu-item>
              </template>
            </el-submenu>
            <el-menu-item v-else :key="index" :index="item.id+''">{{ item.name }}</el-menu-item>
          </template>
        </el-menu>
        <div class="about-us-content">
          <template v-if="contentInfo">
            <h3 class="content-title">{{ contentInfo.name }}</h3>
            <p class="content-info">创建人：{{ contentInfo.createUserName }} <span class="content-time">创建时间：{{ contentInfo.createdTime }}</span></p>
            <div v-html="contentInfo.content"></div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getNotExpireList, getIntroductionInfo } from '@/api/explain'
import Im from '../../components/page/Im.vue'
export default {
  name: 'Explain',
  components: {
    Im
  },
  data() {
    return {
      loading: false,
      menuConfig: {
        backgroundColor: '#F5bd67',
        textColor: '#fff',
        activeTextColor: '#545c64'
      },
      menuList: [],
      defaultActive: '',
      contentInfo: null
    }
  },
  watch: {
  },
  created() {
    this.getMenu()
  },
  methods: {
    // 查询列表
    getMenu() {
      getNotExpireList().then((res) => {
        if (res.data && res.data.length > 0) {
          this.menuList = res.data
          this.forEachSelect(res.data)
        }
      })
    },
    // 默认选中第一个
    forEachSelect(data) {
      if (data[0].children) {
        this.forEachSelect(data[0].children)
      } else {
        this.selectMenu(data[0].id)
        this.defaultActive = data[0].id + ''
      }
    },
    // 选中菜单
    selectMenu(id, res) {
      getIntroductionInfo(id).then((res) => {
        this.contentInfo = res.data
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
  }
  .about-us{
    position: relative;
    max-width: 1330px;
    width: 100%;
    padding: 20px 0px;
    margin: 0px auto;
    .about-us-menu{
      position: absolute;
      min-height: calc(100vh - 120px);
      width: 240px;
      margin-right: 20px;
    }
    .about-us-content{
      margin-left: 260px;
      padding: 10px 20px;
      .content-title{
        font-size: 32px;
        text-align: center;
      }
      .content-info{
        text-align: center;
        color: #666;
        font-size: 14px;
        padding-bottom: 20px;
        .content-time{
          margin-left: 30px;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.about-us-menu{
  .el-menu-item:hover{
    background: #fbc675 !important;
  }
  .el-submenu__title:hover {
    background: #f0ab4b !important;
  }
  .el-submenu__title i{
    color: #fff;
  }
  .el-menu-item.is-active {
    color: #fff !important;
    font-weight: 700;
    background: #fbc675 !important;
  }
  .el-submenu__title.is-active {
    color: #fff !important;
    font-weight: 700;
    background: #fbc675 !important;
  }
  .el-submenu.is-opened>.el-submenu__title{
    background: #f0ab4b !important;
  }

}

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
