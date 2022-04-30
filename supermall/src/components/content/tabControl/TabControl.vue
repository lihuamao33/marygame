<template>
  <div class="tab-control">
      <div v-for="(item,index) in titles" :key="index" class="tab-control-item"
           :class="{active:index === currentIndex}" 
           @click="itemClick(index)">
          <span>{{item}}</span>
      </div>
  </div>
</template>
<script>
export default {
  name: 'TabControl',
  props: {//父传子
      titles: {
          type: Array,
          default() {
              return []
          }
      }
  },
  data () {
   return {
       currentIndex: 0, //记录当前哪个小短线被选中
   }
  },
   methods:{
       itemClick(index) {
           this.currentIndex = index;//将被选中的对象传入(从外向内传，父传子)
           this.$emit('tabClick',index)//子传父，从内向外传
       }
   }
}
</script>
<style scoped>
.tab-control {
    display: flex;
    text-align: center;   
    background-color: #fff;
}
.tab-control-item {
    flex:1;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
}
.active {
    color: var(--color-high-text);
}
.active span {
    border-bottom:3px solid var(--color-high-text);
}
.tab-control-item span {
    padding: 5px;
}
</style>