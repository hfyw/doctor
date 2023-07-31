import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/login/index.vue'
import { useUserStore } from '@/stores'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        meta: '首页',
        component: () => import('../views/Homepage/index.vue')
      },
      {
        path: 'article',
        name: 'article',
        meta: '健康百科',
        component: () => import('../views/article/index.vue')
      },
      {
        path: 'notify',
        name: 'notify',
        meta: '消息中心',
        component: () => import('../views/notify/index.vue')
      },
      {
        path: 'use',
        name: 'use',
        meta: '我的',
        component: () => import('../views/user/index.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: '登录',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/consult',
    name: 'consults',
    component: () => import('../views/consult/index.vue'),
    children: [
      {
        path: 'fast',
        name: 'fast',
        meta: '极速问诊',
        component: () => import('../views/consult/fast.vue')
      },
      {
        path: 'dep',
        name: 'dep',
        meta: '选择科室',
        component: () => import('../views/consult/dep.vue')
      },
      {
        path: 'illness',
        name: 'illness',
        meta: '图文问诊',
        component: () => import('../views/consult/illness.vue')
      },
      {
        path: 'pay',
        name: 'pay',
        meta: '支付',
        component: () => import('../views/consult/ConsultPay.vue')
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    children: [
      {
        path: 'consult',
        name: 'consult',
        meta: '问诊记录',
        component: () => import('../views/user/ConsultView.vue')
      },
      {
        path: 'patient',
        name: 'patient',
        meta: '选择患者',
        component: () => import('../views/user/patient.vue')
      }
    ]
  },
  {
    path: '/order',
    name: 'order',
    meta: '全部订单',
    component: () => import('../views/order/index.vue')
  }
]
const router = createRouter({
  routes,
  history: createWebHashHistory(import.meta.env.BASE_URL)
})

router.beforeEach((to, from, next) => {
  const User = useUserStore()
  if (User.user && to.path == '/login') {
    next('/')
  } else if (!User.user && to.path != '/login') {
    next('/login')
  } else {
    next()
  }
})

export default router
