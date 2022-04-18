import {reqCartList,reqDeleteCartById,reqUpdateCheckedById} from '@/api';
const state={
    cartList:[]
};
const mutations={
    GETCARTLIST(state,cartList){
        state.cartList=cartList;
    }
};
const actions={
    //获取购物车列表数据
    async getCartList({commit}){
        let result=await reqCartList();
        // console.log(result);
        if(result.code==200){
            commit("GETCARTLIST",result.data);
        }
    },
    async deleteCartListBySkuId({commit},skuId){
        let result=await reqDeleteCartById(skuId);
        if(result.code==200){
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    //修改某个产品选中状态
    async updateCheckedById({commit},{skuId,isChecked}){
        let result=await reqUpdateCheckedById(skuId,isChecked);
        if(result.code==200){
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    //删除全部选中商品
    deleteAllCheckedCart({dispatch,getters}){
        // alert('闪闪');
        // console.log(context);小仓库:state,getters,mutations,dispatch
        //获取购物车中全部的产品
        let PromiseAll=[];
        getters.cartList.cartInfoList.forEach(item => {
            // console.log('123');
            let promise=item.isChecked==1?dispatch('deleteCartListBySkuId',item.skuId):'';
            // console.log(promise);
            PromiseAll.push(promise);
        });
        //如果返回的都成功，则成功，有一个失败就失败
        return Promise.all(PromiseAll);
    },
    //修改全部产品状态
   updateAllCartIsChecked({dispatch,state},isChecked){
        // console.log(state);
        // console.log(isChecked);
        let PromiseAll=[];
         state.cartList[0].cartInfoList.forEach(item=>{
           let promise=dispatch('updateCheckedById',{skuId:item.skuId,isChecked});
           PromiseAll.push(promise);
        });
        return Promise.all(PromiseAll);
    }
};
const getters={
    cartList(state){
        return state.cartList[0]||{};
    },
    //计算出来购物车数据
   
};
export default{
state,
mutations,
actions,
getters
}