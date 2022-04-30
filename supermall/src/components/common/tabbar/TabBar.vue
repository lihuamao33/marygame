<template>
    <div id="tab-bar">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name:"TabBar"
}
</script>
<style scoped>
  #tab-bar {
      /* 本身样式 */
      background-color: #dadada;
      height:49px;
      border-top:1px solid #eee;
      box-shadow:0px -1px 1px rgba(150, 159, 150, .08);
      /* 定位相关 */
      position: fixed;
      left:0;
      right:0;
      bottom:0;
      /* 利用flex进行布局 */
      display:flex;
      text-align:center;
  }
</style>