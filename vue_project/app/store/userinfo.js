import axios from "axios";
export default {
    namespaced : true ,
    state : {
            nickname : "",
            username : "",
            avatar : "",
            sex : "",
            mobile : ""
    },
    //开可预测性
    mutations : {
            changeNickname(state , {nickname}){
                state.nickname = nickname;
            },
            changeUsername(state , {username}){
                state.username = username;
            },
            changeAvatar(state , {avatar}){
                state.avatar = avatar;
            },
            changeSex(state , {sex}){
                state.sex = sex;
            },
            changeMobile(state , {mobile}){
                state.mobile = mobile;
            }
    },
    actions : {
                async   fetchme({commit , state},{next}){

                   const  {login , nickname , username , avatar , mobile , sex} = await axios.get("/api/me").then(data => data.data);
                     if(login){
                            next()
                     }else{
                            next("/login");
                    }
                    commit("changeNickname" , {nickname});
                    commit("changeUsername" , {username});
                    commit("changeAvatar" , {avatar});
                    commit("changeSex" , {sex});
                    commit("changeMobile" , {mobile});
                }
    }
    
}