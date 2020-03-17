<template>
      <el-menu  
         :default-active="activeIndex" class="el-menu-demo"
         mode="horizontal" @select="handleSelect" 
         background-color="#ffffff"
         text-color="#000000"
         active-text-color="#409EFF"
         >
         <el-menu-item   v-for="item in tabData" 
         :key="item.id":index="item.id">{{item.name}}</el-menu-item>
      </el-menu>
</template>
<script>
export default {
    data(){
        return{
            activeIndex:'1',
          //tab数据
             tabData:[
                 {
                 id:'1',name:'首页'
                 },
                  {
                 id:'2',name:'消息'
                 },
                   {
                 id:'3',name:'订单'
                 },
                   {
                 id:'4',name:'用户管理'
                 }
           ]
        }
    },
    methods:{
      handleSelect(key, keyPath) {
        console.log(key,keyPath);
        if(key==1){
          this.$router.push({name:'Home'})
        }else{
          this.$router.push({name:'Message'})
        }
      }
    },
    //加载初始化数据
    created:function(){
        // this.axios.post('/api/#').then(res=>{
        //     console.log(res)
        // }).catch(err=>{
        //     console.log(err)
        // })
    }
}
</script>
<style scoped>

/* .el-menu-demo{
    margin-top:-55px;
} */
</style>
