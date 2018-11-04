<template>
	<div style="padding-top:20px;">
        
	 <vue-dropzone  id="dropzone1" :options="dropzoneOptions" :useCustomSlot="true" @vdropzone-success="uploadsuccess">
        <h2>请插入视图的图片</h2>
    </vue-dropzone>
   <vue-dropzone  id="dropzone2" :options="dropzoneOptions" :useCustomSlot="true" @vdropzone-success="uploadsuccess">
        <h2>请插入内饰的图片</h2>
    </vue-dropzone>
   <vue-dropzone  id="dropzone3" :options="dropzoneOptions" :useCustomSlot="true" @vdropzone-success="uploadsuccess">
        <h2>请插入结构的图片</h2>
    </vue-dropzone>
   <vue-dropzone  id="dropzone4" :options="dropzoneOptions" :useCustomSlot="true" @vdropzone-success="uploadsuccess">
        <h2>请插入细节的图片</h2>
    </vue-dropzone>

    <Button @click="tijiao">提交</Button>
	</div>
</template>
<script type="text/javascript">
	import vue2Dropzone from 'vue2-dropzone';
	export default {
		//所有元素都已经上树之后，这个生命周期要比created晚一些
		mounted(){
			      var self = this;
            $(".dropzone").sortable();

            //删除按钮
            $(".dropzone").delegate("button" , "click" , function(){
                    $(this).parents(".dz-preview").remove();
            });
		},
		data() {
		     return {
          dropzoneOptions: {
              url: '/api/upload',
              thumbnailWidth: 150,
              maxFilesize: 0.5,
              headers: { "My-Awesome-Header": "header value" }
          }
        }
		 },
		methods : {
			//提交按钮
			tijiao(){
                var view = [];
                var inner = [];
                var engine = [];
                var more = [];

                //遍历4个盒子的DOM
                $("#dropzone1 .dz-preview").each(function(){
                    view.push($(this).data("filename"));
                });
                $("#dropzone2 .dz-preview").each(function(){
                    inner.push($(this).data("filename"));
                });
                $("#dropzone3 .dz-preview").each(function(){
                    engine.push($(this).data("filename"));
                });
                $("#dropzone4 .dz-preview").each(function(){
                    more.push($(this).data("filename"));
                });
                
                this.$store.commit("addcar/changeImages" , {"images" : {
                    view,inner,engine,more
                }});

                this.$store.dispatch("addcar/tijiao");
                this.$store.commit("addcar/changeStep",{"step":3});
      },
      uploadsuccess(f,r){
               //将图片的名字添加到其对应的div对象上，自定义属性 data-属性
                f.previewElement.setAttribute("data-filename",r.filename);
      }
		},
		components: {
    		vueDropzone: vue2Dropzone
  		}
	}
</script>

<style lang="less">

  @import  (inline) "../../../js/vue2Dropzone.min.css";

	.img_b{
		float: left;
		position: relative;
		margin-right: 10px;

		.info{
			position: absolute;
			top:0;
			left:0;
			width:100%;
			font-size:40px;
			text-align: center;
			line-height: 100px;
		}
	}
	.upzone{
		min-height:200px;
		border: 1px dotted orange;
	}
</style>