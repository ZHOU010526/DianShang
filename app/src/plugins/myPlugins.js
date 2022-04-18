//自定义插件
let myPlugins={};
myPlugins.install=function(Vue,options){
    // console.log('调用');
    // console.log(options);
    //Vue.prototype.$bus:任何组件都可以使用
    //全局指令
    Vue.directive(options.name,(element,params)=>{
        // console.log("执行");
        // console.log(params);
        element.innerHTML=params.value.toUpperCase();
    });
    // Vue.component
    // Vue.filter

}
export default myPlugins;