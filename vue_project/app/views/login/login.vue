<template>
       <div class="bigbox">
              <div class="login">
                    <h3>登陆</h3>
                    <hr>
                    <Row  style="margin-top:10px">
                        <Col>
                            账号：
                            <Input v-model="username"  style="width: 300px" />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            密码：
                            <Input v-model="password" type="password" style="width: 300px" />
                        </Col>
                    </Row>
                    <Row style="text-align:center;">
                            <Button  style="background:rgba(125, 231, 243, 0.44)" long @click="login">登陆</Button>
                    </Row>

              </div>
       </div>
</template>

<script>
     export default {
              data(){
                  return {
                    username : "",
                    password : ""
                  }
              },
              methods : {
                  login(){
                    this.$store.dispatch("login/login" , {"username" : this.username , "password" : this.password , "router" : this.$router});
                  }
              }
  }
</script>

<style lang="less">
       .bigbox{
             position:absolute;
             width:100%;
             height:100%;
             left:0;
             top:0;
             background: -webkit-radial-gradient(top left , #93c8ff, #b2f1f7)
       }
       .login{
            position:absolute;
            width:420px;
            height:300px;
            background: white;
            left:50%;
            margin-left:-210px;
            top:50%;
            margin-top:-150px;
            padding:10px;
            border-sizing:border-box;
       }
</style>