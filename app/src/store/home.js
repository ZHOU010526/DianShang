import {reqCategoryList} from '@/api'
import { reqGetBannerList } from '@/api';
import { reqFloorList } from '@/api';
//home模块的小仓库
const state={
    // a:1
    //state中数据默认初始值别瞎写，服务器返回的对象和数组
    categoryList:[],
    bannerList:[],
    FloorList:[]
};
const mutations={
    CATEGORYLIST(state,categoryList){
        state.categoryList=categoryList;
    },
    GETBANNERLIST(state,bannerList){
        // console.log("修改仓库中的数据bannerList数据..");
        state.bannerList=bannerList;
    },
    GETFLOORLIST(state,FloorList){
        state.FloorList=FloorList;
    }
};
const actions={
    //通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
    async categoryList({commit}){
        let result=await reqCategoryList();
        console.log(result);
        if(result.code==200){
            commit("CATEGORYLIST",result.data);
        }
    },
   async getBannerList({commit}){
        // console.log("向服务器发送ajax请求,获取服务器数据");
        let result=await reqGetBannerList();
        //console.log(result);
        if(result.code==200){
            commit('GETBANNERLIST',result.data);
        }
    },
    async getFloorList({commit}){
        let result=await reqFloorList();
        if(result.code==200){
            commit('GETFLOORLIST',result.data);
        }
    }
};
const getters={};
export default{
    state,
    mutations,
    actions,
    getters
}