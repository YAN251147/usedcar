import  Main               from "./layouts/Main.vue";
import  Index              from "./layouts/Index.vue";
import  Buycar             from "./layouts/Buycar.vue";
import  Salecar            from "./layouts/Salecar.vue";
import  sifacar            from "./layouts/sifacar.vue";
import  lanxiang           from "./layouts/lanxiang.vue";
import  lanxiangchushou    from "./layouts/lanxiangchushou.vue";
import  Salekache          from "./layouts/Salekache.vue";

import  carfilter          from "./views/carfilter/Index.vue";
import  addcar             from "./views/addcar/Index.vue";
import  picshow            from "./views/picshow/Index.vue";
import  login              from "./views/login/login.vue";


export default {
  routes : [
        {
          path : "/main",
          component : Main,
          children: [
                {
                      path: "index",
                      component: Index,
                      name: "Index"
                },
                {
                      path: "buycar",
                      component : Buycar,
                      children:[
                            {
                              path: "carfilter",
                              component : carfilter,
                              name:"carfilter"
                            },
                            {
                              path: "sifacar",
                              component : sifacar,
                              name:"sifacar"
                            },
                            {
                              path: "lanxiang",
                              component : lanxiang,
                              name:"lanxiang"
                            }
                      ]
                },
                {
                      path: 'salecar',
                      component: Salecar,
                      children:[
                            {
                              path: "addcar",
                              component : addcar,
                              name:"addcar"
                            },
                            {
                              path: "Salekache",
                              component : Salekache,
                              name:"Salekache"
                            },
                            {
                              path: "lanxiangchushou",
                              component : lanxiangchushou,
                              name:"lanxiangchushou"
                            }
                      ]
                }
          ]
        },
        {
          path: '/picshow/:id',
          component: picshow
        },
        {
          path :'/login',
          component: login
        },
        {
          path: "*",
          redirect: '/main/index'
        }
  ]
}