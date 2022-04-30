<template>
<!-- 详情页商品内容详细描述 -->
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
      <!-- 商品详情图片上方文字 -->
      <div class="info-desc clear-fix">
          <!-- 左侧横短线 -->
          <div class="start"></div>
          <!-- 文字描述 -->
          <div class="desc">{{detailInfo.desc}}</div>
          <!-- 右侧横短线 -->
          <div class="end"></div>
      </div>
      <!-- 商品描述穿着效果 -->
      <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
      <!-- 商品展示图片 -->
      <div class="info-list">
          <img v-for="(item, index) in detailInfo.detailImage[0].list" 
                :key="index" 
                :src="item" 
                @load="imgLoad">
      </div>
    </div>
</template>
<script> 
export default {
  name: 'DetailGoodsInfo',
  props: {
      detailInfo: {
          type: Object
      }
  },
  data () {
   return {
       counter: 0,
       imagesLength: 0
   }
  },
   methods:{
       imgLoad() {
           //判断所有的图片加载完了，进行一次 回调就可以了
           if(++this.counter === this.imagesLength) {
               this.$emit('imageLoad')
           }
       }
   },
   watch: {
       detailInfo() {
           //获取图片的个数
           this.imagesLength = this.detailInfo.detailImage[0].list.length
       }
   }
}
</script>
<style scoped>
.goods-info {
    border-bottom: 5px solid #f2f5f8;
}
.info-desc {
    padding: 0 15px;
}
.info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
}
.info-list img {
    width: 100%;
}
/* 小横短线左浮动 */
.info-desc .start {
    float: left;
}
/* 小横短线右浮动 */
.info-desc .end {
    float: right;
}
/* 设置短线样式 */
.info-desc .start, .info-desc .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a3;
    position: relative;
}
/* 给短线加上小黑方块 */
.info-desc .start::before, .info-desc .end::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
}
/* 让第二个短线小黑方块位于右侧 */
.info-desc .end::after {
    right: 0;
}
/* 设置文字描述部分样式 */
.info-desc .desc {
    padding: 15px 0;
    font-size: 14px;
}
</style>