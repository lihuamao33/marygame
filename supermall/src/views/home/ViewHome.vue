<template>
<!-- 首页主页 -->
    <div id="home">
        <!-- 导航 -->
        <nav-bar class="home-nav"><template v-slot:center><div>购物街</div></template></nav-bar>
        <tab-control :titles="['流行','新款','精选']" 
                     @tabClick="tabClick"
                     ref="tabControl1"
                     class="tab-control"
                     v-show="isTabFixed">
        </tab-control>
        <scroll class="content" 
                ref="scroll" 
                :probe-type="3" 
                @scroll="contentScroll"
                :pull-up-load="true"
                @pullingUp="loadMore">
            <!-- 轮播图 -->
        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
        <!-- 四个圆圈图展示 -->
        <recommend-view :recommends="recommends"></recommend-view>
        <!-- 中间部分，创建为一张带链接的图 -->
        <feature-view></feature-view>
        <!-- 中间分类部分 -->
        <tab-control :titles="['流行','新款','精选']" 
                     @tabClick="tabClick"
                     ref="tabControl2">
        </tab-control>
        <!-- 商品展示 -->
        <good-list :goods="showGoods"></good-list>
        </scroll>
        <back-top @click="backClick" v-show="isShowBackTop"></back-top>
    </div>
    
</template>
<script>
//小组件
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'

//公共组件
import NavBar from 'components/common/navbar/NavBar.vue'
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodList from 'components/content/goods/GoodsList.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
//import BackTop from 'components/content/backTop/BackTop.vue'

//将home.js中创建的请求导入
import {getHomeMultidata,getHomeGoods} from "network/home.js"
//import {BACK_POSITION} from 'common/utils'
//import {debounce} from "common/utils.js"
import {itemListenerMixin, backTopMixin} from 'common/mixin.js'

/* import Swiper from 'components/common/swiper/Swiper.vue'
import SwiperItem from 'components/common/swiper/SwiperItem.vue' */
//或者写成
//import {Swiper,SwiperItem} from 'components/common/swiper/Swiper.vue'

export default {
    name:"ViewHome",
    components: {
        NavBar,
        HomeSwiper,
        RecommendView,
        FeatureView,
        TabControl,
        GoodList,
        Scroll,
        /* BackTop, */
    },
    mixins: [itemListenerMixin, backTopMixin],
    data() {
        return {
            banners:[],
            recommends:[],
            goods: {
                'pop': {page: 0,list: []},//page变量用于记录加载到第几页，list变量记录加载到多少数据
                'new': {page: 0,list: []},//请求到的数据放到list[]中
                'sell': {page: 0,list: []},
            },
            currentType: 'pop',//初始值为pop
            /* isShowBackTop: 'false',//默认返回头部图片不显示 */
            tabOffsetTop: 0,
            isTabFixed: false,
            saveY: 0,
        }
    },
    computed:{
        showGoods() {
            return this.goods[this.currentType].list
        }
    },
    //生命周期销毁函数
        /* unmounted() {
        console.log('home unmounted');
    },  */
    //activated函数被keep-alive缓存的组件激活时调用，该钩子在服务器端渲染期间不必调用
    activated() {
        this.$refs.scroll.refresh()
        this.$refs.scroll.scrollTo(0, this.saveY, 0)
    },
    //被keep-alive缓存的组件失活时调用，在服务器端渲染期间不被调用
    deactivated() {
        this.saveY = this.$refs.scroll.getScrollY()
    },
    //生命周期函数
    created() {
        //1.请求多个数据
        /* getHomeMultidata().then(res => {
            this.banners = res.data.banner.list;
            this.recommends = res.data.recommend.list;
        }) */
        this.getHomeMultidata()

        //2.请求商品数据（流行、新款、精选）
        /* getHomeGoods('pop', 1).then(res => {
            console.log(res);
        }) */
        this.getHomeGoods('pop') //调用getHomeGoods方法
        this.getHomeGoods('new')
        this.getHomeGoods('sell')
    },
    mounted() {
        //1.图片加载完成的事件监听,与detail.vue代码重复使用mixin.js混入实现，
        /* const refresh = debounce(this.$refs.scroll.refresh, 50)
        this.$bus.on('itemImageLoad', () => {
            refresh()
        }) */
    },
    methods: {
        /**
         * 事件监听相关方法
         * 流行、新款、精选切换页面
         */
        tabClick(index) {
            switch (index) {
                case 0:
                    this.currentType = 'pop'
                    break
                case 1:
                    this.currentType = 'new'
                    break
                case 2:
                    this.currentType = 'sell'
                    break
            }
            this.$refs.tabControl1.currentIndex = index;
            //this.$refs.tabControl2.currentIndex = index;
        },
        /* backClick() {
            //this.$refs.scroll为拿到scroll.vue组件，后面的scrollTo()为拿到这个组件的方法，(0,0)为要传入scrollTo函数 的参数
            this.$refs.scroll.scrollTo(0, 0)
        }, */
        contentScroll(position) {
            this.listenShowBackTop(position)
            this.isShowBackTop = -position.y > this.tabOffsetTop
            //1.判断BackTop是否显示
            //this.isShowBackTop = (-position.y) > BACK_POSITION //当往下滑到超过1000时向上返回图片显示（因为是负值所以先加负号转为正值再判断）
            //2.决定tabControl是否吸顶（position:fixed）
            this.isTabFixed = (-position.y) > this.tabOffsetTop
            
        },
        //加载更多
        loadMore() {
            this.getHomeGoods(this.currentType);
        },
        swiperImageLoad() {
            //所有的组件都有一个属性$el:用于获取组件中的元素
            this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
        },
        /**
         * 网络请求相关方法
         */
        getHomeMultidata() {
            getHomeMultidata().then(res => {
                //this.result=res;
            this.banners = res.data.banner.list;
            this.recommends = res.data.recommend.list;
        })
        },
        getHomeGoods(type) {
            const page = this.goods[type].page + 1//取到data中goods的数据，类型为type（pop,new,sell),取到它的page加1（初始page为0，故加1获取第一个页面），赋值给page
            getHomeGoods(type, page).then(res => {
                this.goods[type].list.push(...res.data.list)
                this.goods[type].page += 1   
                
                //完成上拉加载更多
                this.$refs.scroll.finishPullUp() /* 出错？ 好像没问题*/
        })
        }
    }
}
</script>

<style scoped>
/* scoped用于限定样式的作用范围 */

#home {
    padding-top: 44px;
    height:100vh; /*vh-->viewport height视口，当前屏幕的高度  100vh代表100%视口，高度为当前屏幕的全部高度 */
    position:relative;
}
.home-nav {
      position:fixed;
      background-color: var(--color-tint);
      color:#fff;
      left:0;
      right:0;
      top:0;
      z-index: 9;
  }
  .content {
      overflow:hidden;
      position:absolute;
      top:44px;
      bottom:49px;
      left:0;
      right:0;
  }
  .fixed {
      position: fixed;
      left: 0;
      right: 0;
      top: 44px;
  }
  .tab-control {
      position:relative;
      z-index: 9;
  }
</style>