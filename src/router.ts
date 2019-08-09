import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import POIs from './views/POIs.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Users from './views/Users.vue'

Vue.use(Router)
var router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/(home)?',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/pois',
      name: 'pois',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: POIs,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/users',
      name: 'users',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Users,
      meta: {
        requiresAuth: true
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && localStorage.getItem("jwt") == null) {
    next({
      path: '/login',
    })
  }
  else {
    next();
  }
});
export default router;