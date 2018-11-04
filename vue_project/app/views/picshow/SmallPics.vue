<template>
	<div class="sp">
		<div class="unit" v-if="images" :style="'left:' + -260 * Math.floor(nowIdx / 6) + 'px'" ref="unit">
			<ul v-for="i in Math.ceil(images[nowAlbum].length / 6)">
				<li v-for="(item,index) in images[nowAlbum].slice((i - 1) * 6 , i * 6)" @click="changeNowIdx(index + (i - 1) * 6)" :class="{'cur' : nowIdx == index + (i - 1) * 6}">
					<img :src="dizhi(item)" alt="">
				</li>
			</ul>
		</div>
		<div class="nav" ref="nav" v-if="images">
			<span v-for="i in Math.ceil(images[nowAlbum].length / 6)" :style="'width:' + 260 / Math.ceil(images[nowAlbum].length / 6) + 'px'" :class="{'cur' : Math.floor(nowIdx / 6) == i - 1}" @click="gotoPage(i - 1 , $event)"></span>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		computed : {
			id(){
				return this.$store.state.picshow.id;
			},
			images(){
				return this.$store.state.picshow.carInfo.images;
			},
			nowAlbum(){
				return this.$store.state.picshow.nowAlbum;
			},
			nowIdx(){
				return this.$store.state.picshow.nowIdx;
			}
		},
		methods : {
			dizhi(item){
				return "http://127.0.0.1:3000/images/carimages_small/" + this.id + "/" + this.nowAlbum + "/" + item;
			},
			changeNowIdx(index){
				this.$store.commit("picshow/changeNowIdx" , {"nowIdx" : index});
			},
			gotoPage(page , event){
				 
				//改变了page也不意味着改变了nowIdx。 
				this.$refs.unit.style.left = page * -260 + "px";

				//得到所有span
				var spans = this.$refs.nav.getElementsByTagName("span");
				//写“排他”
				for(var i = 0 ; i < spans.length; i++){
					spans[i].className = "";	//去掉cur类名
				}
				//自己对应的加cur类名
				event.target.className = "cur";
			}
		},
		//更新之后，用DOM方法解决DOM对视图的改变
		updated(){
			this.$refs.unit.style.left = -260 * Math.floor(this.nowIdx / 6) + 'px';
			//得到所有span
			var spans = this.$refs.nav.getElementsByTagName("span");
			//写“排他算法”
			for(var i = 0 ; i < spans.length; i++){
				spans[i].className = "";	//去掉cur类名
			}
			//自己对应的加cur类名
			spans[Math.floor(this.nowIdx / 6)].className = "cur";
		}
	}
</script>

<style lang="less">
	.sp{
		clear: both;
		overflow: hidden;
		width:260px;
		.unit{
			width:99999px;
			position: relative;
			transition:all 0.6s ease 0s;
			

			ul{
				float: left;
				list-style: none;
				width:260px;

				li{
					float: left;
					width:120px;
					margin-right: 10px;
					margin-bottom: 10px;
					position: relative;


					 opacity:0.4;
					&.cur{
						opacity: 1;
					}

					img{
						width:120px;
					}
				}
			}
		}

		.nav{
			span{
				float: left;
				height:10px;
				width:100px;
				box-sizing:border-box;
				border-right: 10px solid skyblue;
				background-color: grey;
				&.cur{
					background-color: gold;
				}
			}
		}
	}
</style>