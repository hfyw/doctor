<template>
  <div class="fast">
    <myTapbar title="极速问诊" buttonName="问诊记录" @rightClick="rightClick" />
    <div class="contentBox">
      <div class="img">
        <img
          src="https://cp.itheima.net/assets/consult-fast.d1432ec9.png"
          alt=""
        />
      </div>
      <p><span style="color: #28bfce">20s</span>快速匹配专业医生</p>
      <div class="cell">
        <div @click="SelectDepartment">
          <svg>
            <use href="#icon-yisheng"></use>
          </svg>
          <div>
            <p>三甲图文问诊</p>
            <span>三甲主治及以上级别医生</span>
          </div>
          <van-icon name="arrow" />
        </div>
        <div>
          <svg>
            <use href="#icon-yisheng"></use>
          </svg>
          <div>
            <p>普通图文问诊</p>
            <span>二甲主治及以上级别医生</span>
          </div>
          <van-icon name="arrow" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//引入导航栏
import myTapbar from '@/components/my-tapbar.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

//去问诊记录
const rightClick = () => {
  router.push('/user/consult')
}
//选择科室
const SelectDepartment = () => {
  router.push('/consult/dep')
}
</script>

<style lang="scss" scoped>
.fast {
  width: 100%;
  .contentBox {
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;

    > .img {
      width: 80%;
      margin: 20px auto;
      > img {
        width: 100%;
      }
    }
    > p {
      margin: 10px 0;
      text-align: center;
    }
    .cell {
      width: 100%;
      margin-top: 30px;
      > div {
        width: 100%;
        border-radius: 10px;
        border: 1px solid #f9f9f9;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        box-sizing: border-box;
        margin-top: 20px;
        > svg {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #1ab8cb;
        }
      }
    }
  }
}
</style>
