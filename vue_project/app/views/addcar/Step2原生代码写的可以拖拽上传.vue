<template>
	   <div style="padding-top:20px" >
	   	        <input type="file" ref="kuang"  hidden Multiple>

	   	        <Button type="primary"  @click="checktu" style="width:80px">插入图片</Button>
                 <div style="clear:both"></div>
                     
                        <div class="upzone"  ref="upzone">
                            <div v-for ="(item,index) in files" :key="index" class="bigbox">
                                 <img  :src="item.yulantu" width="100px" > 
                                 <div  class="percent" v-if="item.progress">
                                      {{Math.round(item.progress)}}%
                                </div>
                            </div>
                        </div>
                 <div style="clear:both"></div>
	   	        <Button @click="tijiao"  style="width:50px">提交</Button>
 	   </div>
</template>
<script type="text/javascript">
    // import VueDragResize from 'vue-drag-resize';
   // import VueSwing from 'vue-swing';
   export default {
        //所有元素上树之后的生命周期，比created晚一点
        mounted() {
            var self = this;
            //当选择图片的这个空间被改变，即用户已经选择好了一张图片之后触发
            this.$refs.kuang.onchange = function() {
                for (let i = 0; i < self.$refs.kuang.files.length; i++) {
                    let fr = new FileReader();

                    fr.readAsDataURL(self.$refs.kuang.files[i]);

                    fr.onload = function() {

                         self.files.push({
                        	 yulantu: this.result,
                             file: self.$refs.kuang.files[i],
                             progress:0
                        })
                    }
                }
            }
            //监听外部拖拽
			// this.$refs.upzone.addEventListener("dragenter" , function(event){
			// 	event.preventDefault();
 		// 	},true);
            
    //         this.$refs.upzone.addEventListener("drageover" , function(event){
				// event.preventDefault();
 			// },true);
            this.$refs.upzone.addEventListener("drop",function(event) {
                event.preventDefault();
                for (let i = 0; i < event.dataTransfer.files.length; i++) {

                    let fr = new FileReader();
                    //读取这个图片的BASE64编码readAsBinaryString 
                    fr.readAsDataURL(event.dataTransfer.files[i]);
                    //等待fr触发load了：
                    fr.onload = function(event) {
                        //onload函数内部  之前this.result是图片的base64编码。
                        //onload函数内部  event.currentTarget.result  这个是图片的base64编码。
                        function dataURLtoFile( dataurl)  {
                            var arr  =  dataurl.split(','),
                             mime  =  arr[0].match(/:(.*?);/)[1],
                             bstr  =  atob(arr[1]),
                             n  =  bstr.length,
                             u8arr  =  new Uint8Array(n);
                            while (n--) {   
                            	u8arr[n]  =  bstr.charCodeAt(n);
                            }   
                            return new File([u8arr], {type: mime});  
                        }
                        //如果要改变data中某个数组的某一项，不能直接改，容易不触发视图更新
                        //必须:
                        self.files.push({
                        	     yulantu: this.result,
                                 file: dataURLtoFile(event.currentTarget.result),
                                 progress:0
                        });
                    }
                }
            },
            true);
            //阻止浏览器的默认时间
            document.ondragover = function(e) { e.preventDefault() };
        },
        data() {
            return {
                //存放预览图，上传进度及文件
                files: []
            }
        },
        methods: {
            //选图按钮
            checktu() {
                this.$refs.kuang.dispatchEvent(new MouseEvent("click"));
            },
            //提交按钮
            tijiao() {
                var self = this;
                for (let i = 0; i < this.files.length; i++) {
                    //创建一个虚拟表单 formdata
                    let form = new FormData();
                    //追加图片
                    form.append("tupian", this.files[i].file);
                    let xhr = new XMLHttpRequest();
                    xhr.upload.onprogress = function(e) {
                    	self.files[i].progress = e.loaded / e.total * 100;
                    };
                    xhr.open("POST", "/api/tijiao", true);
                    xhr.send(form);
                }
            }
        },
        components: {
                    
        }
    }
</script>
<style lang="less">
.upzone{
	     min-height:300px;
	     border:1px solid red;
		.bigbox{
			 color:red;
			 position:relative;
			 float:left;
			 margin-right:10px;
			 .percent{
			 	   position: absolute;
			 	   top:0;
			 	   left:0;
			 	   text-align:center;
			 	   line-height:100px;
			 	   font-size:50px;
			 }
		}
}
</style>

