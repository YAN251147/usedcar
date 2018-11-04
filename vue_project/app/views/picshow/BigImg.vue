<template>
	<div v-if="images" class="bi">
		<img width="700" :src="dizhi" class="bigimg" ref="bigimg"> 

		<div class="lBtn" @click="previousTu"></div>
		<div class="rBtn" @click="nextTu"></div>

		<div class="loading" ref="juhua">
			<span></span>
			<span></span>
			<span></span>
			<span></span>
			<span></span>
		</div>

		<div class="numberdiv">
			{{woshidijizhang + 1}}/{{zongshu}}
			<img @click="changeAuto" width="60" :src="isAuto ? '/images/zanting.svg' : '/images/bofang.svg'" />
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		data(){
			return {
				isAuto : false
			}
		},
		created(){
			var self = this;
			 
		},
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
			},
			dizhi(){
				return "http://127.0.0.1:3000/images/carimages/" + this.id + "/" + this.nowAlbum + "/" + this.images[this.nowAlbum][this.nowIdx];
			},
			xiaotuduiyingdizhi(){
				return "http://127.0.0.1:3000/images/carimages_small/" + this.id + "/" + this.nowAlbum + "/" + this.images[this.nowAlbum][this.nowIdx];
			},
			zongshu(){
				var allArr = [...this.$store.state.picshow.carInfo.images.view , ...this.$store.state.picshow.carInfo.images.inner , ...this.$store.state.picshow.carInfo.images.engine , ...this.$store.state.picshow.carInfo.images.more];
				return allArr.length;
			},
			woshidijizhang(){
					//我是第几张
				if(this.nowAlbum == "view"){
					return this.nowIdx;
				}else if(this.nowAlbum == "inner"){
					return this.$store.state.picshow.carInfo.images.view.length  + this.nowIdx;
				}else if(this.nowAlbum == "engine"){
					return this.$store.state.picshow.carInfo.images.view.length  + this.$store.state.picshow.carInfo.images.inner.length +  this.nowIdx;
				}else if(this.nowAlbum == "more"){
					return this.$store.state.picshow.carInfo.images.view.length + this.$store.state.picshow.carInfo.images.inner.length + this.$store.state.picshow.carInfo.images.engine.length+   this.nowIdx;
				}
			}
		},
		methods : {
			nextTu(){
				this.$store.dispatch("picshow/nextTu");
			},
			previousTu(){
				this.$store.dispatch("picshow/previousTu");
			},
			changeAuto(){
				this.isAuto = !this.isAuto;
			}
		},
		//当数据更新的时候的生命周期
		updated(){
			//用小图顶着
			this.$refs.bigimg.src = this.xiaotuduiyingdizhi;
			//显示菊花
			this.$refs.juhua.style.display = "block";
			//创建一个虚拟图片，Image是内置构造函数
			var image = new Image();
			//让这个虚拟图片的src等于新地址
			image.src = this.dizhi;
			//备份
			var self = this;
			//监听image的load事件
			image.onload = function(){
				self.$refs.bigimg.src = self.dizhi;
				//隐藏菊花
				self.$refs.juhua.style.display = "none";
			}
		},
		watch : {
			isAuto(a){
				var self = this;
				if(a){
					clearInterval(this.timer);
					this.timer = setInterval(()=>{
						self.nextTu();
					},1000);
				}else{
					clearInterval(this.timer);
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.bi{
		position: relative;
		width:100%;
		height:100%;
        min-height:730px;
		.bigimg{
			width:90%;
		 	position: absolute;
		 	height:730px;
		 	top:50%;
		 	left:50%;
		 	transform:translateX(-50%) translateY(-50%);
		}

		.lBtn{
			position: absolute;
			width:50%;
			top:0;
			left:0;
			height:100%;
		 	cursor: url(/images/cursor_left.cur),auto;
		}
		.rBtn{
			position: absolute;
			width:50%;
			top:0;
			right:0;
			height:100%;
			cursor: url(/images/cursor_right.cur),auto;
		}

		.loading{
			position: absolute;
			width: 80px;
			height: 40px;
			top	:50%;
			left:50%;
			margin-left: -40px;
			margin-top: -20px;
			display: none;
		}

        .loading span{
            display: inline-block;
            width: 8px;
            height: 100%;
            border-radius: 4px;
            background: lightgreen;
            -webkit-animation: load 1s ease infinite;
			animation: load 1s ease infinite;
        }
        @-webkit-keyframes load{
            0%,100%{
                height: 40px;
                background: lightgreen;
            }
            50%{
                height: 70px;
                margin: -15px 0;
                background: lightblue;
            }
        }
        .loading span:nth-child(2){
            -webkit-animation-delay:0.2s;
			animation-delay:0.2s;
        }
        .loading span:nth-child(3){
            -webkit-animation-delay:0.4s;
			animation-delay:0.4s;
        }
        .loading span:nth-child(4){
            -webkit-animation-delay:0.6s;
			animation-delay:0.6s;
        }
        .loading span:nth-child(5){
            -webkit-animation-delay:0.8s;
			animation-delay:0.8s;
        }

		.numberdiv{
			position: absolute;
			bottom:100px;
			left:0px;
			width:150px;
			height:60px;
			background-color: rgba(0,0,0,.5);
			border-radius:0 50px 50px 0;
			color:white;
			font-size:40px;
			text-align: center;
			padding-right: 50px;

			img{
				cursor: pointer;
				position: absolute;
			    right: 6px;
    			top: -2px;
			}
		}
	}
</style>