import { createApp } from 'vue'
import App from '../src/App.vue'  
import router from './router/index.js'
import store from './store'

//创建事务总线的Vue.prototype.$bus = new Vue()语句不能使用，prototype语句也取消了，
//且$on，$off，$once等事件函数也都去除了，只留下$emit()用于父子组件传数据，
//为了使用事务总线除了$emit触发事件外还应有$on监听函数，官方推荐使用第三方库mitt
//安装使用mitt后项目中用到的“this.$bus.$on”和“ this.$bus.$emit”语句需要去掉$符号，更改为this.$bus.on
//使用方法百度，不在typora记录了，感觉以后也碰不到这样的问题，可能得学习下官方文档怎么创建总线

  //使用npm install --save mitt安装完mitt后导入mitt
import mitt from "mitt"
  

/** 已废弃使用
 * Vue.prototype.$bus = new Vue()
 * screateApp().config.globalProperties.$bus */

const app = createApp(App)
//挂载事务总线
app.config.globalProperties.$bus = new mitt()
//把导出的router挂载到main.js
app.use(router)
app.use(store)
app.mount('#app')
