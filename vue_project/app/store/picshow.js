export default{
	     namespaced:true,
	     state:{
	     	   id:1000001,
	     	   nowAlbum:"view",
	     	   nowIdx: 0,
	     	   carInfo:{}
	     },
	     mutations:{
	     	    changeId(state,{id}){
                      state.id = id;
	     	    },
                changeCarInfo(state,{carInfo}){
                      state.carInfo = carInfo;
                },
                changeNowAlbum(state,{nowAlbum}){
                	  state.nowAlbum = nowAlbum;
                },
                changeNowIdx(state,{nowIdx}){
                      state.nowIdx = nowIdx;
                }
	     },
	     actions:{
	     	    //初始化的方法，在views/picshow/Index.vue里引用。写在created(){}（生命周期创建完成之后）里面
	     	    async  init({commit,state},{id}){
	     	    	    //先替换掉id，然后再发fetch请求当前id的车的信息。
	     	    	    commit("changeId",{id});
	     	    	    const{result} = await  fetch("/api/car/" + state.id).then(data =>data.json())
                        commit("changeCarInfo",{"carInfo":result});
	     	    },
	     	    //更改右上方按钮的选项的方法，因为有副作用，所以用异步操作，相对应的方法写在了actions里。
	     	    changeNowAlbum({commit,state},{nowAlbum}){
                        commit("changeNowAlbum",{nowAlbum}); 
                        commit("changeNowIdx",{"nowIdx":0});
	     	    },
	     	    //点击按钮换下一张图因为有副作用，所以写在actions里面
	     	    nextTu({commit,state}){
	     	    	    if( state.nowIdx < state.carInfo.images[state.nowAlbum].length -1){
	     	    	    	   state.nowIdx ++;
	     	    	    }else{
	     	    	    	if(state.nowAlbum=="view"){
                               state.nowAlbum="inner";
 	     	    	    	}else if(state.nowAlbum=="inner"){
                               state.nowAlbum="engine";
 	     	    	    	}else if(state.nowAlbum=="engine"){
	     	    	    	   state.nowAlbum="more";
 	     	    	    	}else if(state.nowAlbum=="more"){
	     	    	    	   state.nowAlbum="view";
                            }
                            commit("changeNowIdx",{"nowIdx":0});//这个是点击下一张按钮的副作用
	     	    	    }
	     	    },
	     	    previousTu({commit,state}){
	     	    	    if( state.nowIdx > 0){
	     	    	    	    state.nowIdx --;
	     	    	    }else{
	     	    	    	if(state.nowAlbum=="view"){
                               state.nowAlbum="more";
	     	    	    	}else if(state.nowAlbum=="more"){
                               state.nowAlbum="engine";
	     	    	    	}else if(state.nowAlbum=="engine"){
	     	    	    	   state.nowAlbum="inner";
	     	    	    	}else if(state.nowAlbum=="inner"){
	     	    	    		state.nowAlbum="view";
                            }
                            commit("changeNowIdx",{"nowIdx":state.carInfo.images[state.nowAlbum].length-1});
	     	    	    }
	     	    }
	     }

}