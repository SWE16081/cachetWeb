<template>
    <div class="main">
        <div class="contentRightUp">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/home/cachet'}">公章详情</el-breadcrumb-item>
                <el-breadcrumb-item >添加</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="contentRightDown">
            <el-form :model="ruleForm" status-icon :rules="rules" 
            ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="公章种类" prop="cachetKind">
                <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">
                    {{ruleForm.cachetKind}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command="index" 
                    v-for="(item,index) in cachetKindData"
                    :key="item.cachetKindid">{{item.cakindname}}
                    </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-form-item>
            <el-form-item label="公章名称" prop="cachetName">
                <el-input type="text" v-model="ruleForm.cachetName" 
                style="width:500px" autocomplete="off"></el-input>
            </el-form-item>
            <el-tag @click="addDomain">添加公章尺寸</el-tag>
            <el-form-item 
                v-for="(domain, index) in ruleForm.domains"
                :key="domain.key"
                :prop="'domains.' + index + '.size'"
          
            >
            <el-input v-model="domain.size" style="width:200px" placeholder="公章尺寸"></el-input>
            <el-input v-model="domain.price" style="width:200px" placeholder="公章价格"></el-input>
            <el-button @click.prevent="removeDomain(domain)">删除</el-button>
            </el-form-item>
            <el-tag @click="addDomain2">添加公章颜色</el-tag>
           <el-form-item  
                v-for="(domain2, index) in ruleForm.domains2"
                :key="domain2.key"
                :prop="'domains2.' + index + '.color'"
                :rules="{
                  required: true, message: '公章颜色不能为空', trigger: 'blur'
                }"
            >
            <el-input v-model="domain2.color" style="width:200px" 
            placeholder="公章颜色"></el-input>
            <el-button @click.prevent="removeDomain2(domain2)">删除</el-button>
            </el-form-item>
            <el-form-item label="公章图片" >

                <input id="fileInput" v-on:change="uploadPhoto($event)" name="file[]"  
                value="选择文件"type="file" multiple style="display:none"/>
                <div class="preview"v-for="(item,index) in imgList">
                    <div class="Pic">
                        <img :src="item.src"  class="previewPic" >
                    </div>
                    <div class="close" ><img style="height:20px;width:20px;"
                      src="../../../../static/pic/windowback.png" @click="delPreviewPic(index)"> 
                    </div>
                </div>
                <label for="fileInput" class="file-btn">
                    <img src="../../../../static/pic/plus.png" class="uploadPic">
                    
                </label>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm2('ruleForm')">重置</el-button>
            </el-form-item>
            </el-form>
            
        </div>
    </div>
