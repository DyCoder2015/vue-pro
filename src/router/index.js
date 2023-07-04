import Vue from 'vue'
import VueRouter from 'vue-router'
import userRoutes from './modules/user'

Vue.use(VueRouter)

  const constRoutes = [
    ...userRoutes,
    {
      name: 'redirect',
      path: '/',
      redirect: 'home'
    },
    {
      name: 'home',
      path: '/home',
      meta:{
        showTab:true
      },
      component: () => import('@/views/home')
    },
    {
      name: 'collectPeople',
      path: '/collectPeople',
      component: () => import('@/views/collectPeople')
    },
    {
      name: 'locateAddress',
      path: '/locateAddress',
      component: () => import('@/views/locateAddress')
    },
    {
      name: 'collectData',
      path: '/collectData',
      component: () => import('@/views/collectData')
    },
    {
      name: 'entryInfo',
      path: '/entryInfo',
      component: () => import('@/views/entryInfo')
    },
    {
      name: 'collectAddress',
      path: '/collectAddress',
      component: () => import('@/views/collectAddress')
    },
    {
      name: 'personalCenter',
      path: '/personalCenter',
      meta:{
        showTab:true
      },
      component: () => import('@/views/personalCenter')
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login')
    },
    {
      name: 'patientInfo',
      path: '/patientInfo',
      meta:{
        requireAuth: true
      },
      component: () => import('@/views/patientInfo')
    },
    {
      name: 'patientInfoList',
      path: '/patientInfoList',
      meta:{
        requireAuth: true
      },
      component: () => import('@/views/patientInfoList')
    }

]

const createRouter = () => new VueRouter({
    routes: constRoutes
})
const router = createRouter()

export  default router
