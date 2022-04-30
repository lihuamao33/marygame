<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :key="item" :goods-item="item"></goods-list-item>
  </div>
</template>
<script>
import GoodsListItem from './GoodsListItem'
export default {
  name: 'GoodsList',
  components: {
    GoodsListItem
  },
  props: {
    goods: {
      type:Array,
      default() {
        return []
      }
    }
  },
   methods:{}
}
</script>
<style scoped>
.goods {
  width: 100%;/* 不同屏幕均按这个比例显示 */
  display: flex; /* 用flex实现一行两列图片布局 */
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 2px;
}
</style>