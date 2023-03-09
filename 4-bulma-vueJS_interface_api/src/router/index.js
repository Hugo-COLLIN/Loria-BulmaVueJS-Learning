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
  const isCorrectToken =  LoginMechanics.methods.loginStateRouter(); //if true router login
  console.log('isCorrectToken: ' + isCorrectToken)
  // if (!isCorrectToken) {
  //   next({ name: 'login' })
  // }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    console.log('tokenSession: ' + sessionStorage.getItem('tokenSession'));
    console.log(sessionStorage.getItem('tokenSession') === "null");
    // LoginMechanics.methods.loginState();
    if ((sessionStorage.getItem('tokenSession') === null /*|| !isCorrectToken*/) && to.name !== 'login')
      next({ name: 'login' })
    else
      next() // go to wherever I'm going
  } else if (to.name === 'login' && sessionStorage.getItem('tokenSession') !== null) {
    next('/') // does not require auth, make sure to always call next()!
  }
  else {
    next() // does not require auth, make sure to always call next()!
  }
  console.log(sessionStorage.getItem('tokenSession'));
});

export default router
