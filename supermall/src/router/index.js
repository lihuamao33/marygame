import {createRouter,createWebHashHistory} from 'vue-router'


//路由懒加载                        文件名 组件名
const Home = () => import('views/home/ViewHome') 
const Category = () => import('views/category/ViewCategory') 
const Cart = () => import('views/cart/ViewCart') 
const Profile = () => import('views/profile/ViewProfile')
const Detail = () => import('views/detail/Detail')

//1.安装插件
//Vue.use(VueRouter)

//2.创建router
const routes = [
    //把routes抽出来在此处配置映射关系
    {
        path:'/',
        redirect:'/home',
    },
    {
        path:'/home',
        component:Home
    },
    {
        path:'/category',
        component:Category
    },
    {
        path:'/cart',
        component:Cart
    },
    {
        path:'/profile',
        component:Profile
    },
    {
        path:'/detail/:iid',
        component:Detail,
        //添加router.meta属性使这个组件不被缓存
        /* meta: {
            showNav: false,
        } */
    }

]
const router = createRouter({
    history:createWebHashHistory(),
    routes,
})
export default router