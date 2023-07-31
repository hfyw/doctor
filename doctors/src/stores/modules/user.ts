import type { User, ImgTxt, patientInfo } from '@/types/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'cp-user',
  () => {
    // 用户信息
    const user = ref<User>()
    //图文信息
    const imgTxt = ref<ImgTxt>()
    // 患者信息
    const patientInfo = ref<patientInfo>()

    // 设置用户，登录后使用
    const setUser = (u: User) => {
      user.value = u
    }
    // 设置图文，
    const setImgTxt = (u: ImgTxt) => {
      imgTxt.value = u
    }
    //设置患者信息
    const setPatientInfo = (u: patientInfo) => {
      patientInfo.value = u
    }
    // 清空用户，退出后使用
    const delUser = () => {
      user.value = undefined
    }
    return {
      user,
      imgTxt,
      setUser,
      patientInfo,
      delUser,
      setImgTxt,
      setPatientInfo
    }
  },
  {
    persist: true
  }
)
