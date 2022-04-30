<template>
<!-- 详情页轮播图 -->
  <div class="detail-swiper">
      <swiper-swiper class="swiperswiper">
          <swiper-item v-for="item in topImages" :key="item">
              <img :src="item" alt="">
          </swiper-item>
      </swiper-swiper>
  </div>
</template>
<script>
import {SwiperSwiper, SwiperItem} from 'components/common/swiper'
export default {
  name: 'DetailSwiper',
  components: {
      SwiperSwiper,
      SwiperItem,
  },
  /* 把详情页面轮播图数据传过来 */
  props: {
      topImages: {
          type: Array,
          default() {
              return []
          }
      }
  },
  data () {
   return {}
  },
   methods:{}
}
</script>
<style scoped>
.swiperswiper {
    height:300px;
    overflow:hidden;
}
</style>