<template>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#ffffff"
      width="200px"
      text-color="#000000"
      active-text-color="#409EFF">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span>员工管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">
            <router-link to='/home/results' style="text-decoration: none;color:#000000"> 个人业绩</router-link>
          </el-menu-item>
          <el-menu-item index="1-2">
            <router-link to='/home/attendance' style="text-decoration: none;color:#000000"> 员工考勤</router-link>
          </el-menu-item>
          <el-menu-item index="1-3">员工信息</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
            <i class="el-icon-menu"></i>
            <span>项目处理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">
              <router-link to='/login' style="text-decoration: none;color:#000000"> 项目补息</router-link>
          </el-menu-item>
          <el-menu-item index="2-2">项目审核</el-menu-item>
          <el-menu-item index="2-3">监管</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="3">
        <router-link to='/login' style="text-decoration:none;"><i class="el-icon-document"></i></router-link>
        <span slot="title">
            <router-link to='/login' style="text-decoration:none;color:#000000">
            导航三
            </router-link>
        </span>
      </el-menu-item>
  <el-submenu index="4">
    <template slot="title">我的工作台</template>
    <el-menu-item index="4-1" >选项1</el-menu-item>
    <el-menu-item index="4-2">选项2</el-menu-item>
    <el-menu-item index="4-3">选项3</el-menu-item>
    <el-submenu index="4-4">
      <template slot="title">选项4</template>
      <el-menu-item index="4-4-1">选项1</el-menu-item>
      <el-menu-item index="4-4-2">选项2</el-menu-item>
      <el-menu-item index="4-4-3">选项3</el-menu-item>
    </el-submenu>
  </el-submenu>
    </el-menu>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    methods:{
 handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>
<style scoped>
/* .router-link{
  text-decoration: none;
} */
</style>