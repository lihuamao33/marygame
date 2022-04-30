<template>
  <swiper-swiper ref="swiper" v-if="banners.length">
    <swiper-item v-for="item in banners" :key="item.id">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper-swiper>
</template>
<script>
import {SwiperSwiper,SwiperItem} from 'components/common/swiper'
export default {
  name: 'HomeSwiper',
  components: {
      SwiperSwiper,
      SwiperItem
  },
  props: {
      banners: {
          type:Array,
          default() {
              return []
          }
      }
  },
  data () {
   return {
     isLoad: false,
   }
  },
   methods:{
     imageLoad() {
       if (!this.isLoad) {
         this.$emit('swiperImageLoad')
         this.isLoad = true
       }
     }
   },
}
</script>
<style scoped>
</style>