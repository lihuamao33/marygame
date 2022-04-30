<template>
  <div id="detailNavBar">
    <!-- 详情页头部导航 -->
    <nav-bar>
        <!-- 导航左侧部分 -->
      <template #left>
          <div class="back" @click="backClick"><img src="~assets/img/common/back.svg" alt=""></div>
      </template>
        <!-- 导航中间部分 -->
      <template v-slot:center>
          <div class="title">  
              <div v-for="(item, index) in titles" 
                   :key="index" class="title-item"
                   :class="{active: index === currentIndex}"
                   @click="titleClick(index)">
                {{ item }}
          </div>
          </div>     
      </template>
    </nav-bar>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar.vue";
export default {
  name: "DetailNavBar",
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    titleClick(index) {
        this.currentIndex = index
        //把点击["商品", "参数", "评论", "推荐"]动作传递给父组件Detail.vue
        this.$emit('titleClick', index)
    },
    backClick() {
        this.$router.back()
    }
  },
}
</script>
<style scoped>
.title {
    display: flex;
}
.title-item {
    flex:1;
}
.active {
    color: var(--color-high-text)
}
.back img {
    vertical-align:middle;
    width:45%;
}
</style>