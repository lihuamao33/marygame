<template>
  <!-- 详情页总体 -->
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" ref="nav"></detail-nav-bar><!-- 将DetailNavBar.vue中传来的methods事件titleClick应用到Detail组件，之后再在这个组件的methods方法中写点击事件内容 -->
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :paramInfo="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :commentInfo="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>
<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue"

import Scroll from "components/common/scroll/Scroll.vue";
import GoodsList from "components/content/goods/GoodsList.vue";

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail.js";
import { debounce } from "common/utils.js";
import { itemListenerMixin, backTopMixin} from "common/mixin.js";

export default {
  name: "DetailDetail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    Scroll,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
    };
  },
  /**
   * created钩子用来在一个实例被创建之后执行代码
   */
  created() {
    /* 1.保存传入的商品id，iid */
    this.iid = this.$route.params.iid;
    /* 2.根据iid请求详情数据 */
    getDetail(this.iid).then((res) => {
      //打印获取的数据
      console.log(res);
      //1.获取数据
      const data = res.result;
      //2.取出轮播图的数据
      this.topImages = data.itemInfo.topImages;
      //3.获取商品信息,通过一个类Goods将数据整合
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //4.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);
      //5.保存商品详情数据
      this.detailInfo = data.detailInfo;
      //6.获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //7.获取评论信息(部分商品衣服没有评论，先判断是否有评论)
      if (data.rate.cRate !== 0) {
        //如果if中data.rate.cRate获取到的数据不为空，执行下一行语句
        //data.rate.list[0]获取到的第一个评论放到commentInfo中
        this.commentInfo = data.rate.list[0];
        //console.log(this.commentInfo.created)
      }

      /* 4.获取["商品", "参数", "评论", "推荐"]各个组件对应的顶部偏移量 */
      //vm.$nextTick仅在整个视图都被渲染后才会运行的代码，结果显示不准确
      //根据最新的数据，对应的DOM已经被渲染出来，但是图片还没加载完（目前获取到的offsetTop不包含其中的图片）
      //offsetTop值不对时都是因为图片的问题
      //debounce函数防抖，可使多个请求在一定时间内只执行最后一个可节约流量
      //给getThemeTopY赋值（对给this.themeTopYs赋值的操作进行防抖  ） 
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = [];
        //商品
        this.themeTopYs.push(0);
        /**
         * 因为图片加载原因，估计是图片长度太大溢出div范围
         * 导致offsetTop获取不到对应offsetParent，
         * this.$refs.params.$el.offsetTop数据显示为undefined
         */
        //参数
        this.themeTopYs.push(this.$refs.params.$el.offsetTop); /* offsetTop获取div元素的顶部偏移量 */
        //评论
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        //推荐
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        console.log(this.themeTopYs);
        console.log(this.$refs.params.$el.offsetParent);
      });
    });
    /* 3.请求推荐数据，之后数据保存在data(){}中，保存为数组 */
    getRecommend().then((res) => {
      console.log(res);
      this.recommends = res.data.list;
    });
  },
  /**
   * 实例挂载之后被调用，服务器渲染期间不被调用
   * 当mounted被调用时，vm.$el也会在文档内，但不会保证所有的子组件也都被挂载完成
   */
  mounted() {},
  updated() {},
  methods: {
    imageLoad() {
     // this.$refs.scroll.refresh()
      //调用created里的getThemeTopY函数
      this.getThemeTopY();
    },
    titleClick(index) {
      //传的第二个参数y值应该为负数，因为页面往上滚
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index] + 44, 200);
    },
    contentScroll(position) {
      //1.获取y值
      const positionY = -position.y
      //2.positionY和themeTopYs中y值对比
        //假设themeTopYs值为[0, undefined, 4061, 4331]
        //positionY 在 0 和 undefined 之间，index = 0
        //positionY 在 undefined 和 4061 之间，index = 1
        //positionY在 4061 和 4331 之间，index = 2
        //positionY超过 4331，index = 3
        let length = this.themeTopYs.length
      for(let i = 0; i < length; i++){
        if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY <
        this.themeTopYs[i+1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))){
          this.currentIndex = i;
          //把导航的内容和页面具体内容联动，滑到对应区域导航显示对应内容标题     
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }  
      //3.是否显示回到顶部,调用mixin.js中listenShowBackTop方法
      //出错，因为无法获得参数部分在页面的位置导致返回顶部也加载不出来，同时联动也不能完全实现
      this.listenShowBackTop(position)                                                                                                                
    },
    addToCart() {
      //1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.NowPrice = this.goods.NowPrice
      product.iid = this.iid
      //2.将商品添加到购物车里
      //this.$store.commit('addCart', product)
      this.$store.dispatch('addCart',product)
    }
  },
};
</script>
<style scoped>
#detail {
  position: relative;
  z-index: 9;
  height: 100vh;/* vh当前屏幕可见高度的1%，height:100vh==height:100%，当没有内容时vh也会使高度撑开与屏幕一致 */
  background-color: #fff;
}
.content {
  height: calc(100% - 44px - 58px); /* 高度用calc计算，要滚动的区域为总高度100%-头部导航高度44px */
  overflow: hidden;
}
</style>