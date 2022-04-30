/* 从index.js中抽出来的mutations */
//将抽出来的常量用于mutations.js中
import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutation-types'
export default {
    //mutations作用操作state状态数据的同步方法
    //mutations中的每个方法尽可能完成的时间比较单一一点
    [ADD_COUNTER](state, payload) {
        payload.count++
    },
    [ADD_TO_CART](state, payload) {
        payload.checked = true
        state.cartList.push(payload)
    }
}