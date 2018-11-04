<template>
	  <div>
	  	 <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1" @on-select="dianji">
                    <div class="layout-logo">二手车交易市场_____v1.0.0</div>
                    <div class="layout-nav">
                        <MenuItem name="Index">
                            <Icon type="ios-navigate"></Icon>
                             首页
                        </MenuItem>
                        <MenuItem name="carfilter">
                            <Icon type="ios-keypad"></Icon>
                            买车栏目
                        </MenuItem>
                        <MenuItem name="addcar">
                            <Icon type="ios-analytics"></Icon>
                            卖车栏目
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <router-view></router-view>
        </Layout>
	  </div>
</template>

<script type="text/javascript">
       export  default{
                methods:{
                        dianji(name){
                              this.$router.push({
                                 name
                              })
                        }
                }
       }
</script>
<style lang="less" scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
    line-height:30px;
    color:white
}
.layout-nav{
    width: 700px;
    margin: 0 auto;
    margin-right: 20px;
}

</style>