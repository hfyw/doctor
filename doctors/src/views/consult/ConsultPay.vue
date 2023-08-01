<template>
  <div class="Consultpay">
    <myTapbar title="支付" />
    <div class="pay">
      <!-- 价格区域 -->
      <div>
        <p>图文问诊 39元</p>
        <div class="docInfo">
          <img
            src="https://cp.itheima.net/assets/avatar-doctor.6cf240f4.svg"
            alt=""
          />
          <div class="txt">
            <p>极速问诊</p>
            <p>自动分配医生</p>
          </div>
        </div>
        <van-cell-group class="price">
          <van-cell title="优惠券" :value="'-￥' + obj.objs.couponDeduction" />
          <van-cell title="积分抵扣" :value="'-￥' + obj.objs.pointDeduction" />
          <van-cell title="实付款">
            <template #value>
              <span style="color: red">￥{{ obj.objs.actualPayment }}</span>
            </template>
          </van-cell>
        </van-cell-group>
      </div>
      <!-- 病情区域 -->
      <div>
        <van-cell-group>
          <van-cell
            title="患者信息"
            :value="
              user.patientInfo?.name +
              ' | ' +
              user.patientInfo?.genderValue +
              ' | ' +
              user.patientInfo?.age +
              '岁'
            "
          />
          <van-cell title="病情描述" :label="user.imgTxt?.txt" />
        </van-cell-group>
        <p style="margin: 50px">
          <van-checkbox
            v-model="PaymentAgreementFlag"
            style="margin-left: 150px"
            >我已同意 <span style="color: #16c2a3">支付协议</span></van-checkbox
          >
        </p>
      </div>
    </div>
    <div class="bar">
      <div>
        合计:￥ <span style="color: red">{{ priceAll }}</span>
      </div>
      <van-button
        round
        type="primary"
        style="width: 50%; height: 80%"
        @click="ImmediatePayment"
        >立即支付</van-button
      >

      <!-- 圆角弹窗（底部） -->
      <van-popup
        style="padding: 20px 10px 0"
        v-model:show="showBottom"
        round
        position="bottom"
        :style="{ height: '40%' }"
        :before-close="CancelPayment"
      >
        <p style="text-align: center">选择支付方式</p>
        <p
          style="
            margin: 30px 0;
            text-align: center;
            font-weight: 800;
            font-size: 35px;
          "
        >
          ￥{{ priceAll }}
        </p>
        <van-radio-group v-model="paymentMethod">
          <van-cell-group inset>
            <van-cell
              style="color: #48b338"
              icon="wechat-pay"
              title="微信支付"
              clickable
              @click="paymentMethod = '0'"
            >
              <template #right-icon>
                <van-radio name="0" />
              </template>
            </van-cell>
            <van-cell
              icon="alipay"
              style="color: #00a7ef"
              title="支付宝支付"
              clickable
              @click="paymentMethod = '1'"
            >
              <template #right-icon>
                <van-radio name="1" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
        <van-button
          type="primary"
          block
          round
          style="margin-top: 20px"
          @click="quickPay"
          >立即支付</van-button
        >
      </van-popup>
    </div>
  </div>
</template>

<script setup lang="ts">
// 引入导航栏子组件
import myTapbar from '@/components/my-tapbar.vue'
import { useRouter, useRoute } from 'vue-router'
// 引入接口 计算就诊信息和抵扣信息    支付接口        获取订单id
import { CalculateVisitInformation, payInterface, getOrider } from './api/api'
//引入统一的code校验
import { ECode } from '@/utils/PublicMethods'
//引入pinia
import { useUserStore } from '@/stores'
const user = useUserStore()
import { ref, reactive, computed } from 'vue'
import { showToast, showConfirmDialog, showLoadingToast } from 'vant'
const router = useRouter()
const showBottom = ref(false) //支付的弹出框状态
const paymentMethod = ref() //支付方式
//请求参数
const from = reactive({
  type: '2',
  illnessType: '1'
})
// 接受参数的校验
interface objects {
  objs: {
    couponDeduction: number
    pointDeduction: number
    actualPayment: number
    payment: number
  }
}
//响应接受的数据
let obj = reactive<objects>({
  objs: { couponDeduction: 0, pointDeduction: 0, actualPayment: 0, payment: 0 }
})
// 支付协议状态
const PaymentAgreementFlag = ref(false)
// 计算就诊信息和抵扣信息
const queryList = () => {
  CalculateVisitInformation(from).then((res) => {
    console.log(res)
    let { code } = res
    if (code == ECode.Success) {
      obj.objs = res.data
    }
  })
}
queryList()
//计算价格
const priceAll = computed(() => {
  return (
    obj.objs.payment -
    obj.objs.pointDeduction -
    obj.objs.couponDeduction
  ).toFixed(2)
})
const ConsultationOrderId = ref()
//立即支付打开状态
const ImmediatePayment = () => {
  if (PaymentAgreementFlag.value) {
    showBottom.value = true

    getOrider({
      type: 2,
      pictures: user.imgTxt?.pictures,
      illnessDesc: user.imgTxt?.DateOfIllness,
      patientId: user.patientInfo?.id
    }).then((res) => {
      if (res.code == ECode.Success) {
        ConsultationOrderId.value = res.data.id
      }
    })
  } else {
    showToast('请勾选我已同意支付协议')
  }
}
//取消支付
const CancelPayment = () => {
  return showConfirmDialog({
    title: '关闭支付',
    cancelButtonText: '仍要关闭',
    confirmButtonText: '继续支付',
    message: '取消支付将无法获得医生回复，医生接诊名额有限，是否确认关闭？'
  })
    .then(() => {
      return false
    })
    .catch(() => {
      return true
    })
}
// 立即支付
const quickPay = () => {
  if (paymentMethod.value === undefined) return showToast('请选择支付方式')
  showLoadingToast({ message: '跳转支付', duration: 0 })
  payInterface({
    orderId: ConsultationOrderId.value,
    paymentMethod: paymentMethod.value,
    payCallback: 'http://127.0.0.1:5173/room'
  }).then((res) => {
    window.location.href = res.data.payUrl
  })
}
</script>

<style lang="scss" scoped>
.Consultpay {
  width: 100%;
  .pay {
    width: 100%;
    background: #f6f7f9;
    > div {
      background: #fff;
      padding: 0 20px;
      box-sizing: border-box;
      > .docInfo {
        display: flex;
        margin: 10px 0;
        justify-content: space-between;
        align-items: center;
        > .txt {
          width: 80%;
        }
      }
      .price {
        margin-bottom: 20px;
      }
    }
  }
}

.bar {
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
