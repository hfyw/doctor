<template>
  <div class="Drawer">
    <van-popup
      v-model:show="showRight"
      position="right"
      :style="{ width: '100%', height: '100%' }"
    >
      <van-nav-bar
        :title="title"
        left-arrow
        @click-left="goBack"
        right-text="保存"
        @click-right="SavingPatientInformation"
      />
      <div class="from">
        <div>
          <div>真实姓名</div>
          <input
            type="text"
            v-model="from.name"
            placeholder="请输入真实姓名"
            class="input"
          />
        </div>
        <div>
          <div>身份证号</div>
          <input
            type="idCard"
            v-model="from.idCard"
            placeholder="请输入身份证号"
            class="input"
          />
        </div>
        <div>
          <div>性别</div>
          <div class="input">
            <span
              v-for="(v, i) in sexList"
              :key="v.value"
              :class="{ ys: active == i }"
              @click="changeSex(i)"
              >{{ v.name }}</span
            >
          </div>
        </div>
        <div>
          <div>默认就诊人</div>

          <van-checkbox
            icon-size="40px"
            class="input"
            v-model="from.defaultFlag"
          ></van-checkbox>
        </div>

        <van-button
          v-if="title == '编辑患者'"
          @click="del"
          round
          block
          color="#f6f7f9"
          style="color: red; margin-top: 700px"
          >删除</van-button
        >
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
//引入TS校验
import * as TS from '../api/define'
// 引入接口 添加患者信息 修改患者信息  删除患者信息
import { AddPatient, EditPatient, DeletePatient } from '../api/api'
// 引入统一校验code码
import { ECode } from '@/utils/PublicMethods'

import { showToast, showConfirmDialog } from 'vant'
import router from '@/router'
const showRight = ref(false)
const props = defineProps(['title'])
const handler = (v: TS.PatientResObj) => {
  showRight.value = true
  if (v) {
    //编辑参数回填
    from = v
    active.value = v.gender
  }
}
defineExpose({ handler })
const active = ref(3)
//性别数组
const sexList = ref([
  { name: '女', value: 0 },
  { name: '男', value: 1 }
])

let from = reactive<TS.PatientDate>({
  name: '',
  idCard: '',
  gender: 0,
  defaultFlag: 0,
  genderValue: '',
  age: 0
})
//选择性别
const changeSex = (i: number) => {
  active.value = i
  from.gender = sexList.value[active.value].value
}
//返回上一级
const goBack = () => {
  showRight.value = false
}
//保存患者信息
const SavingPatientInformation = () => {
  if (from.defaultFlag) {
    from.defaultFlag = 1
  } else {
    from.defaultFlag = 0
  }
  delete from.genderValue
  delete from.age
  if (props.title == '添加患者') {
    //添加患者
    AddPatient(from).then((res) => {
      let { code, message } = res
      if (code == ECode.Success) {
        showRight.value = false
        showToast('添加成功')
        emit('NotifyParent')
      } else {
        showToast(message)
      }
    })
  } else if (props.title == '编辑患者') {
    //编辑患者
    EditPatient(from).then((res) => {
      let { code, message } = res
      if (code == ECode.Success) {
        showRight.value = false
        showToast('编辑成功')
        emit('NotifyParent')
      } else {
        showToast(message)
      }
    })
  }
}
const emit = defineEmits(['NotifyParent'])
//删除患者信息
const del = () => {
  showConfirmDialog({
    title: '温馨提示',
    message: `您确认要删除 ${from.name}患者信息吗 ？`
  })
    .then(() => {
      DeletePatient({ id: from.id }).then((res) => {
        let { code, message } = res
        if (code == ECode.Success) {
          showRight.value = false
          showToast('删除成功')
          emit('NotifyParent')
        } else {
          showToast(message)
        }
      })
    })
    .catch(() => {
      // on cancel
    })
}
</script>

<style lang="scss" scoped>
.from {
  width: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    > div {
      width: 25%;
      margin-right: 20px;
    }
    > .input {
      width: 70%;
      height: 50px;
      line-height: 50px;
      border: 0;
      vertical-align: middle;
      > span {
        display: inline-block;
        width: 60px;
        height: 30px;
        background: #f6f7f9;
        line-height: 30px;
        border-radius: 5px;
        text-align: center;
        margin-right: 20px;
      }
    }
  }
}
.ys {
  border: 1px solid #16c2a3;
}
</style>
