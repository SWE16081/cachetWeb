<template>
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @select="handleSelect"
      background-color="#ffffff"
      width="200px"
      text-color="#000000"
      active-text-color="#409EFF">
     <el-menu-item index="1">
        <i class="el-icon-suitcase"></i>
        <span slot="title">
            公章详情
        </span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-coordinate"></i>
        <span slot="title">
            公章种类
        </span>
      </el-menu-item>
    </el-menu>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    methods:{
     handleSelect(key, keyPath) {
        console.log(key, keyPath);
        
        if(key==1&&localStorage.getItem('key')!=1){
          localStorage.setItem('key',key)
          this.$router.push({name:'Cachet'})
        }else{
          localStorage.setItem('key',key)
          this.$router.push({name:'CachetKind'})
        }
      }
    },

}
</script>
<style scoped>
/* .router-link{
  text-decoration: none;
} */
</style>