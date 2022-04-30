/* 从index.js中抽出来的actions */
//将从mutations.js中抽离出的常量应用在同样是抽出来的actions.js中
import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutation-types'
export default {
    //发送数据请求的异步方法
    //payload新添加的商品，判断添加前是否已经被加入cartList:[]
    addCart(context, payload) {
        //1.查找之前数组中是否有该商品
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
        //2.判断oldProduct
        if(oldProduct) {
            //oldProduct.count += 1
            context.commit(ADD_COUNTER, oldProduct)
        } else {
            payload.count = 1
            //context.state.cartList.push(payload)
            context.commit(ADD_TO_CART, payload)
        }
    }
}