<template>
  <div class="ConsultView">
    <myTapbar title="问诊记录" />
    <van-tabs v-model:active="active" @change="changeTab" :sticky="true">
      <van-tab v-for="v in tabList.list" :key="v.id" :title="v.name">
        <div
          v-if="lists.list.length == 0"
          style="
            height: 100vh;
            background-color: #f6f7f9;
            text-align: center;
            line-height: 100px;
          "
        >
          没有更多了
        </div>
        <template v-if="lists.list.length != 0">
          <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div class="card">
              <div v-for="v in lists.list" :key="v.id" @click="goDetail(v.id)">
                <p>
                  <img
                    src="https://cp.itheima.net/assets/avatar-doctor.6cf240f4.svg"
                    alt=""
                  />
                  <span style="width: 60%">{{ v.docInfo.name }}</span>
                  <span
                    :class="
                      v.statusValue == '咨询中'
                        ? 'zixunzhong'
                        : v.statusValue == '待支付'
                        ? 'daizhifu'
                        : 'yiquxiao'
                    "
                    >{{ v.statusValue }}</span
                  >
                </p>
                <div class="bg">
                  <div class="left">
                    <p>病情描述</p>
                    <p>价格</p>
                    <p>创建时间</p>
                  </div>
                  <div>
                    <p>{{ v.illnessDesc }}</p>
                    <p>￥{{ v.payment.toFixed(2) }}</p>
                    <p style="color: #ccc">{{ v.createTime }}</p>
                  </div>
                </div>
                <div style="text-align: right" @click.stop="OnParent">
                  <!-- 
                1、已取消时显示 灰色删除订单、绿色咨询其他医生
                2、咨询中时显示 灰色查看处方、绿色继续沟通
                3、待接诊时显示 灰色取消问诊、绿色继续沟通
                4、已完成时显示 灰色问诊记录、绿色去评价 且显示更多按钮
                5、待支付时显示 灰色问诊记录、绿色去支付 且显示更多按钮
               -->
                  <span v-if="v.statusValue == '已完成'" @click="More">
                    更多
                  </span>
                  <van-button
                    :data="JSON.stringify({ id: v.id, val: 7 })"
                    v-if="v.statusValue == '已完成'"
                    round
                    size="small"
                    color="#f6f7f9"
                    style="margin: 0 20px 0 300px; color: #111"
                    >问诊记录</van-button
                  >
                  <van-button
                    :data="JSON.stringify({ id: v.id, val: 6 })"
                    v-if="v.statusValue == '待接诊'"
                    round
                    size="small"
                    color="#f6f7f9"
                    style="margin-right: 20px; color: #111"
                    >取消问诊</van-button
                  >
                  <van-button
                    :data="JSON.stringify({ id: v.id, val: 6 })"
                    v-if="v.statusValue == '待支付'"
                    round
                    size="small"
                    color="#f6f7f9"
                    style="margin-right: 20px; color: #111"
                    >取消问诊</van-button
                  >
                  <van-button
                    :data="JSON.stringify({ id: v.id, val: 0 })"
                    v-if="v.statusValue == '已取消'"
                    round
                    size="small"
                    color="#f6f7f9"
                    style="margin-right: 20px; color: #111"
                    >删除订单</van-button
                  >

                  <van-button
                    :data="JSON.stringify({ id: v.id, val: 1 })"
                    v-if="v.statusValue == '咨询中'"
                    round
                    size="small"
                    color="#f6f7f9"
                    style="margin-right: 20px; color: #111"
                    >查看处方</van-button
                  >
                  <van-button
                    :data="JSON.stringify({ id: v.id, val: 2 })"
                    plain
                    size="small"
                    hairline
                    type="primary"
                    round
                    v-if="v.statusValue == '已取消'"
                    >咨询其他医生</van-button
                  >
                  <van-button
                    :data="JSON.stringify({ id: v.id, val: 3 })"
                    plain
                    size="small"
                    hairline
                    type="primary"
                    round
                    v-if="v.statusValue == '咨询中'"
                    >继续沟通</van-button
                  >
                  <van-button
                    :data="JSON.stringify({ id: v.id, val: 3 })"
                    plain
                    size="small"
                    hairline
                    type="primary"
                    round
                    v-if="v.statusValue == '待接诊'"
                    >继续沟通</van-button
                  >
                  <van-button
                    :data="JSON.stringify({ id: v.id, val: 4 })"
                    plain
                    size="small"
                    hairline
                    type="primary"
                    round
                    v-if="v.statusValue == '已完成'"
                    >去评价</van-button
                  >

                  <van-button
                    :data="JSON.stringify({ id: v.id, val: 5 })"
                    plain
                    size="small"
                    hairline
                    type="primary"
                    round
                    v-if="v.statusValue == '待支付'"
                    >去支付</van-button
                  >
                </div>
              </div>
            </div>
          </van-list>
        </template>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup lang="ts">
