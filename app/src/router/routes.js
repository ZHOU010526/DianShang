//引入路由组件
// import Home from '@/pages/Home';
// import Search from '@/pages/Search';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Detail from '@/pages/Detail';
import AddCartSuccess from '@/pages/AddCartSuccess';
import ShopCart from '@/pages/ShopCart';
import Trade from '@/pages/Trade';
import Pay from '@/pages/Pay';
import PaySuccess from '@/pages/PaySuccess';
import Center from '@/pages/Center';
//引入二级路由组件
import MyOrder from '@/pages/Center/myOrder';
import GroupOrder from '@/pages/Center/groupOrder';

//用户访问的时候才调用
const foo=()=>import('@/pages/Home');

export default [
    //路由懒加载
    //把不同的路由对应的组件分割成不同的代码块
    {
        path: "/center",
        name:"center",
        component: Center,
        meta:{show:true},
        //二级路由组件
        children:[
            {
                path:"myorder",
                component:MyOrder,
            },
            {
                path:"groupOrder",
                component:GroupOrder,
            },
            {
                path:'/center',
                redirect:'/center/myOrder'//最先显示的是我的订单
            }
        ]
    },
    {
        path: "/paysuccess",
        name:"paysuccess",
        component: PaySuccess,
        meta:{show:true},
    },
    {
        path: "/pay",
        name:"pay",
        component: Pay,
        meta:{show:true},
         //路由独享守卫
        //登录了但是pay只能由trade跳转
        beforeEnter:(to,from,next)=>{
            if(from.path=='/trade'){
                next();
            }else{
                next(false);
            }
        }
    },
    {
        path: "/trade",
        name:"trade",
        component: Trade,
        meta:{show:true},
        //路由独享守卫
        //登录了但是trade只能由shopcart跳转
        beforeEnter:(to,from,next)=>{
            if(from.path=='/shopcart'){
                next();
            }else{
                //其他的路由组件来，停留在当前页
                next(false);
            }
        }
    },
    {
        path: "/home",
        // component: Home,
        component: foo,
        meta:{show:true},
    },
    {
        // path: "/search",
        path: "/search/:keyword?",
        // component: Search,
        component:()=>import('@/pages/Search'),
        meta:{show:true},
        name:"search",
        //路由组件能不能传递props数据?
        //布尔值写法：params
        // props:true
        //对象写法:额外给路由组件传递一些props
        // props:{a:1,b:2}
        //函数写法：可以params参数、query参数，通过props传递给路由组件
        props:($route)=>{
            return {keyword:$route.params.keyword,k:$route.query.k};
        }
    },
    {
        path: "/login",
        component: Login,
        meta:{show:false}
    },
    {
        path: "/register",
        component: Register,
        meta:{show:false}
    },
    {
        path: "/detail/:skuid?",
        component:Detail,
        meta:{show:true}
    },
    {
        path: "/addcartsuccess",
        name:"addcartsuccess",
        component: AddCartSuccess,
        meta:{show:true},
    },
    {
        path: "/shopcart",
        name:"shopcart",
        component: ShopCart,
        meta:{show:true},
    },
]