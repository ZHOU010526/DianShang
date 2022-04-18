import {v4 as uuidv4} from 'uuid';
export const getUUID=()=>{
//先从本地存储里获取uid（看本地存储里是否有）
let uuid_token=localStorage.getItem('UUIDTOKEN');
//如果没有
if(!uuid_token){
    //生成游客身份
    uuid_token=uuidv4();
    //本地存储一次
    localStorage.setItem('UUIDTOKEN',uuid_token);
}
return uuid_token;
}