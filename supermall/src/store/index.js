//1.从vuex导出到使用页面，其中createStore创建数据仓储对象
import {createStore} from 'vuex'
//导入抽出来的mutations
import mutations from './mutations'
//导入抽出来的actions
import actions from './actions'
//导入抽出来的getters
import getters from './getters'
//2.创建数据仓储对象Store，调用功能函数createStore
const store = createStore({
    //状态数据
    state:{
        //用数组存储购物车中传来的商品
        cartList:[]
    },
    mutations,
    actions,
    //计算属性方法
    getters,
    modules:{
        //子模块
    }
})
//4.注册仓储对象
//app指的是Vue.createApp()创建的应用对象
//在要调用vuex的页面使用这句：app.use(store)，本次为在main.js中使用
export default store 
