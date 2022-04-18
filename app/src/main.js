import Vue from 'vue'
import App from './App.vue'
// let a=100

//三级联动组件--全局组件
import TypeNav from '@/components/TypeNav';
import Carousel from '@/components/Carousel';
import Pagination from "@/components/Pagination";
import {Button,MessageBox} from 'element-ui';
//第一个参数：全局组件的名字 第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav);
Vue.component(Carousel.name,Carousel);
Vue.component(Pagination.name,Pagination);
Vue.component(Button.name,Button);

//Element-UI注册组件的时候还有一种写法，挂载在原型上
//弹出支付二维码
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//引入路由
import router from '@/router';

//引入仓库
import store from '@/store';

//测试
import {reqCategoryList} from '@/api';
import {reqGetSearchInfo} from '@/api';
reqCategoryList();
//跨域问题：协议、域名、端口号不同的请求，称之为跨域
// console.log(reqGetSearchInfo({}));

import '@/mock/mockServe';

//引入swiper样式
import "swiper/css/swiper.css";

//统一接收api文件夹里面的全部请求函数
import * as API from '@/api';
// console.log(API);

//引入懒加载插件
//图片和json文件不用对外暴露，可以直接引
import atm from '@/assets/images/1.gif';
import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload,{
  loading:atm
});
//引入自定义插件
import myPlugins from '@/plugins/myPlugins';
Vue.use(myPlugins,{
  name:'upper'
});

//引入表单校验插件
import '@/plugins/validate';
new Vue({
  render: h => h(App),
  //注册路由,KV一致，省略V(r小写)
  //$router(push、replace)和$route(query、params)属性
  router,
  //注册仓库：组件实例身上会多一个属性$store
  store,
  //全局事件总线$bus
  beforeCreate(){
    Vue.prototype.$bus=this;
    Vue.prototype.$API=API;
  }
}).$mount('#app')
