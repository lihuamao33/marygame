<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button 
              class="check-button" 
              :is-checked="isSelectAll"
              @click="checkClick">
      </check-button>
      <span>全选</span>
    </div>
    <div class="price">
      合计：{{totalPrice}}
    </div>
    <div class="calculate">
      去计算: ({{checkedLength}})
    </div>
  </div>
</template>
<script>
import CheckButton from 'components/content/checkButton/CheckButton.vue'
export default {
  name: 'CartBottomBar',
  components:{
    CheckButton,
  },
  computed: {
    /* 计算总价格 */
    totalPrice() {
      /**
       * 数组reduce()方法：
       * 参数一：一个函数（使用箭头函数）代表运算逻辑
       * 函数的两个参数
       *   c1：用于存储累计的结果
       *   c2：当前需要运算的元素
       * 参数二：默认值
       * 示例：reduce((c1,c2)=>c1+c2.price*c2.num,0)，其中0为初始化值
       */
      return '¥' + this.$store.state.cartList.filter(item => {
        return item.checked
        }).reduce((preValue, item) => {
        return preValue + item.NowPrice * item.count
      }, 0).toFixed(2);       
    },
    checkedLength() {
      return this.$store.state.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      //判断是否已经全部选中
      //首先判断没数据的情况（此时全选按钮不能默认为选中）
      if (this.$store.state.cartList.length === 0) return false  /* 没数据时返回false */
      /* 1.高阶函数实现方式
      return !this.cartList.find(item => !item.checked)  */
      //2.普通遍历实现方式
      for (let item of this.$store.state.cartList) {
        if(!item.checked) {
          return false
        }
      }
      return true
    }
  },
  methods: {
    checkClick() {
      //判断全选与否的逻辑
      //如果原来都是选中，点击一次，全部不选中；如果原来都是不选中（某些不选中），全部选中
      if(this.isSelectAll) { //全部选中
        this.$store.state.cartList.forEach(item => item.checked = false)
      } else { //部分或全部不选中
        this.$store.state.cartList.forEach(item => item.checked = true)
      }
    }
  },
  data () {
   return {}
  },
}
</script>
<style scoped>
.bottom-bar {
  position:relative;
  display:flex;
  height: 40px;
  line-height: 40px;
  background-color: #eee;
  font-size: 14px;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}
.check-button {
  width: 20px;
  height: 20px;
  margin-right: 5px;
  line-height: 20px;
}
.price {
  margin-left: 20px;
  align-items: center;
  flex: 1;
}
.calculate {
  text-align: center;
  width: 120px;
  background-color: orangered;
  color: #fff;
}
</style>