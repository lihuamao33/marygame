<template>
<!-- 商品每项内容 -->
<div class="goods-item" @click="itemClick">
      <img :src="showImage" @load="imageLoad">
      <div class="goods-info">
        <!-- 流行、新款、精选分类下 展示商品名称 -->
        <p>{{goodsItem.title}}</p>
        <!-- 商品价格 -->
        <span class="price">{{goodsItem.price}}</span>
        <!-- 商品收藏量 -->
        <span class="collect">{{goodsItem.cfav}}</span>
      </div>
  </div>

</template>
<script>
export default {
  name: 'GoodsListItem',
  props: {
      goodsItem: {
          type: Object,
          default() {
              return{}
          }
      }
  },
  data () {
   return {}
  },
  computed: {
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img
    }
  },
   methods:{
     imageLoad() {
       this.$bus.emit('itemImageLoad')
     },
     itemClick() {
       //用动态路由的方式获取到每个商品id
       this.$router.push('/detail/' + this.goodsItem.iid)
     }  
   }
}
</script>
<style scoped>
.goods-item {
  position:relative;/* goods-info使用绝对定位进行定位，为整体添加相对定位使其固定 */
  padding-top:10px;
  padding-bottom:40px;/* 每张图片下方设置40px空白，用来放goods-info内容 */
  /* width: 130px;
  display: inline-block;
  float:left;   用浮动的方式实现一行只有两个图片
  margin-left:5px;
  margin-right:5px; */  

  /* 用flex方式实现一行两张图片，比浮动简单 */
  width:48%; /* 用百分比大小设置可以适应不同尺寸屏幕 */

}
.goods-item img {
  width: 100%;/* 图片显示为100%，让图片按div边框等比例缩放 */
  border-radius: 5px;/* 设置图片为圆角 */
}
/* 单个图片描述和价格收藏量为一个整体div，名称取为goods-info */
.goods-info {
  font-size: 14px;
  position:absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow:hidden;
  text-align:center;
}
.goods-info p {
  /**
    text-overflow:ellpsis被截断的内容文本用...代替可以减少文本内容
    其中text-overflow属性用于确定如何向用户发出未显示的溢出内容信号
    white-space用来设置如何处理元素中的空白，当值为nowrap时连续的空白符会被合并，对文本内换行无效
    总之，overflow:hidden;text-overflow:ellipsis;white-space: nowrap;这三个样式保证文本内容特别长
    且不能换行的情况下内容不能溢出边框，多出部分用省略号代替。
  */
  overflow:hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.goods-info .price {
  color: var(--color-high-text);
  margin-right:20px;
}
.goods-info .collect {
  position:relative;
}
/* collect收藏前的小图标 */
.goods-info .collect::before {
  content:'';
  position:absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>