<template>
    <div class="mian">
      
        <div class="logincard">
            <div class="logincardLeft">

            </div>
            <div class="logincardRight">
                <span class="logintitle" font-family= "Helvetica Neue">登录</span>
                <div class="inputdiv">
                    <el-input v-model="username" placeholder="账号" ></el-input>
                </div>
                <div class="inputdiv">
                    <el-input type="password" v-model="password" placeholder="密码"></el-input>
                </div>
                <!-- <div class="inputdiv">
                    <img class="captchaSrc" v-bind:src="captchaSrc" v-on:click="updateCaptcha" />
                </div>
                <div class="inputdiv">
                    <el-input type="captcha" v-model="captcha" placeholder="验证码"></el-input>
                </div> -->
                <div class="inputdiv2">
                    <el-button type="primary" class="loginbtn" v-on:click="submit">登录</el-button>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
   import qs from 'qs'
    export default{
        data(){
            return{
                username:'',
                password:'',
                // captcha:'',
                // captchaSrc:'',
                // cToken:'',
                screenWidth:'',
                screenHeight:''
            }
        },
        methods:{
            submit(){

                //账号密码 admin admin
                this.axios.post('/url/api/admin/maker/login2',qs.stringify({
                    name:this.username,
                    password:this.password,
                    // captcha:this.captcha,
                    // cToken:this.cToken
                })).then(res=>{
                    console.log(res.data)
                    if(res.data.res=='success'){
                        //保存用户登录状态
                        sessionStorage.setItem('userid',res.data.userid)
                        sessionStorage.setItem('username',this.username)
                         this.$notify({
                            title: '登录成功',
                            message: '',
                            duration:1000
                        });
                        const timer = setInterval(() =>{                    
                            // 某些定时器操作   
                            this.$router.push({name:'Index'})  
                             history.pushState(null, null, document.URL);
                            window.addEventListener("popstate",function(e) {  
                                history.pushState(null, null, document.URL);
                            }, false);       
                        }, 1000);            
                        // 通过$once来监听定时器
                        // 在beforeDestroy钩子触发时清除定时器
                        this.$once('hook:beforeDestroy', () => {            
                            clearInterval(timer);                                    
                        }) 
                        
                    }else{
                        this.$notify.error({
                            title: '错误',
                            message: '账号密码错误',
                            duration:2000
                        });                       
                    }
                }).catch(err=>{
                    console.log(err)
                    //
                }
                )

            },
            //刷新验证码
            updateCaptcha(){
                var self=this
                this.axios.post('/api/captcha').then(function(response){
                    console.log(response.data.data)
                    self.captchaSrc=response.data.data.img
                    self.cToken=response.data.data.cToken
                }).catch(function(error){
                    console.log(error)
                })
            }
        },
        created:function(){
            // this.screenWidth=localStorage.getItem('screenWidth')
            this.screenHeight=localStorage.getItem('screenHeight')*0.8
            // this.updateCaptcha()
            //设置公章页面默认显示全部
                sessionStorage.setItem('cachetid',0)
        },
        
    }
</script>
<style scoped>

    .mian{
        width: 100%;
        /* overflow: hidden ; */
        /* height: 100%; */
        /* border:1px solid red; */
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .logincard{
        width: 1000px;
        height: 500px;
        /* border: 1px solid #2f77e3 ; */
        border-radius: 14px;
        box-shadow: 8px 3px 20px #dfe1e4;
        background-color: #ffffff;
        float: left;
        margin-top:80px;
    }
    .logincardLeft{
        width: 64%;
        height: 100%;
        background-image: linear-gradient(to right , #2f77e3, #6baee6);
        border-top-left-radius: 12px;
        border-bottom-left-radius: 12px;
        float: left;
        /*border:1px solid red;*/
    }
    .logincardRight{
        width: 36%;
        height: 100%;
        /*display: flex;*/
        /*align-items: center;*/
        /*justify-content: center;*/
        float: left;
        /*border:1px solid red;*/
    }
    .logintitle{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 100px;
        font-size:20px;
        color:#2f77e3;
    }
    .inputdiv{
        margin-top: 30px;
        width: 80%;
        margin-left: 10%;
    }
    .inputdiv2{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 30px;
        width: 80%;
        margin-left: 10%;
    }
    .loginbtn{
        width: 100%;
    }
    .captchaSrc{
        height: 40px;
        width: 100%;
    }
</style>