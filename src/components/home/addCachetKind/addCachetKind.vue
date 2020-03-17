<template>
    <div class="main">
        <div class="contentRightUp">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/home/cachetKind'}">公章种类</el-breadcrumb-item>
                <el-breadcrumb-item >添加</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="contentRightDown">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="公章种类名称" prop="cachetKind">
                <el-input type="text" v-model="ruleForm.cachetKind" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="公章种类说明" prop="explain">
                <el-input type="textarea" v-model="ruleForm.explain" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import qs from 'qs'
export default {
    name:'',
    components:{},
    data(){

      var validateCachetKind = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入公章种类名称'));
        } else {

          callback();
        }
      };
      var validateExplain = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入公章种类说明'));
        }  else {
          callback();
        }
      };
        return{
             ruleForm: {
          cachetKind: '',
          explain: '',
        },
        rules: {
          cachetKind: [
            { validator: validateCachetKind, trigger: 'blur' }
          ],
          explain: [
            { validator: validateExplain, trigger: 'blur' }
          ]
        }
      };
        
    },
    methods:{
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              console.log(this.$refs[formName].fields[0].fieldValue)
              console.log(this.$refs[formName].fields[1].fieldValue)
            var cachetkindname=this.$refs[formName].fields[0].fieldValue
            var cachetexplain=this.$refs[formName].fields[1].fieldValue
            console.log(1)
            this.axios.post('/url/api/maker/addcakind',qs.stringify({
                userid:10,
                cachetkindname: cachetkindname,
                cachetexplain: cachetexplain
            })).then(res=>{
                     console.log(2)
                    if (res.data.status=='success'){
                        this.$notify({
                            title: '成功',
                            message: '添加公章种类成功',
                            duration:1000
                        });
                        const timer = setInterval(() =>{                    
                            // 某些定时器操作   
                            this.$router.push({name:'CachetKind'})             
                        }, 1000);            
                        // 通过$once来监听定时器
                        // 在beforeDestroy钩子触发时清除定时器
                        this.$once('hook:beforeDestroy', () => {            
                            clearInterval(timer);                                    
                        }) 
                    }else{
                    //添加操作出错页面
                        this.$notify.error({
                            title: '错误',
                            message: '添加公章种类错误',
                            duration:2000
                        });
                    }
            }).catch(err=>{

            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    created(){
        
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
