<template>
  <div class="home">
    <router-view />
    <van-tabbar route active-color="#16c2a3">
      <van-tabbar-item replace to="/home" icon="wap-home">首页</van-tabbar-item>
      <van-tabbar-item replace to="/article" icon="search"
        >健康百科</van-tabbar-item
      >
      <van-tabbar-item replace to="/notify" icon="friends-o"
        >消息中心</van-tabbar-item
      >
      <van-tabbar-item replace to="/use" icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
