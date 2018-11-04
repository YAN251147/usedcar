<template>
       <div>
           <Row>
				<Col span="2">
					座位数:
				</Col>
				<Col span="22">
					<CheckboxGroup v-model="seat">
						<Checkbox label="2"></Checkbox>
						<Checkbox label="4"></Checkbox>
						<Checkbox label="5"></Checkbox>
						<Checkbox label="20"></Checkbox>
					</CheckboxGroup>
				</Col>
		   </Row>
		   <Row>
				<Col span="2">
					排放标准:
				</Col>
				<Col span="22">
					<CheckboxGroup v-model="exhaust">
						<Checkbox label="国一"></Checkbox>
						<Checkbox label="国二"></Checkbox>
						<Checkbox label="国三"></Checkbox>
						<Checkbox label="国四"></Checkbox>
					</CheckboxGroup>
				</Col>
		   </Row>
       	   <Row >
				<Col span="2">
					颜色:
				</Col>
				<Col span="22">
					<CheckboxGroup v-model="color">
						<Checkbox label="红"></Checkbox>
						<Checkbox label="黄"></Checkbox>
						<Checkbox label="蓝"></Checkbox>
						<Checkbox label="黑"></Checkbox>
						<Checkbox label="白"></Checkbox>
						<Checkbox label="灰"></Checkbox>
						<Checkbox label="银灰"></Checkbox>
						<Checkbox label="香槟"></Checkbox>
					</CheckboxGroup>
				</Col>
		   </Row>
		    <Row >
				<Col span="2">
					品牌:
				</Col>
				<Col span="22">
				    <Tabs type="card" >
				        <TabPane v-for="item in carbrand" :key="item.brand" :label="item.brand" >
				        	<CheckboxGroup   @on-change="changeSeries($event)">
						        <Checkbox v-for="_item in item.series" :key="_item" :label="_item"  >{{_item}}</Checkbox>
						    </CheckboxGroup>
				        </TabPane>
				    </Tabs>
				</Col>
		   </Row>
		   <div class="clear"></div>
           <Row>
              <Col span="2">
					价格:
				</Col>
           	  <Col span="8">
           	  	<Slider range :value="$store.state.carfilter.price" :min="0" :max="110" @on-change="changePrice"></Slider>
           	  </Col>
           	  <Col span="2">
				   &nbsp;
				</Col>
				 <Col span="2">
				   购车时间:
				</Col>
           	  <Col span="8">
           	  	<DatePicker type="daterange"  :value="$store.state.carfilter.buydate"  placeholder="选择日期"  palcement="bottom" @on-change="changeBuydate"></DatePicker>
           	  </Col>
           </Row>
           <Row>
              <Col span="2">
					筛选条件:
				</Col>
           	  <Col span="22">
                    <Tags></Tags>
              </Col>
           </Row>
            <!-- 展示车的信息的标签 -->
            当前在第{{$store.state.carfilter.page}}页，符合条件的共有{{$store.state.carfilter.count}}辆车
 	       <Table :columns="colconfig" :data="cars" class="daodao" @on-sort-change="changesort"></Table>
           <Page :total="$store.state.carfilter.count"  :page-size="$store.state.carfilter.pagesize" show-sizer  @on-change="changePage" @on-page-size-change="changePagesize"  :current="$store.state.carfilter.page"/>
       </div>
