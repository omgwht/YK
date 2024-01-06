import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/readDetail',
    name: 'readDetail',
    component: () => import('../views/pageComponents/newComponents/knowledgeComponents/readDetail.vue')
  },
  {
    path:'/healthknowledgeDetail',
    name: 'healthknowledgeDetail',
    components: () => import('../views/pageComponents/pages/publicPages/healthknowledgeDetail.vue')
  },
  {
    path: '/coverView',
    name: 'coverView',
    component: () => import('../views/pageComponents/pages/publicPages/coverPage.vue')
  },
  {
    path: '/mainpage',
    name: 'mainpage',
    component: () => import('../views/pageComponents/pages/publicPages/mainPage.vue')
  },
  {
    path: '/healthKnowledge',
    name: 'healthKnowledge',
    component: () => import('../views/pageComponents/pages/publicPages/healthKnowledge.vue')
  },
  {
    path: '/smartPrescription',
    name: 'smartPrescription',
    component: () => import('../views/pageComponents/pages/publicPages/smartPrescription.vue')
  },
  {
    path: '/datasharecenter',
    name: 'datasharecenter',
    component: () => import('../views/pageComponents/pages/publicPages/dataSharecenter.vue')
  },
  {
    path: '/culturEextend',
    name: 'culturEextend',
    component: () => import('../views/pageComponents/pages/publicPages/cultureExtend.vue')
  },
  {
    path: '/makeRegister',
    name: 'makeRegister',
    component: () => import('../views/pageComponents/pages/publicPages/makeRegister.vue')
  },
  {
    path: '/privatemain',
    name: 'privatemain',
    component: () => import('../views/pageComponents/pages/privatePages/privateMain.vue')
  },
  {
    path: '/privHomepage',
    name: 'privHomepage',
    component: () => import('../views/pageComponents/pages/privatePages/privHomepage.vue')
  },
  {
    path: '/',
    redirect: '/coverView'
  }
]

const router = new VueRouter({
  routes
})

export default router
