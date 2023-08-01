<template>
  <div class="askIllnessDetail">
    <myTapbar title="问诊详情" class="myTapbar" />

    <div class="top">
      <div class="topContent">
        <!-- 费用详情 -->
        <div class="topContentTop">
          <div class="top-left">
            <h4>
              {{ EOrder[order.orders?.type]
              }}{{ order.orders?.actualPayment }}元
            </h4>
            <p>服务医生信息</p>
          </div>
          <div class="top-right">{{ EStatus[order.orders?.status] }}</div>
        </div>
        <!-- 医生卡片 -->
        <div class="topContentCard">
          <img
            src="https://cp.itheima.net/assets/avatar-doctor.6cf240f4.svg"
            alt=""
          />
          <div>
            <h4>{{ EOrder[order.orders?.type] }}</h4>
            <p>暂未分配医生</p>
          </div>
          <van-icon name="arrow" />
        </div>
      </div>
    </div>
    <van-cell-group inset class="Patient">
      <van-cell
        title="患者信息"
        :value="
          order.orders?.patientInfo?.name +
          ' | ' +
          order.orders?.patientInfo?.genderValue +
          ' | ' +
          order.orders?.patientInfo?.age +
          '岁'
        "
      />
      <van-cell
        title="患者时长"
        :value="EIllnessTime[order.orders?.illnessTime]"
      />
      <van-cell
        title="就诊情况"
        :value="EConsultFlag[order.orders?.consultFlag]"
      />
      <van-cell title="病情描述" :label="order.orders?.illnessDesc" />
    </van-cell-group>

    <van-cell-group inset class="order">
      <p>订单信息</p>
      <p
        style="
          margin: 50px 0 30px 25px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <span>订单编号</span>

        <van-tag plain round type="primary" @click="copyToClipboard"
          >复制</van-tag
        >
        <input
          type="text"
          class="OrderNo"
          ref="textToCopy"
          :value="order.orders?.orderNo"
        />
        <!-- <span style="color: #a49799">{{}}</span> -->
      </p>
      <van-cell title="创建时间" :value="order.orders?.createTime"> </van-cell>
      <van-cell title="应付款" :value="'￥' + order.orders?.payment" />
      <van-cell title="优惠券" :value="'-￥' + order.orders?.couponDeduction" />
      <van-cell
        title="积分抵扣"
        :value="'-￥' + order.orders?.pointDeduction"
      />
      <van-cell title="实付款">
        <template #value>
          <span style="color: red">￥{{ order.orders?.actualPayment }}</span>
        </template>
      </van-cell>
    </van-cell-group>
    <div class="bottom">
      <van-button type="default" round>删除订单 </van-button>
      <van-button type="primary" round>咨询其他医生</van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
// 引入公共导航
import myTapbar from '@/components/my-tapbar.vue'
import { ref, reactive, toRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'
//引入 TS校验
import * as TS from './api/define'
//引入接口
import { getOrder } from './api/api'
import { showToast } from 'vant'
// 引入统一管理的code码校验
import { ECode } from '@/utils/PublicMethods'
const route = useRoute()
const id = ref(route.query.id)
const order = reactive<TS.OrderOrders>({
  orders: {}
})
// 请求数据
const queryList = () => {
  getOrder({ orderId: id.value }).then((res) => {
    if (res.code == ECode.Success) {
      order.orders = res.data
    }
  })
}
queryList()

const textToCopy = ref('')

const copyToClipboard = () => {
  navigator.clipboard
    .writeText(textToCopy.value._value)
    .then(() => {
      showToast('已复制')
    })
    .catch((error) => {
      console.error('复制到剪贴板失败:', error)
    })
}

// 订单类型
enum EOrder {
  '问医生' = 1,
  '极速问诊' = 2,
  '开药问诊' = 3,
  '药品订单' = 4
}
// 就诊情况
enum EConsultFlag {
  '未就诊',
  '就诊过'
}
//患病时间
enum EIllnessTime {
  '一周内' = 1,
  '一月内' = 2,
  '半年内' = 3,
  '半年以上' = 4
}
//订单状态
enum EStatus {
  '待支付' = 1,
  '待接诊' = 2,
  '咨询中' = 3,
  '已完成' = 4,
  '已取消' = 5
  // '待支付' = 10,
  // '待发货' = 11,
  // '待收货' = 12,
  // '已完成' = 13,
  // '已取消' = 14
}
</script>

<style lang="scss" scoped>
.askIllnessDetail {
  width: 100%;
  .top {
    width: 100%;
    background-image: linear-gradient(#fff, #dbf1ee);
    border-radius: 0 0 20px 20px;
    > .topContent {
      width: 100%;
      height: 130px;
      padding: 20px;
      box-sizing: border-box;
      position: relative;
      > .topContentTop {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        > .top-left {
          > p {
            margin-top: 10px;
          }
        }
      }
      > .topContentCard {
        position: relative;
        bottom: -20px;
        width: 100%;
        height: 80px;
        background: #fff;
        box-shadow: 1px 1px 1px #f3f3f3;
        padding: 20px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 10px;
        > div {
          width: 75%;
        }
      }
    }
  }
  .Patient {
    margin: 50px 0 20px 0;
  }
  .order {
    margin-bottom: 70px;
  }
  .bottom {
    width: 100%;
    height: 50px;

    background: #fff;
    text-align: right;
    position: fixed;
    bottom: 0;
    .van-button {
      margin-right: 20px;
    }
  }
}
.OrderNo {
  border: 0;
}
.myTapbar {
  position: fixed;
  top: 0;
  z-index: 10;
}
</style>