</template>
<script type="text/javascript">
      import   Tags from "./Tags.vue";
      import  carbrand from "../utils/caibrand.js";
	  export  default{
	  	       created(){
				//初始化	
				 this.$store.dispatch("carfilter/loadData");
		      },
		      components:{
                      Tags
		      },
              data () {
			            return {
			            	carbrand,
			                colconfig: [
			                    {
			                        type: 'selection',
			                        width: 60,
			                        align: 'center'
			                    },
			                    {
			                        title: '车预览图',
			                        key: 'avatar',
			                        render(h,{row}){
                                            return h({
                                            	template : "<a href='/#/picshow/"+ row.id +"' target='blank'><img width='60' src='http://127.0.0.1:3000/images/carimages_small/" + row.id + "/view/" + row.avatar + "'/></a>"
                                            })
			                        }
			                    },
			                    {
			                        title: '品牌',
			                        key: 'brand'
			                    },
			                    {
			                        title: '车系',
			                        key: 'series'
			                    },
								{
									title : "颜色",
									key : "color"
								},
								{
									title : "座位数",
									key : "seat",
									sortable: true
								},
			                    {
			                        title: '万公里数',
			                        key: 'km',
			                        render(h,{row}){
			                        	  return h({
			                        	  	   template: "<div>"+Math.round(row.km/10000)+"</div>"
			                        	  })
			                        },
			                        sortable: 'custom'
			                    },
			                    {
									title : "价格",
									key : "price"
								},
			                    {
			                        title: '排放标准',
			                        key: 'exhaust'
			                    },
			                    {
			                        title: '购车时间',
			                        key: 'buydate',
			                        render(h,{row}){
			                        	 var y =  new Date(row.buydate).getFullYear();
			                        	 var m =  new Date(row.buydate).getMonth()+1;
			                        	 var d =  new Date(row.buydate).getDate();
                                         
			                        	   return h({
			                        	   	   template: `<div>${y}年${m}月${d}日</div>`
			                        	   })
			                        }
			                    }
			                ] 
			            }
			  },
		      methods:{
		      	  changePrice(values){
                            this.$store.dispatch("carfilter/changePrice",{values});
		      	  },
		      	  changePage(page){
		      	  	        this.$store.dispatch("carfilter/changePage",{page});
		      	  },
		      	  changePagesize(pagesize){
                            this.$store.dispatch("carfilter/changePagesize",{pagesize});
		      	  },
		      	  changeSeries(values){
		      	  	console.log(values)
                              this.$store.dispatch("carfilter/changeSeries",{values:values[0]});    
		      	  },
		      	  changeBuydate(cardate){
		      	  	        if(cardate[0] == "" || cardate[1] == ""){
									this.$store.dispatch("carfilter/changeBuydate" , {"cardate":[0,Date.parse(new Date())]});
									return;
				            }
				            //时间改变了之后执行下面的语句
 				            var a  =  Date.parse(cardate[0]);
                            var b  =  Date.parse(cardate[1]);
                            this.$store.dispatch("carfilter/changeBuydate",{"cardate":[a,b]});
		      	  },
		      	  changesort({key,order}){
		      	  	        this.$store.dispatch("carfilter/changeSort" , {"sortby" : key , "sortdirection" : order});
		      	  }
              },
		      computed:{
		      		cars(){
						return this.$store.state.carfilter.cars;
					},
		      	    color:{
		      	   	    get(){
		      	   	    	  return  this.$store.state.carfilter.color;
		      	   	    },
		      	   	    set(values){
                                this.$store.dispatch("carfilter/changeColor",{values});
		      	   	    }
		      	   },
		      	    seat:{
		      	   	    get(){
		      	   	    	  return  this.$store.state.carfilter.seat;
		      	   	    },
		      	   	    set(values){
                                this.$store.dispatch("carfilter/changeSeat",{values});
		      	   	    }
		      	   },
		      	   exhaust:{
		      	   	    get(){
		      	   	    	  return  this.$store.state.carfilter.exhaust;
		      	   	    },
		      	   	    set(values){
                                this.$store.dispatch("carfilter/changeExhaust",{values});
		      	   	    }
		      	   },
		      	   fuel:{
		      	   	    get(){
		      	   	    	  return  this.$store.state.carfilter.fuel;
		      	   	    },
		      	   	    set(values){
                                this.$store.dispatch("carfilter/changeFuel",{values});
		      	   	    }
		      	   }
		      }
	  }
</script>

<style lang="less">
		.clear{
			  clear:both;
		}
	    button{
	    	  width:30px;
	    	  height:30px;
	    	  margin:7px;
	    	  &.cur{
	    	  	  background: orange
	    	  }
	    }
	    .daodao{
	    	  margin-top:30px;
	    }
	    .ivu-row{
	    	    position: relative;
			    margin-left: 0;
			    margin-right: 0;
			    height: 36px;
			    zoom: 1;
			    display: block;
			    line-height:36px;
	    }
	    .ivu-checkbox-group {
			    font-size: 14px;
			    display: inline-block;
		}
		.ivu-tabs {
			    -webkit-box-sizing: border-box;
			    box-sizing: border-box;
			    position: relative;
			    overflow: hidden;
			    color: #515a6e;
			    zoom: 1;
			    padding-left: 5px;
		}
</style>