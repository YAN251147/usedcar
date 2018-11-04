import axios from "axios";
export default {
	namespaced : true ,
	state : {
	 	step : 1 ,
	 	form : {} ,
	 	images : {
	 		view : [],
	 		inner : [],
	 		engine : [],
	 		more : []
	 	}
	},
	//开可预测性
	mutations : {
	 	changeForm(state , {form}){
	 		state.form = form;
	 	},
	 	changeStep(state , {step}){
	 		state.step = step;
	 	},
	 	changeImages(state , {images}){
 	 		state.images = images;
	 	}
	},
	actions : {
		async tijiao({commit , state}){
			//用fetch发出POST异步请求
			await fetch("/api/tijiao/" , {
				method:"POST",   
				body:JSON.stringify({
				   "form" : state.form ,
				   "images" : state.images
				}),  
				headers: {
				  'Accept': 'application/json',
				  'Content-Type': 'application/json',
				}
			});
		}
	}
}
 