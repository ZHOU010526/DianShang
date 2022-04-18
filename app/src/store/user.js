import {reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqlogout} from '@/api';
import {setToken,removeToken} from '@/utils/token';
const state={
    code:'',
    token:localStorage.getItem('TOKEN'),
    userInfo:{}
};
const mutations={
    GETCODE(state,code){
        state.code=code;
    },
    USERLOGIN(state,token){
        state.token=token;
    },
    GETUSERINFO(state,userInfo){
        state.userInfo=userInfo;
    },
    //清除本地数据
    CLEAR(state){
        state.token='';
        state.userInfo={},
        removeToken();
    }
};
const actions={
    //获取验证码
    async getCode({commit},phone){
        //把验证码返回了，但是正常情况应该发到手机上
        let result=await reqGetCode(phone);
        // console.log(result);
        if(result.code==200){
            commit('GETCODE',result.data);
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    //用户注册
    async userRegister({commit},user){
        let result=await reqUserRegister(user);
        // console.log(result);
        if(result.code==200){
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    //vuex仓库存储不是持久化，一刷新就没了，所以要借助localStorage,sessionStorage
    //登录[token]作为标志,服务器下发token,前台持久存储token
    async userLogin({commit},data){
        let result=await reqUserLogin(data);
        // console.log(result);
        if(result.code==200){
            // localStorage.setItem("TOKEN",result.data.token);
            commit("USERLOGIN",result.data.token);
            setToken(result.data.token);
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    //登录完主页展示的是用户信息
    async getUserInfo({commit}){
        let result=await reqUserInfo();
        // console.log(result);
        if(result.code==200){
            commit('GETUSERINFO',result.data);
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    //退出登录
    async userLogout({commit}){
        //通知服务器清除
        let result=await reqlogout();
        // console.log(result);
        if(result.code==200){
            commit("CLEAR");
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
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