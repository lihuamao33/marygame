//用mixin把重复代码混入，两个组件之间复用代码通过混入复用
import {debounce} from './utils'
import BackTop from 'components/content/backTop/BackTop.vue'
import {BACK_POSITION} from 'common/const.js'
//
export const itemListenerMixin = {
    data() {
        return {
            itemImgListener: null
        }
    },
    mounted() {
        let newRefresh = debounce(this.$refs.scroll.refresh, 100)
        this.itemImgListener = () => {
            newRefresh()
        }
        this.$bus.on('itemImgLoad', this.itemImgListener)
    },
}

//返回顶部
export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isShowBackTop: true
        }
    },
    methods: {
        backTop() {
            this.$refs.scroll.scrollTo(0, 0, 300)
        },
        /* 监听是否回到顶部 */
        listenShowBackTop(position) {
            this.isShowBackTop = -position.y > BACK_POSITION 
        }
    }
}