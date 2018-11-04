<template>
	  <div>
	  	   {{carInfo.brand}},{{carInfo.series}}{{carInfo.engine}}
	  	   <br>
	  	   {{Math.round(carInfo.km/10000)}}万公里，{{carInfo.price}}万元
	  	   <br>
	  	   购买日期：{{new Date(carInfo.buydate).getFullYear()}}年
	  </div>
</template>

<script type="text/javascript">
	    export default{
	    	    computed:{
	    	    	    carInfo(){
	    	    	    	  return  this.$store.state.picshow.carInfo
	    	    	    }
	    	    }
	    }
</script>

<style lang="less">
	
</style>