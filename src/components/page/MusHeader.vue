<template>
  <header class="header header-main">
    <div class="head-main">
      <div class="left">
        <div class="img mrx27 ml48">
          <img src="@/assets/images/index/logo.png" />
        </div>
      </div>
      <div class="center">
        <el-button class="text-btn active" type="text">首页</el-button>
        <el-button class="text-btn" type="text">词曲库</el-button>
        <el-button class="text-btn" type="text">Beat/BGM</el-button>
        <el-button class="text-btn" type="text">合作</el-button>
        <el-button class="text-btn" type="text">榜单</el-button>
      </div>
      <div class="right">
        <div class="search-input-row mr11">
          <el-input class="search-input" placeholder="歌曲/歌单/音乐人"></el-input>
          <div class="search-icon">
            <i class="icon icon-search"></i>
          </div>
        </div>
        <!-- <div class="musician">
              <i class="icon icon-musician"></i>
              <span>音乐人</span>
            </div> -->
        <el-popover
          placement="bottom"
          width="116"
          trigger="hover"
        >
          <div class="popover-list">
            <div class="list">
              <el-button class="text-btn" type="text">上传原创</el-button>
            </div>
            <div class="list">
              <el-button class="text-btn" type="text">上传翻唱</el-button>
            </div>
            <div class="list">
              <el-button class="text-btn" type="text">上传伴奏</el-button>
            </div>
            <div class="list">
              <el-button class="text-btn" type="text">上传视频</el-button>
            </div>
            <div class="list">
              <el-button class="text-btn" type="text">歌曲管理</el-button>
            </div>
          </div>
          <div slot="reference" class="upload">
            <i class="icon icon-upload"></i>
          </div>
        </el-popover>
        <i class="icon icon-user pointer"></i>
        <div class="register-login">
          <span class="login-btn pointer">登录</span>
          <span>/</span>
          <el-popover
            placement="bottom"
            width="116"
            trigger="hover"
          >
            <div class="popover-list">
              <div class="list">
                <el-button class="text-btn" type="text" @click="goRegister('musician')">音乐人注册</el-button>
              </div>
              <div class="list">
                <el-button class="text-btn" type="text" @click="goRegister('company')">公司注册</el-button>
              </div>
            </div>
            <span slot="reference" class="login-btn pointer">注册</span>
          </el-popover>
        </div>
      </div>
      <div class="right"></div>
    </div>
  </header>
</template>
<script>
export default {
  name: 'MusHeader',
  data() {
    return {

    }
  },
  created() {

  },
  methods: {
    // 跳转注册
    goRegister(type) {
      this.$router.push({
        path: '/register/' + type
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.header{
  height:80px;
  box-shadow:0 2px 8px 0 rgba(0, 0, 0, 0.04);
  .head-main{
    width:auto;
    height:100%;
    max-width:1440px;
    margin:0 auto;
    display:flex;
    justify-content: space-between;
    .left{
      display:flex;
      align-items:center;
      .img{
        width:176px;
        height:45px;
        >img{
          width:100%;
          height:100%;
        }
      }
    }
    .center{
      display:flex;
      align-items:center;
      .text-btn{
        padding:12px 10px;
        color:inherit;
        margin: 0 10px;
        border-bottom:4px solid #FFF;
        &:hover,&.active{
          border-bottom:4px solid #ffae00;
          color:#ffae00;
        }
      }
    }
    .right{
      display:flex;
      align-items:center;
      .search-input-row{
        display:flex;
        align-items:center;
        width: 240px;
        height: 40px;
        padding: 0;
        border-radius: 20px;
        background-color: #f8f8f8;
        .search-icon{
          height:24px;
          padding-left:12px;
          padding-right:23px;
          .icon-search{
            cursor: pointer;
            width: 24px;
            height: 24px;
            background-size: contain;
            background-position: center center;
            background-image:url('~@/assets/images/index/icon-search.png');
          }
        }
      }
      .upload{
        width: 80px;
        height: 80px;
        margin-right: 23px;
        background-color: #ffae00;
        border-radius: 3px;
        text-align: center;
        justify-content: center;;
        align-items:center;
        color:#FFF;
        font-size:16px;
        cursor: pointer;
        .icon-upload{
          width: 32px;
          height: 28px;
          margin-top:24px;
          background-size: contain;
          background-position: center center;
          background-image:url('~@/assets/images/index/icon-upload.png');
        }
      }
      .icon-user{
        width: 26px;
        height: 28px;
        margin-right: 6px;
        background-size: contain;
        background-position: center center;
        background-image:url('~@/assets/images/index/login-user.png');
      }
      .register-login{
        font-size:14px;
        .login-btn{
          &:hover{
            color:#ffae00;
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
.header-main{
  .search-input{
    width:270px;
    >.el-input__inner{
      border: 0;
      padding-left: 28px;
      color: #000;
      font-size: 14px;
      background: transparent;
    }
  }
}
.el-popover{
  min-width:116px;
}
.popover-list{
  .list{
    text-align: center;;
    .text-btn{
      color:inherit;
      &:hover{
        color:#ffae00;
      }
    }
  }
}
</style>
