//继续将mutations.js中的常量抽出
//之所以抽出常量是为了方便改变名称，假设更改add_counter为add_counte不用更改其他页面,
//只需改这个页面中export const ADD_COUNTER = 'add_counter'为,
//export const ADD_COUNTER = 'add_counte'即可应用于所有页面
export const ADD_COUNTER = 'add_counter'
export const ADD_TO_CART = 'add_to_cart'