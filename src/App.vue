<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
    if(sessionStorage.getItem('userid')==null){
      this.$router.push({name:'Login'}) 
    }
  }
  // mounted () {
  //     const that = this
  //     window.onresize = () => {
  //       return (() => {
  //         // var screenWidth = document.body.clientWidth 
  //         var screenHeight  = document.documentElement.clientHeight
  //         // localStorage.setItem('screenWidth',window.screen.availWidth)
  //         localStorage.setItem('screenHeight',screenHeight)
  //         console.log('屏幕高度',screenHeight)
  //         // console.log('屏幕宽度',screenWidth)
  //         // alert(screenHeight)
  //       })()
  //     }
  //   }
}
</script>

<style>

</style>
