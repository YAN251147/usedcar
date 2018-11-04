<template>
	  <div v-if="images">
	  	   <button :class="{'cur':nowAlbum=='view'}"@click="changeNowAlbum('view')">外观（{{images.view.length}}）</button>
	  	   <button :class="{'cur':nowAlbum=='inner'}"@click="changeNowAlbum('inner')">内饰（{{images.inner.length}}）</button>
	  	   <button :class="{'cur':nowAlbum=='engine'}"@click="changeNowAlbum('engine')">结构（{{images.engine.length}}）</button>
	  	   <button :class="{'cur':nowAlbum=='more'}"@click="changeNowAlbum('more')">更多（{{images.more.length}}）</button>
 	  </div>
</template>

<script type="text/javascript">
	    export default{
	    	    computed:{
	    	    	    carInfo(){
	    	    	    	  return  this.$store.state.picshow.carInfo
	    	    	    },
	    	    	    images(){
	    	    	    	  return  this.$store.state.picshow.carInfo.images
	    	    	    },
	    	    	    nowAlbum(){
	    	    	    	  return  this.$store.state.picshow.nowAlbum
	    	    	    }
	    	    },
	    	    methods:{
	    	    	    changeNowAlbum(nowAlbum){
                                this.$store.dispatch("picshow/changeNowAlbum",{nowAlbum});
	    	    	    }
	    	    }
	    }
</script>

<style lang="less" scoped>
	    button{
	    	    float: left;
				width:120px;
				margin-right: 10px;
				height:40px;
				background-color: skyblue;
				margin-bottom: 10px;
				text-align: center;
				line-height: 40px;
				cursor: pointer;

				&:hover{
					background-color: orange;
				}

				&.cur{
					background-color: gold;
				}
	    }
</style>