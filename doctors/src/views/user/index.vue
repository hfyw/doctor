<template>
  <div class="user">
    <div class="top">
      <div class="img">
        <img
          style="width: 150px; height: 150px; margin-right: 20px"
          :src="userInfo.user.avatar"
          alt=""
        />
        <div>
          <p style="margin: 20px 0">{{ userInfo.user.account }}</p>
          <svg style="width: 50px; height: 50px">
            <use href="#icon-edit-copy"></use>
          </svg>
        </div>
      </div>
      <nav>
        <div>
          <p>{{ userInfo.user.collectionNumber }}</p>
          <span>收藏</span>
        </div>
        <div>
          <p>{{ userInfo.user.likeNumber }}</p>
          <span>关注</span>
        </div>
        <div>
          <p>{{ userInfo.user.score }}</p>
          <span>积分</span>
        </div>
        <div>
          <p>{{ userInfo.user.couponNumber }}</p>
          <span>优惠券</span>
        </div>
      </nav>
    </div>
    <div class="bottom">
      <div class="DrugOrders">
        <div>
          <p style="font-weight: 800">药品订单</p>
          <span style="color: #c4c7cf" @click="router.push('/order')"
            >全部订单<van-icon name="arrow"
          /></span>
        </div>
        <ul>
          <li>
            <svgIcon name="paid" width="80px" height="50px"></svgIcon>
            <p>待付款</p>
            <van-badge
              v-if="userInfo.user.orderInfo?.paidNumber != 0"
              :content="userInfo.user.orderInfo?.paidNumber"
              class="Logo"
            />
          </li>
          <li>
            <svgIcon name="shipped" width="80px" height="50px"></svgIcon>
            <p>待发货</p>
            <van-badge
              v-if="userInfo.user.orderInfo?.receivedNumber != 0"
              :content="userInfo.user.orderInfo?.receivedNumber"
              class="Logo"
            />
          </li>
          <li>
            <svgIcon name="received" width="80px" height="50px"></svgIcon>
            <p>待收货</p>
            <van-badge
              v-if="userInfo.user.orderInfo?.shippedNumber != 0"
              :content="userInfo.user.orderInfo?.shippedNumber"
              class="Logo"
            />
          </li>
          <li>
            <svgIcon name="finished" width="80px" height="50px"></svgIcon>
            <p>已完成</p>
            <van-badge
              v-if="userInfo.user.orderInfo?.finishedNumber != 0"
              :content="userInfo.user.orderInfo?.finishedNumber"
              class="Logo"
            />
          </li>
        </ul>
      </div>
      <div class="foot">
        <h3>快捷工具</h3>
        <ul class="tolls">
          <li @click="router.push('user/consult')">
            <div>
              <SvgIcon name="tool-01" width="40px" height="40px"></SvgIcon>
              <p>我的问诊</p>
            </div>
            <div>
              <SvgIcon name="arrow" width="40px" height="40px"></SvgIcon>
            </div>
          </li>
          <li>
            <div>
              <SvgIcon name="tool-02" width="40px" height="40px"></SvgIcon>
              <p>我的处方</p>
            </div>
            <div>
              <SvgIcon name="arrow" width="40px" height="40px"></SvgIcon>
            </div>
          </li>
          <li>
            <div>
              <SvgIcon name="tool-03" width="40px" height="40px"></SvgIcon>
              <p>家庭档案</p>
            </div>
            <div>
              <SvgIcon name="arrow" width="40px" height="40px"></SvgIcon>
            </div>
          </li>
          <li>
            <div>
              <SvgIcon name="tool-04" width="40px" height="40px"></SvgIcon>
              <p>地址管理</p>
            </div>
            <div>
              <SvgIcon name="arrow" width="40px" height="40px"></SvgIcon>
            </div>
          </li>
          <li>
            <div>
              <SvgIcon name="tool-05" width="40px" height="40px"></SvgIcon>
              <p>我的评价</p>
            </div>
            <div>
              <SvgIcon name="arrow" width="40px" height="40px"></SvgIcon>
            </div>
          </li>
          <li>
            <div>
              <SvgIcon name="tool-06" width="40px" height="40px"></SvgIcon>
              <p>官方客服</p>
            </div>
            <div>
              <SvgIcon name="arrow" width="40px" height="40px"></SvgIcon>
            </div>
          </li>
          <li>
            <div>
              <SvgIcon name="tool-07" width="40px" height="40px"></SvgIcon>
              <p>设置</p>
            </div>
            <div>
              <SvgIcon name="arrow" width="40px" height="40px"></SvgIcon>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <p @click="goBack">退出登录</p>
  </div>
</template>

<script setup lang="ts">
//引入路由方法
import { useRouter } from 'vue-router'
//引入接口
import { getUserInfo } from './api/api'
// 引入统一的code码校验
import { ECode } from '@/utils/PublicMethods'
import * as TS from './api/define'
import { reactive } from 'vue'
import { showConfirmDialog } from 'vant'
import { useUserStore } from '@/stores'
const user = useUserStore()
const router = useRouter()
const userInfo = reactive<TS.obj>({
  user: {}
})
const queryUserInfo = () => {
  getUserInfo().then((res) => {
    if (res.code == ECode.Success) {
      userInfo.user = res.data
    }
  })
}
queryUserInfo()
//退出登录
const goBack = () => {
  showConfirmDialog({
    title: '温馨提示',
    message: '您确认要退出优医问诊吗？'
  })
    .then(() => {
      // on confirm
      user.delUser()
      router.replace('/login')
    })
    .catch(() => {
      // on cancel
    })
}
</script>

<style lang="scss" scoped>
.user {
  width: 100%;
  height: 100%;
  .top {
    width: 100%;
    height: 200px;
    padding: 50px 20px 0;
    box-sizing: border-box;
    background: linear-gradient(#9ddad4, #e0f0f0);
    .img {
      width: 100%;
      display: flex;
    }
    nav {
      width: 100%;
      margin-top: 20px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      > div {
        text-align: center;
        > p {
          margin-bottom: 5px;
          font-size: 20px;
        }
        > span {
          color: #9d9b99;
          font-size: 11px;
        }
      }
    }
  }
  .bottom {
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    background: #f6f7f9;
    overflow: hidden;
    .DrugOrders {
      width: 100%;
      margin-top: 20px;
      border-radius: 10px;
      background: #fff;
      padding: 10px 20px;
      box-sizing: border-box;
      > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      > ul {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        > li {
          position: relative;
          text-align: center;
          > .Logo {
            position: absolute;
            top: 0px;
            right: 0px;
          }
        }
      }
    }

    .foot {
      margin-top: 15px;
      border-radius: 6px;
      padding: 10px 15px;
      box-sizing: border-box;
      background-color: #fff;
      ul {
        width: 100%;
        li {
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding: 15px 0;
          box-sizing: border-box;
          > div:first-child {
            display: flex;
            p {
              margin-left: 8px;
            }
          }
        }
      }
    }
  }
  > p {
    width: 100%;
    text-align: center;
    color: red;
    background: #f6f7f9;
    line-height: 50px;
    margin-bottom: 50px;
  }
}
</style>
