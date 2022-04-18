import { reqGetSearchInfo } from "@/api";

//search模块的小仓库
const state={
    // b:2
    searchList:{},
};
const mutations={
    GETSEARCHLIST(state,searchList){
        state.searchList=searchList;
    }
};
const actions={
    async getSearchList({commit},params){
        //params形参是当用户派发action时传递过来的，至少是一个空对象
        let result=await reqGetSearchInfo(params);
        // console.log(result);
        if(result.code==200){
            commit("GETSEARCHLIST",result.data);
        }
    }
};
//简化仓库中的数据
const getters={
    //state是当前仓库的state
    goodsList(state){
        // console.log(a);
        return state.searchList.goodsList||[];
    },
    attrsList(state){
        return state.searchList.attrsList||[];
    },
    trademarkList(state){
        return state.searchList.trademarkList||[];
    }
};
export default{
    state,
    mutations,
    actions,
    getters
}