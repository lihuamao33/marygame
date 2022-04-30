<template>
<!-- 购物车列表组件 -->
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item, index) in cartList" :key="index" :item-info="item"></cart-list-item>
    </scroll>
  </div>
</template>
<script>
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem.vue'
import {mapGetters} from 'vuex'
export default {
  name: 'CartList',
  components: {
    Scroll,
    CartListItem,
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated() {
    this.$refs.scroll.refresh()
  },
  data () {
   return {}
  },
   methods:{}
}
</script>
<style scoped>
.content {
  /* 整体高度减去头部导航，尾部导航，底部汇总 */
  height:calc(100vh - 44px - 58px - 32px);/* (把百分号换成vh就能滚动了也不知道啥原因) */
  overflow: hidden;
}
</style>