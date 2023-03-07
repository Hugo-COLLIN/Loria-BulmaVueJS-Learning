import { createRouter, createWebHistory } from 'vue-router'
import store from "@/store";

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
    component: () => import(/* webpackChunkName: "items" */ '../views/Items.vue')
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'is-active' /* change to Bulma's active nav link */
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (store.state.tokenLogin == null)
      next({ name: 'login' })
    else
      next() // go to wherever I'm going
  } else {
    next() // does not require auth, make sure to always call next()!
  }
});

export default router
