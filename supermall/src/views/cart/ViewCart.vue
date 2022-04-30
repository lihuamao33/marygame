<template>
    <div class="cart"> 
        <!-- 导航 -->
        <nav-bar class="nav-bar">
            <template #center><div>购物车({{length}})</div></template>
        </nav-bar>
        <!-- 商品列表 -->
        <cart-list></cart-list>
        <!-- 底部汇总 -->
        <cart-bottom-bar></cart-bottom-bar>
    </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import CartList from './childComps/CartList.vue'
import CartBottomBar from './childComps/CartBottomBar.vue'
//让组件在computed中使用getters.js内容
import {mapGetters} from 'vuex'
export default {
    name:"ViewCart",
    components: {
        NavBar,
        CartList,
        CartBottomBar,
    },
    computed: {
        //mapGetters两种语法(mapGetters获取vuex中的getters在组件中使用)
        //数组形式：...mapGetters(['cartLength', 'cartList'])
        /**
         * 对象形式：...mapGetters({
         *            length: 'cartLength',
         *            list: 'cartList'
         * })
         */  
        ...mapGetters({
            length: 'cartLength',
        })
    }
}
</script>

<style scoped>
.cart {
    height:100vh;
}
.nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;/* 文字加粗，不用加单位 */
}
</style>
