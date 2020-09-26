<template>
  <div class="main register-main">
    <div class="main-content">
      <mus-header></mus-header>
      <div class="register-content">
        <div class="register-forms">
          <div class="steps">
            <div class="step active">
              <i class="icon steps-1"></i>
              <span class="ml30">基础信息</span>
            </div>
            <div>></div>
            <div class="step">
              <i class="icon steps-2"></i>
              <span class="ml30">详细信息</span>
            </div>
            <div>></div>
            <div class="step">
              <i class="icon steps-3"></i>
              <span class="ml30">注册成功</span>
            </div>
          </div>
          <div class="register-form">
            <el-form ref="form" :model="form" :rules="rules" label-width="300px">
              <el-form-item v-if="addActive == 0" label="用户名：" prop="username">
                <el-input v-model="form.username" class="w24"></el-input>
              </el-form-item>
              <el-form-item v-if="addActive == 0" label="手机号：" prop="mobile">
                <el-input v-model="form.mobile" class="w24"></el-input>
              </el-form-item>
              <el-form-item v-if="addActive == 0" label="手机验证码：" prop="phoneCode">
                <div class="w24 text-left">
                  <el-input v-model="form.phoneCode" class="w10"></el-input>
                  <el-button v-loading="loading" type="success" class="w13 ml10" :disabled="phoneSendCodeType" @click="getPhoneSendCode">{{ phoneSendCodeCount }}</el-button>
                </div>
              </el-form-item>
              <el-form-item v-if="addActive == 0" label="邮箱：" prop="email">
                <el-input v-model="form.email" class="w24"></el-input>
              </el-form-item>
              <el-form-item v-if="addActive == 0" label="邮箱验证码：" prop="emailCode">
                <el-input v-model="form.emailCode" class="w10"></el-input>
                <el-button v-loading="loading" type="success" class="w13 ml10" :disabled="emailSendCodeType" @click="getEmailSendCode">{{ emailSendCodeCount }}</el-button>
              </el-form-item>
              <el-form-item v-if="addActive == 1" label="真实姓名：" prop="realname">
                <el-input v-model="form.realname" class="w50"></el-input>
              </el-form-item>
              <el-form-item v-if="addActive == 1" label="性别：" prop="gender">
                <el-select v-model="form.gender" clearable placeholder="" class="w50">
                  <el-option label="男" value="MALE" />
                  <el-option label="女" value="FEMALE" />
                  <el-option label="未知" value="UNKNOW" />
                </el-select>
              </el-form-item>
              <el-form-item v-if="addActive == 1" label="公司名称：" prop="companyName">
                <el-input v-model="form.companyName" class="w50"></el-input>
              </el-form-item>
              <el-form-item v-if="addActive == 1" label="公司性质：" prop="address">
                <el-input v-model="form.address" class="w50"></el-input>
              </el-form-item>
              <el-form-item v-if="addActive == 1" label="地址：" prop="address">
                <el-input v-model="form.address" class="w50"></el-input>
              </el-form-item>
              <el-form-item v-if="addActive == 1" label="简介：" style="padding-bottom:66px;" prop="address">
                <Editor v-model="form.address" class="w50" />
              </el-form-item>
              <el-form-item v-if="addActive == 1" label="网址：" prop="address">
                <el-input v-model="form.address" class="w50"></el-input>
              </el-form-item>
              <el-form-item label="营业执照：" prop="picName">
                <!-- :headers="{'accessToken': getToken()}" -->
                <el-upload
                  class="avatar-uploader w24"
                  :action="baseURL + '/company/signup/uploadLisence'"
                  :before-upload="handleBeforeUpload"
                  :show-file-list="false"
                  :on-success="handleSuccess"
                >
                  <img v-if="imgUrl" :src="imgUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label=" ">
                <el-button v-loading="loading" type="warning" class="w24 mt24" @click="handleConfirm">下一步</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <mus-footer></mus-footer>
    </div>
  </div>
