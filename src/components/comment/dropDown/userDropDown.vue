<template>
    <el-dropdown>
    <span class="el-dropdown-link">
        {{username}}
    </span>
    <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>首页</el-dropdown-item>
        <el-dropdown-item>详情</el-dropdown-item>
        <el-dropdown-item @click.native="dropOut">退出  </el-dropdown-item>
    </el-dropdown-menu>
    </el-dropdown>
</template>
<script>
export default {
    data(){
        return{
            username:''
        }
    },
    methods:{
        dropOut(){
            console.log('退出')
        this.$confirm('确认退出当前用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            sessionStorage.clear()
            this.$router.push({name:'Login'})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });           
        }
    },
    created:function(){
        //获取用户名
        this.username=sessionStorage.getItem('username')
        console.log('username',this.username)
        // this.axios.post('/api/#').then(res=>{
        //     console.log(res)
        //     if(res.data.data['status']=='success'){
        //         this.username=res.data.data['username']
        //     }
        // }).catch(err=>{
        //     console.log(err)
        // })
    }
}
</script>
<style scoped>
.el-dropdown-link{
    cursor: pointer;
    color: #409EFF;
    font-size:16px;
    letter-spacing: 1px;
}
</style>