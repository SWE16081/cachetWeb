<template>
<div class="main">
    <div class="header">
        <div class="brand">公章后台管理系统</div>
        <div class="headerNav">
            <div class="headerNavLeft">
                <Header></Header>
            </div>
            <div class="headerNavRight">
                <UserDropDown class="userDropDown"></UserDropDown>
                <!-- <el-avatar icon="el-icon-user-solid"></el-avatar> -->
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            </div>
        </div>
    </div>
    <!-- <div class="content"> -->
          <router-view></router-view>
    <!-- </div> -->
</div>
</template>
<script>
import Header from '../comment/header/header'
import PersonSlide from '../comment/personSlide/personSlide'
import UserDropDown from '../comment/dropDown/userDropDown'
export default {
    name:'home',
    components:{Header,PersonSlide,UserDropDown},
    data(){
        return{
          tabData:[1,2,3,4]
        }
    },
    methods:{

    }
}
</script>
<style scoped>
.main{
    float: left;
    width: 100%;
    /* border:1px solid red; */
}   
.header{
    /* margin-top:-48px; */
    float: left;
    width: 100%;
    height: 60px;box-shadow: 4px 4px 10px #bdb7b7;
}
.headerNav{
    float: left;
    /* margin-left: 2%; */
    width: 86%;
    height: 100%;
    /* box-shadow: 4px 4px 10px #bdb7b7; */
}
.headerNavLeft{
    float: left;
    width: 90%;
    height: 100%;
}
.headerNavRight{
    float: left;
    width: 10%;
    height: 100%;
        display: flex;
    justify-content: center;
    align-items: center;
}
.brand{
    /* box-shadow: 4px 4px 10px #bdb7b7; */
    width: 14%;
    height: 100%;
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color:#409EFF;
}
.content{
    float:left;
    /* height:800px; */
    width: 100%;
    margin-top:26px;
     /* box-shadow: 4px 4px 10px #bdb7b7; */
}

</style>
