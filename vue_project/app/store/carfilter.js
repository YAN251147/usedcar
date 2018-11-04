export  default{
	 namespaced:true,
	 state:{
            cars:[],
            count:0,
            page:1,
            pagesize:10,
            color:[],
            brand:[],
            series:[],
            seat:[],
            exhaust:[],
            fuel:[],
            price:[0,110],
            buydate:[0 , Date.parse(new Date())],
            sortby:"seat",
            sortdirection:"asc"

	 },
	 mutations:{
          changeCars(state,{cars}){
               state.cars = cars;
          },
          changeCount(state,{count}){
               state.count = count;
          },
          changePage(state,{page}){
               state.page = page;
          },
          changePagesize(state,{pagesize}){
               state.pagesize = pagesize;
          },
           changeColor(state,{values}){
               state.color = values;
          },
           changeBrand(state,{values}){
               state.brand = values;
          },
           changeSeries(state,{values}){
               state.series.push(values);
          },
           changeSeat(state,{values}){
               state.seat = values;
          },
          changeExhaust(state,{values}){
               state.exhaust = values;
          },
          changeFuel(state,{values}){
               state.fuel = values;
          },
          changePrice(state,{values}){
               state.price = values;
          },
          changeBuydate(state,{cardate}){
                state.buydate = cardate;
          },
          changeSortby(state,{sortby}){
                state.sortby = sortby;
          },
          changeSortdirection(state,{sortdirection}){
                state.sortdirection = sortdirection;
          }

	 },
      actions:{
	     	    //初始化的方法，
	     	      loadData({commit,state}){
	     	    	      chaxun(commit,state);
	     	    },
            changePage({commit,state},{page}){
                         commit("changePage",{page});
                         chaxun(commit,state);
            },
            changePagesize({commit,state},{pagesize}){
                        commit("changePagesize",{pagesize});
                        commit("changePage",{"page":1});
                        chaxun(commit,state);
            },
	     	     changeColor({commit,state},{values}){
                        commit("changeColor",{values});
                        commit("changePage",{"page":1});
                        chaxun(commit,state);
 	     	    },
             changeBrand({commit,state},{values}){
                        commit("changeBrand",{values});
                        commit("changePage",{"page":1});
                        chaxun(commit,state);
            },
            changeSeries({commit,state},{values}){
                        commit("changeSeries",{values});
                        commit("changePage",{"page":1});
                        chaxun(commit,state);
            },
            changeSeat({commit,state},{values}){
                        commit("changeSeat",{values});
                        commit("changePage",{"page":1});
                        chaxun(commit,state);
            },
            changeExhaust({commit,state},{values}){
                        commit("changeExhaust",{values});
                        commit("changePage",{"page":1});
                        chaxun(commit,state);
            },
            changeFuel({commit,state},{values}){
                        commit("changeFuel",{values});
                        commit("changePage",{"page":1});
                        chaxun(commit,state);
            },
            changePrice({commit,state},{values}){
                        commit("changePrice",{values});
                        commit("changePage",{"page":1});
                        chaxun(commit,state);
            },
            changeBuydate({commit,state},{cardate}){
                       commit("changeBuydate",{cardate})
                       commit("changePage",{"page":1});
                       chaxun(commit,state);
            },
            changeSort({commit,state},{sortby,sortdirection}){
                       commit("changeSortdirection",{sortdirection});
                       commit("changeSortby",{sortby});
                       chaxun(commit,state);
            }

	 }
}
async  function  chaxun(commit,state){
       const{results,count} = await  fetch(`/api/findcar?
page=${state.page}&
pagesize=${state.pagesize}&
color=${state.color.join("v")}&
brand=${state.brand.join("v")}&
series=${state.series.join("v")}&
seat=${state.seat.join("v")}&
exhaust=${state.exhaust.join("v")}&
fuel=${state.fuel.join("v")}&
price=${state.price.join("to")}&
buydate=${state.buydate.join("to")}&
sortby=${state.sortby}&
sortdirection=${(state.sortdirection == "asc" ? 1 : -1)}
`).then(data =>data.json());
commit("changeCars",{"cars":results});
commit("changeCount",{count});
}