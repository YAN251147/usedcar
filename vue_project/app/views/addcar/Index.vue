<template>
	   <div>
	   	    <Steps :current="step-1">
		        <Step :title="showWord(1)" content="添加车辆级人物基本信息"></Step>
		        <Step :title="showWord(2)" content="上传车辆图片"></Step>
		        <Step :title="showWord(3)" content="添加成功"></Step>
 		    </Steps>
		    <div :is="'step'+ step"></div>
	   </div>
</template>
<script type="text/javascript">
         import  step1  from "./Step1.vue";
         import  step2  from "./Step2.vue";
         import  step3  from "./Step3.vue";
 	     export  default{
	     	      methods:{
	     	      	      showWord(step){
	     	      	      	     if(step == this.$store.state.addcar.step){
                                       return   "进行中"
	     	      	      	     }else if(step < this.$store.state.addcar.step){
	     	      	      	     	   return   "已完成"
	     	      	      	     }else if(step == this.$store.state.addcar.step){
	     	      	      	     	   return   "待进行"
	     	      	      	     }
	     	      	      }
	     	      },
	     	      computed:{
	     	      	     step(){
	     	      	     	  return  this.$store.state.addcar.step
	     	      	     }
	     	      },
	     	      components:{
	     	      	    step1,step2,step3
	     	      }
	     }

</script>