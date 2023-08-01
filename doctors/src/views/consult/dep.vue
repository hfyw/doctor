<template>
  <div class="dep">
    <myTapbar title="选择科室" />
    <div class="content">
      <div class="left">
        <div
          v-for="(v, index) in data.list"
          :key="v.id"
          @click="changeAside(index)"
          :class="{ ys1: active == index }"
        >
          {{ v.name }}
        </div>
      </div>
      <div class="right">
        <div
          v-for="v in data.list[active]?.child"
          :key="v.id"
          @click="goIllness"
        >
          {{ v.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import myTapbar from '@/components/my-tapbar.vue'
import { QueryAllDepartments } from './api/api'
import { useRouter } from 'vue-router'
import { ECode } from '@/utils/PublicMethods'
import * as TS from './api/define'
import { ref } from 'vue'
import { reactive } from 'vue'
const router = useRouter()
const data = reactive<TS.data>({
  list: []
})
//获取列表数据
const getList = () => {
  QueryAllDepartments().then((res) => {
    if (res.code === ECode.Success) {
      data.list = res.data
    }
  })
}
getList()
const active = ref(0)
const changeAside = (index: number) => {
  active.value = index
}
// 去疾病页面
const goIllness = () => {
  router.push('/consult/illness')
}
</script>

<style lang="scss" scoped>
.dep {
  width: 100%;
  .content {
    width: 100%;
    height: calc(100vh - 40px);
    display: flex;
    justify-content: space-between;
    > .left {
      width: 30%;
      height: calc(100vh - 40px);
      overflow-y: scroll;
      > div {
        width: 100%;
        height: 50px;
        line-height: 50px;
        padding-left: 10px;
        box-sizing: border-box;
        background: #f7f8fa;
      }
    }
    > .right {
      width: 70%;
      > div {
        width: 100%;
        height: 50px;
        line-height: 50px;
        padding-left: 20px;
        box-sizing: border-box;
        color: #979797;
      }
    }
  }
}
.ys1 {
  background-color: #fff !important;
}
</style>
