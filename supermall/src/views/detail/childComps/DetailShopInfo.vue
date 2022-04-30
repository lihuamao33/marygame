<template>
  <div class="shop-info">
    <!-- 商店头部内容 -->
      <div class="shop-top">
        <img :src="shop.logo" alt="">
        <span class="title">{{shop.name}}</span>
      </div>
      <!-- 商店中间内容 -->
      <div class="shop-middle">
        <!-- 中间内容左侧部分 -->
        <div class="shop-middle-item shop-middle-left">
          <!-- 总销量 -->
          <div class="info-sells">
            <!-- 销量数量 -->
            <div class="sells-count">
              {{sellCountFilter}}
            </div>
            <div class="sells-text">总销量</div>
          </div>
          <div class="info-goods">
            <div class="goods-count">
              {{shop.goodsCount}}
            </div>
            <div class="goods-text">全部宝贝</div>
          </div>
        </div>
        <!-- 中间内容右侧部分 -->
        <div class="shop-middle-item shop-middle-right">
          <table>
            <tr v-for="(item,index) in shop.score" :key="index">
              <td>{{item.name}}</td>
              <td class="score" :class="{'score-better': item.isBetter}">{{item.score}}</td>
              <td class="better" :class="{'better-more': item.isBetter}"><span>{{item.isBetter ? '高':'低'}}</span></td>
            </tr>
          </table>
        </div>
      </div>
      <!-- 商店底部内容 -->
      <div class="shop-bottom">
          <div key="enter-shop">进店逛逛</div>
      </div>
  </div>
</template>
<script>
export default {
  name: 'DetailShopInfo',
  props: {
    shop: {
      type: Object,
    }
  },
  data() {
    return {}
  },
  //替代过滤器使总销量数据变成以“万”结尾
  computed: {
    sellCountFilter() {
      if (this.shop.sells < 10000) return this.shop.sells;
      return (this.shop.sells/10000).toFixed(1) + '万'
    }
  },
}
</script>
<style scoped>
.shop-info {
  padding: 25px 8px;
  border-bottom: 5px solid #fff;
}
.shop-top {
  line-height: 45px;
  /* 元素垂直中心对齐 */
  display: flex;
  align-items: center;
}
.shop-top img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 1px solid rgba(0,0,0.1);
}
.shop-top .title {
  margin-left: 10px;
  vertical-align: center;/* 垂直对齐 */
}
.shop-bottom {
  text-align: center;
  margin-top: 10px; 
}
.shop-middle {
  margin-top: 15px;
  display: flex;
  align-items: center;
}
.shop-middle-item {
  flex: 1;
}
.shop-middle-left {
  display: flex;
  justify-content: space-evenly;/*设置子项目在主轴方向上的对齐方式（效果与主轴方向有关，下面假设从左到右）*/
  color: #333;
  text-align: center;
  border-right: 1px solid rgba(0,0,0,.1);
}
.sells-count, .goods-count {
  font-size: 18px;
}
.sells-text, .goods-text {
  margin-top: 10px;
  font-size: 12px;
}
.shop-middle-right {
  font-size: 13px;
  color: #333;
}
.shop-middle-right table {
  width: 120px;
  margin-left: 30px;
}
.shop-middle-right table td {
  padding: 5px 0;
}
/* 默认颜色为绿色 */
.shop-middle-right .score {
  color:#5ea732;
}
/* 价格合理为红色 */
.shop-middle-right .score-better {
  color: #f13e3a;
}
.shop-middle-right .better span {
  background-color: #5ea732;
  color: #fff;
  text-align: center;
}
.shop-middle-right .better-more span {
  background-color: #f13e3a;
}
</style>  