</template>
<script>
import qs from 'qs'
import Global from '../../comment/global/global'
export default {
    name:'',
    components:{},
    data(){

     var validateCachetKind = (rule, value, callback) => {
        if (value === '请选择公章种类') {
          callback(new Error('请选择公章种类'));
        } else {

          callback();
        }
      };
      var validateCachetName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入公章名称'));
        } else {

          callback();
        }
      };
        return{
          // dataUrl:[],
            imgList:[],
            cachetPrice:[],
            cachetSize:[],
            web:Global.WEB,
            cachetColor:[],
            cachetid:'',
            imgData: {
            accept: 'image/gif, image/jpeg, image/png, image/jpg',
            },
           ruleForm: {
            cachetKind: '请选择公章种类',
            cachetKindid:'',
            cachetName:'',
            domains: [{
              size: '',
              price:''
            }],
            domains2: [{
              color: '',
            }],
        },
        cachetKindData:[],
        rules: {
            cachetKind:[
            { validator: validateCachetKind, trigger: 'blur' }
            ],
          cachetName: [
            { validator: validateCachetName, trigger: 'blur' }
          ],

        }
      };
        
    },
    methods:{
        //删除预览图片
        delPreviewPic(index){
            this.$confirm('是否删除此图片?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                this.imgList.splice(index,1) ;
            }).catch(() => {
            //   this.$message({
            //     type: 'info',
            //     message: '已取消删除'
            //   });          
            });   
        },
        //图片上传
        uploadPhoto(e){
            if (!e.target.files[0].size) return;
            let files = e.target.files;
            // 批量上传
            for (let i = 0; i < files.length; i++) {
                // 单张上传
                this.fileAdd(files[i]);
            }
            console.log('imgList',this.imgList)
        },
        // 单张上传
        fileAdd (file) {
            //   console.log(file);
            let type=file.type;//文件的类型，判断是否是图片
            let size=file.size;//文件的大小，判断图片的大小
            //indexOf() 返回某个指定的字符在某个字符串中首次出现的位置。如果没有找到就返回-1；
            if(this.imgData.accept.indexOf(type) === -1){
                alert('请选择我们支持的图片格式！');
                return false;
            }
            if(size > 3145728){
                alert('请选择3M以内的图片！');
                return false;
            }
            let that = this;
            // 总大小
            this.size = this.size + file.size;
            let reader = new FileReader();
            // 调用reader.readAsDataURL()方法，把图片转成base64
            reader.readAsDataURL(file);
            // 监听reader对象的onload事件，当图片加载完成时，把base64编码賦值给预览图片
            reader.onload = function (e) {
                file.src = e.target.result;
                // 再把file对象添加到imgList数组
                that.imgList.push(file);
            }
        },

        //动态添加尺寸价格
        addDomain() {
            this.ruleForm.domains.push({
            size: '',
            peice:'',
            key: Date.now()
            });
        },
        //动态添加颜色
        addDomain2() {
            this.ruleForm.domains2.push({
            color: '',
            key: Date.now()
            });
        },
        //  动态删除尺寸价格
        removeDomain(item) {
            var index = this.ruleForm.domains.indexOf(item)
            if (index !== -1) {
            this.ruleForm.domains.splice(index, 1)
            }
        },
        //动态删除颜色
        removeDomain2(item) {
            var index = this.ruleForm.domains2.indexOf(item)
            if (index !== -1) {
            this.ruleForm.domains2.splice(index, 1)
            }
        },     
        //下拉菜单事件监听
     handleCommand(command) {
        var index=command
        console.log('command',index)
          this.ruleForm.cachetKind=this.cachetKindData[index]['cakindname']
          this.ruleForm.cachetKindid=this.cachetKindData[index]['cachetKindid']
          var cachetKindid=this.cachetKindData[index]['cachetKindid']
          console.log('选择',this.ruleForm.cachetKind)
          console.log('选择',this.ruleForm.cachetKindid)
      },
      //请求公章种类数据
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
      },
      //base64图片转成input file 格式
      base64ToFile(){
        //这里对base64串进行操作，去掉url头，并转换为byte
        var fd = new FormData();
        var data=this.imgList
        console.log('datalen',data.length)
        for(var j=0;j<data.length;j++){
        var bytes = window.atob(data[j].src.split(',')[1]);
            var array = [];
            for(var i = 0; i < bytes.length; i++){
                array.push(bytes.charCodeAt(i));
            }
            var blob = new Blob([new Uint8Array(array)],{type:'image/jpeg'});
            fd.append('file[]',blob, Date.now() + '.jpg');
            //  console.log('asd',fd.getAll('file'))
        }
        console.log('asd',fd.getAll('file'))
            return fd
      },
      //上传数据构造
        uploadDataMake(){
            
            var cachetSize=[]
            var cachetPrice=[]
            var cachetColor=[]
          for(var i=0;i<this.ruleForm.domains.length;i++){
              var arr={}
              var arr2={}
              arr['size']=this.ruleForm.domains[i]['size']
              arr2['price']=this.ruleForm.domains[i]['price']
              cachetSize[i]=arr
              cachetPrice[i]=arr2
              
          }
           for(var i=0;i<this.ruleForm.domains2.length;i++){
               var arr3={}
              arr3['color']=this.ruleForm.domains2[i]['color']
               cachetColor[i]=arr3
          }
          this.cachetSize=cachetSize;
          this.cachetPrice=cachetPrice;
          this.cachetColor=cachetColor
        //   console.log('arr',JSON.stringify(this.cachetSize))
        },
        submitForm(formName) {
            var fd=this.base64ToFile()
            console.log('data',this.ruleForm)
            this.uploadDataMake()
          this.$refs[formName].validate((valid) => {
          if (valid) {
              var flage=this.judge()
              console.log('fff',flage)
              if(flage){
           fd.append('cachetKindid',this.ruleForm.cachetKindid)
            fd.append('cachetid',this.cachetid)
            fd.append('cachetName',this.ruleForm.cachetName)
            fd.append('cachetPrice',JSON.stringify(this.cachetPrice))
            fd.append('cachetSize',JSON.stringify(this.cachetSize))
            fd.append('cachetColor',JSON.stringify(this.cachetColor))
            //  fd.append('swe[]',fd.getAll('file'))
            console.log('fd',fd)
           this.axios({
                method: 'post',
                url:'/url/api/admin/maker/updateCachet',
                data:fd
            }).then(res=>{
                console.log('更新公章',res.data)
                    if (res.data.status=='success'){
                        this.$notify({
                            title: '成功',
                            message: '更新公章种类成功',
                            duration:1000
                        });
                        const timer = setInterval(() =>{                    
                            // 某些定时器操作   
                            this.$router.push({name:'Cachet'})             
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
              }
           
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
          judge(){
        if(this.imgList.length==0){
            this.$alert('请上传图片', '', {
            confirmButtonText: '确定',
            callback: action => {
 
            }
        });
        return false
        }else if(this.ruleForm.domains[0]['size']==''){
             this.$message('请选择尺寸');
              return false
        }else if(this.ruleForm.domains[0]['price']==''){
             this.$message('请选择价格');
              return false
        }
        return true;
    },
    //公章数据加载
      dataRequest(){
        console.log('cachetid',this.cachetid)
        this.axios({
          method:'post',
          url:'/url/api/maker/selcachetby',
          data:{
            cachetid:this.cachetid
          }
        }).then(res=>{
          if(res.data.status=='success'){
            this.cachetDataMake(res.data.data) //公章价格，尺寸，颜色,名称，数据初始化
          }else{
            console.log('暂无数据')
          }
        }).catch(err=>{
          console.log(err)
        })

      },
      cachetDataMake(data){
          var res=data[0]
          this.ruleForm.domains2=res.cachetColor
          this.ruleForm.cachetName=res.cachettagname
          this.ruleForm.cachetKind=res.cakindname
          this.ruleForm.cachetKindid=res.cachetKindid
          for(var i=0;i<res.cachetPrice.length;i++){
            this.ruleForm.domains[i]['size']=res.cachetSize[i]['size']
            this.ruleForm.domains[i]['price']=res.cachetPrice[i]['price']
          }
  
          console.log('res',res.cachetPicPath)
          this.makeImg(this.imgList,res.cachetPicPath,0)
          console.log('dataURlddd',this.imgList)
      },
      makeImg(dataUrl,data,i){
             var imgUrl=data
             var test=[]
              var image = new Image(); 
              image.src = '/url/'+imgUrl[i];  
              var that=this                
             image.onload = function(){  
                console.log('i',i)
                if(i<data.length){
                  test['src']=that.getBase64Image(image)
                  that.imgList.push(test ) 
                   i++
                  console.log('dataURl',that.imgList)                  
                   that.makeImg(that.imgList,data,i)
                } 
               
              }      
              
      },
      //后端url请求的图片转base64
       getBase64Image(img){
            var canvas = document.createElement("canvas");  
            canvas.width = img.width;  
            canvas.height = img.height;  
            var ctx = canvas.getContext("2d");  
            ctx.drawImage(img, 0, 0, img.width, img.height);  
            var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();  
            var dataUrl = canvas.toDataURL("image/"+ext);  
            // console.log('ad',dataUrl)
            return dataUrl
      } 
    },

    created(){
      this.cachetid=this.$route.params.cachetid
      this.dataRequest()
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
.uploadPic{
    width:97px;
    height:97px;
    border:2px solid #409EFF;
    margin-left:20px;
}
.preview{
    float: left;
}
.Pic{
     float:left
}
.previewPic{
    height:100px;
    width:100px;
    margin-left:20px;
}

.close{
    margin-top:-18px;
    float:left;
}

</style>
