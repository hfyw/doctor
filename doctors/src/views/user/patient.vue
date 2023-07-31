<template>
  <div class="patient">
    <van-nav-bar title="选择患者" left-arrow @click-left="router.go(-1)" />
    <div class="patientBox">
      <div class="patient-change">
        <h3 style="font-weight: 100; margin-bottom: 10px">请选择患者信息</h3>
        <p>以便医生给出更准确的治疗，信息仅医生可见</p>
      </div>
      <ul>
        <li
          v-for="(v, i) in list"
          :key="v.id"
          :class="{ ys: active == i }"
          @click="SelectingPatients(i)"
        >
          <div>
            <div class="name">
              <div>{{ v.name }}</div>
              <div>{{ IdCard(v.idCard) }}</div>
              <van-tag type="primary" v-show="v.defaultFlag">默认</van-tag>
            </div>
            <div class="sex">
              <div>{{ v.genderValue }}</div>
              <div>{{ v.age }}岁</div>
            </div>
          </div>
          <van-icon name="edit" @click="handlerEdit(v)" />
        </li>
      </ul>
      <div class="add" @click="addFlag" v-if="list.length != 6">
        <van-icon name="plus" />
        <p>添加患者</p>
      </div>
      <p>最多可添加6人</p>
      <van-button type="primary" round block @click="next">下一步</van-button>
    </div>
    <!-- 抽屉 -->
    <myDrawer
      ref="drawer"
      v-if="myDrawerFlag"
      :title="title"
      @NotifyParent="NotifyParent"
    />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import myDrawer from './components/Drawer.vue'
import { ref } from 'vue'
//引入接口  查询患者列表信息
import { QueryPatientList } from './api/api'
// 引入统一管理的code码
import { ECode } from '@/utils/PublicMethods'
// TS校验
import * as TS from './api/define'
//引入pinia
import { useUserStore } from '@/stores'
const user = useUserStore()
import { nextTick } from 'vue'
//子组件的dom状态
const myDrawerFlag = ref(false)
const router = useRouter()
const active = ref(0)
//drawer的dom元素
const drawer = ref()
//给子组件的标题
const title = ref('添加')
// 患者列表
const list = ref<TS.PatientRes>([])
const queryList = () => {
  QueryPatientList().then((res) => {
    console.log(res)
    if (res.code == ECode.Success) {
      list.value = res.data
      /***查找到默认的那条数据的下标 赋值给 默认选中的状态 实现默认一直在选中*/
      active.value = list.value.findIndex((i) => i.defaultFlag == 1)
    }
  })
}
queryList()
//选择患者信息
const SelectingPatients = (i: number) => {
  active.value = i
}
//打开添加
const addFlag = () => {
  myDrawerFlag.value = true
  title.value = '添加患者'
  nextTick(() => {
    drawer.value.handler()
  })
}

//编辑回填
const handlerEdit = (v: TS.PatientResObj) => {
  myDrawerFlag.value = true
  title.value = '编辑患者'

  nextTick(() => {
    drawer.value.handler(v)
  })
}
//子组件做完通知父组件重新请求
const NotifyParent = () => {
  myDrawerFlag.value = false
  queryList()
}
//下一步
const next = () => {
  user.setPatientInfo(list.value[active.value])
  router.push('/consult/pay')
}
//处理身份证
const IdCard = (v: string) => {
  let a = v.slice(0, 6)
  let b = v.slice(-4)
  return `${a}******${b}`
}
</script>

<style lang="scss" scoped>
.patientBox {
  width: 100%;
  padding: 0 30px;
  box-sizing: border-box;
  .patient-change {
    margin: 30px 0;
  }
  ul {
    width: 100%;
    margin-bottom: 20px;
    li {
      width: 100%;
      height: 97px;
      background: #f6f7f9;
      border-radius: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      box-sizing: border-box;
      margin-bottom: 20px;
      > div {
        width: 90%;
        > .name {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          > div {
            margin-right: 20px;
          }
          .van-tag {
            flex-shrink: 0;
          }
        }
        > .sex {
          display: flex;
          align-items: center;
          color: #c3c7d4;
          div {
            margin-right: 30px;
          }
        }
      }
    }
  }
  .add {
    width: 100%;
    text-align: center;
    box-sizing: border-box;
    border-radius: 10px;
    background: #f6f7f9;
    color: #16c2a3;
    padding: 20px 0;
    margin-bottom: 20px;
    > .van-icon {
      font-size: 30px;
    }
    > span {
      margin-left: 10px;
    }
  }
  > p {
    margin-bottom: 150px;
  }
}
</style>
