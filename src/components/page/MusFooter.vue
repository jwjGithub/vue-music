<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="links">
        <div class="w12">
          <div class="link-title">快速菜单</div>
          <div class="link-btn">词曲库</div>
          <div class="link-btn">公司需求</div>
          <div class="link-btn">主流榜单</div>
        </div>
        <div class="w16">
          <div class="link-title">实用功能</div>
          <div class="link-btn">商务合作</div>
          <div class="link-btn">举报投诉</div>
          <div class="link-btn">诚聘英才</div>
        </div>
        <div class="w14">
          <div class="link-title">友情链接</div>
          <div class="link-btn" @click="goLocation('http://www.ncac.gov.cn/')">国家版权局</div>
          <div class="link-btn" @click="goLocation('http://www.ccopyright.com.cn/')">中国版权保护中心</div>
          <div class="link-btn" @click="goLocation('http://www.cnipr.com/')">中国知识产权网</div>
        </div>
        <div class="w14">
          <div class="link-title">帮助中心</div>
          <div class="link-btn">常见问题</div>
          <div class="link-btn">问题反馈</div>
          <div class="link-btn">优化建议</div>
        </div>
      </div>
      <div class="contacts">
        <div class="contacts-list">
          <i class="icon icon-phone mr11"></i>
          <span class="phone mr31">186-2450-0357</span>
          <i class="icon icon-wechat ml24"></i>
          <i class="icon icon-micro-blog ml24"></i>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-bottom-text">
        <span class="ml20">©2020~2022 曲库版权所有</span>
        <span class="ml20">(京)-经营性-2017-0020</span>
        <span class="ml20">京公网安备1000002000001号</span>
        <span class="ml20">京ICP证030173号</span>
      </div>
    </div>
  </footer>
</template>
<style lang="scss" scoped>
.footer{
  width:100%;
  background-color: #777777;
  .footer-content{
    width:1080px;
    min-height:212px;
    margin: 0 auto;
    display:flex;
    justify-content: space-between;
    .links{
      padding-top:40px;
      display:flex;
      .link-title{
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #ffffff;
        margin-bottom:30px;
      }
      .link-btn{
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #ffffff;
        margin-bottom:16px;
        &:hover{
          cursor: pointer;
          text-decoration: underline;
        }
      }
    }
    .contacts{
      padding-top:40px;
      .contacts-list{
        display:flex;
        align-items:center;
        .phone{
          font-family: ArialMT;
          font-size: 24px;
          color: #FFF;
        }
        .icon-phone{
          width:24px;
          height:24px;
          background-size: cover;
          background-position: center center;
          background-image:url('~@/assets/images/index/icon-phone.png');
        }
        .icon-micro-blog{
          width:30px;
          height:24px;
          background-size: cover;
          background-position: center center;
          background-image:url('~@/assets/images/index/icon-micro-blog.png');
        }
        .icon-wechat{
          width:29px;
          height:22px;
          background-size: cover;
          background-position: center center;
          background-image:url('~@/assets/images/index/icon-wechat.png');
        }
      }
    }
  }
  .footer-bottom{
    width:100%;
    height: 60px;
    border-top:1px solid #AAA;
    .footer-bottom-text{
      text-align: center;
      width:1080px;
      line-height:60px;
      margin: 0 auto;
      font-size: 14px;
      color: #cccccc;
    }
  }
}
</style>
