import {reqAddressInfo,reqOrderInfo} from '@/api';
const state={
    address:[],
    orderInfo:{}
};
const mutations={
    GETUSERADDRESS(state,address){
        state.address=address;
    },
    GETORDERINFO(state,orderInfo){
        state.orderInfo=orderInfo;
    }
};
const actions={
    //获取用户订单地址信息
    async getUserAddress({commit}){
        let result=await reqAddressInfo();
        // console.log(result);
        if(result.code==200){
            commit('GETUSERADDRESS',result.data);
        }
    },
    //获取交易商品清单
    async getOrderInfo({commit}){
        let result=await reqOrderInfo();
        // console.log(result);
        if(result.code==200){
            commit('GETORDERINFO',result.data);
        }
    }
};
const gettings={};
export default{
    state,
    mutations,
    actions,
    gettings
}