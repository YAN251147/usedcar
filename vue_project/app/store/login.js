import axios from "axios";
export default {
    namespaced : true ,
    state : {
     
    },
    //开可预测性
    mutations : {
         
    },
    actions : {
        async login({commit , state} , {username , password , router}){
            //用fetch发出POST异步请求
            const {result} = await axios.post("/api/login" , {
                           username,
                           password
                        }).then(data=>data.data);

            if(result){
                router.push({"name" : "Index"});
            }
        }
    }
}
 