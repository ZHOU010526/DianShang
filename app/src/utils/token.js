export const setToken=(token)=>{
    localStorage.setItem("TOKEN",token);
}

// export const getToken=()=>{
//     localStorage.getItem('TOKEN');
// }

//清除本地存储
export const removeToken=()=>{
    localStorage.removeItem('TOKEN');
}