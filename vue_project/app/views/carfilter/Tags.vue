<template>
	   <div>
	   	   <Tag  closable v-for="item in selectionData"  :key="item.b" @on-close="handleClose(item.b)" v-if="isShow(item.b)">
	   	   	   {{item.a}}:{{show(item.b)}}
	   	   </Tag>
	   </div>
</template>

<script type="text/javascript">
	export default{
		    data(){
				return {
					      //数据字典，用来循环遍历，中文用于输出，英文用于判断
					 selectionData:[
		                          {"a":"颜色","b":"color"},
		                          {"a":"座位数","b":"seat"},
		                          {"a":"排放标准","b":"exhaust"},
		                          {"a":"品牌","b":"brand"},
		                          {"a":"价格","b":"price"},
		                          {"a":"购车时间","b":"buydate"}
					 ]
				}
		    },
		    methods:{
		    	  handleClose (english) {
                            //这个需要将数组置空，然后重新查询数据
                           switch(english){
                           	  case "color":
                           	        this.$store.dispatch("carfilter/changeColor",{"values":[]});
                           	  break;
                           	  case "seat":
                           	        this.$store.dispatch("carfilter/changeSeat",{"values":[]});
                           	  break;
                           	  case "exhaust":
                           	        this.$store.dispatch("carfilter/changeExhaust",{"values":[]});
                           	  break;
                           	  case "brand":
                           	        this.$store.dispatch("carfilter/changeBrand",{"values":[]});
                           	  break;
                           	  case "price":
                           	        this.$store.dispatch("carfilter/changePrice",{"values":[0,110]});
                           	  break;
                           	  case "buydate":
                           	        this.$store.dispatch("carfilter/changeBuydate",{"cardate":[0,Date.parse(new Date())]});
                           	  break;
                           }
                 },
                 isShow(english){
                         //如果这个english是color的话。判断color数组的长度是不是0.如果不是0，返回true，则显示。反之不显示。
                         switch(english){
                           	  case "color":
                           	  case "seat":
                           	  case "exhaust":
                           	  case "brand":
                           	        return  this.$store.state.carfilter[english].length != 0
                           	  break;
                           	  case "price":
                                    if(this.$store.state.carfilter[english][0] == 0 && this.$store.state.carfilter[english][1] == 110 ){
                                                return   false;
                                    }else{
                                    	        return   true;
                                    }
                           	  break;
                           	  case "buydate":
                                    if(this.$store.state.carfilter[english][0] == 0  ){
                                                return  false;
                                    }else{
                                    	        return   true;
                                    }  
                           	  break;
                           	  
                           }
                 },
                 show(english){
                 	     switch(english){
                           	  case "color":
                           	  case "seat":
                           	  case "exhaust":
                           	  case "brand":
                           	        return  this.$store.state.carfilter[english].join(" 或 ")
                           	  break;
                           	  case "price":
                           	        return  this.$store.state.carfilter[english][0] +"万元到" +this.$store.state.carfilter[english][1]+"万元"
                           	  break;
                           	  case "buydate":
                           	        //数组第一项的日期
                           	        var  y1 = new Date(this.$store.state.carfilter[english][0]).getFullYear();
                           	        var  m1 = new Date(this.$store.state.carfilter[english][0]).getMonth()+1;
                           	        var  d1 = new Date(this.$store.state.carfilter[english][0]).getDate();
                           	        //数组第二项的日期
                           	        var  y2 = new Date(this.$store.state.carfilter[english][1]).getFullYear();
                           	        var  m2 = new Date(this.$store.state.carfilter[english][1]).getMonth()+1;
                           	        var  d2 = new Date(this.$store.state.carfilter[english][1]).getDate();
                           	        return  y1 +"年" + m1 +"月" + d1 +"日 到" + y2 +"年" + m2 +"月" + d2 +"日"
                           	  break;
                           }
                 }
		    }
	}
</script>