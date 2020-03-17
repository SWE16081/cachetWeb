import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login/login'
import Home from '@/components/home/home/home'
import Index from '@/components/index/index'
import Message from '@/components/message/message'
import Header from '@/components/comment/header/header'
import PersonManagement from '@/components/personManagement/personManagement'
import PersonSlide from '@/components/comment/personSlide/personSlide'
import Cachet from '@/components/home/cachet/cachet'
import CachetKind from '@/components/home/cachetKind/cachetKind'
import AddCachetKind from '@/components/home/addCachetKind/addCachetKind'
import UpdateCachetKind from '@/components/home/updateCachetKind/updateCachetKind'
import AddCachet from '@/components/home/addCachet/addCachet'
import UpdateCachet from '@/components/home/updateCachet/updateCachet'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/login',
      name:'Login',
      component:Login
    },
    {
      path:'/index',
      name:'Index',
      component:Index,
      children:[
        {
          path:'/home',
          name:'Home',
          component:Home,
          children:[
            {
              path:'/home/cachet',
              name:'Cachet',
              component:Cachet
            },
            {
              path:'/home/cachetKind',
              name:'CachetKind',
              component:CachetKind
            },
            {
              path:'/home/addCachetKind',
              name:'AddCachetKind',
              component:AddCachetKind
            },
            {
              path:'/home/updateCachetKind',
              name:'UpdateCachetKind',
              component:UpdateCachetKind
            },
            {
              path:'/home/addCachet',
              name:'AddCachet',
              component:AddCachet
            },
            {
              path:'/home/updateCachet',
              name:'UpdateCachet',
              component:UpdateCachet
            }
          ],
          redirect: '/home/cachet'
          
        },
        {
          path:'/message',
          name:'Message',
          component:Message
        },
      ],
      redirect:'/home'
    },

    {
      path:'/header',
      name:'Header',
      component:Header
    },
    {
      path:'/personSlide',
      name:'PersonSlide',
      component:PersonSlide
    },
  ],
  mode:'history'
})
