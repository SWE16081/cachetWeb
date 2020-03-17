<template>
    <div class="main">
        <div class="contentRightUp">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/home/addCachet' }">添加</el-breadcrumb-item>
                <el-breadcrumb-item>公章详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="contentRightDown">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              {{choosed}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="-1" >
                全部
              </el-dropdown-item>
              <el-dropdown-item :command="index" 
              v-for="(item,index) in cachetKindData"
              :key="item.cachetKindid">{{item.cakindname}}
              </el-dropdown-item>

            </el-dropdown-menu>
          </el-dropdown>
            <el-table
                ref="filterTable"
                :data="cachetData"
                style="width: 100%">
                <el-table-column
                prop="cachettagname"
                label="公章名称"
                width="180">
                </el-table-column>
                <el-table-column
                label="公章图片"
                width="300">
                  <template   slot-scope="scope">            
                      <img v-for="item2 in scope.row.cachetPicPath" style="margin-left:4px"
                      :src="web+'/'+item2" width="80" height="80" />
                  </template>  
                </el-table-column>
                <el-table-column
                label="公章价格"
                width="180">
                  <template   slot-scope="scope">            
                      <span v-for="item2 in scope.row.cachetPrice" style="margin-left:4px">
                        {{item2.price}}元
                      </span>
                  </template>  
                </el-table-column>
                <el-table-column
                label="公章尺寸"
                width="180">
                  <template   slot-scope="scope">            
                      <span v-for="item2 in scope.row.cachetSize" style="margin-left:4px">
                        {{item2.size}}mm
                      </span>
                  </template>  
                </el-table-column>
                <el-table-column
                label="公章颜色"
                width="180">
                  <template   slot-scope="scope">            
                      <span v-for="item2 in scope.row.cachetColor" style="margin-left:4px">
                        {{item2.color}}
                      </span>
                  </template>  
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
        </div>
    </div>
</template>
<script>
import Global from '../../comment/global/global'
export default {
    name:'',
    components:{},
    data(){
        return{
        cachetKindData:[],
        cachetData:[],
        web:Global.WEB,
        choosed:'全选'
        }
    },
    methods:{
      handleEdit(index, row) {
        console.log(index, row);
        var cachetid=row['cachetid']
      this.$router.push({ name: 'UpdateCachet', params: { cachetid: cachetid }});
      },
      handleDelete(index, row) {
        console.log(index, row);
        console.log(row['cachetid'])
        var cachetid=row['cachetid']
        this.axios.post("/url/api/maker/delcachet",{
            cachetid: cachetid,
            makerid: sessionStorage.getItem('userid'),
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
      //用来格式化内容	
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
          //row每行的数据
        return row.tag === value;
      },
      /*filter-method
           数据过滤使用的方法，如果是多选的筛选项，
           对每一条数据会执行多次，任意一次返回 true 就会显示。
      */
      filterHandler(value, row, column) {
          //coluconsole.log()mn['property']即该列的属性值 date
          //value是filters设置的value值
        const property = column['property'];
        console.log('列property',value)
        //返回数据的property字段为value的行
        return row[property] === value;
      },
      handleCommand(command) {
        var index=command
        console.log('command',index)
        if(index==-1){
                 sessionStorage.setItem('cachetid',0)
        }else{
          this.choosed=this.cachetKindData[index]['cakindname']
          var cachetKindid=this.cachetKindData[index]['cachetKindid']
          console.log('选择',cachetKindid)
          sessionStorage.setItem('cachetid',cachetKindid)
          sessionStorage.setItem('kindIndex',index)
        }
          //刷新页面
            this.$router.go(0);  
      },
      //按公章种类加载数据
      cachetById(){
         var userid=sessionStorage.getItem('userid')
        this.axios.post("/url/api/maker/selcachetbykind",{
          userid:userid,
          cachetkindid:sessionStorage.getItem('cachetid')
        }).then(res=>{
          if(res.data.status=='success'){
            this.cachetData=res.data.data
            console.log('按公章zhonglei',this.cachetData)
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      //加载公章全部数据
      datarequest(){
        var userid=sessionStorage.getItem('userid')
        this.axios.post("/url/api/maker/selcachet",{
          userid:userid
        }).then(res=>{
          if(res.data.status=='success'){
            this.cachetData=res.data.data
            console.log('公章',this.cachetData)
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      cachetKindReq(){
        var userid=sessionStorage.getItem('userid')
        this.axios.post("/url/api/admin/maker/selcakind",{
          userid:userid
        }).then(res=>{
          if(res.data.status=='success'){
            this.cachetKindData=res.data.data
            console.log('公章种类',this.cachetKindData)
            if(sessionStorage.getItem('cachetid')!=0){
                this.choosed=this.cachetKindData[sessionStorage.getItem('kindIndex')]['cakindname']
            }
            
          }
        }).catch(err=>{
          console.log(err)
        })
      }

    },
    created(){
      if(sessionStorage.getItem('cachetid')==0){
      //数据初始化请求
      this.datarequest()
      }else{
        //按公章种类加载数据
        this.cachetById()
      }

      //公章种类数据请求
      this.cachetKindReq()
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
