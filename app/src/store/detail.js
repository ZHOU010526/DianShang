import {reqGoodsInfo,reqAddOrUpdateShopCart} from "@/api";
////uuid游客身份永久存储,生成一个随机的字符串
import {getUUID} from '@/utils/uuid_token';
const state={
    goodInfo:{},
     //uuid游客身份永久存储
     uuid_token:getUUID()
};
const mutations={
    GETGOODINFO(state,goodInfo){
        state.goodInfo=goodInfo;
    }
};
const actions={
    //获取产品信息的action
    async getGoodInfo({commit},skuId){
        let result=await reqGoodsInfo(skuId);
        if(result.code==200){
            commit('GETGOODINFO',result.data);
        }
    },
    //将产品添加到购物车中
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        let result=await reqAddOrUpdateShopCart(skuId,skuNum);
        // console.log(result);
        if(result.code==200){
            return 'OK';
        }else{
            return Promise.reject(new Error('faile'));
        }
    }
};
const getters={
    //路径导航简化数据
    categoryView(state){
        return state.goodInfo.categoryView||{};
    },
    //产品信息
    skuInfo(state){
        return state.goodInfo.skuInfo||{};
    },
    //售卖
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList||[];
    }
};
export default{
state,
mutations,
actions,
getters
}