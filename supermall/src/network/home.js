import {request} from "./request";
export function getHomeMultidata() {
    return request({
        url: '/home/multidata'
    })
}

//获取首页[流行，新款，精选]商品数据
//type参数用于传类型（pop/sell/new），page用于传页码
export function getHomeGoods(type, page) {
    return request({
        url: '/home/data',
        params: {
            type,
            page
        }
    })
}
