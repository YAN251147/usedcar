<template>
    <Form ref="myForm" :model="myForm" :rules="ruleValidate" :label-width="80">
        <FormItem label="姓名" prop="name">
              <Input v-model="myForm.name" placeholder="请输入您的姓名"></Input>
        </FormItem>
        <FormItem label="手机号" prop="phone">
              <Input v-model="myForm.phone" placeholder="请输入您的手机号"></Input>
        </FormItem>
        <FormItem label="身份证号" prop="idcard">
			   <Input v-model="myForm.idcard" placeholder="请准确输入身份证号码"></Input>
		    </FormItem>
		    <FormItem label="车辆车系" prop="bAnds">
		    	   <Cascader :data="allBAndS" v-model="myForm.bAnds"></Cascader>
		    </FormItem>
		    <FormItem label="价格（万元）" prop="price">
		    	   <Input v-model="myForm.price" placeholder="请输入价格"></Input>
		    </FormItem>
        <FormItem label="公里数" prop="km">
        <Input v-model="myForm.km" placeholder="请准确输入"></Input>
        </FormItem>
        <FormItem label="排量" prop="engine">
        <Input v-model="myForm.engine" placeholder="请准确输入"></Input>
        </FormItem>
        <FormItem label="禁止小白兔" prop="rabbit">
               <Input v-model="myForm.rabbit" placeholder="请不要输入小白兔"></Input>
        </FormItem>
		    <FormItem>
		    		<Button type="success" @click="tijiao"  style="width:100px">提交</Button>
		    </FormItem>
    </Form>
</template>
<script>
     export default {
        data () {
            return {
            	allBAndS:[
                    {
 						  label : "奥迪",
						  children : [
  							{
  								value : "A6L",
  								label : "A6L"
  							},
  							{
  								value : "Q5",
  								label : "Q5"
  							},
  							{
  								value : "TT",
  								label : "TT"
  							}
 						  ]	
    					  },
    					{
     						label : "雪佛兰",
    						children : [
    							{
    								value : "迈锐宝",
    								label : "迈锐宝"
    							},
    							{
    								value : "科鲁兹",
    								label : "科鲁兹"
    							},
    							{
    								value : "GLK级",
    								label : "GLK级"
    							}
     						]	
    					}
            	],
                myForm: {
                    name: "",
                    phone:"",
                    idcard:"",
                    bAnds:[],
                    price:"",
                    rabbit:"",
                    km:""
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '姓名不能为空，必须填写。', trigger: 'blur' },
                        { type: 'string', pattern:/^([\u2E80-\u9FFF]{2,16})$/, message: '只能输入2-16个中文', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '手机不能为空，必须填写。', trigger: 'blur' },
                        { type: 'string', pattern:/^1[3578]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
                    ],
                    idcard:[
                        { required: true, message: '身份证不能为空', trigger: 'blur' },
                        { type: 'string', pattern:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入正确的身份证号', trigger: 'blur'}
                    ],
                    price:[
                        { required: true, message: '价格不能为空', trigger: 'blur' },
                        { type: 'number', trigger: 'blur',validator: (rule,value,callback) =>{
                                           if(!(value>0 && value<200)){
                                                    callback("请输入0到200之间的数字");
                                           }
                                           callback();
                                 }
                         }
                    ],
                    bAnds:[],
                    rabbit:[
                         { required: true, message: '随便写点，不能写小白兔', trigger: 'blur' },
                         { type: 'string', trigger: 'blur',validator: async function(rule,value,callback){
                                  const {result} = await fetch("/api/check?word=" +value).then(data =>data.json());
                                  if(!result){
                                          callback("请不要输入小白兔");
                                  }
                                 }
                         }  
                    ]
                }
            }
        },
        methods : {
			  tijiao(){
                var  self = this;
				        this.$refs.myForm.validate((valid) => {
                    if (valid) {
                        //真正做提交的位置
                        this.$store.commit("addcar/changeForm",{"form" : self.myForm});
                        this.$store.commit("addcar/changeStep",{"step":2});
                    } else {
                        this.$Message.error('表单错误，不能提交');
                    }
                })
			}
		}
    }
</script>
