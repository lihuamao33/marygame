<template>
    <h2>分类</h2>
    <div class="wrapper" ref="aaaa">
        <!-- 1.无论是否设置click:false，button都可以点击 -->
        <button @click="btnClick">按钮</button>
        <!-- 2.必须设置click:true，那么div才能监听点击 -->
        <div @click="divClick">呵呵呵呵</div>
        <back-top @click="backClick" v-show="isShowBackTop"></back-top>
    </div>
    
</template>

<script>
import {backTopMixin} from 'common/mixin.js'
export default {
    name:"ViewCategory",
    mixins: [backTopMixin],
    data() {
        return {
            scroll: null
        }
    },
    created() {},
    mounted() {
        
    }
}
</script>

<style scoped>
.content {
    height: 200px;
    background-color: rgb(243, 122, 203);
    overflow: hidden;
}
</style>