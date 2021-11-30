import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Result from '@/components/Result'
import Detail from '@/components/Detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/result/',
      name: 'Result',
      component: Result
    },
    {
      path: '/detail/',
      name: 'Detail',
      component: Detail
    }
  ],
  mode: 'history'
})
