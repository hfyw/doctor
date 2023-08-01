<template>
  <div class="login">
    <!-- 导航 -->
    <van-nav-bar
      right-text="注册"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="content">
      <div class="title">
        <span style="font-size: 48px">
          {{ SmsOrPasswordFlag ? '短信验证码登录 ' : ' 密码登录' }}</span
        >
        <span
          style="font-size: 29px"
          @click="SmsOrPasswordFlag = !SmsOrPasswordFlag"
        >
          {{ SmsOrPasswordFlag ? '密码登录' : '短信验证码登录 '
          }}<van-icon name="arrow"
        /></span>
      </div>
      <van-form style="margin-top: 90px">
        <van-cell-group inset>
          <van-field
            v-model="form.mobile"
            name="手机号"
            placeholder="请输入手机号"
            :rules="[{ required: true, message: '请填写手机号' }]"
          />
          <van-field
            v-if="!SmsOrPasswordFlag"
            @click-right-icon="PasswordStatus = !PasswordStatus"
            v-model="form.password"
            :type="PasswordStatus ? 'text' : 'password'"
            name="密码"
            placeholder="请输入密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          >
            <template #right-icon>
              <span style="font-family: iconfont; font-size: 50px"
                >{{ PasswordStatus ? '&#xe629;' : '&#xebcd;' }}
              </span>
            </template>
          </van-field>

          <van-field
            v-else
            v-model="form.code"
            center
            clearable
            placeholder="请输入短信验证码"
          >
            <template #button>
              <button
                ref="codeBtn"
                style="color: #16c2a3; border: 0; background-color: #fff"
                @click="SendVerificationCode"
                :disabled="codeBtnTimeOutFlag"
              >
                发送验证码
              </button>
            </template>
          </van-field>
        </van-cell-group>
        <div style="margin: 16px">
          <p style="margin: 20px 0">
            <van-checkbox
              style="display: inline-block; margin-right: 10px"
              v-model="ProtocolStatus"
              checked-color="#09afa5"
            ></van-checkbox
            >我同意 <span style="color: #09afa5"> 用户协议 </span>及<span
              style="color: #09afa5"
            >
              隐私条款
            </span>
          </p>
          <van-button round block type="primary" @click="onSubmit">
            登录
          </van-button>
          <p style="margin-top: 20px">忘记密码？</p>
        </div>
      </van-form>

      <div class="ThirdPartyLogin">
        <p>第三方登录</p>
        <a
          href="https://graph.qq.com/oauth2.0/authorize?client_id=102015968&response_type=code&redirect_uri=1"
        >
          <div
            style="
              font-family: iconfont;
              color: #00aaff;
              font-size: 80px;
              text-align: center;
              margin-top: 20px;
            "
          >
            &#xe65e;
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, reactive } from 'vue'
import { showSuccessToast, showFailToast } from 'vant'
import {
  GetVerificationCode,
  LoginPassword,
  AuthenticationCodeLogin
} from './api/user'

//引入pinia
import { useUserStore } from '@/stores'
//code码的校验
import { ECode } from '@/utils/PublicMethods'
const user = useUserStore()
const router = useRouter()
const PasswordStatus = ref(false) //密码框的状态
const ProtocolStatus = ref(false) //协议状态
// 判断是密码登录还是手机验证码登录 false是密码登录
const SmsOrPasswordFlag = ref(false)
const codeBtn = ref() //验证码按钮的dom元素
/***
 * 验证码 点击后按钮的状态 点击后不能在点击 计时完毕才可以点击
 * */
const codeBtnTimeOutFlag = ref(false)
// 表单数据
const form = reactive({
  mobile: '13230000001',
  password: 'abc12345',
  code: ''
})
//返回上一层
const onClickLeft = () => {}
// 去注册页面
const onClickRight = () => {
  router.push('/Register')
}
/**** 登录
 * 1、先判断够没勾选用户协议及隐私条款
 * 2、如果勾选后则 可以点击按钮 发送请求否则 提示信息
 *  3、根据SmsOrPasswordFlag 判断请求密码登录还是验证码登录
 * false是密码登录
 * */
const onSubmit = () => {
  if (ProtocolStatus.value) {
    //勾选协议了
    if (!SmsOrPasswordFlag.value) {
      //false是密码请求
      LoginPassword({ mobile: form.mobile, password: form.password }).then(
        async (res) => {
          let { code, message, data } = res
          if (code == ECode.Success) {
            // 成功存储token
            await clearInterval(timer)
            user.setUser(data)
            showSuccessToast('登录成功')
            router.push('/home')
          } else {
            showFailToast(message)
          }
        }
      )
    } else {
      //true是验证码请求
      AuthenticationCodeLogin({ mobile: form.mobile, code: form.code }).then(
        async (res) => {
          let { code, message, data } = res
          if (code == ECode.Success) {
            // 成功存储token
            user.setUser(data)
            await clearInterval(timer)
            showSuccessToast('登录成功')
            router.push('/home')
          } else {
            showFailToast(message)
          }
        }
      )
    }
  } else {
    showFailToast('请勾选用户协议及隐私条款')
  }
}
var timer: number
//点击发送验证码
const SendVerificationCode = () => {
  if (form.mobile == '') {
    showFailToast('请输入手机号')
  } else {
    GetVerificationCode({ mobile: form.mobile, type: 'login' }).then((res) => {
      let { code, message, data } = res
      if (code == ECode.Success) {
        form.code = data.code
        showSuccessToast(message)
        codeBtnTimeOutFlag.value = true
        let num = 60
        timer = setInterval(() => {
          num--
          codeBtn.value.innerText = `${num}s后再次发送`
          if (num <= 0) {
            codeBtn.value.innerText = '发送验证码'
            clearInterval(timer)
            codeBtnTimeOutFlag.value = false
          }
        }, 1000)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
/* 在线链接服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
@font-face {
  font-family: 'iconfont'; /* Project id 3559317 */
  src: url('//at.alicdn.com/t/c/font_3559317_dkyx7eyjuha.woff2?t=1690273529233')
      format('woff2'),
    url('//at.alicdn.com/t/c/font_3559317_dkyx7eyjuha.woff?t=1690273529233')
      format('woff'),
    url('//at.alicdn.com/t/c/font_3559317_dkyx7eyjuha.ttf?t=1690273529233')
      format('truetype');
}
.login {
  width: 100%;
  // 内容
  .content {
    width: 100%;
    padding: 20px 30px;
    box-sizing: border-box;
    .title {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  // 第三方登录
  .ThirdPartyLogin {
    width: 100%;
    margin-top: 150px;
    > p {
      text-align: center;
      color: #ccc;
      font-size: 15px;
      &::after {
        content: '';
        display: inline-block;
        width: 80px;
        height: 1px;
        background-color: #ccc;
        vertical-align: middle;
        margin-left: 10px;
      }
      &::before {
        content: '';
        display: inline-block;
        width: 80px;
        height: 1px;
        background-color: #ccc;
        vertical-align: middle;
        margin-right: 10px;
      }
    }
  }
}
</style>
