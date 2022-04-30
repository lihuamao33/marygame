/* 详情页请求数据函数封装 */
//Detail.vue中生命周期函数created（）函数的第二步，根据iid请求详情数据

//首先导入request函数，请求网络
import {request} from "./request";

export function getDetail(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
}
export function getRecommend() {
    return request({
        url: '/recommend',
    })
}

//把商品部分要获取的数据封装成函数对象
export class Goods {
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title
        this.desc = itemInfo.desc
        this.price = itemInfo.price
        this.oldPrice = itemInfo.oldPrice
        this.NowPrice = itemInfo.lowNowPrice
        this.discount = itemInfo.discountDesc 
        this.columns = columns
        this.services = services
        this.realPrice = itemInfo.lowNowPrice
    }
}
//把店铺数据封装成函数对象
export class Shop {
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.fans = shopInfo.cFans;
        this.sells = shopInfo.cSells;
        this.score = shopInfo.score;
        this.goodsCount = shopInfo.cGoods;
    }
}
//获取商品参数
export class GoodsParam {
    constructor(info, rule) {
        //images部分有值2部分没值
        this.image = info.images ? info.images[0] : '';
        this.infos = info.set;
        this.sizes = rule.tables;
    }
}
//