<template>
	<div class="picshow_wrap">
		<div class="left_part">
			<BigImg></BigImg>
		</div>
		<div class="right_part">
			<Info></Info>
			<ChooseAlbum></ChooseAlbum>
			<SmallPics></SmallPics>
		</div>
	</div>
</template>

<script type="text/javascript">
	import BigImg from "./BigImg.vue";
	import ChooseAlbum from "./ChooseAlbum.vue";
	import Info from "./Info.vue";
	import SmallPics from "./SmallPics.vue";

	export default {
		created(){
			//初始化
			this.$store.dispatch("picshow/init",{ "id":this.$route.params.id});
		},
		computed : {

		},
		methods : {
			
		},
		components : {
			BigImg,
			ChooseAlbum,
			Info,
			SmallPics
		}
	}
</script>

<style lang="less" scoped>
	.picshow_wrap{
		position: relative;
		width:100%;
		height:100%;
		background-color: skyblue;
		color:white;
		min-height:550px;
 		.left_part{
			padding-right: 320px;
			position: relative;
			height:100%;
		}
		.right_part{
			position: absolute;
			right:0;
			top:0;
			width:300px;
			height:100%;
			padding-left: 20px;
			padding-top: 20px;
			border-left: 1px solid #eee;
		}
	}
</style>