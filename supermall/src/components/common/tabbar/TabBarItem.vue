<template>
  <div id="tab-bar-item" @click="itemClick">
    <div class="item-icon" v-show="!isActive"><slot name="icon"></slot></div> 
    <div class="item-active-icon" v-show="isActive"><slot name="active-icon"></slot></div>
    <div class="item-text" :style="activeStyle"><slot name="text"></slot></div>
    
  </div>
</template>
<script>
export default {
  name: "TabBarItem",
  props: {
    path:String,
    activeColor: {
        type:String,
        default:'red'
    }
  },
  data() {
      return {

      }
  },
  computed: {
    isActive() {
    //判断/home -> item(/home)=true，判断当前活跃的route的path跟link里的path是否一致，一致为true
      return this.$route.path.indexOf(this.path) !== -1;  //当不等于-1时找到了
    },
    activeStyle() {
        //当active活跃时为当前颜色，否则不添加颜色
      return this.isActive ? { color: this.activeColor} : {};
    },
  },
  methods: {
    itemClick() {
      this.$router.push(this.path);
    },
  },
};
</script>
<style scoped>

</style>
<style>
#tab-bar-item {
  flex: 1;
}
.item-icon img {
  width: 24px;
  height: 24px;
  margin-top: 5px;
  vertical-align: middle; /* 行内元素或表格单元格垂直对齐方式为居中 */
}
.item-active-icon img {
  width: 24px;
  height: 24px;
  margin-top: 5px;
  vertical-align: middle;
}
.item-text {
  font-size: 12px;
  margin-top: 3px;
  color: #333;
}

</style>
