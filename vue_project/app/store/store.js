//这个文件也不是最主要干活的，干活的都是下面的小弟们。
//引入图集的js文件
import  picshow  from "./picshow.js";
import  carfilter  from "./carfilter.js";
import  addcar  from "./addcar.js";
import  userinfo  from "./userinfo.js";
import  login  from "./login.js";

export  default{
	      //在下方填写，类似注册的功能。然后app.vue文件里就可以用picshow了
	      modules:{
	      	     picshow,carfilter,addcar,userinfo,login
	      }
}