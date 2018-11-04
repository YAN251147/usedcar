<template>
	 <div>
 
          <Layout>
           <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu active-name="carfilter" theme="light" width="auto" :open-names="['1']" @on-select="change">
                            <MenuItem v-for="(v,k) in leftSlider" :key="v" :name="k">{{v}}</MenuItem>
                    </Menu>
                </Sider>
          <Layout :style="{padding: '0 24px 24px'}">
                     <Breadcrumb :style="{margin: '24px 0'}">
                        <BreadcrumbItem to="main">首页</BreadcrumbItem>
                        <BreadcrumbItem to="carfilter">买车栏目</BreadcrumbItem>
                     </Breadcrumb>
              <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                      <router-view></router-view>
              </Content>
          </Layout>
          </Layout>
	 </div>
</template>
<script type="text/javascript">
      export  default{
              data(){
                     return {
                            leftSlider:{
                                carfilter:"正常机动车",
                                sifacar:"卡车购买",
                                lanxiang:"蓝翔挖掘机"
                            }
                     }
              },
              methods:{
                    change(name){
                           this.$router.push({
                                    name
                           })
                    }
              }
      }
</script>