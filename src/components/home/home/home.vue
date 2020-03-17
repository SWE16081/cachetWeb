<template>
    <div class="content">
        <div class="contentLeft"><CachetSlide></CachetSlide></div>
        <div class="contentRight">
          <router-view></router-view>
        </div>
    </div>
</template>
<script>
import CachetSlide from '../../comment/cachetSlide/cachetSlide'
export default {
    name:'home',
    components:{CachetSlide},
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
.content{
    float:left;
    /* height:800px; */
    width: 100%;
    margin-top:26px;
     /* box-shadow: 4px 4px 10px #bdb7b7; */
}
.contentLeft{
    float:left;
    height:100%;
    width: 14%;
    /* box-shadow: 4px 4px 10px #bdb7b7; */
}
.contentRight{
    height:100%;
    width: 86%;
    /* margin-left:2%; */
    /* box-shadow: 4px 4px 10px #bdb7b7; */
    float: left;
}
.userDropDown{
    margin-right:5px;
    margin-top:7px;
}
</style>
