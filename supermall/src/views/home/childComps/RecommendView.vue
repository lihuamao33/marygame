<template>
  <div class="recommend">
      <div v-for="item in recommends" :key="item" class="recommend-item">
          <a :href="item.link">
              <img :src="item.image" alt="">
              <div>{{item.title}}</div>
              <div></div>
          </a>
      </div>
  </div>
</template>
<script>
export default {
  name: 'RecommendView',
  //要展示的数据在ViewHome里，先获取数据传到这个组件
  props:{
      recommends: {
          type:Array,
          default() {
              return[]
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
.recommend {
    display:flex;
    text-align: center;
    padding:15px 0 20px;
    border-bottom:10px solid #eee;
}
.recommend-item {
    flex:1;
}
.recommend-item img {
    width:85%;
    margin-bottom:10px;
}

</style>