// 引入导航栏子组件
import myTapbar from '@/components/my-tapbar.vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'
import { reactive, ref } from 'vue'
//引入接口  获取订单列表  查看处方        删除订单      //取消订单
import {
  getOrderList,
  lookPrescription,
  DelOrider,
  CancelOrder
} from './api/api'
//引入统一的code码
import { ECode } from '@/utils/PublicMethods'
//TS 校验
import * as TS from './api/define'
import { showImagePreview, showSuccessToast } from 'vant'

const router = useRouter()
const active = ref(0)
const RequestData = reactive({
  current: '1',
  pageSize: '10',
  type: '2'
})

// 上啦加载的几个状态
const loading = ref(false) //是否在加载的状态
const finished = ref(false) //加载是否完成状态
const timer = ref(false)
const tabList = reactive({
  list: [
    { name: '极速问诊', id: '2' },
    { name: '找医生', id: '1' },
    { name: '开药问诊', id: '3' }
  ]
})
// 列表数据
const lists = reactive<TS.listsList>({
  list: []
})
const total = ref(0)

// 切换tab
const changeTab = () => {
  RequestData.type = tabList.list[active.value].id
  queryOrderList()
}
const queryOrderList = () => {
  getOrderList(RequestData).then((res) => {
    if (res.code == ECode.Success) {
      total.value = res.data.total
      lists.list = [...lists.list, ...res.data.rows]
      loading.value = false
      timer.value = false
    }
  })
}
queryOrderList()
//去详情页面
const goDetail = (id: string) => {
  router.push({
    path: '/user/askIllnessDetail',
    query: { id }
  })
}

//上啦加载
const onLoad = () => {
  if (!timer.value) {
    clearTimeout(timer.value)
  }
  timer.value = setTimeout(() => {
    ++RequestData.current
    queryOrderList()

    if (lists.list.length >= total.value) {
      finished.value = true
    }
  }, 1000)
}

// 更多
const More = () => {
  console.log(1)
}

//几个按钮的方法
/***
 *  id:0 删除订单
 *  id:1 查看处方
 *  id:2 咨询其他医生
 *  id:3 继续沟通
 *  id:4 去评价
 *  id:5 去支付
 *  id:6  取消问诊
 *  id:7 问诊记录
 * */
const OnParent = (e: { target: { getAttribute: (arg0: string) => any } }) => {
  if (!e.target.getAttribute('data')) {
    return
  }
  let v = JSON.parse(e.target.getAttribute('data'))
  let { val, id } = v
  if (val == 0) {
    // 删除订单
    DelOrider({ id }).then((res) => {
      if (res.code == ECode.Success) {
        showSuccessToast('删除订单成功')
      }
    })
  } else if (val == 1) {
    // 查看处方
    lookPrescription({ id }).then((res) => {
      if (res.code == ECode.Success) {
        showImagePreview([res.data.url])
      }
    })
  } else if (val == 2) {
    // 咨询其他医生
    router.push('/')
  } else if (val == 3) {
    // 继续沟通
    // 去问诊室
    // router.push('/')
  } else if (val == 4) {
    // 去评价
    // router.push('/')
  } else if (val == 5) {
    //去支付
    router.push({
      path: '/user/askIllnessDetail',
      query: { id }
    })
  } else if (val == 6) {
    // 取消订单
    CancelOrder({ id }).then((res) => {
      if (res.code == ECode.Success) {
        showSuccessToast('取消订单成功')
      }
    })
  } else if (val == 7) {
    // 问诊记录
    // router.push('/')
  }
}
</script>

<style lang="scss" scoped>
.ConsultView {
  width: 100%;
  .card {
    width: 100%;
    background: #f6f7f9;
    padding: 20px 20px 0;
    box-sizing: border-box;
    > div {
      width: 100%;
      margin-bottom: 20px;
      border-radius: 10px;
      background: #fff;
      padding: 10px;
      box-sizing: border-box;
      > p {
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 30px;
        border-bottom: 1px solid #ccc;
      }
      > .bg {
        display: flex;
        margin: 20px 0;
        > .left {
          color: #ccc;
          margin-right: 20px;
        }
        > div {
          > p {
            margin: 10px 0;
          }
        }
      }
    }
  }
}
.yiquxiao {
  color: #ccc;
}

.zixunzhong {
  color: #61c2b8;
}
.daizhifu {
  color: #f2994a;
}
</style>