</template>
<script>
import {
  getCompanyPhoneVerificationCode,
  getCompanyEmailVerificationCode,
  validityCode
} from '@/api/register/company'
import Editor from '@/components/Editor'
export default {
  name: 'RegisterCompany',
  components: {
    Editor
  },
  data() {
    let validatePhone = (rule, value, callback) => {
      let reg = /^1[0-9]{10}$/
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else if (!reg.test(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    let validateEmail = (rule, value, callback) => {
      let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else if (!reg.test(value)) {
        callback(new Error('请输入正确的邮箱格式'))
      } else {
        callback()
      }
    }
    return {
      imgUrl: '', // 图片地址
      addActive: 1, // 添加步骤
      phoneSendCodeType: false, // 获取手机验证码状态 false 可以获取 true 不可获取
      phoneSendCodeCount: '获取验证码',
      emailSendCodeType: false, // 获取邮箱验证码状态 false 可以获取 true 不可获取
      emailSendCodeCount: '获取验证码',
      loading: false,
      dataList: [],
      roleList: [], // 角色列表
      queryForm: {
        status: '', // 审核状态，0正常，1作废，2审核中，3退回，多种状态传 1,2
        page: 1, // 当前页
        limit: 10 // 每页条数
      },
      form: {
        phoneCode: '', // 手机验证码
        emailCode: '', // 邮箱验证码
        username: '', // 用户名
        email: '', // 邮箱
        mobile: '', // 手机号
        realname: '', // 真名
        gender: '', //  性别 male 男 female 女 unknown 未知
        companyName: '', // 公司名
        address: '', // 地址
        introduction: '', // 公司介绍
        lisenceAtt: '' // 公司附件Id
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        mobile: [
          { required: true, validator: validatePhone, trigger: 'blur' }
        ],
        email: [
          { required: true, validator: validateEmail, trigger: 'blur' }
        ],
        phoneCode: [
          { required: true, message: '请输入手机验证码', trigger: 'blur' }
        ],
        emailCode: [
          { required: true, message: '请输入邮箱验证码', trigger: 'blur' }
        ],
        userType: [
          { required: true, message: '请选择用户类型', trigger: ['blur', 'change'] }
        ],
        status: [
          { required: true, message: '请选择用户状态', trigger: ['blur', 'change'] }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: ['blur', 'change'] }
        ],
        userManageroleId: [
          { required: true, message: '请选择角色', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  created() {

  },
  methods: {
    // 保存回调
    handleConfirm() {
      // 公司注册第一步效验
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let phoneJson = {
            mobile: this.form.mobile,
            vercode: this.form.phoneCode,
            type: 'mobile'
          }
          this.loading = true
          // 验证手机验证码
          validityCode(phoneJson).then(res => {
            let emailJson = {
              email: this.form.email,
              vercode: this.form.emailCode,
              type: 'email'
            }
            validityCode(emailJson).then(res => {
              this.loading = false
              this.addActive = 1 // 跳转第二步
            }).catch(() => {
              this.loading = false
            })
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    // 获取手机验证码
    getPhoneSendCode() {
      let bl = true
      this.$refs['form'].validateField(['mobile', 'username'], valid => { // 验证手机号码是否正确
        if (valid) {
          bl = false
          console.log('手机号正确')
          return false
        }
      })
      if (!bl) return false
      let json = {
        mobile: this.form.mobile,
        username: this.form.username
      }
      this.loading = true
      getCompanyPhoneVerificationCode(json).then(res => {
        let _this = this
        this.phoneSendCodeType = true
        this.phoneSendCodeCount = '60秒后重新获取'
        let count = 60
        let indexS = ''
        this.loading = false
        function countTimeout() {
          indexS = setTimeout(() => {
            if (count <= 1) {
              _this.phoneSendCodeType = false
              _this.phoneSendCodeCount = '获取验证码'
            } else {
              count -= 1
              _this.phoneSendCodeCount = count + '秒后重新获取'
              countTimeout()
            }
          }, 1000)
        }
        countTimeout()
      }).catch(() => {
        this.loading = false
      })
    },
    // 获取邮箱验证码
    getEmailSendCode() {
      let bl = true
      this.$refs['form'].validateField(['email'], valid => { // 验证手机号码是否正确
        if (valid) {
          bl = false
          console.log('邮箱正确')
          return false
        }
      })
      if (!bl) return false
      let json = {
        email: this.form.email
      }
      this.loading = true
      getCompanyEmailVerificationCode(json).then(res => {
        let _this = this
        this.emailSendCodeType = true
        this.emailSendCodeCount = '60秒后重新获取'
        let count = 60
        let indexS = ''
        this.loading = false
        function countTimeout() {
          indexS = setTimeout(() => {
            if (count <= 1) {
              _this.emailSendCodeType = false
              _this.emailSendCodeCount = '获取验证码'
            } else {
              count -= 1
              _this.emailSendCodeCount = count + '秒后重新获取'
              countTimeout()
            }
          }, 1000)
        }
        countTimeout()
      }).catch(() => {
        this.loading = false
      })
    },
    // 选择文件回调
    handleBeforeUpload(file) {
      const reg = '.*\\.(jpg|png|gif|JPG|PNG|GIF)'
      if (file.name.match(reg) == null) {
        this.$notify.error({ title: '对不起，上传格式不正确，请重新上传' })
        return false
      }
      if (file.size > 1024 * 1024 * 10) {
        this.$notify.error({ title: '对不起，文件不能大于10M，请重新上传' })
        return false
      }
      return true
    },
    // 上传成功回调
    handleSuccess(res, file, fileList) {
      console.log(res, '---')
      this.imgUrl = res.data.url
      this.form.lisenceAtt = res.data.id
      // this.dialogOption.imgUrl = res.data.imageUrl || ''
      // this.form.avatarKey = res.data.imageKey || ''
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
    .register-content{
      flex:1;
      .register-forms{
        width: 1100px;
        margin:0 auto;
        .steps{
          margin-top:30px;
          height: 100px;
          padding:0 60px;
          background-color: #f8f8f8;
          border-radius: 10px;
          display:flex;
          align-items:center;
          justify-content: space-around;
          .step{
            display:flex;
            align-items:center;
            .steps-1{
              width:30px;
              height:30px;
              background-size: cover;
              background-image:url('~@/assets/images/register/steps-1.png');
            }
            .steps-2{
              width:30px;
              height:30px;
              background-size: cover;
              background-image:url('~@/assets/images/register/steps-2.png');
            }
            .steps-3{
              width:30px;
              height:30px;
              background-size: cover;
              background-image:url('~@/assets/images/register/steps-3.png');
            }
            >span{
              font-family: PingFangSC-Regular;
              font-size: 18px;
              color: #ffae00;
            }
            &.active{
              >span{
                color: #6db93b;
              }
            }
          }
        }
        .register-form{
          width:800px;
          margin:100px auto 100px auto;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.register-main{
  .el-input{
    .el-input__inner{
      border-radius: 20px;
    }
  }
  .el-button{
    border-radius: 20px;
  }
  .el-loading-mask{
    border-radius: 20px;
  }
  // 头像上传样式
  .avatar-uploader{
    text-align: left;
    .el-upload {
      border: 1px dashed #d9d9d9;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      // &:hover {
      //   border-color: #409EFF;
      // }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
      }
      .avatar {
        width: 100px;
        height: 100px;
        display: block;
      }
    }
  }
}
</style>
