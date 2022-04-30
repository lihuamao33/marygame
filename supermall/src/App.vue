<template>
  <div id="app">
    <!-- keep-alive让Home不要随意销毁 -->
    <router-view v-slot="{ Component }" >
      <keep-alive exclude="DetailDetail">
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <!-- 用标签调用MainTabBar组件 -->
    <main-tab-bar ></main-tab-bar> 
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabbar/MainTabBar.vue";

export default {
  name: "App",
  components: {
    MainTabBar,
  },
};
</script>

<style>
@import "assets/css/base.css";
</style>
