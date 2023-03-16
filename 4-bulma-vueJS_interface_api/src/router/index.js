import { createRouter, createWebHistory } from 'vue-router'
import store from "@/store";
import LoginMechanics from "@/components/LoginMechanics.vue";

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: {
      requiresAuth: true, // this route requires auth
    },
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue')
  },
  {
    path: '/items',
    name: 'items',
    meta: {
      requiresAuth: true, // this route requires auth
    },
    component: () => import(/* webpackChunkName: "items" */ '../views/Tracks.vue')
  },
  {
    path: '/customers',
    name: 'customers',
    meta: {
      requiresAuth: true, // this route requires auth
    },
    component: () => import(/* webpackChunkName: "customers" */ '../views/Customers.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/orders',
    name: 'orders',
    meta: {
      requiresAuth: true, // this route requires auth
    },
    component: () => import(/* webpackChunkName: "orders" */ '../views/Orders.vue')
  },
  { path: '/:catchAll(.*)',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '../views/404.vue')
  },
  {
    path: '/dashboard_ok',
    name: 'dashboard_ok',
    meta: {
      requiresAuth: true, // this route requires auth
    },
    component: () => import(/* webpackChunkName: "customers" */ '../views/Dashboard_ok.vue')
  },
  {
    path: '/orders_ok',
    name: 'orders_ok',
    meta: {
      requiresAuth: true, // this route requires auth
    },
    component: () => import(/* webpackChunkName: "customers" */ '../views/old/Orders_ok.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'is-active' /* change to Bulma's active nav link */
})

router.beforeEach((to, from, next) => {
  LoginMechanics.methods.loginStateRouter();
  if (to.matched.some(record => record.meta.requiresAuth))
  {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if ((sessionStorage.getItem('tokenSession') === null) && to.name !== 'login')
      next({ name: 'login' })
    else
      next() // go to wherever I'm going
  }
  else if (to.name === 'login' && sessionStorage.getItem('tokenSession') !== null) {
    next('/') // already logged in, redirect to dashboard
    // router.go(0) // refresh page
  }
  else {
    next() // does not require auth
  }
  console.log(sessionStorage.getItem('tokenSession'));
});

export default router
