//配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router';
//使用插件
Vue.use(VueRouter);
import routes from './routes'
// console.log(VueRouter);

//引入store
import store from '@/store'

//先把VueRouter原型对象的push先保存一份
let originPush=VueRouter.prototype.push;
let originReplace=VueRouter.prototype.replace;
//重写push|replace
//第一个参数：告诉原来的push方法，你往哪里跳转(传递哪些参数)
//第二个参数是成功的回调
//第三个参数是失败的回调
VueRouter.prototype.push=function(location,resolve,reject){
    // console.log(this);
    if(resolve&&reject){
        //call|apply区别：call传参用逗号隔开，apply方法执行传递数组
        originPush.call(this,location,resolve,reject);
     }
    else{
        return originPush.call(this,location).catch(err=>err);
    }
}
VueRouter.prototype.replace=function(location,resolve,reject){
    // console.log(this);
    if(resolve&&reject){
        //call|apply区别：call传参用逗号隔开，apply方法执行传递数组
        originReplace.call(this,location,resolve,reject);
     }
    else{
        return originReplace.call(this,location).catch(err=>err);
    }
}
//配置路由
let router=new VueRouter({
    //配置路由
    routes,
    //返回的y为0表示滚动条在最上面
    scrollBehavior(to,from,savePosition){
        return{y:0};
    }
});

//全局守卫:前置守卫
router.beforeEach(async (to,from,next)=>{
//to可以获取到你要跳转到哪个页面
//from获取从哪来的信息
//next：放行函数 全部放行next();next('/login');
// console.log(next);
//用户登录了才会有token
next();
let token=store.state.user.token;
//用户信息
let name=store.state.user.userInfo.name;
//登录了
if(token){
    if(to.path=='/login'){ //登录了就不能跳到登录页面
        next('/home');
        // console.log(111);
    }else{
        //登录了，但去的不是login
      next();
    //   console.log(222);
    if(name){//获取到用户信息
        next();
    }else{
        //刷新后没有用户信息，派发action让仓库存储用户信息
       try {
        await store.dispatch('getUserInfo');
        next();
        // console.log(333);
       } catch (error) {
           //token失效,获取不到用户信息，重新登陆
           //清除token
           await store.dispatch('userLogout');
           next('/login');
       }
    }
    }
}else{
    //未登录：不能去交易相关,不能去支付相关pay,paysuccess、不能去个人中心
    let toPath=to.path;
    // console.log(toPath);
    if(toPath.indexOf('./trade')!=-1||toPath.indexOf('/pay')!=-1||toPath.indexOf('/center')!=-1){
        next('/login?redirect='+toPath);
    }else{
        next();
    }
    // console.log(444);
}
// console.log(store.state);
});

export default router;
