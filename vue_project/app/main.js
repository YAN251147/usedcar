import Vue    from "vue";
import Vuex   from "vuex";
import App    from "./App.vue";
import iview  from "iview";
import storeobj  from "./store/store.js";
import VueRouter from 'vue-router';
import route  from "./route.js";
 

Vue.use(Vuex);

Vue.use(iview);

Vue.use(VueRouter);

const store  = new Vuex.Store(storeobj);
const router = new VueRouter(route);


//传说中的路由守卫
router.beforeEach((to, from, next) => {
    if( to.fullPath != "/login"){
       store.dispatch("userinfo/fetchme",{next})
    }else{
         next()
    }
       
})


new Vue({
	el : "#app",
	render(h){
		return h(App);
	},
	store,
	router 
});