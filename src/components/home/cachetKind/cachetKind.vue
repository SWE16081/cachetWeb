<template>
    <div class="main">
        <div class="contentRightUp">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path:'/home/addCachetKind'}">添加</el-breadcrumb-item>
                <el-breadcrumb-item>公章种类</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="contentRightDown">
            <el-table
                :data="cachetKindData"
                style="width: 100%"
                :default-sort = "{prop: 'date', order: 'descending'}" 
                >
                    <el-table-column
                    prop="cachetKindid"
                    label="id"
                    width="180"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="cakindname"
                    label="公章种类名称"

                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="cachetExplain"
                    label="公章种类说明"
                    width="300">
                    </el-table-column>
                    
                    <el-table-column label="操作" width="200">
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
            </el-table>
            <!-- <div class="block">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="100"
                layout="prev, pager, next, jumper"
                :total="1000">
             </el-pagination>
            </div> -->
        </div>
    </div>
</template>
<script>
import qs from 'qs'
export default {
    name:'',
    components:{},
    data(){
        return{
         currentPage: 1,
         cachetKindData:[]
        }
    },
    methods:{
      dataRequest(){
          //获取商家userid
          this.axios.post('/url/api/maker/selcakind2',
              {
                  userid:sessionStorage.getItem('userid')
              }
          ).then(res=>{
              console.log('公章种类数据',res.data.data)
              if(res.data.status=='success'){
                  this.cachetKindData=res.data.data
              }
          })
      },
      formatter(row, column) {
        return row.address;
      },
       handleEdit(index, row) {
        console.log(index, row);
        var cachetKindid=row['cachetKindid']
      this.$router.push({ name: 'UpdateCachetKind', params: { cachetKindid: cachetKindid }});
      },
      handleDelete(index, row) {
        console.log(index, row);
        console.log(row['cachetKindid'])
        var cachetKindid=row['cachetKindid']
        this.axios.post("/url/api/maker/deletecakind",{
            cachetkindid: cachetKindid
        }).then(res=>{
            console.log(res.data)
            if (res.data.status == 'success') {
                this.$notify({
                    title: '成功',
                    message: '删除成功',
                    duration:2000
                });
                const timer = setInterval(() =>{                    
                // 某些定时器操作   
                    this.$router.go(0);          
                }, 1000);            
                // 通过$once来监听定时器
                // 在beforeDestroy钩子触发时清除定时器
                this.$once('hook:beforeDestroy', () => {            
                    clearInterval(timer);                                    
                }) 

            }
        }).catch(err=>{
            this.$notify.error({
                title: '错误',
                message: '删除失败',
                duration:2000
            });
            console.log(err)
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        //val 当前页数
        //请求分页数据，传递val参数
      },

    },
    created(){
        this.dataRequest()
    }
}
</script>
<style scoped>
.main{
    height:100%;
    width: 100%;
}
.contentRightUp{
    height:8%;
    width: 96%;
    display: flex;
    align-items: center;
    margin-left: 2%;
    margin-right: 2%;
    margin-top:2%;
}
.contentRightDown{
    margin-top:2%;
    height:88%;
    width: 96%;
    margin-left: 2%;
    margin-right: 2%;
    margin-bottom: 100px;
}
.block{
    margin-left:50%;
    width: 50%;
    margin-top: 30px;
}
</style>
