<template>
  <div class="tapbar">
    <van-icon name="arrow-left" @click="goBack" class="icon" />
    <div class="title">{{ title }}</div>
    <div v-if="buttonName" class="btn" @click="rightClick">
      {{ buttonName }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
defineProps<{
  title: string
  buttonName?: string
}>()
const goBack = () => {
  router.go(-1)
}
const emit = defineEmits(['rightClick'])
const rightClick = () => {
  emit('rightClick')
}
</script>

<style lang="scss" scoped>
.tapbar {
  width: 100%;
  height: 50px;
  background: #fff;
  box-sizing: border-box;
  padding: 0 10px;
  display: flex;
  align-items: center;
  text-align: center;
  .icon {
    width: 20%;
    text-align: left;
    box-sizing: border-box;
    font-size: 20px;
  }
  .title {
    width: 60%;
    text-align: center;
  }
  .btn {
    width: 20%;
    color: #16c2a3;
  }
}
</style>
